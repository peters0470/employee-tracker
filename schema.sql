DROP DATABASE IF EXISTS employees_DB;
CREATE DATABASE employees_DB;
USE employees_DB;

CREATE TABLE department (
  id INTEGER NOT NULL auto_increment,
  name VARCHAR(30),
  primary key (id)
);

CREATE TABLE role (
  id INTEGER NOT NULL auto_increment,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INTEGER,
  FOREIGN KEY (department_id) REFERENCES department(id),
  primary key (id)
);

CREATE TABLE employee (
  id INTEGER NOT NULL auto_increment,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INTEGER,
  manager_id INTEGER,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES role(id),
  primary key (id)
);