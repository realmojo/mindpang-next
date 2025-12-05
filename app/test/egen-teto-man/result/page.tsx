"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Loader2, Zap, Heart, ArrowLeftRight } from "lucide-react";
import Fshare from "@/components/Fshare";

interface ResultType {
  name: string;
  text: string;
  icon: typeof Zap;
  color: string;
  bgColor: string;
  borderColor: string;
}

export default function EgenTetoManResultPage() {
  const [result, setResult] = useState<ResultType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const resultStr = localStorage.getItem("mindpang-egen-teto-man-answer");
    if (!resultStr) {
      window.location.href = "/test/egen-teto-man";
      return;
    }

    const result = JSON.parse(resultStr);
    let sum = 0;
    for (let i = 0; i < result.length; i += 1) {
      sum += result[i];
    }

    const maxScore = result.length * 5;
    const score = Math.round((sum / maxScore) * 100);

    let resultData: ResultType | null = null;

    if (score <= 20) {
      resultData = {
        name: "에겐남",
        text: `
    <p style="margin-bottom:20px;">감성적이고 공감 능력이 뛰어난 당신은 타인의 감정을 민감하게 느끼고, 그에 따라 섬세하게 반응하는 사람입니다.</p>
    <p style="margin-bottom:20px;">누군가가 말하지 않아도 그 사람의 기분을 눈치채며, 분위기를 부드럽게 만드는 능력이 있습니다.</p>
    <p style="margin-bottom:20px;">갈등 상황에서도 대립보다는 중재를 택하며, 관계의 안정감을 무엇보다 중요하게 여깁니다.</p>
    <p style="margin-bottom:20px;">문학, 음악, 예술과 같은 창의적인 분야에 대한 관심이 많고, 내면의 감정과 아름다움을 섬세하게 표현할 수 있는 재능이 있습니다.</p>
    <p style="margin-bottom:20px;">혼자만의 조용한 시간을 중요하게 여기며, 감정의 여운과 기억을 오래 간직하는 편입니다.</p>
    <p style="margin-bottom:20px;">사회적으로는 부드럽고 따뜻한 인상으로 다가가며, 누군가에게 위로가 되어주는 존재입니다. 다소 수동적일 수는 있으나, 그만큼 사람을 편안하게 해주는 힘이 있는 타입입니다.</p>
  `,
        icon: Heart,
        color: "text-pink-400",
        bgColor: "bg-pink-500/10",
        borderColor: "border-pink-500/30",
      };
    } else if (score <= 40) {
      resultData = {
        name: "에겐남 성향 강함",
        text: `
    <p style="margin-bottom:20px;">당신은 감정과 내면의 흐름에 충실한 성향을 가진 사람으로, 삶의 깊이와 감성적인 면모가 뚜렷하게 드러나는 유형입니다.</p>
    <p style="margin-bottom:20px;">기계적인 일보다는 의미 있는 관계나 감성적인 작업에서 더 높은 몰입을 경험합니다.</p>
    <p style="margin-bottom:20px;">타인의 말이나 눈빛, 행동에서 감정의 뉘앙스를 빠르게 포착하고 이에 공감할 줄 아는 능력이 탁월합니다.</p>
    <p style="margin-bottom:20px;">때로는 감정 기복이 심하다는 이야기를 들을 수 있지만, 이는 그만큼 당신이 세상을 섬세하게 받아들이고 있다는 방증입니다.</p>
    <p style="margin-bottom:20px;">SNS나 일기, 음악 플레이리스트를 통해 내면을 정리하거나 표현하는 것을 즐기며, 미적인 감각이 뛰어나 옷차림이나 공간 연출에서도 세련됨이 묻어납니다.</p>
    <p style="margin-bottom:20px;">정적인 활동을 통해 에너지를 회복하며, 타인과의 교감이 깊은 관계로 이어지는 것을 선호하는, 부드러운 내향형의 대표적인 이미지입니다.</p>
  `,
        icon: Heart,
        color: "text-pink-400",
        bgColor: "bg-pink-500/10",
        borderColor: "border-pink-500/30",
      };
    } else if (score <= 60) {
      resultData = {
        name: "중립형",
        text: `
    <p style="margin-bottom:20px;">감성과 이성의 균형이 잘 맞는 중립형 당신은 상황에 따라 감정을 섬세하게 표현하기도 하고, 때로는 냉철한 판단으로 주도적으로 행동하기도 합니다.</p>
    <p style="margin-bottom:20px;">본질적으로 유연한 사고방식을 가진 당신은 갈등 상황에서도 양쪽 입장을 이해하고 중재하려는 태도를 취합니다.</p>
    <p style="margin-bottom:20px;">특정한 방향에 치우치지 않고, 다양한 관점에서 문제를 분석하며, 상대의 기분을 배려하면서도 자신의 의견을 분명히 전달할 수 있는 능력이 있습니다.</p>
    <p style="margin-bottom:20px;">감정적인 순간에도 스스로를 통제하려는 노력이 있고, 반대로 이성적인 상황에서도 따뜻함을 잃지 않는 온도 조절 능력을 지녔습니다.</p>
    <p style="margin-bottom:20px;">이로 인해 팀워크가 필요한 환경에서 중심 역할을 맡는 경우가 많으며, 에겐남과 테토남 어느 쪽과도 무리 없이 잘 어울립니다.</p>
    <p style="margin-bottom:20px;">유연함과 조화로움이 당신의 가장 큰 강점이며, 다양한 환경에 자연스럽게 적응할 수 있는 포용력 있는 성향입니다.</p>
  `,
        icon: ArrowLeftRight,
        color: "text-yellow-400",
        bgColor: "bg-yellow-500/10",
        borderColor: "border-yellow-500/30",
      };
    } else if (score <= 80) {
      resultData = {
        name: "테토남 성향 강함",
        text: `
    <p style="margin-bottom:20px;">현실적이고 실행 중심적인 사고를 지닌 당신은 계획을 세우고 실천하는 데 능하며, 무엇보다 효율성과 논리를 중요하게 여깁니다.</p>
    <p style="margin-bottom:20px;">감정보다는 사실에 기반해 판단하는 편이며, 빠른 결단력과 행동력이 당신을 신뢰할 수 있는 사람으로 만들어줍니다.</p>
    <p style="margin-bottom:20px;">사람들 사이에서 중심을 잡고 이끌어가는 리더십을 발휘할 때가 많으며, 복잡한 감정 문제보다는 해결책을 제시하는 실용적인 접근을 선호합니다.</p>
    <p style="margin-bottom:20px;">주어진 일을 계획대로 해내는 데에서 성취감을 느끼며, 현실을 직시하고 변화에 능동적으로 대응하는 자세를 갖추고 있습니다.</p>
    <p style="margin-bottom:20px;">감성적인 표현에는 다소 서툴 수 있으나, 행동으로 진심을 전하는 데에는 거침이 없습니다.</p>
    <p style="margin-bottom:20px;">당신은 믿음직한 파트너이자 추진력 있는 사람으로, 테토남의 전형적 성향을 안정적으로 보여주는 사람입니다.</p>
  `,
        icon: Zap,
        color: "text-blue-400",
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/30",
      };
    } else {
      resultData = {
        name: "테토남",
        text: `
    <p style="margin-bottom:20px;">테스토스테론적 에너지가 강하게 나타나는 당신은 본능적으로 행동 중심적이고 외향적이며, 강한 추진력과 리더십을 갖춘 전형적인 테토남입니다.</p>
    <p style="margin-bottom:20px;">목표를 정하면 곧장 실행으로 옮기며, 실패를 두려워하기보다는 도전 자체를 즐깁니다.</p>
    <p style="margin-bottom:20px;">논리와 결과 중심의 사고방식으로 업무나 관계에서도 뚜렷한 기준을 가지고 있으며, 효율성과 생산성을 최우선으로 합니다.</p>
    <p style="margin-bottom:20px;">감정보다는 팩트를 중요하게 여기며, 감정 표현보다는 실제 행동이나 실천으로 진심을 전하는 스타일입니다.</p>
    <p style="margin-bottom:20px;">패션이나 미적인 표현에는 무심할 수 있지만, 실용성과 기능적인 요소에는 관심이 많습니다.</p>
    <p style="margin-bottom:20px;">자신에게 맞는 길을 빠르게 판단하고 밀어붙이는 집중력이 강하며, 이성관계에서도 리드하는 스타일을 선호합니다.</p>
    <p style="margin-bottom:20px;">당신의 삶은 '계획 → 실행 → 결과'의 사이클 안에서 뚜렷한 궤도를 그리며, 강한 에너지로 주변을 이끄는 성향입니다.</p>
  `,
        icon: Zap,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/30",
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
                  당신의 내면 에너지 유형은?
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
            </CardContent>
          </Card>

          {/* Fshare component */}
          <Fshare
            title="에겐남 테토남 테스트 결과 - 마인드팡"
            imageUrl="https://mindpang-image.s3.ap-northeast-2.amazonaws.com/egen-teto-man.png"
            url="https://mindpang.com/test/egen-teto-man"
          />
        </div>
      </div>
    </Layout>
  );
}
