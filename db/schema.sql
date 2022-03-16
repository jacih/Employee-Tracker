DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
USE employees_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 2),
    department_id INT,
      CONSTRAINT fk_department
      FOREIGN KEY (department_id)
      REFERENCES department(id)
      ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT(10) AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
      CONSTRAINT fk_role
      FOREIGN KEY (role_id)
      REFERENCES role(id)
      ON DELETE SET NULL,
    manager_id INT,
      CONSTRAINT fk_manager
      FOREIGN KEY (manager_id)
      REFERENCES employee(id)
      ON UPDATE CASCADE
      ON DELETE SET NULL
);