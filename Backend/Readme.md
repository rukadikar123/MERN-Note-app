# MERN Note App Backend

## API Endpoints

### Authentication Routes (`/api/auth`)

1. **POST** `/signup`  
   - Description: Register a new user.  
   - Request Body:  
     ```json
     {
       "userName": "string",
       "email": "string",
       "password": "string"
     }
     ```
   - Response:  
     ```json
     {
       "success": true,
       "message": "user created successfully",
       "user": { "userName": "string", "email": "string", ... }
     }
     ```

2. **POST** `/login`  
   - Description: Log in an existing user.  
   - Request Body:  
     ```json
     {
       "email": "string",
       "password": "string"
     }
     ```
   - Response:  
     ```json
     {
       "success": true,
       "message": "Login successful",
       "user": { "userName": "string", "email": "string", ... },
       "token": "string"
     }
     ```

3. **GET** `/logout`  
   - Description: Log out the current user.  
   - Response:  
     ```json
     {
       "success": true,
       "message": "User logout successfully"
     }
     ```

---

### Note Routes (`/api/note`)

1. **POST** `/add`  
   - Description: Add a new note.  
   - Request Body:  
     ```json
     {
       "title": "string",
       "content": "string",
       "tags": ["string"]
     }
     ```
   - Response:  
     ```json
     {
       "success": true,
       "message": "note Created successfully",
       "note": { "title": "string", "content": "string", ... }
     }
     ```

2. **POST** `/edit/:noteId`  
   - Description: Edit an existing note.  
   - Request Params:  
     - `noteId`: ID of the note to edit.  
   - Request Body:  
     ```json
     {
       "title": "string",
       "content": "string",
       "tags": ["string"],
       "isPinned": "boolean"
     }
     ```
   - Response:  
     ```json
     {
       "success": true,
       "message": "note updated successfully",
       "note": { "title": "string", "content": "string", ... }
     }
     ```

3. **GET** `/all`  
   - Description: Retrieve all notes for the logged-in user.  
   - Response:  
     ```json
     {
       "success": true,
       "message": "All notes retrieved successfully",
       "notes": [{ "title": "string", "content": "string", ... }]
     }
     ```

4. **DELETE** `/delete/:noteId`  
   - Description: Delete a note.  
   - Request Params:  
     - `noteId`: ID of the note to delete.  
   - Response:  
     ```json
     {
       "success": true,
       "message": "note delete successfully"
     }
     ```

5. **PUT** `/update-note-pinned/:noteId`  
   - Description: Update the pinned status of a note.  
   - Request Params:  
     - `noteId`: ID of the note to update.  
   - Request Body:  
     ```json
     {
       "isPinned": "boolean"
     }
     ```
   - Response:  
     ```json
     {
       "success": true,
       "message": "note updated successfully",
       "note": { "title": "string", "content": "string", ... }
     }
     ```

6. **GET** `/search`  
   - Description: Search notes by title, content, or tags.  
   - Request Query:  
     - `query`: Search term.  
   - Response:  
     ```json
     {
       "success": true,
       "message": "notes matching the search query retrieved successfully",
       "notes": [{ "title": "string", "content": "string", ... }]
     }
     ```

---
