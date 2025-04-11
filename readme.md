# MERN Note App

A **MERN (MongoDB, Express, React, Node.js)** stack application for managing notes. This app allows users to create, edit, delete, and search notes with features like authentication, note pinning, and responsive design.

---

## Project Structure

The project is divided into two main parts:

### 1. **Frontend**
- Located in the `Frontend/` directory.
- Built with **React**, **Vite**, and **Redux Toolkit**.
- Handles the user interface and client-side logic.
- Features include:
  - User authentication (signup/login).
  - Notes management (CRUD operations).
  - Responsive design with **Tailwind CSS**.
  - Toast notifications for success/error messages.

### 2. **Backend**
- Located in the `Backend/` directory.
- Built with **Node.js**, **Express**, and **MongoDB**.
- Handles API endpoints for authentication and notes management.
- Features include:
  - JWT-based authentication.
  - RESTful APIs for notes CRUD operations.
  - Secure password storage with **bcrypt**.

---


## Deployed URL

The application is deployed and accessible at:  
[deployed URL](https://mern-note-app-1-1cgt.onrender.com)

---

## Setup and Installation

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local or cloud instance)
- **npm** 

### Steps to Run the Project

1. **Clone the Repository**
   ```bash
   git clone https://github.com/rukadikar123/MERN-Note-app.git
   cd MERN-Note-app

2. **Setup Backend**  
    ```bash
   cd Backend
   npm install
   npm start

2. **Setup Frontend**  
    ```bash
   cd ../Frontend
   npm install
   npm run dev
   ```

**Technologies Used** --
 **Frontend**
- React: For building the user interface.
- Redux Toolkit: For state management.
- React Router: For routing.
- Tailwind CSS: For styling.
- Axios: For making HTTP requests.
- React Toastify: For notifications.

**Technologies Used** --
 **Backend**
 - Node.js: For server-side JavaScript.
 - Express: For building RESTful APIs.
 - MongoDB: For the database.
 - Mongoose: For MongoDB object modeling.
 - JWT: For authentication.
 - bcrypt: For password hashing.

 ### Features
 #### Authentication
 - Signup and login functionality.
 - JWT-based session management.

#### Notes Management
- Add, edit, delete, and view notes.
- Pin/unpin notes for prioritization.
- Search notes by title or content.

#### Responsive Design
- Optimized for both desktop and mobile devices.

#### State Management
- Redux Toolkit for managing global state.

#### Contributing
- Contributions are welcome! Feel free to open issues or submit pull requests.