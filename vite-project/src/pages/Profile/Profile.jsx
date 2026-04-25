import MasonryGrid from "../../Components/MasonryGrid/MasonryGrid";
import styles from "./Profile.module.css";

const demoPins = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
    title: "Nature",
    username: "Deepak",
    size: "medium",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    title: "Tech",
    username: "Deepak",
    size: "large",
  },
];

export default function Profile() {
  const userName = localStorage.getItem("pixora_user_name") || "Deepak Kumar";
  const avatarUrl = `https://ui-avatars.com/api/?name=${userName.replace(/\s+/g, "+")}&background=111827&color=fff`;

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <img
          className={styles.avatar}
          src={avatarUrl}
          alt="Profile"
        />

        <h1 className={styles.name}>{userName}</h1>
        <p className={styles.bio}>Front-end learner building a Pinterest-style UI.</p>

        <button type="button" className={styles.editBtn}>
          Edit Profile
        </button>
      </div>

      <div className={styles.tabs}>
        <button className={`${styles.tab} ${styles.active}`}>Pins</button>
        <button className={styles.tab}>Boards</button>
      </div>

      <div className={styles.gridWrap}>
        <MasonryGrid items={demoPins} />
      </div>
    </section>
  );
}