const inquirer = require('inquirer');
const mysql = require('mysql2');
const { CLIENT_SECURE_CONNECTION } = require('mysql/lib/protocol/constants/client');
const consoleTable = require('console.table');

const connection = mysql.createConnection(
  {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'S3qu3l123!',
    database: 'employees_db'
  },
  console.log('Connected to database')
);

connection.connect(function(err) {
  
  if (err) {
    console.error(err);
  }
  console.log('============================================');
  console.log('');
  console.log('      WELCOME TO THE EMPLOYEE DATABASE      ');
  console.log('');
  console.log('============================================');
  renderEmployeeMenu();
});

const renderEmployeeMenu = () => {
  inquirer.prompt([
    {
      type: 'list',
      message: 'What would you like to do in the employee database?',
      name: 'menu',
      choices: [
        'View All Departments',
        'View All Employees',
        'View All Employees by Department',
        'View All Roles', 
        'Add Department',
        'Add Employee',
        'Add Role',
        'Delete Employee',
        'Delete Role',
        'Update Employee Manager',
        'Update Employee Role',
        'Exit'
      ]
    }
  ]).then(function(response) {
      switch (response.menu) {
        case 'View All Departments':
          viewDepartments();
          break;
        case 'View All Employees':
          viewEmployees();
          break;
        case 'View All Employees by Department':
          viewEmployeesByDept();
          break;
        case 'View All Roles':
          viewRoles();
          break;
        case 'Add Department':
          addDepartment();
          break;
        case 'Add Employee':
          addEmployee();
          break;
        case 'Add Role':
          addRole();
          break;
        case 'Delete Employee':
          deleteEmployee();
          break;
        case 'Delete Role':
          deleteRole();
          break;
        case 'Update Employee Role':
          updateEmployeeRole();
          break;
        case 'Update Employee\'s Manager':
          updateManager();
        case 'Exit':
          console.log('Thank you for using the Employee Tracker Database');
          connection.end();
          break;
      }
    })
};

const viewDepartments = () => {
  const query = 'SELECT * FROM department;';
  connection.query(query, function(err, res) {
    if (err) {
      console.error(err);
    } else {
      console.log('********** DEPARTMENT LIST **********')
      console.log(`There are ${res.length} departments in your company`);
      console.table(res);
      renderEmployeeMenu();
    }
  });
}

const viewEmployees = () => {
  const query = 'SELECT employee.id AS "ID", CONCAT (employee.first_name, " ", employee.last_name) AS "Name", department.name AS "Department", employee_role.title AS "Job Title", employee_role.salary AS "Salary($USD)", CONCAT(manager.first_name, " ", manager.last_name), AS "Manager" FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN departemnt ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager_id;';
  connection.query(query, function(err, res) {
    if (err) {
      console.error(err);
    } else {
      console.log('********** EMPLOYEE LIST **********')
      console.log(`There are ${res.length} employees in your company`);
      console.table(res);
      renderEmployeeMenu();
    }
  });
}

const viewEmployeesByDept = () => {
  const query = 'SELECT CONCAT (employee.first_name, " ", employee.last_name) AS "Name", department_name AS "Department" FROM employee JOIN role ON employee_role_id = role_id JOIN department ON role_department_id = department_id ORDER BY department_id;';
  connection.query(query, function(err, res) {
    if (err) {
      console.error(err);
    } else {
      console.log('********** EMPLOYEE BY DEPARTMENT **********');
      console.table(res);
      renderEmployeeMenu();
    }
  });
}

const viewRoles = () => {
  const query = 'SELECT * FROM role;'
  connection.query(query, function(err, res) {
    if (err) {
      console.error(err);
    } else {
      console.log('********** ROLE LIST **********')
      console.log(`There are ${res.length} roles in your company`);
      console.table(res);
      renderEmployeeMenu();
    }
  });
}

const addDepartment = () => { 
  inquirer.prompt([
    {
      type: 'input',
      message: 'What Department would you like to add?',
      name: 'newDept',
      validate: (input) => {
        if (!input) {
          console.log('Please enter a department name');
        }
      }
    }
  ]).then(function (response) {
    connection.query(`INSERT INTO department (name) VALUES ('${response.newDept});`, function (err, res) {
      if (err) {
        console.error(err);
      } else {
      console.log(`The ${response.name} department has been added to your company`);
      viewDepartments();
      }
    });
  });
}

const addEmployee = () => {
  connection.query('SELECT title, id FROM role;', function(err, res) {
    roles = res.map(({ title, id }) => ({ name: title, value: id }));
    connection.query('SELECT first_name, last_name, id FROM employee WHERE employee.manager_id === employee.role_id;', function (err, res) {
      managers = res.map(({ first_name, last_name, role_id }) => ({ name: `${first_name} ${last_name}`, value: role_id }));
      inquirer.prompt([
        {
          type: 'input',
          message: 'Please enter the new employee\'s first name',
          name: 'first_name',
          validate: (input) => {
            if (!input) {
              console.log('Please enter a first name');
            }
          }
        },
        {
          type: 'input',
          message: 'Please enter the new employee\'s last name',
          name: 'last_name',
          validate: (input) => {
            if (!input) {
              console.log('Please enter a last name');
            }
          }
        },
        {
          type: 'list',
          message: 'Please select the new employee\'s role',
          name: 'role',
          choices: roles
        },
        {
          type: 'list',
          message: 'Please select the new employee\'s manager',
          name: 'manager',
          choices: [...managerList, { name: 'No Manager', value: null }]
        }
      ]).then(function (response) {
        connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${response.first_name}', '${response.last_name}', '${response.role_id}', '${response.manager_id}');`, function (err, res) {
          if (err) {
            console.error(err);
          } else {
          console.log(`The employee, ${response.first_name} ${response.last_name}, has been added to the your company`);
          viewEmployees();
          }
        });
      });
    });
  });
}

const addRole = () => { 
  connection.query('SELECT name, id FROM department;', function(err, res) {
    departmentChoice = res.map(({ name, id }) => ({ name: name, value: id }));
    inquirer.prompt([
      {
        type: 'input',
        message: 'What is the name of the new role?',
        name: 'title',
        validate: (input) => {
          if (!input) {
            console.log('Please enter a job title');
          }
        }
      },
      {
        type: 'input',
        message: 'What is the salary of the new role?',
        name: 'salary',
        validate: (input) => {
          if (isNaN(input) === true) {
            console.log('Please input a number value for the role\'s salary')
          }
        }
      },
      {
        type: 'list',
        message: 'Which department does this role belong to?',
        name: 'department',
        choices: departmentChoice
      }
    ]).then(function (response) {
      connection.query(`INSERT INTO role (title, salary, department_id) VALUES ('${response.title}', '${response.salary}', '${response.department.id}');`, function (err, res) {
        if (err) {
          console.error(err);
        } else {
        console.log(`The ${response.title} has been added to the ${response.departmentChoice}`);
        viewRoles();
        }
      });
    });
  });
}

const deleteEmployee = () => {
  connection.query('SELECT first_name, last_name, id FROM employee;', function (err, res) {
    employees = res.map(({ first_name, last_name, id }) => ({ name: `${first_name} ${last_name}`, value: id }));
    const response = inquirer.prompt([
      {
        type: 'list',
        message: 'Which employee would you like to remove for your company\'s database?',
        name: 'leavingEmployee',
        choices: employees
      }
    ]).then(function (response) {
      connection.query(`DELETE FROM employee WHERE id = ${response.leavingEmployee};`, function (err, res) {
        if (err) {
          console.error(err);
        } else {
        console.log(`The ${response.leavingEmployee} has been deleted from the company database`);
        viewEmployees();
        }
      });
    });
  });
}

const deleteRole = () => {
  connection.query('SELECT * FROM role;', function(err, res) {
    roles = res.map(({ title, id }) => ({ name: title, value: id }));
    const response = inquirer.prompt([
      {
        type: 'list',
        message: 'Which role would you like to delete from your company\'s database?',
        name: "role",
        choices: roles
      }
    ]).then(function (response) {
      connection.query(`DELETE FROM role WHERE id = ${response.role};`, function (err, res) {
        if (err) {
          console.error(err);
        } else {
        console.log(`The ${response.role} has been deleted from the company database`);
        }
      });
      connection.query(`SELECT * FROM employee WHERE role_id === ${response.role.id};`, function (err, res) {
        if (err) {
          console.error(err);
        } else {
          console.log(`${employee.first_name} ${employee.last_name}\'s role has been deleted from the company database. Please update their role.`);
          updateEmployeeRole();
        }
      });
    });
  });
}

const updateEmployeeRole = () => {
  connection.query('SELECT first_name, last_name, id FROM employee', function (err, res) {
    employees = res.map(({ first_name, last_name, id }) => ({ name: `${first_name} ${last_name}`, value: id }));
    connection.query('SELECT title, id FROM role;', function(err, res) {
      roles = res.map(({ title, id }) => ({ name: title, value: id }));
      const response = inquirer.prompt([
        {
          type: 'list',
          message: 'Which employee\'s role would you like to update?',
          name: 'employee',
          choices: employees
        },
        {
          type: 'list',
          message: 'What is the employee\'s new role?',
          name: 'role',
          choices: roles
        },
      ]).then(function (response) {
        connection.query(`UPDATE SET role_id = '${role_id = response.role}' WHERE id = '${response.employee}';`, function(err, res) {
          if (err) {
            console.error(err);
          } else {
          console.log(`The ${response.employee}\'s role has been updated to ${response.role}`);
          viewEmployees();
          }
        });
      });
    });
  });
}