"use client";

import { useState, useCallback } from "react";
import Layout from "@/components/Layout";
import Fshare from "@/components/Fshare";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, RotateCcw } from "lucide-react";

interface Answer {
  question: number;
  correct: string;
  selected: string;
  isCorrect: boolean;
}

interface ResultData {
  total: number;
  current: number;
  correct: number;
  wrong: number;
  answers: Answer[];
  timestamp: string;
}

export default function PitchResultPage() {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(60);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 점수에 따른 배지 클래스 반환
  const getBadgeClass = (score: number) => {
    if (0 <= score && score < 15) {
      return "bg-gray-500/20 text-gray-300 border-2 border-gray-500";
    } else if (15 <= score && score < 35) {
      return "bg-blue-500/20 text-blue-300 border-2 border-blue-500";
    } else if (35 <= score && score < 55) {
      return "bg-purple-500/20 text-purple-300 border-2 border-purple-500";
    } else if (55 <= score && score < 60) {
      return "bg-yellow-500/20 text-yellow-300 border-2 border-yellow-500";
    } else if (score === 60) {
      return "bg-gradient-to-r from-yellow-400/30 to-yellow-600/30 text-yellow-200 border-2 border-yellow-400";
    }
    return "bg-gray-500/20 text-gray-300 border-2 border-gray-500";
  };

  useCallback(() => {
    if (typeof window === "undefined") return;

    const resultData = localStorage.getItem("pitch-test-result");

    if (resultData) {
      try {
        const result: ResultData = JSON.parse(resultData);
        setScore(result.correct || 0);
        setTotal(result.total || 60);
        setCorrect(result.correct || 0);
        setWrong(result.wrong || 0);
        setAnswers(result.answers || []);

        const finalScore = result.correct || 0;

        if (0 <= finalScore && finalScore < 15) {
          setName("초보 수준");
          setText(
            "당신은 절대음감에 대해 기본적인 음감을 가지고 있습니다. 음감에 대해 잘 모르시더라도 음악을 즐기기에는 충분합니다."
          );
        } else if (15 <= finalScore && finalScore < 35) {
          setName("취미 수준");
          setText(
            "당신의 절대음감은 취미 수준 입니다. 평소에 악기를 즐거하거나 어렸을 때 악기를 하시는 등 취미로 즐기고 있으신거 같습니다."
          );
        } else if (35 <= finalScore && finalScore < 55) {
          setName("전공자 수준");
          setText(
            "당신의 절대음감은 전공자 수준 입니다. 절대음감까지는 아니지만 다양한 악기를 듣는 훈련을 통해 상대음감도 가지고 있는 것 같습니다."
          );
        } else if (55 <= finalScore && finalScore < 60) {
          setName("프로 수준");
          setText(
            "당신의 절대음감은 프로 수준입니다. 피아니스트 혹은 작곡가 들에게서 대부분 음을 들을 수 있습니다. 어렸을 때 부터 재능이 있거나 엄청나게 훈련을 하셨네요."
          );
        } else if (finalScore === 60) {
          setName("절대음감 신");
          setText(
            "모든 음을 맞추셨습니다. 10,000명중에 1명꼴로 나타나는 절대음감 능력입니다. 당신의 음감은 상위 0.01% 입니다."
          );
        }
      } catch (error) {
        console.error("결과 데이터 파싱 실패:", error);
        setName("결과 없음");
        setText("결과를 불러올 수 없습니다. 테스트를 다시 진행해주세요.");
      }
    } else {
      setName("결과 없음");
      setText("결과를 찾을 수 없습니다. 테스트를 먼저 진행해주세요.");
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-400">결과를 불러오는 중...</p>
          </div>
        </div>
      </Layout>
    );
  }

  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <Layout>
      <main className="test-layout flex justify-center flex-col">
        <div className="pt-4">
          <div>
            <h1 className="text-center text-3xl mb-4 font-bold text-gray-100">
              절대음감 테스트 결과
            </h1>

            {/* AdSense */}
            <div className="my-6">
              <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-9130836798889522"
                data-ad-slot="8764169614"
                data-ad-format="auto"
                data-full-width-responsive="true"
              ></ins>
            </div>

            {/* 결과 카드 */}
            <div className="result-card-container px-4 pt-6">
              <Card className="result-card glass-card rounded-2xl p-6 mb-6 bg-[#1E1E1E]/90 border-white/10">
                {/* 등급 배지 */}
                <div className="text-center mb-6">
                  <div
                    className={`inline-block px-6 py-3 rounded-full text-3xl font-bold mb-4 result-badge ${getBadgeClass(
                      score
                    )}`}
                  >
                    {name}
                  </div>
                </div>

                {/* 점수 표시 */}
                <div className="score-display text-center mb-6">
                  <div className="score-circle mx-auto mb-4">
                    <div className="score-inner">
                      <div className="score-number text-5xl font-bold text-luxury-gold">
                        {score}
                      </div>
                      <div className="score-total text-xl text-gray-400">
                        / {total}
                      </div>
                    </div>
                  </div>
                  <div className="score-percentage text-2xl font-semibold text-luxury-gold">
                    {percentage}%
                  </div>
                </div>

                {/* 통계 카드 */}
                <div className="stats-grid grid grid-cols-2 gap-4 mb-6">
                  <Card className="stat-card bg-green-500/10 rounded-xl p-4 text-center border-green-500/30">
                    <CardContent className="p-0">
                      <div className="stat-icon text-3xl mb-2">
                        <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto" />
                      </div>
                      <div className="stat-number text-3xl font-bold text-green-500">
                        {correct}
                      </div>
                      <div className="stat-label text-sm text-gray-400">
                        정답
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="stat-card bg-red-500/10 rounded-xl p-4 text-center border-red-500/30">
                    <CardContent className="p-0">
                      <div className="stat-icon text-3xl mb-2">
                        <XCircle className="w-8 h-8 text-red-500 mx-auto" />
                      </div>
                      <div className="stat-number text-3xl font-bold text-red-500">
                        {wrong}
                      </div>
                      <div className="stat-label text-sm text-gray-400">
                        오답
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* 설명 텍스트 */}
                <Card className="result-description text-center px-4 py-6 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-white/10">
                  <CardContent className="p-0">
                    <p className="text-gray-300 leading-relaxed">{text}</p>
                  </CardContent>
                </Card>
              </Card>
            </div>

            {/* AdSense */}
            <div className="my-6">
              <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-9130836798889522"
                data-ad-slot="8820009937"
                data-ad-format="auto"
                data-full-width-responsive="true"
              ></ins>
            </div>

            {/* 결과 테이블 */}
            {answers.length > 0 && (
              <div className="px-4 mt-8 mb-8">
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-100">
                  상세 결과
                </h2>
                <div className="overflow-x-auto">
                  <Card className="bg-[#1E1E1E]/80 border-white/10">
                    <CardContent className="p-0">
                      <table className="table w-full">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="text-center p-4 text-gray-300">
                              문제
                            </th>
                            <th className="text-center p-4 text-gray-300">
                              재생된 음
                            </th>
                            <th className="text-center p-4 text-gray-300">
                              선택한 음
                            </th>
                            <th className="text-center p-4 text-gray-300">
                              결과
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {answers.map((answer, index) => (
                            <tr
                              key={index}
                              className={`border-b border-white/5 ${
                                answer.isCorrect
                                  ? "text-green-400"
                                  : "text-red-400"
                              }`}
                            >
                              <td className="text-center p-4 font-bold">
                                {answer.question}
                              </td>
                              <td className="text-center p-4">
                                {answer.correct}
                              </td>
                              <td className="text-center p-4">
                                {answer.selected}
                              </td>
                              <td className="text-center p-4">
                                {answer.isCorrect ? (
                                  <span className="font-bold">✓ 정답</span>
                                ) : (
                                  <span className="font-bold">✗ 오답</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>

          <div className="text-center mt-6 mb-4">
            <Link href="/test/pitch">
              <Button className="bg-luxury-gold hover:bg-luxury-gold/90 text-black font-semibold">
                <RotateCcw className="mr-2 w-4 h-4" />
                다시 테스트하기
              </Button>
            </Link>
          </div>

          <Fshare
            title="절대음감 테스트 결과 - 마인드팡"
            imageUrl="https://mindpang-image.s3.ap-northeast-2.amazonaws.com/pitch.png"
            url="https://mindpang.com/test/pitch"
          />
        </div>
      </main>

      <style jsx>{`
        .result-card-container {
          max-width: 600px;
          margin: 0 auto;
        }

        .result-badge {
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          animation: fadeInUp 0.6s ease-out;
        }

        .score-display {
          animation: fadeInUp 0.8s ease-out;
        }

        .score-circle {
          width: 180px;
          height: 180px;
          border-radius: 50%;
          background: linear-gradient(
            135deg,
            rgba(59, 130, 246, 0.2),
            rgba(139, 92, 246, 0.2)
          );
          border: 3px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3),
            inset 0 0 20px rgba(255, 255, 255, 0.05);
          position: relative;
          overflow: hidden;
        }

        .score-circle::before {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(
            from 0deg,
            transparent,
            rgba(59, 130, 246, 0.3),
            transparent 30%,
            transparent 70%,
            rgba(139, 92, 246, 0.3),
            transparent
          );
          animation: rotate 3s linear infinite;
        }

        .score-inner {
          position: relative;
          z-index: 1;
          background: rgba(20, 20, 20, 0.9);
          width: 160px;
          height: 160px;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .stats-grid {
          animation: fadeInUp 1s ease-out;
        }

        .stat-card {
          backdrop-filter: blur(10px);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }

        .result-description {
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          animation: fadeInUp 1.2s ease-out;
          line-height: 1.8;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 480px) {
          .score-circle {
            width: 150px;
            height: 150px;
          }

          .score-inner {
            width: 130px;
            height: 130px;
          }

          .score-number {
            font-size: 2.5rem;
          }

          .result-badge {
            font-size: 1.5rem;
            padding: 0.75rem 1.5rem;
          }
        }
      `}</style>
    </Layout>
  );
}
