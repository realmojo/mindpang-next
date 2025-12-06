"use client";

import { useState, useEffect, useRef } from "react";
import Layout from "@/components/Layout";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

export default function SpeedPlayPage() {
  const router = useRouter();
  const [isChange, setIsChange] = useState(false);
  const [result, setResult] = useState<number[]>([]);
  const [startTime, setStartTime] = useState(0);
  const [_endTime, setEndTime] = useState(0);
  const [diff, setDiff] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const doClick = () => {
    if (isChange) {
      const end = new Date().getTime();
      setEndTime(end);

      const difference = end - startTime;
      setDiff(difference);

      const newResult = [...result, difference];
      setResult(newResult);

      if (typeof window !== "undefined") {
        localStorage.setItem("mindpang-speed-score", JSON.stringify(newResult));
      }

      if (newResult.length === 5) {
        setTimeout(() => {
          router.push("/test/speed/complete");
        }, 3000);
      } else {
        setTimeout(() => {
          setIsChange(false);
          init();
        }, 2000);
      }
    } else {
      alert("너무 빨라요!");
    }
  };

  const init = () => {
    if (initTimeoutRef.current) {
      clearTimeout(initTimeoutRef.current);
    }

    initTimeoutRef.current = setTimeout(() => {
      setIsChange(true);
      setDiff(0);
      const start = new Date().getTime();
      setStartTime(start);
    }, 3000);
  };

  useEffect(() => {
    init();

    const timeoutCurrent = timeoutRef.current;
    const initTimeoutCurrent = initTimeoutRef.current;
    return () => {
      if (timeoutCurrent) {
        clearTimeout(timeoutCurrent);
      }
      if (initTimeoutCurrent) {
        clearTimeout(initTimeoutCurrent);
      }
    };
  }, []);

  return (
    <Layout>
      <main className="speed-layout site-layout flex text-center flex-col bg-gray-800">
        <div className="mb-10 speed-font-size">
          {result.length === 5 ? (
            <Card className="bg-[#1E1E1E]/80 border-white/10">
              <CardContent className="p-6">
                <p className="text-gray-300 text-xl">
                  결과를 기다리는 중입니다...
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-[#1E1E1E]/80 border-white/10">
              <CardContent className="p-6">
                <p className="text-gray-300 text-xl">
                  초록색이 나오면 터치하세요 ({result.length}/5)
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        <div
          className={`speed-circle pt-8 speed-font-size cursor-pointer transition-all duration-300 ${
            isChange
              ? "bg-green-400 hover:bg-green-500"
              : "bg-red-500 hover:bg-red-600"
          }`}
          onClick={doClick}
        >
          {isChange && (
            <div className="text-4xl font-bold text-white">{diff} ms</div>
          )}
        </div>
      </main>

      <style jsx>{`
        .speed-layout {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .speed-font-size {
          font-size: 1.5rem;
        }

        .speed-circle {
          width: 300px;
          height: 300px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
        }

        .speed-circle:active {
          transform: scale(0.95);
        }

        @media (max-width: 480px) {
          .speed-circle {
            width: 250px;
            height: 250px;
          }

          .speed-font-size {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </Layout>
  );
}
