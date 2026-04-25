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

export default function Home({ search }) {
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  async function fetchImages(query = "All", pageNumber = 1, append = false) {
    try {
      setLoading(true);
      const finalQuery =
        search.trim() !== ""
          ? search
          : query === "All"
          ? "trending"
          : query;
      const url =
        query === "All" && search.trim() === ""
          ? `https://api.pexels.com/v1/curated?per_page=30&page=${pageNumber}`
          : `https://api.pexels.com/v1/search?query=${encodeURIComponent(finalQuery)}&per_page=30&page=${pageNumber}`;
      const res = await fetch(url, {headers: {Authorization: API_KEY,},});
      const data = await res.json();
      const photos = data.photos || [];

      if(append) {
        setImages((prev) => [...prev, ...photos]);
      }else{
        setImages(photos);
      }
    }catch(err){
      console.error("Failed to fetch images:", err);
    }finally{
      setLoading(false);
    }
  }
  useEffect(() => {
    setPage(1);
    fetchImages(category, 1, false);
  },[category]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      fetchImages(category, 1, false);
    }, 500);
    return () => clearTimeout(timer);
  },[search]);

  function handleLoadMore() {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(category, nextPage, true);
  }

  return (
    <main className={styles.page}>
      <div className={styles.categoryBar}>
        {categories.map((cat) => (
          <button key={cat} className={category === cat ? `${styles.categoryBtn} ${styles.activeCategoryBtn}`: styles.categoryBtn} onClick={() => setCategory(cat)}>{cat}
          </button>
        ))}
      </div>
      {loading && images.length === 0 && (
        <p className={styles.message}>Loading images...</p>
      )}
      {!loading && images.length === 0 && (
        <p className={styles.message}>No images found.</p>
      )}
      <div className={styles.masonry}>
        {images.map((img) => (
          <div key={img.id} className={styles.card}>
            <img
              src={img.src.large}
              alt={img.alt || "Pexels image"}
              className={styles.cardImage}/>
          </div>
        ))}
      </div>
      {images.length > 0 && (
        <div className={styles.loadMoreWrap}>
          <button
            className={styles.loadMoreBtn}
            onClick={handleLoadMore}
            disabled={loading}>
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </main>
  );
}