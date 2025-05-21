"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const index_1 = require("./db/index");
function mainMenu() {
    return __awaiter(this, void 0, void 0, function* () {
        const { action } = yield inquirer_1.default.prompt([
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
                const departments = yield (0, index_1.getAllDepartments)();
                console.table(departments);
                break;
            case 'View All Roles':
                const roles = yield (0, index_1.getAllRoles)();
                console.table(roles);
                break;
            case 'View All Employees':
                const employees = yield (0, index_1.getAllEmployees)();
                console.table(employees);
                break;
            case 'Add a Department':
                const { departmentName } = yield inquirer_1.default.prompt([
                    {
                        type: 'input',
                        name: 'departmentName',
                        message: 'Enter the name of the new department:',
                    },
                ]);
                yield (0, index_1.addDepartment)(departmentName);
                console.log(`Added department: ${departmentName}`);
                break;
            case 'Add a Role':
                const departmentsList = yield (0, index_1.getAllDepartments)();
                const { title, salary, departmentId } = yield inquirer_1.default.prompt([
                    {
                        type: 'input',
                        name: 'title',
                        message: 'Enter the name of the role:',
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: 'Enter the salary for this role:',
                        validate: (input) => !isNaN(parseFloat(input)) || 'Please enter a number',
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
                yield (0, index_1.addRole)(title, parseFloat(salary), departmentId);
                console.log(`Added role: ${title}`);
                break;
            case 'Add an Employee':
                const rolesList = yield (0, index_1.getAllRoles)();
                const employeesList = yield (0, index_1.getAllEmployees)(); // for manager selection
                const { firstName, lastName, roleId, managerId } = yield inquirer_1.default.prompt([
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
                yield (0, index_1.addEmployee)(firstName, lastName, roleId, managerId);
                console.log(`Added employee: ${firstName} ${lastName}`);
                break;
            case 'Exit':
                console.log('Goodbye!');
                process.exit();
        }
        yield mainMenu(); // Loop back to menu
    });
}
mainMenu();
