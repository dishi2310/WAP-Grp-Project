import PinCard from "../PinCard/PinCard";
import styles from "./MasonryGrid.module.css";

export default function MasonryGrid({ items = [], variant = "home" }) {
  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <PinCard key={item.id} pin={item} variant={item.variant || variant} />
      ))}
    </div>
  );
}