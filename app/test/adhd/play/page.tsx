"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Loader2, CheckCircle2, ArrowRight } from "lucide-react";

const questions = [
  {
    question:
      "어떤 일의 어려운 부분은 끝내 놓고, 그 일을 마무리를 짓지 못해 곤란을 겪은 적이 있나요?",
  },
  {
    question: "체계가 필요한 일을 해야 할 때 순서대로 진행하기 어려운가요?",
  },
  { question: "약속이나 해야 할 일을 잊어버려 곤란을 겪으시나요?" },
  { question: "골치 아픈 일은 피하거나 미루시나요?" },
  {
    question: "오래 앉아 있을 때 손을 만지작거리거나 발을 꼼지락 거리나요?",
  },
  {
    question:
      "모터가 달린 것처럼 과도하게 혹은 멈출 수 없이 활동하는 경우가 있나요?",
  },
  {
    question:
      "지루하고 어려운 일을 할 때 부주의해서 실수를 하는 경우가 있나요?",
  },
  {
    question: "지루하고 반복적인 일을 할 때 주의 집중이 힘든 경우가 있나요?",
  },
  {
    question:
      "대화 중 특시 상대방이 당신에게 직접적으로 말하고 있을 때에는 집중하기 힘든 경우가 있나요?",
  },
  {
    question:
      "집이나 직장에서 물건을 엉뚱한 곳에 두거나 어디에 두었는지 헷갈리나요?",
  },
  {
    question: "주변에서 벌어지는 일이나 소음때문에 주의가 산만해 지나요?",
  },
  {
    question:
      "회의나 다른 사회적 상황에서 계속 앉아 있어야 함에도 잠깐씩 자리를 일어나나요?",
  },
  { question: "안절부절 못하거나 조바심하는 경우가 있나요?" },
  {
    question:
      "혼자 쉬고 있을 때 긴장을 풀거나 마음을 편하게 갖기 어려운 경우가 있나요?",
  },
  {
    question:
      "사회적 상황에서 나 혼자 말을 너무 많이 한다고 느끼는 경우가 있나요?",
  },
  {
    question:
      "대화 도중 상대방이 말을 끝내기 전에 끼어들어 상대방의 말을 끊는 경우가 있나요?",
  },
  {
    question:
      "차례를 지켜야 하는 상황에서 자신의 차례를 기다리는게 어려운가요?",
  },
  {
    question: "다른 사람이 바쁘게 일할 때 방해되는 행동을 하나요?",
  },
  {
    question:
      "과제나 업무를 수행하는 데 있어서 집중을 잘 못하고 부주의로 인한 실수가 있다.",
  },
  {
    question: "수업이나 놀이에서 집중을 유지하는 데 어려움을 겪는다.",
  },
  {
    question: "이야기를 할 때 잘 듣지 않는 경우가 있다.",
  },
  { question: "지시를 잘 따르지 않아서 과제나 임무를 잘 완수하지 못한다." },
  {
    question: "과제나 활동을 체계적으로 하는데 종종 어려움을 겪는다.",
  },
  {
    question:
      "지속적으로 정신력이 필요한 과제에 몰두하는 것을 피하거나 싫어한다.",
  },
  {
    question: "활동에 필요한 물건들을 자주 잃어버린다.",
  },
  {
    question: "외부 자극에 의해 종종 산만해진다.",
  },
  {
    question: "일상적인 일들을 자주 잊어버린다.",
  },
  {
    question: "손발을 가만히 있지 못한다.",
  },
  {
    question: "수업 중 혹은 회의 중 자리에 있기 힘들다.",
  },
  {
    question: "상황에 맞지 않게 돌아다니거나 지나치게 기어오르는 일이 있다.",
  },
  { question: "차분하게 노는 것이 힘들다." },
  {
    question: "끊임없이 움직이거나 마치 모터 달린 것처럼 행동하는 경우가 있다.",
  },
  {
    question: "지나치게 말을 많이 하는 것을 좋아한다.",
  },
  {
    question: "질문이 끝나기도 전에 답변을 한다.",
  },
  {
    question: "자기차례를 기다리기 힘들다.",
  },
  {
    question: "다른 사람을 참견하는 일이 종종 있다.",
  },
];

export default function ADHDPlayPage() {
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
          "mindpang-adhd-answer",
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
              <Link href="/test/adhd/result" className="block">
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
