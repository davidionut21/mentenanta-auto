# Stage 4: AI log

## Tools

- ChatGPT

## Conversations

- (https://chatgpt.com/c/6ac4d883-4a50-83eb-8ed3-4576ec18bbd4) (Stage 4 React components, props, list rendering and conditional rendering)

## Key requests

### 1. Creating React components

- Asked: Help me implement Stage 4 of the vehicle maintenance management project using reusable React components.
- Got: Two components were created inside `frontend/src/components`: one for a single maintenance operation and one for the complete list.
- Changed or rejected: The generic TaskFlow component names from the guide were adapted to the vehicle maintenance application.

### 2. Operation card component

- Asked: Help me display one maintenance operation using data received through props.
- Got: `OperatiuneCard` receives one operation through props and displays its name, type and completed state.
- Changed or rejected: The TaskFlow priority labels were replaced with Maintenance, Repair and Inspection labels.

### 3. Operation list component

- Asked: Help me render all maintenance operations from the array.
- Got: `OperatiuniList` uses `map` to render one `OperatiuneCard` for each operation and uses the operation id as the React key.
- Changed or rejected: The list uses the maintenance project data instead of the TaskFlow example data.

### 4. Empty list handling

- Asked: Help me handle the case where there are no maintenance operations.
- Got: The list component displays an explicit message when the array is empty.
- Changed or rejected: The empty-list message was adapted to the vehicle maintenance theme.

### 5. Replacing the JSON output

- Asked: Help me replace the raw JSON output from Stage 3 with React components.
- Got: The temporary `JSON.stringify` output was removed from `App.jsx` and replaced with `OperatiuniList`.
- Changed or rejected: The visual design from Stage 1 was reused through the existing CSS classes.

### 6. Testing

- Asked: Help me verify the Stage 4 requirements.
- Got: The application was tested with the normal data, an empty array and different completed states. The browser console was also checked for React warnings.
- Changed or rejected: No additional interaction was implemented because state and events are introduced in Stage 5.

## What I learned / what did not work

I learned how to split a React interface into reusable components.

I learned how a parent component sends data to a child component using props.

I learned how to render a list using `map` and why each rendered component needs a unique and stable `key`.

I learned how conditional rendering can display a different message when the list is empty.

I also learned that changing the data in the array automatically changes the rendered cards without manually modifying the JSX for each item.

The interface now displays reusable cards generated entirely from the maintenance operation data.