
# Stage 8: AI log

## Tools

- ChatGPT

## Main request

Implement Stage 8 using React Router and CSS Modules, preserving the existing automotive maintenance dashboard and the persistent CRUD functionality from Stage 7.

## Key requests

### 1. Routing

- Asked: Add multiple pages using React Router.
- Got: BrowserRouter and a route map in App.jsx.
- Adapted: The detail route is /operatiuni/:id, matching tw.json and db.json.

### 2. Shared layout

- Asked: Create a common header, navigation and footer.
- Got: Layout.jsx with NavLink, Outlet and the existing theme switch.
- Adapted: The automotive dashboard branding and color scheme were preserved.

### 3. Detail page

- Asked: Display an individual item based on its URL.
- Got: OperatiuneDetaliuPage.jsx using useParams and fetchOperatiune(id).
- Adapted: The detail page displays operation name, category, status, ID and description.

### 4. Error handling

- Asked: Handle missing resources and unknown addresses.
- Got: Error handling for an invalid operation ID and a separate NotFoundPage.
- Adapted: Both pages include a link back to the operation list.

### 5. CSS Modules

- Asked: Split styles by component.
- Got: index.css for global variables and common styles, plus module CSS files for the layout, cards, form and pages.
- Adapted: The existing orange and graphite visual theme was retained.

### 6. Automated verification

- Asked: Preserve Stage 7 selectors and add Stage 8 selectors.
- Got: data-testid attributes for navigation, item links, details, detail titles and the not-found page.
- Adapted: tw.json retains resource=operatiuni, title=operation and done=completed.

## What I learned

I learned how React Router changes page content without reloading the HTML document.

I learned the difference between Link and NavLink and how Outlet renders nested routes.

I learned how useParams reads an ID from the URL and how to fetch a single resource.

I learned how CSS Modules isolate component styles and avoid naming conflicts.

## Testing

- Verify navigation between Operations and About.
- Open an operation detail through its title.
- Refresh directly on /operatiuni/1.
- Verify an invalid operation ID produces an error message.
- Verify an unknown route shows the 404 page.
- Verify all Stage 7 CRUD operations still work.
- Run npm run lint and npm run build.
