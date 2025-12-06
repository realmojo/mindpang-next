"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Layout from "@/components/Layout";
import Items from "@/components/Items";
import Sidebar from "@/components/Sidebar";

interface TestItem {
  category: string;
  link: string;
  title: string;
  description: string;
  logo: string;
}

interface ApiResponse {
  items: TestItem[];
  recentlyItems: TestItem[];
  popularItems: TestItem[];
}

function HomeContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const [items, setItems] = useState<TestItem[]>([]);
  const [recentlyItems, setRecentlyItems] = useState<TestItem[]>([]);
  const [popularItems, setPopularItems] = useState<TestItem[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const baseUrl = "https://api.mindpang.com/api/mind/main.php";

  const loadData = async (searchTerm: string = "") => {
    try {
      setIsLoading(true);
      setError(null);

      const url = searchTerm
        ? `${baseUrl}?search=${encodeURIComponent(searchTerm)}`
        : baseUrl;

      const response = await fetch(url);
      const data: ApiResponse = await response.json();

      if (data) {
        setItems(data.items || []);
        setRecentlyItems(data.recentlyItems || []);
        setPopularItems(data.popularItems || []);
      }
    } catch (err) {
      console.error("Failed to load data:", err);
      setError("Failed to load data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData(searchQuery);
  }, [searchQuery]);

  const doMoreItem = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);

      const url = `https://api.mindpang.com/api/mind/list.php?page=${page}`;
      const response = await fetch(url);
      const data: TestItem[] = await response.json();

      if (data && data.length > 0) {
        setPage((prev) => prev + 1);
        setItems((prev) => [...prev, ...data]);
      }
    } catch (err) {
      console.error("Failed to load more items:", err);
      setError("Failed to load more items.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
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

        {error ? (
          <div className="error text-center p-10 text-red-400 bg-red-900/10 rounded-lg mx-4 border border-red-900/30">
            {error}
            <button
              onClick={() => loadData(searchQuery)}
              className="btn btn-sm btn-outline btn-error mt-4"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            <div className="px-4 relative z-10">
              <div className="flex items-center justify-between mb-6 px-2">
                <h3 className="text-xl font-serif text-gray-200">Latest Tests</h3>
                <div className="h-[1px] flex-grow ml-4 bg-gradient-to-r from-white/10 to-transparent"></div>
              </div>

              <Items items={items} />
            </div>

            {items.length > 0 && (
              <div className="text-center mb-8 px-4 mt-8">
                <button
                  className="btn btn-outline border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-black hover:border-luxury-gold w-full max-w-xs transition-all duration-300 uppercase tracking-widest font-medium text-xs py-4 h-auto rounded-none"
                  onClick={doMoreItem}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Load More"}
                </button>
              </div>
            )}

            {recentlyItems.length > 0 && popularItems.length > 0 && (
              <div className="mt-12 px-4">
                <Sidebar
                  recentlyItems={recentlyItems}
                  popularItems={popularItems}
                />
              </div>
            )}
          </>
        )}
      </main>
    </Layout>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <Layout>
        <main className="site-layout pb-20">
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-luxury-gold mx-auto mb-4"></div>
              <p className="text-gray-400">로딩 중...</p>
            </div>
          </div>
        </main>
      </Layout>
    }>
      <HomeContent />
    </Suspense>
  );
}
