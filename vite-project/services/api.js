const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
const PEXELS_BASE_URL = "https://api.pexels.com/v1/search";

export async function fetchPins({
  query = "nature",
  page = 1,
  perPage = 20,
} = {}) {
  if (!PEXELS_API_KEY) {
    throw new Error("Missing Pexels API key");
  }

  const url = `${PEXELS_BASE_URL}?query=${encodeURIComponent(
    query
  )}&page=${page}&per_page=${perPage}`;

  const response = await fetch(url, {
    headers: {
      Authorization: PEXELS_API_KEY,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Pexels API error: ${response.status} ${errorText}`);
  }

  return response.json();
}