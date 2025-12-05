"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Fshare from "@/components/Fshare";
import {
  Sparkles,
  TrendingUp,
  AlertCircle,
  Heart,
  Loader2,
} from "lucide-react";

interface ResultItem {
  title: string;
  characteristics: string[];
  description: string;
  improvement: string[];
  relationship_impact: string;
}

const resultItems: ResultItem[] = [
  {
    title: "초긍정적 마인드",
    characteristics: [
      "항상 긍정적인 측면을 찾으려고 노력함",
      "어려운 상황에서도 낙관적인 태도를 유지함",
      "높은 자기 만족도와 행복감을 느낌",
    ],
    description:
      "당신은 어떤 상황에서도 긍정적인 측면을 찾아내며, 모든 일이 결국 당신에게 좋은 결과로 돌아올 것이라는 확고한 믿음을 가지고 있습니다.<br/><br/>이러한 사고 방식은 당신을 매우 행복하고 만족스럽게 만듭니다. 초긍정적 마인드를 가진 사람들은 보통 낙관적이고 활기차며, 모든 상황에서 희망을 잃지 않는 경향이 있습니다.<br/><br/>이들은 어려운 상황에서도 긍정적인 면을 찾으려고 노력하며, 문제를 해결할 때 창의적인 접근 방식을 사용합니다. 그 결과, 삶의 질이 높아지고, 주변 사람들에게도 긍정적인 영향을 미칩니다.",
    improvement: [
      "긍정적인 경험을 지속적으로 쌓기",
      "부정적인 생각이 들 때마다 긍정적인 면을 찾으려 노력하기",
      "감사하는 마음을 유지하기",
    ],
    relationship_impact:
      "초긍정적 마인드를 유지하는 사람들은 자신감이 넘치며, 스트레스를 받는 상황에서도 침착함을 유지합니다.<br/><br/>이들은 실패를 두려워하지 않고, 실패를 학습의 기회로 삼습니다. 또한, 초긍정적 마인드는 개인의 정신 건강에 큰 도움이 되며, 우울증이나 불안 같은 정신 건강 문제를 예방하는 데 중요한 역할을 합니다.<br/><br/>이들은 주변 사람들과의 관계에서도 매우 긍정적인 영향을 미칩니다. 항상 긍정적인 태도를 유지하기 때문에 다른 사람들도 그들을 믿고 의지하게 됩니다. 또한, 초긍정적 마인드를 가진 사람들은 다른 사람들의 긍정적인 면을 강조하며, 주변 사람들의 자신감을 높여줍니다.",
  },
  {
    title: "낙관적인 사고",
    characteristics: [
      "대부분의 상황에서 긍정적으로 생각함",
      "어려운 상황에서도 희망을 잃지 않음",
      "긍정적인 태도로 주변 사람들에게 좋은 영향을 미침",
    ],
    description:
      "당신은 대부분의 상황에서 긍정적으로 생각하고, 어려운 상황에서도 희망을 잃지 않습니다.<br/><br/>당신의 낙관적인 사고는 주변 사람들에게도 좋은 영향을 미칩니다. 낙관적인 사고를 가진 사람들은 보통 긍정적이고 희망적인 태도를 유지합니다. 이들은 어려운 상황에서도 긍정적인 면을 찾으려고 노력하며, 문제를 해결할 때 창의적인 접근 방식을 사용합니다.<br/><br/>그 결과, 삶의 질이 높아지고, 주변 사람들에게도 긍정적인 영향을 미칩니다.",
    improvement: [
      "긍정적인 경험을 많이 쌓기",
      "부정적인 생각이 들 때마다 긍정적인 면을 찾으려 노력하기",
      "감사하는 마음을 유지하기",
    ],
    relationship_impact:
      "낙관적인 사고를 유지하는 사람들은 자신감이 넘치며, 스트레스를 받는 상황에서도 침착함을 유지합니다.<br/><br/>이들은 실패를 두려워하지 않고, 실패를 학습의 기회로 삼습니다. 또한, 낙관적인 사고는 개인의 정신 건강에 큰 도움이 되며, 우울증이나 불안 같은 정신 건강 문제를 예방하는 데 중요한 역할을 합니다. 이들은 주변 사람들과의 관계에서도 매우 긍정적인 영향을 미칩니다.<br/><br/>항상 긍정적인 태도를 유지하기 때문에 다른 사람들도 그들을 믿고 의지하게 됩니다. 또한, 낙관적인 사고를 가진 사람들은 다른 사람들의 긍정적인 면을 강조하며, 주변 사람들의 자신감을 높여줍니다.",
  },
  {
    title: "균형 잡힌 사고",
    characteristics: [
      "긍정적이면서도 현실적인 사고를 유지함",
      "때로는 부정적인 생각도 함",
      "긍정적인 방향으로 전환하려는 노력이 돋보임",
    ],
    description:
      "당신은 긍정적이면서도 현실적인 사고를 유지합니다. 때로는 부정적인 생각도 하겠지만, 결국 긍정적인 방향으로 전환하려는 노력이 돋보입니다.<br/><br/>균형 잡힌 사고를 가진 사람들은 현실적인 접근 방식을 가지고 있으며, 상황에 맞는 적절한 반응을 보입니다. 이들은 긍정적인 면을 찾으려고 노력하지만, 동시에 현실을 직시하는 태도를 유지합니다.<br/><br/>그 결과, 현실적인 문제를 효과적으로 해결할 수 있으며, 삶의 질이 높아집니다.",
    improvement: [
      "긍정적인 경험을 더 많이 쌓기",
      "부정적인 생각이 들 때마다 긍정적인 면을 찾으려 노력하기",
      "감사하는 마음을 유지하기",
    ],
    relationship_impact:
      "균형 잡힌 사고를 유지하는 사람들은 자신감이 있으며, 스트레스를 받는 상황에서도 침착함을 유지합니다.<br/><br/>이들은 실패를 두려워하지 않고, 실패를 학습의 기회로 삼습니다. 또한, 균형 잡힌 사고는 개인의 정신 건강에 큰 도움이 되며, 우울증이나 불안 같은 정신 건강 문제를 예방하는 데 중요한 역할을 합니다.<br/><br/>이들은 주변 사람들과의 관계에서도 긍정적인 영향을 미칩니다. 긍정적인 태도를 유지하면서도 현실적인 조언을 제공하기 때문에 다른 사람들도 그들을 믿고 의지하게 됩니다.<br/><br/>또한, 균형 잡힌 사고를 가진 사람들은 다른 사람들의 긍정적인 면을 강조하며, 주변 사람들의 자신감을 높여줍니다.",
  },
  {
    title: "조금 더 긍정적인 사고 필요",
    characteristics: [
      "가끔 부정적인 생각에 빠짐",
      "긍정적인 사고를 키워나갈 필요가 있음",
      "더 많은 긍정적인 경험과 연습이 필요함",
    ],
    description:
      "당신은 가끔 부정적인 생각에 빠지기도 하지만, 긍정적인 사고를 키워나갈 필요가 있습니다.<br/><br/>더 많은 긍정적인 경험과 연습을 통해 원영적 사고를 발달시킬 수 있습니다. 조금 더 긍정적인 사고가 필요한 사람들은 보통 부정적인 생각에 빠지기 쉽습니다. 이들은 어려운 상황에서 긍정적인 면을 찾기보다는 부정적인 면에 집중하는 경향이 있습니다.<br/><br/>그 결과, 삶의 질이 낮아지고, 스트레스와 불안이 증가할 수 있습니다.",
    improvement: [
      "긍정적인 경험을 많이 쌓기",
      "부정적인 생각이 들 때마다 긍정적인 면을 찾으려 노력하기",
      "감사하는 마음을 유지하기",
    ],
    relationship_impact:
      "조금 더 긍정적인 사고를 유지하는 사람들은 자신감이 부족할 수 있으며, 스트레스를 받는 상황에서도 침착함을 유지하기 어렵습니다.<br/><br/>이들은 실패를 두려워하고, 실패를 학습의 기회로 삼기보다는 좌절하는 경향이 있습니다. 또한, 조금 더 긍정적인 사고는 개인의 정신 건강에 큰 도움이 되며, 우울증이나 불안 같은 정신 건강 문제를 예방하는 데 중요한 역할을 합니다.<br/><br/>이들은 주변 사람들과의 관계에서도 부정적인 영향을 미칠 수 있습니다. 부정적인 태도를 유지하기 때문에 다른 사람들도 그들을 믿고 의지하기 어려울 수 있습니다.",
  },
  {
    title: "부정적인 사고",
    characteristics: [
      "대부분의 상황에서 부정적인 면을 먼저 보게 됨",
      "긍정적인 사고 방식을 연습할 필요가 있음",
      "작은 것에서부터 긍정적인 변화를 시도해야 함",
    ],
    description:
      "당신은 대부분의 상황에서 부정적인 면을 먼저 보게 되는 경향이 있습니다.<br/><br/>긍정적인 사고 방식을 연습하고, 작은 것에서부터 긍정적인 변화를 시도해 보세요. 부정적인 사고를 가진 사람들은 보통 부정적인 생각에 빠지기 쉽습니다.<br/><br/>이들은 어려운 상황에서 긍정적인 면을 찾기보다는 부정적인 면에 집중하는 경향이 있습니다. 그 결과, 삶의 질이 낮아지고, 스트레스와 불안이 증가할 수 있습니다.",
    improvement: [
      "긍정적인 경험을 많이 쌓기",
      "부정적인 생각이 들 때마다 긍정적인 면을 찾으려 노력하기",
      "감사하는 마음을 유지하기",
    ],
    relationship_impact:
      "부정적인 사고를 유지하는 사람들은 자신감이 부족할 수 있으며, 스트레스를 받는 상황에서도 침착함을 유지하기 어렵습니다.<br/><br/>이들은 실패를 두려워하고, 실패를 학습의 기회로 삼기보다는 좌절하는 경향이 있습니다. 또한, 부정적인 사고는 개인의 정신 건강에 큰 도움이 되며, 우울증이나 불안 같은 정신 건강 문제를 예방하는 데 중요한 역할을 합니다.<br/><br/>이들은 주변 사람들과의 관계에서도 부정적인 영향을 미칠 수 있습니다. 부정적인 태도를 유지하기 때문에 다른 사람들도 그들을 믿고 의지하기 어려울 수 있습니다.",
  },
];

export default function WonyoungThinkResultPage() {
  const [resultItem, setResultItem] = useState<ResultItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const result = JSON.parse(
      localStorage.getItem("mindpang-wonyoung-think-score") || "[]"
    );
    let sum = 0;
    for (let i = 0; i < result.length; i += 1) {
      sum += result[i] || 0;
    }

    let selectedResult: ResultItem;
    if (0 <= sum && sum <= 29) {
      selectedResult = resultItems[4];
    } else if (30 <= sum && sum <= 49) {
      selectedResult = resultItems[3];
    } else if (50 <= sum && sum <= 69) {
      selectedResult = resultItems[2];
    } else if (70 <= sum && sum <= 89) {
      selectedResult = resultItems[1];
    } else if (90 <= sum && sum <= 120) {
      selectedResult = resultItems[0];
    } else {
      selectedResult = resultItems[2];
    }

    setResultItem(selectedResult);
    setIsLoading(false);
  }, []);

  if (isLoading || !resultItem) {
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

  const getIcon = () => {
    if (resultItem.title === "초긍정적 마인드") return Sparkles;
    if (resultItem.title === "낙관적인 사고") return TrendingUp;
    if (resultItem.title === "균형 잡힌 사고") return Heart;
    if (resultItem.title === "조금 더 긍정적인 사고 필요") return AlertCircle;
    return AlertCircle;
  };

  const Icon = getIcon();

  return (
    <Layout>
      <main className="test-layout flex justify-center flex-col">
        <div className="w-full max-w-2xl mx-auto p-4 pt-4">
          <h1 className="text-center text-3xl mb-6 font-bold text-gray-100">
            원영적 사고 테스트 결과
          </h1>

          <Card className="mb-6 bg-[#1E1E1E]/90 border-white/10">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-luxury-gold/20 border border-luxury-gold/30 rounded-full">
                  <Icon className="w-12 h-12 text-luxury-gold" />
                </div>
              </div>
              <CardTitle className="text-3xl font-serif text-luxury-gold">
                {resultItem.title}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card className="mb-6 bg-[#1E1E1E]/80 border-white/10">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-luxury-gold" />
                <CardTitle className="text-xl font-serif text-luxury-gold">
                  특징
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-300">
                {resultItem.characteristics.map((item, index) => (
                  <li key={index} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-6 bg-[#1E1E1E]/80 border-white/10">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-luxury-gold" />
                <CardTitle className="text-xl font-serif text-luxury-gold">
                  설명
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p
                className="text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: resultItem.description }}
              />
            </CardContent>
          </Card>

          <Card className="mb-6 bg-[#1E1E1E]/80 border-white/10">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-luxury-gold" />
                <CardTitle className="text-xl font-serif text-luxury-gold">
                  앞으로 개선할 사항
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-300">
                {resultItem.improvement.map((item, index) => (
                  <li key={index} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-6 bg-[#1E1E1E]/80 border-white/10">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-luxury-gold" />
                <CardTitle className="text-xl font-serif text-luxury-gold">
                  대인관계 영향
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p
                className="text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: resultItem.relationship_impact,
                }}
              />
            </CardContent>
          </Card>
        </div>

        <Fshare
          title="원영적 사고 테스트 - 마인드팡"
          imageUrl="https://mindpang-image.s3.ap-northeast-2.amazonaws.com/wonyoung-think/wonyoung-think-logo.png"
          url="https://mindpang.com/test/wonyoung-think"
        />
      </main>
    </Layout>
  );
}
