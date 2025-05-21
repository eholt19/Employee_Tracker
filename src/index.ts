import inquirer from 'inquirer';
import {
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
  addDepartment,
  addRole,
  addEmployee
} from './db/index';

async function mainMenu() {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add a Department',
        'Add a Role',
        'Add an Employee',
        'Exit',
      ],
    },
  ]);

  switch (action) {
    case 'View All Departments':
      const departments = await getAllDepartments();
      console.table(departments);
      break;

    case 'View All Roles':
      const roles = await getAllRoles();
      console.table(roles);
      break;

    case 'View All Employees':
      const employees = await getAllEmployees();
      console.table(employees);
      break;

    case 'Add a Department':
      const { departmentName } = await inquirer.prompt([
        {
          type: 'input',
          name: 'departmentName',
          message: 'Enter the name of the new department:',
        },
      ]);
      await addDepartment(departmentName);
      console.log(`Added department: ${departmentName}`);
      break;

    case 'Add a Role':
      const departmentsList = await getAllDepartments();
      const { title, salary, departmentId } = await inquirer.prompt([
        {
          type: 'input',
          name: 'title',
          message: 'Enter the name of the role:',
        },
        {
          type: 'input',
          name: 'salary',
          message: 'Enter the salary for this role:',
          validate: (input: string) => !isNaN(parseFloat(input)) || 'Please enter a number',
        },
        {
          type: 'list',
          name: 'departmentId',
          message: 'Select the department:',
          choices: departmentsList.map((dept) => ({
            name: dept.name,
            value: dept.id,
          })),
        },
      ]);
      await addRole(title, parseFloat(salary), departmentId);
      console.log(`Added role: ${title}`);
      break;

    case 'Add an Employee':
      const rolesList = await getAllRoles();
      const employeesList = await getAllEmployees(); // for manager selection

      const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
        {
          type: 'input',
          name: 'firstName',
          message: "Enter the employee's first name:",
        },
        {
          type: 'input',
          name: 'lastName',
          message: "Enter the employee's last name:",
        },
        {
          type: 'list',
          name: 'roleId',
          message: "Select the employee's role:",
          choices: rolesList.map((role) => ({
            name: role.title,
            value: role.id,
          })),
        },
        {
          type: 'list',
          name: 'managerId',
          message: "Select the employee's manager:",
          choices: [
            { name: 'None', value: null },
            ...employeesList.map((emp) => ({
              name: `${emp.first_name} ${emp.last_name}`,
              value: emp.id,
            })),
          ],
        },
      ]);

      await addEmployee(firstName, lastName, roleId, managerId);
      console.log(`Added employee: ${firstName} ${lastName}`);
      break;

    case 'Exit':
      console.log('Goodbye!');
      process.exit();
  }

  await mainMenu(); // Loop back to menu
}

mainMenu();
