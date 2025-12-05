"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Share2,
  RotateCcw,
  Home,
  Loader2,
  Flame,
  Zap,
  Eye,
  Wind,
  Sparkles as SparklesIcon,
  Bird,
} from "lucide-react";
import Link from "next/link";
import Fshare from "@/components/Fshare";

interface ResultType {
  name: string;
  text: string;
  icon: typeof Flame;
  color: string;
  bgColor: string;
  borderColor: string;
  score: number;
  AnimalIcon: React.ComponentType<{ className?: string }>;
}

// 커스텀 SVG 아이콘 컴포넌트들
const DragonIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M50 10L60 30L80 25L70 40L90 45L65 50L90 55L70 60L80 75L60 70L50 90L40 70L20 75L30 60L10 55L35 50L10 45L30 40L20 25L40 30L50 10Z"
      fill="currentColor"
    />
    <circle cx="35" cy="40" r="3" fill="currentColor" />
    <circle cx="65" cy="40" r="3" fill="currentColor" />
    <path
      d="M45 60Q50 65 55 60"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
  </svg>
);

const UnicornIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M50 20L55 35L70 30L60 45L75 50L55 55L50 70L45 55L25 50L40 45L30 30L45 35L50 20Z"
      fill="currentColor"
    />
    <path
      d="M50 20L60 10L55 25L70 20L65 35L80 30L70 45L50 50L30 45L20 30L35 35L30 20L45 25L40 10L50 20Z"
      fill="currentColor"
      opacity="0.6"
    />
    <circle cx="40" cy="40" r="2" fill="currentColor" />
    <circle cx="60" cy="40" r="2" fill="currentColor" />
    <path
      d="M45 55Q50 60 55 55"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
  </svg>
);

const SphinxIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect x="25" y="30" width="50" height="50" rx="5" fill="currentColor" />
    <circle cx="40" cy="50" r="4" fill="white" />
    <circle cx="60" cy="50" r="4" fill="white" />
    <path d="M45 60Q50 65 55 60" stroke="white" strokeWidth="2" fill="none" />
    <path
      d="M20 30L30 20L50 25L70 20L80 30L75 50L80 70L70 80L50 75L30 80L20 70L25 50Z"
      fill="currentColor"
      opacity="0.3"
    />
  </svg>
);

const PegasusIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <ellipse cx="50" cy="60" rx="30" ry="25" fill="currentColor" />
    <ellipse cx="50" cy="35" rx="20" ry="20" fill="currentColor" />
    <path
      d="M30 35L20 20L25 30L15 25L20 35L10 30L20 40L15 50L25 45L30 55L35 45L40 55L45 45L50 55L55 45L60 55L65 45L70 55L75 45L80 50L75 40L85 30L80 35L90 25L85 30L80 20L70 35Z"
      fill="currentColor"
      opacity="0.6"
    />
    <circle cx="45" cy="35" r="2" fill="white" />
    <circle cx="55" cy="35" r="2" fill="white" />
  </svg>
);

const FoxIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <ellipse cx="50" cy="60" rx="25" ry="30" fill="currentColor" />
    <ellipse cx="50" cy="35" rx="18" ry="20" fill="currentColor" />
    <path
      d="M35 25L30 15L40 20L50 15L60 20L70 15L65 25L75 20L70 30L80 25L75 35L85 30L80 40L70 35L60 40L50 35L40 40L30 35L20 40L25 30L15 35L20 25L30 30L25 20L35 25Z"
      fill="currentColor"
      opacity="0.4"
    />
    <circle cx="45" cy="35" r="2" fill="white" />
    <circle cx="55" cy="35" r="2" fill="white" />
    <path d="M45 45Q50 50 55 45" stroke="white" strokeWidth="2" fill="none" />
  </svg>
);

const PhoenixIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <ellipse cx="50" cy="60" rx="20" ry="25" fill="currentColor" />
    <path
      d="M50 20L40 35L25 30L35 45L20 40L30 55L15 50L25 65L10 60L20 75L30 70L40 85L50 80L60 85L70 75L80 85L90 60L75 65L85 50L70 55L80 40L65 45L75 30L60 35L50 20Z"
      fill="currentColor"
      opacity="0.8"
    />
    <path
      d="M50 25L45 35L35 30L40 40L30 35L35 45L25 40L30 50L20 45L25 55L30 50L35 60L40 55L45 65L50 60L55 65L60 55L65 60L70 50L65 45L75 50L70 40L80 45L70 35L80 40L70 30L80 35L70 25L60 30L55 20L50 25Z"
      fill="currentColor"
      opacity="0.5"
    />
    <circle cx="45" cy="50" r="2" fill="white" />
    <circle cx="55" cy="50" r="2" fill="white" />
  </svg>
);

export default function AnimalCompletePage() {
  const [result, setResult] = useState<ResultType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let sum = 0;
    const scoresStr = localStorage.getItem("mindpang-animal-score");
    if (!scoresStr) {
      window.location.href = "/test/animal";
      return;
    }

    const scores = JSON.parse(scoresStr);
    for (let score of scores) {
      if (score) {
        sum += score;
      }
    }

    let resultData: ResultType | null = null;

    if (100 <= sum && sum <= 160) {
      resultData = {
        name: "용",
        text: "당신은 목표를 달성하고 성공하기 위해 모든 것을 합니다. 부를 얻고 다른 사람들에게 존경 받는 것이 당신에겐 아주 중요합니다. 당신의 목적의식은 정상으로 향하는 길에 나타나는 어려움을 극복하도록 도와줍니다. 용이 보물을 수호하는 것처럼 당신은 친구와 가족을들에게 감사하며 그들을 소중히 여깁니다.",
        icon: Flame,
        color: "text-red-400",
        bgColor: "bg-red-500/10",
        borderColor: "border-red-500/30",
        score: sum,
        AnimalIcon: DragonIcon,
      };
    } else if (170 <= sum && sum <= 230) {
      resultData = {
        name: "유니콘",
        text: "유니콘은 뿌리 치유 능력을 가진 마법의 동물입니다. 당신의 말은 마치 유니콘 처럼 주변 사람들에게 영향을 끼칠 겁니다. 좋은 충고를 해주지만 절대 다른 사람데게 당신의 의견을 강요하지는 않습니다. 당신의 존재만으로도 불언하거나 긴장한 사람들에게는 진정 효과가 있습니다. 당신은 유니콘처럼 평화와 번영의 상징이니까요.",
        icon: SparklesIcon,
        color: "text-purple-400",
        bgColor: "bg-purple-500/10",
        borderColor: "border-purple-500/30",
        score: sum,
        AnimalIcon: UnicornIcon,
      };
    } else if (240 <= sum && sum <= 300) {
      resultData = {
        name: "스핑크스",
        text: "스핑크스는 사람들의 영혼을 들여다 볼 수 있는데 당신은 사물의 본질을 이해하는 선천적인 능력이 있습니다. 인간의 본성을 이해하고 있지만 무례하다고 여겨질까봐 혼자서 생각을 간직하는 경우가 많을텐데요. 스핑크스처럼 자랑하는 사람은 위협을 받으면 흉포한 생명체로 변해서 가까운 사람을 다치게 한 상대를 파괴할 준비가 되어 있습니다.",
        icon: Eye,
        color: "text-amber-400",
        bgColor: "bg-amber-500/10",
        borderColor: "border-amber-500/30",
        score: sum,
        AnimalIcon: SphinxIcon,
      };
    } else if (310 <= sum && sum <= 370) {
      resultData = {
        name: "페가수스",
        text: "페가수스는 아름답고 우아한 날개를 가진 멋있는 흰 말입니다. 이 신화속의 동물처럼 당신은 자유를 소중히 여깁니다. 그리고 성실하게 열심히 의무를 다합니다. 당신은 용감하고 자상한 영혼을 가졌습니다. 사람들은 당신의 그러한 충실함과 내면의 힘을 사랑하구요. 계속 자신을 믿으면 멀리 날 수 있을겁니다.",
        icon: Wind,
        color: "text-blue-400",
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/30",
        score: sum,
        AnimalIcon: PegasusIcon,
      };
    } else if (380 <= sum && sum <= 440) {
      resultData = {
        name: "구미호",
        text: "꼬리가 여러개 달린 형태로 변하는 이 여우는 사람들에게 장난을 치는 것을 좋아합니다. 물론 재미있게 놀기를 좋아하지만 또한 충실하고 충직한 친구 입니다. 말할 것도 없이 매우 현명하고 구미호는 꼬리가 많을 수록 더 현명하고 강력합니다. 당신의 재치, 예리함 그리고 유머감각은 모든 사람들에게 매력적으로 느껴집니다.",
        icon: Zap,
        color: "text-orange-400",
        bgColor: "bg-orange-500/10",
        borderColor: "border-orange-500/30",
        score: sum,
        AnimalIcon: FoxIcon,
      };
    } else if (450 <= sum && sum <= 500) {
      resultData = {
        name: "불사조",
        text: "밝은 성격을 가졌고 처참한 실패 후에도 곧바로 회복할 수 있는 훌륭한 능력이 있습니다. 하늘에서 세상을 내려다보는 것처럼 전체적인 상황에 집중합니다. 다른 사람들이 볼 수 없는 것들을 이해하도록 도와주죠. 계속 높이 날면서 삶의 어려움이 당신을 추락하게 하지 마세요.",
        icon: Bird,
        color: "text-yellow-400",
        bgColor: "bg-yellow-500/10",
        borderColor: "border-yellow-500/30",
        score: sum,
        AnimalIcon: PhoenixIcon,
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
  const AnimalIcon = result.AnimalIcon;

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
                  당신의 영적동물은?
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
              <div className="flex flex-col items-center gap-4 mb-4">
                {/* Animal Icon */}
                <div
                  className={`relative w-48 h-48 rounded-full flex items-center justify-center border-4 ${result.borderColor} ${result.bgColor}`}
                >
                  <AnimalIcon className={`w-32 h-32 ${result.color}`} />
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <div
                      className={`p-3 rounded-full ${result.bgColor} border-2 ${result.borderColor}`}
                    >
                      <Icon className={`w-6 h-6 ${result.color}`} />
                    </div>
                    <h2 className="text-4xl font-serif font-bold text-gray-100">
                      {result.name}
                    </h2>
                  </div>
                  <p className="text-sm text-gray-400">
                    총점: {result.score}점
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>{result.text}</p>
              </div>
            </CardContent>
          </Card>

          {/* Fshare component would go here */}
          <Fshare
            title="영적동물 테스트 결과 - 마인드팡"
            url="https://mindpang.com/test/animal"
            imageUrl="https://mindpang-image.s3.ap-northeast-2.amazonaws.com/animal.png"
          />
        </div>
      </div>
    </Layout>
  );
}
