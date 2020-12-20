const inquirer= require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql2");
let deptArr = [];
let roleArr = [];
let emplArr = [];
let managerArr = [];

const connection = mysql.createConnection({
    host: "localhost", 
    port: 3306,
    user: "root",
    password: "Snicker13@",
    database: "employees_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("\n WELCOME TO EMPLOYEE TRACKER \n");
    init();
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
    // getDepts();
    // getRoles();
    // getManagers();
  }

  function getDepts() {
    connection.query(`SELECT name FROM department`, function (err, departments) {
      if (err) throw err;
      deptArr = [];
      for (i = 0; i < departments.length; i++) {
        deptArr.push(departments[i].name);
      }
      console.log(deptArr); 
    });
  }

  function getRoles() {
    connection.query(`SELECT title FROM role`, function (err, roles) {
      if (err) throw err;
      roleArr = [];
      for (i = 0; i < roles.length; i++) {
        roleArr.push(roles[i].title);
      }
      console.log(roleArr);
    });
  }

  function getManagers() {
    connection.query(`SELECT employee.last_name FROM employee`, function (err, managers) {
      if (err) throw err;
      emplArr = [];
      for (i = 0; i < managers.length; i++) {
        managerArr.push(managers[i].last_name);
      }
      console.log(managerArr);
    });
  }

  function employee() {
    connection.query("SELECT * FROM role", function (err, res) {
      if (err) throw err;
      connection.query("SELECT * FROM employee", function (err, res2) {
        if (err) throw err;
        inquirer
          .prompt([
            {
              name: "first_name",
              type: "input",
              message: "What is the employee's first name?",
            },
            {
              name: "last_name",
              type: "input",
              message: "What is the employee's last name?",
            },
            {
              name: "roleName",
              type: "list",
              message: "What is the employee's role?",
              choices: roleArr,
            },
            {
              name: "managerName",
              type: "list",
              message: "Who is this employee's Manager?",
              choices: managerArr,
            },
          ])
          .then(function (answer) {
            let roleID;
            for (let r = 0; r < res.length; r++) {
              if (res[r].title == answer.roleName) {
                roleID = res[r].role_id;
              }
            }
            let managerID;
            for (let m = 0; m < res2.length; m++) {
              if (res2[m].last_name == answer.managerName) {
                managerID = res2[m].employee_id;
              }
            }
            connection.query(
                "INSERT INTO employee SET ?",
                {
                  first_name: answer.first_name,
                  last_name: answer.last_name,
                  role_id: roleID,
                  manager_id: managerID,
                },
                function (err) {
                  if (err) throw err;
                }
              );
              init();
            });
        });
      });
    }

//nit();

  
  