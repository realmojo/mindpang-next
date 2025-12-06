"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";

// Helper functions moved outside component to avoid render-time impurity
// Note: This function is only used in calculateResult, which is called from event handlers

interface Content {
  title: {
    text?: string;
    url?: string;
  };
  questions: Array<{
    text: string;
    score?: number | string;
  }>;
  answer?: number;
}

interface TestItem {
  title: string;
  category: string;
  link: string;
  type: string;
  contents: Content[];
  results?: Array<{
    min?: number;
    max?: number;
    url?: string;
    text: string;
    totalCount?: number;
  }>;
  adsenses?: {
    loading?: string;
  };
}

export default function PlayPage() {
  const params = useParams();
  const router = useRouter();
  const category = params.category as string;
  const link = params.link as string;

  const [item, setItem] = useState<TestItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [testAnswer, setTestAnswer] = useState<number[]>([]);
  const [percent, setPercent] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const url = `/api/content?link=${link}`;
      const response = await fetch(url);
      const data = await response.json();
      setItem(data);
      if (typeof window !== "undefined") {
        localStorage.setItem("mindpang-content-type", data.type);
      }
    };
    fetchData();
  }, [link]);

  const getRandomNumber = useCallback((min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }, []);

  const findIndexOfMax = (arr: number[]) => {
    if (arr.length === 0) {
      return -1;
    }
    let maxIndex = 0;
    let maxValue = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > maxValue) {
        maxValue = arr[i];
        maxIndex = i;
      }
    }
    return maxIndex;
  };

  const calculateResult = (item: TestItem, answers: number[]) => {
    if (!item.results || item.results.length === 0) {
      return;
    }

    let totalCount = 0;

    if (item.contents.length > 0) {
      for (const i in item.contents) {
        const content = item.contents[i];
        const answerIndex = parseInt(i);

        if (item.type === "answer") {
          if (
            content.answer !== undefined &&
            content.answer === answers[answerIndex]
          ) {
            totalCount++;
          }
        } else if (item.type === "score") {
          const question = content.questions[answers[answerIndex]];
          if (question && question.score !== undefined) {
            const score =
              typeof question.score === "string"
                ? parseInt(question.score)
                : question.score;
            totalCount += score || 0;
          }
        }
      }

      let countIndex = 0;
      if (item.type === "count") {
        const answerCount = [0, 0, 0, 0, 0, 0];
        for (const number of answers) {
          if (number >= 0 && number < answerCount.length) {
            answerCount[number] += 1;
          }
        }
        countIndex = findIndexOfMax(answerCount);
      }

      let results = null;
      if (item.type === "random") {
        if (item.results && item.results.length > 0) {
          const ran = getRandomNumber(0, item.results.length - 1);
          results = { ...item.results[ran], totalCount };
        }
      } else if (item.type === "count") {
        if (item.results && item.results[countIndex]) {
          results = { ...item.results[countIndex], totalCount };
        }
      } else {
        if (item.results) {
          for (const result of item.results) {
            const min = result.min ?? -Infinity;
            const max = result.max ?? Infinity;
            if (min <= totalCount && totalCount <= max) {
              results = result;
              break;
            }
          }
        }
      }

      if (results) {
        if (typeof window !== "undefined") {
          localStorage.setItem("mindpang-test-item", JSON.stringify(item));
          localStorage.setItem("mindpang-test-result", JSON.stringify(results));
        }
      }
    }
  };

  const doQuestionNext = (index: number, value: number) => {
    if (!item) return;

    try {
      const total = item.contents.length;
      const p = ((index + 1) / total) * 100;
      const newAnswers = [...testAnswer];
      newAnswers[index] = value;
      setTestAnswer(newAnswers);

      if (typeof window !== "undefined") {
        localStorage.setItem("mindpang-answer", JSON.stringify(newAnswers));
      }

      if (item.contents.length - 1 === index) {
        setIsLoading(true);
        // Calculate result
        calculateResult(item, newAnswers);
        // Wait a bit then navigate to result
        setTimeout(() => {
          router.push(`/${category}/${link}/result`);
        }, 2000);
      } else {
        setCurrentSlide(index + 1);
        setPercent(Math.floor(p));
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (!item) {
    return (
      <Layout>
        <div className="flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-luxury-gold" />
            <p className="text-gray-400">테스트를 불러오는 중...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (isLoading) {
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

  const currentContent = item.contents[currentSlide];

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
                  {currentSlide + 1} / {item.contents.length}
                </span>
              </div>
              <Progress value={percent} className="h-3 bg-luxury-gold/20" />
            </CardContent>
          </Card>

          {/* Question Card */}
          {currentContent && (
            <Card className="bg-[#1E1E1E]/90 border-white/10 hover:border-luxury-gold/30 transition-all duration-300">
              <CardHeader>
                {currentContent.title?.text && (
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-2xl font-serif font-bold text-luxury-gold">
                      Q {currentSlide + 1}
                    </h2>
                  </div>
                )}
                {currentContent.title?.text && (
                  <p className="text-lg text-gray-200 leading-relaxed">
                    {currentContent.title.text}
                  </p>
                )}
              </CardHeader>
              <CardContent className="space-y-3">
                {currentContent.title?.url && (
                  <div className="mb-4">
                    <img
                      className="w-full h-auto rounded-lg"
                      src={currentContent.title.url}
                      alt={currentContent.title.text || ""}
                      loading="lazy"
                    />
                  </div>
                )}
                {currentContent.questions.map((question, qIndex) => (
                  <Button
                    key={qIndex}
                    onClick={() => doQuestionNext(currentSlide, qIndex)}
                    className="w-full text-left justify-start h-auto py-4 px-4 text-base md:text-lg transition-all duration-200 bg-transparent border-luxury-gold/40 text-luxury-gold hover:border-luxury-gold hover:bg-luxury-gold/10 hover:scale-105"
                    variant="outline"
                  >
                    <span className="flex-1">{question.text}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
}
