
# Stage 9: AI log

## Tools

- ChatGPT
- Visual Studio Code
- Git Bash
- Node.js and Express

## Main request

Implement Stage 9 of the vehicle maintenance management project using the professor's guide.

Replace json-server with a custom Node.js and Express REST API while preserving the existing React dashboard, CRUD functionality, routing and component styling.

## Key requests

### 1. Backend project

- Asked: Create a separate backend folder.
- Got: A Node.js project with Express 5 and CORS.
- Adapted: The backend is named mentenanta-auto-backend and runs on port 3001.

### 2. REST routes

- Asked: Implement all five REST operations.
- Got: GET list, GET by ID, POST, PATCH and DELETE.
- Adapted: All routes use /operatiuni to match the automotive project and tw.json.

### 3. Data model

- Asked: Preserve the existing maintenance operations.
- Got: An in-memory array containing the five automotive examples.
- Adapted: Each item has id, operation, completed, type and description.

### 4. Server-side validation

- Asked: Validate input before creating or updating operations.
- Got: validation.js with checks for operation name, type, completed, description and ID.
- Adapted: Allowed type values match frontend/src/constants.js.

### 5. Error handling

- Asked: Return appropriate HTTP status codes.
- Got: 200 for successful reads and updates, 201 for creation, 204 for deletion, 400 for invalid data, 404 for missing resources and 500 for internal errors.
- Adapted: Errors are returned as JSON objects containing an error field.

### 6. Express middleware

- Asked: Configure CORS, JSON parsing and centralized error handling.
- Got: app.js with cors(), express.json(), a health route, a 404 handler and an error handler.
- Adapted: CORS allows the React application running on localhost:5173.

### 7. Frontend integration

- Asked: Keep the existing React frontend working.
- Got: The request function in api.js reads error messages sent by Express.
- Adapted: React components, navigation and CSS Modules remain unchanged.

### 8. Removing json-server

- Asked: Remove the old mock API.
- Got: A frontend package.json without json-server or the api script.
- Adapted: Backend data is now stored in memory instead of frontend/db.json.

## What I learned

I learned how Express routers organize API endpoints.

I learned how middleware processes requests and how CORS allows communication between ports 5173 and 3001.

I learned how server-side validation protects the API independently of the React form.

I learned the meaning of HTTP status codes 200, 201, 204, 400, 404 and 500.

I learned why frontend code does not need major changes when HTTP requests are centralized in api.js.

## Testing checklist

- Start backend with npm run dev.
- Verify /health returns status ok.
- Test the five REST operations with curl.
- Test invalid data and missing IDs.
- Start the React frontend and verify all existing functionality.
- Verify that the browser console has no CORS errors.
- Run npm run lint and npm run build.
- Confirm json-server and db.json have been removed.
