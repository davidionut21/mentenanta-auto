# Stage 3: AI log

## Tools

- ChatGPT

## Conversations

- (https://chatgpt.com/c/6ac4d883-4a50-83eb-8ed3-4576ec18bbd4) (Vite and React setup, migration from Stage 2, JSX and build verification)

## Key requests

### 1. Vite and React project setup

- Asked: Help me initialize Stage 3 of the vehicle maintenance management project using Vite and React.
- Got: Instructions for creating the React project inside the `frontend` folder, installing dependencies with npm and starting the development server with Vite.
- Changed or rejected: The generic examples from the guide were adapted to the vehicle maintenance management application.

### 2. Moving the previous stages

- Asked: Help me keep the files from Stage 1 and Stage 2 without interfering with the new React project.
- Got: The previous `index.html`, `style.css` and `mentenanta.js` files were moved into the `mockup` folder.
- Changed or rejected: The JavaScript file is named `mentenanta.js` instead of the example `taskuri.js` from the guide.

### 3. Reusing the Stage 1 styles

- Asked: Help me reuse the existing CSS in the React application.
- Got: The styles from `mockup/style.css` were copied into `frontend/src/App.css`.
- Changed or rejected: The `.container` layout was changed temporarily to one column because Stage 3 only displays the data panel.

### 4. React component and project data

- Asked: Help me move the Stage 2 data into the main React component.
- Got: The three maintenance operations were added to `App.jsx`, and the number of pending operations is calculated automatically from the array.
- Changed or rejected: The TaskFlow example data from the guide was replaced with the maintenance operations from this project.

### 5. JSX and application structure

- Asked: Help me create the main React files correctly.
- Got: `main.jsx` imports `App.jsx` and `App.css`, while `App.jsx` displays the application title, the calculated counter and the operation data as raw JSON.
- Changed or rejected: Normal HTML attributes were adapted to JSX where necessary, such as using `className`.

### 6. Development server and build

- Asked: Help me run and verify the React application.
- Got: The application was started with `npm run dev` and tested on the local Vite server. The production build was also tested successfully with `npm run build`.
- Changed or rejected: The application is no longer opened directly from `index.html`; it now runs through the Vite development server.

## What I learned / what did not work

I learned how to initialize a React project using Vite and how npm installs and manages project dependencies.

I learned the role of `package.json`, `main.jsx`, `App.jsx` and `App.css` in a React project.

I learned some of the differences between HTML and JSX, including the use of `className` instead of `class` and the use of braces for JavaScript expressions.

I learned how data can be stored in a JavaScript array and used directly inside a React component.

I also learned how to calculate values from the data and display them automatically in the interface.

During the setup, the page temporarily stopped working because `main.jsx` was still importing the deleted `index.css` file. The problem was fixed by replacing that import with `App.css`.

I verified that the application runs correctly with `npm run dev` and that the project builds successfully with `npm run build`.