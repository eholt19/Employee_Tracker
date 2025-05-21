# Employee Tracker

A command-line content management system (CMS) built with Node.js, PostgreSQL, and Inquirer v8.2.4 that allows users to view and manage a company’s departments, roles, and employees.

---

## 🎥 Walkthrough Video

Watch the full demo here:  
**[Employee Tracker Walkthrough (Google Drive)](https://drive.google.com/file/d/1ASbQe8VRJo9tLO6WUv4_KB021rAW8gT_/view?usp=sharing)**

---

## 📂 GitHub Repository

https://github.com/eholt19/Employee_Tracker

---

## 📋 Features

- View all departments, roles, and employees
- Add new departments, roles, and employees
- Update an existing employee's role
- Command-line interface powered by Inquirer v8.2.4
- SQL schema includes foreign key relationships and joins
- Uses PostgreSQL for data persistence
- Cleanly formatted tables with employee/role/manager info

---

## 🛠️ Tech Stack

- Node.js
- PostgreSQL
- Inquirer v8.2.4
- pg (node-postgres)
- SQL (schema, seeds, joins)

---

## 🧪 Getting Started

1. Clone the repo

```bash
git clone https://github.com/eholt19/Employee_Tracker.git
cd Employee_Tracker
```

2. Install dependencies

```bash
npm install
```

3. Set up PostgreSQL database

```bash
psql -U postgres
CREATE DATABASE employee_tracker;
\q
```

4. Seed the database

```bash
psql -U postgres -d employee_tracker -f schema.sql
psql -U postgres -d employee_tracker -f seeds.sql
```

5. Start the application

```bash
node index.js
```

---

## 💡 User Story

AS A business owner  
I WANT to be able to view and manage the departments, roles, and employees in my company  
SO THAT I can organize and plan my business

---

## ✅ Acceptance Criteria

- View all departments, roles, and employees
- Add departments, roles, and employees via CLI
- Update an employee's role
- Data is saved and retrieved from PostgreSQL
- Follows schema with foreign keys and relationships

---

## 📊 Database Schema

Your app uses three tables:

- **department**
  - `id` (SERIAL PRIMARY KEY)
  - `name` (VARCHAR UNIQUE NOT NULL)

- **role**
  - `id`
  - `title`
  - `salary`
  - `department_id` (foreign key)

- **employee**
  - `id`
  - `first_name`
  - `last_name`
  - `role_id` (foreign key)
  - `manager_id` (nullable foreign key to employee)


---

## 📋 Application Quality

- CLI is user-friendly and easy to navigate
- Tables are formatted clearly with helpful field labels
- Menu options loop and return to main prompt after execution

---

## 👩‍💻 Author

**Emily Holt**  
GitHub: https://github.com/eholt19

---

## 🪪 License

This project is licensed under the [MIT License](LICENSE).
