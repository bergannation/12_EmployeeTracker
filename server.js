const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "Employees",
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`Start the Employee Tracker Application!`);
  init();
});

function init() {
  // start inquirer
  inquirer
    .prompt({
      type: "list",
      name: "userChoice",
      message: "Choose what you would like to do:",
      choices: [
        "View All Employees",
        "View All Employees by Department",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Add Role",
        "Exit",
      ],
    })
    .then(function ({ userChoice }) {
      switch (userChoice) {
        case "View All Employees":
          // run function
          viewAllEmployees();
          break;

        case "View All Employees by Department":
          //
          viewAllEmployeesByDepartment();
          break;

        case "Add Employee":
          //
          addEmployee();
          break;

        case "Remove Employee":
          //
          removeEmployee();
          break;

        case "Update Employee Role":
          //
          updateEmployeeRole();
          break;

        case "Add Role":
          //
          addRole();
          break;

        case "Exit":
          connection.end;
          break;
      }
    });
}
//
function viewAllEmployees() {
  console.log("Viewing Employees.\n");
  let query = `SELECT e.id, e.first_name, e.last_name, r.title, r.department_id, r.salary, e.manager_id
    FROM employee e
    LEFT JOIN role r
	ON e.role_id = r.id
    LEFT JOIN department d
    ON d.id = r.department_id
    LEFT JOIN employee m
	ON m.id = e.manager_id`;

  connection.query(query, function (err, res) {
    if (err) throw err;

    console.table(res);
    console.table("Successful Query on All Employees!\n");

    init();
  });
}

function viewAllEmployeesByDepartment() {
  console.log("Viewing Departments.\n");
  init();
}
function addEmployee() {
  console.log("Viewing Add Employees.\n");
  init();
}
function removeEmployee() {
  console.log("Viewing Remove Employee.\n");
  init();
}
function updateEmployeeRole() {
  console.log("Viewing Update Employee.\n");
  init();
}
function addRole() {
  console.log("Viewing Add Role.\n");
  init();
}
