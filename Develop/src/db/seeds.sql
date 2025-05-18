-- Clean all data
DELETE FROM employee;
DELETE FROM role;
DELETE FROM department;

-- Reset ID sequences so they start from 1
ALTER SEQUENCE department_id_seq RESTART WITH 1;
ALTER SEQUENCE role_id_seq RESTART WITH 1;
ALTER SEQUENCE employee_id_seq RESTART WITH 1;

\echo 'Inserting departments...'
INSERT INTO department (name)
VALUES 
  ('Engineering'),
  ('Human Resources'),
  ('Marketing')
ON CONFLICT (name) DO NOTHING;

\echo 'Inserting roles...'
INSERT INTO role (title, salary, department_id)
VALUES 
  ('Software Engineer', 90000, 1),
  ('HR Manager', 80000, 2),
  ('Marketing Lead', 85000, 3)
ON CONFLICT (title) DO NOTHING;

\echo 'Inserting employees...'
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
  ('Alice', 'Smith', 1, NULL),
  ('Bob', 'Jones', 2, NULL),
  ('Carol', 'White', 3, 1);
