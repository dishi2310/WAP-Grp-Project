import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

function Login() {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    // Mock auth to keep UX functional until backend auth is introduced.
    localStorage.setItem("pixora_auth", "true");
    navigate("/");
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Login</h1>
        <p className={styles.subtitle}>Welcome back to PinUI</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" className={styles.input} required />
          <input type="password" placeholder="Password" className={styles.input} required />
          <button type="submit" className={styles.primaryBtn}>
            Login
          </button>
        </form>

        <p className={styles.bottomText}>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>

        <Link to="/" className={styles.backLink}>
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

export default Login;