package com.deloitte.elrr.aggregator.consumer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.deloitte.elrr.aggregator.InputSanatizer;
import com.deloitte.elrr.aggregator.drools.DroolsProcessStatementService;
import com.deloitte.elrr.aggregator.dto.MessageVO;
import com.deloitte.elrr.aggregator.rules.ProcessCompetency;
import com.deloitte.elrr.aggregator.rules.ProcessCompleted;
import com.deloitte.elrr.aggregator.rules.ProcessCredential;
import com.deloitte.elrr.elrraggregator.exception.AggregatorException;
import com.deloitte.elrr.elrraggregator.exception.PersonNotFoundException;
import com.deloitte.elrr.entity.Person;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.yetanalytics.xapi.model.Activity;
import com.yetanalytics.xapi.model.Statement;
import com.yetanalytics.xapi.util.Mapper;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ELRRMessageListener {

  @Autowired private ProcessCompleted processCompleted;

  @Autowired private ProcessCompetency processCompetency;

  @Autowired private ProcessCredential processCredential;

  @Autowired private ProcessPerson processPerson;

  @Autowired private DroolsProcessStatementService droolsProcessStatementService;

  @Autowired KafkaTemplate<?, String> kafkaTemplate;

  @Value("${kafka.dead.letter.topic}")
  private String deadLetterTopic;

  /**
   * @param message
   */
  @Transactional
  @KafkaListener(topics = "${kafka.topic}")
  public void listen(final String message) {

    log.info("\n\n ===> Received Messasge in group - group-id: " + message);

    try {

      if (InputSanatizer.isValidInput(message)) {
        // processMessage(message);
        processMessageFromRule(message);
      } else {
        log.error("Invalid message did not pass whitelist check - " + message);
        // Send to dead letter queue
        kafkaTemplate.send(deadLetterTopic, message);
      }

    } catch (AggregatorException e) {
      // Send to dead letter queue
      kafkaTemplate.send(deadLetterTopic, message);
      throw e;
    }
  }

  /**
   * @param statement
   * @throws AggregatorException
   */
  @Transactional
  private void processMessage(final String payload) {

    log.info("Process Kafka message.");

    Statement statement = null;
    Person person = null;
    boolean fireCompletedRule = false;
    boolean fireCompetencyRule = false;
    boolean fireCredentialRule = false;

    try {

      // Get Statement
      statement = getStatement(payload);

      Activity obj = (Activity) statement.getObject();
      String objType = obj.getDefinition().getType();

      fireCompletedRule = processCompleted.fireRule(statement);

      if (!fireCompletedRule) {
        fireCompetencyRule = processCompetency.fireRule(statement);
      }

      if (!fireCompletedRule && !fireCompetencyRule) {
        fireCredentialRule = processCredential.fireRule(statement);
      }

      // If completed, achieved competency or achieved credential
      if (fireCompletedRule || fireCompetencyRule || fireCredentialRule) {

        log.info("Process verb " + statement.getVerb().getId());

        // Process Person
        person = processPerson.processPerson(statement);

        // If completed
        if (statement.getVerb().getId().equalsIgnoreCase(VerbIdConstants.COMPLETED_VERB_ID)
            && fireCompletedRule) {

          // Process rule
          processCompleted.processRule(person, statement);

          // If achieved competency
        } else if (statement.getVerb().getId().equalsIgnoreCase(VerbIdConstants.ACHIEVED_VERB_ID)
            && objType.equalsIgnoreCase(ObjectTypeConstants.COMPETENCY)
            && fireCompetencyRule) {

          // Process rule
          processCompetency.processRule(person, statement);

          // If achieved credential
        } else if (statement.getVerb().getId().equalsIgnoreCase(VerbIdConstants.ACHIEVED_VERB_ID)
            && objType.equalsIgnoreCase(ObjectTypeConstants.CREDENTIAL)
            && fireCredentialRule) {

          // Process rule
          processCredential.processRule(person, statement);
        } // If achieved

      } else {

        log.info(
            "Verb "
                + statement.getVerb().getId()
                + " Object Type "
                + objType
                + "is not recognized.");
      }

    } catch (AggregatorException | ClassCastException | PersonNotFoundException e) {
      log.error("Error processing Kafka message - " + e.getMessage());
      e.printStackTrace();
      throw e;

    } catch (JsonProcessingException e) {
      log.error("Error processing Kafka message - " + e.getMessage());
      e.printStackTrace();
    }
  }

  /**
   * @param statement
   * @throws AggregatorException
   */
  private void processMessageFromRule(final String payload) {

    log.info("Process Kafka message with Drools.");

    Statement statement = null;
    Person person = null;
    boolean fireCompletedRule = false;
    boolean fireCompetencyRule = false;
    boolean fireCredentialRule = false;

    try {

      // Get Statement
      statement = getStatement(payload);

      Activity obj = (Activity) statement.getObject();
      String objType = obj.getDefinition().getType();

      fireCompletedRule = processCompleted.fireRule(statement);

      if (!fireCompletedRule) {
        fireCompetencyRule = processCompetency.fireRule(statement);
      }

      if (!fireCompletedRule && !fireCompetencyRule) {
        fireCredentialRule = processCredential.fireRule(statement);
      }

      if (fireCompletedRule || fireCompetencyRule || fireCredentialRule) {

        log.info("Process verb " + statement.getVerb().getId());

        // Process Person
        person = processPerson.processPerson(statement);

        // Get VerbId
        String verbId = statement.getVerb().getId();

        // Process rule
        droolsProcessStatementService.processStatement(person, statement, verbId, objType);

      } else {
        log.info("Verb " + statement.getVerb().getId() + " is not recognized.");
      }

    } catch (AggregatorException
        | ClassCastException
        | PersonNotFoundException
        | JsonProcessingException e) {
      log.error("Error processing Kafka message - " + e.getMessage());
      e.printStackTrace();
      throw new AggregatorException("Error processing Kafka message - " + e.getMessage());
    }
  }

  /**
   * @param payload
   * @return Statement
   */
  public Statement getStatement(String payload) throws JsonProcessingException {

    Statement statement = null;
    ObjectMapper mapper = Mapper.getMapper();
    MessageVO messageVo;

    try {

      messageVo = mapper.readValue(payload, MessageVO.class);
      statement = messageVo.getStatement();

    } catch (JsonProcessingException e) {
      log.error("Error getting statement - " + e.getMessage());
      e.printStackTrace();
      throw e;
    }

    return statement;
  }
}
