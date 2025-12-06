"use client";

import { useState } from "react";
import Items from "@/components/Items";
import Sidebar from "@/components/Sidebar";
import LoadMoreButton from "@/components/LoadMoreButton";

interface TestItem {
  category: string;
  link: string;
  title: string;
  description?: string;
  logo: string;
}

interface SidebarItem {
  category: string;
  link: string;
  title: string;
  logo: string;
}

interface HomeContentProps {
  initialItems: TestItem[];
  recentlyItems: SidebarItem[];
  popularItems: SidebarItem[];
  searchQuery: string;
}

export default function HomeContent({
  initialItems,
  recentlyItems,
  popularItems,
  searchQuery,
}: HomeContentProps) {
  const [items, setItems] = useState<TestItem[]>(initialItems);
  const [page, _setPage] = useState(1);

  const handleLoadMore = async (currentPage: number): Promise<TestItem[]> => {
    try {
      const url = `/api/main?page=${currentPage}${
        searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ""
      }`;
      const response = await fetch(url, { cache: "no-store" });
      const data = await response.json();
      return data.items || [];
    } catch (err) {
      console.error("Failed to load more items:", err);
      return [];
    }
  };

  const handleItemsLoaded = (newItems: TestItem[]) => {
    setItems((prev) => [...prev, ...newItems]);
  };

  return (
    <main className="site-layout pb-20">
      {/* Hero Section */}
      <section className="relative h-[300px] mb-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-gold/20 to-transparent z-0"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 z-10">
          <h2 className="text-4xl font-serif font-bold text-luxury-gold mb-2 drop-shadow-lg">
            나를 발견하는 시간
          </h2>
          <p className="text-gray-300 text-sm max-w-[80%] leading-relaxed">
            심리 테스트로 내면의 깊은 곳을 탐험해보세요.
          </p>
          <div className="mt-6 w-16 h-1 bg-luxury-gold/50 rounded-full"></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(212,175,55,0.05)_0%,transparent_70%)] animate-pulse"></div>
      </section>

      <div className="px-4 relative z-10">
        <div className="flex items-center justify-between mb-6 px-2">
          <h3 className="text-xl font-serif text-gray-200">Latest Tests</h3>
          <div className="h-[1px] flex-grow ml-4 bg-gradient-to-r from-white/10 to-transparent"></div>
        </div>

        <Items
          items={items.map((item) => ({
            category: item.category,
            link: item.link,
            title: item.title,
            description: item.description || "",
            logo: item.logo,
          }))}
        />
      </div>

      {items.length > 0 && (
        <LoadMoreButton
          initialPage={page}
          onLoadMore={async (page: number) => {
            const items = await handleLoadMore(page);
            return items.map((item) => ({
              category: item.category,
              link: item.link,
              title: item.title,
              description: item.description || "",
              logo: item.logo,
            }));
          }}
          onItemsLoaded={handleItemsLoaded}
        />
      )}

      {recentlyItems.length > 0 && popularItems.length > 0 && (
        <div className="mt-12 px-4">
          <Sidebar recentlyItems={recentlyItems} popularItems={popularItems} />
        </div>
      )}
    </main>
  );
}
