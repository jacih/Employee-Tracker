-- departments
INSERT INTO department (name) VALUES ('Strategy');
INSERT INTO department (name) VALUES ('Marketing');
INSERT INTO department (name) VALUES ('Finance');
INSERT INTO department (name) VALUES ('Human Resources');
INSERT INTO department (name) VALUES ('Technology');
INSERT INTO department (name) VALUES ('Operations'); 

-- roles
INSERT INTO role (title, salary, department_id) VALUES ('Chief Strategist', 125000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Strategy Associate', 60000, 1);

INSERT INTO role (title, salary, department_id) VALUES ('Marketing Manager', 140000, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Creative Director', 160000, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Brand Manager', 90000, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Digital Marketing Manager', 110000, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Marketing Intern', 40000, 2);

INSERT INTO role (title, salary, department_id) VALUES ('Treasury Manager', 75000, 3);
INSERT INTO role (title, salary, department_id) VALUES ('Chief Accountant', 90000, 3);

INSERT INTO role (title, salary, department_id) VALUES ('HR Manager', 100000, 4);
INSERT INTO role (title, salary, department_id) VALUES ('HR Assistant', 65000, 4);

INSERT INTO role (title, salary, department_id) VALUES ('Lead Developer', 155000, 5);
INSERT INTO role (title, salary, department_id) VALUES ('SEO Specialist', 105000, 5);
INSERT INTO role (title, salary, department_id) VALUES ('Developer', 100000, 5);
INSERT INTO role (title, salary, department_id) VALUES ('Junior Developer', 80000, 5);
INSERT INTO role (title, salary, department_id) VALUES ('Freelance Developer', 160000, 5);

INSERT INTO role (title, salary, department_id) VALUES ('Chief Executive Officer', 180000, 6);
INSERT INTO role (title, salary, department_id) VALUES ('Chief Operating Officer', 16000, 6);
INSERT INTO role (title, salary, department_id) VALUES ('Operations Manager', 130000, 6);
INSERT INTO role (title, salary, department_id) VALUES ('I.T. Manager ', 90000, 6);

-- employee
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Bill', 'Pastor', 1, 17);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Phil', 'Smith', 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Claire', 'Loke', 3, 17);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Dharma', 'Ravindra', 4, 17);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Letif', 'Appius', 5, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Belle', 'Florentine', 6, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Agnesa', 'Teuta', 7, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Yoshirou', 'Haruki', 8, 18);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Nadejda', 'Baal', 9, 8);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Greta', 'Sunburg', 10, 18);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Jill', 'Goodall', 11, 10);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Murugan', 'Oluwasegun', 12, 17);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Noe', 'Gunter', 13, 12);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Max', 'Adams', 14, 12);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Plácida', 'Mumtaz', 15, 12);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Liam', 'Blanchard', 16, 12);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Agatka', 'Thecla', 17, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Echo', 'Fumnanya', 18, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Nikhil', 'Serdar', 19, 18);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Catherine', 'Gaios', 20, 18);