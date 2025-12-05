"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Brain, Loader2, CheckCircle2, ArrowRight } from "lucide-react";

const questionAnswer = [
  { title: "매우 그렇다", value: 5 },
  { title: "그렇다", value: 4 },
  { title: "보통이다", value: 3 },
  { title: "아니다", value: 2 },
  { title: "매우 아니다", value: 1 },
];

const questions = [
  { question: "나는 자주 나 자신을 외로움 속에서 느낀다." },
  { question: "다른 사람들이 나를 실망시키면 나는 금방 분노한다." },
  { question: "새로운 사람들과의 대면 상황에서 불안을 느낀다." },
  {
    question:
      "강한 감정이 나를 휘어잡을 때, 자주 과거에 대한 회상이 나타난다.",
  },
  { question: "다른 사람들의 의견에 크게 영향을 받는 편이다." },
  { question: "나는 자주 목표나 계획을 변경하는데 어려움을 겪는다." },
  {
    question:
      "나는 자주 나 자신을 비난하거나 혹은 자신을 과도하게 낮게 평가한다.",
  },
  {
    question:
      "나는 대부분의 시간 동안 나의 정체성에 대해 명확한 감각을 가지고 있지 않다.",
  },
  {
    question:
      "대인관계에서 나는 상대방이 나를 버릴 것이라고 예상하는 경향이 있다.",
  },
  { question: "나는 대부분의 상황에서 금방 적응하는데 어려움을 겪는다." },
  { question: "나는 종종 나의 감정이 쉽게 변하는 것을 감지한다." },
  {
    question:
      "나는 자주 다른 사람들에게 나의 감정을 표현하는데 어려움을 겪는다.",
  },
  { question: "나는 일상 생활에서 자주 급한 감정 변동을 경험한다." },
  { question: "나는 다른 사람들이 나에게 무관심하다고 느낄 때가 종종 있다." },
  { question: "나는 대부분의 사람들이 나에게 실망한다고 느낄 때가 있다." },
  {
    question:
      "강한 감정이 나를 휘어잡을 때, 제어를 잃는 것 같은 느낌이 든다.",
  },
  { question: "나는 자주 급한 감정의 변화를 경험한다." },
  { question: "나는 대부분의 사람들이 나를 이해하지 못한다고 느낄 때가 있다." },
  { question: "나는 자주 나 자신에 대해 부정적인 생각을 갖는다." },
  { question: "나는 가끔 내 자신을 사랑하는 느낌이 든다." },
  { question: "나는 혼자 있을 때 나 자신을 깊이 고요한 느낌으로 느낀다." },
  {
    question:
      "가족 또는 친구와의 관계에서 나는 때때로 과도한 접근 또는 회피를 보인다.",
  },
  { question: "나는 고립되었다고 느낄 때 나 자신을 자주 마음속에서 폐쇄한다." },
  {
    question:
      "다른 사람들의 기대에 부응하는 것이 나에게 부담스럽게 느껴진다.",
  },
  { question: "자주 다른 사람들에게 나에 대한 기대를 과도하게 높이는 편이다." },
  { question: "나는 다른 사람들과의 관계에서 나 자신을 희생하는 경향이 있다." },
  { question: "나는 종종 내 자신이 다른 사람들과 다르다고 느낀다." },
  { question: "나는 가끔 나 자신이 혼란스럽게 느껴질 때가 있다." },
  { question: "나는 종종 나 자신에 대해 모순된 감정을 느낀다." },
  {
    question:
      "나는 다른 사람들에게 나의 감정을 적절하게 전달하는 것에 어려움을 겪는다.",
  },
];

export default function BorderlinePersonalityPlayPage() {
  const [percent, setPercent] = useState(0);
  const [testAnswer, setTestAnswer] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResultButton, setIsResultButton] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAnswerClick = (value: number) => {
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
          "mindpang-borderline-answer",
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
              <Link href="/test/borderline-personality/result" className="block">
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
                {questionAnswer.map((option, index) => {
                  const isSelected = selectedValue === option.value;

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
                        ${isProcessing && !isSelected ? "opacity-50 cursor-not-allowed" : ""}
                      `}
                      onClick={() => handleAnswerClick(option.value)}
                    >
                      {isSelected && (
                        <div className="absolute inset-0 bg-luxury-gold/20 animate-pulse"></div>
                      )}
                      <span className={`relative z-10 flex items-center gap-2 ${isSelected ? "text-black font-semibold" : "text-gray-200"}`}>
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

