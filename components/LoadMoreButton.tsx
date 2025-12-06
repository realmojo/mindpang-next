"use client";

import { useState } from "react";

interface TestItem {
  category: string;
  link: string;
  title: string;
  description: string;
  logo: string;
}

interface LoadMoreButtonProps {
  initialPage: number;
  onLoadMore: (page: number) => Promise<TestItem[]>;
  onItemsLoaded: (items: TestItem[]) => void;
}

export default function LoadMoreButton({
  initialPage,
  onLoadMore,
  onItemsLoaded,
}: LoadMoreButtonProps) {
  const [page, setPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const newItems = await onLoadMore(page);
      if (newItems && newItems.length > 0) {
        setPage((prev) => prev + 1);
        onItemsLoaded(newItems);
      }
    } catch (err) {
      console.error("Failed to load more items:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-center mb-8 px-4 mt-8">
      <button
        className="btn btn-outline border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-black hover:border-luxury-gold w-full max-w-xs transition-all duration-300 uppercase tracking-widest font-medium text-xs py-4 h-auto rounded-none"
        onClick={handleLoadMore}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Load More"}
      </button>
    </div>
  );
}
