const FALLBACK_IMAGE =
  "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg";

const CATEGORY_KEYWORDS = [
  "Nature",
  "Fashion",
  "Travel",
  "Art",
  "Food",
  "Technology",
  "Architecture",
  "People",
  "Animals",
];

function detectCategory(photo, fallbackCategory = "All") {
  const title = (photo.alt || "").toLowerCase();
  const foundCategory = CATEGORY_KEYWORDS.find((category) =>
    title.includes(category.toLowerCase())
  );

  return foundCategory || fallbackCategory;
}

export function normalizePexelsPhotos(photos = [], fallbackCategory = "All") {
  return photos.map((photo, index) => ({
    id: photo.id,
    image:
      photo.src?.large2x ||
      photo.src?.large ||
      photo.src?.portrait ||
      photo.src?.medium ||
      FALLBACK_IMAGE,
    title: photo.alt || `Pexels photo ${index + 1}`,
    description:
      photo.alt ||
      "A curated visual idea for mood boards, design references, and creative planning.",
    category: detectCategory(photo, fallbackCategory),
    username: photo.photographer || "Pexels creator",
    authorUrl: photo.photographer_url || "",
    likes: photo.liked ? 1 : 0,
  }));
}

// Backward-compatible export to avoid stale imports across older files.
export const normalizePins = normalizePexelsPhotos;