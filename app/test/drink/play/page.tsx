"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import { coupangPartnerStart } from "@/lib/utils/global";

const questions = [
  {
    question: "술자리에서 예상치 못한 상황이 벌어지는 것도 즐겁다.",
    trait: "P",
  },
  { question: "함께 마시는 사람들의 기분이 좋아야 나도 즐겁다.", trait: "F" },
  {
    question: "술집에서 옆 테이블 사람들과 금세 친해져서 같이 건배한다.",
    trait: "E",
  },
  { question: "어떤 안주가 나올지, 술은 어떤 맛일지가 중요하다.", trait: "S" },
  {
    question: "시끄러운 곳보다는 조용한 분위기의 술집을 선호한다.",
    trait: "I",
  },
  {
    question: "술값을 정확히 나누어 계산하는 것을 당연하게 생각한다.",
    trait: "T",
  },
  { question: "몇 시에 시작해서 언제 끝날지 미리 정하고 싶다.", trait: "J" },
  { question: "술자리에서 나누는 대화가 새로운 영감을 준다.", trait: "N" },
  {
    question: "혼자 마시기보다는 여러 명이 모여서 떠들썩하게 마시는 게 좋다.",
    trait: "E",
  },
  {
    question: "처음 만난 사람들보다는 친한 사람들과 마시는 게 편하다.",
    trait: "I",
  },
  { question: "검증된 맛집이나 유명한 술집을 선호한다.", trait: "S" },
  { question: "새로운 컨셉의 술집이나 특이한 칵테일에 끌린다.", trait: "N" },
  {
    question: "누군가 기분이 안 좋으면 먼저 술을 권하며 위로한다.",
    trait: "F",
  },
  { question: "술자리에서도 논리적이고 합리적인 대화를 선호한다.", trait: "T" },
  { question: "술자리 전에 어디서 뭘 먹고 마실지 계획을 세운다.", trait: "J" },
  { question: "계획 없이 즉석에서 결정한 술자리가 더 재미있다.", trait: "P" },
  {
    question: "술자리에서 분위기 메이커 역할을 자연스럽게 맡게 된다.",
    trait: "E",
  },
  { question: "술자리에서는 듣는 역할을 주로 한다.", trait: "I" },
  { question: "미리 예약하고 계획을 세워서 가는 것을 좋아한다.", trait: "S" },
  {
    question: "술자리가 인생에 대한 깊은 이야기로 이어지면 좋겠다.",
    trait: "N",
  },
  {
    question: "술자리에서 서로의 고민을 들어주고 공감해주는 것을 좋아한다.",
    trait: "F",
  },
  {
    question: "감정적인 이야기보다는 사실에 기반한 대화가 편하다.",
    trait: "T",
  },
  {
    question: "정해진 시간에 정해진 장소에서 만나는 것을 선호한다.",
    trait: "J",
  },
  {
    question: "분위기에 따라 자연스럽게 이차, 삼차로 이어지는 것을 좋아한다.",
    trait: "P",
  },
  { question: "새로운 술집에 가면 직원들과도 금세 친해진다.", trait: "E" },
  {
    question: "홈술이나 소규모 모임을 대규모 술자리보다 좋아한다.",
    trait: "I",
  },
  {
    question: "술의 도수, 안주의 칼로리 등 구체적인 정보를 확인한다.",
    trait: "S",
  },
  { question: "분위기나 인테리어, 스토리가 있는 술집을 좋아한다.", trait: "N" },
  {
    question: "분위기가 어색하면 먼저 화제를 꺼내서 분위기를 풀어준다.",
    trait: "F",
  },
  {
    question: "술자리에서 객관적인 분석이나 비판적 사고를 즐긴다.",
    trait: "T",
  },
  { question: "술자리가 너무 늦어지면 불편함을 느낀다.", trait: "J" },
  {
    question: "시간 약속보다는 '언제든 연락하면 나갈 수 있는' 느낌을 선호한다.",
    trait: "P",
  },
  {
    question: "카톡으로 '오늘 술 마실 사람?' 메시지를 먼저 보내는 편이다.",
    trait: "E",
  },
  { question: "술자리 후에는 혼자만의 시간이 필요하다.", trait: "I" },
  { question: "평소 자주 가던 단골집에서 마시는 것이 편하다.", trait: "S" },
  {
    question: "술자리에서 미래에 대한 꿈이나 계획을 이야기하는 것을 즐긴다.",
    trait: "N",
  },
  {
    question: "술자리에서 누군가와 깊은 유대감을 느낄 때 행복하다.",
    trait: "F",
  },
  { question: "술을 마셔도 판단력을 잃지 않으려고 노력한다.", trait: "T" },
  {
    question: "술자리에도 나름의 루틴과 순서가 있어야 한다고 생각한다.",
    trait: "J",
  },
  {
    question: "술자리가 어떻게 흘러갈지 모르는 것 자체가 매력적이다.",
    trait: "P",
  },
];

export default function DrinkPlayPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [percent, setPercent] = useState(0);
  const [testAnswer, setTestAnswer] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResultButton, setIsResultButton] = useState(false);
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

  const getResultType = (answers: number[]) => {
    const scores = {
      E: 0,
      I: 0,
      S: 0,
      N: 0,
      F: 0,
      T: 0,
      J: 0,
      P: 0,
    };

    // 모든 답변을 기반으로 점수 계산
    answers.forEach((value, index) => {
      if (value && questions[index]) {
        const trait = questions[index].trait as keyof typeof scores;
        scores[trait] += value;
      }
    });

    const e_i = scores.E >= scores.I ? "E" : "I";
    const s_n = scores.S >= scores.N ? "S" : "N";
    const f_t = scores.F >= scores.T ? "F" : "T";
    const j_p = scores.J >= scores.P ? "J" : "P";

    return e_i + s_n + f_t + j_p;
  };

  const doQuestionNext = (index: number, value: number) => {
    try {
      const total = questions.length;
      const p = ((index + 1) / total) * 100;

      setTestAnswer((prev) => {
        const newAnswer = [...prev];
        newAnswer[index] = value;
        localStorage.setItem(
          "mindpang-drink-answer",
          JSON.stringify(newAnswer)
        );

        if (questions.length - 1 === index) {
          // 마지막 질문이면 점수 계산
          const resultType = getResultType(newAnswer);
          localStorage.setItem("mindpang-drink-mbti", resultType);
        }

        return newAnswer;
      });

      if (questions.length - 1 === index) {
        setIsLoading(true);
        coupangPartnerStart();

        setTimeout(() => {
          setIsResultButton(true);
        }, 3000);
      } else {
        setCurrentIndex(index + 1);
      }
      setPercent(Math.floor(p));
    } catch (e) {
      console.error("Error:", e);
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
              <Link href="/test/drink/result" className="block">
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
