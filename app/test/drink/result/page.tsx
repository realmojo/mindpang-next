"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Layout from "@/components/Layout";
import Fshare from "@/components/Fshare";
import Script from "next/script";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wine, Heart, Sparkles, Loader2 } from "lucide-react";
import { drinkResult } from "./drink-result.js";

interface DishItem {
  title: string;
  thumbnail: string;
  landingUrl: string;
}

interface ResultDetail {
  name: string;
  text: string;
  drink: string;
  best_matches: string[];
  reasons: string[];
  dishItems: DishItem[];
}

interface Results {
  [key: string]: ResultDetail;
}

export default function DrinkResultPage() {
  const searchParams = useSearchParams();
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [type, setType] = useState("");
  const [result, setResult] = useState<ResultDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const results: Results = drinkResult;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const urlParams = new URLSearchParams(window.location.search);
    const resultType =
      urlParams.get("type") ||
      localStorage.getItem("mindpang-drink-mbti") ||
      "ENFJ"; // 기본값 ENFJ

    if (results[resultType]) {
      setName(results[resultType].name);
      setText(results[resultType].text);
      setType(resultType);
      setResult(results[resultType]);
    } else {
      setName("결과를 찾을 수 없습니다.");
      setText(
        "<p>저장된 유형이 없거나 데이터가 존재하지 않습니다. 다시 테스트해보세요!</p>"
      );
      setType("UNKNOWN");
    }
    setIsLoading(false);
  }, [searchParams]);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-luxury-gold" />
            <p className="text-gray-400">결과를 불러오는 중...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!result) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <Card className="w-full max-w-2xl bg-[#1E1E1E]/90 border-white/10">
            <CardContent className="p-12 text-center">
              <p className="text-gray-400">결과를 찾을 수 없습니다.</p>
              <Link href="/test/drink" className="mt-4 inline-block">
                <button className="btn btn-secondary">테스트 다시하기</button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1963334904140891"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <main className="test-layout flex justify-center flex-col">
        <div className="w-full max-w-2xl mx-auto p-4">
          <h1 className="text-center text-3xl font-bold text-gray-100 mb-6">
            당신의 술자리 성향은?
          </h1>
          <img
            src={`https://mindpang-image.s3.ap-northeast-2.amazonaws.com/drink/${type}.png`}
            alt={`${name} 술자리 성향 테스트 결과`}
            className="w-full h-auto rounded-2xl mt-4 shadow-lg"
          />

          <div className="text-center pt-4 text-4xl font-bold text-luxury-gold">
            {name} <br />
            <span className="text-2xl font-light text-gray-300">({type})</span>
          </div>

          <Card className="mt-6 bg-[#1E1E1E]/80 border-white/10">
            <CardContent className="p-6">
              <div
                className="text-left adhd-result-text text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: text }}
              ></div>
            </CardContent>
          </Card>
        </div>

        {/* AdSense */}
        <div className="my-6">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-1963334904140891"
            data-ad-slot="6941176195"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </div>

        <div className="w-full max-w-2xl mx-auto p-4 space-y-6">
          {/* 추천하는 술 종류 */}
          <Card className="bg-[#1E1E1E]/80 border-white/10">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-luxury-gold flex items-center gap-2">
                <Wine className="w-5 h-5" />
                추천하는 술 및 안주 종류
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mt-2 text-gray-300 mb-4">{result.drink}</p>

              <div className="mt-3 py-4 flex space-x-4 overflow-x-auto scrollbar-hide">
                {result.dishItems.map((item, index) => (
                  <Link
                    key={item.title}
                    href={item.landingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative bg-[#2A2A2A] rounded-lg shadow-lg p-3 flex-shrink-0 w-48 hover:shadow-xl hover:shadow-luxury-gold/20 transition cursor-pointer border border-white/10 hover:border-luxury-gold/30"
                  >
                    <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-luxury-gold text-black flex items-center justify-center text-sm font-bold z-10">
                      {index + 1}
                    </div>
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-40 h-40 rounded object-contain mx-auto"
                    />
                    <div className="text-left mt-2">
                      <h3 className="text-sm font-bold text-gray-200 line-clamp-2 overflow-hidden">
                        {item.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="text-xs text-gray-500 font-light mt-2">
                해당 상품은 쿠팡 파트너스의 일정 수수료를 제공 받습니다.
              </div>
            </CardContent>
          </Card>

          {/* 추천하는 궁합 MBTI 유형 */}
          <Card className="bg-[#1E1E1E]/80 border-white/10">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-luxury-gold flex items-center gap-2">
                <Heart className="w-5 h-5" />잘 맞는 술자리 MBTI 유형
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-400 mt-2 mb-4">
                다른 유형도 같이 확인해 보세요!
              </div>
              <div className="flex flex-wrap gap-2">
                {result.best_matches.map((match) => (
                  <Link
                    key={match}
                    href={`/test/drink/result?type=${match}`}
                    className="rounded-full px-4 py-2 text-sm font-bold text-luxury-gold bg-gradient-to-r from-luxury-gold/80 to-luxury-gold hover:from-luxury-gold hover:to-luxury-gold/90 hover:scale-105 hover:shadow-lg hover:shadow-luxury-gold/50 transition duration-300 ease-in-out cursor-pointer flex items-center justify-center"
                  >
                    👉 {match}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 추천하는 이유 */}
          <Card className="bg-[#1E1E1E]/80 border-white/10">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-luxury-gold flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                추천하는 이유
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 mt-2 space-y-2 text-gray-300">
                {result.reasons.map((reason, index) => (
                  <li key={index} className="leading-relaxed">
                    {reason}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Fshare
          title="술자리 성향 테스트 결과 - 마인드팡"
          imageUrl="https://mindpang-image.s3.ap-northeast-2.amazonaws.com/drink.png"
          url="https://mindpang.com/test/drink"
        />
      </main>
    </Layout>
  );
}
