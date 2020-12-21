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
    init();
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
    getDepts();
    getRoles();
    getManagers();
  }
  
  function getDepts() {
    connection.query(`SELECT department_name FROM department`, function (
      err,
      departments
    ) {
      if (err) throw err;
      deptArr = [];
      for (i = 0; i < departments.length; i++) {
        deptArr.push(departments[i].department_name);
      }
      
    });
  }
 
  function getRoles() {
    connection.query(`SELECT title FROM role`, function (err, roles) {
      if (err) throw err;
      roleArr = [];
      for (i = 0; i < roles.length; i++) {
        roleArr.push(roles[i].title);
      }
      
    });
  }
  
  function getManagers() {
    connection.query(`SELECT employee.last_name FROM employee`, function (
      err,
      managers
    ) {
      if (err) throw err;
      emplArr = [];
      for (i = 0; i < managers.length; i++) {
        managerArr.push(managers[i].last_name);
      }
     
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
  
  function role() {
    connection.query("SELECT * FROM department", function (err, res) {
      if (err) throw err;
      inquirer
        .prompt([
          {
            name: "title",
            type: "input",
            message: "What is your role title?",
          },
          {
            name: "salary",
            type: "input",
            message: "What is the salary for this role?",
            default: "0.00",
          },
          {
            name: "departmentName",
            type: "list",
            message: "What is your department is this role in?",
            choices: deptArr,
          },
        ])
        .then(function (answer) {
          let deptID;
          for (let d = 0; d < res.length; d++) {
            if (res[d].department_name == answer.departmentName) {
              deptID = res[d].department_id;
            }
          }
          connection.query(
            "INSERT INTO role SET ?",
            {
              title: answer.title,
              salary: answer.salary,
              department_id: deptID,
            },
            function (err) {
              if (err) throw err;
            }
          );
          init();
        });
    });
  }
  function department() {
    inquirer
      .prompt([
        {
          name: "department",
          type: "input",
          message: "What is your department name?",
        },
      ])
      .then(function (answer) {
        connection.query(
          "INSERT INTO department SET ?",
          {
            department_name: answer.department,
          },
          function (err) {
            if (err) throw err;
          }
        );
        init();
      });
  }
  function viewByDepartment() {
    connection.query(
      `SELECT employee.employee_id, employee.first_name, employee.last_name, department.department_name FROM employee 
    LEFT JOIN role ON employee.role_id = role.role_id
    LEFT JOIN department ON role.department_id = department.department_id 
    ORDER BY department.department_name`,
      function (err, data) {
        if (err) throw err;
        console.table(data);
        init();
      }
    );
  }
  function viewByRole() {
    connection.query(
      `SELECT employee.employee_id, employee.first_name, employee.last_name, role.title, role.salary, department.department_name FROM employee 
      LEFT JOIN role ON employee.role_id = role.role_id
      LEFT JOIN department ON role.department_id = department.department_id 
      ORDER BY role.title`,
      function (err, data) {
        if (err) throw err;
        console.table(data);
        init();
      }
    );
  }
  function viewRoles() {
    connection.query(`SELECT * FROM role`, function (err, data) {
      if (err) throw err;
      console.table(data);
      init();
    });
  }
  function viewDepartments() {
    connection.query(`SELECT * FROM department`, function (err, data) {
      if (err) throw err;
      console.table(data);
      init();
    });
  }
  function viewEmployees() {
    connection.query(
      `SELECT employee.employee_id, employee.first_name, employee.last_name, role.title,
    department.department_name AS department,role.salary,CONCAT(a.first_name, " ", a.last_name) AS manager
    FROM employee
    LEFT JOIN role ON employee.role_id = role.role_id
    LEFT JOIN department ON role.department_id = department.department_id
    LEFT JOIN employee a ON a.employee_id = employee.manager_id`,
      function (err, data) {
        if (err) throw err;
        console.table(data);
        init();
      }
    );
  }

  function updateEmployee() {
    connection.query(
      `SELECT concat(employee.first_name, ' ' ,  employee.last_name) AS Name FROM employee`,
      function (err, employees) {
        if (err) throw err;
        emplArr = [];
        for (i = 0; i < employees.length; i++) {
          emplArr.push(employees[i].Name);
        }
        connection.query("SELECT * FROM role", function (err, res2) {
            if (err) throw err;
            inquirer
              .prompt([
                {
                  name: "employeeChoice",
                  type: "list",
                  message: "Which employee would you like to update?",
                  choices: emplArr,
                },
                {
                  name: "roleChoice",
                  type: "list",
                  message: "What is the employee's new role?",
                  choices: roleArr,
                },
              ])
              .then(function (answer) {
                let roleID;
                for (let r = 0; r < res2.length; r++) {
                  if (res2[r].title == answer.roleChoice) {
                    roleID = res2[r].role_id;
                  }
                }
                
                connection.query(
                  `UPDATE employee SET role_id = ? WHERE employee_id = (SELECT employee_id FROM(SELECT employee_id FROM employee WHERE CONCAT(first_name," ",last_name) = ?)AS NAME)`,
                  [roleID, answer.employeeChoice],
                  function (err) {
                    if (err) throw err;
                  }
                );
                init();
              });
          });
        }
      );
    }