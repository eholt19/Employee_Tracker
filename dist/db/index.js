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
exports.addEmployee = exports.addRole = exports.addDepartment = exports.getAllEmployees = exports.getAllRoles = exports.getAllDepartments = void 0;
const connection_1 = __importDefault(require("./connection"));
const getAllDepartments = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield connection_1.default.query('SELECT * FROM department');
    return result.rows;
});
exports.getAllDepartments = getAllDepartments;
const getAllRoles = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield connection_1.default.query(`
    SELECT role.id, role.title, department.name AS department, role.salary
    FROM role
    JOIN department ON role.department_id = department.id
  `);
    return result.rows;
});
exports.getAllRoles = getAllRoles;
const getAllEmployees = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield connection_1.default.query(`
    SELECT e.id, e.first_name, e.last_name, r.title AS role, d.name AS department, r.salary,
      CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee e
    JOIN role r ON e.role_id = r.id
    JOIN department d ON r.department_id = d.id
    LEFT JOIN employee m ON e.manager_id = m.id
  `);
    return result.rows;
});
exports.getAllEmployees = getAllEmployees;
const addDepartment = (name) => __awaiter(void 0, void 0, void 0, function* () {
    yield connection_1.default.query('INSERT INTO department (name) VALUES ($1)', [name]);
});
exports.addDepartment = addDepartment;
const addRole = (title, salary, departmentId) => __awaiter(void 0, void 0, void 0, function* () {
    yield connection_1.default.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, departmentId]);
});
exports.addRole = addRole;
const addEmployee = (firstName, lastName, roleId, managerId) => __awaiter(void 0, void 0, void 0, function* () {
    yield connection_1.default.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [firstName, lastName, roleId, managerId]);
});
exports.addEmployee = addEmployee;
