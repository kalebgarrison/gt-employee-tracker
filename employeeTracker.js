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
        "View all employees by department",
        "View all employees by manager",
        "Add employee",
        "Add role",
        "Add department",
        "Update employee role",
        "Update employee manager",
        "Remove employee",
        "View all roles",
      ],
    })
    .then((choice) => {
      switch (choice.action) {
        case "View all employees":
          allEmployees();
          break;
        case "View all employees by department":
          employeesByDepartment();
          break;
        case "View all employees by manager":
          employeesByManager();
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
      }
    });
}

function allEmployees() {
  const allEmployees = `SELECT employee.id, employee.first_name AS First, employee.last_name AS Last, role.title AS Title, department.name AS Department, role.salary AS Salary, employee.manager_id AS Manager
    FROM employee 
    LEFT JOIN department ON
    department.name = department.name
    LEFT JOIN role ON
    role.title = role.title
    AND
    role.salary = role.salary;`;

  connection.query(allEmployees, (err, res) => {
    if (err) throw err;

    console.log(res);

    console.table(res);
  });
}

function employeesByDepartment() {
  const byDepartment = `SELECT department.name FROM department;`;

  connection.query(byDepartment, (err, res) => {
    if (err) throw err;

    console.log(res);

    console.table(res);
    inquirer
      .prompt([
        {
          name: "choice",
          type: "list",
          choices: function () {
            const choiceArray = [];
            for (let i = 0; i < res.length; i++) {
              choiceArray.push(res[i].name);
            }
            return choiceArray;
          },
          message: "Which department would you like to search in?",
        },
      ])
      .then(function (answer) {
        // get the information of the chosen item
        let chosenItem;
        for (let i = 0; i < res.length; i++) {
          if (res[i].name === answer.choice) {
            chosenItem = res[i];
          }
          console.log(chosenItem)
        }
      });
  });
}
