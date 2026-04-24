import { Link } from "react-router-dom";
import styles from "./Login.module.css";

function Login() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Login</h1>
        <p className={styles.subtitle}>Welcome back to PinUI</p>

        <form className={styles.form}>
          <input type="email" placeholder="Email" className={styles.input} />
          <input type="password" placeholder="Password" className={styles.input} />
          <button type="button" className={styles.primaryBtn}>
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