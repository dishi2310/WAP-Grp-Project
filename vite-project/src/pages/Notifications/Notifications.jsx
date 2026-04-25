import styles from "./Notifications.module.css";

const notifications = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=300&q=80",
    title: "User liked your pin",
    time: "2h ago",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1493246318656-5bfd4cfb29b8?auto=format&fit=crop&w=300&q=80",
    title: "A creator followed you",
    time: "5h ago",
  },
];

export default function Notifications() {
  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Notifications</h1>

        <div className={styles.list}>
          {notifications.map((item) => (
            <article key={item.id} className={styles.card}>
              <img src={item.image} alt={item.title} className={styles.thumb} />

              <div className={styles.info}>
                <h3>{item.title}</h3>
                <p>{item.time}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}