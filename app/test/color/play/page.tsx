"use client";

import { useState, useEffect, useRef } from "react";
import Layout from "@/components/Layout";
import { useRouter } from "next/navigation";
import {
  stages,
  getRandomNumber,
  easyColor,
  mediumColor,
  hardColor,
  crazyColor,
} from "@/lib/stage";

interface Stage {
  name: string;
  level: number;
  tileNumber: number;
  answerKey: number;
}

export default function ColorPlayPage() {
  const router = useRouter();
  const [boardWidth, setBoardWidth] = useState(448);
  const [tileHeight, setTileHeight] = useState(0);
  const [level, setLevel] = useState(1);
  const [stage, setStage] = useState<Stage>({
    level: 1,
    tileNumber: 2,
    answerKey: 0,
    name: "easy",
  });
  const [tileColor, setTileColor] = useState({
    normalColor: "#55efc4",
    answerColor: "#00b894",
  });
  const [tileColorRandomNumber, setTileColorRandomNumber] = useState(
    getRandomNumber(9)
  );
  const [timerTime, setTimerTime] = useState(15);
  const [isStart, setIsStart] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const gutter = 8;

  const getTileCount = () => {
    const tileNumber = stage?.tileNumber || 2;
    return Math.max(1, tileNumber * tileNumber);
  };

  const initHeight = (st: Stage) => {
    if (typeof window === "undefined") return;
    // DOM이 업데이트된 후에 높이를 계산하기 위해 약간의 지연
    setTimeout(() => {
      const tiles = document.getElementsByClassName("tile-inner");
      if (tiles.length > 0) {
        const firstTile = tiles[0] as HTMLElement;
        const height = firstTile.offsetWidth - gutter;
        setTileHeight(height);
      }
    }, 0);
  };

  const initStageTile = (st: Stage) => {
    const randomNum = getRandomNumber(9);
    setTileColorRandomNumber(randomNum);

    if (st.name === "easy") {
      setTileColor(easyColor[randomNum]);
    } else if (st.name === "medium") {
      setTileColor(mediumColor[randomNum]);
    } else if (st.name === "hard") {
      setTileColor(hardColor[randomNum]);
    } else if (st.name === "crazy") {
      setTileColor(crazyColor[randomNum]);
    }

    // 색상이 설정된 후 높이 계산
    initHeight(st);
  };

  const doClick = (i: number) => {
    if (timerTime <= 0) {
      localStorage.setItem("mindpang-color-level", stage.level.toString());
      router.push("/test/color/result");
    } else if (stage.answerKey === i) {
      localStorage.setItem("mindpang-color-level", stage.level.toString());
      doNextStage();
    } else {
      setTimerTime((prev) => Math.max(0, prev - 2));
    }
  };

  const doNextStage = () => {
    if (stage.level === 60) {
      localStorage.setItem("mindpang-color-level", stage.level.toString());
      router.push("/test/color/result");
    } else {
      setTimerTime(15);
      const nextStage = stages[stage.level];
      setStage(nextStage);
      setLevel(nextStage.level);
      // stage가 업데이트된 후에 initStageTile 호출
      setTimeout(() => {
        initStageTile(nextStage);
      }, 0);
    }
  };

  const intervalTimerInit = () => {
    const interval = setInterval(() => {
      setTimerTime((prev) => {
        const newTime = prev - 1;
        if (newTime <= 0) {
          if (typeof window !== "undefined") {
            localStorage.setItem(
              "mindpang-color-level",
              stage.level.toString()
            );
          }
          router.push("/test/color/result");
          clearInterval(interval);
          intervalRef.current = null;
          return 0;
        }
        return newTime;
      });
    }, 1000);
    intervalRef.current = interval;
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    // localStorage에서 저장된 레벨 불러오기
    const savedLevel = localStorage.getItem("mindpang-color-level");
    let initialLevel = 1;
    if (savedLevel) {
      const parsedLevel = parseInt(savedLevel, 10);
      if (!isNaN(parsedLevel) && parsedLevel >= 1 && parsedLevel <= 60) {
        initialLevel = parsedLevel;
      }
    }
    setLevel(initialLevel);

    // 먼저 스테이지 데이터 초기화
    const initStage =
      stages && stages.length > 0
        ? stages[initialLevel - 1]
        : {
            level: 1,
            tileNumber: 2,
            answerKey: 0,
            name: "easy",
          };
    setStage(initStage);

    // 클라이언트에서만 window 객체에 접근
    const width = window.innerWidth - 20 > 448 ? 448 : window.innerWidth - 20;
    setBoardWidth(width);

    setTimeout(() => {
      setIsStart(true);
      intervalTimerInit();
    }, 3800);

    setTimeout(() => {
      initStageTile(initStage);
    }, 10);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  const tileCount = getTileCount();
  const gridCols = stage.tileNumber || 2;

  useEffect(() => {
    if (typeof window === "undefined") return;
    // stage가 변경되면 타일 높이를 다시 계산
    const timer = setTimeout(() => {
      initHeight(stage);
    }, 50);
    return () => clearTimeout(timer);
  }, [stage]);

  return (
    <Layout>
      <main className="site-layout flex justify-center flex-col">
        <div className="opacity-100">
          <h1 className="text-3xl text-center pt-4 text-luxury-gold">
            Level {stage.level}
          </h1>
          <div className="text-2xl text-center text-orange-300">
            {timerTime}
          </div>
          {boardWidth > 0 && (
            <div
              className="board-wrap text-center pt-4"
              style={{
                minWidth: `${boardWidth}px`,
                maxWidth: `${boardWidth}px`,
                minHeight: `${boardWidth}px`,
                maxHeight: `${boardWidth}px`,
                margin: "0 auto",
              }}
            >
              <div
                className="grid gap-2"
                style={{
                  gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
                }}
              >
                {Array.from({ length: tileCount }).map((_, index) => (
                  <div
                    key={index}
                    onClick={() => doClick(index)}
                    className="tile-inner"
                    style={{
                      height: `${tileHeight}px`,
                      backgroundColor:
                        stage.answerKey === index
                          ? tileColor.answerColor
                          : tileColor.normalColor,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}
