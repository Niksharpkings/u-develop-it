-- we added ON DELETE SET NULL to tell SQL to set a candidate's party_id field to NULL if the corresponding row in parties is ever deleted.
-- make sure this drop table is on top of create table or ERROR 1146 (42S02) will appear
DROP TABLE IF EXISTS candidates;
DROP TABLE IF EXISTS parties;

-- the ALTER TABLE statement. This statement allows you to add a new field, delete an existing field, or modify a field.

CREATE TABLE parties (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description TEXT
);

--  a new line to the table called a constraint. This allows us to flag the party_id field as an official foreign key and tells SQL which table and field it references.
-- it references the id field in the parties table. This ensures that no id can be inserted into the candidates table if it doesn't also exist in the parties table. MySQL will return an error for any operation that would violate a constraint.

CREATE TABLE candidates (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  party_id INTEGER,
  industry_connected BOOLEAN NOT NULL,
  CONSTRAINT fk_party FOREIGN KEY (party_id) REFERENCES parties(id) ON DELETE SET NULL
);

-- we added ON DELETE SET NULL to tell SQL to set a candidate's party_id field to NULL if the corresponding row in parties is ever deleted.


-- The AS keyword lets you define an alias for your data, which is particularly useful when joining tables that might have overlapping field names.