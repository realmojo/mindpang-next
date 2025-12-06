"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Loader2, CheckCircle2, ArrowRight } from "lucide-react";

const questions = [
  // 세트 1
  { question: "관계에서 주도권을 쥐고 이끄는 것이 자연스럽다고 느낀다." }, // D
  { question: "지시를 따를 때 안정감과 편안함을 느낀다." }, // S
  { question: "상황에 따라 주도하거나 따르는 것이 모두 괜찮다." }, // SW
  { question: "지배나 복종보다는 평등한 상호작용이 더 중요하다." }, // N

  // 세트 2
  { question: "상대를 컨트롤할 수 있을 때 만족감이 생긴다." }, // D
  { question: "상대방의 요구를 먼저 들어주는 편이다." }, // S
  { question: "어떤 역할이든 그때그때 다르게 느끼는 것이 편하다." }, // SW
  { question: "권력 구조에 큰 관심이 없다." }, // N

  // 세트 3
  { question: "내가 원하는 대로 관계를 조율할 수 있어야 만족스럽다." }, // D
  { question: "상대방의 리드를 받는 것이 더 익숙하다." }, // S
  { question: "주도와 복종을 넘나드는 것이 나를 표현하는 방법이다." }, // SW
  { question: "지배/복종보다는 서로 배려하는 게 우선이다." }, // N

  // 세트 4
  { question: "강한 리더십을 발휘할 수 있는 상황이 좋다." }, // D
  { question: "명확한 지시를 받을 때 더 집중이 잘 된다." }, // S
  { question: "파트너에 따라 내 역할이 자연스럽게 달라진다." }, // SW
  { question: "역할 자체보다 관계의 분위기가 더 중요하다." }, // N

  // 세트 5
  { question: "상대를 이끌고, 계획을 주도하는 것을 좋아한다." }, // D
  { question: "내 의견보다 상대의 기분을 더 우선시한다." }, // S
  { question: "지배할 때도, 복종할 때도 나름의 매력이 있다." }, // SW
  { question: "지배/복종이라는 개념 자체가 낯설고 거리감이 있다." }, // N

  // 세트 6
  { question: "리드하지 못하면 불편함을 느낀다." }, // D
  { question: "복종적인 위치에 있을 때 오히려 자유로움을 느낀다." }, // S
  { question: "특정 성향보다 순간의 감정이 더 중요하다." }, // SW
  { question: "지배, 복종 모두 감정적으로 별 의미가 없다." }, // N

  // 세트 7
  { question: "상대에게 명확히 방향을 제시하는 것을 선호한다." }, // D
  { question: "누군가의 계획에 따라 움직이는 것이 더 편하다." }, // S
  { question: "관계 속에서 유연하게 포지션을 바꾸는 것이 좋다." }, // SW
  { question: "이런 유형 테스트 자체가 나에겐 중요하지 않다." }, // N

  // 세트 8
  { question: "상대를 리드하는 것이 나의 매력을 드러내는 방식이다." }, // D
  { question: "상대방이 나를 이끌어주면 마음이 놓인다." }, // S
  { question: "그날의 기분에 따라 내가 원하는 역할이 바뀐다." }, // SW
  { question: "힘의 균형보다는 관계의 흐름이 더 자연스러워야 한다." }, // N

  // 세트 9
  { question: "내 결정에 따라 상대방이 반응할 때 큰 만족을 느낀다." }, // D
  { question: "상대의 욕구에 맞춰 내 태도를 바꾸는 것이 어렵지 않다." }, // S
  { question: "상황과 파트너에 따라 성향이 유동적으로 바뀐다." }, // SW
  {
    question:
      "어떤 역할을 맡는지가 중요한 게 아니라 얼마나 즐거운지가 중요하다.",
  }, // N

  // 세트 10
  { question: "관계를 내가 설계하고 운영하는 것이 좋다." }, // D
  { question: "지시받고 움직일 때 내가 더 잘 기능한다고 느낀다." }, // S
  { question: "지배하거나 복종하는 것이 아니라 함께 조율하는 게 좋다." }, // SW
  { question: "자유로운 관계가 가장 나에게 맞는다." }, // N
];

export default function BDSMPlayPage() {
  const [percent, setPercent] = useState(0);
  const [testAnswer, setTestAnswer] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResultButton, setIsResultButton] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const getButtonStyle = (n: number) => {
    // 중앙 정렬을 위한 계산: 가장 큰 버튼(56px) 기준으로 중앙 맞추기
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
          "mindpang-bdsm-answer",
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
        {/* Adsense component would go here */}
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
              <Link href="/test/bdsm/result" className="block">
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
