INSERT into department (name) VALUES ("Sales");
INSERT into department (name) VALUES ("IT");
INSERT into department (name) VALUES ("Security");
INSERT into department (name) VALUES ("HR");

INSERT into role (title, salary, department_id) VALUES ("Sales Manager", 100000, 1);
INSERT into role (title, salary, department_id) VALUES ("Sales person", 50000, 1);
INSERT into role (title, salary, department_id) VALUES ("IT Manager", 100000, 2);
INSERT into role (title, salary, department_id) VALUES ("Engineer", 900000, 2);
INSERT into role (title, salary, department_id) VALUES ("Security Manager", 100000, 3);
INSERT into role (title, salary, department_id) VALUES ("Security AM", 40000, 3);
INSERT into role (title, salary, department_id) VALUES ("Security Personel", 30000, 3);
INSERT into role (title, salary, department_id) VALUES ("Security Trainee", 20000, 3);
INSERT into role (title, salary, department_id) VALUES ("Counselor", 80000, 4);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("John", "Wick", 1, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Memphis", "Raines", 2, 1);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Marky", "Mark", 2, 1);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Neo", "Anderson", 3, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("John", "MacGyver", 4, 3);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Fry", "Farnsworth", 4, 3);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Bender", "Rodriguez", 4, 3);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Bob", "Belcher", 5, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Homer", "Simpson", 6, 5);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Peter", "Griffin", 7, 5);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Rick", "Sanchez", 7, 5);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Stan", "Smith", 8, 5);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Roy", "Mcfreely", 9, null);

