-- departments
INSERT INTO department (dept_name) VALUES ('Operations'); 
INSERT INTO department (dept_name) VALUES ('Strategy');
INSERT INTO department (dept_name) VALUES ('Marketing');
INSERT INTO department (dept_name) VALUES ('Finance');
INSERT INTO department (dept_name) VALUES ('Human Resources');
INSERT INTO department (dept_name) VALUES ('Technology'); 

-- roles
INSERT INTO role (title, salary, department_id) VALUES ('Chief Executive Officer', 180000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Chief Operating Officer', 16000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Operations Manager', 130000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('I.T. Manager ', 90000, 1);

INSERT INTO role (title, salary, department_id) VALUES ('Chief Strategist', 125000, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Strategy Associate', 60000, 2);

INSERT INTO role (title, salary, department_id) VALUES ('Marketing Manager', 140000, 3);
INSERT INTO role (title, salary, department_id) VALUES ('Creative Director', 160000, 3);
INSERT INTO role (title, salary, department_id) VALUES ('Brand Manager', 90000, 3);
INSERT INTO role (title, salary, department_id) VALUES ('Digital Marketing Manager', 110000, 3);
INSERT INTO role (title, salary, department_id) VALUES ('Marketing Intern', 40000, 3);

INSERT INTO role (title, salary, department_id) VALUES ('Treasury Manager', 75000, 4);
INSERT INTO role (title, salary, department_id) VALUES ('Chief Accountant', 90000, 4);

INSERT INTO role (title, salary, department_id) VALUES ('HR Manager', 100000, 5);
INSERT INTO role (title, salary, department_id) VALUES ('HR Assistant', 65000, 5);

INSERT INTO role (title, salary, department_id) VALUES ('Lead Developer', 155000, 6);
INSERT INTO role (title, salary, department_id) VALUES ('SEO Specialist', 105000, 6);
INSERT INTO role (title, salary, department_id) VALUES ('Developer', 100000, 6);
INSERT INTO role (title, salary, department_id) VALUES ('Junior Developer', 80000, 6);
INSERT INTO role (title, salary, department_id) VALUES ('Freelance Developer', 160000, 6);

-- -- employee

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Agatka', 'Thecla', 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Echo', 'Fumnanya', 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Nikhil', 'Serdar', 3, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Catherine', 'Gaios', 4, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Bill', 'Pastor', 5, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Phil', 'Smith', 6, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Claire', 'Loke', 7, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Dharma', 'Ravindra', 8, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Letif', 'Appius', 9, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Belle', 'Florentine', 10, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Agnesa', 'Teuta', 11, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Yoshirou', 'Haruki', 12, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Nadejda', 'Baal', 13, 12);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Greta', 'Sunburg', 14, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Jill', 'Goodall', 15, 14);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Murugan', 'Oluwasegun', 16, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Noe', 'Gunter', 17, 16);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Max', 'Adams', 18, 16);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Plácida', 'Mumtaz', 19, 16);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Liam', 'Blanchard', 20, 16);