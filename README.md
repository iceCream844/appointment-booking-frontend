# 📅 Appointment Booking System - Frontend

A modern React-based frontend for the Appointment Booking System. This application provides a responsive user interface for users and administrators to manage appointments through a secure REST API.

> This project is part of my full-stack software engineering portfolio.

---

## 🚀 Features

### Authentication
- User Login
- User Registration
- JWT Authentication
- Automatic Logout when token expires

### User Dashboard
- View personal appointments
- Create appointments
- Update appointments
- Delete appointments
- User profile information

### Admin Dashboard
- Dashboard statistics
- User management
- Search users
- Edit user information
- Delete users
- View user appointments
- Edit appointment status
- Delete appointments

### UI Features
- Responsive design
- Modern dashboard layout
- Modal dialogs
- Search functionality
- Status badges
- Role-based interface
- Hover animations
- Clean and simple user experience

---

## 🛠️ Built With

- React
- React Router DOM
- Axios
- JavaScript (ES6+)
- CSS3
- HTML5

---

## 🔐 Authentication

Authentication is implemented using JSON Web Token (JWT).

After successful login:

- JWT is stored in Local Storage
- Protected pages require a valid token
- Invalid or expired tokens automatically redirect to the login page

---

# 📁 Project Structure

```text
src
│
├── api
│   └── axios.js
│
├── assets
│
├── components
│   ├── admin
│   │   ├── AdminDashboard.jsx
│   │   ├── DashboardStats.jsx
│   │   ├── UserAppointmentModal.jsx
│   │   ├── UserEditModal.jsx
│   │   ├── UserRow.jsx
│   │   └── UserTable.jsx
│   │
│   ├── user
│   │   ├── AppointmentForm.jsx
│   │   ├── AppointmentItem.jsx
│   │   └── AppointmentList.jsx
│   │
│   └── Navbar.jsx
│
├── pages
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   └── UserDashboard.jsx
│
├── services
│   ├── appointmentService.js
│   ├── authService.js
│   └── userService.js
│
├── style
│   ├── admin.css
│   ├── dashboard.css
│   ├── login.css
│   └── index.css
│
├── utils
│   └── auth.js
│
├── App.jsx
└── main.jsx

## 📡 Backend

This frontend communicates with the Appointment Booking System REST API developed using Spring Boot.

Main API endpoints include:

```
POST   /api/auth/login

POST   /api/users

GET    /api/users

GET    /api/users/me

PUT    /api/users/{id}

DELETE /api/users/{id}

GET    /api/appointments

GET    /api/appointments/me

POST   /api/appointments

PUT    /api/appointments/{id}

DELETE /api/appointments/{id}
```

---

## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/iceCream844/appointment-booking-frontend.git
```

Go into the project

```bash
cd appointment-booking-frontend
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

Frontend will run at

```
http://localhost:5173
```

---

## 🔗 Backend Requirement

The backend server must be running before starting the frontend.

Default backend URL:

```
http://localhost:8080
```

---

## 📸 Screenshots

### Login Page

<img width="992" height="940" alt="image" src="https://github.com/user-attachments/assets/1cb56e03-3d11-40ad-86f9-84a150c03a36" />


---

### User Dashboard

<img width="1635" height="1202" alt="image" src="https://github.com/user-attachments/assets/cdf1b9d0-1427-40c4-9acb-7883d4507e48" />

---

### Admin Dashboard

<img width="1022" height="1203" alt="image" src="https://github.com/user-attachments/assets/8934ecbc-618a-4dae-8745-b76dcfd2b4ee" />


<img width="715" height="330" alt="image" src="https://github.com/user-attachments/assets/3fc5acde-703f-4b85-8763-eb8d65c68cf0" />


---

## 🎯 Learning Objectives

This project helped me strengthen my understanding of:

- React Hooks
- Component-based architecture
- React Router
- REST API integration
- JWT Authentication
- State management
- CRUD operations
- Role-based authorization
- Responsive UI design
- Clean project structure

---

## 📈 Future Improvements

- Pagination
- Toast notifications
- Dark mode
- Loading skeletons
- Confirmation dialogs
- Dashboard charts
- Docker deployment
- Unit testing
- E2E testing

---

## 👨‍💻 Author

**San Wai Chung**
