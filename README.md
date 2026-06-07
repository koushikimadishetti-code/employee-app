# 👥 Employee Manager — Java Full Stack App

A full-stack CRUD application built with **Spring Boot** (backend) + **React** (frontend) + **MySQL** (database).

---

## 📁 Project Structure

```
employee-app/
├── backend/          ← Spring Boot REST API (Java 17)
│   └── src/main/java/com/example/employee/
│       ├── model/          Employee.java
│       ├── repository/     EmployeeRepository.java
│       ├── service/        EmployeeService.java
│       ├── controller/     EmployeeController.java
│       └── exception/      GlobalExceptionHandler.java
└── frontend/         ← React App
    └── src/
        ├── components/     EmployeeTable.js, EmployeeForm.js
        ├── services/       employeeService.js
        └── App.js
```

---

## ⚙️ Prerequisites

- Java 17+
- Maven 3.6+
- Node.js 18+
- MySQL 8+

---

## 🗄️ Database Setup

```sql
CREATE DATABASE employeedb;
```

Then update `backend/src/main/resources/application.properties`:
```properties
spring.datasource.username=root
spring.datasource.password=your_password_here
```

---

## 🚀 Running the App

### Backend (Spring Boot)
```bash
cd backend
mvn spring-boot:run
```
API runs at: **http://localhost:8080**

### Frontend (React)
```bash
cd frontend
npm install
npm start
```
App opens at: **http://localhost:3000**

---

## 🔗 REST API Endpoints

| Method | URL                              | Description          |
|--------|----------------------------------|----------------------|
| GET    | /api/employees                   | Get all employees    |
| GET    | /api/employees/{id}              | Get by ID            |
| POST   | /api/employees                   | Create employee      |
| PUT    | /api/employees/{id}              | Update employee      |
| DELETE | /api/employees/{id}              | Delete employee      |
| GET    | /api/employees/search?query=...  | Search by name       |
| GET    | /api/employees/department/{dept} | Filter by department |

---

## ✨ Features

- ✅ Add, Edit, Delete employees
- ✅ Search by name (real-time)
- ✅ Form validation (frontend + backend)
- ✅ Department badges with color coding
- ✅ Toast notifications
- ✅ Responsive design
