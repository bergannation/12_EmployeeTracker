USE Employees;

INSERT INTO `department` (name) VALUES ("Sales");
INSERT INTO `department` (name) VALUES ("Warehouse");
INSERT INTO `department` (name) VALUES ("Marketing");

INSERT INTO `role` (title, salary, department_id) 
VALUES ("Sales Staff", 95000, 1);


INSERT INTO `employee` (first_name, last_name, role_id, manager_id)
VALUES ("Travis", "Brown", 1, 1);