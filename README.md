# Everyday Shop — Assignment 7

A small React single-page shop built with Vite, React Router, Context with `useReducer`, a Zustand cart, and two custom hooks. Products come from DummyJSON. There is no real checkout or server-side authentication.

## File organization

- `src/api/` contains the product Fetch API functions and the simulated login request.
- `src/hooks/useFetch.js` manages one component's cancellable request state; `useLocalStorage.js` reads and writes a value with a `useState`-like interface.
- `src/context/AuthContext.jsx` stores the signed-in demo user with a reducer and exposes `useAuth`.
- `src/store/cartStore.js` contains immutable cart actions and persists item changes through the Zustand store subscription.
- `src/components/` contains the shared layout, navigation, product card, and protected-route wrapper.
- `src/pages/` contains the home, product list, product detail, cart, login, and not-found views.
- `src/App.jsx` declares nested routes. `src/main.jsx` mounts the router and auth provider; `src/styles.css` defines the light and dark themes.

## Run the app

```bash
npm install
npm run dev
```

The demo login password is `demo123456`. Before submitting, replace `DEMO_USERNAME` in `src/api/authApi.js` with your student email. The sample value is `student@university.edu`.

## Reasoning questions

### 1. State choices

The signed-in user lives in `AuthContext` and its reducer because the login page, navigation, and protected route need the same user. Cart items live in the Zustand store because product details, the navigation bar, and the cart all read or change them frequently; the product count and total are calculated from those items. Search and category filters live in the URL so a link can reproduce the same catalogue view, product data lives in each `useFetch` call's own reducer state, and the theme lives in `useLocalStorage` inside the shared layout.

### 2. Context versus store

The user changes only when someone signs in or out, so Context is a simple way to share that value with distant UI. Cart contents change more often and are read by several components, so Zustand selectors let each component subscribe to only what it needs. Putting the cart in Context could make unrelated consumers update on cart changes, while using a separate store for the low-frequency user state would add another tool without much benefit.

### 3. Custom hooks

`useFetch` shares the request lifecycle logic—loading, error handling, and abort cleanup—between the catalogue and detail pages. Each call creates its own reducer state, so the catalogue's array and a detail page's product are not shared. `useLocalStorage` packages the storage read/write behavior while returning a value and setter like `useState`.

### 4. Route parameters

`useParams` returns the `id` route value as a string. `ProductDetail` converts it with `Number(id)` before passing it to the product request, which uses the numeric product identifier in the API path. This also makes it clear where URL text becomes an API id.

### 5. Protected routes

`ProtectedRoute` is a client-side user-experience check, not a security boundary: visitors can inspect or alter browser code and local state. A real shop must verify identity and permissions on a server for every protected request. It would also need a secure session or token flow and server-side access checks.

### 6. Deep links

On a plain static file server without a fallback rule, reloading `/products/3` may ask the server for a file at that path and return a 404. The Vite development server serves the app entry point for client-side routes, so React Router can read the URL and render the matching page. A deployed static host needs a rewrite/fallback to `index.html` for these routes.

## Self-study notes

- **Keeping query parameters:** `ProductList` clones the current `URLSearchParams`, changes only `q` or `category`, then calls `setSearchParams`. This preserves the other filter while keeping the view shareable. See the [React Router `useSearchParams` documentation](https://reactrouter.com/api/hooks/useSearchParams).
- **Persisting store data safely:** `cartStore.js` catches missing, malformed, or wrongly shaped local storage data and starts with an empty cart. It subscribes outside React components and writes only when the `items` reference changes; selectors in components return a primitive count, the existing `items` array, or a single action. See Zustand's docs for [`create`](https://zustand.docs.pmnd.rs/reference/apis/create) and [`createStore` subscriptions](https://zustand.docs.pmnd.rs/reference/apis/create-store).
- **Applying the theme:** `useLocalStorage` catches storage/JSON errors, while `Layout` applies a `theme-light` or `theme-dark` class. CSS custom properties switch the page, surface, text, and accent colours together. The [Vite guide](https://vite.dev/guide/) documents the Vite project setup used here.

## Challenges faced

- Keeping the URL filters in sync without losing the other query parameter required cloning the `URLSearchParams` instead of mutating it in place.
- Handling an aborted request separately from an actual error prevents route changes and unmounts from showing a false error.
- Cart persistence needed to stay outside component effects, so the store subscription watches only changes to `items` and safely handles invalid saved data.

The cart persists locally, but authentication is intentionally only a demo. The route guard is not real security and should not be used to protect real user data.
