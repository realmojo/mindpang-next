"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sparkles,
  Share2,
  RotateCcw,
  Home,
  Loader2,
  AlertCircle,
  TrendingUp,
  AlertTriangle,
  XCircle,
  AlertOctagon,
} from "lucide-react";
import Link from "next/link";
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

export default function BorderlinePersonalityResultPage() {
  const [result, setResult] = useState<ResultType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let sum = 0;
    const resultStr = localStorage.getItem("mindpang-borderline-answer");
    if (!resultStr) {
      window.location.href = "/test/borderline-personality";
      return;
    }

    const result = JSON.parse(resultStr);
    for (let i = 1; i < result.length; i += 1) {
      sum += result[i];
    }

    let resultData: ResultType | null = null;

    if (0 <= sum && sum <= 30) {
      resultData = {
        name: "단계 1: 낮은 경계성 특성",
        text: `1. <strong>자기평가 및 정체성</strong>: 낮은 경계성 특성에서는 자기평가와 정체성에 대한 상대적인 안정성이 나타납니다. 개인은 자신의 감정, 생각, 행동에 대한 명확한 이해를 갖고 있으며, 자신에 대한 확고한 정체성을 유지하고 있습니다. 이는 자기에 대한 불안이나 혼란이 크게 느껴지지 않아 일상적인 상황에서도 비교적 안정된 모습을 보이는 경향이 있습니다.<br/><br/>2. <strong>대인관계 안정성</strong>: 대인관계에서의 불안이나 불안정성이 상대적으로 낮습니다. 새로운 사람들과의 만남에 큰 어려움이 없으며, 대체로 다른 사람들과의 관계에서 안정적으로 대처할 수 있습니다. 이는 상대방과의 상호작용에서 큰 불안을 느끼지 않는 경향이 있어 일상적인 대인관계에서는 상대적으로 안정적으로 행동할 수 있습니다.<br/><br/>3. <strong>감정 통제</strong>: 감정의 통제가 비교적 효과적입니다. 강한 감정이나 변동이 발생해도 이를 적절하게 다룰 수 있어 일상생활에서 큰 어려움을 겪지 않습니다. 감정의 변동이 적고 일상적인 감정의 경험에서 큰 폭으로 벗어나지 않으며, 감정 상태를 안정적으로 유지할 수 있습니다.<br/><br/>4. <strong>자기인식의 일관성</strong>: 자기에 대한 인식이 상대적으로 일관성을 유지합니다. 자기에 대한 부정적인 생각이나 감정이 급격하게 바뀌지 않고, 자기에 대한 긍정적이고 안정된 인식을 유지할 수 있습니다. 이로 인해 일상생활에서의 긍정적인 경험이나 자아 강화에 대한 어려움이 크게 느껴지지 않습니다.<br/><br/>5. <strong>자기독립성</strong>: 자기에 대한 의존성이 낮습니다. 다른 사람들의 의견이나 행동에 크게 영향받지 않고, 자신만의 가치관과 주관을 유지할 수 있습니다. 이는 다른 사람들과의 대인관계에서도 자신의 주장을 존중하고 지킬 수 있는 능력을 나타냅니다. 이로 인해 상대방에 대한 의존이나 불안이 크게 느껴지지 않습니다.<br/><br/>6. <strong>스트레스 관리</strong>: 일상적인 스트레스 상황에서도 효과적으로 대처할 수 있습니다. 감정의 변동이 크게 없어 일상적인 도전이나 압박 속에서도 비교적 차분하게 대응할 수 있는 능력을 가지고 있습니다. 이로 인해 일상생활에서의 스트레스에 대한 과도한 불안이나 피로감이 크게 느껴지지 않습니다.<br/><br/>낮은 경계성 특성을 가진 개인은 자기에 대한 이해와 안정된 정체성을 바탕으로 상대적으로 안정적이고 일상적인 상황에서의 대인관계와 감정 통제, 스트레스 관리에 어려움을 겪지 않습니다. 이러한 특성은 대체로 긍정적인 측면으로 이해될 수 있으며, 개인의 정신적 안녕과 삶의 질을 높일 수 있습니다.`,
        icon: AlertCircle,
        color: "text-green-400",
        bgColor: "bg-green-500/10",
        borderColor: "border-green-500/30",
        score: sum,
      };
    } else if (31 <= sum && sum <= 60) {
      resultData = {
        name: "단계 2: 경계성 특성의 경험",
        text: `1. <strong>감정 변동성</strong>: 높은 경계성 특성의 두 번째 단계에서는 감정 변동성이 점차 나타납니다. 강한 감정이 발생할 때, 이전의 기억이 나타나는 경향이 강화됩니다. 일상 생활에서 감정의 변동이 더 빈번해지면서, 예상치 못한 상황에서의 감정적 반응이나 기억이 더 자주 나타날 수 있습니다. 이로 인해 일상 생활에서의 감정적인 안정성이 상대적으로 감소할 수 있습니다.<br/><br/>2. <strong>대인관계 불안</strong>: 새로운 대인관계에서 불안이 더 두드러지게 나타납니다. 이전보다도 새로운 사람들과의 만남에 어려움을 겪을 때가 빈번하며, 상대방에 대한 불안이 더 커집니다. 이는 대인관계에서의 안정성이 떨어져, 대인간의 상호작용에서 자주 불안을 경험할 수 있는 특징을 보입니다.<br/><br/>3. <strong>대인관계에서의 기대감 증가</strong>: 대인관계에서 상대방에 대한 기대감이 더 높아집니다. 새로운 관계에서는 상대방에 대한 기대가 지나치게 높아져, 상대방의 행동에 대한 감정적인 반응이 예상치 못하게 강해질 수 있습니다. 이로 인해 대인관계에서의 긴장이 더 높아질 수 있습니다.<br/><br/>4. <strong>대인관계의 불안정성 증가</strong>: 대인관계에서의 불안정성이 두드러지게 나타납니다. 새로운 관계의 시작이나 기존의 관계에서도 과도한 접근이나 회피 행동이 자주 나타납니다. 상대방과의 관계에서 일관성이 부족하게 되며, 이는 대인간의 상호작용에서 불안정성이 증가할 수 있습니다.<br/><br/>5. <strong>자아 강화의 어려움</strong>: 이 단계에서는 자아 강화가 어려워집니다. 자기에 대한 부정적인 경향이 더 두드러지게 나타나며, 강한 감정의 변동이 이를 가로막는 경향이 있습니다. 이로 인해 자기에 대한 긍정적인 인식을 유지하기 어려워져, 일상 생활에서 자아 강화에 대한 어려움을 겪을 수 있습니다.<br/><br/>높은 경계성 특성의 두 번째 단계에서는 대인관계에서의 불안과 감정의 변동성이 증가하면서, 상대방과의 상호작용에서 예상치 못한 감정적인 반응이나 기억이 빈번하게 나타납니다. 이로 인해 일상 생활에서의 대인간 상호작용에 어려움을 겪을 수 있습니다.`,
        icon: TrendingUp,
        color: "text-yellow-400",
        bgColor: "bg-yellow-500/10",
        borderColor: "border-yellow-500/30",
        score: sum,
      };
    } else if (61 <= sum && sum <= 90) {
      resultData = {
        name: "단계 3: 중간 수준의 경계성 특성",
        text: `1. <strong>자기평가 부정적 경향</strong>: 중간 수준의 경계성 특성에서는 자기에 대한 부정적인 경향이 두드러집니다. 때때로 자신을 비난하거나 너무 낮게 평가함으로써, 자아에 대한 부정적인 인식이 강화됩니다. 이로 인해 자신을 지속적으로 향한 비판이나 부정적인 생각이 늘어나며, 이것이 일상생활에서 긴장이나 불안을 유발할 수 있습니다.<br/><br/>2. <strong>대인관계의 변동</strong>: 중간 수준의 경계성 특성에서는 대인관계에서의 변동이 나타납니다. 때때로 과도한 접근 또는 회피 행동을 보일 수 있으며, 이는 상대방과의 상호작용에서 긴장이 더 증가할 수 있습니다. 상대방에 대한 기대가 높아지면서 긴장이 늘어날 가능성이 있습니다.<br/><br/>3. <strong>자아 강화의 어려움 증가</strong>: 자아 강화가 어려워집니다. 부정적인 자기평가와 과도한 감정 변동이 이어지면서, 자아 강화에 대한 노력이 어려워집니다. 이로 인해 긍정적인 자아 인식을 유지하기 어려워져, 일상생활에서 자아 강화에 대한 어려움을 더욱 뚜렷하게 경험할 수 있습니다.<br/><br/>4. <strong>대인관계에서의 기대감 변화</strong>: 대인관계에서 상대방에 대한 기대감이 더 높아집니다. 대인간의 상호작용에서 상대방에 대한 강한 기대가 증가하면서, 상대방의 행동이나 반응에 대한 감정적인 반응이 예상보다 크게 나타날 수 있습니다. 이는 대인관계에서의 긴장을 더 증폭시킬 수 있습니다.<br/><br/>5. <strong>스트레스 관리의 어려움</strong>: 중간 수준의 경계성 특성에서는 스트레스 관리가 어려워집니다. 강한 감정 변동과 대인관계에서의 어려움이 합쳐져서, 일상생활에서의 스트레스에 대한 대처 능력이 떨어질 수 있습니다. 이는 스트레스 상황에서 과도한 불안이나 피로를 경험할 수 있음을 의미합니다.<br/><br/>중간 수준의 경계성 특성에서는 부정적인 자기평가, 대인관계의 변동, 자아 강화의 어려움, 기대감의 증가, 그리고 스트레스 관리의 어려움이 더 두드러지게 나타납니다. 이로 인해 상대적으로 안정된 상태에서 벗어나 감정적인 어려움을 경험하게 될 수 있습니다.`,
        icon: AlertTriangle,
        color: "text-orange-400",
        bgColor: "bg-orange-500/10",
        borderColor: "border-orange-500/30",
        score: sum,
      };
    } else if (91 <= sum && sum <= 120) {
      resultData = {
        name: "단계 4: 높은 경계성 특성",
        text: `1. <strong>감정 제어의 어려움</strong>: 높은 경계성 특성의 네 번째 단계에서는 감정 제어의 어려움이 더욱 두드러집니다. 강한 감정이 나를 휘어잡을 때, 제어를 잃는 경향이 크게 나타나며, 이로 인해 감정의 폭발이 발생할 수 있습니다. 일상적인 상황에서도 예상치 못한 순간에 강한 감정이 나타나면서, 감정을 효과적으로 조절하는 것이 어려워집니다.<br/><br/>2. <strong>자기희생적 경향</strong>: 대인관계에서 자기를 희생하는 경향이 두드러집니다. 다른 사람들과의 관계에서 자기를 희생하는 것을 넘어서, 때때로 자체 파괴적인 행동을 보일 수 있습니다. 이는 상대방을 위해 자신을 희생하면서도, 그로 인해 자신의 욕구나 필요를 무시하는 행동이 빈번하게 나타날 수 있습니다.<br/><br/>3. <strong>대인관계에서의 예민성 증가</strong>: 대인관계에서 예민성이 증가합니다. 상대방과의 상호작용에서 민감하게 반응하고, 작은 일에도 과도하게 반응할 수 있습니다. 대인간의 소통에서 상대방의 말이나 행동에 예민하게 반응하면서, 대인간의 관계에서 긴장이 더욱 높아질 수 있습니다.<br/><br/>4. <strong>자기에 대한 부정적 경향 강화</strong>: 자기에 대한 부정적인 경향이 더 강화됩니다. 부정적인 자기평가가 빈번하게 나타나며, 강한 감정의 제어가 어려워져 자기에 대한 비판적인 시각이 지속적으로 나타납니다. 이로 인해 일상생활에서의 긴장이 증가하고, 감정의 변동성이 더욱 크게 나타날 수 있습니다.<br/><br/>5. <strong>자아 강화의 어려움 증가</strong>: 자아 강화가 어려워집니다. 강한 감정의 제어 어려움과 자기희생적인 경향이 합쳐져, 자아 강화에 대한 노력이 어려워지게 됩니다. 이로 인해 긍정적인 자아 인식을 유지하기 어려워져, 일상생활에서 자아 강화에 대한 어려움을 강하게 경험할 수 있습니다.<br/><br/>높은 경계성 특성의 네 번째 단계에서는 감정의 제어 어려움과 자기희생적인 경향이 강화되면서, 대인간의 상호작용에서 예민성이 증가하고 자아에 대한 부정적인 경향이 더욱 강조됩니다. 이로 인해 대인관계와 감정적인 안정성에 대한 어려움이 크게 나타날 수 있습니다.`,
        icon: XCircle,
        color: "text-red-400",
        bgColor: "bg-red-500/10",
        borderColor: "border-red-500/30",
        score: sum,
      };
    } else if (121 <= sum && sum <= 150) {
      resultData = {
        name: "단계 5: 매우 높은 경계성 특성",
        text: `1. <strong>감정 변동성의 극단적 경험</strong>: 이 단계에서는 일상 생활에서 극단적인 감정 변동을 꾸준히 경험하게 됩니다. 강한 감정의 통제가 매우 어려워져서, 감정의 폭발이나 붕괴가 상황에 구애받지 않고 자주 일어납니다. 일상적인 상황에서도 작은 이벤트에 대한 강한 감정적인 반응이 나타남으로써, 감정의 극단적인 경험이 빈번하게 나타날 수 있습니다.<br/><br/>2. <strong>대인관계에서의 자체 파괴적 행동</strong>: 대인관계에서 나 자신을 희생하는 것을 넘어서, 때때로 자체 파괴적인 행동이 나타납니다. 상대방과의 관계에서 자신을 희생하는 정도가 더 극단적으로 나타나며, 이는 자신과 상대방에게 상당한 심리적인 고통을 초래할 수 있습니다.<br/><br/>3. <strong>자아에 대한 완전한 부정적 인식</strong>: 이 단계에서는 자아에 대한 완전한 부정적 인식이 강조됩니다. 강한 감정 변동과 대인관계에서의 어려움으로 인해 자아에 대한 부정적인 인식이 더욱 강화되면서, 자신을 지속적으로 비난하고 혹독하게 평가합니다. 이로 인해 자아에 대한 손상과 고통이 더욱 심각해질 수 있습니다.<br/><br/>4. <strong>감정의 불안정성으로 인한 심리적 고통</strong>: 일상적인 감정의 불안정성으로 인해 상당한 심리적인 고통을 경험하게 됩니다. 상황에 따라 급격한 감정의 흐름이 나타나면서, 이로 인한 정신적인 스트레스와 고통이 더욱 두드러지게 나타날 것입니다. 강한 감정 변동이 일상적인 생활에 부정적인 영향을 미칠 수 있습니다.<br/><br/>5. <strong>대인간의 관계에서의 지속적인 어려움</strong>: 대인간의 관계에서는 지속적인 어려움이 나타납니다. 자신과 상대방에 대한 부정적인 감정이 지속되면서, 대인간의 소통과 상호작용에서 큰 어려움을 겪게 될 것입니다. 이로 인해 가까운 관계에서도 소통과 이해의 부족으로 인한 갈등이 발생할 수 있습니다.<br/><br/>매우 높은 경계성 특성의 다섯 번째 단계에서는 감정의 극단적인 변동성, 대인관계에서의 자체 파괴적 행동, 자아에 대한 완전한 부정적 인식, 감정의 불안정성으로 인한 심리적 고통, 그리고 대인간의 관계에서의 지속적인 어려움이 두드러지게 나타납니다. 이는 정신적인 건강과 대인관계에 지속적이고 심각한 영향을 미칠 수 있는 상태를 나타냅니다.`,
        icon: AlertOctagon,
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
                  당신의 경계성 인격장애 상태는?
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
                  <h2
                    className="text-4xl font-serif font-bold text-gray-100 mb-2"
                    dangerouslySetInnerHTML={{ __html: result.name }}
                  />
                  <p className="text-sm text-gray-400">
                    총점: {result.score}점
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

          {/* Fshare component */}
          <Fshare
            title="경계성 인격장애 테스트 - 마인드팡"
            imageUrl="https://f5game.s3.ap-northeast-2.amazonaws.com/borderline-personality.webp"
            url="https://mindpang.com/test/borderline-personality"
          />
        </div>
      </div>
    </Layout>
  );
}
