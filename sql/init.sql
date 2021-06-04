/*
 Creates table sensors.
 */
DROP TABLE sensors;

CREATE TABLE IF NOT EXISTS sensors (
  id serial PRIMARY KEY,
  value VARCHAR (50) NOT NULL,
  voltage VARCHAR (50) NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

TRUNCATE TABLE sensors CASCADE