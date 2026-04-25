import { useEffect, useRef } from "react";

export default function useInfiniteScroll({ enabled, loading, hasMore, onLoadMore }) {
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (!enabled || loading || !hasMore) return undefined;

    const element = sentinelRef.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          onLoadMore();
        }
      },
      { rootMargin: "350px 0px 350px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [enabled, loading, hasMore, onLoadMore]);

  return sentinelRef;
}
