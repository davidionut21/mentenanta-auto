# Stage 5: AI log

## Tools

- ChatGPT

## Conversations

- (https://chatgpt.com/c/6ac4d883-4a50-83eb-8ed3-4576ec18bbd4)

## Key requests

### 1. Moving the maintenance list to React state

- Asked: Help me implement Stage 5 using React local state while keeping the existing automotive dashboard design.
- Got: The maintenance operation array was converted from static data to initial data used by `useState`.
- Changed or rejected: The generic TaskFlow names from the guide were adapted to the vehicle maintenance project.

### 2. Toggling operation state

- Asked: Help me allow a maintenance operation to be marked as completed or pending from the interface.
- Got: A controlled checkbox was added to each operation card. The operation is updated immutably with `map`.
- Changed or rejected: The guide's `gata` field was adapted to the existing `completed` field.

### 3. Deleting operations

- Asked: Help me delete maintenance operations directly from the interface.
- Got: A delete button was added to each card and the list is updated immutably with `filter`.
- Changed or rejected: The button styling was adapted to the existing automotive dashboard.

### 4. Derived dashboard values

- Asked: Keep the existing dashboard counters synchronized with React state.
- Got: Total, pending, completed, progress and operation type values are calculated directly from the current operation list.
- Changed or rejected: No separate state was created for the counters because they are derived values.

### 5. Passing event handlers through props

- Asked: Keep the component structure from Stage 4.
- Got: `App` owns the state and sends `onToggle` and `onDelete` to `OperatiuniList`, which forwards them to `OperatiuneCard`.
- Changed or rejected: Child components do not modify the operation array directly.

### 6. Light and dark mode

- Asked: Add the Stage 5 light/dark theme functionality without removing the custom automotive design.
- Got: A theme state and toggle button were added. The selected theme is applied using the `data-theme` attribute on the HTML element.
- Changed or rejected: The generic theme design from the guide was adapted to the existing graphite and orange automotive design.

### 7. Testing

- Asked: Help me verify all Stage 5 requirements.
- Got: The application is tested by toggling operations, deleting operations, deleting the complete list, switching between themes and checking the browser console.
- Changed or rejected: The existing dashboard statistics are also checked because they depend on the operation state.

## What I learned / what did not work

I learned how React `useState` stores data that can change while the application is running.

I learned why state should not be modified directly and how `map` and `filter` create new arrays for immutable updates.

I learned how callback functions can be passed through props from a parent component to child components.

I learned how a controlled checkbox uses both `checked` and `onChange`.

I learned the difference between values stored in state and values derived from existing state.

I learned how a button can switch the application between light and dark themes by combining React state with the `data-theme` attribute.

The maintenance dashboard is now interactive while preserving the component structure and visual design created in the previous stages.