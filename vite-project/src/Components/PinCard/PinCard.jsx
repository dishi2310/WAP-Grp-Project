import { useState } from "react";
import styles from "./PinCard.module.css";

const SAVED_PINS_KEY = "pixora_saved_pins";
const LIKED_PINS_KEY = "pixora_liked_pins";

function readLocalSet(key) {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || "[]");
    return new Set(parsed);
  } catch {
    return new Set();
  }
}

function writeLocalSet(key, valueSet) {
  localStorage.setItem(key, JSON.stringify(Array.from(valueSet)));
}

export default function PinCard({ pin, variant = "home" }) {
  const pinId = String(pin.id);
  const [isSaved, setIsSaved] = useState(() => readLocalSet(SAVED_PINS_KEY).has(pinId));
  const [isLiked, setIsLiked] = useState(() => readLocalSet(LIKED_PINS_KEY).has(pinId));

  function toggleSaved() {
    const saved = readLocalSet(SAVED_PINS_KEY);
    if (saved.has(pinId)) saved.delete(pinId);
    else saved.add(pinId);
    writeLocalSet(SAVED_PINS_KEY, saved);
    setIsSaved(saved.has(pinId));
  }

  function toggleLiked() {
    const liked = readLocalSet(LIKED_PINS_KEY);
    if (liked.has(pinId)) liked.delete(pinId);
    else liked.add(pinId);
    writeLocalSet(LIKED_PINS_KEY, liked);
    setIsLiked(liked.has(pinId));
  }

  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <img src={pin.image} alt={pin.title} className={styles.image} loading="lazy" />

        <div className={styles.overlay}>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={toggleLiked}
            aria-label={isLiked ? "Unlike pin" : "Like pin"}
          >
            {isLiked ? "♥" : "♡"}
          </button>
          <button type="button" className={styles.saveBtn} onClick={toggleSaved}>
            {isSaved ? "Saved" : "Save"}
          </button>
        </div>
      </div>

      {variant === "explore" && (
        <div className={styles.meta}>
          <h4 className={styles.title}>{pin.title}</h4>
          <p className={styles.author}>{pin.username}</p>
        </div>
      )}
    </article>
  );
}