# Stage 2: AI log

## Tools

- ChatGPT

## Conversations

- (https://chatgpt.com/c/6ac4d883-4a50-83eb-8ed3-4576ec18bbd4) (Stage 2 JavaScript implementation, data logic and testing)

## Key requests

### 1. JavaScript data structure

- Asked: Help me implement Stage 2 for the vehicle maintenance management application.
- Got: A JavaScript file named `mentenanta.js` containing an array with the three maintenance operations from Stage 1, each with a unique id, operation name, completed state and type.
- Changed or rejected: The example task data from the project guide was replaced with data specific to the vehicle maintenance application.

### 2. Data logic functions

- Asked: Help me implement the required JavaScript functions for Stage 2.
- Got: Functions for listing operation names, counting pending operations, searching by name, adding an operation with validation, toggling the completed state and deleting an operation.
- Changed or rejected: The function and variable names were adapted to the vehicle maintenance theme.

### 3. Validation and immutable updates

- Asked: Help me validate new operations and keep the original array unchanged.
- Got: Validation for empty operation names and invalid operation types, automatic id generation using the maximum existing id plus one, and immutable updates using `map`, `filter` and the spread operator.
- Changed or rejected: Using `push` and direct object modification was avoided because the Stage 2 requirements specify immutable data operations.

### 4. Console testing

- Asked: Help me test all Stage 2 functionality in the browser console.
- Got: Console tests grouped into reading, adding, modifying/deleting and validation sections.
- Changed or rejected: The JavaScript does not modify the HTML interface and does not use the DOM because Stage 2 requires the data logic to be tested separately.

## What I learned / what did not work

I learned how to represent application data using an array of JavaScript objects with unique identifiers.
I learned how to use `map`, `filter`, `reduce` and `includes` for common data operations.
I learned how to validate input before adding a new object to an array.
I also learned why immutable updates are important and how the spread operator can be used to create new arrays and objects instead of modifying the original data.
I tested the JavaScript functions using the browser console and learned how to organize console output so that each operation can be checked separately.