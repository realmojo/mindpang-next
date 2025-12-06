"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Loader2, CheckCircle2, ArrowRight } from "lucide-react";

const questions = [
  { question: "나는 가까운 사람에게 감정을 솔직히 표현하는 편이다." }, // Secure
  { question: "나는 상대가 나를 떠날까 봐 자주 불안해진다." }, // Anxious
  { question: "나는 누군가와 너무 가까워지는 것이 불편하다." }, // Avoidant
  { question: "나는 친밀함을 원하면서도 동시에 두렵고 거리를 두고 싶다." }, // Fearful

  { question: "연인, 친구와 갈등이 생겨도 잘 해결할 수 있다고 믿는다." }, // Secure
  { question: "상대방이 내 메시지에 바로 답하지 않으면 걱정된다." }, // Anxious
  { question: "누군가가 내 사생활을 너무 알고 싶어하면 부담스럽다." }, // Avoidant
  { question: "사람들과 가까워졌다가 상처받을까 봐 조심스러워진다." }, // Fearful

  { question: "연인이나 친구와 안정적인 관계를 유지하는 것이 어렵지 않다." }, // Secure
  { question: "사소한 일에도 상대방의 말과 태도에 예민하게 반응한다." }, // Anxious
  { question: "누군가 나를 도우려 할 때, 진심인지 의심이 든다." }, // Avoidant
  { question: "관계를 맺는 것이 좋기도 하지만 동시에 불편하다." }, // Fearful

  { question: "나는 나 자신과 타인 모두를 신뢰하는 편이다." }, // Secure
  { question: "상대가 나를 싫어하게 될까 봐 항상 긴장한다." }, // Anxious
  { question: "가까운 사이에서도 일정 거리를 유지하는 것이 편하다." }, // Avoidant
  { question: "나는 관계에서 혼란스럽고 예측하기 힘든 감정을 자주 느낀다." }, // Fearful

  { question: "도움이 필요할 때 누군가에게 편하게 도움을 요청할 수 있다." }, // Secure
  { question: "상대가 나를 좋아하지 않으면 자존감이 크게 흔들린다." }, // Anxious
  { question: "자신의 감정을 표현하지 않는 것이 더 안전하다고 느낀다." }, // Avoidant
  { question: "관계에서 친밀감과 두려움이 동시에 느껴져 혼란스럽다." }, // Fearful

  { question: "나는 연인이나 친구와 신뢰를 바탕으로 안정적인 관계를 맺는다." }, // Secure
  { question: "상대방이 나를 무시하는 건 아닌가 걱정할 때가 많다." }, // Anxious
  { question: "감정적으로 거리를 두는 것이 나를 보호해준다고 생각한다." }, // Avoidant
  { question: "가까워지고 싶지만 또 상처받을까 두려워 물러나게 된다." }, // Fearful

  { question: "나는 새로운 관계를 시작하는 데 두려움이 없다." }, // Secure
  { question: "상대가 나를 싫어하면 견딜 수 없을 것 같다." }, // Anxious
  { question: "누군가가 너무 의존적으로 다가오면 부담스럽다." }, // Avoidant
  { question: "가까워질수록 불안해져서 일부러 밀어내게 된다." }, // Fearful
];

export default function AdultAttachmentStylesPlayPage() {
  const [percent, setPercent] = useState(0);
  const [testAnswer, setTestAnswer] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResultButton, setIsResultButton] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedValue, setSelectedValue] = useState<number | null>(null);

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
    if (selectedValue !== null) return; // 더블클릭 방지
    setSelectedValue(value);

    // 선택된 느낌 유지 → 딜레이 후 이동
    setTimeout(() => {
      doQuestionNext(currentIndex, value);
      setSelectedValue(null); // 초기화
    }, 400); // 400ms 후 이동
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
          "mindpang-adult-attachment-styles-answer",
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
              <Link
                href="/test/adult-attachment-styles/result"
                className="block"
              >
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
                        disabled={selectedValue !== null}
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
