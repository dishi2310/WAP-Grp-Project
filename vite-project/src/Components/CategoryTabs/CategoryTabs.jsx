import styles from "./CategoryTabs.module.css";

export default function CategoryTabs({
  categories = [],
  activeCategory = "All",
  onCategoryChange = () => {},
}) {
  return (
    <div className={styles.tabs}>
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={`${styles.tab} ${
            activeCategory === category ? styles.active : ""
          }`}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}