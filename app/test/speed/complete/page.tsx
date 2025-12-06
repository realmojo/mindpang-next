"use client";

import { useState, useEffect, useCallback } from "react";
import Layout from "@/components/Layout";
import Fshare from "@/components/Fshare";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, RotateCcw, Loader2 } from "lucide-react";

export default function SpeedCompletePage() {
  const [isCalc, setIsCalc] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const loadResult = useCallback(() => {
    if (typeof window === "undefined") return;

    const resultStr = localStorage.getItem("mindpang-speed-score");

    if (resultStr) {
      try {
        const result: number[] = JSON.parse(resultStr);

        if (result && result.length > 0) {
          let sum = 0;
          for (const value of result) {
            sum += value;
          }
          setSpeed(Math.round(sum / result.length));
        }
      } catch (error) {
        console.error("결과 데이터 파싱 실패:", error);
      }
    }

    setIsCalc(true);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadResult();
  }, [loadResult]);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-luxury-gold" />
            <p className="text-gray-400">결과를 계산 중입니다...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="speed-layout site-layout flex flex-col px-2 bg-gray-800 min-h-screen">
        {!isCalc ? (
          <Card className="bg-[#1E1E1E]/80 border-white/10">
            <CardContent className="p-12 text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-luxury-gold" />
              <p className="text-gray-300">결과를 계산 중입니다..</p>
            </CardContent>
          </Card>
        ) : (
          <div className="speed-font-size max-w-2xl mx-auto w-full">
            <Card className="bg-[#1E1E1E]/90 border-white/10 mb-6">
              <CardHeader>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Zap className="w-8 h-8 text-luxury-gold" />
                  <CardTitle className="text-3xl font-serif font-bold text-luxury-gold">
                    반응속도 테스트 결과
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-2xl text-gray-300 mb-2">
                  당신의 평균 반응속도는
                </p>
                <p className="text-5xl font-bold text-green-400 mb-6">
                  {speed} ms
                </p>
                <p className="text-lg text-gray-400">입니다.</p>
              </CardContent>
            </Card>

            {/* AdSense */}
            <div className="my-6">
              <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-9130836798889522"
                data-ad-slot="7421797623"
                data-ad-format="auto"
                data-full-width-responsive="true"
              ></ins>
            </div>

            <div className="mb-4 text-center">
              <Link href="/test/speed/play">
                <Button className="bg-luxury-gold hover:bg-luxury-gold/90 text-black font-semibold">
                  <RotateCcw className="mr-2 w-4 h-4" />
                  다시하기
                </Button>
              </Link>
            </div>

            <Fshare
              title="반응속도 테스트 - 마인드팡"
              imageUrl="https://f5game.s3.ap-northeast-2.amazonaws.com/reactspeed.webp"
              url="https://mindpang.com/test/speed"
            />
          </div>
        )}
      </main>

      <style jsx>{`
        .speed-layout {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 2rem 0;
        }

        .speed-font-size {
          font-size: 1.5rem;
        }

        @media (max-width: 480px) {
          .speed-font-size {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </Layout>
  );
}
