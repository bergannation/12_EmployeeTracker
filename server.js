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
