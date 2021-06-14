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

//
function viewAllEmployeesByDepartment() {
  console.log("Viewing Departments.\n");
  let query = `SELECT * FROM department`;

  connection.query(query, function (err, res) {
    if (err) throw err;

    const departmentSelection = res.map((data) => ({
      name: data.name,
      value: data.id,
    }));
    console.log(departmentSelection);
    console.table(res);

    promptDepartment(departmentSelection);
  });
}
function promptDepartment(departmentSelection) {
  inquirer
    .prompt([
      {
        type: "list",
        name: "department_name",
        message: "Select a Department:",
        choices: departmentSelection,
      },
    ])
    .then(function (answer) {
      console.log("You chose department: ", answer.department_name, "\n");

      let query = `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department 
      FROM employee e
      JOIN role r
      ON e.role_id = r.id
      JOIN department d
      ON d.id = r.department_id
      WHERE d.id = ?`;

      connection.query(query, answer.department_name, function (err, res) {
        if (err) throw err;

        console.table("Employees in this department: ", res);

        init();
      });
    });
}
function addEmployee() {
  console.log("Viewing Add Employees.\n");
  let query = `SELECT * FROM employee`;

  connection.query(query, function (err, res) {
    if (err) throw err;

    const employee = res.map(({ id, first_name, last_name, manager_id }) => ({
      value: manager_id,
      firstName: `${first_name}`,
      lastName: `${last_name}`,
      managerId: `${manager_id}`,
    }));

    let query2 = `SELECT * FROM role`;

    connection.query(query2, function (err, res) {
      if (err) throw err;

      const roleSelection = res.map(({ id, title, salary }) => ({
        value: id,
        title: `${title}`,
        salary: `${salary}`,
      }));
      console.table(res);

      promptRole(roleSelection, employee);
    });
  });
}

function promptRole(roleSelection, employee) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the Employees First Name?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the Employees Last Name?",
      },
      {
        type: "list",
        name: "roleId",
        message: "What is the Employees Role by id?",
        choices: roleSelection,
      },
      {
        type: "list",
        name: "manager_id",
        message: "Choose the employee's manager by id: ",
        choices: employee,
        default: "N/A",
      },
    ])
    .then(function (answer) {
      console.log(answer);

      let query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answer.first_name}','${answer.last_name}', ${answer.roleId}, '${answer.manager_id}');`;

      connection.query(query, function (err, res) {
        if (err) throw err;

        console.table(res);
        console.log(res.affectedRows + " row inserted successfully!\n");

        init();
      });
    });
}

//
function removeEmployee() {
  console.log("Viewing Remove Employee.\n");

  let query = `SELECT * FROM employee`;

  connection.query(query, function (err, res) {
    if (err) throw err;

    const removeEmployeeSelected = res.map(({ id, first_name, last_name }) => ({
      value: id,
      name: `${id} ${first_name} ${last_name}`,
    }));

    console.table(res);

    promptRemove(removeEmployeeSelected);
  });
}
function promptRemove(removeEmployeeSelected) {
  inquirer
    .prompt([
      {
        type: "list",
        name: "employee_id",
        message: "Which Employee would you like to Remove?",
        choices: removeEmployeeSelected,
      },
    ])
    .then(function (answer) {
      let query = `DELETE FROM employee WHERE ?`;

      connection.query(query, { id: answer.employee_id }, function (err, res) {
        if (err) throw err;

        console.table(res);
        console.log(res.affectedRows + " Employee Deleted.\n");

        init();
      });
    });
}

//
function updateEmployeeRole() {
  console.log("Viewing Update Employee.\n");
  employeeArray();
}

function employeeArray() {
  console.log("Update an Employee.");

  let query = `SELECT e.id, e.first_name, e.last_name
  FROM employee e`;

  connection.query(query, function (err, res) {
    if (err) throw err;

    const updatedEmployeeChoice = res.map(({ id, first_name, last_name }) => ({
      value: id,
      title: `${first_name} + ${last_name}`,
    }));

    console.table(res);
    console.log("Success!\n");

    roleArray(updatedEmployeeChoice);
  });
}
function roleArray(updatedEmployeeChoice) {
  console.log("Updating");

  let query = `SELECT e.id, e.first_name, e.last_name, r.title, r.department_id, r.salary, e.manager_id
  FROM employee e
  JOIN role r
  ON e.role_id = r.id
  JOIN department d
  ON d.id = r.department_id
  JOIN employee m
  ON m.id = e.manager_id`;

  let roleChoices;

  connection.query(query, function (err, res) {
    if (err) throw err;

    roleChoices = res.map(({ id, title, salary }) => ({
      value: id,
      title: `${title}`,
      salary: `${salary}`,
    }));

    console.table(res);
    console.log("Success!\n");

    promptEmployeeRole(updatedEmployeeChoice, roleChoices);
  });
}

function promptEmployeeRole(updatedEmployeeChoice, roleChoices) {
  inquirer
    .prompt([
      {
        type: "list",
        name: "employee_id",
        message: "Select Employee by ID to Set Role:",
        choices: updatedEmployeeChoice,
      },
      {
        type: "list",
        name: "role_id",
        message: "Select which Role by ID you would like to update it to:",
        choices: roleChoices,
      },
    ])
    .then(function (answer) {
      let query = `UPDATE employee SET ? WHERE ?`;

      connection.query(
        query,
        [answer.role_id, answer.employee_id],
        function (err, res) {
          if (err) throw err;

          console.table(res);
          console.log(res.affectedRows + "Update Success.");

          init();
        }
      );
    });
}

//
function addRole() {
  console.log("Viewing Add Role.\n");
  let query = `SELECT d.id, d.name, r.salary AS budget
  FROM employee e
  JOIN role r
  ON e.role_id = r.id
  JOIN department d
  ON d.id = r.department_id`;

  connection.query(query, function (err, res) {
    if (err) throw err;

    const departmentChoices = res.map(({ id, name }) => ({
      value: id,
      name: `${name}`,
    }));

    console.table(res);
    console.log("Department Array.");

    promptAddRole(departmentChoices);
  });
}
function promptAddRole(departmentChoices) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "role_title",
        message: "Add Role Title?",
      },
      {
        type: "input",
        name: "role_salary",
        message: "What is the Role Salary?",
      },
      {
        type: "list",
        name: "department_id",
        message: "Which Department?",
        choices: departmentChoices,
      },
    ])
    .then(function (answer) {
      let query = `INSERT INTO role SET ?`;

      connection.query(
        query,
        {
          title: answer.role_title,
          salary: answer.role_salary,
          department_id: answer.department_id,
        },
        function (err, res) {
          if (err) throw err;

          console.table(res);
          console.log("Success!\n");

          init();
        }
      );
    });
}
