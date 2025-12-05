"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Loader2, Target, Heart, Shield, Brain } from "lucide-react";
import Fshare from "@/components/Fshare";

interface ResultType {
  name: string;
  text: string;
  icon: typeof Target;
  color: string;
  bgColor: string;
  borderColor: string;
  scores: {
    d: number;
    i: number;
    s: number;
    c: number;
  };
}

export default function DISCResultPage() {
  const [result, setResult] = useState<ResultType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const resultStr = localStorage.getItem("mindpang-disc-answer");
    if (!resultStr) {
      window.location.href = "/test/disc";
      return;
    }

    const result = JSON.parse(resultStr);

    let d = 0,
      i = 0,
      s = 0,
      c = 0;

    result.forEach((val: number, idx: number) => {
      const typeIdx = idx % 4;
      if (typeIdx === 0) d += val;
      else if (typeIdx === 1) i += val;
      else if (typeIdx === 2) s += val;
      else if (typeIdx === 3) c += val;
    });

    const scores = [
      { type: "D 유형 (지배형)", value: d },
      { type: "I 유형 (사교형)", value: i },
      { type: "S 유형 (안정형)", value: s },
      { type: "C 유형 (신중형)", value: c },
    ];

    scores.sort((a, b) => b.value - a.value);
    const topType = scores[0].type;

    let resultData: ResultType | null = null;

    if (topType.startsWith("D")) {
      resultData = {
        name: "D 유형 (지배형)",
        text: `
      <p style="margin-bottom:20px;">D 유형은 타고난 리더형으로, 주도적이며 도전적인 성향을 가지고 있습니다. 어떤 상황에서도 중심을 잡고 이끌어나가며, 목표 달성에 대한 강한 의지를 보입니다. 빠른 판단력과 실행력을 바탕으로 결과 중심의 사고를 하며, 성과를 내기 위해 논리적으로 접근하는 능력이 뛰어납니다.</p>
      <p style="margin-bottom:20px;">직설적이고 단호한 의사 표현을 자주 사용하며, 경쟁적인 상황에서도 자신감을 잃지 않습니다. 이러한 성향은 비즈니스나 프로젝트 리더로서 강점이 되지만, 주변 사람들의 감정이나 속도에 대한 배려가 부족하다는 피드백을 받을 수 있습니다.</p>
      <p style="margin-bottom:20px;">자신이 원하는 방향으로 상황을 끌고 가는 데 능하며, 어려운 결정도 과감히 내리는 것을 두려워하지 않습니다. 도전 정신과 추진력, 효율성에 가치를 두는 D 유형은 조직의 성과를 견인하는 강력한 원동력이 될 수 있습니다.</p>
    `,
        icon: Target,
        color: "text-red-400",
        bgColor: "bg-red-500/10",
        borderColor: "border-red-500/30",
        scores: { d, i, s, c },
      };
    } else if (topType.startsWith("I")) {
      resultData = {
        name: "I 유형 (사교형)",
        text: `
      <p style="margin-bottom:20px;">I 유형은 낙천적이고 에너지 넘치는 사교형입니다. 대인 관계에서 친화력이 높고, 처음 보는 사람과도 금방 가까워질 수 있는 장점을 지니고 있습니다. 감정을 솔직하게 표현하며, 밝고 긍정적인 분위기를 주도하는 경우가 많아 조직의 분위기 메이커 역할을 자주 맡습니다.</p>
      <p style="margin-bottom:20px;">사람들과의 대화와 교류를 통해 동기를 얻으며, 타인에게 인정을 받을 때 가장 큰 만족감을 느낍니다. 창의적이고 직관적인 사고를 즐기며, 아이디어 회의나 기획 등 유연한 업무 환경에서 탁월한 성과를 보일 수 있습니다.</p>
      <p style="margin-bottom:20px;">반면, 반복적이거나 세부적인 업무에서는 집중력이 떨어질 수 있으며, 지나친 감정 표현이나 산만함으로 오해를 살 수도 있습니다. 하지만 I 유형은 탁월한 커뮤니케이터이자, 사회적 네트워크를 통해 조직에 활력을 불어넣는 귀중한 인재입니다.</p>
    `,
        icon: Heart,
        color: "text-yellow-400",
        bgColor: "bg-yellow-500/10",
        borderColor: "border-yellow-500/30",
        scores: { d, i, s, c },
      };
    } else if (topType.startsWith("S")) {
      resultData = {
        name: "S 유형 (안정형)",
        text: `
      <p style="margin-bottom:20px;">S 유형은 인내심이 강하고 따뜻한 인간관계를 중시하는 안정형입니다. 갈등보다는 조화를, 변화보다는 일관성을 선호하는 특성 덕분에 신뢰를 바탕으로 한 관계를 잘 유지합니다. 팀 내에서 서포터 역할을 잘 수행하며, 묵묵히 책임을 다하는 조용한 추진력을 가진 유형입니다.</p>
      <p style="margin-bottom:20px;">한 번 맺은 관계에 깊은 애정을 가지며, 감정보다는 관계의 지속성을 중요하게 생각합니다. 타인을 먼저 배려하며, 필요할 땐 자신의 시간을 내어 도와주는 헌신적인 태도를 보입니다. 이로 인해 사람들에게 안정감을 주고, 따뜻한 인상을 남깁니다.</p>
      <p style="margin-bottom:20px;">그러나 변화에 적응하는 데 시간이 걸릴 수 있으며, 감정을 표현하는 데 있어 조심스러운 경향이 있습니다. S 유형은 팀 내 신뢰 기반의 중심축 역할을 하며, 평화롭고 조화로운 환경을 만드는 데 큰 기여를 하는 사람입니다.</p>
    `,
        icon: Shield,
        color: "text-blue-400",
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/30",
        scores: { d, i, s, c },
      };
    } else if (topType.startsWith("C")) {
      resultData = {
        name: "C 유형 (신중형)",
        text: `
      <p style="margin-bottom:20px;">C 유형은 분석적이고 논리적인 사고를 중시하는 신중형입니다. 정확성, 완벽성, 체계적인 구조를 중시하며, 일의 완성도를 최우선으로 여깁니다. 높은 기준과 세부사항에 대한 관심 덕분에 복잡한 문제를 명확하게 정리하고 해결하는 능력이 뛰어납니다.</p>
      <p style="margin-bottom:20px;">감정보다는 사실과 데이터를 기반으로 판단하며, 객관적이고 일관된 기준으로 의사결정을 내립니다. 계획적이고 꼼꼼한 성격으로 인해 실수가 적고, 결과물에 대한 신뢰도가 높습니다. 독립적으로 일하는 환경에서 집중력이 높으며, 정해진 규칙을 따르는 것을 선호합니다.</p>
      <p style="margin-bottom:20px;">단점으로는 융통성 부족과 과도한 자기검열, 완벽주의로 인해 결정이 지연될 수 있습니다. 하지만 C 유형은 신뢰도 높은 결과를 만드는 조용한 전문가이며, 조직의 품질과 기준을 지키는 핵심적인 인재입니다.</p>
    `,
        icon: Brain,
        color: "text-purple-400",
        bgColor: "bg-purple-500/10",
        borderColor: "border-purple-500/30",
        scores: { d, i, s, c },
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
                  당신의 DISC 행동 유형은?
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
                    <div className="text-sm text-gray-400 mb-1">지배형 (D)</div>
                    <div className="text-xl font-bold text-red-400">
                      {result.scores.d}점
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5">
                    <div className="text-sm text-gray-400 mb-1">사교형 (I)</div>
                    <div className="text-xl font-bold text-yellow-400">
                      {result.scores.i}점
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5">
                    <div className="text-sm text-gray-400 mb-1">안정형 (S)</div>
                    <div className="text-xl font-bold text-blue-400">
                      {result.scores.s}점
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5">
                    <div className="text-sm text-gray-400 mb-1">신중형 (C)</div>
                    <div className="text-xl font-bold text-purple-400">
                      {result.scores.c}점
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fshare component */}
          <Fshare
            title="DISC 성격유형 테스트 결과 - 마인드팡"
            imageUrl="https://mindpang-image.s3.ap-northeast-2.amazonaws.com/disc.png"
            url="https://mindpang.com/test/disc"
          />
        </div>
      </div>
    </Layout>
  );
}
