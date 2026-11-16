
# Sistem de gestiune a mentenantei auto

The application manages the maintenance history of a vehicle.
It allows users to keep track of completed and pending maintenance operations.

## Data model

| Field | Type | Notes |
|---|---|---|
| operation | text | required, max 100 chars |
| completed | boolean | completed or pending, default false |
| type | fixed values | Maintenance, Repair, Inspection |
| description | text | optional details displayed on the operation detail page |
| category | relation | Engine, Brakes, Tires, Electrical (planned) |
| user | relation | the owner of the item (from week 11) |

Sample data used across all stages:

1. Engine oil change, completed, Maintenance
2. Front brake pad replacement, pending, Repair
3. Tire pressure check, pending, Inspection
4. Air filter change, pending, Maintenance
5. Electrical system check, completed, Inspection

## How to run

The frontend and the mock API run in two terminals.

Install dependencies once:

```bash
cd frontend
npm install
```

Terminal 1 (from `frontend/`):

```bash
npm run api
```

API endpoint: `http://localhost:3001/operatiuni`

Terminal 2 (also from `frontend/`):

```bash
npm run dev
```

Open the Vite address, usually `http://localhost:5173/`.

### Available pages

| URL | Page |
|---|---|
| `/` | Maintenance dashboard and operations list |
| `/operatiuni/:id` | Detail page for a single operation |
| `/despre` | About the application |
| Any other URL | Custom 404 page |

Example detail URL: `http://localhost:5173/operatiuni/1`

To verify the project:

```bash
npm run lint
npm run build
```

## AI usage

| Tool | Used for |
|---|---|
| ChatGPT | Project theme definition, README structure, implementation guidance through Stage 8, React components, state management, API integration, form validation, CRUD operations, React Router, CSS Modules and automotive dashboard styling |

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

## Stage 6: data from a mock API

The maintenance operations are stored in `frontend/db.json`, under the resource name `operatiuni`.

The mock REST API is provided by `json-server@0.17.4` at `http://localhost:3001/operatiuni`.

The first three records from Stage 5 are preserved and two new maintenance examples were added.

`frontend/src/api.js` is the only module that makes an HTTP request. Its `fetchOperatiuni` function uses `fetch`, `async` / `await`, checks `res.ok`, and reads the API base URL from `VITE_API_URL`, defaulting to `http://localhost:3001`.

The variable is documented in `frontend/.env.example`.

When `App` mounts, `useEffect` fetches the operations. The initial list is empty and three UI states are handled: loading, success, and a descriptive error if the API is unavailable.

The effect is cleaned up with `ignore`, so an outdated response does not update an unmounted component.

To test the failure case, stop `npm run api` and refresh the page.

To test a visible loading state, stop the normal API and temporarily run in `frontend/`:

```bash
npx json-server --watch db.json --port 3001 --delay 4000
```

The existing dashboard and `OperatiuneCard` / `OperatiuniList` components remain unchanged.

A small `api-states.css` stylesheet adds only loading/error styles, without replacing the custom `App.css` from Stage 5.

**Stage 6 limitation:** Checking or deleting an operation only changes React state. Refreshing the browser restores the values from `db.json`. Saving changes on the server is implemented in Stage 7.

## Stage 7: form and validation

The application now supports persistent CRUD operations through the mock REST API.

A controlled React form was added in `frontend/src/components/OperatiuneForm.jsx`.

The form allows the user to create maintenance operations directly from the interface, without manually editing `db.json`.

### Controlled form

The form contains two controlled fields:

- `operation`: required text, maximum 100 characters;
- `type`: a select field with Maintenance, Repair and Inspection.

The `completed` field is automatically set to `false` for new operations.

Each input uses React state through `useState`, with `value` and `onChange`.

### Validation

Before submitting data, the form checks that:

- the operation name is not empty;
- the name contains no more than 100 characters;
- the selected type is valid.

The `trim()` method removes unnecessary spaces from the operation name.

Invalid data is rejected before sending an HTTP request.

Validation errors are displayed directly beside the form, without using browser alerts.

The form uses `event.preventDefault()` to prevent the page from reloading on submission.

### Saving operations

All HTTP requests are centralized in `frontend/src/api.js`.

A common `request()` function handles JSON headers, HTTP options and response validation.

The API supports the following operations:

| Operation | HTTP method | Endpoint |
|---|---|---|
| Read operations | GET | `/operatiuni` |
| Create operation | POST | `/operatiuni` |
| Update operation | PATCH | `/operatiuni/:id` |
| Delete operation | DELETE | `/operatiuni/:id` |

The `request()` function checks `res.ok` and handles HTTP 204 responses without attempting to parse an empty JSON body.

### Updating React state

The interface is updated only after the server confirms the request.

When adding an operation, the server returns the saved object with its generated ID. This object is added to the React state.

When changing the completed status, the application sends a PATCH request containing the updated field.

When deleting an operation, the application sends a DELETE request and removes the item from React state only after the server confirms the deletion.

The dashboard counters and progress indicator are automatically recalculated from the updated state.

### Form submission behavior

The submit button is disabled while the request is in progress to prevent duplicate submissions.

The form is cleared only after successful saving.

If the API request fails, an error message is displayed and the values entered by the user are preserved.

### Data persistence

Unlike Stage 6, all successful changes are saved on the server.

Operations added, completed or deleted through the interface remain changed after refreshing the browser.

The application still uses json-server as its temporary backend. A custom backend will be introduced in a later stage.

### Automatic verification

The file `tw.json` was added in the repository root.

It defines the application's resource and field names:

- resource: `operatiuni`;
- title: `operation`;
- done: `completed`;
- sample type: `repair`.

The form, cards, buttons and status messages contain `data-testid` attributes required for automated evaluation.

These attributes do not change the appearance or behavior of the application.

### Styling

The existing automotive dashboard design was preserved.

The form uses a separate stylesheet, `OperatiuneForm.css`.

The orange and graphite color scheme, statistics, progress indicator and light/dark theme remain available.

### Testing

To test Stage 7:

1. Start the mock API using `npm run api`.
2. Start the React application using `npm run dev`.
3. Submit the form with an empty operation name and verify the validation error.
4. Add a valid operation and verify that it appears in the list.
5. Refresh the browser and check that the new operation is still present.
6. Toggle an operation and refresh to verify persistence.
7. Delete an operation and refresh to verify persistence.
8. Stop the API and submit a new operation to verify error handling.
9. Verify that the entered text is preserved when saving fails.
10. Run `npm run lint` and `npm run build`.

## Stage 8: routing and detail page

The application now uses React Router to provide multiple pages without reloading the entire HTML document.

The original automotive maintenance dashboard was preserved, while navigation and styling were reorganized into reusable components and pages.

### React Router

The `react-router-dom` package was installed to manage navigation.

`frontend/src/main.jsx` wraps the application in `BrowserRouter`.

`frontend/src/App.jsx` contains the route configuration using `Routes` and `Route`.

The application provides the following routes:

| Route | Component | Description |
|---|---|---|
| `/` | `OperatiuniPage` | Dashboard, form, statistics and operations list |
| `/operatiuni/:id` | `OperatiuneDetaliuPage` | Details of a single maintenance operation |
| `/despre` | `DesprePage` | Project description |
| `*` | `NotFoundPage` | Custom 404 page |

The detail route uses `/operatiuni/:id`, where `operatiuni` matches the `resource` field in `tw.json`.

### Shared layout

A reusable `Layout` component was introduced in `frontend/src/components/Layout.jsx`.

The layout contains:

- the automotive application header and logo;
- navigation links to the operations list and About page;
- the existing light/dark theme button;
- the main content area;
- the application footer.

The component uses `Outlet` to display the active page inside the common layout.

Navigation uses `NavLink`, which automatically marks the currently selected page.

The main navigation link uses the `end` attribute for exact matching.

### Navigation without reloading

React Router's `Link` component is used for navigation from operation cards to their detail pages.

Each operation title opens the corresponding address:

`/operatiuni/:id`

For example, selecting the operation with ID 1 opens:

`http://localhost:5173/operatiuni/1`

Navigation changes the page content without reloading the entire application.

The browser Back and Forward buttons continue to work.

### Operations page

The original logic from `App.jsx` was moved to:

`frontend/src/pages/OperatiuniPage.jsx`

This page contains:

- maintenance statistics;
- the controlled operation form;
- the list of operations;
- loading and error messages;
- the overview panel;
- the maintenance progress indicator.

All persistent CRUD operations introduced in Stage 7 remain available.

The application continues to use the mock REST API from `json-server`.

### Operation detail page

The new `OperatiuneDetaliuPage` reads the operation ID from the URL using `useParams()`.

The `fetchOperatiune(id)` function in `api.js` requests exactly one operation from the server.

The detail page displays:

- operation name;
- operation ID;
- operation category;
- completed or pending status;
- additional description, when available.

The `description` field was added to the sample operations in `db.json` to provide more information on the detail page than on the list card.

The detail page includes a link back to the operations list.

### Handling invalid IDs

If an operation ID does not exist, such as `/operatiuni/999`, the API returns an error.

The detail page handles this case by displaying an error message instead of an empty or broken screen.

A link back to the operations page is also provided.

Loading and error states are handled with React state and `useEffect`.

The effect depends on the operation ID, allowing the correct operation to be loaded when the URL parameter changes.

### Custom 404 page

The `NotFoundPage` component handles unknown addresses.

For example:

`http://localhost:5173/ceva`

The route `*` in `App.jsx` matches addresses that do not correspond to an existing page.

The user sees a custom 404 message and a link back to the main page.

### CSS Modules

The application's styling was reorganized using CSS Modules.

Component-specific styles are stored in `.module.css` files next to the components or pages they style.

This avoids CSS class name conflicts and makes the project easier to maintain.

The new style organization includes:

| File | Purpose |
|---|---|
| `src/index.css` | Global color variables, body styles and shared classes |
| `src/components/Layout.module.css` | Header, navigation, shared layout and footer |
| `src/components/OperatiuneCard.module.css` | Individual operation cards |
| `src/components/OperatiuniList.module.css` | Operations list and empty state |
| `src/components/OperatiuneForm.module.css` | Controlled operation form |
| `src/pages/OperatiuniPage.module.css` | Main dashboard and statistics |
| `src/pages/OperatiuneDetaliuPage.module.css` | Operation detail page |
| `src/pages/PaginaInfo.module.css` | About and 404 pages |

Styles are imported as JavaScript objects.

For example:

```jsx
import styles from "./Layout.module.css";
```

The corresponding CSS class is used with:

```jsx
<div className={styles.shell}>
```

CSS Modules generate locally scoped class names, preventing conflicts between components.

The original orange and graphite visual identity and the light/dark theme were retained.

### Constants

A shared file was introduced:

`frontend/src/constants.js`

It centralizes the allowed operation types and their display labels.

The values are reused by the operation form, operation cards and detail page.

### Automatic verification

The `tw.json` file remains in the repository root.

The application retains the `data-testid` attributes from Stage 7.

Stage 8 adds the following test identifiers:

| data-testid | Purpose |
|---|---|
| `nav` | Navigation links in the shared layout |
| `item-link` | Link from an operation card to its detail page |
| `detail` | Loaded operation detail section |
| `detail-title` | Title of the operation on its detail page |
| `loading` | Loading message |
| `error` | Error message |
| `not-found` | Custom 404 page |

The card title now uses `item-link` instead of the previous `item-title` identifier.

The detail route is based on the resource declared in `tw.json`: `/operatiuni/:id`.

### Testing

The following checks are required:

1. Start the API with `npm run api`.
2. Start the React application with `npm run dev`.
3. Open the operations dashboard at `/`.
4. Click the Operations and About navigation links.
5. Verify that navigation works without a full page reload.
6. Click an operation title to open its detail page.
7. Refresh the browser while on `/operatiuni/1`.
8. Verify that `/operatiuni/999` displays an error message.
9. Verify that `/ceva` displays the custom 404 page.
10. Test the browser Back and Forward buttons.
11. Check the `data-testid` attributes.
12. Verify that creating, updating and deleting operations still work.
13. Verify that the light/dark theme works.
14. Run `npm run lint` and `npm run build`.

The Stage 7 functionality must remain intact after the routing and CSS Modules refactoring.

## Status

- [x] Stage 1: static mockup
- [x] Stage 2: data logic in JavaScript
- [x] Stage 3: Vite and React project
- [x] Stage 4: components rendered from data
- [x] Stage 5: local state and events
- [x] Stage 6: loading data from a mock API
- [x] Stage 7: form and validation
- [x] Stage 8: routing and detail page implementation
- [ ] Stage 9: own backend with Express

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

## Stage 6 checklist

| ID | Requirement | Where | How to check |
|---|---|---|---|
| S6-R1 | npm run api starts and the route returns JSON | [package.json](https://github.com/davidionut21/mentenanta-auto/blob/30a3c23/frontend/package.json#L12), [db.json](https://github.com/davidionut21/mentenanta-auto/blob/30a3c23/frontend/db.json#L2-L35) | Run `npm run api` and open `http://localhost:3001/operatiuni` |
| S6-R2 | Data is no longer hardcoded in React | [App.jsx](https://github.com/davidionut21/mentenanta-auto/blob/30a3c23/frontend/src/App.jsx#L13-L16), [db.json](https://github.com/davidionut21/mentenanta-auto/blob/30a3c23/frontend/db.json#L2-L35) | Check `useState([])` and the five records in db.json |
| S6-R3 | Loading message appears while waiting | [App.jsx](https://github.com/davidionut21/mentenanta-auto/blob/30a3c23/frontend/src/App.jsx#L204-L209) | Start the API with `--delay 4000` and refresh |
| S6-R4 | Explicit error message when API is down | [App.jsx](https://github.com/davidionut21/mentenanta-auto/blob/30a3c23/frontend/src/App.jsx#L211-L217) | Stop `npm run api` and refresh the page |
| S6-R5 | Fetch only in api.js, API URL from environment | [api.js](https://github.com/davidionut21/mentenanta-auto/blob/30a3c23/frontend/src/api.js#L3-L19), [.env.example](https://github.com/davidionut21/mentenanta-auto/blob/30a3c23/frontend/.env.example#L2-L3) | Check `fetch`, `res.ok`, `VITE_API_URL` and the useEffect cleanup |
| S6-R6 | README Stage 6 section and AI log | [README.md](https://github.com/davidionut21/mentenanta-auto/blob/30a3c23/README.md#L159), [ai-log/etapa-06.md](https://github.com/davidionut21/mentenanta-auto/blob/30a3c23/ai-log/etapa-06.md) | Read the documentation |
| S6-R7 | Stage 6 commit pushed | [Stage 6 commit](https://github.com/davidionut21/mentenanta-auto/commit/30a3c2359aae9daf47caab057fdae18ad987e7a0) | Check GitHub commit history |

## Stage 7 checklist

| ID | Requirement | Where | How to check |
|---|---|---|---|
| S7-R1 | Controlled form with value and onChange | [OperatiuneForm.jsx](https://github.com/davidionut21/mentenanta-auto/blob/171d4cb/frontend/src/components/OperatiuneForm.jsx#L11-L15), [Form fields](https://github.com/davidionut21/mentenanta-auto/blob/171d4cb/frontend/src/components/OperatiuneForm.jsx#L72-L98) | Check that both fields have value and onChange |
| S7-R2 | Empty operation name displays validation error without HTTP request | [OperatiuneForm.jsx](https://github.com/davidionut21/mentenanta-auto/blob/171d4cb/frontend/src/components/OperatiuneForm.jsx#L17-L44) | Submit an empty form and check Network |
| S7-R3 | POST creates an operation that survives refresh | [App.jsx](https://github.com/davidionut21/mentenanta-auto/blob/171d4cb/frontend/src/App.jsx#L47-L50), [api.js](https://github.com/davidionut21/mentenanta-auto/blob/171d4cb/frontend/src/api.js#L30-L35) | Add an operation and refresh |
| S7-R4 | PATCH and DELETE changes survive refresh | [App.jsx](https://github.com/davidionut21/mentenanta-auto/blob/171d4cb/frontend/src/App.jsx#L52-L83), [api.js](https://github.com/davidionut21/mentenanta-auto/blob/171d4cb/frontend/src/api.js#L37-L48) | Toggle and delete operations, then refresh |
| S7-R5 | Submit disabled while saving; form cleared only on success | [OperatiuneForm.jsx](https://github.com/davidionut21/mentenanta-auto/blob/171d4cb/frontend/src/components/OperatiuneForm.jsx#L35-L63), [Submit button](https://github.com/davidionut21/mentenanta-auto/blob/171d4cb/frontend/src/components/OperatiuneForm.jsx#L106-L113) | Test with API delay and with API stopped |
| S7-R6 | tw.json and required data-testid attributes | [tw.json](https://github.com/davidionut21/mentenanta-auto/blob/171d4cb/tw.json), [OperatiuneCard.jsx](https://github.com/davidionut21/mentenanta-auto/blob/171d4cb/frontend/src/components/OperatiuneCard.jsx), [OperatiuniList.jsx](https://github.com/davidionut21/mentenanta-auto/blob/171d4cb/frontend/src/components/OperatiuniList.jsx) | Inspect the configuration and test attributes |
| S7-R7 | README Stage 7 section and AI log | [README.md](https://github.com/davidionut21/mentenanta-auto/blob/171d4cb/README.md), [ai-log/etapa-07.md](https://github.com/davidionut21/mentenanta-auto/blob/171d4cb/ai-log/etapa-07.md) | Read the Stage 7 documentation |
| S7-R8 | Stage 7 implementation commit pushed | [Stage 7 commit](https://github.com/davidionut21/mentenanta-auto/commit/171d4cbe97911a885cf502b826c19f6c9e0c8bc4) | Check GitHub commit history |

## Stage 8 checklist

| ID | Requirement | Where | How to check |
|---|---|---|---|
| S8-R1 | Header navigation changes pages without reloading | [App.jsx](https://github.com/davidionut21/mentenanta-auto/blob/353c5798fd01dc2437334092c2f34c1f8b94b7bf/frontend/src/App.jsx#L10-L22), [Layout.jsx](https://github.com/davidionut21/mentenanta-auto/blob/353c5798fd01dc2437334092c2f34c1f8b94b7bf/frontend/src/components/Layout.jsx#L32-L48) | Click Operations and About; check Network for no document reload |
| S8-R2 | Clicking an operation opens its detail page | [OperatiuneCard.jsx](https://github.com/davidionut21/mentenanta-auto/blob/353c5798fd01dc2437334092c2f34c1f8b94b7bf/frontend/src/components/OperatiuneCard.jsx#L36-L44), [OperatiuneDetaliuPage.jsx](https://github.com/davidionut21/mentenanta-auto/blob/353c5798fd01dc2437334092c2f34c1f8b94b7bf/frontend/src/pages/OperatiuneDetaliuPage.jsx#L56-L91) | Click an operation title and verify its details |
| S8-R3 | Refresh on detail URL works; missing ID displays an error | [OperatiuneDetaliuPage.jsx](https://github.com/davidionut21/mentenanta-auto/blob/353c5798fd01dc2437334092c2f34c1f8b94b7bf/frontend/src/pages/OperatiuneDetaliuPage.jsx#L8-L53), [useParams](https://github.com/davidionut21/mentenanta-auto/blob/353c5798fd01dc2437334092c2f34c1f8b94b7bf/frontend/src/pages/OperatiuneDetaliuPage.jsx#L97-L102) | Refresh /operatiuni/1 and open /operatiuni/999 |
| S8-R4 | Unknown URL displays the custom 404 page | [App.jsx](https://github.com/davidionut21/mentenanta-auto/blob/353c5798fd01dc2437334092c2f34c1f8b94b7bf/frontend/src/App.jsx#L18-L20), [NotFoundPage.jsx](https://github.com/davidionut21/mentenanta-auto/blob/353c5798fd01dc2437334092c2f34c1f8b94b7bf/frontend/src/pages/NotFoundPage.jsx#L5-L20) | Open /ceva and verify the 404 page |
| S8-R5 | Styles organized into CSS Modules with only shared styles in index.css | [components](https://github.com/davidionut21/mentenanta-auto/tree/353c5798fd01dc2437334092c2f34c1f8b94b7bf/frontend/src/components), [pages](https://github.com/davidionut21/mentenanta-auto/tree/353c5798fd01dc2437334092c2f34c1f8b94b7bf/frontend/src/pages), [index.css](https://github.com/davidionut21/mentenanta-auto/blob/353c5798fd01dc2437334092c2f34c1f8b94b7bf/frontend/src/index.css) | Inspect module CSS files and global styles |
| S8-R6 | Required data-testid attributes and detail route matching tw.json | [tw.json](https://github.com/davidionut21/mentenanta-auto/blob/353c5798fd01dc2437334092c2f34c1f8b94b7bf/tw.json), [Layout.jsx](https://github.com/davidionut21/mentenanta-auto/blob/353c5798fd01dc2437334092c2f34c1f8b94b7bf/frontend/src/components/Layout.jsx#L32-L48), [OperatiuneCard.jsx](https://github.com/davidionut21/mentenanta-auto/blob/353c5798fd01dc2437334092c2f34c1f8b94b7bf/frontend/src/components/OperatiuneCard.jsx), [OperatiuneDetaliuPage.jsx](https://github.com/davidionut21/mentenanta-auto/blob/353c5798fd01dc2437334092c2f34c1f8b94b7bf/frontend/src/pages/OperatiuneDetaliuPage.jsx) | Inspect data-testid attributes and open /operatiuni/1 |
| S8-R7 | README Stage 8 documentation and AI log | [README.md](https://github.com/davidionut21/mentenanta-auto/blob/353c5798fd01dc2437334092c2f34c1f8b94b7bf/README.md), [ai-log/etapa-08.md](https://github.com/davidionut21/mentenanta-auto/blob/353c5798fd01dc2437334092c2f34c1f8b94b7bf/ai-log/etapa-08.md) | Read the Stage 8 documentation and AI log |
| S8-R8 | Stage 8 implementation commit published on GitHub | [Stage 8 commit](https://github.com/davidionut21/mentenanta-auto/commit/353c5798fd01dc2437334092c2f34c1f8b94b7bf) | Check GitHub commit history |
