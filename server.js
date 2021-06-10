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

// NEED TO FIX THE MULTIPLE DEPARTMENTS INPUTTED
function viewAllEmployeesByDepartment() {
  console.log("Viewing Departments.\n");
  let query = `SELECT d.id, d.name, r.salary AS budget
    FROM employee e
    LEFT JOIN role r
    ON e.role_id = r.id
    LEFT JOIN department d
    ON d.id = r.department_id`;

  connection.query(query, function (err, res) {
    if (err) throw err;

    const departmentSelection = res.map((data) => ({
      name: data.name,
      value: data.id,
    }));

    console.table(res);

    promptDepartment(departmentSelection);
  });
}
function promptDepartment(departmentSelection) {
  inquirer
    .prompt([
      {
        type: "list",
        name: "department_id",
        message: "Select a Department:",
        choices: departmentSelection,
      },
    ])
    .then(function (answer) {
      console.log("You chose department: ", answer.department_id, "\n");

      let query = `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department 
      FROM employee e
      JOIN role r
      ON e.role_id = r.id
      JOIN department d
      ON d.id = r.department_id
      WHERE d.id = ?`;

      connection.query(query, answer.department_id, function (err, res) {
        if (err) throw err;

        console.table("Employees in this department: ", res);

        init();
      });
    });
}
function addEmployee() {
  console.log("Viewing Add Employees.\n");
  let query = `SELECT * FROM role`;

  connection.query(query, function (err, res) {
    if (err) throw err;

    const roleChoices = res.map(({ id, title, salary }) => ({
      value: id,
      title: `${title}`,
      salary: `${salary}`,
    }));
    console.table(res);

    promptRole(roleChoices);
  });
}
//
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
