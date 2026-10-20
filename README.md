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
| ChatGPT | Project theme definition, README structure, Stage 1 guidance, Stage 2 JavaScript guidance and Stage 3 Vite/React setup |

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

## Status

- [x] Stage 1: static mockup
- [x] Stage 2: data logic in JavaScript
- [x] Stage 3: Vite and React project
- [ ] Stage 4

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