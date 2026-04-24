import { useEffect, useState } from "react";
import styles from "./Home.module.css";

const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

const categories = [
  "All",
  "Nature",
  "Fashion",
  "Travel",
  "Art",
  "Food",
  "Technology",
  "People",
  "Animals",
  "Architecture",
];

function Home() {
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  // FETCH FUNCTION
  const fetchImages = async (query = "All", pageNum = 1) => {
    try {
      setLoading(true);

      const url =
        query === "All"
          ? `https://api.pexels.com/v1/curated?per_page=30&page=${pageNum}`
          : `https://api.pexels.com/v1/search?query=${query}&per_page=30&page=${pageNum}`;

      const res = await fetch(url, {
        headers: {
          Authorization: API_KEY,
        },
      });

      const data = await res.json();

      // 🔥 IMPORTANT: append data (not replace)
      if (pageNum === 1) {
        setImages(data.photos || []);
      } else {
        setImages((prev) => [...prev, ...(data.photos || [])]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // CATEGORY CHANGE
  useEffect(() => {
    setPage(1);
    fetchImages(category, 1);
  }, [category]);

  // LOAD MORE
  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(category, nextPage);
  };

  return (
    <div className={styles.page}>
      {/* CATEGORY */}
      <div className={styles.categoryBar}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={
              category === cat
                ? styles.activeCategoryBtn
                : styles.categoryBtn
            }
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className={styles.masonry}>
        {images.map((img) => (
          <div key={img.id} className={styles.card}>
            <img
              src={img.src.large}
              alt={img.alt}
              className={styles.cardImage}
            />
          </div>
        ))}
      </div>

      {/* LOAD MORE BUTTON */}
      <div className={styles.loadMoreWrap}>
        <button
          className={styles.loadMoreBtn}
          onClick={handleLoadMore}
          disabled={loading}
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
    </div>
  );
}

export default Home;