"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SearchItem {
  category: string;
  link: string;
  title: string;
  logo: string;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isSearchList, _setIsSearchList] = useState(false);
  const [searchItems, setSearchItems] = useState<SearchItem[]>([]);
  const [searchText, _setSearchText] = useState("");

  const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const performSearch = useCallback(async (newSearchText: string) => {
    if (newSearchText) {
      const url = `/api/search?search=${newSearchText}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setSearchItems(data.items || []);
      } catch (error) {
        console.error("Search error:", error);
        setSearchItems([]);
      }
    } else {
      setSearchItems([]);
    }
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (searchText) {
      timeoutId = setTimeout(() => {
        performSearch(searchText);
      }, 300);
    } else {
      performSearch("");
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [searchText, performSearch]);

  const doRandomStart = async () => {
    const url = "/api/all";
    try {
      const response = await fetch(url);
      const data = await response.json();
      const items = data.items;
      const randomNumber = getRandomNumber(0, items.length - 1);
      router.push(
        `/${items[randomNumber].category}/${items[randomNumber].link}`
      );
    } catch (error) {
      console.error("Random start error:", error);
    }
  };

  return (
    <div className="site-layout">
      <header className="glass">
        <div className="header-wrap">
          <div className="header-title">
            <Link href="/" className="flex items-center gap-3">
              <h1 className="text-2xl font-serif text-luxury-gold tracking-wider font-bold">
                MINDPANG
              </h1>
            </Link>
          </div>
          <div>
            <button
              className="btn btn-ghost btn-circle text-luxury-gold hover:bg-white/10"
              aria-label="random-play"
              title="Random Play"
              onClick={doRandomStart}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
              >
                <path
                  d="M16.6582 9.28638C18.098 10.1862 18.8178 10.6361 19.0647 11.2122C19.2803 11.7152 19.2803 12.2847 19.0647 12.7878C18.8178 13.3638 18.098 13.8137 16.6582 14.7136L9.896 18.94C8.29805 19.9387 7.49907 20.4381 6.83973 20.385C6.26501 20.3388 5.73818 20.0469 5.3944 19.584C5 19.053 5 18.1108 5 16.2264V7.77357C5 5.88919 5 4.94701 5.3944 4.41598C5.73818 3.9531 6.26501 3.66111 6.83973 3.6149C7.49907 3.5619 8.29805 4.06126 9.896 5.05998L16.6582 9.28638Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Search Results Dropdown */}
        {isSearchList && searchItems.length > 0 && (
          <div className="absolute top-full left-0 w-full bg-neutral-900 border-b border-white/10 shadow-2xl z-50">
            <ul className="max-h-96 overflow-y-auto">
              {searchItems.map((item, index) => (
                <li
                  key={index}
                  className="border-b border-white/5 last:border-0"
                >
                  <Link
                    href={`/${item.category}/${item.link}/`}
                    className="flex items-center p-4 hover:bg-white/5 transition-colors"
                  >
                    <img
                      className="rounded object-cover mr-4"
                      alt={item.title}
                      src={item.logo}
                    />
                    <div className="text-gray-200 font-medium">
                      {item.title}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      <main className="min-h-screen">{children}</main>

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-500 text-sm pb-8">
        <p>&copy; 2024 Mindpang. All rights reserved.</p>
      </footer>
    </div>
  );
}
