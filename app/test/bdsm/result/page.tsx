"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sparkles,
  Loader2,
  Crown,
  Heart,
  ArrowLeftRight,
  Circle,
} from "lucide-react";
import Fshare from "@/components/Fshare";

interface ResultType {
  name: string;
  text: string;
  icon: typeof Crown;
  color: string;
  bgColor: string;
  borderColor: string;
  scores: {
    dominant: number;
    submissive: number;
    switch: number;
    neutral: number;
  };
}

export default function BDSMResultPage() {
  const [result, setResult] = useState<ResultType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const resultStr = localStorage.getItem("mindpang-bdsm-answer");
    if (!resultStr) {
      window.location.href = "/test/bdsm";
      return;
    }

    const result = JSON.parse(resultStr);
    let d = 0,
      s = 0,
      sw = 0,
      n = 0;

    // 총 40문항, 인덱스를 기준으로 4유형 분류
    result.forEach((val: number, idx: number) => {
      if (idx % 4 === 0) d += val;
      else if (idx % 4 === 1) s += val;
      else if (idx % 4 === 2) sw += val;
      else if (idx % 4 === 3) n += val;
    });

    const scores = [
      { type: "Dominant (지배 성향)", value: d },
      { type: "Submissive (복종 성향)", value: s },
      { type: "Switch (유동 성향)", value: sw },
      { type: "Neutral (중립 성향)", value: n },
    ];

    scores.sort((a, b) => b.value - a.value);
    const topType = scores[0].type;

    let resultData: ResultType | null = null;

    if (topType.startsWith("Dominant")) {
      resultData = {
        name: "Dominant (지배 성향)",
        text: `
      <p style="margin-bottom:20px;">당신은 <strong>Dominant</strong> 유형입니다. 관계 속에서 주도권을 잡고 이끌어가는 것을 본능적으로 선호하며, 자신감 있는 태도와 높은 통제력을 바탕으로 파트너와의 상호작용에서 리더의 역할을 맡는 데 익숙합니다. 단순한 지배를 넘어, 책임감과 보호 본능을 기반으로 상대방을 케어하는 섬세함을 갖춘 경우가 많습니다.</p>
<p style="margin-bottom:20px;">Dominant 성향은 타인의 요구보다는 자신의 기준을 우선시하며, 감정보다 합리적 사고에 따라 행동하는 경향이 있습니다. 갈등 상황에서도 위축되지 않고 상황을 정리하려는 태도를 보이며, 다소 강한 언행이나 단호한 태도도 종종 드러납니다. 이로 인해 상대방에게 안정감과 방향성을 제공하는 힘이 있으나, 때로는 일방적인 통제로 오해받을 수 있기에 감정적 소통을 병행하는 것이 중요합니다.</p>
<p style="margin-bottom:20px;">당신은 '규칙'과 '역할 분배'를 명확히 하려는 성향이 있으며, 스스로 설정한 틀 안에서 관계를 구축할 때 안정감을 느낍니다. 하지만 파트너와의 유연한 협의와 피드백 수용 태도는 장기적인 관계의 깊이를 더욱 풍부하게 만들어줄 것입니다.</p>
<p style="margin-bottom:20px;">Dominant 유형의 사람들은 관계 내에서 자신감과 리더십을 발휘하며, 권위와 감성의 균형을 잡을 수 있을 때 더욱 건강하고 진정성 있는 BDSM 관계를 유지할 수 있습니다. 감정적으로도 독립적인 성향이 강하므로, 상대에게 안정감을 제공하면서도 상대의 감정을 존중하는 자세가 중요합니다.</p>

    `,
        icon: Crown,
        color: "text-red-400",
        bgColor: "bg-red-500/10",
        borderColor: "border-red-500/30",
        scores: { dominant: d, submissive: s, switch: sw, neutral: n },
      };
    } else if (topType.startsWith("Submissive")) {
      resultData = {
        name: "Submissive (복종 성향)",
        text: `
      <p style="margin-bottom:20px;">당신은 <strong>Submissive</strong> 성향을 지닌 유형입니다. 관계에서 주도권을 상대에게 맡기고, 따르는 역할을 편안하게 느끼는 경향이 강합니다. 복종은 단순한 '굴복'이 아니라, 스스로 선택한 신뢰의 표현이며, 깊은 애정과 헌신의 방식이기도 합니다. 당신은 상대방을 만족시키고자 하는 욕구가 크며, 감정적으로 따뜻한 관계에서 안정감을 얻습니다.</p>
<p style="margin-bottom:20px;">Submissive 성향의 사람들은 상대방의 말과 행동에 민감하게 반응하며, 상대가 원하는 바를 읽고 이에 부응하려는 태도를 보입니다. 갈등보다는 조화를, 지시보다는 지시받음을 통해 자신을 정리하려는 성향이 있으며, 이는 자신의 가치를 파트너와의 연결을 통해 확인하려는 경향으로 나타날 수 있습니다.</p>
<p style="margin-bottom:20px;">이러한 복종 성향은 자신을 온전히 드러내기보다는 상대의 감정을 먼저 읽고 수용하는 능력에서 비롯되며, 이로 인해 부드럽고 따뜻한 관계를 형성하는 데 능합니다. 그러나 지나치게 상대에게 맞추다 보면 자기 경계가 모호해지고, 감정적 소모로 이어질 수 있으므로 '나를 위한 복종'인지 꾸준히 점검하는 것이 중요합니다.</p>
<p style="margin-bottom:20px;">Submissive 유형은 연민과 공감 능력이 뛰어나며, 충성심과 배려심이 깊은 관계를 가능하게 합니다. 그러나 이러한 헌신이 '일방향 희생'이 되지 않도록, 상호 존중이 기반된 관계 유지가 핵심입니다. 상대에게 기쁨을 주는 능력도 중요하지만, 자신을 위한 감정적 돌봄도 병행되어야 합니다.</p>

    `,
        icon: Heart,
        color: "text-blue-400",
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/30",
        scores: { dominant: d, submissive: s, switch: sw, neutral: n },
      };
    } else if (topType.startsWith("Switch")) {
      resultData = {
        name: "Switch (유동 성향)",
        text: `
      <p style="margin-bottom:20px;">당신은 <strong>Switch</strong> 유형입니다. 이는 고정된 지배나 복종의 역할에 머무르지 않고, 상황과 파트너에 따라 자유롭게 포지션을 전환할 수 있는 유연한 성향을 의미합니다. 즉, 관계와 감정의 흐름 속에서 '이끄는 사람'이 되기도 하고, '따르는 사람'이 되기도 하며, 이 변화 자체에서 쾌감과 만족을 느낍니다.</p>
<p style="margin-bottom:20px;">Switch는 다양한 관계 경험을 통해 자신의 폭넓은 감정을 탐색할 수 있는 장점을 가지고 있습니다. 이들은 자신이 느끼는 감정과 상대의 반응을 민감하게 감지하고, 상황에 따라 가장 자연스러운 역할로 이동합니다. 이는 단순히 '혼합'이 아닌, 고차원적인 관계 이해와 소통의 결과물이라 볼 수 있습니다.</p>
<p style="margin-bottom:20px;">이 성향은 특정한 틀이나 규칙에 얽매이지 않으며, 직관적으로 자신이 편안한 방식으로 연결을 시도합니다. 파트너와의 신뢰와 감정 교류를 기반으로, 때로는 리드하고 때로는 따라가는 관계 속에서 자아를 발견합니다. 이로 인해 다양한 관계 스타일에 적응력이 높고, 파트너와의 상호작용에서 만족도가 큽니다.</p>
<p style="margin-bottom:20px;">그러나 유동적인 성향은 때때로 정체성 혼란이나 결정을 유보하는 경향으로 이어질 수 있으므로, 자신이 어떤 순간에 어떤 감정에 반응하는지를 인식하는 자기 성찰이 중요합니다. Switch 유형은 관계의 흐름을 자연스럽게 받아들이는 균형 잡힌 감각을 지닌 사람입니다.</p>

    `,
        icon: ArrowLeftRight,
        color: "text-purple-400",
        bgColor: "bg-purple-500/10",
        borderColor: "border-purple-500/30",
        scores: { dominant: d, submissive: s, switch: sw, neutral: n },
      };
    } else if (topType.startsWith("Neutral")) {
      resultData = {
        name: "Neutral (중립 성향)",
        text: `
      <p style="margin-bottom:20px;">당신은 <strong>Neutral</strong> 성향입니다. 이는 BDSM 내의 역할 구도에 깊이 개입하기보다는, 감정적 안정과 교감 중심의 관계를 더 중요하게 여기는 유형입니다. 지배나 복종보다는 파트너와의 동등한 소통, 신뢰, 감정의 흐름 자체에 집중하며, 특정 역할을 수행하는 데 큰 의미를 두지 않을 수도 있습니다.</p>
<p style="margin-bottom:20px;">Neutral 타입은 자신의 감정을 섬세하게 관찰하고, 관계를 통해 무엇을 얻고 싶은지 명확히 인지하려는 경향이 있습니다. 관계의 본질을 '권력'이 아니라 '연결'에 둠으로써, 깊고 진정성 있는 감정 교류를 추구합니다. 이러한 성향은 자칫 BDSM 성향 테스트에서 회색지대로 여겨질 수 있지만, 사실은 매우 섬세하고 감정적으로 성숙한 형태입니다.</p>
<p style="margin-bottom:20px;">당신은 역할이 아닌 감정 중심의 관계 구성을 선호하며, 이로 인해 때때로 파트너에게 '소극적'이라는 인상을 줄 수 있으나, 이는 결코 무관심이 아닙니다. 당신에게 중요한 건 관계의 '깊이'와 '서로에 대한 존중'입니다. 빠르게 몰입하거나 한쪽에 치우치지 않는 대신, 꾸준한 신뢰 기반의 연결을 지향합니다.</p>
<p style="margin-bottom:20px;">Neutral 유형은 관계를 통해 정체성을 확장하고, 특정 성향에 속하지 않더라도 관계 안에서 자신의 역할을 자연스럽게 찾아갑니다. 이는 BDSM의 또 다른 본질인 '동의와 감정 교류'에 가장 충실한 유형이라 할 수 있습니다.</p>

    `,
        icon: Circle,
        color: "text-gray-400",
        bgColor: "bg-gray-500/10",
        borderColor: "border-gray-500/30",
        scores: { dominant: d, submissive: s, switch: sw, neutral: n },
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
                  당신의 BDSM 성향은?
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
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div
                className="text-gray-300 leading-relaxed space-y-4 prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: result.text }}
              />

              {/* Score Breakdown */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <h3 className="text-lg font-semibold text-luxury-gold mb-4">
                  세부 점수
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-white/5">
                    <div className="text-sm text-gray-400 mb-1">지배 성향</div>
                    <div className="text-xl font-bold text-red-400">
                      {result.scores.dominant}점
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5">
                    <div className="text-sm text-gray-400 mb-1">복종 성향</div>
                    <div className="text-xl font-bold text-blue-400">
                      {result.scores.submissive}점
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5">
                    <div className="text-sm text-gray-400 mb-1">유동 성향</div>
                    <div className="text-xl font-bold text-purple-400">
                      {result.scores.switch}점
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5">
                    <div className="text-sm text-gray-400 mb-1">중립 성향</div>
                    <div className="text-xl font-bold text-gray-400">
                      {result.scores.neutral}점
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fshare component */}
          <Fshare
            title="BDSM 성향 테스트 결과 - 마인드팡"
            imageUrl="https://mindpang-image.s3.ap-northeast-2.amazonaws.com/bdsm.png"
            url="https://mindpang.com/test/bdsm"
          />
        </div>
      </div>
    </Layout>
  );
}
