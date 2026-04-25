import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentQuery = searchParams.get("q") || "";

  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  const isActive = (path) => location.pathname === path;
  const isFeedRoute = location.pathname === "/" || location.pathname === "/explore";

  function onSearchSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = String(formData.get("q") || "").trim();
    const params = new URLSearchParams(searchParams);

    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }

    if (!isFeedRoute) {
      navigate(`/explore?${params.toString()}`);
      return;
    }

    navigate(`${location.pathname}?${params.toString()}`);
  }

  return (
    <header className={styles.navbar}>
      <div className={styles.left}>
        <Link to="/" className={styles.logo}>
          Pixora
        </Link>

        <nav className={styles.navLinks}>
          <Link to="/" className={`${styles.navBtn} ${isActive("/") ? styles.active : ""}`}>
            Home
          </Link>

          <Link
            to="/explore"
            className={`${styles.navBtn} ${isActive("/explore") ? styles.active : ""}`}
          >
            Explore
          </Link>
        </nav>
      </div>

      <form className={styles.searchBar} onSubmit={onSearchSubmit}>
        <input
          type="text"
          name="q"
          placeholder="Search ideas..."
          defaultValue={currentQuery}
          key={`${location.pathname}-${currentQuery}`}
          aria-label="Search pins"
        />
      </form>

      <div className={styles.right}>
        <Link to="/notifications" className={styles.icon} aria-label="Notifications">
          🔔
        </Link>
        <Link to="/profile" className={styles.icon} aria-label="Profile">
          👤
        </Link>

        <Link to="/login" className={styles.loginBtn}>
          Login
        </Link>

        <Link to="/signup" className={styles.signupBtn}>
          Sign Up
        </Link>
      </div>
    </header>
  );
}