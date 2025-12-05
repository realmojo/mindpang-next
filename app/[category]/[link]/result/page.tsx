"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import Fshare from "@/components/Fshare";
import Script from "next/script";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2, RotateCcw, Home } from "lucide-react";
import Image from "next/image";

interface TestItem {
  title: string;
  category: string;
  link: string;
  type: string;
  contents: any[];
  logo: string;
  adsenses?: {
    result?: string;
  };
}

interface ResultItem {
  url?: string;
  text: string;
  totalCount?: number;
}

export default function ResultPage() {
  const params = useParams();
  const router = useRouter();
  const category = params.category as string;
  const link = params.link as string;

  const [item, setItem] = useState<TestItem | null>(null);
  const [resultItem, setResultItem] = useState<ResultItem | null>(null);
  const [total, setTotal] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [contentTotalCount, setContentTotalCount] = useState(0);
  const [textSplit, setTextSplit] = useState<string[]>([]);
  const [recentlyItems, setRecentlyItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load item from localStorage
    if (typeof window !== "undefined") {
      const storedItem = localStorage.getItem("mindpang-test-item");
      const storedResult = localStorage.getItem("mindpang-test-result");

      if (!storedItem || !storedResult) {
        alert("올바르지 않은 경로입니다.");
        router.push("/");
        return;
      }

      const itemData = JSON.parse(storedItem);
      const resultData = JSON.parse(storedResult);

      setItem(itemData);
      setResultItem(resultData);

      const d = resultData.text.split("<br />");
      setTextSplit(d.filter((line: string) => line));

      if (itemData.type !== "random" && itemData.type !== "count") {
        const _totalCount = resultData.totalCount ? resultData.totalCount : 0;
        const _contentTotalCount = itemData.contents.length;
        setTotalCount(Number(_totalCount));
        setContentTotalCount(_contentTotalCount);
        const score = Math.ceil((_totalCount * 100) / _contentTotalCount);
        setTotal(score);
      }
    }

    setIsLoading(false);

    // Load recently items
    const fetchRecently = async () => {
      const url = `https://api.mindpang.com/api/mind/recently.php`;
      const response = await fetch(url);
      const data = await response.json();
      setRecentlyItems(data);
    };
    fetchRecently();
  }, [router]);

  if (!item || !resultItem) {
    return (
      <Layout>
        <div className="site-layout px-2">
          <div className="text-center p-10">Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="test-layout">
        <div>
          <h1 className="pt-4 pb-4 text-2xl font-bold text-center result-title">
            결과분석
          </h1>
          {resultItem.url && (
            <img
              className="test-play-img"
              src={resultItem.url}
              alt="logo"
              loading="lazy"
            />
          )}
          <div id="result-container">
            {item.type === "answer" && (
              <div className="pt-4 text-2xl result-title">
                테스트 점수
                <span className="text-blue-600 font-bold mr-2">
                  {" "}
                  {total} 점{" "}
                </span>
                ({totalCount} / {contentTotalCount})
              </div>
            )}
            <div className="test-result-text pt-8">
              {textSplit.map((line, index) => (
                <p key={index} dangerouslySetInnerHTML={{ __html: line }} />
              ))}
            </div>
          </div>
        </div>
        {/* Share component would go here */}
        <h2 className="text-xl font-bold">👉 다른 테스트 하러가기</h2>
        {/* TestList component would go here */}
      </main>
    </Layout>
  );
}
