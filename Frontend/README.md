# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

## Project Structure

This project is a **MERN Note App** frontend built with React, Vite, and Redux. Below is an overview of the key files and their purposes:

### **Main Files**
- **`main.jsx`**: The entry point of the application. It sets up the React app with `React.StrictMode` and integrates the Redux store using the `Provider` component.
- **`App.jsx`**: Contains the main routing logic for the app using `react-router-dom`. It includes routes for `Home`, `Signup`, `Login`, and `NoteInfo` pages.

### **Pages**
- **`Home.jsx`**: Displays all notes for the logged-in user. Includes functionality for adding, editing, deleting, searching, and pinning notes.
- **`Signup.jsx`**: Handles user registration with form validation and API integration.
- **`Login.jsx`**: Handles user login with form validation and API integration.
- **`NoteInfo.jsx`**: Displays detailed information about a selected note.

### **Components**
- **`Navbar.jsx`**: Displays the navigation bar with a search bar, user profile, and logout functionality.
- **`NoteCard.jsx`**: Represents a single note card with options to edit, delete, or pin/unpin the note.
- **`AddEditNotes.jsx`**: A modal component for adding or editing notes. Includes fields for title, content, tags, and colors.
- **`TagInput.jsx`**: A reusable component for adding and managing tags.
- **`SearchBar.jsx`**: A search bar component for filtering notes.
- **`ProfileInfo.jsx`**: Displays user profile information and a logout button.
- **`UserProtectWrapper.jsx`**: A higher-order component that protects routes and ensures only authenticated users can access certain pages.

### **Redux**
- **`store.js`**: Configures the Redux store and combines reducers.
- **`userSlice.js`**: Manages user authentication state, including login, logout, and profile updates.

### **Utilities**
- **`helper.js`**: Contains utility functions:
  - `getInitials(name)`: Extracts initials from a name.
  - `validateEmail(email)`: Validates email format using a regular expression.

---

## Features

1. **Authentication**:
   - Signup and login functionality with form validation.
   - User session management using Redux and localStorage.

2. **Notes Management**:
   - Add, edit, delete, and view notes.
   - Pin/unpin notes for prioritization.
   - Search notes by title or content.

3. **UI/UX**:
   - Responsive design with Tailwind CSS.
   - Modals for adding/editing notes.
   - Toast notifications for success/error messages.

4. **State Management**:
   - Redux Toolkit for managing global state.
   - API integration for user authentication and notes CRUD operations.

---

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/rukadikar123/MERN-Note-app.git
   ```

2. Navigate to the frontend directory:
   ```bash
   cd MERN-Note-app/Frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open the app in your browser at https://mern-note-app-1-1cgt.onrender.com


---

```
