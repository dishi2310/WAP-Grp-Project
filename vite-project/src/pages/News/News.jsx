import styles from "./News.module.css";

const newsItems = [
  {
    id: 1,
    title: "Creative trends shaping visual platforms",
    text: "See how modern creators are using color, composition, and storytelling in visual-first apps.",
  },
  {
    id: 2,
    title: "Design inspiration for digital collections",
    text: "Discover how curated boards and saved content are influencing today’s UI experiences.",
  },
];

export default function News() {
  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Latest News</h1>

        <div className={styles.grid}>
          {newsItems.map((item) => (
            <article key={item.id} className={styles.card}>
              <div className={styles.banner}></div>
              <div className={styles.content}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <button type="button" className={styles.readBtn}>
                  Read More
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}