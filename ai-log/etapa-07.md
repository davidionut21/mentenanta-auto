
# Stage 7: AI log

## Tools

- ChatGPT

## Main request

Implement Stage 7 for the vehicle maintenance project using the professor's guide, while preserving the existing automotive dashboard design.

## Key requests

### 1. Controlled form

- Asked: Add a form for creating maintenance operations.
- Got: OperatiuneForm.jsx with controlled inputs using value and onChange.
- Adapted: The generic task fields were replaced with operation and type.

### 2. Validation

- Asked: Validate the form before sending data to the server.
- Got: Validation for required names, a maximum of 100 characters, and allowed operation types.
- Adapted: Errors appear next to the form, not in browser alerts.

### 3. REST API operations

- Asked: Support adding, updating and deleting operations permanently.
- Got: A common request function in api.js with GET, POST, PATCH and DELETE.
- Adapted: All API routes use /operatiuni.

### 4. Updating React state

- Asked: Update the interface only after successful server requests.
- Got: React state uses the objects returned by the server.
- Adapted: Existing statistics and the light/dark button were preserved.

### 5. Automatic verification

- Asked: Follow the teacher's automated verification requirements.
- Got: tw.json, data-testid attributes on cards, inputs, buttons, loading and error messages.
- Adapted: The form-type attribute matches the type field from db.json.

### 6. Styling

- Asked: Keep the existing orange and graphite design.
- Got: A separate OperatiuneForm.css, without replacing the original App.css.

## What I learned

I learned how controlled React forms work and why preventDefault prevents a page reload.

I learned how validation prevents invalid requests and why the form should only be cleared after a successful server response.

I learned how GET, POST, PATCH and DELETE provide persistent CRUD functionality.

I learned how data-testid and tw.json support automated testing.

## Testing

- Verify the empty-name validation message.
- Add a new operation and refresh.
- Toggle and delete operations and refresh.
- Stop the API and verify that the form preserves its input.
- Run npm run lint and npm run build.
