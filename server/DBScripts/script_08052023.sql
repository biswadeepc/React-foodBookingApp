CREATE SCHEMA orders; -- New schema created

SET search_path TO orders, public; -- Set the search path to new schema first then the default schema

-- Getting "Permission denied for schema orders" even after the above grants.
-- Steps followed. 1. Right click on the schema (orders)
-- 2. Select Properties
-- 3. Modify the owner of the schema to asg_admin

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA orders TO asg_admin;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA orders TO asg_admin;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA orders TO asg_admin;
GRANT ALL PRIVILEGES ON ALL PROCEDURES IN SCHEMA orders TO asg_admin;

-- CREATE FUNCTION TO GENERATE A SNOWFLAKE ID FOR TABLE PRIMARY KEYS

CREATE SEQUENCE orders.custom_id_seq;
ALTER SEQUENCE orders.custom_id_seq OWNER TO asg_admin;

CREATE OR REPLACE FUNCTION orders.gen_custom_id()
    RETURNS bigint
    LANGUAGE 'plpgsql'
AS $BODY$
DECLARE
    epoch bigint := 1683564201000;
	-- Monday, 8 May 2023 22:13:21 GMT+05:30
    seq_id bigint;
    now_millis bigint;
    -- the id of this DB shard, must be set for each
    -- schema shard you have - you could pass this as a parameter too
    shard_id int := 1;
    result bigint:= 0;
BEGIN
    SELECT nextval('orders.custom_id_seq') % 1024 INTO seq_id;

    SELECT FLOOR(EXTRACT(EPOCH FROM clock_timestamp()) * 1000) INTO now_millis;
    result := (now_millis - epoch) << 23;
    result := result | (shard_id << 10);
    result := result | (seq_id);
	return result;
END;
$BODY$;

ALTER FUNCTION orders.gen_custom_id() OWNER TO asg_admin;

-- INSERT Query and select query:
-- ---------------------------------

-- SELECT orders.gen_custom_id()

INSERT INTO orders.user_hdr(
	user_emp_id, user_name, user_psw, user_fname, user_lname, user_status, created_by)
	VALUES ('98987', 'haripada.bandwala@gmail.com', 'asdfasde34253343de', 'Haripada', 'Bandwala', 1, 1);
	
-- select * from orders.user_hdr