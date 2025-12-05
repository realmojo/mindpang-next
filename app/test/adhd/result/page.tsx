"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Brain,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Share2,
  RotateCcw,
  Home,
  Sparkles,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import Fshare from "@/components/Fshare";
interface ResultType {
  name: string;
  text: string;
  icon: typeof Brain;
  color: string;
  bgColor: string;
  borderColor: string;
  score: number;
}

export default function ADHDResultPage() {
  const [result, setResult] = useState<ResultType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let sum = 0;
    const resultStr = localStorage.getItem("mindpang-adhd-answer");
    if (!resultStr) {
      window.location.href = "/test/adhd";
      return;
    }

    const result = JSON.parse(resultStr);
    for (let i = 0; i < result.length; i += 1) {
      sum += result[i];
    }

    let resultData: ResultType | null = null;

    if (0 <= sum && sum <= 36) {
      resultData = {
        name: "매우 양호",
        text: `
    <p style="margin-bottom:20px;">당신은 주의력과 집중력 면에서 매우 안정된 상태를 보이고 있으며, 전반적인 인지적 균형이 잘 이루어져 있는 분입니다. 일상생활에서도 큰 어려움 없이 계획을 수립하고 이를 꾸준히 실천하는 데 능숙합니다.</p>
    <p style="margin-bottom:20px;">복잡한 환경에서도 쉽게 산만해지지 않고, 상황을 논리적으로 분석하며 침착하게 행동할 수 있는 능력을 가지고 있습니다. 특히 감정 기복이 크지 않으며, 타인과의 관계에서도 부드럽고 유연한 태도를 유지하는 경향이 있습니다.</p>
    <p style="margin-bottom:20px;">현재 상태를 유지하기 위해 간단한 명상이나 스트레칭, 규칙적인 수면 습관을 유지하는 것이 도움이 됩니다. 지금처럼 마음의 평온함을 잃지 않는다면, 삶의 여러 영역에서 안정적인 성과를 이어갈 수 있을 것입니다.</p>
  `,
        icon: CheckCircle2,
        color: "text-green-400",
        bgColor: "bg-green-500/10",
        borderColor: "border-green-500/30",
        score: sum,
      };
    } else if (37 <= sum && sum <= 72) {
      resultData = {
        name: "양호 단계",
        text: `
    <p style="margin-bottom:20px;">당신은 때때로 주의력이 흐트러지거나 사소한 실수를 할 수 있지만, 이는 일상생활 속에서 누구에게나 발생할 수 있는 자연스러운 현상입니다. 스트레스가 누적되거나 과도한 업무에 시달릴 때 일시적인 집중력 저하를 경험할 수도 있습니다.</p>
    <p style="margin-bottom:20px;">중요한 것은 이러한 변화에 민감하게 반응하기보다는, 자기 자신을 이해하고 조절하려는 태도를 가지는 것입니다. 규칙적인 생활 패턴과 가벼운 운동, 그리고 일정한 루틴을 유지하는 것이 현재의 컨디션을 더욱 좋게 유지하는 데 도움이 됩니다.</p>
    <p style="margin-bottom:20px;">당신은 성인 ADHD라고 보기에는 어려운 상태이며, 전반적으로 삶을 관리할 수 있는 충분한 역량을 갖추고 있습니다. 심리적 회복탄력성을 유지하면서도 마음의 여유를 잃지 않는다면 더욱 건강한 방향으로 나아갈 수 있습니다.</p>
  `,
        icon: TrendingUp,
        color: "text-blue-400",
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/30",
        score: sum,
      };
    } else if (73 <= sum && sum <= 108) {
      resultData = {
        name: "정상 단계",
        text: `
    <p style="margin-bottom:20px;">당신은 집중력이 다소 떨어질 때가 있고, 간헐적으로 충동적인 행동을 보일 수 있습니다. 하지만 이것은 반드시 문제 행동이라고 보기는 어려우며, 환경적 요인과 일시적인 감정 상태에 따라 충분히 조절 가능한 범위입니다.</p>
    <p style="margin-bottom:20px;">이 시기에는 스스로를 돌보는 습관이 더욱 중요해지며, 과도한 자극을 피하고 일정한 루틴을 유지하는 것이 도움이 됩니다. 명상이나 걷기, 혹은 따뜻한 차를 마시며 자신을 진정시키는 시간을 가지는 것이 효과적일 수 있습니다.</p>
    <p style="margin-bottom:20px;">아직까지는 성인 ADHD라고 단정할 단계는 아니지만, 장기적인 집중력 저하나 충동성의 증가가 느껴질 경우에는 전문가의 상담을 고려해보는 것도 좋은 선택입니다. 자신을 이해하고 케어하는 방법을 익힌다면 훨씬 더 안정적인 삶을 영위할 수 있습니다.</p>
  `,
        icon: AlertTriangle,
        color: "text-yellow-400",
        bgColor: "bg-yellow-500/10",
        borderColor: "border-yellow-500/30",
        score: sum,
      };
    } else if (109 <= sum && sum <= 164) {
      resultData = {
        name: "경고 단계",
        text: `
    <p style="margin-bottom:20px;">주의력 부족, 충동성, 감정 기복 등의 증상이 일상생활에 영향을 주고 있는 것으로 보입니다. 이 단계는 성인 ADHD의 전조 증상이 본격적으로 나타나는 시점으로, 더 이상 방치해서는 안 되는 중요한 시기입니다.</p>
    <p style="margin-bottom:20px;">일상에서 집중이 어렵고, 감정적 반응이 잦으며, 불규칙한 생활 패턴이 반복되고 있다면 심리적 피로감이 누적되고 있다는 신호일 수 있습니다. 음주, 늦은 시간 수면, 자극적인 활동 등은 이러한 증상을 더 악화시킬 수 있습니다.</p>
    <p style="margin-bottom:20px;">이제는 자기 조절력을 회복하기 위한 구체적인 노력이 필요합니다. 명확한 시간표 설정, 정기적인 운동, 긍정적인 취미 활동 등을 통해 삶의 리듬을 되찾아야 합니다. 필요시 심리상담 센터나 정신건강의학과에서 도움을 받는 것도 효과적일 수 있습니다.</p>
  `,
        icon: AlertTriangle,
        color: "text-orange-400",
        bgColor: "bg-orange-500/10",
        borderColor: "border-orange-500/30",
        score: sum,
      };
    } else if (165 <= sum && sum <= 180) {
      resultData = {
        name: "성인 ADHD 매우 높음",
        text: `
    <p style="margin-bottom:20px;">현재 상태는 성인 ADHD의 특성과 매우 밀접한 관련이 있는 단계로 보이며, 일상생활 전반에서 어려움을 겪고 있을 가능성이 큽니다. 집중력 저하, 감정기복, 충동적 행동, 대인관계의 어려움 등이 자주 반복되고 있다면 주의가 필요합니다.</p>
    <p style="margin-bottom:20px;">이러한 상태가 지속되면 우울감, 자기혐오, 사회적 고립감까지 동반될 수 있으며, 이는 장기적으로 삶의 질을 크게 떨어뜨릴 수 있습니다. 특히 감정 조절이 어렵거나 일상생활에서 의욕을 잃은 상태라면 즉각적인 개입이 필요합니다.</p>
    <p style="margin-bottom:20px;">혼자 극복하려 하기보다 가까운 정신건강의학과를 찾아 정확한 진단과 상담을 받아보시길 권유드립니다. 전문적인 도움을 받는 것은 부끄러운 일이 아니며, 보다 나은 삶을 향한 출발점이 될 수 있습니다. 지금이 바로 변화의 시작점이 될 수 있는 소중한 기회입니다.</p>
  `,
        icon: Brain,
        color: "text-red-400",
        bgColor: "bg-red-500/10",
        borderColor: "border-red-500/30",
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
                  당신의 ADHD 유형은?
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
                    총점: {result.score}점 / 180점
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div
                className="text-gray-300 leading-relaxed space-y-4 prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: result.text }}
              />
            </CardContent>
          </Card>

          {/* Fshare component would go here */}
          <Fshare
            title="ADHD 자가진단 테스트 결과 - 마인드팡"
            url="https://mindpang.com/test/adhd"
            imageUrl="https://mindpang-image.s3.ap-northeast-2.amazonaws.com/adhd.png"
          />
        </div>
      </div>
    </Layout>
  );
}
