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

export default function EgenTetoWomanResultPage() {
  const [result, setResult] = useState<ResultType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const resultStr = localStorage.getItem("mindpang-egen-teto-woman-answer");
    if (!resultStr) {
      window.location.href = "/test/egen-teto-woman";
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
        name: "에겐녀",
        text: `
    <p style="margin-bottom:20px;">감정의 흐름을 섬세하게 인식하고, 주변 사람들의 말과 표정 하나에도 진심으로 반응하는 당신은 전형적인 에겐녀입니다.</p>
    <p style="margin-bottom:20px;">정적인 공간과 감성적인 콘텐츠를 통해 내면을 정리하는 것을 즐기며, 일기 쓰기나 음악 감상, 아늑한 공간 꾸미기처럼 감정이 깃든 활동에서 큰 위로를 받습니다.</p>
    <p style="margin-bottom:20px;">직관과 감성의 힘이 강해서 타인의 기분을 눈치채는 데 능하고, 말보다 눈빛이나 분위기에서 의미를 파악합니다.</p>
    <p style="margin-bottom:20px;">연애에서는 조심스럽지만 진심을 담은 관계를 추구하며, 감정적 교감이 깊은 사람에게 가장 편안함을 느낍니다.</p>
    <p style="margin-bottom:20px;">사회적으로는 다소 내향적으로 보일 수 있으나, 따뜻함과 이해심으로 사람들에게 깊은 인상을 남기는 스타일입니다.</p>
    <p style="margin-bottom:20px;">다소 수동적으로 보일 수도 있지만, 감정의 결을 누구보다 정교하게 다룰 줄 아는 당신은, 감성적인 지혜와 관계의 미학을 아는 사람입니다.</p>
  `,
        icon: Heart,
        color: "text-pink-400",
        bgColor: "bg-pink-500/10",
        borderColor: "border-pink-500/30",
      };
    } else if (score <= 40) {
      resultData = {
        name: "에겐녀 성향 강함",
        text: `
    <p style="margin-bottom:20px;">감성적인 세계에 깊이 연결되어 있는 당신은 타인의 감정에 민감하게 반응하며, 주변 사람들을 편안하게 만들어주는 부드러운 에너지를 지녔습니다.</p>
    <p style="margin-bottom:20px;">당신은 혼자만의 감정을 소중히 여기며, 조용한 공간에서 감정의 흐름을 정리하고 의미를 찾는 데 익숙합니다.</p>
    <p style="margin-bottom:20px;">SNS에서도 감성적인 글귀나 따뜻한 기록을 즐겨 올리며, 타인의 감정에도 깊이 공감하는 능력이 탁월합니다.</p>
    <p style="margin-bottom:20px;">연애에서는 상대의 말보다 행동의 의도나 뉘앙스를 읽으며, 관계에서 감정적 교감을 가장 중요하게 여깁니다.</p>
    <p style="margin-bottom:20px;">주변에서는 당신을 '섬세하다', '배려심이 깊다'는 말로 표현하며, 그 존재만으로도 위로가 되는 스타일입니다.</p>
    <p style="margin-bottom:20px;">때때로 현실적인 선택을 미루는 경우도 있지만, 감성 중심의 판단은 오히려 인간적인 결정을 내리게 합니다.</p>
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
    <p style="margin-bottom:20px;">감성과 이성, 감정과 판단 사이에서 균형을 잘 유지하는 중립형 유형의 당신은 상황에 따라 유연하게 태도를 조절할 줄 아는 능력자입니다.</p>
    <p style="margin-bottom:20px;">감정이 중요한 순간에는 섬세하게 공감하며, 현실적 결단이 필요한 순간에는 침착하게 대응할 수 있는 이중적인 강점을 가지고 있습니다.</p>
    <p style="margin-bottom:20px;">타인과의 관계에서도 감정적인 연결을 중시하면서도 자기 생각과 주장을 분명히 하는 성숙한 커뮤니케이터입니다.</p>
    <p style="margin-bottom:20px;">연애에서는 상대의 스타일에 따라 자연스럽게 자신을 조정하며, 때론 주도적이기도 하고 때론 감성적으로 다가갑니다.</p>
    <p style="margin-bottom:20px;">조화를 중시하는 당신의 성향은 팀워크에서도 긍정적인 영향을 끼치며, 다툼보다는 소통과 이해를 택하는 조율형 리더에 가깝습니다.</p>
    <p style="margin-bottom:20px;">감성과 이성, 감정과 실용 사이에서 중심을 잡을 줄 아는 당신은 진정한 밸런서입니다.</p>
  `,
        icon: ArrowLeftRight,
        color: "text-yellow-400",
        bgColor: "bg-yellow-500/10",
        borderColor: "border-yellow-500/30",
      };
    } else if (score <= 80) {
      resultData = {
        name: "테토녀 성향 강함",
        text: `
    <p style="margin-bottom:20px;">실용적이고 목표 지향적인 사고를 가진 당신은 현실을 정확히 바라보며, 필요하다면 감정을 제쳐두고 결정을 내릴 줄 아는 타입입니다.</p>
    <p style="margin-bottom:20px;">계획을 세우고 그것을 실현하는 과정에서 동기를 얻으며, 일이나 인간관계 모두에서 효율성과 논리를 중요하게 여깁니다.</p>
    <p style="margin-bottom:20px;">연애에서도 상대의 말보다는 행동을 중요하게 생각하며, 관계의 안정성과 발전 가능성에 무게를 두는 경향이 있습니다.</p>
    <p style="margin-bottom:20px;">당신은 책임감 있고 추진력 있는 여성으로, 주변에서는 '믿음직한 사람', '일 잘하는 사람'이라는 평가를 받습니다.</p>
    <p style="margin-bottom:20px;">감정적인 표현에는 다소 서툴 수 있지만, 행동으로 진심을 보여주는 스타일이며, 특히 위기 상황에서 진가를 발휘합니다.</p>
    <p style="margin-bottom:20px;">현실과 감성 사이에서 당신은 언제나 선택과 실행에 능하며, 테토녀의 전형적인 강점을 안정적으로 드러냅니다.</p>
  `,
        icon: Zap,
        color: "text-blue-400",
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/30",
      };
    } else {
      resultData = {
        name: "테토녀",
        text: `
    <p style="margin-bottom:20px;">테스토스테론적 에너지가 강하게 작용하는 전형적인 테토녀인 당신은 냉철한 판단력과 강한 실행력을 겸비한 현실 중심의 인물입니다.</p>
    <p style="margin-bottom:20px;">계획을 세우고 그것을 빠르게 실행에 옮기며, 실패나 감정적 동요에 휘둘리기보다는 문제 해결에 집중하는 태도를 갖고 있습니다.</p>
    <p style="margin-bottom:20px;">연애에서도 주도적인 성향을 가지며, 감성적 접근보다는 진심과 신뢰를 행동으로 확인받기를 선호합니다.</p>
    <p style="margin-bottom:20px;">직장, 학업, 사회적 활동에서도 조직을 이끄는 능력을 갖추었고, 위기 상황에서도 당황하지 않고 논리적으로 판단할 수 있는 인물입니다.</p>
    <p style="margin-bottom:20px;">다소 차갑거나 무뚝뚝하게 비춰질 수 있지만, 주변 사람들은 당신의 추진력과 냉철함에 신뢰를 느낍니다.</p>
    <p style="margin-bottom:20px;">감성의 영역에서는 거리를 둘 수 있으나, 필요한 순간에는 정확하고 실용적인 조언을 아끼지 않으며, 확고한 자기 길을 걷는 여성입니다.</p>
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
            title="에겐녀 테토녀 테스트 결과 - 마인드팡"
            imageUrl="https://mindpang-image.s3.ap-northeast-2.amazonaws.com/egen-teto-woman.png"
            url="https://mindpang.com/test/egen-teto-woman"
          />
        </div>
      </div>
    </Layout>
  );
}
