"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface FshareProps {
  title: string;
  url: string;
  imageUrl?: string;
}

declare global {
  interface Window {
    Kakao?: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Link: {
        createDefaultButton: (options: {
          container: string;
          objectType: string;
          content: {
            title: string;
            description: string;
            imageUrl?: string;
            link: {
              mobileWebUrl: string;
              webUrl: string;
            };
          };
          buttons: Array<{
            title: string;
            link: {
              mobileWebUrl: string;
              webUrl: string;
            };
          }>;
        }) => void;
      };
    };
  }
}

export default function Fshare({ title, url, imageUrl }: FshareProps) {
  const kakaoButtonRef = useRef<HTMLDivElement>(null);
  const [kakaoButtonCreated, setKakaoButtonCreated] = useState(false);

  const shareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}&t=${title}`,
      "_blank",
      "width=600,height=400"
    );
  };

  const copy = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(() => {
        alert("URL이 복사되었습니다.");
      });
    } else {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      textarea.setSelectionRange(0, 9999);
      document.execCommand("copy");
      document.body.removeChild(textarea);
      alert("URL이 복사되었습니다.");
    }
  };

  const createKakaoButton = () => {
    if (typeof window === "undefined") return;

    // kakao sdk script이 정상적으로 불러와졌으면 window.Kakao로 접근이 가능합니다
    if (window.Kakao && kakaoButtonRef.current) {
      const kakao = window.Kakao;
      // 중복 initialization 방지
      if (!kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        kakao.init("4620ebc4c39b8b6bb94e0e471b33de8c");
      }

      try {
        kakao.Link.createDefaultButton({
          // Render 부분 id=kakao-link-btn 을 찾아 그부분에 렌더링을 합니다
          container: "#kakao-link-btn",
          objectType: "feed",
          content: {
            title: title,
            description: title,
            imageUrl: imageUrl || "",
            link: {
              mobileWebUrl: url,
              webUrl: url,
            },
          },
          buttons: [
            {
              title: "플레이 하기",
              link: {
                mobileWebUrl: url,
                webUrl: url,
              },
            },
          ],
        });
        // 약간의 딜레이 후 상태 업데이트 (카카오 SDK가 DOM 조작을 완료할 시간 제공)
        setTimeout(() => {
          setKakaoButtonCreated(true);
        }, 100);
      } catch (error) {
        console.error("Kakao button creation failed:", error);
        // 실패해도 SVG는 보여주기
      }
    }
  };

  useEffect(() => {
    // 초기 상태 리셋
    setKakaoButtonCreated(false);

    // Kakao SDK가 로드될 때까지 대기
    const checkKakaoSDK = () => {
      if (window.Kakao && kakaoButtonRef.current) {
        createKakaoButton();
      } else {
        // SDK가 아직 로드되지 않았다면 잠시 후 다시 시도
        const timeoutId = setTimeout(checkKakaoSDK, 100);
        return () => clearTimeout(timeoutId);
      }
    };

    const timeoutId = setTimeout(checkKakaoSDK, 100);

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      // 컴포넌트 언마운트 시 카카오 버튼 정리
      if (kakaoButtonRef.current) {
        const container = kakaoButtonRef.current;
        while (container.firstChild) {
          try {
            container.removeChild(container.firstChild);
          } catch (e) {
            break;
          }
        }
      }
    };
  }, [title, url, imageUrl]);

  return (
    <div className="flex flex-col items-center space-y-8 py-8">
      {/* 카카오 채널 구독 유도 */}
      <div className="flex flex-col items-center justify-center space-y-4">
        <p className="text-center text-lg font-serif font-bold text-gray-400">
          카카오 채널 구독하고 최신 소식을
          <br />
          <span className="text-luxury-gold">가장 빠르게</span> 받아보세요!
        </p>
        <a
          href="https://pf.kakao.com/_lxdYWxj"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center w-16 h-16 rounded-full border-2 border-luxury-gold hover:bg-luxury-gold transition-all duration-300"
        >
          {/* Kakao Channel Icon */}
          <svg
            className="w-8 h-8 text-luxury-gold group-hover:text-black fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M12 3c-4.97 0-9 3.13-9 7 0 2.49 1.69 4.69 4.28 5.92-.15.56-.55 2.04-.63 2.34-.1.35.13.47.36.31.25-.17 2.78-1.89 3.25-2.21.57.08 1.15.13 1.74.13 4.97 0 9-3.13 9-7s-4.03-7-9-7z" />
          </svg>
        </a>
      </div>

      <div className="text-center text-lg font-serif font-bold text-gray-500">
        👇 친구들에게도 공유해보세요 👇
      </div>

      {/* 공유 아이콘들 */}
      <div className="flex justify-center items-center gap-6">
        {/* X (Twitter) */}
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            title
          )}&url=${encodeURIComponent(url)}&hashtags=마인드팡`}
          target="_blank"
          rel="noopener noreferrer"
          className="group p-3 rounded-full border border-luxury-gold/30 hover:border-luxury-gold hover:bg-luxury-gold/10 transition-all duration-300"
        >
          <svg
            className="w-6 h-6 text-luxury-gold group-hover:text-luxury-gold fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>

        {/* Facebook */}
        <button
          onClick={shareFacebook}
          className="group p-3 rounded-full border border-luxury-gold/30 hover:border-luxury-gold hover:bg-luxury-gold/10 transition-all duration-300 cursor-pointer"
        >
          <svg
            className="w-6 h-6 text-luxury-gold group-hover:text-luxury-gold fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978 1.403 0 2.465.26 2.465.26v3.718h-1.882c-1.111 0-1.279.46-1.279 1.633v1.947h3.732l-.615 3.667h-3.117v7.98h-5.162z" />
          </svg>
        </button>

        {/* Kakao */}
        <div
          id="kakao-link-btn"
          ref={kakaoButtonRef as unknown as React.RefObject<HTMLDivElement>}
          className="cursor-pointer group p-3 rounded-full border border-luxury-gold/30 hover:border-luxury-gold hover:bg-luxury-gold/10 transition-all duration-300 relative min-w-[48px] min-h-[48px] flex items-center justify-center"
        >
          {/* {!kakaoButtonCreated && ( */}
          <svg
            className="w-6 h-6 text-luxury-gold group-hover:text-luxury-gold fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M12 3c-4.97 0-9 3.13-9 7 0 2.49 1.69 4.69 4.28 5.92-.15.56-.55 2.04-.63 2.34-.1.35.13.47.36.31.25-.17 2.78-1.89 3.25-2.21.57.08 1.15.13 1.74.13 4.97 0 9-3.13 9-7s-4.03-7-9-7z" />
          </svg>
          {/* )} */}
        </div>

        {/* Link Copy */}
        <button
          onClick={copy}
          className="group p-3 rounded-full border border-luxury-gold/30 hover:border-luxury-gold hover:bg-luxury-gold/10 transition-all duration-300 cursor-pointer"
        >
          <svg
            className="w-6 h-6 text-luxury-gold group-hover:text-luxury-gold fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
          </svg>
        </button>
      </div>

      {/* 다시하기 버튼 */}
      <div className="w-full p-4">
        <Link href={url}>
          <Button
            variant="outline"
            className="w-full border-luxury-gold/30 hover:bg-luxury-gold/10 hover:border-luxury-gold"
          >
            다시하기
          </Button>
        </Link>
      </div>
    </div>
  );
}
