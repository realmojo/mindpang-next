"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Layout from "@/components/Layout";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";

// 음표 순서 (88개)
const noteOrder = [
  "A0",
  "Bb0",
  "B0",
  "C1",
  "Db1",
  "D1",
  "Eb1",
  "E1",
  "F1",
  "Gb1",
  "G1",
  "Ab1",
  "A1",
  "Bb1",
  "B1",
  "C2",
  "Db2",
  "D2",
  "Eb2",
  "E2",
  "F2",
  "Gb2",
  "G2",
  "Ab2",
  "A2",
  "Bb2",
  "B2",
  "C3",
  "Db3",
  "D3",
  "Eb3",
  "E3",
  "F3",
  "Gb3",
  "G3",
  "Ab3",
  "A3",
  "Bb3",
  "B3",
  "C4",
  "Db4",
  "D4",
  "Eb4",
  "E4",
  "F4",
  "Gb4",
  "G4",
  "Ab4",
  "A4",
  "Bb4",
  "B4",
  "C5",
  "Db5",
  "D5",
  "Eb5",
  "E5",
  "F5",
  "Gb5",
  "G5",
  "Ab5",
  "A5",
  "Bb5",
  "B5",
  "C6",
  "Db6",
  "D6",
  "Eb6",
  "E6",
  "F6",
  "Gb6",
  "G6",
  "Ab6",
  "A6",
  "Bb6",
  "B6",
  "C7",
  "Db7",
  "D7",
  "Eb7",
  "E7",
  "F7",
  "Gb7",
  "G7",
  "Ab7",
  "A7",
  "Bb7",
  "B7",
  "C8",
];

// 랜덤 음표 생성 함수 (컴포넌트 외부로 이동)
const generateRandomNote = (currentQuestion: number): string => {
  if (currentQuestion < 10) {
    const octave4Notes = [
      "C4",
      "Db4",
      "D4",
      "Eb4",
      "E4",
      "F4",
      "Gb4",
      "G4",
      "Ab4",
      "A4",
      "Bb4",
      "B4",
    ];
    return octave4Notes[Math.floor(Math.random() * octave4Notes.length)];
  } else {
    return noteOrder[Math.floor(Math.random() * noteOrder.length)];
  }
};

interface Answer {
  question: number;
  correct: string;
  selected: string;
  isCorrect: boolean;
}

export default function PitchPlayPage() {
  const router = useRouter();
  const [currentOctave] = useState(4);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const audioCacheRef = useRef<{ [key: string]: HTMLAudioElement }>({});
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [initialRandomNote, setInitialRandomNote] = useState<string | null>(
    null
  );
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [totalQuestions] = useState(60);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const pianoRef = useRef<HTMLDivElement>(null);

  // 현재 옥타브의 음표들 가져오기
  const getCurrentNotes = useCallback(() => {
    const startIndex = noteOrder.findIndex((note) =>
      note.startsWith(`C${currentOctave}`)
    );
    const endIndex = noteOrder.findIndex((note) =>
      note.startsWith(`C${currentOctave + 1}`)
    );

    if (endIndex === -1) {
      return noteOrder.slice(startIndex);
    }
    return noteOrder.slice(startIndex, endIndex);
  }, [currentOctave]);

  // 흰 건반과 검은 건반 분리
  const getWhiteKeys = useCallback(() => {
    const notes = getCurrentNotes();
    const blackNotes = ["Bb", "Db", "Eb", "Gb", "Ab"];
    const whiteNotes = ["C", "D", "E", "F", "G", "A", "B"];

    return notes
      .filter((note) => {
        const baseNote = note.replace(/\d+/, "");
        if (blackNotes.includes(baseNote)) {
          return false;
        }
        const noteWithoutOctave = baseNote.replace("b", "");
        return whiteNotes.includes(noteWithoutOctave);
      })
      .map((note) => {
        const baseNote = note.replace(/\d+/, "").replace("b", "");
        return {
          note,
          index: noteOrder.indexOf(note),
          label: baseNote,
        };
      });
  }, [getCurrentNotes]);

  const _getBlackKeys = () => {
    const notes = getCurrentNotes();
    const whiteKeysList = getWhiteKeys();
    const blackNotes = ["Bb", "Db", "Eb", "Gb", "Ab"];

    const whiteKeyWidth = 100 / whiteKeysList.length;
    const blackKeyWidth = whiteKeyWidth * 0.65;

    return notes
      .filter((note) => {
        const baseNote = note.replace(/\d+/, "");
        return blackNotes.includes(baseNote);
      })
      .map((note) => {
        const baseNote = note.replace(/\d+/, "");
        let left = 0;

        if (baseNote === "Db") {
          const cIndex = whiteKeysList.findIndex((k) => k.note.startsWith("C"));
          left =
            cIndex >= 0 ? (cIndex + 1) * whiteKeyWidth - blackKeyWidth / 2 : 0;
        } else if (baseNote === "Eb") {
          const dIndex = whiteKeysList.findIndex((k) => k.note.startsWith("D"));
          left =
            dIndex >= 0 ? (dIndex + 1) * whiteKeyWidth - blackKeyWidth / 2 : 0;
        } else if (baseNote === "Gb") {
          const fIndex = whiteKeysList.findIndex((k) => k.note.startsWith("F"));
          left =
            fIndex >= 0 ? (fIndex + 1) * whiteKeyWidth - blackKeyWidth / 2 : 0;
        } else if (baseNote === "Ab") {
          const gIndex = whiteKeysList.findIndex((k) => k.note.startsWith("G"));
          left =
            gIndex >= 0 ? (gIndex + 1) * whiteKeyWidth - blackKeyWidth / 2 : 0;
        } else if (baseNote === "Bb") {
          const aIndex = whiteKeysList.findIndex((k) => k.note.startsWith("A"));
          left =
            aIndex >= 0 ? (aIndex + 1) * whiteKeyWidth - blackKeyWidth / 2 : 0;
        }

        left = Math.max(0, Math.min(100 - blackKeyWidth, left));

        return {
          note,
          index: noteOrder.indexOf(note),
          left: left,
          width: blackKeyWidth,
          label: baseNote,
        };
      });
  };

  const whiteKeys = useMemo(() => getWhiteKeys(), [getWhiteKeys]);
  const blackKeys = useMemo(() => {
    const notes = getCurrentNotes();
    const whiteKeysList = getWhiteKeys();
    const blackNotes = ["Bb", "Db", "Eb", "Gb", "Ab"];

    const whiteKeyWidth = 100 / whiteKeysList.length;
    const blackKeyWidth = whiteKeyWidth * 0.65;

    return notes
      .filter((note) => {
        const baseNote = note.replace(/\d+/, "");
        return blackNotes.includes(baseNote);
      })
      .map((note) => {
        const baseNote = note.replace(/\d+/, "");
        let left = 0;

        if (baseNote === "Db") {
          const cIndex = whiteKeysList.findIndex((k) => k.note.startsWith("C"));
          left =
            cIndex >= 0 ? (cIndex + 1) * whiteKeyWidth - blackKeyWidth / 2 : 0;
        } else if (baseNote === "Eb") {
          const dIndex = whiteKeysList.findIndex((k) => k.note.startsWith("D"));
          left =
            dIndex >= 0 ? (dIndex + 1) * whiteKeyWidth - blackKeyWidth / 2 : 0;
        } else if (baseNote === "Gb") {
          const fIndex = whiteKeysList.findIndex((k) => k.note.startsWith("F"));
          left =
            fIndex >= 0 ? (fIndex + 1) * whiteKeyWidth - blackKeyWidth / 2 : 0;
        } else if (baseNote === "Ab") {
          const gIndex = whiteKeysList.findIndex((k) => k.note.startsWith("G"));
          left =
            gIndex >= 0 ? (gIndex + 1) * whiteKeyWidth - blackKeyWidth / 2 : 0;
        } else if (baseNote === "Bb") {
          const aIndex = whiteKeysList.findIndex((k) => k.note.startsWith("A"));
          left =
            aIndex >= 0 ? (aIndex + 1) * whiteKeyWidth - blackKeyWidth / 2 : 0;
        }

        left = Math.max(0, Math.min(100 - blackKeyWidth, left));

        return {
          note,
          index: noteOrder.indexOf(note),
          left: left,
          width: blackKeyWidth,
          label: baseNote,
        };
      });
  }, [getCurrentNotes, getWhiteKeys]);

  // 옥타브를 제거하고 음표 이름만 추출
  const getNoteName = (note: string) => {
    return note.replace(/\d+/, "");
  };

  // 검은 건반 영역인지 확인
  const isBlackKeyArea = (event: React.MouseEvent | React.TouchEvent) => {
    if (!pianoRef.current) return false;

    const rect = pianoRef.current.getBoundingClientRect();
    const clickX =
      "clientX" in event ? event.clientX : event.touches[0].clientX;
    const clickY =
      "clientY" in event ? event.clientY : event.touches[0].clientY;
    const pianoWidth = rect.width;
    const pianoHeight = rect.height;

    if (clickY - rect.top > pianoHeight * 0.6) return false;

    return blackKeys.some((blackKey) => {
      const blackLeft = (blackKey.left / 100) * pianoWidth;
      const blackRight = blackLeft + (blackKey.width / 100) * pianoWidth;
      return (
        clickX - rect.left >= blackLeft && clickX - rect.left <= blackRight
      );
    });
  };

  // 로컬스토리지에 결과 저장
  const saveResultToLocalStorage = () => {
    const result = {
      total: totalQuestions,
      current: currentQuestion,
      correct: correctCount,
      wrong: wrongCount,
      answers: answers,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("pitch-test-result", JSON.stringify(result));
  };

  // 다음 문제
  const nextQuestion = () => {
    if (currentQuestion >= totalQuestions) {
      saveResultToLocalStorage();
      router.push("/test/pitch/result");
      return;
    }

    setCurrentQuestion((prev) => {
      const nextQuestion = prev + 1;
      const randomNote = generateRandomNote(nextQuestion);
      setInitialRandomNote(randomNote);
      return nextQuestion;
    });
    setShowResult(false);
    setSelectedNote(null);

    const initialNoteIndex = noteOrder.indexOf(randomNote);
    if (initialNoteIndex >= 0) {
      const fileIndex = initialNoteIndex + 1;
      const audioPath = `https://mindpang-image.s3.ap-northeast-2.amazonaws.com/piano-sound/${fileIndex}.mp3`;
      const initialAudio = new Audio(audioPath);
      initialAudio.play().catch((err) => {
        console.error("초기 음표 재생 실패:", err);
      });
    }
  };

  // 음표 재생
  const playNote = (
    note: string,
    index: number,
    event: React.MouseEvent | React.TouchEvent,
    isBlackKey = false
  ) => {
    if (event && !isBlackKey && isBlackKeyArea(event)) {
      return;
    }

    if (showResult) {
      return;
    }

    if (hasUserInteracted && initialRandomNote) {
      setSelectedNote(note);

      const correctNoteName = getNoteName(initialRandomNote);
      const selectedNoteName = getNoteName(note);
      const correct = correctNoteName === selectedNoteName;
      setIsCorrect(correct);

      if (correct) {
        setCorrectCount((prev) => prev + 1);
      } else {
        setWrongCount((prev) => prev + 1);
      }

      const newAnswer: Answer = {
        question: currentQuestion,
        correct: initialRandomNote,
        selected: note,
        isCorrect: correct,
      };

      setAnswers((prev) => [...prev, newAnswer]);
      saveResultToLocalStorage();
      setShowResult(true);

      setTimeout(() => {
        nextQuestion();
      }, 2000);
    }

    const fileIndex = index + 1;
    const audioPath = `https://mindpang-image.s3.ap-northeast-2.amazonaws.com/piano-sound/${fileIndex}.mp3`;

    if (!audioCacheRef.current[note]) {
      audioCacheRef.current[note] = new Audio(audioPath);
    }

    const audio = audioCacheRef.current[note];
    audio.currentTime = 0;
    audio.play().catch((err) => {
      console.error("음악 재생 실패:", err);
    });

    setActiveKey(note);
    setTimeout(() => {
      setActiveKey(null);
    }, 200);
  };

  // 테스트 시작
  const startTest = () => {
    setCurrentQuestion(1);
    setCorrectCount(0);
    setWrongCount(0);
    setAnswers([]);

    const randomNote = generateRandomNote(1);
    setInitialRandomNote(randomNote);
    setHasUserInteracted(true);
    setShowResult(false);
    setSelectedNote(null);

    const initialNoteIndex = noteOrder.indexOf(randomNote);
    if (initialNoteIndex >= 0) {
      const fileIndex = initialNoteIndex + 1;
      const audioPath = `https://mindpang-image.s3.ap-northeast-2.amazonaws.com/piano-sound/${fileIndex}.mp3`;
      const initialAudio = new Audio(audioPath);
      initialAudio.play().catch((err) => {
        console.error("초기 음표 재생 실패:", err);
      });
    }
  };

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (pianoRef.current?.contains(e.target as Node)) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  const percent = hasUserInteracted
    ? Math.floor((currentQuestion / totalQuestions) * 100)
    : 0;

  return (
    <Layout>
      <main className="test-layout pitch flex justify-center flex-col">
        <div className="pitch-container px-4 py-8">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-100">
            절대음감 테스트
          </h1>

          {/* 진행 상황 */}
          {hasUserInteracted && (
            <Card className="mb-4 bg-[#1E1E1E]/80 border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">진행률</span>
                  <span className="text-sm font-semibold text-luxury-gold">
                    {currentQuestion} / {totalQuestions}
                  </span>
                </div>
                <Progress value={percent} className="h-3 bg-luxury-gold/20" />
              </CardContent>
            </Card>
          )}

          {/* 피아노 건반 */}
          <div className="piano-wrapper mb-6">
            <div className="piano" ref={pianoRef}>
              {/* 검은 건반들 */}
              <div className="black-keys">
                {blackKeys.map((key, index) => (
                  <div
                    key={`black-${index}`}
                    className={`black-key ${
                      activeKey === key.note ? "active" : ""
                    }`}
                    style={{
                      left: `${key.left}%`,
                      width: `${key.width}%`,
                    }}
                    onMouseDown={(e) => playNote(key.note, key.index, e, true)}
                    onTouchStart={(e) => playNote(key.note, key.index, e, true)}
                  >
                    <span className="black-key-label">{key.label}</span>
                  </div>
                ))}
              </div>

              {/* 흰 건반들 */}
              <div className="white-keys">
                {whiteKeys.map((key, index) => (
                  <div
                    key={`white-${index}`}
                    className={`white-key ${
                      activeKey === key.note ? "active" : ""
                    }`}
                    onMouseDown={(e) => playNote(key.note, key.index, e)}
                    onTouchStart={(e) => playNote(key.note, key.index, e)}
                  >
                    <span className="key-label">{key.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 시작 버튼 */}
          {!hasUserInteracted && (
            <div className="text-center mb-6">
              <Button
                onClick={startTest}
                className="bg-luxury-gold hover:bg-luxury-gold/90 text-black font-semibold text-lg px-8 py-6 h-auto rounded-full"
              >
                시작하기
              </Button>
            </div>
          )}

          {/* 결과 표시 */}
          {showResult && (
            <Card
              className={`mt-6 ${
                isCorrect
                  ? "bg-green-500/10 border-green-500/30"
                  : "bg-red-500/10 border-red-500/30"
              }`}
            >
              <CardContent className="p-6 text-center">
                {isCorrect ? (
                  <div>
                    <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-500 mb-2">
                      정답입니다! ✓
                    </p>
                    <p className="text-sm mt-2 text-gray-300">
                      재생된 음: {initialRandomNote?.replace(/[0-9]/g, "")}
                    </p>
                    <p className="text-sm mt-1 text-gray-300">
                      선택한 음: {selectedNote?.replace(/[0-9]/g, "")}
                    </p>
                  </div>
                ) : (
                  <div>
                    <XCircle className="w-12 h-12 text-red-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-red-500 mb-2">
                      틀렸습니다 ✗
                    </p>
                    <p className="text-sm mt-2 text-gray-300">
                      재생된 음: {initialRandomNote?.replace(/[0-9]/g, "")}
                    </p>
                    <p className="text-sm mt-1 text-gray-300">
                      선택한 음: {selectedNote?.replace(/[0-9]/g, "")}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <style jsx>{`
        .pitch-container {
          width: 100%;
          overflow-x: auto;
        }

        .piano-wrapper {
          width: 100%;
          margin: 0 auto;
          position: relative;
          padding-bottom: 20px;
        }

        .piano {
          position: relative;
          width: 100%;
          height: 300px;
          background: linear-gradient(to bottom, #f5f5f5 0%, #e0e0e0 100%);
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          overflow: visible;
        }

        .white-keys {
          display: flex;
          width: 100%;
          height: 100%;
          position: relative;
          z-index: 1;
        }

        .white-key {
          flex: 1;
          height: 100%;
          background: linear-gradient(to bottom, #ffffff 0%, #f0f0f0 100%);
          border-right: 1px solid #ccc;
          position: relative;
          cursor: pointer;
          user-select: none;
          transition: background 0.1s;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 10px;
          overflow: visible;
        }

        .white-key:last-child {
          border-right: none;
        }

        .white-key:hover {
          background: linear-gradient(to bottom, #f5f5f5 0%, #e5e5e5 100%);
        }

        .white-key.active {
          background: linear-gradient(to bottom, #ffd700 0%, #ffb300 100%);
        }

        .white-key:active {
          background: linear-gradient(to bottom, #ffb300 0%, #ff9800 100%);
        }

        .key-label {
          font-size: 12px;
          color: #666;
          font-weight: bold;
          pointer-events: none;
        }

        .black-key-label {
          font-size: 10px;
          color: #fff;
          font-weight: bold;
          pointer-events: none;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
        }

        .black-keys {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 60%;
          pointer-events: none;
          z-index: 10;
        }

        .black-key {
          position: absolute;
          height: 100%;
          background: linear-gradient(to bottom, #1a1a1a 0%, #000000 100%);
          border: none;
          border-radius: 0 0 8px 8px;
          cursor: pointer;
          user-select: none;
          pointer-events: auto;
          transition: background 0.1s, transform 0.05s;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.8),
            inset 0 -3px 6px rgba(255, 255, 255, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 8px;
        }

        .black-key:hover {
          background: linear-gradient(to bottom, #3c3c3c 0%, #1a1a1a 100%);
        }

        .black-key.active {
          background: linear-gradient(to bottom, #ffd700 0%, #ffb300 100%);
        }

        .black-key:active {
          background: linear-gradient(to bottom, #ffb300 0%, #ff9800 100%);
        }

        @media (max-width: 480px) {
          .piano {
            height: 250px;
          }

          .key-label {
            font-size: 10px;
          }
        }
      `}</style>
    </Layout>
  );
}
