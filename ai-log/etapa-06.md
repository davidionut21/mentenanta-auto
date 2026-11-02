
# Stage 6: AI log

## Tools

- ChatGPT

## Main request

Implement Stage 6 for the vehicle maintenance project based on the teacher's PDF guide,
with complete file contents, while preserving the existing dashboard and the Stage 5 interactions.

## Key requests and decisions

### 1. Mock REST API

- Asked: Move the maintenance data from React to `db.json` and serve it through json-server.
- Got: `frontend/db.json` with the original three records and two additional examples, under `operatiuni`.
- Changed or rejected: The teacher's example route `/tasks` was adapted to `/operatiuni` and the original fields `id`, `operation`, `completed`, `type` were retained.

### 2. HTTP requests in a separate module

- Asked: Fetch the operations from a configurable server address.
- Got: `frontend/src/api.js` with `fetchOperatiuni`, `async` / `await`, a `res.ok` check and an optional `VITE_API_URL` environment variable.
- Changed or rejected: The function name and API route match the vehicle-maintenance theme.

### 3. Loading data when React mounts

- Asked: Replace the hardcoded array in `App.jsx` with data from the API.
- Got: `useState([])`, `useEffect` and the three loading/success/error states.
- Changed or rejected: The `ignore` cleanup flag was kept as in the guide to avoid updating state after the component unmounts.

### 4. Keeping the automotive dashboard

- Asked: Preserve the existing orange/graphite visual design, counters, cards and light/dark switch.
- Got: Only the data source and the content displayed in the operation-list panel were adapted.
- Changed or rejected: Instead of replacing the long custom `App.css`, a small `api-states.css` file was added solely for loading/error messages.

### 5. Interactions remain local

- Asked: Keep the toggle and delete behavior from Stage 5 without implementing Stage 7 prematurely.
- Got: The existing `map` and `filter` logic and callback props were preserved.
- Changed or rejected: No POST, PATCH or DELETE requests were added; changes still reset after refresh.

### 6. Testing and documentation

- Asked: Provide instructions for running the API and Vite separately and testing both success and failure.
- Got: Instructions for `npm run api`, `npm run dev`, `npm run build`, testing the API route, using `--delay 4000`, and testing with the API stopped.
- Changed or rejected: The Stage 6 checklist will be added in a separate commit after the implementation commit is pushed, so the links can use the actual commit hash.

## What I learned

I learned how json-server exposes JSON data through a REST API and how the route name is defined by a key in `db.json`.

I learned why requests are centralized in `api.js`, why `res.ok` needs checking and how Vite reads `VITE_API_URL`.

I learned how `useEffect` loads data, how to distinguish loading/success/error, and why a cleanup flag avoids updating stale component state.

I learned that reading operations from the API does not automatically save updates: persistence will be added in Stage 7.

## Verification to perform locally

- Start `npm run api`; open `http://localhost:3001/operatiuni` and confirm five JSON records.
- Start `npm run dev`; verify the dashboard loads five operations and all controls still work.
- Stop the API and refresh; check that a clear error message appears.
- Restart the API with `--delay 4000`; verify the loading message.
- Run `npm run build` and inspect the browser console for errors.
- Commit and push the implementation, then add the Stage 6 checklist in a separate commit.
