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
  radio: Array<{
    score: number;
    title: string;
  }>;
}

const questions: Question[] = [
  {
    question:
      "일 년에 두 계절만 있다고 상상해 보세요. 어느 계절을 고를 건가요?",
    radio: [
      { score: 50, title: "봄, 가을" },
      { score: 30, title: "여름, 겨울" },
      { score: 40, title: "봄, 여름" },
      { score: 20, title: "가을, 겨울" },
      { score: 10, title: "여름, 가을" },
    ],
  },
  {
    question: "어디가 가장 편한가요?",
    radio: [
      { score: 20, title: "형형색색의 가을 숲" },
      { score: 50, title: "정신없이 바쁜 도시" },
      { score: 40, title: "호수, 강, 바다처럼 큰 물가" },
      { score: 30, title: "여름철 집 근처의 공원" },
      { score: 10, title: "산 속" },
    ],
  },
  {
    question: "가장 좋아하는 슈퍼히어로는 무엇인가요?",
    radio: [
      { score: 30, title: "닥터 스트레인지를 존경합니다." },
      { score: 40, title: "플래시의 놀라운 속도에 감탄하죠!" },
      { score: 10, title: "헐크만큼 강했으면 좋겠어요!" },
      { score: 20, title: "나는 울버린이 더 좋아요." },
      { score: 50, title: "스파이더맨이 최고 아닌가요?" },
    ],
  },
  {
    question: "어떤 사람과 대화하고 싶나요?",
    radio: [
      { score: 10, title: "똑똑하면서도 냉소적인 사람" },
      { score: 20, title: "귀엽고 재미있는 사람" },
      { score: 40, title: "지적이면서 내성적인 사람" },
      { score: 50, title: "활기차고 재치있는 사람" },
      { score: 30, title: "착하고 현명한 사람" },
    ],
  },
  {
    question:
      "전 세계 어디에든 완벽한 집을 지을 수 있다면 어떤곳을 선택하시겠습니까?",
    radio: [
      { score: 10, title: "문명에서 멀리 떨어진 높은 산 위" },
      { score: 20, title: "모두가 서로를 아는 작은 마을" },
      { score: 30, title: "25명 정도밖에 살지 않는 섬" },
      { score: 50, title: "인기 있고 비싼 해변 휴양지" },
      { score: 40, title: "거대한 정원으로 둘러싸인 시골" },
    ],
  },
  {
    question: "만약 당신이 사물이라면 무엇일까요?",
    radio: [
      { score: 20, title: "식물원의 아름답고 희귀한 꽃" },
      { score: 50, title: "모두가 갖고 싶어 하는 새로운 기계 장치" },
      { score: 10, title: "초고속 경주용 자동차" },
      { score: 40, title: "다람쥐 가족이 사는 오래 된 나무" },
      { score: 30, title: "보물들과 함정들로 가득 찬 신비한 동굴" },
    ],
  },
  {
    question: "가장 좋아하는 단어를 고르세요.",
    radio: [
      { score: 50, title: "행복한" },
      { score: 20, title: "강력한" },
      { score: 30, title: "신비로운" },
      { score: 40, title: "친절한" },
      { score: 10, title: "부유한" },
    ],
  },
  {
    question: "문제를 어떻게 해결하시나요?",
    radio: [
      {
        score: 40,
        title:
          "먼저 계획을 세웁니다. 그러고 나서, 그것을 실행하기 위해 일하죠.",
      },
      {
        score: 50,
        title: "문제를 연구하고 온라인에서 해결책을 찾습니다.",
      },
      {
        score: 10,
        title: "문제가 사라지거나 더 이상 간과할 수 없을 때까지 기다립니다.",
      },
      { score: 30, title: "문제요? 문제가 하나도 없는데요!" },
      {
        score: 20,
        title:
          "상황에 따라 즉흥적으로 대처합니다. 대부분의 경우 효과가 있어요.",
      },
    ],
  },
  {
    question: "'재충전'을 위한 최고의 방법은 무엇인가요?",
    radio: [
      { score: 40, title: "오랫동안 해변 걷기" },
      { score: 10, title: "좋은 식당에서 친구들과 함께 맛있는 식사하기" },
      { score: 20, title: "가장 좋아하는 컴퓨터 게임하기" },
      { score: 30, title: "하루종일 자기" },
      { score: 50, title: "외출, 영화, 술집, 클럽" },
    ],
  },
  {
    question: "좋아하는 영화 장르는 무엇인가요?",
    radio: [
      { score: 10, title: "액션 영화" },
      { score: 20, title: "코미디 드라마" },
      { score: 50, title: "호러 영화" },
      { score: 30, title: "서사적인 영화" },
      { score: 40, title: "범죄 스릴러 & 미스테리" },
    ],
  },
];

export default function AnimalPlayPage() {
  const [percent, setPercent] = useState(0);
  const [testAnswer, setTestAnswer] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResultButton, setIsResultButton] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedScore, setSelectedScore] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAnswerClick = (score: number) => {
    if (isProcessing) return; // 중복 클릭 방지

    setIsProcessing(true);
    setSelectedScore(score);

    // 시각적 피드백을 위한 딜레이
    setTimeout(() => {
      try {
        const total = questions.length;
        const p = ((currentIndex + 1) / total) * 100;
        const newAnswers = [...testAnswer];
        newAnswers[currentIndex] = score;
        setTestAnswer(newAnswers);

        if (typeof window !== "undefined") {
          localStorage.setItem(
            "mindpang-animal-score",
            JSON.stringify(newAnswers)
          );
        }

        if (questions.length - 1 === currentIndex) {
          setIsLoading(true);
          setTimeout(() => {
            setIsResultButton(true);
          }, 3000);
        } else {
          // 다음 질문으로 이동
          setSelectedScore(null);
          setCurrentIndex(currentIndex + 1);
        }
        setPercent(Math.floor(p));
        setIsProcessing(false);
      } catch (e) {
        console.error(e);
        setIsProcessing(false);
      }
    }, 500); // 500ms 딜레이로 선택 효과 표시
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
              <Link href="/test/animal/result" className="block">
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
                  const isSelected = selectedScore === option.score;

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
                      {/* 선택 효과 애니메이션 */}
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
