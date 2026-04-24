import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Explore.module.css";

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

const genreMeta = {
  Nature: {
    title: "Nature stories",
    subtitle: "Calm landscapes, forests, rivers, flowers and scenic moments from around the world.",
  },
  Fashion: {
    title: "Fashion journal",
    subtitle: "Streetwear, editorials, textures, silhouettes and stylish visual inspiration.",
  },
  Travel: {
    title: "Travel diaries",
    subtitle: "Cities, roads, destinations and cinematic places worth saving for later.",
  },
  Art: {
    title: "Art & creative picks",
    subtitle: "Illustration, abstract visuals, composition and expressive artistic moments.",
  },
  Food: {
    title: "Food magazine",
    subtitle: "Tasty frames, rich textures, cafe aesthetics and plated visual stories.",
  },
  Technology: {
    title: "Technology edits",
    subtitle: "Modern devices, futuristic spaces, machines and sleek digital moods.",
  },
  People: {
    title: "People & portraits",
    subtitle: "Portraits, lifestyle photography, emotions and candid human stories.",
  },
  Animals: {
    title: "Animal moments",
    subtitle: "Wildlife, pets, close-ups and beautiful creatures in natural settings.",
  },
  Architecture: {
    title: "Architecture review",
    subtitle: "Buildings, interiors, urban geometry and structural visual inspiration.",
  },
  All: {
    title: "Explore visual stories",
    subtitle: "A curated editorial mix of images from different genres with short magazine-style descriptions.",
  },
};

function normalizePexelsPhotos(data) {
  if (!data?.photos) return [];

  return data.photos.map((photo, index) => {
    const rawTag =
      photo.alt?.split(" ")[0] ||
      categories[(index % (categories.length - 1)) + 1] ||
      "All";

    const possibleCategory = categories.find((c) =>
      photo.alt?.toLowerCase().includes(c.toLowerCase())
    );

    const category = possibleCategory || rawTag || "All";

    return {
      id: photo.id,
      image: photo.src?.large2x || photo.src?.large || photo.src?.portrait || photo.src?.medium,
      title: photo.alt || "Untitled visual",
      author: photo.photographer || "Unknown creator",
      location: photo.photographer_url ? "Pexels creator" : "Editorial feature",
      category: categories.includes(category) ? category : "All",
      description:
        photo.alt ||
        "A curated visual picked for inspiration, moodboarding and editorial discovery.",
    };
  });
}

export default function Explore() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [heroCard, setHeroCard] = useState(null);

  const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

  useEffect(() => {
    fetchExploreImages("editorial design fashion travel food nature architecture portrait technology");
  }, []);

  async function fetchExploreImages(query) {
    try {
      setLoading(true);

      const res = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(
          query
        )}&per_page=24&page=1`,
        {
          headers: {
            Authorization: API_KEY,
          },
        }
      );

      const data = await res.json();
      const normalized = normalizePexelsPhotos(data);

      const enriched = normalized.map((item, index) => {
        const rotatingCategory =
          activeCategory !== "All"
            ? activeCategory
            : categories[(index % (categories.length - 1)) + 1];

        return {
          ...item,
          category:
            item.category === "All" || !item.category
              ? rotatingCategory
              : item.category,
        };
      });

      setPhotos(enriched);
      setHeroCard(enriched[0] || null);
    } catch (error) {
      console.error("Failed to fetch explore images:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!API_KEY) return;

    const timeout = setTimeout(() => {
      let query = "";

      if (search.trim()) {
        query = search.trim();
      } else if (activeCategory !== "All") {
        query = activeCategory;
      } else {
        query =
          "editorial design fashion travel food nature architecture portrait technology";
      }

      fetchExploreImages(query);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search, activeCategory]);

  const filteredPhotos = useMemo(() => {
    return photos.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;

      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.author.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [photos, activeCategory, search]);

  const sideCards = filteredPhotos.slice(1, 5);
  const storyCards = filteredPhotos.slice(5);

  const currentMeta = genreMeta[activeCategory] || genreMeta.All;

  return (
    <div className={styles.page}>
      {/* CATEGORY PILLS */}
      <section className={styles.categoryBar}>
        {categories.map((item) => (
          <button
            key={item}
            className={`${styles.categoryPill} ${
              activeCategory === item ? styles.activePill : ""
            }`}
            onClick={() => setActiveCategory(item)}
          >
            {item}
          </button>
        ))}
      </section>

      {/* HERO / EDITORIAL */}
      <section className={styles.heroSection}>
        <div className={styles.heroText}>
          <span className={styles.heroLabel}>{activeCategory}</span>
          <h1>{currentMeta.title}</h1>
          <p>{currentMeta.subtitle}</p>

          <div className={styles.heroStats}>
            <span>{filteredPhotos.length} visual stories</span>
            <span>Curated editorial collection</span>
          </div>
        </div>

        {heroCard && (
          <div className={styles.heroCard}>
            <img src={heroCard.image} alt={heroCard.title} />
            <div className={styles.heroOverlay}>
              <span className={styles.cardTag}>{heroCard.category}</span>
              <h2>{heroCard.title}</h2>
              <p>{heroCard.description}</p>
              <div className={styles.cardMeta}>
                <span>{heroCard.author}</span>
                <span>{heroCard.location}</span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* FEATURE ROW */}
      <section className={styles.featureGrid}>
        {sideCards.map((item) => (
          <article key={item.id} className={styles.featureCard}>
            <img src={item.image} alt={item.title} />
            <div className={styles.featureContent}>
              <span className={styles.cardTag}>{item.category}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className={styles.cardMeta}>
                <span>{item.author}</span>
                <span>{item.location}</span>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* STORY GRID */}
      <section className={styles.storySection}>
        <div className={styles.sectionHeading}>
          <h2>Fresh visual articles</h2>
          <p>Magazine-style image cards with more context and cleaner reading flow.</p>
        </div>

        {loading ? (
          <p className={styles.loading}>Loading visual stories...</p>
        ) : (
          <div className={styles.storyGrid}>
            {storyCards.map((item, index) => (
              <article
                key={item.id}
                className={`${styles.storyCard} ${
                  index % 5 === 0 ? styles.storyCardLarge : ""
                }`}
              >
                <div className={styles.storyImageWrap}>
                  <img src={item.image} alt={item.title} />
                </div>

                <div className={styles.storyContent}>
                  <span className={styles.cardTag}>{item.category}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className={styles.cardMeta}>
                    <span>{item.author}</span>
                    <span>{item.location}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}