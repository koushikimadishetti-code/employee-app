# 👥 Employee Manager — Full Stack App with Login

React + Spring Boot + MySQL | Admin & Employee Role Login

---

## ⚙️ Prerequisites
- Java 17+
- Maven 3.6+
- Node.js 18+
- MySQL 8+

---

## 🗄️ Step 1 — Database Setup

```sql
CREATE DATABASE employeedb;
```

Then open `backend/src/main/resources/application.properties` and set:
```
spring.datasource.password=your_mysql_password
```

The app auto-creates all tables and seeds default users on first run.

---

## 🚀 Step 2 — Run Backend

```bash
cd backend
mvn spring-boot:run
```
API runs at: http://localhost:8080

---

## 🚀 Step 3 — Run Frontend

```bash
cd frontend
npm install
npm start
```
App opens at: http://localhost:3000

---

## 🔑 Login Credentials

| Role     | Username    | Password  |
|----------|-------------|-----------|
| Admin    | admin       | admin123  |
| Employee | john.doe    | emp123    |
| Employee | jane.smith  | emp123    |

---

## ✨ Features

- Role-based login (Admin / Employee)
- Admin: Add, Edit, Delete employees
- Employee: Read-only view
- Real-time search
- Department badges
- Toast notifications
- Responsive design
- Session persists on page reload
