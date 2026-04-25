import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import MasonryGrid from "../../Components/MasonryGrid/MasonryGrid";
import usePinsFeed from "../../hooks/usePinsFeed";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { categories } from "../../data/categories";
import styles from "./Home.module.css";

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "All";
  const searchTerm = searchParams.get("q") || "";

  const { pins, error, loadingInitial, loadingMore, hasMore, loadMore, retry } = usePinsFeed({
    searchTerm,
    activeCategory,
    perPage: 24,
  });

  const sentinelRef = useInfiniteScroll({
    enabled: true,
    loading: loadingMore,
    hasMore,
    onLoadMore: loadMore,
  });

  const sidebarCategories = useMemo(() => categories.slice(1), []);

  function onCategoryChange(nextCategory) {
    const params = new URLSearchParams(searchParams);
    if (nextCategory === "All") params.delete("category");
    else params.set("category", nextCategory);
    setSearchParams(params);
  }

  return (
    <main className={styles.page}>
      <aside className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Trends</h2>
        {sidebarCategories.map((category) => (
          <button
            key={category}
            type="button"
            className={`${styles.sidebarItem} ${
              activeCategory === category ? styles.sidebarItemActive : ""
            }`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </aside>

      <section className={styles.content}>
        <p className={styles.queryText}>
          {searchTerm
            ? `Results for "${searchTerm}"${activeCategory !== "All" ? ` in ${activeCategory}` : ""}`
            : `Showing ${activeCategory} inspiration`}
        </p>

        {error && (
          <div className={styles.errorBox}>
            <p>{error}</p>
            <button type="button" onClick={retry}>
              Retry
            </button>
          </div>
        )}

        {loadingInitial ? (
          <div className={styles.skeletonGrid}>
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className={styles.skeletonCard} />
            ))}
          </div>
        ) : (
          <>
            <MasonryGrid items={pins} />
            {!pins.length && !error && (
              <p className={styles.emptyState}>No pins found. Try another search or category.</p>
            )}
          </>
        )}

        <div ref={sentinelRef} className={styles.sentinel} aria-hidden="true" />
        {loadingMore && <p className={styles.message}>Loading more ideas...</p>}
        {!hasMore && pins.length > 0 && (
          <p className={styles.message}>You reached the end of this feed.</p>
        )}
      </section>
    </main>
  );
}