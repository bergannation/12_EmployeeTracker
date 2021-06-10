USE Employees;

INSERT INTO `department` (name) VALUES ("Sales");
INSERT INTO `department` (name) VALUES ("Office");
INSERT INTO `department` (name) VALUES ("Warehouse");

INSERT INTO `role` (title, salary, department_id) 
VALUES ("Sales Staff", 95000, 1);

INSERT INTO `role` (title, salary, department_id) 
VALUES ("Sales Manager", 100000, 1);
INSERT INTO `role` (title, salary, department_id) 
VALUES ("Accountant Manager", 80000, 2);
INSERT INTO `role` (title, salary, department_id) 
VALUES ("Accounts Receiveable Manager", 70000, 2);
INSERT INTO `role` (title, salary, department_id) 
VALUES ("Warehouse Manager", 80000, 3);
INSERT INTO `role` (title, salary, department_id) 
VALUES ("Delivery Driver", 50000, 3);


INSERT INTO `employee` (first_name, last_name, role_id, manager_id)
VALUES ("Jane", "Doe", 2, 2);
INSERT INTO `employee` (first_name, last_name, role_id, manager_id)
VALUES ("Bob", "Anderson", 3, 3);
INSERT INTO `employee` (first_name, last_name, role_id, manager_id)
VALUES ("Jerry", "West", 4, 4);
INSERT INTO `employee` (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Jefferson", 5, 5);
INSERT INTO `employee` (first_name, last_name, role_id, manager_id)
VALUES ("Mary", "Brown", 6, 6);


INSERT INTO `employee` (first_name, last_name, role_id, manager_id)
VALUES ("Travis", "Brown", 1, 1);