# Sistem de gestiune a mentenantei auto

The application manages the maintenance history of a vehicle.
It allows users to keep track of completed and pending maintenance operations.

## Data model

| Field | Type | Notes |
|---|---|---|
| operation | text | required, max 100 chars |
| completed | boolean | completed or pending, default false |
| type | fixed values | Maintenance, Repair, Inspection |
| category | relation | Engine, Brakes, Tires, Electrical |
| user | relation | the owner of the item (from week 11) |

Sample data used across all stages:

1. Engine oil change, completed, Maintenance
2. Front brake pad replacement, pending, Repair
3. Tire pressure check, pending, Inspection

## How to run

```bash
cd frontend
npm install
npm run dev
```

Then open the address printed in the terminal, usually:

`http://localhost:5173/`

## AI usage

| Tool | Used for |
|---|---|
| ChatGPT | Project theme definition, README structure, implementation guidance through Stage 5 and automotive dashboard styling |

Details per stage: see the `ai-log/` folder.

## Stage 2: data logic

Plain JavaScript, no DOM. `mentenanta.js` holds the array and the functions
that read and change it. Results are printed in the browser console (F12).

The application data is stored as an array of maintenance operations.
Each operation has a unique id, an operation name, a completed state and a type.

The following functionality is implemented:

- list operation names;
- count pending operations;
- search operations by name;
- add a new operation with validation;
- generate a unique id using the maximum existing id plus one;
- toggle the completed state of an operation;
- delete an operation.

The JavaScript functions do not modify the original array. Functions that change
the data return a new array instead.

The allowed operation types are:

- `maintenance`
- `repair`
- `inspection`

## Stage 3: Vite and React project

The app now lives in `frontend/`, built with Vite and React.

The files from the previous stages are preserved in the `mockup/` folder.

The data from Stage 2 was moved into the main React component in `App.jsx`.

The application displays:

- the application name;
- the total number of maintenance operations;
- the number of pending operations calculated from the data;
- the maintenance data temporarily displayed as raw JSON.

The styles from Stage 1 were reused in `frontend/src/App.css`.

The maintenance list is still displayed as raw JSON.
The visual components for the list will be implemented in Stage 4.

The project was tested with:

```bash
npm run dev
npm run build
```

## Stage 4: components

The maintenance list is rendered from the data through two React components:

- `OperatiuniList` receives the complete array and renders one card for each operation.
- `OperatiuneCard` receives a single maintenance operation through props and displays it.

The list is rendered using `map` and each component uses the operation id as its React `key`.

If the array is empty, the application displays an explicit empty-list message.

The card appearance and status are calculated from the operation data.

## Stage 5: local state and events

The maintenance operation list is stored in React state using `useState`.

Each operation can be marked as completed or pending directly from the interface using a controlled checkbox. Operations can also be deleted from the page.

The state is updated immutably:

- `map` is used to toggle the `completed` value;
- `filter` is used to delete an operation;
- the original state array is never modified directly.

The dashboard values are derived from the current operation list:

- total operations;
- pending operations;
- completed operations;
- maintenance progress;
- number of Maintenance, Repair and Inspection operations.

These values update automatically whenever the list changes and are not stored in separate state variables.

The application also includes a light/dark theme button. The current theme is stored in React state and the selected theme is applied through the `data-theme` attribute on the HTML element.

The operation list and selected theme return to their initial values after refreshing the page because persistence is introduced in later stages.

## Status

- [x] Stage 1: static mockup
- [x] Stage 2: data logic in JavaScript
- [x] Stage 3: Vite and React project
- [x] Stage 4: components rendered from data
- [x] Stage 5: local state and events
- [ ] Stage 6: loading data from a mock API

## Stage 1 checklist

| ID | Requirement | Where | How to check |
|---|---|---|---|
| S1-R1 | README: description, fields, sample data, how to run | [README.md](https://github.com/davidionut21/mentenanta-auto/blob/02b2e06bf3dcef4672ccbee19bbe6f83b2bf86dc/README.md?plain=1#L1-L25) | Read the README |
| S1-R2 | AI usage section | [README.md](https://github.com/davidionut21/mentenanta-auto/blob/02b2e06bf3dcef4672ccbee19bbe6f83b2bf86dc/README.md?plain=1#L26-L33) | Read the AI usage section |
| S1-R3 | AI log for Stage 1 | [ai-log/etapa-01.md](https://github.com/davidionut21/mentenanta-auto/blob/02b2e06bf3dcef4672ccbee19bbe6f83b2bf86dc/ai-log/etapa-01.md?plain=1#L1-L36) | Read the AI log |
| S1-R4 | Header, form, fixed-value select and 3 cards | [index.html](https://github.com/davidionut21/mentenanta-auto/blob/02b2e06bf3dcef4672ccbee19bbe6f83b2bf86dc/index.html#L1-L96) | Open the page |
| S1-R5 | Finished card looks different | [style.css](https://github.com/davidionut21/mentenanta-auto/blob/02b2e06bf3dcef4672ccbee19bbe6f83b2bf86dc/style.css#L167-L170) | Check the completed card |
| S1-R6 | 2 columns on desktop, 1 column under 700px | [Desktop Grid](https://github.com/davidionut21/mentenanta-auto/blob/02b2e06bf3dcef4672ccbee19bbe6f83b2bf86dc/style.css#L49-L58), [Responsive media query](https://github.com/davidionut21/mentenanta-auto/blob/02b2e06bf3dcef4672ccbee19bbe6f83b2bf86dc/style.css#L188-L196) | Resize the page below 700px |
| S1-R7 | Visible focus and readable dark theme | [Focus styles](https://github.com/davidionut21/mentenanta-auto/blob/02b2e06bf3dcef4672ccbee19bbe6f83b2bf86dc/style.css#L183-L186), [Dark theme](https://github.com/davidionut21/mentenanta-auto/blob/02b2e06bf3dcef4672ccbee19bbe6f83b2bf86dc/style.css#L198-L211) | Use Tab and test dark mode |
| S1-R8 | Stage 1 commit pushed | [Stage 1 commit](https://github.com/davidionut21/mentenanta-auto/commit/02b2e06bf3dcef4672ccbee19bbe6f83b2bf86dc) | Check commit history |

## Stage 2 checklist

| ID | Requirement | Where | How to check |
|---|---|---|---|
| S2-R1 | JavaScript file linked, logs on page load | [index.html](https://github.com/davidionut21/mentenanta-auto/blob/fee7ebf88ccbcd292086fb92a16f949dd8abe243/index.html#L94) | Open the page and check the browser console with F12 |
| S2-R2 | 3+ items with id, name, state and fixed tag | [mentenanta.js](https://github.com/davidionut21/mentenanta-auto/blob/fee7ebf88ccbcd292086fb92a16f949dd8abe243/mentenanta.js#L1-L22) | Read the initial array |
| S2-R3 | List, count, search, add, toggle and delete functions | [mentenanta.js](https://github.com/davidionut21/mentenanta-auto/blob/fee7ebf88ccbcd292086fb92a16f949dd8abe243/mentenanta.js#L25-L84) | Check the functions and console output |
| S2-R4 | Add rejects empty operation name and invalid type | [mentenanta.js](https://github.com/davidionut21/mentenanta-auto/blob/fee7ebf88ccbcd292086fb92a16f949dd8abe243/mentenanta.js#L49-L60) | Check the validation messages in the console |
| S2-R5 | Original array remains unchanged after add | [mentenanta.js](https://github.com/davidionut21/mentenanta-auto/blob/fee7ebf88ccbcd292086fb92a16f949dd8abe243/mentenanta.js#L121-L125) | Check the "Originalul a ramas cu" console line |
| S2-R6 | README Stage 2 section and AI log | [README.md](https://github.com/davidionut21/mentenanta-auto/blob/fee7ebf88ccbcd292086fb92a16f949dd8abe243/README.md#L36-L66), [ai-log/etapa-02.md](https://github.com/davidionut21/mentenanta-auto/blob/fee7ebf88ccbcd292086fb92a16f949dd8abe243/ai-log/etapa-02.md#L1-L43) | Read the Stage 2 documentation |
| S2-R7 | Stage 2 commit pushed | [Stage 2 commit](https://github.com/davidionut21/mentenanta-auto/commit/fee7ebf88ccbcd292086fb92a16f949dd8abe243) | Check commit history |

## Stage 3 checklist

| ID | Requirement | Where | How to check |
|---|---|---|---|
| S3-R1 | npm run dev starts without errors | [frontend/package.json](https://github.com/davidionut21/mentenanta-auto/blob/86e71a2ab331334dd9193a0c1b78213229e7948d/frontend/package.json#L6-L11) | Run `cd frontend`, `npm install`, `npm run dev` |
| S3-R2 | App name and counter computed from data | [frontend/src/App.jsx](https://github.com/davidionut21/mentenanta-auto/blob/86e71a2ab331334dd9193a0c1b78213229e7948d/frontend/src/App.jsx#L22-L37) | Edit the data and save; the counter updates automatically |
| S3-R3 | Data from README, not from the example | [frontend/src/App.jsx](https://github.com/davidionut21/mentenanta-auto/blob/86e71a2ab331334dd9193a0c1b78213229e7948d/frontend/src/App.jsx#L1-L20) | Compare the three operations with the README sample data |
| S3-R4 | Stage 1 styles reused | [frontend/src/App.css](https://github.com/davidionut21/mentenanta-auto/blob/86e71a2ab331334dd9193a0c1b78213229e7948d/frontend/src/App.css#L1-L210) | Open the React application and check the reused design |
| S3-R5 | node_modules ignored, build passes | [frontend/.gitignore](https://github.com/davidionut21/mentenanta-auto/blob/86e71a2ab331334dd9193a0c1b78213229e7948d/frontend/.gitignore#L10-L12) | Run `npm run build` and verify that `node_modules` and `dist` are not committed |
| S3-R6 | README Stage 3 section and AI log | [README.md](https://github.com/davidionut21/mentenanta-auto/blob/86e71a2ab331334dd9193a0c1b78213229e7948d/README.md#L69-L101), [ai-log/etapa-03.md](https://github.com/davidionut21/mentenanta-auto/blob/86e71a2ab331334dd9193a0c1b78213229e7948d/ai-log/etapa-03.md#L1-L63) | Read the Stage 3 documentation |
| S3-R7 | Stage 3 commit pushed | [Stage 3 commit](https://github.com/davidionut21/mentenanta-auto/commit/86e71a2ab331334dd9193a0c1b78213229e7948d) | Check commit history |

## Stage 4 checklist

| ID | Requirement | Where | How to check |
|---|---|---|---|
| S4-R1 | 2+ components in src/components/ | [frontend/src/components](https://github.com/davidionut21/mentenanta-auto/tree/df423f3/frontend/src/components) | Open the folder |
| S4-R2 | Card receives data through props | [OperatiuneCard.jsx](https://github.com/davidionut21/mentenanta-auto/blob/df423f3/frontend/src/components/OperatiuneCard.jsx#L7-L23) | Read the component |
| S4-R3 | map + key={id}, no console warnings | [OperatiuniList.jsx](https://github.com/davidionut21/mentenanta-auto/blob/df423f3/frontend/src/components/OperatiuniList.jsx#L12-L20) | Open F12 Console and verify there are no React warnings |
| S4-R4 | Message for empty list | [OperatiuniList.jsx](https://github.com/davidionut21/mentenanta-auto/blob/df423f3/frontend/src/components/OperatiuniList.jsx#L3-L10) | Temporarily set the array to `[]` |
| S4-R5 | State changes the card look | [OperatiuneCard.jsx](https://github.com/davidionut21/mentenanta-auto/blob/df423f3/frontend/src/components/OperatiuneCard.jsx#L9-L19) | Change a `completed` value and save |
| S4-R6 | README Stage 4 section + AI log | [README.md](https://github.com/davidionut21/mentenanta-auto/blob/df423f3/README.md#L96-L117), [ai-log/etapa-04.md](https://github.com/davidionut21/mentenanta-auto/blob/df423f3/ai-log/etapa-04.md#L1-L61) | Read the Stage 4 documentation |
| S4-R7 | Stage 4 commit pushed | [Stage 4 commit](https://github.com/davidionut21/mentenanta-auto/commit/df423f3) | Check commit history |

## Stage 5 checklist

| ID | Requirement | Where | How to check |
|---|---|---|---|
| S5-R1 | List kept in `useState`, in App | [App.jsx](https://github.com/davidionut21/mentenanta-auto/blob/0792d8ec22e74a3553080f0af6d67e580236ee4d/frontend/src/App.jsx#L31-L33) | Read the state declarations |
| S5-R2 | Toggling changes state and card look | [App.jsx](https://github.com/davidionut21/mentenanta-auto/blob/0792d8ec22e74a3553080f0af6d67e580236ee4d/frontend/src/App.jsx#L35-L46), [OperatiuneCard.jsx](https://github.com/davidionut21/mentenanta-auto/blob/0792d8ec22e74a3553080f0af6d67e580236ee4d/frontend/src/components/OperatiuneCard.jsx#L19-L42) | Click a checkbox and watch the card/status change |
| S5-R3 | Delete removes the item | [App.jsx](https://github.com/davidionut21/mentenanta-auto/blob/0792d8ec22e74a3553080f0af6d67e580236ee4d/frontend/src/App.jsx#L48-L52), [OperatiuneCard.jsx](https://github.com/davidionut21/mentenanta-auto/blob/0792d8ec22e74a3553080f0af6d67e580236ee4d/frontend/src/components/OperatiuneCard.jsx#L72-L78) | Click the Delete button |
| S5-R4 | Header/dashboard counters are derived, not stored in state | [App.jsx](https://github.com/davidionut21/mentenanta-auto/blob/0792d8ec22e74a3553080f0af6d67e580236ee4d/frontend/src/App.jsx#L62-L87) | Toggle or delete an operation and watch the counters update |
| S5-R5 | Immutable updates, without `push`, `splice` or direct assignment | [App.jsx](https://github.com/davidionut21/mentenanta-auto/blob/0792d8ec22e74a3553080f0af6d67e580236ee4d/frontend/src/App.jsx#L35-L52) | Read the `map` and `filter` updates |
| S5-R6 | Light/dark toggle uses state and `data-theme` on HTML | [App.jsx](https://github.com/davidionut21/mentenanta-auto/blob/0792d8ec22e74a3553080f0af6d67e580236ee4d/frontend/src/App.jsx#L25-L60), [Theme button](https://github.com/davidionut21/mentenanta-auto/blob/0792d8ec22e74a3553080f0af6d67e580236ee4d/frontend/src/App.jsx#L93-L101), [App.css](https://github.com/davidionut21/mentenanta-auto/blob/0792d8ec22e74a3553080f0af6d67e580236ee4d/frontend/src/App.css#L1245-L1479) | Switch between light and dark mode in both directions |
| S5-R7 | No console warnings; README and AI log updated | [README.md](https://github.com/davidionut21/mentenanta-auto/blob/0792d8ec22e74a3553080f0af6d67e580236ee4d/README.md#L109-L142), [ai-log/etapa-05.md](https://github.com/davidionut21/mentenanta-auto/blob/0792d8ec22e74a3553080f0af6d67e580236ee4d/ai-log/etapa-05.md#L1-L69) | Open the browser console and read the Stage 5 documentation |
| S5-R8 | Stage 5 commit pushed | [Stage 5 commit](https://github.com/davidionut21/mentenanta-auto/commit/0792d8ec22e74a3553080f0af6d67e580236ee4d) | Check commit history |