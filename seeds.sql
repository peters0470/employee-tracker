INSERT INTO department (department_id , department_name) VALUES (1, "Human Resources");
INSERT INTO department (department_id , department_name) VALUES (2, "Sales");
INSERT INTO department (department_id , department_name) VALUES (3, "Customer Experience");
INSERT INTO department (department_id , department_name) VALUES (4, "Marketing");
INSERT INTO department (department_id , department_name) VALUES (5, "IT");

INSERT INTO role (role_id, title, salary, department_id) VALUES (1, "HR Coordinator", 30000, 1);
INSERT INTO role (role_id, title, salary, department_id) VALUES (2, "HR Expert", 60000, 1);
INSERT INTO role (role_id, title, salary, department_id) VALUES (3, "Sales Manager", 75000, 2);
INSERT INTO role (role_id, title, salary, department_id) VALUES (4, "Sales Coordinator", 40000, 2);
INSERT INTO role (role_id, title, salary, department_id) VALUES (5, "Customer Service Manager", 45000, 3);
INSERT INTO role (role_id, title, salary, department_id) VALUES (6, "Account Manager", 65000, 3);
INSERT INTO role (role_id, title, salary, department_id) VALUES (7, "Sr Marketing Manager", 85000, 4);
INSERT INTO role (role_id, title, salary, department_id) VALUES (8, "Social Media Manager", 50000, 4);
INSERT INTO role (role_id, title, salary, department_id) VALUES (9, "IT Coordinator", 50000, 5);
INSERT INTO role (role_id, title, salary, department_id) VALUES (10, "IT Manager", 105000, 5);

INSERT into employee (employee_id, first_name, last_name, role_id, manager_id) VALUES (1, "John", "Wick", 3, null);
INSERT into employee (employee_id, first_name, last_name, role_id, manager_id) VALUES (2, "Memphis", "Raines", 2, null);
INSERT into employee (employee_id, first_name, last_name, role_id, manager_id) VALUES (3, "Marky", "Mark", 6, 1);
INSERT into employee (employee_id, first_name, last_name, role_id, manager_id) VALUES (4, "Neo", "Anderson", 10, null);
INSERT into employee (employee_id, first_name, last_name, role_id, manager_id) VALUES (5, "John", "MacGyver", 7, 3);
INSERT into employee (employee_id, first_name, last_name, role_id, manager_id) VALUES (6, "Fry", "Farnsworth", 4, null);
INSERT into employee (employee_id, first_name, last_name, role_id, manager_id) VALUES (7, "Bender", "Rodriguez", 8, 2);
INSERT into employee (employee_id, first_name, last_name, role_id, manager_id) VALUES (8, "Bob", "Belcher", 1, null);
INSERT into employee (employee_id, first_name, last_name, role_id, manager_id) VALUES (9, "Homer", "Simpson", 9, 5);
INSERT into employee (employee_id, first_name, last_name, role_id, manager_id) VALUES (10, "Peter", "Griffin", 5, 4);


