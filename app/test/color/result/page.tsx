"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2, Trophy, Award } from "lucide-react";
import Fshare from "@/components/Fshare";

const resultInfo = [
  {
    status: "초보적인 미적감각",
    message: "혹시 색맹은 아니시죠?",
    percent: "100%",
  },
  {
    status: "일반수준의 미적감각",
    message: "그래도 기본은 하시네요!",
    percent: "60%",
  },
  {
    status: "훌륭한 미적감각",
    message: "훌륭한 색상을 구분할 수 있네요!",
    percent: "40%",
  },
  {
    status: "미대전공생",
    message: "미대전공생 정도의 수준이시군요!",
    percent: "20%",
  },
  {
    status: "빈센트 반고흐",
    message: "미술과 관련된 직업을 갖고 계신계 분명합니다!",
    percent: "5%",
  },
  {
    status: "신의 경지",
    message: "여기까지 색상을 구분하는 것만해도 상위 1%입니다!",
    percent: "1%",
  },
  {
    status: "사색자",
    message:
      "당신은 보통사람의 100배이상 색상을 구분할 수 있는 시력을 가지고 있습니다.",
    percent: "0.1%",
  },
];

export default function ColorCompletePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isResult, setIsResult] = useState(false);
  const [level, setLevel] = useState(0);
  const [result, setResult] = useState({
    status: "",
    message: "",
    percent: "",
  });

  const confirmResult = () => {
    setIsResult(true);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedLevel = Number(
      localStorage.getItem("mindpang-color-level") || "1"
    );
    setLevel(savedLevel);
    const r = resultInfo[Math.floor(savedLevel / 10)] || resultInfo[0];
    setResult(r);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (isLoading && !isResult) {
    return (
      <Layout>
        <div className="flex items-center justify-center px-4 py-8">
          <Card className="w-full max-w-2xl bg-[#1E1E1E]/90 border-white/10">
            <CardContent className="p-12 text-center space-y-6">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-luxury-gold/20 rounded-full blur-xl"></div>
                  <div className="relative p-6 rounded-full bg-luxury-gold/10 border border-luxury-gold/30">
                    <Loader2 className="w-12 h-12 text-luxury-gold animate-spin" />
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-serif font-bold text-luxury-gold mb-2">
                  결과를 기다리고 있습니다
                </h1>
                <p className="text-gray-400">잠시만 기다려주세요...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  if (!isResult) {
    return (
      <Layout>
        <div className="flex items-center justify-center px-4 py-8">
          <Card className="w-full max-w-2xl bg-[#1E1E1E]/90 border-white/10">
            <CardContent className="p-12 text-center space-y-6">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-luxury-gold/20 rounded-full blur-xl"></div>
                  <div className="relative p-6 rounded-full bg-luxury-gold/10 border border-luxury-gold/30">
                    <Trophy className="w-12 h-12 text-luxury-gold" />
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-serif font-bold text-luxury-gold mb-2">
                  테스트 완료!
                </h1>
                <p className="text-gray-400">결과를 확인해보세요</p>
              </div>
              <Button
                onClick={confirmResult}
                size="lg"
                className="w-full bg-luxury-gold hover:bg-luxury-gold/90 text-black font-semibold text-lg px-8 py-6 h-auto rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                결과 확인하기
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-3xl space-y-6">
          {/* Header */}
          <Card className="bg-[#1E1E1E]/90 border-white/10">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-6 h-6 text-luxury-gold" />
                <CardTitle className="text-3xl font-serif text-luxury-gold">
                  당신의 색맹 테스트 결과는?
                </CardTitle>
              </div>
            </CardHeader>
          </Card>

          {/* Adsense component would go here */}
          <div className="my-4">{/* Adsense placeholder */}</div>

          {/* Result Card */}
          <Card className="bg-[#1E1E1E]/90 border-luxury-gold/30 border-2 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex flex-col items-center gap-4 mb-4">
                <div className="p-4 rounded-full bg-luxury-gold/10 border-2 border-luxury-gold/30">
                  <Award className="w-8 h-8 text-luxury-gold" />
                </div>
                <div className="text-center">
                  <h2 className="text-4xl font-serif font-bold text-luxury-gold mb-2">
                    상위 {result.percent}
                  </h2>
                  <p className="text-xl text-gray-200 mb-2">
                    <strong>{level}단계</strong>까지 오셨네요.
                  </p>
                  <p className="text-lg text-gray-300">{result.message}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-2xl font-bold text-luxury-gold mb-4">
                  {result.status}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Fshare component */}
          <Fshare
            title="색맹 사색자 테스트 - 마인드팡"
            imageUrl="https://mindpang-image.s3.ap-northeast-2.amazonaws.com/color.png"
            url="https://mindpang.com/test/color"
          />
        </div>
      </div>
    </Layout>
  );
}
