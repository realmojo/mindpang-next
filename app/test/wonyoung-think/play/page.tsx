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

const questions = [
  {
    question: "주말 아침 6시, 이웃집에서 피아노 소리가 들려올 때",
    radio: [
      { score: 2, title: "왜 하필 이 시간에 피아노를 치는 거야? 😠" },
      { score: 4, title: "아침부터 내 미라클 모닝을 시작하게 해주네 🌅" },
      { score: 1, title: "피곤해서 다시 잠들 수 있을까 🥱" },
      { score: 3, title: "이렇게 일찍 일어나다니 오늘은 부지런히 살 수 있겠어 🌞" },
    ],
  },
  {
    question: "출근길에 비가 쏟아질 때",
    radio: [
      { score: 3, title: "우산 덕분에 비 오는 날도 문제없어 ☔" },
      { score: 4, title: "비 맞으며 출근하는 것도 나름 로맨틱해 🌧️" },
      { score: 2, title: "왜 오늘 비가 오는 거야, 운 없네 😓" },
      { score: 1, title: "비 때문에 옷 다 젖었어, 최악이야 😤" },
    ],
  },
  {
    question: "회식 자리에서 평소에 안 먹는 음식을 권유받았을 때",
    radio: [
      { score: 4, title: "새로운 음식 도전해볼 좋은 기회야 🍽️" },
      { score: 3, title: "이걸 통해 새로운 맛을 알게 될지도 몰라 🍜" },
      { score: 2, title: "왜 이런 걸 먹어야 해? 싫어 😖" },
      { score: 1, title: "먹기 싫은데 어떻게 거절하지 🤔" },
    ],
  },
  {
    question: "중요한 발표를 앞두고 장비에 문제가 생겼을 때",
    radio: [
      { score: 1, title: "장비 문제 때문에 발표 망치겠네 😞" },
      { score: 4, title: "이 상황도 내가 성장할 기회로 삼아야지 💪" },
      { score: 2, title: "왜 하필 지금 이런 일이 생기는 거야? 😩" },
      { score: 3, title: "문제 해결 능력을 보여줄 수 있는 좋은 기회야 🛠️" },
    ],
  },
  {
    question: "늦잠을 자서 아침 운동 시간을 놓쳤을 때",
    radio: [
      { score: 2, title: "또 늦잠을 자다니, 나 자신이 싫어 😣" },
      { score: 4, title: "푹 잤으니 오늘 하루도 활기차게 시작할 수 있겠어 😄" },
      { score: 1, title: "운동을 못해서 하루가 망했어 😢" },
      { score: 3, title: "저녁에 운동할 시간을 만들어봐야겠다 🏃‍♂️" },
    ],
  },
  {
    question: "친구와의 약속이 갑작스럽게 취소되었을 때",
    radio: [
      { score: 4, title: "덕분에 혼자만의 시간을 보낼 수 있겠네 🧘‍♀️" },
      { score: 1, title: "약속 취소돼서 너무 허무해 😞" },
      { score: 3, title: "친구와 다음에 더 재미있게 놀 수 있을 거야 🎉" },
      { score: 2, title: "왜 갑자기 취소하는 거야, 시간 낭비했네 😡" },
    ],
  },
  {
    question: "직장에서 실수를 했을 때",
    radio: [
      { score: 1, title: "나 때문에 일이 망쳤어, 정말 최악이야 😭" },
      { score: 4, title: "실수를 통해 배우는 기회가 되었어 📚" },
      { score: 3, title: "이 경험을 통해 더 성장할 수 있을 거야 🌱" },
      { score: 2, title: "실수해서 너무 창피해 😳" },
    ],
  },
  {
    question: "길을 걷다가 우산을 두고 나와 비를 맞았을 때",
    radio: [
      { score: 4, title: "비 맞으며 걷는 것도 나름 낭만적이야 🌧️" },
      { score: 3, title: "가벼운 비에 젖으니 기분 전환이 되네 ☔" },
      { score: 2, title: "우산을 왜 두고 나왔지, 정말 짜증나 😠" },
      { score: 1, title: "비 때문에 옷이 다 젖었어, 기분 나빠 😣" },
    ],
  },
  {
    question: "장시간의 비행기 탑승으로 피곤할 때",
    radio: [
      { score: 4, title: "긴 여행이지만 새로운 곳에 간다는 설렘이 더 커 ✈️" },
      { score: 1, title: "도착하기도 전에 지쳤어, 여행이 싫어졌어 😫" },
      { score: 3, title: "비행기에서 시간을 잘 활용하면 돼 🕒" },
      { score: 2, title: "비행기 너무 오래 타서 힘들어 😪" },
    ],
  },
  {
    question: "교통 체증으로 약속 시간에 늦을 때",
    radio: [
      { score: 4, title: "교통 체증도 나를 멈추게 할 수 없어 🚗" },
      { score: 3, title: "늦는 동안 음악을 들으며 힐링할 수 있겠어 🎧" },
      { score: 2, title: "왜 이렇게 차가 막히는 거야, 정말 짜증나 😠" },
      { score: 1, title: "약속에 늦어서 망쳤어, 정말 최악이야 😤" },
    ],
  },
  {
    question: "계획했던 일이 갑자기 취소되었을 때",
    radio: [
      { score: 4, title: "다른 기회를 찾으면 돼 🔍" },
      { score: 2, title: "왜 이런 일이 생기는 거야, 계획이 다 틀어졌어 😡" },
      { score: 3, title: "취소된 시간을 다른 유익한 일에 쓸 수 있어 ⏳" },
      { score: 1, title: "아무것도 할 수 없어서 너무 허무해 😔" },
    ],
  },
  {
    question: "중요한 시험을 앞두고 친구가 놀자고 할 때",
    radio: [
      { score: 4, title: "잠깐 쉬면서 재충전하면 더 잘할 수 있을 거야 ⚡" },
      { score: 1, title: "친구 때문에 시험 망치겠네 😒" },
      { score: 2, title: "시험 준비가 안 됐는데 놀면 안 돼 📚" },
      { score: 3, title: "공부도 중요하지만 친구와의 시간도 소중해 👫" },
    ],
  },
  {
    question: "오랜만에 만난 친구가 예전과 많이 변했을 때",
    radio: [
      { score: 1, title: "너무 변해서 이제는 잘 모르겠어 🤷" },
      { score: 2, title: "예전의 모습이 그리워, 지금은 낯설어 😢" },
      { score: 4, title: "친구의 새로운 모습도 흥미로워 😊" },
      { score: 3, title: "변한 모습 덕분에 더 다양한 대화를 할 수 있을 거야 🗣️" },
    ],
  },
  {
    question: "취미 활동 중 예상치 못한 어려움을 만났을 때",
    radio: [
      { score: 1, title: "취미 활동이 재미없어졌어 😞" },
      { score: 4, title: "이 어려움도 내가 즐기는 과정의 일부야 🛠️" },
      { score: 3, title: "어려움을 극복하면 더 재미있어질 거야 😃" },
      { score: 2, title: "왜 이렇게 어려운 거야, 스트레스 받아 😣" },
    ],
  },
  {
    question: "상사가 칭찬을 했을 때",
    radio: [
      { score: 3, title: "더 열심히 해야겠다는 동기부여가 돼 💪" },
      { score: 4, title: "내 노력을 알아줘서 기뻐 😊" },
      { score: 2, title: "그냥 형식적인 칭찬일 거야 😕" },
      { score: 1, title: "다른 사람들도 다 듣는 칭찬일 뿐이야 😒" },
    ],
  },
  {
    question: "식당에서 주문한 음식이 기대와 다를 때",
    radio: [
      { score: 2, title: "음식이 맛없어, 돈 아까워 😞" },
      { score: 1, title: "기대했던 것과 달라서 실망이야 😔" },
      { score: 3, title: "다음엔 다른 메뉴를 시켜봐야겠다 🍲" },
      { score: 4, title: "새로운 맛을 경험해보자 🍴" },
    ],
  },
  {
    question: "새로운 동료가 들어왔을 때",
    radio: [
      { score: 1, title: "동료들과의 관계가 복잡해질 것 같아 😓" },
      { score: 2, title: "새로운 사람과 어울리기 어려워 😕" },
      { score: 4, title: "새로운 사람과 일할 수 있어서 좋아 😊" },
      { score: 3, title: "팀에 새로운 활력을 줄 수 있을 거야 💼" },
    ],
  },
  {
    question: "오랜 시간 준비한 프로젝트가 실패했을 때",
    radio: [
      { score: 2, title: "왜 이렇게 노력했는데 실패한 거야 😠" },
      { score: 1, title: "모든 노력이 헛수고였어 😞" },
      { score: 3, title: "실패를 통해 더 강해질 수 있어 💪" },
      { score: 4, title: "이 실패도 중요한 배움의 과정이야 📚" },
    ],
  },
  {
    question: "여행 중 예기치 못한 사건을 만났을 때",
    radio: [
      { score: 4, title: "여행의 또 다른 재미라고 생각해 🏞️" },
      { score: 3, title: "예기치 못한 일도 여행의 일부야 🌍" },
      { score: 2, title: "계획에 없던 일이 생겨서 스트레스 받아 😣" },
      { score: 1, title: "여행이 망쳐졌어 😫" },
    ],
  },
  {
    question: "급한 업무를 처리해야 할 때",
    radio: [
      { score: 3, title: "집중해서 빨리 끝내고 쉴 수 있어 🛋️" },
      { score: 4, title: "이 기회에 내 능력을 보여줄 수 있어 💼" },
      { score: 2, title: "너무 급해서 실수할 것 같아 😰" },
      { score: 1, title: "이런 급한 일은 너무 힘들어 😓" },
    ],
  },
  {
    question: "친구와의 오해가 생겼을 때",
    radio: [
      { score: 2, title: "오해 때문에 친구와의 관계가 나빠졌어 😢" },
      { score: 1, title: "어떻게 풀어야 할지 모르겠어 😕" },
      { score: 4, title: "오해를 풀고 더 좋은 관계를 만들 기회야 👫" },
      { score: 3, title: "대화를 통해 해결할 수 있어 🗣️" },
    ],
  },
  {
    question: "원하는 물건을 구하지 못했을 때",
    radio: [
      { score: 3, title: "다른 대안을 찾아보면 돼 🔍" },
      { score: 1, title: "그 물건이 없어서 너무 실망이야 😞" },
      { score: 2, title: "왜 이렇게 운이 없지? 😣" },
      { score: 4, title: "더 좋은 걸 찾을 수 있을 거야 🌟" },
    ],
  },
  {
    question: "다른 사람의 실수로 피해를 입었을 때",
    radio: [
      { score: 1, title: "정말 화가 나서 참을 수 없어 😡" },
      { score: 4, title: "실수는 누구나 할 수 있는 거니까 이해해야지 🤝" },
      { score: 3, title: "이 상황도 내가 성장할 기회로 삼아야지 🌱" },
      { score: 2, title: "왜 나만 피해를 입어야 하는 거야? 😤" },
    ],
  },
  {
    question: "갑작스러운 지출로 예산이 부족할 때",
    radio: [
      { score: 3, title: "이번 기회에 지출을 줄여보자 💸" },
      { score: 1, title: "예산이 부족해서 너무 불안해 😟" },
      { score: 2, title: "돈 때문에 스트레스 받아 😣" },
      { score: 4, title: "예산을 다시 계획하면 돼 📊" },
    ],
  },
  {
    question: "예정에 없던 추가 업무가 생겼을 때",
    radio: [
      { score: 4, title: "추가 업무도 내 능력을 키울 기회야 💼" },
      { score: 3, title: "이번 기회에 더 배울 수 있어 📚" },
      { score: 1, title: "너무 힘들어서 견디기 어려워 😫" },
      { score: 2, title: "왜 추가 업무까지 해야 하는 거야? 😩" },
    ],
  },
  {
    question: "예정된 계획이 취소되었을 때",
    radio: [
      { score: 3, title: "취소된 시간을 다른 유익한 일에 쓸 수 있어 ⏳" },
      { score: 4, title: "다른 기회를 찾으면 돼 🔍" },
      { score: 1, title: "아무것도 할 수 없어서 너무 허무해 😔" },
      { score: 2, title: "왜 이런 일이 생기는 거야, 계획이 다 틀어졌어 😡" },
    ],
  },
  {
    question: "중요한 미팅에서 예상치 못한 질문을 받았을 때",
    radio: [
      { score: 1, title: "답변을 못해서 미팅이 망칠 것 같아 😰" },
      { score: 2, title: "왜 이런 질문을 하는 거야, 당황스러워 😳" },
      { score: 3, title: "질문을 잘 대답하면 좋은 인상을 줄 수 있어 🗣️" },
      { score: 4, title: "이 질문도 내 능력을 보여줄 기회야 🌟" },
    ],
  },
  {
    question: "다이어트 중에 유혹을 느낄 때",
    radio: [
      { score: 3, title: "조금만 참으면 목표에 더 가까워질 수 있어 💪" },
      { score: 4, title: "유혹을 이겨내면 더 큰 성취감을 느낄 수 있어 🌟" },
      { score: 2, title: "유혹을 못 이겨서 실패할 것 같아 😔" },
      { score: 1, title: "다이어트가 너무 힘들어서 포기하고 싶어 😫" },
    ],
  },
  {
    question: "새로운 업무를 맡게 되었을 때",
    radio: [
      { score: 2, title: "새로운 업무가 너무 부담스러워 😓" },
      { score: 1, title: "기존 업무도 많은데 새로운 업무까지 맡아야 하다니 😫" },
      { score: 3, title: "내 역량을 발휘할 수 있는 좋은 기회야 💼" },
      { score: 4, title: "새로운 도전을 할 기회야 🌟" },
    ],
  },
  {
    question: "휴가를 계획했는데 날씨가 좋지 않을 때",
    radio: [
      { score: 4, title: "날씨가 나빠도 즐길 수 있는 방법을 찾자 ☔" },
      { score: 1, title: "계획했던 걸 다 못해서 너무 실망이야 😞" },
      { score: 2, title: "날씨 때문에 휴가가 망쳤어 😫" },
      { score: 3, title: "실내 활동으로 휴가를 즐기자 🏠" },
    ],
  },
];

export default function WonyoungThinkPlayPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [percent, setPercent] = useState(0);
  const [testAnswer, setTestAnswer] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResultButton, setIsResultButton] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const doQuestionNext = (index: number, value: number) => {
    try {
      const total = questions.length;
      const p = ((index + 1) / total) * 100;

      setTestAnswer((prev) => {
        const newAnswer = [...prev];
        newAnswer[index] = value;
        localStorage.setItem(
          "mindpang-wonyoung-think-score",
          JSON.stringify(newAnswer)
        );
        return newAnswer;
      });

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

  const handleAnswerClick = (optionIndex: number, score: number) => {
    setSelectedIndex(optionIndex);
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
              <Link href="/test/wonyoung-think/result" className="block">
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

