const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');
require('dotenv').config();

const connection = mysql.createConnection(
  {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'employees_db'
  },
  console.log('Connected to the database'),
  console.log('')
);

connection.connect((err) => {
  if (err) {
    console.error(err);
  }
  console.log('============================================');
  console.log('');
  console.log('      WELCOME TO THE EMPLOYEE DATABASE      ');
  console.log('');
  console.log('============================================');
  console.log('');
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
        'Delete Department',
        'Delete Employee',
        'Delete Role',
        'Update Employee Role',
        'Exit'
      ]
    }
  ]).then((response) => {
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
        case 'Delete Department':
          deleteDepartment();
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
        case 'Exit':
          console.log('Thank you for using the Employee Tracker Database');
          connection.end();
          break;
      }
    })
};

const viewDepartments = () => {
  const query = 'SELECT * FROM department;';
  connection.query(query, (err, res) => {
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
  const query = 'SELECT employee.id AS "ID", CONCAT (employee.first_name, " ", employee.last_name) AS "Name", department.dept_name AS "Department", role.title AS "Job Title", role.salary AS "Salary($USD)", CONCAT(manager.first_name, " ", manager.last_name) AS "Manager" FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id;';
  connection.query(query, (err, res) => {
    if (err) {
      console.error(err);
    } else {
      console.log('********** EMPLOYEE LIST **********')
      console.log('');
      console.log(`There are ${res.length} employees in your company`);
      console.log('');
      console.table(res);
      renderEmployeeMenu();
    }
  });
}

const viewEmployeesByDept = () => {
  const query = 'SELECT CONCAT (employee.first_name, " ", employee.last_name) AS "Name", department.dept_name AS "Department" FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id;';
  connection.query(query, (err, res) => {
    if (err) {
      console.error(err);
    } else {
      console.log('');
      console.log('********** EMPLOYEE BY DEPARTMENT **********');
      console.log('');
      console.table(res);
      console.log('');
      renderEmployeeMenu();
    }
  });
}

const viewRoles = () => {
  const query = 'SELECT role.id AS "ID", role.title AS "Job Title", department.dept_name AS "Department" FROM role INNER JOIN department ON role.department_id = department.id;';
  connection.query(query, (err, res) => {
    if (err) {
      console.error(err);
    } else {
      console.log('');
      console.log('********** ROLE LIST **********')
      console.log('');
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
      name: 'addDept',
      validate: (input) => {
        if (!input) {
          console.log('Please enter a department name');
        } else {
          return true;
        }
      }
    }
  ]).then((response) => {
    const query = 'INSERT INTO department (dept_name) VALUES (?);';
    connection.query(query, response.addDept, (err, res) => {
      if (err) {
        console.error(err);
      } else {
        console.log('');
        console.log('The department has been added to your company');
        console.log('');
        viewDepartments();
      }
    });
  });
}

const addEmployee = () => {
  const query = 'SELECT role.id, role.title FROM role;';
  connection.query(query, (err, res) => {
    const roles = res.map(({ id, title }) => ({ name: title, value: id }));
    inquirer.prompt([
      {
        type: 'input',
        message: 'Please enter the new employee\'s first name',
        name: 'first_name',
        validate: (input) => {
          if (!input) {
            console.log('Please enter a first name');
          } else {
            return true;
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
          } else {
            return true;
          }
        }
      },
      {
        type: 'list',
        message: 'Please select the new employee\'s role',
        name: 'role',
        choices: roles
      }
    ]).then((response) => {
      const params = [response.first_name, response.last_name, response.role, null];
      const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);';
      connection.query(query, params, (err, res) => {
        if (err) {
          console.error(err);
        } else {
          console.log('');
          console.log(`The employee, ${response.first_name} ${response.last_name}, has been added to the your company`);
          console.log('');
          viewEmployees();
        }
      });
    });
  });
}

const addRole = () => {
  const query = 'SELECT department.dept_name, department.id FROM department;';
  connection.query(query, (err, res) => {
    if (err) {
      console.error(err);
    }
    const departments = res.map(({ dept_name, id }) => ({ name: dept_name, value: id }));
    inquirer.prompt([
      {
        type: 'input',
        message: 'What is the name of the new role?',
        name: 'title',
        validate: (input) => {
          if (!input) {
            console.log('Please enter a job title');
          }
          return true;
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
          return true;
        }
      },
      {
        type: 'list',
        message: 'Which department does this role belong to?',
        name: 'department',
        choices: departments
      }
    ]).then((response) => {
      const params = [response.title, response.salary, response.department];
        const query = 'INSERT INTO role (title, salary, department_id) VALUES (?,?,?);';
        connection.query(query, params, (err, res) => {
            if (err) {
              console.error(err);
            } else {
              console.log('');
              console.log('The role has been added to the company database.');
              console.log('');
              viewRoles();
            }
          });
        });
  });
}

const deleteDepartment = () => {
  const query = 'SELECT * FROM department;';
  connection.query(query, (err, res) => {
    if (err) {
      console.error(err);
    }
    const department = res.map(({ dept_name, id }) => ({ name: dept_name, value: id }));
    department.push('[CANCEL]');
    inquirer.prompt([
      {
        type: 'list', 
        name: 'department',
        message: "Which department would you like to delete?",
        choices: department
      }
    ]).then(response => {
      if (response.department !== '[CANCEL]') {
        const query = 'DELETE FROM department WHERE id = ?;';
        connection.query(query, response.department, (err, res) => {
          if (err) {
            console.error(err);
          } else {
            console.log('');
            console.log('The department has been deleted from the company database.');
            console.log('');
            viewDepartments();
          }
        });
      } else {
        console.log('');
        console.log('Did not delete any departments from the company\'s database.');
        console.log('');
        viewDepartments();
      }
    });
  });
}

const deleteEmployee = () => {
  const query = 'SELECT * FROM employee;';
  connection.query(query, (err, res) => {
    if (err) {
      console.error(err);
    }
    const employees = res.map(({ first_name, last_name, id }) => ({ name: first_name + ' ' + last_name, value: id }));
    employees.push('[CANCEL]');
    inquirer.prompt([
      {
        type: 'list',
        message: 'Which employee would you like to remove for the company\'s database?',
        name: 'leavingEmployee',
        choices: employees
      }
    ]).then((response) => {
      if (response.leavingEmployee !== '[CANCEL]') {
        const query = 'DELETE FROM employee WHERE id = ?'
        connection.query(query, response.leavingEmployee, (err, res) => {
          if (err) {
            console.error(err);
          } else {
            console.log('');
            console.log('The employee has been removed from the company database.');
            console.log('');
            viewEmployees();
          }
        });
      } else {
          console.log('');
          console.log('Did not remove any employees from the database.');
          console.log('');
          viewEmployees();
        }
    });
  });
}

const deleteRole = () => {
  const query = 'SELECT * FROM role;';
  connection.query(query, (err, res) => {
    if (err) {
      console.error(err);
    }
    const roles = res.map(({ title, id }) => ({ name: title, value: id }));
    roles.push('[CANCEL]');
    inquirer.prompt([
      {
        type: 'list',
        message: 'Which role would you like to femove from your company\'s database?',
        name: "role",
        choices: roles
      }
    ]).then((response) => {
      if (response.role !== '[CANCEL]') {
        const query = 'DELETE FROM role WHERE id = ?;';
        connection.query(query,response.role, (err, res) => {
          if (err) {
            console.error(err);
          } else {
            console.log('');
            console.log(`The role has been removed from the company database.`);
            console.log('Please update any employee who previously held this position.');
            console.log('');
          }
        });
        const query2 = 'SELECT * FROM employee WHERE employee.role_id IS NULL;';
        connection.query(query2, (err, res) => {
          if (err) {
            console.error(err);
          } else {
            console.log('********** EMPLOYEES MISSING A ROLE **********');
            console.log('');
            console.log(`There are ${res.length} employee(s) without a role in the company database.`);
            console.log('');
            console.table(res);
            console.log('');
            renderEmployeeMenu();
          }
        });
      } else {
        console.log('');
        console.log('Did not delete any roles from the company\'s database.');
        console.log('');
        viewRoles();
      }
    });
  });
}

const updateEmployeeRole = () => {
  const query = 'SELECT * FROM employee;';
  connection.query(query, (err, res) => {
    if (err) {
      console.error(err);
    }
    const employees = res.map(({ first_name, last_name, id }) => ({ name: first_name + ' ' + last_name, value: id }));
    const query2 = 'SELECT * FROM role;';
    connection.query(query2, (err, result) => {
      if (err) {
        console.error(err);
      }
      const roles = result.map(({ title, id }) => ({ name: title, value: id }));
      inquirer.prompt([
        {
          type: 'list',
          message: 'Which employee would you like to update?',
          name: 'employee',
          choices: employees
        },
        {
          type: 'list',
          message: `What is the employee's new role?`,
          name: 'role',
          choices: roles
        }
      ]).then((response) => {
        const query = 'UPDATE employee SET ? WHERE ?? = ?;';
        connection.query(query, [{ role_id: response.role}, 'id', response.employee], (err, res) => {
          if (err) {
            console.error(err);
          } else {
            console.log('');
            console.log('The employee\'s role has been updated in the company\'s database.');
            console.log('');
            viewEmployees();
          }
        });
      });
    });
  });
}