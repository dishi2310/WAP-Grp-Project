export function normalizePexelsPhotos(photos = []) {
  const sizes = ["small", "medium", "large", "tall"];

  return photos.map((photo, index) => ({
    id: photo.id,
    image:
      photo.src?.large2x ||
      photo.src?.large ||
      photo.src?.medium ||
      "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg",
    title: photo.alt || `Pexels photo ${index + 1}`,
    description: photo.alt || "Beautiful visual content",
    category: "Inspiration",
    username: photo.photographer || "Pexels Creator",
    size: sizes[index % sizes.length],
  }));
}