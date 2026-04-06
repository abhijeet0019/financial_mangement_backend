#  Finance Backend API

##  Project Overview
This project is a backend system for a finance dashboard that allows users to manage financial transactions securely based on their roles. It demonstrates API design, data modeling, business logic, and access control.


##  Features

###  Authentication & Authorization
- JWT-based authentication
- Role-Based Access Control (RBAC)
  - Viewer → View only
  - Analyst → View + analytics
  - Admin → Full access (CRUD)


###  User Management
- Register and login users
- Assign roles (viewer, analyst, admin)
- Manage user status


###  Financial Records
- Create transactions
- View transactions
- Update transactions
- Delete transactions
- Filter by:
  - Type (income/expense)
  - Category
  - Date range


###  Dashboard APIs
- Total income
- Total expenses
- Net balance
- Category-wise summary
- Recent transactions
- Monthly trends


###  Validation & Error Handling
- Input validation middleware
- Proper HTTP status codes
- ObjectId validation
- Secure error handling


###  Data Persistence
- MongoDB database
- Mongoose ODM
- Schema-based data modeling


##  Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (Authentication)
- bcrypt (Password hashing)



