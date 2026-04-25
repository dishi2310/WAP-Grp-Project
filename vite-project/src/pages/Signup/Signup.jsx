import { Link, useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";

function Signup() {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target[0].value;
    localStorage.setItem("pixora_auth", "true");
    localStorage.setItem("pixora_user_name", name);
    navigate("/");
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Create account</h1>
        <p className={styles.subtitle}>Join PinUI and start saving ideas</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input type="text" placeholder="Full name" className={styles.input} required />
          <input type="email" placeholder="Email" className={styles.input} required />
          <input type="password" placeholder="Password" className={styles.input} required />
          <button type="submit" className={styles.primaryBtn}>
            Sign Up
          </button>
        </form>

        <p className={styles.bottomText}>
          Already have an account? <Link to="/login">Login</Link>
        </p>

        <Link to="/" className={styles.backLink}>
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

export default Signup;