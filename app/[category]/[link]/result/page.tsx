"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import Fshare from "@/components/Fshare";
import Script from "next/script";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2, RotateCcw, Home } from "lucide-react";

interface TestContent {
  title?: {
    text?: string;
    url?: string;
  };
  questions?: Array<{
    text: string;
    score?: number | string;
  }>;
  answer?: number;
}

interface TestItem {
  title: string;
  category: string;
  link: string;
  type: string;
  contents: TestContent[];
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
  const [isLoading, setIsLoading] = useState(true);

  const loadResultData = useCallback(() => {
    if (typeof window === "undefined") return;

    const storedItem = localStorage.getItem("mindpang-test-item");
    const storedResult = localStorage.getItem("mindpang-test-result");

    if (!storedItem || !storedResult) {
      alert("올바르지 않은 경로입니다.");
      router.push("/");
      return;
    }

    const itemData: TestItem = JSON.parse(storedItem);
    const resultData: ResultItem = JSON.parse(storedResult);

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

    setIsLoading(false);
  }, [router]);

  useEffect(() => {
    loadResultData();
  }, [loadResultData]);

  if (isLoading || !item || !resultItem) {
    return (
      <Layout>
        <div className="flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-luxury-gold" />
            <p className="text-gray-400">결과를 불러오는 중...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9130836798889522"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <main className="test-layout flex justify-center flex-col">
        <div className="w-full max-w-2xl mx-auto p-4 pt-4">
          <h1 className="text-center text-3xl mb-6 font-bold text-gray-100">
            결과 분석
          </h1>

          {/* Result Image */}
          {resultItem.url && (
            <Card className="mb-6 bg-[#1E1E1E]/90 border-white/10">
              <CardContent className="p-0">
                <img
                  src={resultItem.url}
                  alt={item.title || "결과 이미지"}
                  className="w-full h-auto rounded-lg"
                  loading="lazy"
                />
              </CardContent>
            </Card>
          )}

          {/* Score Card */}
          {item.type === "answer" && (
            <Card className="mb-6 bg-[#1E1E1E]/80 border-white/10">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-luxury-gold" />
                  <CardTitle className="text-xl font-serif text-luxury-gold">
                    테스트 점수
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-5xl font-bold text-luxury-gold mb-2">
                    {total}
                  </div>
                  <div className="text-xl text-gray-400">
                    점 ({totalCount} / {contentTotalCount})
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Result Text */}
          <Card className="mb-6 bg-[#1E1E1E]/80 border-white/10">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-luxury-gold" />
                <CardTitle className="text-xl font-serif text-luxury-gold">
                  결과 설명
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-gray-300 leading-relaxed space-y-4">
                {textSplit.map((line, index) => (
                  <p key={index} dangerouslySetInnerHTML={{ __html: line }} />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AdSense */}
          {item.adsenses?.result && (
            <div className="my-6">
              <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-9130836798889522"
                data-ad-slot={item.adsenses.result}
                data-ad-format="auto"
                data-full-width-responsive="true"
              ></ins>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center mb-6">
            <Link href={`/${category}/${link}/play`}>
              <Button className="bg-luxury-gold hover:bg-luxury-gold/90 text-black font-semibold">
                <RotateCcw className="mr-2 w-4 h-4" />
                다시 테스트하기
              </Button>
            </Link>
            <Link href="/">
              <Button
                variant="outline"
                className="border-luxury-gold/40 text-luxury-gold hover:bg-luxury-gold/10"
              >
                <Home className="mr-2 w-4 h-4" />
                홈으로
              </Button>
            </Link>
          </div>

          {/* Share Component */}
          <Fshare
            title={`${item.title} 테스트 결과 - 마인드팡`}
            imageUrl={
              resultItem.url ||
              item.logo ||
              "https://mindpang.com/mindpang-opengraph-logo.png"
            }
            url={`https://mindpang.com/${category}/${link}`}
          />
        </div>
      </main>
    </Layout>
  );
}
