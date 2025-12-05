"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Heart, Loader2, CheckCircle2, ArrowRight } from "lucide-react";

interface Question {
  question: string;
  radio: Array<{ score: number; title: string }>;
}

const questions: Question[] = [
  {
    question: "최근들어 슬픈일이 있나요?",
    radio: [
      { score: 0, title: "나는 슬프지 않다." },
      { score: 1, title: "나는 슬프다." },
      { score: 2, title: "나는 항상 슬프고 기운을 낼 수 없다." },
      { score: 3, title: "나는 너무나 슬프고 불행해서 도저히 견딜 수 없다." },
    ],
  },
  {
    question: "식욕이 왕성한가요?",
    radio: [
      { score: 0, title: "내 식욕은 평소와 다름없다." },
      { score: 1, title: "나는 요즈음 전보다 식욕이 좋지 않다." },
      { score: 2, title: "나는 요즈음 식욕이 많이 떨어졌다." },
      { score: 3, title: "요즈음에는 전혀 식욕이 없다." },
    ],
  },
  {
    question: "평소에 피로는 어떤가요?",
    radio: [
      { score: 0, title: "나는 평소보다 더 피곤하지는 않다." },
      { score: 1, title: "나는 전보다 더 쉽게 피곤해 진다." },
      { score: 2, title: "나는 무엇을 해도 피곤해 진다." },
      { score: 3, title: "나는 너무나 피곤해서 아무 일도 할 수 없다." },
    ],
  },
  {
    question: "최근 일상생활에 만족하고 계신가요?",
    radio: [
      { score: 0, title: "나는 전과 같이 일상생활에 만족하고 있다." },
      { score: 1, title: "나의 일상생활은 예전처럼 즐겁지 않다." },
      { score: 2, title: "나는 요즘에는 어떤 것에서도 별로 만족을 얻지 못한다." },
      { score: 3, title: "나는 모든 것이 다 불만스럽고 싫증난다." },
    ],
  },
  {
    question: "밤에 잠을 잘 주무시나요?",
    radio: [
      { score: 0, title: "나는 평소처럼 잠을 잘 수 있다." },
      { score: 1, title: "나는 전에 만큼 잠을 자지는 못한다." },
      { score: 2, title: "나는 전보다 한 두 시간 일찍 깨고 다시 잠들기 어렵다." },
      { score: 3, title: "나는 평소보다 몇 시간이나 일찍 깨고, 한번 깨면 다시 잠들 수 없다." },
    ],
  },
  {
    question: "요즘 느끼고 있는 기분은 어떤가요?",
    radio: [
      { score: 0, title: "나는 벌을 받고 있다고 느끼지 않는다." },
      { score: 1, title: "나는 어쩌면 벌을 받을지도 모른다고 느낌이 든다." },
      { score: 2, title: "나는 벌을 받을 것 같다." },
      { score: 3, title: "나는 지금 벌을 받고 있다고 느낀다." },
    ],
  },
  {
    question: "자신에게 실망한적이 있나요?",
    radio: [
      { score: 0, title: "나는 나 자신에게 실망하지 않는다." },
      { score: 1, title: "나는 나 자신에게 실망하고 있다." },
      { score: 2, title: "나는 나 자신에게 화가 난다." },
      { score: 3, title: "나는 나 자신을 증오한다." },
    ],
  },
  {
    question: "본인에 대해서 어떻게 생각하나요?",
    radio: [
      { score: 0, title: "내가 다른 사람보다 못한 것 같지는 않다." },
      { score: 1, title: "나는 나의 약점이나 실수에 대해서 나 자신을 탓하는 편이다." },
      { score: 2, title: "내가 한 일이 잘못되었을 때는 언제나 나를 탓한다." },
      { score: 3, title: "일어나는 모든 나쁜 일들은 다 내 탓이다." },
    ],
  },
  {
    question: "자살에 대한 생각이 있으신가요?",
    radio: [
      { score: 0, title: "나는 자살 같은 것은 생각하지 않는다." },
      { score: 1, title: "나는 자살할 생각을 가끔 하지만, 실제로 하지는 않을 것이다." },
      { score: 2, title: "자살하고 싶은 생각이 자주 든다." },
      { score: 3, title: "나는 기회만 있으면 자살하겠다." },
    ],
  },
  {
    question: "요즘 눈물이 많으신가요?",
    radio: [
      { score: 0, title: "나는 평소보다 더 울지는 않는다." },
      { score: 1, title: "나는 전보다 더 많이 운다." },
      { score: 2, title: "나는 요즈음 항상 운다." },
      { score: 3, title: "나는 전에는 울고 싶을 때 울 수 있었지만, 요즈음은 울래야 울 기력조차 없다." },
    ],
  },
  {
    question: "짜증내시는 편인가요?",
    radio: [
      { score: 0, title: "나는 요즈음 평소보다 더 짜증을 내는 편은 아니다." },
      { score: 1, title: "나는 전보다 더 쉽게 짜증이 나고 귀찮아 진다." },
      { score: 2, title: "나는 요즈음 항상 짜증을 내고 있다." },
      { score: 3, title: "전에는 짜증스럽던 일에 요즘은 너무 지쳐서 짜증조차 나지 않는다." },
    ],
  },
  {
    question: "사람에 대해 관심이 있으신가요?",
    radio: [
      { score: 0, title: "나는 다른 사람들에 대한 관심을 잃지 않고 있다." },
      { score: 1, title: "나는 전보다 다른 사람들에 대한 관심이 줄었다." },
      { score: 2, title: "나는 다른 사람들에 대한 관심이 거의 없어졌다." },
      { score: 3, title: "나는 다른 사람들에 대한 관심이 완전히 없어졌다." },
    ],
  },
  {
    question: "우유부단한 편이신가요?",
    radio: [
      { score: 0, title: "나는 평소처럼 결정을 잘 내린다." },
      { score: 1, title: "나는 결정을 미루는 때가 전보다 더 많다." },
      { score: 2, title: "나는 전에 비해 결정 내리는 데에 더 큰 어려움을 느낀다." },
      { score: 3, title: "나는 더 이상 아무 결정도 내릴 수가 없다." },
    ],
  },
  {
    question: "거울을 보면 어떤 느낌이 드시나요?",
    radio: [
      { score: 0, title: "나는 전보다 내 모습이 나빠졌다고 느끼지 않는다." },
      { score: 1, title: "나는 나이 들어 보이거나 매력 없이 보일까봐 걱정한다." },
      { score: 2, title: "나는 내 모습이 매력 없게 변해 버린 것 같은 느낌이 든다." },
      { score: 3, title: "나는 내가 추하게 보인다고 믿는다." },
    ],
  },
  {
    question: "일 하는 것에 대해 어떻게 생각하시나요?",
    radio: [
      { score: 0, title: "나는 전처럼 일을 할 수 있다." },
      { score: 1, title: "어떤 일을 시작하는데 전보다 더 많은 노력이 든다." },
      { score: 2, title: "무슨 일이든 하려면 나 자신을 매우 심하게 채찍질해야만 한다." },
      { score: 3, title: "나는 전혀 아무 일도 할 수가 없다." },
    ],
  },
  {
    question: "잘못을 저지르면 어떤 기분이 드시나요?",
    radio: [
      { score: 0, title: "나는 특별히 죄책감을 느끼지 않는다." },
      { score: 1, title: "나는 죄책감을 느낄 때가 많다." },
      { score: 2, title: "나는 죄책감을 느낄 때가 아주 많다." },
      { score: 3, title: "나는 항상 죄책감에 시달리고 있다." },
    ],
  },
  {
    question: "실패자라고 느끼시나요?",
    radio: [
      { score: 0, title: "나는 실패자라고 느끼지 않는다." },
      { score: 1, title: "나는 보통 사람들보다 더 많이 실패한 것 같다." },
      { score: 2, title: "내가 살아온 과거를 뒤돌아보면, 실패투성이인 것 같다." },
      { score: 3, title: "나는 인간으로서 완전한 실패자라고 느낀다." },
    ],
  },
  {
    question: "미래에 대해 어떻게 생각하시나요?",
    radio: [
      { score: 0, title: "나는 미래에 대해서 별로 낙심하지 않는다." },
      { score: 1, title: "나는 미래에 대해서 용기가 나지 않는다." },
      { score: 2, title: "나는 미래에 대해 기대할 것이 아무 것도 없다고 느낀다." },
      { score: 3, title: "나는 미래는 아주 절망적이고 나아질 가망이 없다고 느낀다." },
    ],
  },
  {
    question: "최근 체중 변화가 있나요?",
    radio: [
      { score: 0, title: "요즈음 체중이 별로 줄지 않았다." },
      { score: 1, title: "전보다 몸무게가 2kg 가량 줄었다." },
      { score: 2, title: "전보다 몸무게가 5kg 가량 줄었다." },
      { score: 3, title: "나는 현재 음식조절로 체중을 줄이고 있는 중이다." },
    ],
  },
  {
    question: "건강에 대한 변화가 있나요?",
    radio: [
      { score: 0, title: "나는 건강에 대해 전보다 더 염려하고 있지는 않다." },
      { score: 1, title: "나는 여러 가지 통증, 소화불량, 변비 등과 같은 신체적인 문제로 걱정하고 있다." },
      { score: 2, title: "나는 건강이 염려되어 다른 일은 생각하기 힘들다." },
      { score: 3, title: "나는 건강이 너무 염려되어 다른 일은 아무 것도 생각할 수 없다." },
    ],
  },
  {
    question: "섹스를 하고싶은 생각이 드시나요?",
    radio: [
      { score: 0, title: "나는 요즈음 성에 대한 관심에 별다른 변화가 있는 것 같지는 않다." },
      { score: 1, title: "나는 전보다 성에 대한 관심이 줄었다." },
      { score: 2, title: "나는 전보다 성에 대한 관심이 상당히 줄었다." },
      { score: 3, title: "나는 성에 대한 관심을 완전히 잃었다." },
    ],
  },
];

export default function DepressionPlayPage() {
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
          "mindpang-depression-answer",
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
              <Link href="/test/depression/result" className="block">
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
                  const isSelected = selectedValue === option.score;

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
                      onClick={() => handleAnswerClick(option.score)}
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

