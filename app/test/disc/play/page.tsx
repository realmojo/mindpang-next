"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Users, Loader2, CheckCircle2, ArrowRight } from "lucide-react";

const questions = [
  { question: "문제를 해결하는 능력을 스스로 증명하는 것을 좋아한다." }, // D 0
  { question: "사람들과 어울리는 것을 즐긴다." }, // I 1
  { question: "친한 사람들과의 안정된 관계가 중요하다." }, // S 2
  { question: "일을 할 때 정확성과 완성도를 매우 중요하게 여긴다." }, // C 3

  { question: "지시를 받는 것보다 지시하는 것이 편하다." }, // D 4
  { question: "즉흥적인 제안을 자주 하는 편이다." }, // I 5
  { question: "다른 사람을 먼저 배려하려고 한다." }, // S 6
  { question: "감정보다는 논리와 사실에 근거해 판단하려 한다." }, // C 7

  { question: "직설적인 표현을 자주 사용하는 편이다." }, // D 8
  { question: "말보다 사람의 분위기를 먼저 본다." }, // I 9
  { question: "남을 돕는 일에서 만족감을 느낀다." }, // S 10
  { question: "규칙이나 기준을 벗어나는 것을 꺼리는 편이다." }, // C 11

  { question: "위험을 감수하고 도전하는 것을 두려워하지 않는다." }, // D 12
  { question: "처음 만난 사람과도 쉽게 친해지는 편이다." }, // I 13
  { question: "감정보다는 관계의 지속을 더 중요하게 생각한다." }, // S 14
  { question: "완벽주의 성향이 있다는 이야기를 들어본 적 있다." }, // C 15

  { question: "리더십을 발휘하는 자리에 있는 것을 좋아한다." }, // D 16
  { question: "새로운 아이디어를 내는 걸 즐긴다." }, // I 17
  { question: "변화보다는 익숙함을 선호한다." }, // S 18
  { question: "혼자 조용히 일하는 환경에서 집중이 잘 된다." }, // C 19

  { question: "실적과 성과가 중요하다고 생각한다." }, // D 20
  { question: "말이 많다는 이야기를 종종 듣는다." }, // I 21
  { question: "갈등이나 충돌을 피하려고 노력하는 편이다." }, // S 22
  { question: "작은 실수도 신경 쓰는 편이다." }, // C 23

  { question: "목표 달성을 위해 타인의 감정보다 결과를 중시한다." }, // D 24
  { question: "주변 사람들에게 긍정적인 에너지를 준다는 말을 자주 듣는다." }, // I 25
  { question: "감정보다는 관계의 지속을 더 중요하게 생각한다." }, // S 26
  { question: "문제를 체계적으로 분석하는 데 강점이 있다." }, // C 27

  { question: "어떤 결정을 할 때 빠르게 판단하는 편이다." }, // D 28
  { question: "내 감정을 표현하는 데 주저함이 없다." }, // I 29
  { question: "나서는 것보다는 뒤에서 지원하는 것이 편하다." }, // S 30
  { question: "의사결정을 하기 전에 정보를 철저히 조사한다." }, // C 31

  { question: "이론보다는 실천을 중시한다." }, // D 32
  { question: "단체 활동에서 분위기 메이커 역할을 자주 한다." }, // I 33
  { question: "누군가 나를 의지하는 것을 좋아한다." }, // S 34
  { question: "일의 순서를 계획하고 체크리스트를 만드는 것을 좋아한다." }, // C 35

  { question: "갈등 상황에서도 자신의 입장을 분명히 표현한다." }, // D 36
  { question: "다양한 사람과의 교류를 통해 동기를 얻는다." }, // I 37
  { question: "느긋하고 차분한 상황에서 능력을 더 잘 발휘한다." }, // S 38
  { question: "다른 사람의 말보다 근거와 데이터를 더 신뢰한다." }, // C 39
];

export default function DISCPlayPage() {
  const [percent, setPercent] = useState(0);
  const [testAnswer, setTestAnswer] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResultButton, setIsResultButton] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const getButtonStyle = (n: number) => {
    // 중앙 정렬을 위한 계산: 가장 큰 버튼(56px) 기준으로 중앙 맞추기
    const maxSize = 56;
    let size = 56;
    let marginTop = 0;

    if (n === 1 || n === 5) {
      size = 56;
      marginTop = 0; // 기준 버튼
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
    if (isProcessing || selectedValue !== null) return; // 더블클릭 방지
    setIsProcessing(true);
    setSelectedValue(value);

    // 선택된 느낌 유지 → 딜레이 후 이동
    setTimeout(() => {
      doQuestionNext(currentIndex, value);
      setSelectedValue(null); // 초기화
      setIsProcessing(false);
    }, 500); // 500ms 후 이동
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
          "mindpang-disc-answer",
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
              <Link href="/test/disc/result" className="block">
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

