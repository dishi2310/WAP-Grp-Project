import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { fetchCuratedPins, fetchSearchPins } from "../services/api";
import { normalizePins } from "../services/normalizeData";

function dedupePins(list) {
  const seen = new Set();
  return list.filter((pin) => {
    if (seen.has(pin.id)) return false;
    seen.add(pin.id);
    return true;
  });
}

export default function usePinsFeed({
  searchTerm = "",
  activeCategory = "All",
  perPage = 24,
} = {}) {
  const [pins, setPins] = useState([]);
  const [error, setError] = useState("");
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const abortRef = useRef(null);

  const effectiveQuery = useMemo(() => {
    if (searchTerm.trim()) return searchTerm.trim();
    if (activeCategory !== "All") return activeCategory;
    return "";
  }, [searchTerm, activeCategory]);

  const runFetch = useCallback(
    async ({ targetPage, append }) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        if (append) setLoadingMore(true);
        else setLoadingInitial(true);

        setError("");
        const response = effectiveQuery
          ? await fetchSearchPins({
              query: effectiveQuery,
              page: targetPage,
              perPage,
              signal: controller.signal,
            })
          : await fetchCuratedPins({
              page: targetPage,
              perPage,
              signal: controller.signal,
            });

        const normalized = normalizePins(
          response.photos || [],
          activeCategory === "All" ? "All" : activeCategory
        );

        // Important: dedupe by id to avoid duplicate cards across pages.
        setPins((prev) => (append ? dedupePins([...prev, ...normalized]) : normalized));
        setPage(targetPage);
        setHasMore((response.photos || []).length >= perPage);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Failed to load pins.");
          if (!append) setPins([]);
        }
      } finally {
        if (append) setLoadingMore(false);
        else setLoadingInitial(false);
      }
    },
    [effectiveQuery, perPage, activeCategory]
  );

  useEffect(() => {
    // Fetching on query/category changes is intentional for URL-driven feed state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    runFetch({ targetPage: 1, append: false });
    return () => abortRef.current?.abort();
  }, [runFetch]);

  const loadMore = useCallback(() => {
    if (loadingMore || loadingInitial || !hasMore) return;
    runFetch({ targetPage: page + 1, append: true });
  }, [runFetch, page, loadingMore, loadingInitial, hasMore]);

  const retry = useCallback(() => {
    runFetch({ targetPage: 1, append: false });
  }, [runFetch]);

  return {
    pins,
    error,
    loadingInitial,
    loadingMore,
    hasMore,
    loadMore,
    retry,
  };
}