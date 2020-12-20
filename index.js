const inquirer= require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql2");

var connection = mysql.createConnection({
    host: "localhost", 
    port: 3306,
    user: "root",
    password: "Snicker13@",
    database: "employees".db
});

const mainMenu = [
    {
      type: "list",
      name: "firstChoice",
      message: "What would you like to do?",
      choices: [
        "Add Employee",
        "Add Role",
        "Add Department",
        "View All Employees",
        "View All Employees By Role",
        "View All Employees By Department",
        "View All Roles",
        "View All Departments",
        "Update An Employee Role",
        "Exit",
      ],
    },
  ];


connection.connect(function (err) {
    if (err) throw err;
    console.log("\n WELCOME TO EMPLOYEE TRACKER \n");
    
  });

  function init() {
    inquirer.prompt(mainMenu).then((response) => {
      switch (response.firstChoice) {
        case "Add Employee":
          employee();
          break;
        case "Add Role":
          role();
          break;
        case "Add Department":
          department();
          break;
        case "View All Employees":
          viewEmployees();
          break;
        case "View All Employees By Role":
          viewByRole();
          break;
        case "View All Employees By Department":
          viewByDepartment();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "View All Departments":
          viewDepartments();
          break;
        case "Update An Employee Role":
          updateEmployee();
          break;
        case "Exit":
          connection.end();
          break;
        default:
          connection.end();
      }
    });
  }

init();

  
  