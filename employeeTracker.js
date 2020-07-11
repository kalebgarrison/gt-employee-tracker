const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Kg121144!",
  database: "employee_db",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("\n HI! WELCOME TO EMPLOYEE TRACKER \n");

  startTracker();
});

//   function to start the tracker

function startTracker() {
  // using inquirer here to prompt for what action they would like to take first.

  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all employees",
        "View all departments",
        "View all roles",
        "Add employee",
        "Add role",
        "Add department",
        "Update employee role",
        "Exit",
      ],
    })
    .then((choice) => {
      switch (choice.action) {
        case "View all employees":
          allEmployees();
          break;
        case "View all departments":
          employeesByDepartment();
          break;
        case "View all roles":
          employeesByRoles();
          break;
        case "Add employee":
          addEmployee();
          break;
        case "Add role":
          addRole();
          break;
        case "Add department":
          addDepartment();
          break;
        case "Update employee role":
          updateEmployee();
          break;
        case "Update employee manager":
          updateManager();
          break;
        case "Remove employee":
          removeEmployee();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "Exit":
          connection.end();
          break;
      }
    });
}

// function to show all employees

function allEmployees() {
  const allEmployees = `SELECT employee.id, employee.first_name AS first, employee.last_name AS last, role.title AS title, department.name AS department, role.salary, employee.manager_id
  FROM employee
  LEFT JOIN role 
  ON employee.role_id = role.id
  LEFT JOIN department 
  ON role.department_id = department.id;`;

  connection.query(allEmployees, (err, res) => {
    if (err) throw err;

    console.table(res);
    startTracker();
  });
}

// This allows you to view all the departments

function employeesByDepartment() {
  const byDepartment = `SELECT department.name FROM department;`;

  connection.query(byDepartment, (err, res) => {
    if (err) throw err;

    console.table(res);

    startTracker();
  });
}
// This allows you to add employees to your system

function addEmployee() {
  connection.query(`SELECT * FROM role`, (err, res) => {
    if (err) throw err;
    //New prompts:
    inquirer
      .prompt([
        {
          name: "choice",
          type: "list",
          choices: function () {
            const choiceArray = [];
            for (let i = 0; i < res.length; i++) {
              choiceArray.push(res[i].id);
            }
            return choiceArray;
          },
          message: "Please select the employee's role ID",
        },
        {
          name: "firstName",
          type: "input",
          message: "What is the employee's first name?",
        },
        {
          name: "lastName",
          type: "input",
          message: "What is the employee's last name?",
        },
        {
          name: "manager",
          type: "input",
          message: "What is the employee's manager ID?",
        },
      ])

      .then(function (res) {
        connection.query(
          "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
          [res.firstName, res.lastName, res.choice, res.manager],
          (err, data) => {
            if (err) throw err;
            console.table("Successfully Inserted");
            if (err) throw err;
            startTracker();
          }
        );
      });
  });
}

// This function lets you view all the role titles

function employeesByRoles() {
  const byRole = `SELECT role.title FROM role;`;

  connection.query(byRole, (err, res) => {
    if (err) throw err;
    console.table(res);
    startTracker();
  });
}

// function to add roles

function addRole() {
  //New prompts:
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What title would you like to add?",
      },
      {
        name: "salary",
        type: "number",
        message: "What is the salary associated with this title?",
      },
      {
        name: "department",
        type: "number",
        message: "What is the department ID?",
      },
    ])

    .then(function (res) {
      connection.query(
        "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
        [res.title, res.salary, res.department],
        (err, data) => {
          if (err) throw err;
          startTracker();
        }
      );
    });
}

// function to add departments

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What department name would you like to add?",
      },
    ])

    .then(function (res) {
      connection.query(
        "INSERT INTO department (name) VALUES (?)",
        [res.name],
        (err, data) => {
          if (err) throw err;
          startTracker();
        }
      );
    });
}

// Function that updates employee role

function updateEmployee() {
  inquirer
    .prompt([
      {
        message: "List the first name of the employee you would to update?",
        type: "input",
        name: "name",
      },
      {
        message: "enter the new role ID:",
        type: "number",
        name: "role_id",
      },
    ])
    .then(function (response) {
      connection.query(
        "UPDATE employee SET role_id = ? WHERE first_name = ?",
        [response.role_id, response.name],
        function (err, data) {
          startTracker();
        }
      );
    });
}
