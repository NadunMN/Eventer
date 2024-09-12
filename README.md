# Eventer (MERN)

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [Admin Panel](#admin-panel)
- [Contributing](#contributing)
- [License](#license)

## Introduction
This is an Event Management System built using the MERN stack (MongoDB, Express.js, React, and Node.js). It provides a platform for users to publish, manage, and attend events. Admins can manage users, events, and other system settings.

## Features
### For Users:
- **Sign up/Login:** Users can create an account and log in.
- **View Events:** Users can view all the published events.
- **Publish Events:** Users can create and publish events.
- **Manage Events:** Users can update or delete events they have created.
- **Profile Management:** Users can update their profile information.

### For Admins:
- **User Management:** Admins can view, delete, or update user accounts.
- **Event Management:** Admins can manage all events, including editing, publishing, or removing events.
- **Dashboard:** Admin panel to view an overview of system statistics, such as total users, total events, etc.

## Technologies Used
- **Frontend:**
  - React.js
  - Material-UI (for styling)
  - Axios (for API calls)
  
- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (Database)
  - JWT (for authentication)

- **Others:**
  - Mongoose (ORM for MongoDB)
  - bcrypt (password hashing)
  - Cloudinary (for image uploads, optional)

## Installation

### Prerequisites
- Node.js installed
- MongoDB installed or use MongoDB Atlas for a cloud-hosted database

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/event-management-system.git
   cd Eventer
   ```

2.Install backend dependencies:
  ```bash
  cd backend
  npm install
```

3.Install frontend dependencies:
  ```bash
    cd ../frontend
    npm install
```
   
4.Create environment variables:
Create a .env file in the backend directory with the following content:

  ```bash
    PORT=5000
    MONGO_URI=your_mongo_db_connection_string
    JWT_SECRET=your_jwt_secret
    CLOUDINARY_URL=your_cloudinary_url (optional)
```


5.Start the server:

  ```bash
    cd ../backend
    npm run dev
```
    

6.Start the React frontend:

  ```bash
    cd ../frontend
    npm start
```

7.Open the app in your browser at http://localhost:3000.
