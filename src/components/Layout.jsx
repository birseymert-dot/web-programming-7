import { Outlet } from "react-router";
import useLocalStorage from "../hooks/useLocalStorage.js";
import NavBar from "./NavBar.jsx";

export default function Layout() {
  const [storedTheme, setStoredTheme] = useLocalStorage("everyday-shop-theme", "light");
  const theme = storedTheme === "dark" ? "dark" : "light";

  function toggleTheme() {
    setStoredTheme((current) => current === "dark" ? "light" : "dark");
  }

  return (
    <div className={`app-shell theme-${theme}`}>
      <NavBar theme={theme} onToggleTheme={toggleTheme} />
      <main className="page-content">
        <Outlet />
      </main>
      <footer className="site-footer">
        <p>Everyday Shop · A small React learning project</p>
      </footer>
    </div>
  );
}
