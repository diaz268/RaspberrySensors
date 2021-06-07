-- Delete Table
DROP TABLE IF EXISTS sensors;

-- Create Table
CREATE TABLE IF NOT EXISTS sensors(
  value double PRECISION NULL,
  voltage double PRECISION NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

TRUNCATE TABLE sensors CASCADE;

-- Create Hypertable
SELECT create_hypertable('sensors', 'created_on');

-- Create Trigger
CREATE FUNCTION pg_notify() RETURNS trigger AS $$
BEGIN
  PERFORM pg_notify('watch', row_to_json(NEW)::text);
  RETURN new;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER watch_pg_notify_trigger AFTER INSERT ON sensors
FOR EACH ROW EXECUTE PROCEDURE pg_notify();
