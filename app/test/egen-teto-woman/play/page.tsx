"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Heart, Loader2, CheckCircle2, ArrowRight } from "lucide-react";

const questions = [
  { question: "나는 감정보다 현실적 상황 판단이 더 중요하다고 느낀다." },
  { question: "하루 일정을 미리 계획하고 그대로 실행하는 편이다." },
  { question: "나만의 커리어나 목표를 꾸준히 추구해나가고 있다." },
  {
    question:
      "감성적인 대화보다는 사실과 논리를 중심으로 이야기하는 것이 편하다.",
  },
  { question: "주변에서 '의지가 강하다', '야무지다'는 말을 자주 듣는다." },
  { question: "내가 중심이 되어 모임이나 일을 이끄는 것이 어렵지 않다." },
  { question: "이야기할 때 감정보다는 논리와 방향성을 우선 생각한다." },
  { question: "문제가 생기면 감정적 동요보다 해결 방법부터 찾으려 한다." },
  {
    question: "연애에서도 분위기보다는 상대의 행동과 태도를 더 중요하게 본다.",
  },
  { question: "SNS에서는 일상 감성보다는 정보나 팁 위주로 올리는 편이다." },
  { question: "내 감정을 직접적으로 표현하는 것이 비교적 익숙하다." },
  { question: "겉모습보다는 실용성과 효율을 더 중시한다." },
  { question: "혼자만의 시간에서 에너지를 회복하는 편이다." },
  { question: "넓은 관계보다 진심 어린 깊은 관계를 더 선호한다." },
  { question: "화려함보다는 실용적인 취향을 가진 편이다." },
  { question: "감성 콘텐츠보다 다큐, 인터뷰 등 현실적인 것을 즐긴다." },
  { question: "감정을 표현하기보다는 속으로 정리하는 편이다." },
  { question: "타인의 기대보다 내 판단과 기준을 더 따르는 편이다." },
  { question: "의견 차이가 생기면 회피보다 조율하려는 의지가 크다." },
  { question: "작은 계획보다는 큰 그림을 먼저 그리는 스타일이다." },
];

export default function EgenTetoWomanPlayPage() {
  const [percent, setPercent] = useState(0);
  const [testAnswer, setTestAnswer] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResultButton, setIsResultButton] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const getButtonStyle = (n: number) => {
    const maxSize = 56;
    let size = 56;
    let marginTop = 0;

    if (n === 1 || n === 5) {
      size = 56;
      marginTop = 0;
    } else if (n === 2 || n === 4) {
      size = 48;
      marginTop = 2;
    } else if (n === 3) {
      size = 40;
      marginTop = 4;
    }

    return {
      width: `${size}px`,
      height: `${size}px`,
      marginTop: `${marginTop}px`,
    };
  };

  const handleButtonClick = (value: number) => {
    if (isProcessing || selectedValue !== null) return;
    setIsProcessing(true);
    setSelectedValue(value);

    setTimeout(() => {
      doQuestionNext(currentIndex, value);
      setSelectedValue(null);
      setIsProcessing(false);
    }, 500);
  };

  const doQuestionNext = (index: number, value: number) => {
    try {
      const total = questions.length;
      const p = ((index + 1) / total) * 100;
      const newAnswers = [...testAnswer];
      newAnswers[index] = value;
      setTestAnswer(newAnswers);

      if (typeof window !== "undefined") {
        localStorage.setItem(
          "mindpang-egen-teto-woman-answer",
          JSON.stringify(newAnswers)
        );
      }

      if (questions.length - 1 === index) {
        setIsLoading(true);
        setTimeout(() => {
          setIsResultButton(true);
        }, 3000);
      } else {
        setCurrentIndex(index + 1);
      }
      setPercent(Math.floor(p));
    } catch (e) {
      console.error(e);
    }
  };

  if (isLoading && !isResultButton) {
    return (
      <Layout>
        <div className="flex items-center justify-center px-4 py-8">
          <Card className="w-full max-w-2xl bg-[#1E1E1E]/90 border-white/10">
            <CardContent className="p-12 text-center space-y-6">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-luxury-gold/20 rounded-full blur-xl"></div>
                  <div className="relative p-6 rounded-full bg-luxury-gold/10 border border-luxury-gold/30">
                    <Loader2 className="w-12 h-12 text-luxury-gold animate-spin" />
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-serif font-bold text-luxury-gold mb-2">
                  결과를 분석하고 있습니다
                </h1>
                <p className="text-gray-400">잠시만 기다려주세요...</p>
              </div>
              <Progress value={100} className="h-2 bg-luxury-gold/20" />
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  if (isResultButton) {
    return (
      <Layout>
        <div className="flex items-center justify-center px-4 py-8">
          <Card className="w-full max-w-2xl bg-[#1E1E1E]/90 border-white/10">
            <CardContent className="p-12 text-center space-y-6">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-luxury-gold/20 rounded-full blur-xl"></div>
                  <div className="relative p-6 rounded-full bg-luxury-gold/10 border border-luxury-gold/30">
                    <CheckCircle2 className="w-12 h-12 text-luxury-gold" />
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-serif font-bold text-luxury-gold mb-2">
                  분석이 완료되었습니다
                </h1>
                <p className="text-gray-400">결과를 확인해보세요</p>
              </div>
              <Link href="/test/egen-teto-woman/result" className="block">
                <Button
                  size="lg"
                  className="w-full bg-luxury-gold hover:bg-luxury-gold/90 text-black font-semibold text-lg px-8 py-6 h-auto rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  결과보기
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-3xl space-y-6">
          {/* Progress Section */}
          <Card className="bg-[#1E1E1E]/80 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">진행률</span>
                <span className="text-sm font-semibold text-luxury-gold">
                  {currentIndex + 1} / {questions.length}
                </span>
              </div>
              <Progress value={percent} className="h-3 bg-luxury-gold/20" />
            </CardContent>
          </Card>

          {/* Question Card */}
          {currentIndex < questions.length && (
            <Card className="bg-[#1E1E1E]/90 border-white/10 hover:border-luxury-gold/30 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-2xl font-serif font-bold text-luxury-gold">
                    Q {currentIndex + 1}
                  </h2>
                </div>
                <p className="text-lg text-gray-200 leading-relaxed">
                  {questions[currentIndex].question}
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 아니다 / 그렇다 라벨 */}
                <div className="flex justify-between text-sm text-gray-400 px-2">
                  <span className="font-medium">전혀 아니다</span>
                  <span className="font-medium">매우 그렇다</span>
                </div>

                {/* 5점 척도 선택지 */}
                <div className="flex justify-center items-center gap-3 py-4">
                  {[1, 2, 3, 4, 5].map((n) => {
                    const isSelected = selectedValue === n;
                    const buttonSize = getButtonStyle(n);

                    return (
                      <button
                        key={`${currentIndex}-${n}`}
                        onClick={() => handleButtonClick(n)}
                        className={`
                          rounded-full border-2 transition-all duration-300
                          flex items-center justify-center
                          hover:scale-110 active:scale-95
                          ${
                            isSelected
                              ? "bg-luxury-gold border-luxury-gold text-black shadow-lg shadow-luxury-gold/50 scale-110"
                              : "bg-transparent border-luxury-gold/40 text-luxury-gold hover:border-luxury-gold hover:bg-luxury-gold/10"
                          }
                        `}
                        style={buttonSize}
                        disabled={isProcessing}
                      >
                        {isSelected && <CheckCircle2 className="w-4 h-4" />}
                      </button>
                    );
                  })}
                </div>

                {/* Helper Text */}
                <p className="text-center text-xs text-gray-500">
                  각 문항에 대해 가장 적절한 답을 선택해주세요
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
}

