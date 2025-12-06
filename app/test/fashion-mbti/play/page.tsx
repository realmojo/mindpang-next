"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Loader2, CheckCircle2, ArrowRight } from "lucide-react";

interface Question {
  question: string;
  radio: Array<{ title: string; score: string }>;
}

const questions: Question[] = [
  {
    question: "쇼핑할 때 주로 어떤 스타일을 고르시나요?",
    radio: [
      { title: "최신 트렌드를 따르는 스타일", score: "E" },
      { title: "나만의 독특한 스타일", score: "I" },
    ],
  },
  {
    question: "친구들과 쇼핑할 때 당신의 역할은?",
    radio: [
      { title: "친구들의 스타일을 적극적으로 추천", score: "E" },
      { title: "조용히 자신의 스타일을 고른다", score: "I" },
    ],
  },
  {
    question: "새로운 패션 트렌드를 어떻게 받아들이시나요?",
    radio: [
      { title: "트렌드에 민감하게 반응하고 빠르게 수용", score: "E" },
      { title: "자신만의 스타일을 고수", score: "I" },
    ],
  },
  {
    question: "새로운 옷을 입었을 때 당신의 반응은?",
    radio: [
      { title: "사람들에게 보여주며 피드백을 받는다", score: "E" },
      { title: "스스로 만족하며 즐긴다", score: "I" },
    ],
  },
  {
    question: "패션 트렌드 정보를 어디서 얻나요?",
    radio: [
      { title: "주로 친구들이나 주변 사람들로부터", score: "E" },
      { title: "주로 인터넷이나 책에서", score: "I" },
    ],
  },
  {
    question: "옷을 고를 때 중요한 것은 무엇인가요?",
    radio: [
      { title: "편안함과 실용성", score: "S" },
      { title: "디자인과 독창성", score: "N" },
    ],
  },
  {
    question: "옷을 선택할 때 가장 많이 고려하는 요소는?",
    radio: [
      { title: "현재 유행하는 스타일", score: "S" },
      { title: "미래에도 유행할 독특한 디자인", score: "N" },
    ],
  },
  {
    question: "패션 잡지를 볼 때 당신의 관심사는?",
    radio: [
      { title: "실용적인 스타일 팁", score: "S" },
      { title: "창의적인 패션 화보", score: "N" },
    ],
  },
  {
    question: "옷을 고를 때 디자인에서 중요한 점은?",
    radio: [
      { title: "실용적이고 기능적인 디자인", score: "S" },
      { title: "독특하고 예술적인 디자인", score: "N" },
    ],
  },
  {
    question: "옷을 고를 때 색상의 선택 기준은?",
    radio: [
      { title: "기본적인 색상을 선호", score: "S" },
      { title: "독특한 색상을 선호", score: "N" },
    ],
  },
  {
    question: "옷을 고를 때 주로 어떤 기준으로 선택하나요?",
    radio: [
      { title: "가격과 품질을 따져서", score: "T" },
      { title: "옷을 입었을 때의 기분과 감정을 중시", score: "F" },
    ],
  },
  {
    question: "패션 아이템을 고를 때 주로 어떤 평가를 하나요?",
    radio: [
      { title: "이성적으로 가격과 품질을 분석", score: "T" },
      { title: "감정적으로 마음에 드는 아이템 선택", score: "F" },
    ],
  },
  {
    question: "쇼핑할 때 더 중요한 것은?",
    radio: [
      { title: "논리적으로 예산에 맞게", score: "T" },
      { title: "직감적으로 마음에 드는 것을", score: "F" },
    ],
  },
  {
    question: "패션 아이템을 선택할 때 더 중요한 기준은?",
    radio: [
      { title: "객관적 평가", score: "T" },
      { title: "주관적 느낌", score: "F" },
    ],
  },
  {
    question: "친구가 당신에게 옷을 추천할 때 당신의 반응은?",
    radio: [
      { title: "적극적으로 시도해 본다", score: "F" },
      { title: "자신의 스타일에 맞는지 신중히 검토", score: "T" },
    ],
  },
  {
    question: "중요한 약속이 있을 때 옷을 어떻게 준비하시나요?",
    radio: [
      { title: "미리 계획하고 준비", score: "J" },
      { title: "약속 전날 혹은 당일 기분에 따라", score: "P" },
    ],
  },
  {
    question: "옷장을 정리할 때 어떤 방식으로 정리하시나요?",
    radio: [
      { title: "철저하게 계획하고 분류하여", score: "J" },
      { title: "기분에 따라 즉흥적으로", score: "P" },
    ],
  },
  {
    question: "쇼핑할 때 주로 어떤 계획을 세우나요?",
    radio: [
      { title: "사야 할 목록을 미리 작성", score: "J" },
      { title: "현장에서 즉흥적으로 결정", score: "P" },
    ],
  },
  {
    question: "패션 아이템을 관리하는 방식은?",
    radio: [
      { title: "체계적으로 관리하고 정리", score: "J" },
      { title: "필요한 순간에 정리", score: "P" },
    ],
  },
  {
    question: "새로운 스타일을 시도할 때 무엇을 중시하나요?",
    radio: [
      { title: "현재의 패션 트렌드와의 조화", score: "J" },
      { title: "자신의 독특한 스타일", score: "P" },
    ],
  },
];

export default function FashionMBTIPlayPage() {
  const [percent, setPercent] = useState(0);
  const [testAnswer, setTestAnswer] = useState({
    I: { score: 0 },
    E: { score: 0 },
    S: { score: 0 },
    N: { score: 0 },
    T: { score: 0 },
    F: { score: 0 },
    J: { score: 0 },
    P: { score: 0 },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isResultButton, setIsResultButton] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAnswerClick = (value: string) => {
    if (isProcessing || selectedValue !== null) return;
    setIsProcessing(true);
    setSelectedValue(1);

    setTimeout(() => {
      doQuestionNext(currentIndex, value);
      setSelectedValue(null);
      setIsProcessing(false);
    }, 500);
  };

  const doQuestionNext = (index: number, type: string) => {
    try {
      const total = questions.length;
      const p = ((index + 1) / total) * 100;
      const newAnswers = { ...testAnswer };
      newAnswers[type as keyof typeof newAnswers].score += 1;
      setTestAnswer(newAnswers);

      if (typeof window !== "undefined") {
        localStorage.setItem(
          "mindpang-fashion-mbti-answer",
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
              <Link href="/test/fashion-mbti/result" className="block">
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

  const currentQuestion = questions[currentIndex];

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
          {currentQuestion && (
            <Card className="bg-[#1E1E1E]/90 border-white/10 hover:border-luxury-gold/30 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-2xl font-serif font-bold text-luxury-gold">
                    Q {currentIndex + 1}
                  </h2>
                </div>
                <p className="text-lg text-gray-200 leading-relaxed">
                  {currentQuestion.question}
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                {currentQuestion.radio.map((option, index) => {
                  const isSelected = selectedValue === index;

                  return (
                    <Button
                      key={index}
                      disabled={isProcessing}
                      className={`
                        w-full justify-start text-left h-auto py-4 px-4
                        transition-all duration-300 relative overflow-hidden
                        ${
                          isSelected
                            ? "bg-luxury-gold border-luxury-gold text-black shadow-lg shadow-luxury-gold/50 scale-[1.02] border-2"
                            : "border-luxury-gold/30 hover:bg-luxury-gold/10 hover:border-luxury-gold border"
                        }
                        ${
                          isProcessing && !isSelected
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }
                      `}
                      onClick={() => handleAnswerClick(option.score)}
                    >
                      {isSelected && (
                        <div className="absolute inset-0 bg-luxury-gold/20 animate-pulse"></div>
                      )}
                      <span
                        className={`relative z-10 flex items-center gap-2 ${
                          isSelected
                            ? "text-black font-semibold"
                            : "text-gray-200"
                        }`}
                      >
                        {isSelected && (
                          <CheckCircle2 className="w-5 h-5 text-black flex-shrink-0" />
                        )}
                        {option.title}
                      </span>
                    </Button>
                  );
                })}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
}
