"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import { coupangPartnerStart } from "@/lib/utils/global";

const questions = [
  {
    question: "오늘 회의에서 실수해서 너무 창피했어.",
    radio: [
      {
        score: "T",
        title:
          "어떤 부분에서 실수했는지 말해줄래? 우리가 함께 해결책을 찾아보자. 🧐",
      },
      {
        score: "F",
        title: "정말 속상했겠다. 얼마나 힘들었을지 이해해. 괜찮아? 😔",
      },
      {
        score: "T",
        title:
          "그 실수로 어떤 영향을 받았는지 이야기해줄래? 우리가 함께 분석해보자. 🤔",
      },
      {
        score: "F",
        title: "실수는 누구나 해. 그 경험을 통해 성장할 거야. 힘내! 💪",
      },
    ],
  },
  {
    question: "이번 프로젝트가 너무 어려워.",
    radio: [
      {
        score: "T",
        title:
          "프로젝트의 어떤 점이 특히 어려운지 알려줄래? 집중적으로 해결해보자. 🧐",
      },
      {
        score: "F",
        title: "정말 많이 힘들지? 나도 그런 상황을 겪어봐서 이해해. 😓",
      },
      {
        score: "T",
        title: "문제 해결책을 같이 생각해보는 건 어때? 좀 더 나아질 거야. 🤔",
      },
      {
        score: "F",
        title: "이렇게 힘든 프로젝트도 너라면 해낼 수 있어. 조금만 더 힘내! 🌟",
      },
    ],
  },
  {
    question: "친구랑 크게 싸웠어.",
    radio: [
      {
        score: "T",
        title: "왜 싸우게 됐는지 자세히 이야기해줄래? 원인을 찾아보자. 🤔",
      },
      {
        score: "F",
        title:
          "많이 속상했겠다. 친구와의 싸움은 항상 힘들지. 네 마음 충분히 이해해. 💔",
      },
      {
        score: "T",
        title: "문제를 해결하려면 어떤 방법이 좋을지 같이 고민해볼까? 🧐",
      },
      {
        score: "F",
        title: "시간이 지나면 괜찮아질 거야. 너무 걱정 마. 🤗",
      },
    ],
  },
  {
    question: "요즘 일이 너무 많아서 지쳐.",
    radio: [
      {
        score: "T",
        title:
          "어떤 일들이 너를 지치게 하는지 구체적으로 말해줄래? 일정을 조정해보자. 🗂️",
      },
      {
        score: "F",
        title:
          "정말 많이 힘들겠다. 잠깐 쉬어가는 게 어때? 네 건강이 가장 중요해. 😥",
      },
      {
        score: "T",
        title:
          "일을 어떻게 우선순위로 정리할까? 중요한 일부터 처리하는 게 좋겠어. 📋",
      },
      {
        score: "F",
        title: "네 건강이 가장 중요해. 잠시 쉬면서 체력을 회복하자. 🌿",
      },
    ],
  },
  {
    question: "시험 준비 때문에 너무 스트레스 받아.",
    radio: [
      {
        score: "T",
        title:
          "어떤 과목이 특히 어려운지 알려줄래? 그 부분을 집중적으로 공부해보자. 📚",
      },
      {
        score: "F",
        title: "정말 많이 힘들지? 나도 그런 상황 겪어봐서 그 마음이 이해돼. 😔",
      },
      {
        score: "T",
        title:
          "공부 계획을 어떻게 세울지 같이 고민해볼까? 계획을 잘 세우면 좀 더 수월할 거야. 🗒️",
      },
      {
        score: "F",
        title:
          "네가 잘 해낼 거라고 믿어. 지금까지도 잘 해왔잖아. 조금만 더 힘내자! 💪",
      },
    ],
  },
  {
    question: "새로운 팀원과 잘 안 맞는 것 같아.",
    radio: [
      {
        score: "T",
        title:
          "어떤 점에서 안 맞는 것 같아? 구체적으로 말해줄래? 우리가 그 원인을 찾아보자. 🤔",
      },
      {
        score: "F",
        title:
          "그런 일이 있으면 정말 힘들지. 네 마음 충분히 이해해. 상황이 좋아질 거야. 🤗",
      },
      {
        score: "T",
        title:
          "새로운 팀원과 잘 맞추려면 어떤 방법이 좋을지 같이 생각해볼까? 🧐",
      },
      {
        score: "F",
        title: "시간이 지나면 서로를 더 잘 이해하게 될 거야. 힘내! 🌟",
      },
    ],
  },
  {
    question: "발표 준비가 너무 안 돼서 걱정이야.",
    radio: [
      {
        score: "T",
        title:
          "준비가 부족한 부분이 어디인지 말해줄래? 우리가 집중적으로 준비해보자. 📋",
      },
      {
        score: "F",
        title: "발표 준비가 안 돼서 많이 긴장되겠네. 그 기분 충분히 이해해. 😔",
      },
      {
        score: "T",
        title:
          "발표 계획을 다시 세우는 건 어때? 좀 더 체계적으로 준비할 수 있을 거야. 🗂️",
      },
      {
        score: "F",
        title:
          "넌 지금까지도 잘 해왔잖아. 이번 발표도 잘 할 수 있을 거야. 자신감을 가져! 💪",
      },
    ],
  },
  {
    question: "일이 너무 많아서 지쳐.",
    radio: [
      {
        score: "T",
        title:
          "어떤 일들이 너를 바쁘게 만드는지 구체적으로 이야기해줄래? 일정을 다시 조정해보자. 🗂️",
      },
      {
        score: "F",
        title:
          "정말 많이 힘들겠네. 일이 많으면 스트레스도 클 텐데. 잠시 쉬는 것도 중요해. 네 건강이 걱정돼. 😥",
      },
      {
        score: "T",
        title:
          "일을 나눠서 처리하는 게 어때? 그렇게 하면 좀 더 수월해질 거야. 📋",
      },
      {
        score: "F",
        title:
          "네 건강이 제일 중요해. 일이 아무리 많아도 쉬어가면서 해야 해. 힘내! 🌿",
      },
    ],
  },
  {
    question: "프로젝트 마감일이 다가와서 너무 스트레스 받아.",
    radio: [
      {
        score: "T",
        title: "지금까지 어느 정도 진행됐어? 마감일까지 할 일이 많아? 📅",
      },
      {
        score: "F",
        title:
          "많이 힘들지? 마감일이 다가오면 더 스트레스 받을 거야. 네 기분 이해해. 😔",
      },
      {
        score: "T",
        title:
          "남은 시간을 어떻게 사용할지 계획을 세워볼까? 효율적으로 진행해보자. 🗓️",
      },
      {
        score: "F",
        title:
          "너라면 이 프로젝트도 잘 해낼 수 있을 거야. 조금만 더 힘내자! 💪",
      },
    ],
  },
  {
    question: "오늘 상사한테 혼나서 기분이 안 좋아.",
    radio: [
      {
        score: "T",
        title:
          "왜 혼난 건지 구체적으로 말해줄래? 우리가 그 원인을 찾아보자. 🧐",
      },
      {
        score: "F",
        title:
          "많이 속상했겠다. 상사에게 혼나면 누구나 기분이 나빠지지. 네 기분 이해해. 😔",
      },
      {
        score: "T",
        title: "다음에는 어떻게 하면 실수를 줄일 수 있을지 같이 생각해볼까? 🤔",
      },
      {
        score: "F",
        title: "모두가 다 실수하는 거야. 너무 자책하지 말고 힘내! 💪",
      },
    ],
  },
  {
    question: "새로운 업무가 너무 복잡해.",
    radio: [
      {
        score: "T",
        title:
          "어떤 점이 복잡한 것 같아? 구체적으로 이야기해줄래? 우리가 함께 분석해보자. 🧐",
      },
      {
        score: "F",
        title:
          "정말 힘들겠다. 새로운 업무가 익숙하지 않으면 누구나 힘들지. 네 기분 이해해. 😥",
      },
      {
        score: "T",
        title:
          "업무를 나눠서 생각해보는 건 어때? 그렇게 하면 좀 더 쉽게 처리할 수 있을 거야. 📋",
      },
      {
        score: "F",
        title: "천천히 해도 괜찮아. 조금씩 익숙해질 거야. 힘내! 🌟",
      },
    ],
  },
  {
    question: "요즘 너무 바빠서 여유가 없어.",
    radio: [
      {
        score: "T",
        title:
          "어떤 일들이 너를 바쁘게 하는지 말해줄래? 우리가 일정을 조정해보자. 🗂️",
      },
      {
        score: "F",
        title:
          "정말 많이 힘들겠네. 바쁜 일정을 소화하기 힘들지. 네 기분 이해해. 😔",
      },
      {
        score: "T",
        title:
          "시간 관리를 어떻게 하면 좋을지 같이 생각해볼까? 효율적으로 계획해보자. 🗓️",
      },
      {
        score: "F",
        title: "잠시 쉬어가는 것도 중요해. 네 건강이 제일 중요해. 힘내! 🌿",
      },
    ],
  },
  {
    question: "동료와의 의견 차이로 다퉜어.",
    radio: [
      {
        score: "T",
        title:
          "어떤 부분에서 의견이 달랐는지 구체적으로 말해줄래? 우리가 원인을 찾아보자. 🤔",
      },
      {
        score: "F",
        title:
          "많이 속상했겠다. 동료와 다투면 정말 마음이 아프지. 네 기분 이해해. 💔",
      },
      {
        score: "T",
        title: "문제를 해결하려면 어떤 방법이 좋을지 같이 고민해볼까? 🧐",
      },
      {
        score: "F",
        title:
          "시간이 지나면 괜찮아질 거야. 모든 관계에는 갈등이 있기 마련이야. 너무 걱정하지 마. 🤗",
      },
    ],
  },
  {
    question: "이번 프로젝트가 기대에 못 미쳐서 실망이야.",
    radio: [
      {
        score: "T",
        title:
          "어떤 부분이 기대에 못 미쳤는지 구체적으로 말해줄래? 우리가 함께 분석해보자. 🧐",
      },
      {
        score: "F",
        title:
          "정말 많이 속상하겠다. 프로젝트가 기대에 못 미치면 누구나 실망하지. 네 기분 이해해. 😔",
      },
      {
        score: "T",
        title: "다음에는 어떻게 하면 더 잘할 수 있을지 같이 생각해볼까? 🤔",
      },
      {
        score: "F",
        title:
          "실망하지 마. 너는 이미 잘하고 있어. 다음에는 더 잘할 수 있을 거야. 힘내! 💪",
      },
    ],
  },
  {
    question: "최근에 일이 너무 많아서 잠을 못 자.",
    radio: [
      {
        score: "T",
        title:
          "어떤 일들이 너를 잠 못 자게 하는지 구체적으로 말해줄래? 우리가 함께 해결책을 찾아보자. 🗂️",
      },
      {
        score: "F",
        title:
          "정말 많이 힘들겠네. 잠을 못 자면 건강에도 안 좋을 텐데. 네 기분 이해해. 😔",
      },
      {
        score: "T",
        title:
          "일을 나눠서 처리하는 게 어때? 그렇게 하면 좀 더 수월해질 거야. 📋",
      },
      {
        score: "F",
        title: "잠깐이라도 쉬어야 해. 건강이 제일 중요하니까. 힘내! 🌿",
      },
    ],
  },
  {
    question: "중요한 결정을 내려야 해서 고민이야.",
    radio: [
      {
        score: "T",
        title:
          "어떤 결정을 내려야 하는지 구체적으로 말해줄래? 우리가 함께 생각해보자. 🤔",
      },
      {
        score: "F",
        title:
          "고민이 많겠네. 중요한 결정을 내려야 할 때는 누구나 힘들지. 네 기분 이해해. 😔",
      },
      {
        score: "T",
        title: "결정을 내리기 전에 어떤 정보가 필요한지 같이 생각해볼까? 🧐",
      },
      {
        score: "F",
        title:
          "천천히 생각해도 돼. 중요한 결정이니만큼 시간을 두고 고민해보자. 힘내! 🌟",
      },
    ],
  },
  {
    question: "오늘 팀원들과의 회의가 잘 안 풀렸어.",
    radio: [
      {
        score: "T",
        title:
          "어떤 점이 잘 안 풀렸는지 구체적으로 말해줄래? 우리가 함께 분석해보자. 🤔",
      },
      {
        score: "F",
        title:
          "많이 힘들었겠다. 회의가 잘 안 풀리면 누구나 기분이 나빠지지. 네 기분 이해해. 😔",
      },
      {
        score: "T",
        title: "다음에는 어떻게 하면 더 잘할 수 있을지 같이 생각해볼까? 🗂️",
      },
      {
        score: "F",
        title:
          "모두가 다 잘 되지 않는 날도 있는 거야. 너무 걱정하지 마. 힘내! 🌿",
      },
    ],
  },
  {
    question: "요즘 일이 너무 많아서 개인 시간이 없어.",
    radio: [
      {
        score: "T",
        title:
          "어떤 일들이 너를 바쁘게 하는지 구체적으로 말해줄래? 우리가 일정을 조정해보자. 🗓️",
      },
      {
        score: "F",
        title:
          "정말 많이 힘들겠다. 바쁜 일정을 소화하기 힘들지. 네 기분 이해해. 😔",
      },
      {
        score: "T",
        title:
          "시간 관리를 어떻게 하면 좋을지 같이 생각해볼까? 효율적으로 계획해보자. 📋",
      },
      {
        score: "F",
        title: "잠시 쉬어가는 것도 중요해. 네 건강이 가장 중요해. 힘내! 🌿",
      },
    ],
  },
  {
    question: "상사가 내 의견을 무시해서 속상해.",
    radio: [
      {
        score: "T",
        title:
          "왜 그런 일이 있었던 것 같아? 구체적으로 말해줄래? 우리가 그 원인을 찾아보자. 🤔",
      },
      {
        score: "F",
        title:
          "많이 속상했겠다. 상사가 내 의견을 무시하면 정말 기분이 나빠지지. 네 기분 이해해. 😔",
      },
      {
        score: "T",
        title: "다음에는 어떻게 접근하면 좋을지 같이 생각해볼까? 🧐",
      },
      {
        score: "F",
        title: "네 의견은 중요한 거야. 너무 자책하지 말고 힘내! 🌟",
      },
    ],
  },
  {
    question: "이번 평가에서 기대에 못 미쳐서 실망이야.",
    radio: [
      {
        score: "T",
        title:
          "어떤 부분이 기대에 못 미쳤는지 구체적으로 말해줄래? 우리가 함께 분석해보자. 🧐",
      },
      {
        score: "F",
        title:
          "정말 많이 속상하겠다. 평가에서 기대에 못 미치면 누구나 실망하지. 네 기분 이해해. 😔",
      },
      {
        score: "T",
        title: "다음에는 어떻게 하면 더 나아질 수 있을지 같이 생각해볼까? 🤔",
      },
      {
        score: "F",
        title:
          "실망하지 마. 너는 이미 잘하고 있어. 다음에는 더 잘할 수 있을 거야. 힘내! 💪",
      },
    ],
  },
];

export default function TFPlayPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [percent, setPercent] = useState(0);
  const [testAnswer, setTestAnswer] = useState({ T: 0, F: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [isResultButton, setIsResultButton] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const doQuestionNext = (index: number, value: string) => {
    try {
      const total = questions.length;
      const p = ((index + 1) / total) * 100;

      setTestAnswer((prev) => {
        const newAnswer = { ...prev };
        if (!newAnswer[value as keyof typeof newAnswer]) {
          newAnswer[value as keyof typeof newAnswer] = 0;
        }
        newAnswer[value as keyof typeof newAnswer] += 1;
        localStorage.setItem(
          "mindpang-tf-score",
          JSON.stringify(newAnswer)
        );
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
      console.error(e);
    }
  };

  const handleAnswerClick = (index: number, score: string) => {
    setSelectedIndex(index);
    setTimeout(() => {
      doQuestionNext(currentIndex, score);
      setSelectedIndex(null);
    }, 200);
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
              <Link href="/test/tf/result" className="block">
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
          {currentIndex < questions.length && (
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
                {currentQuestion.radio.map((option, optionIndex) => {
                  const isSelected = selectedIndex === optionIndex;
                  return (
                    <Button
                      key={optionIndex}
                      onClick={() => handleAnswerClick(optionIndex, option.score)}
                      className={`w-full text-left justify-start h-auto py-4 px-4 text-base md:text-lg transition-all duration-200 ${
                        isSelected
                          ? "bg-luxury-gold border-2 border-luxury-gold text-black shadow-lg shadow-luxury-gold/50 scale-95"
                          : "bg-transparent border-luxury-gold/40 text-luxury-gold hover:border-luxury-gold hover:bg-luxury-gold/10 hover:scale-105"
                      }`}
                      variant="outline"
                    >
                      <span className="flex-1">{option.title}</span>
                      {isSelected && (
                        <CheckCircle2 className="ml-2 w-5 h-5 animate-pulse" />
                      )}
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

