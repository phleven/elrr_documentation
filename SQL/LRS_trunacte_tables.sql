SET search_path TO public;

TRUNCATE activity CASCADE;
TRUNCATE actor CASCADE;
TRUNCATE statement_to_activity CASCADE;
TRUNCATE statement_to_actor CASCADE;
TRUNCATE statement_to_statement CASCADE;
TRUNCATE xapi_statement CASCADE;