"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Fshare from "@/components/Fshare";
import { Brain, Heart, Sparkles, Loader2 } from "lucide-react";

interface ResultItem {
  title: string;
  description: string;
  features: {
    title: string;
    items: string[];
  };
  strengths: {
    title: string;
    items: string[];
  };
  improvements: {
    title: string;
    items: string[];
  };
  recommendations: {
    title: string;
    items: string[];
  };
}

export default function TFResultPage() {
  const [resultItem, setResultItem] = useState<ResultItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const result = JSON.parse(
      localStorage.getItem("mindpang-tf-score") || '{"T":0,"F":0}'
    );
    const { T: Tscore, F: Fscore } = result;

    if (Tscore >= Fscore) {
      setResultItem({
        title: "이성적 사고",
        description:
          "축하합니다! 당신은 이성적 사고를 중심으로 문제를 해결하는 사람입니다. 🧠",
        features: {
          title: "특징",
          items: [
            "<strong>논리적이고 분석적인 사고</strong> 문제를 해결할 때 감정보다 논리와 데이터를 중시합니다.",
            "<strong>객관적인 결정을 내리는 능력</strong> 감정에 치우치지 않고 상황을 객관적으로 평가하여 최선의 결정을 내립니다.",
            "<strong>효율적인 문제 해결</strong> 복잡한 문제를 체계적으로 분석하고 해결책을 찾는 능력이 뛰어납니다.",
          ],
        },
        strengths: {
          title: "강점",
          items: [
            "<strong>객관성과 논리</strong> 감정에 휘둘리지 않고 상황을 명확하게 파악하여 논리적인 결정을 내릴 수 있습니다.",
            "<strong>문제 해결 능력</strong> 복잡한 문제를 체계적으로 분석하고 해결책을 찾아내는 능력이 뛰어납니다.",
            "<strong>효율성</strong> 업무와 일상 생활에서 높은 효율성을 발휘하여 시간과 자원을 효과적으로 사용합니다.",
          ],
        },
        improvements: {
          title: "개선점",
          items: [
            "<strong>감정 이해</strong> 자신의 감정이나 타인의 감정을 이해하고 표현하는 데 어려움을 겪을 수 있습니다. 감정을 표현하고 타인의 감정을 이해하려는 노력이 필요합니다.",
            "<strong>유연성</strong> 논리적인 접근 방식이 항상 정답이 아닐 수 있습니다. 상황에 따라 유연하게 대처하는 능력을 키우는 것이 중요합니다.",
          ],
        },
        recommendations: {
          title: "추천 활동",
          items: [
            "<strong>감정 일기 쓰기</strong> 자신의 감정을 이해하고 표현하는 데 도움이 됩니다.",
            "<strong>공감 연습</strong> 타인의 감정을 이해하고 공감하는 능력을 키우기 위해 적극적으로 소통해 보세요.",
            "<strong>창의적인 활동</strong> 논리적인 사고에서 벗어나 창의성을 발휘할 수 있는 취미나 활동을 찾아보세요.",
          ],
        },
      });
    } else {
      setResultItem({
        result: "F",
        title: "감정적 사고",
        description:
          "축하합니다! 당신은 감정적 사고를 중심으로 문제를 해결하는 사람입니다. ❤️",
        features: {
          title: "특징",
          items: [
            "<strong>공감과 감정 이해</strong> 다른 사람의 감정에 공감하고, 자신의 감정을 중요하게 여깁니다.",
            "<strong>대인 관계 중시</strong> 사람들과의 관계를 중요하게 생각하며, 감정을 바탕으로 소통합니다.",
            "<strong>감정 중심의 의사 결정</strong> 논리보다 감정과 인간 관계를 고려하여 결정을 내리는 경향이 있습니다.",
          ],
        },
        strengths: {
          title: "강점",
          items: [
            "<strong>공감 능력</strong> 타인의 감정을 잘 이해하고, 공감하는 능력이 뛰어납니다.",
            "<strong>대인 관계</strong> 사람들과의 관계를 중요하게 여기며, 따뜻하고 친절한 태도로 대합니다.",
            "<strong>감정 표현</strong> 자신의 감정을 솔직하게 표현하고, 타인과의 감정적 유대감을 형성합니다.",
          ],
        },
        improvements: {
          title: "개선점",
          items: [
            "<strong>객관성 향상</strong> 감정에 치우치지 않고 상황을 객관적으로 평가하는 능력을 키우는 것이 중요합니다.",
            "<strong>논리적 사고</strong> 감정만이 아니라 논리와 데이터를 바탕으로 결정을 내리는 연습이 필요합니다.",
            "<strong>감정 조절</strong> 자신의 감정을 조절하고, 상황에 맞게 표현하는 능력을 키우는 것이 중요합니다.",
          ],
        },
        recommendations: {
          title: "추천 활동",
          items: [
            "<strong>논리적 문제 해결 연습</strong> 퍼즐이나 논리 게임을 통해 논리적 사고를 연습해보세요.",
            "<strong>감정 조절 훈련</strong> 명상이나 심호흡을 통해 감정을 조절하는 방법을 익혀보세요.",
            "<strong>균형 잡힌 의사 결정</strong> 결정을 내릴 때 논리와 감정을 균형 있게 고려하는 연습을 해보세요.",
          ],
        },
      });
    }
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

  const isT = resultItem.title === "이성적 사고";

  return (
    <Layout>
      <main className="test-layout flex justify-center flex-col">
        <div className="w-full max-w-2xl mx-auto p-4 pt-4">
          <h1 className="text-center text-3xl mb-6 font-bold text-gray-100">
            TF 테스트 결과
          </h1>

          <Card className="mb-6 bg-[#1E1E1E]/90 border-white/10">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div
                  className={`p-4 rounded-full ${
                    isT
                      ? "bg-luxury-gold/20 border border-luxury-gold/30"
                      : "bg-pink-500/20 border border-pink-500/30"
                  }`}
                >
                  {isT ? (
                    <Brain className="w-12 h-12 text-luxury-gold" />
                  ) : (
                    <Heart className="w-12 h-12 text-pink-500" />
                  )}
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
                {resultItem.features.items.map((item, index) => (
                  <li
                    key={index}
                    className="leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item }}
                  />
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-6 bg-[#1E1E1E]/80 border-white/10">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-luxury-gold" />
                <CardTitle className="text-xl font-serif text-luxury-gold">
                  강점
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-300">
                {resultItem.strengths.items.map((item, index) => (
                  <li
                    key={index}
                    className="leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item }}
                  />
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-6 bg-[#1E1E1E]/80 border-white/10">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-luxury-gold" />
                <CardTitle className="text-xl font-serif text-luxury-gold">
                  개선점
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-300">
                {resultItem.improvements.items.map((item, index) => (
                  <li
                    key={index}
                    className="leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item }}
                  />
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-6 bg-[#1E1E1E]/80 border-white/10">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-luxury-gold" />
                <CardTitle className="text-xl font-serif text-luxury-gold">
                  추천 활동
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-300">
                {resultItem.recommendations.items.map((item, index) => (
                  <li
                    key={index}
                    className="leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item }}
                  />
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Fshare
          title="TF 테스트 - 마인드팡"
          imageUrl="https://mindpang-image.s3.ap-northeast-2.amazonaws.com/TF-test.webp"
          url="https://mindpang.com/test/tf"
        />
      </main>
    </Layout>
  );
}
