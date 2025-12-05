"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sparkles,
  Loader2,
  AlertCircle,
  TrendingUp,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import Fshare from "@/components/Fshare";

interface ResultType {
  name: string;
  text: string;
  icon: typeof AlertCircle;
  color: string;
  bgColor: string;
  borderColor: string;
  score: number;
}

export default function DepressionResultPage() {
  const [result, setResult] = useState<ResultType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let sum = 0;
    const resultStr = localStorage.getItem("mindpang-depression-answer");
    if (!resultStr) {
      window.location.href = "/test/depression";
      return;
    }

    const result = JSON.parse(resultStr);
    for (let i = 1; i < result.length; i += 1) {
      sum += result[i];
    }

    let resultData: ResultType | null = null;

    if (0 <= sum && sum <= 21) {
      resultData = {
        name: "매우 양호",
        text: "1단계는 가벼운 우울감으로, 이것이 가끔씩 나타나지만 일상 생활에 큰 영향을 주지 않습니다. 평소와 다르게 우울함을 느낄 수 있지만, 이는 일상적인 변동으로 여겨집니다. 즐겨하는 일들에 대한 흥미가 줄어들 수 있지만, 여전히 그런 감정이 일상생활을 크게 방해하지는 않습니다.",
        icon: AlertCircle,
        color: "text-green-400",
        bgColor: "bg-green-500/10",
        borderColor: "border-green-500/30",
        score: sum,
      };
    } else if (22 <= sum && sum <= 42) {
      resultData = {
        name: "양호 단계",
        text: "2단계에서는 우울한 감정이 더 자주 드러나며, 일상생활에 영향을 주기 시작합니다. 일상적인 활동에 대한 흥미가 줄어들고, 우울함을 자주 느낄 수 있어요. 하지만 이것이 일상 생활을 크게 방해하지는 않습니다. 감정이 가끔 변화하는 것으로 여겨집니다.",
        icon: TrendingUp,
        color: "text-yellow-400",
        bgColor: "bg-yellow-500/10",
        borderColor: "border-yellow-500/30",
        score: sum,
      };
    } else if (43 <= sum && sum <= 63) {
      resultData = {
        name: "정상 단계",
        text: "3단계에서는 우울한 기분이 심해져서 일상 생활에 큰 영향을 미칩니다. 에너지가 없는 느낌을 자주 경험하며, 집중력이 떨어지고 사람들과의 소통이 줄어듭니다. 이로 인해 성과와 관계에 영향을 줄 수 있습니다.",
        icon: AlertTriangle,
        color: "text-orange-400",
        bgColor: "bg-orange-500/10",
        borderColor: "border-orange-500/30",
        score: sum,
      };
    } else if (64 <= sum && sum <= 84) {
      resultData = {
        name: "경고 단계",
        text: "4단계에서는 우울증이 매우 심해져 일상 생활이 거의 불가능할 정도로 영향을 받을 수 있습니다. 심한 스트레스, 무기력함, 더 심각한 정신적 고통을 경험할 수 있고, 일상 생활이 크게 어려워집니다. 사회적 관계나 직장에서의 업무에 큰 어려움을 겪을 수 있어요.",
        icon: XCircle,
        color: "text-red-400",
        bgColor: "bg-red-500/10",
        borderColor: "border-red-500/30",
        score: sum,
      };
    } else if (85 <= sum && sum <= 105) {
      resultData = {
        name: "위험 단계",
        text: "5단계에서는 심각한 우울감이 계속되어 생활에 심각한 위험을 초래할 수 있는 수준입니다. 자살 생각이나 행동이 나타날 수 있으며, 일상 생활을 유지하는 것이 거의 불가능할 정도로 심각한 우울증의 증상이 나타날 수 있습니다. 전문가의 지원이 매우 필요한 단계입니다.",
        icon: XCircle,
        color: "text-red-600",
        bgColor: "bg-red-600/10",
        borderColor: "border-red-600/30",
        score: sum,
      };
    }

    setResult(resultData);
    setIsLoading(false);
  }, []);

  if (isLoading || !result) {
    return (
      <Layout>
        <div className="flex items-center justify-center px-4 py-8">
          <div className="text-center">
            <Loader2 className="w-8 h-8 text-luxury-gold animate-spin mx-auto mb-4" />
            <p className="text-gray-400">결과를 불러오는 중...</p>
          </div>
        </div>
      </Layout>
    );
  }

  const Icon = result.icon;

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
                  당신의 우울증 상태는?
                </CardTitle>
              </div>
            </CardHeader>
          </Card>

          {/* Adsense component would go here */}
          <div className="my-4">{/* Adsense placeholder */}</div>

          {/* Result Card */}
          <Card
            className={`bg-[#1E1E1E]/90 ${result.borderColor} border-2 hover:shadow-lg transition-all duration-300`}
          >
            <CardHeader>
              <div className="flex items-center justify-center gap-4 mb-4">
                <div
                  className={`p-4 rounded-full ${result.bgColor} border-2 ${result.borderColor}`}
                >
                  <Icon className={`w-8 h-8 ${result.color}`} />
                </div>
                <div className="text-center">
                  <h2 className="text-4xl font-serif font-bold text-gray-100 mb-2">
                    {result.name}
                  </h2>
                  <p className="text-sm text-gray-400">
                    총점: {result.score}점
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">{result.text}</p>
            </CardContent>
          </Card>

          {/* Fshare component */}
          <Fshare
            title="우울증 자가진단 테스트 - 마인드팡"
            imageUrl="https://f5game.s3.ap-northeast-2.amazonaws.com/depression.webp"
            url="https://mindpang.com/test/depression"
          />
        </div>
      </div>
    </Layout>
  );
}
