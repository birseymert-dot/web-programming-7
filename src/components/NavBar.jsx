import { NavLink } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";
import { useCartStore } from "../store/cartStore.js";

export default function NavBar({ theme, onToggleTheme }) {
  const { user, dispatch } = useAuth();
  const itemCount = useCartStore((state) =>
    state.items.reduce((count, item) => count + item.quantity, 0),
  );

  function handleLogout() {
    dispatch({ type: "LOGGED_OUT" });
  }

  return (
    <header className="site-header">
      <NavLink className="brand" to="/" end>
        <span className="brand-mark" aria-hidden="true">E</span>
        <span>Everyday</span>
      </NavLink>

      <nav className="main-nav" aria-label="Main navigation">
        <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>
          Home
        </NavLink>
        <NavLink to="/products" className={({ isActive }) => isActive ? "active" : ""}>
          Products
        </NavLink>
        {user && (
          <NavLink to="/cart" className={({ isActive }) => isActive ? "active" : ""}>
            Cart <span className="cart-count">{itemCount}</span>
          </NavLink>
        )}
      </nav>

      <div className="nav-actions">
        <button className="theme-toggle" type="button" onClick={onToggleTheme}>
          {theme === "light" ? "Dark mode" : "Light mode"}
        </button>
        {user ? (
          <div className="account-actions">
            <span className="username">{user.username}</span>
            <button className="text-button" type="button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <NavLink className="login-link" to="/login">Login</NavLink>
        )}
      </div>
    </header>
  );
}
