# Contact Management - CRM Mini Feature

## Project Description

This project implements a Contact Management feature, which is a mini-feature of a Customer Relationship Management (CRM) system. It allows users to add, view, update, and delete contact information for customers or clients. The application provides a user-friendly interface for managing contacts efficiently.

## Technical Stack

- Frontend: React.js with Tailwind CSS for styling
- Backend: Node.js with Express.js
- Database: MongoDB

## Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- MongoDB

### Frontend Setup

1. Clone the repository:

   ```
   git clone https://github.com/p-rohitt/erino_assignment.git
   cd frontend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

### Backend Setup

1. Navigate to the backend directory:

   ```
   cd backend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the backend directory and add the following:

   ```
   PORT=5001
   MONGODB_URI=mongodb://localhost:27017/crm_contacts
   ```

4. Start the backend server:
   ```
   node server.js
   ```

### Database Setup

1. Ensure MongoDB is installed and running on your system.
2. The application will automatically create the necessary collections when it first connects to the database.
3. Push the sample_data.json into the mongodb database to get started.

## How Each Part of the App Works

### Frontend (React.js with Tailwind CSS)

1. **Main Component (`ContactManagement.jsx`)**:

   - Manages the state for contacts, form data, pagination, and sorting.
   - Renders the main UI including the contact table and form dialog.

2. **Contact Table**:

   - Displays contacts in a sortable table format.
   - Implements pagination for better performance with large datasets.
   - Provides edit and delete actions for each contact.

3. **Add/Edit Contact Form**:

   - Rendered as a modal dialog.
   - Handles both adding new contacts and editing existing ones.
   - Performs basic form validation.

4. **API Integration**:
   - Uses Axios for making HTTP requests to the backend API.
   - Implements CRUD operations (Create, Read, Update, Delete) for contacts.

### Backend (Node.js with Express.js)

1. **Server Setup (`server.js`)**:

   - Configures Express.js server.
   - Sets up middleware for parsing JSON and handling CORS.

2. **API Routes**:

   - Implements RESTful endpoints for contact operations:
     - GET /api/contacts: Retrieve all contacts
     - POST /api/contacts: Create a new contact
     - PUT /api/contacts/:id: Update an existing contact
     - DELETE /api/contacts/:id: Delete a contact

3. **Database Integration**:

   - Uses Mongoose ODM for MongoDB interactions.
   - Defines a Contact schema and model.

4. **Error Handling**:
   - Implements try-catch blocks for error handling in async operations.
   - Returns appropriate error responses to the client.

### Database (MongoDB)

1. **Contact Schema**:

   - Defines the structure for contact documents:
     - firstName (String, required)
     - lastName (String, required)
     - email (String, required, unique)
     - phoneNumber (String, required)
     - company (String)
     - jobTitle (String)

2. **Indexing**:
   - Creates an index on the email field for faster queries and to ensure uniqueness.

## Technical Decisions

1. **React.js for Frontend**: Chosen for its component-based architecture, which allows for reusable UI elements and efficient rendering.

2. **Tailwind CSS**: Selected for rapid UI development with utility-first classes, providing a consistent design system.

3. **Node.js and Express.js for Backend**: Provides a lightweight and flexible backend solution, well-suited for building RESTful APIs.

4. **MongoDB**: Chosen for its flexibility with document-based storage, which aligns well with the varying nature of contact information.

5. **Axios for API Calls**: Provides a simple and consistent API for making HTTP requests from the browser.

6. **Server-Side Pagination**: Implemented to improve performance when dealing with large datasets.

## Future Improvements

1. Implement authentication and authorization.
2. Add more advanced search and filtering capabilities.
3. Implement data export functionality (e.g., to CSV).
4. Add form validation on the frontend using a library like Formik or react-hook-form.
5. Implement error boundaries in React for better error handling on the frontend.
6. Add unit and integration tests for both frontend and backend.
