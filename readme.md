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
- **MongoDB** (cloud instance)
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
- Search notes by title or content and tags.

#### Responsive Design
- Optimized for both desktop and mobile devices.

#### State Management
- Redux Toolkit for managing global state.

## 📄 Project Documentation

#### The following documents provide detailed insights into the design and planning of this project:

[High-Level Design (HLD)](https://drive.google.com/file/d/1eE4GrCmObZ1ohGgQEmkRREu3FE6uxfQ3/view?usp=sharing)

[Low-Level Design (LLD)](https://drive.google.com/file/d/1MvJhbhfS9i7XNKqTPv34bfVNJY3Y8RoD/view?usp=sharing)

[Wireframe Diagrams](https://drive.google.com/file/d/1fPmsn9rPY7VR0tY_IEbx56M6iO2mWcIp/view?usp=sharing)

[Architecture Doc](https://drive.google.com/file/d/1M57_N-uNYfaODDsbZG9S2geYlI87zQAQ/view?usp=sharing)

[Report PPT](https://docs.google.com/presentation/d/1KmLq7uE-EtTlhN3BDdeL_bnFIC5KOjac/edit?usp=sharing&ouid=105430555376880772488&rtpof=true&sd=true)

[LinkedIn Post](https://www.linkedin.com/feed/update/urn:li:activity:7317941171819802625/)


#### Contributing
- Contributions are welcome! Feel free to open issues or submit pull requests.