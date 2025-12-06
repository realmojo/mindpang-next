"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Loader2, Shirt } from "lucide-react";
import Fshare from "@/components/Fshare";

export default function FashionMBTIResultPage() {
  const searchParams = useSearchParams();
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const resultStr = localStorage.getItem("mindpang-fashion-mbti-answer");
    if (!resultStr) {
      window.location.href = "/test/fashion-mbti";
      return;
    }

    const result = JSON.parse(resultStr);
    const I_SCORE = result.I.score;
    const E_SCORE = result.E.score;
    const S_SCORE = result.S.score;
    const N_SCORE = result.N.score;
    const T_SCORE = result.T.score;
    const F_SCORE = result.F.score;
    const J_SCORE = result.J.score;
    const P_SCORE = result.P.score;

    const I_TEXT =
      "<strong>(I)</strong> 내향적인 사람들은 자신만의 독특한 스타일을 중시하며, 편안함과 개인적인 만족을 우선시합니다. 이들은 쇼핑할 때 혼자 하기를 선호하며, 자신에게 잘 어울리는 옷을 찾는 데 시간을 투자합니다. 패션은 이들에게 개인적인 취향과 개성을 표현하는 방법입니다.";
    const E_TEXT =
      "<strong>(E)</strong> 외향적인 사람들은 패션에 있어서 최신 트렌드를 따르고, 사람들이 많이 모이는 장소에서 주목받는 스타일을 선호합니다. 이들은 쇼핑할 때 친구들과 함께 하기를 좋아하며, 새로운 패션 아이템을 시도하는 데 거리낌이 없습니다. 이들에게 패션은 자기 표현의 중요한 수단입니다.";
    const S_TEXT =
      "<strong>(S)</strong> 감각형 사람들은 실용적이고 기능적인 패션을 선호합니다. 이들은 옷의 질감, 소재, 내구성 등을 꼼꼼히 따지며, 일상에서 자주 입을 수 있는 아이템을 좋아합니다. 최신 유행보다는 기본적이고 클래식한 스타일을 선호합니다.";
    const N_TEXT =
      "<strong>(N)</strong> 관형 사람들은 창의적이고 독창적인 디자인을 선호합니다. 이들은 패션에서 개성을 표현하는 것을 중요하게 생각하며, 미래 지향적인 스타일을 추구합니다. 유행에 민감하며, 독특한 패턴이나 색상을 시도하는 것을 즐깁니다.";
    const T_TEXT =
      "<strong>(T)</strong> 사고형 사람들은 패션을 선택할 때 논리적이고 객관적인 기준을 적용합니다. 이들은 가격 대비 품질을 중요하게 여기며, 실용적인 면을 중시합니다. 감정보다는 이성적인 판단으로 옷을 고르는 경향이 있습니다.";
    const F_TEXT =
      "<strong>(F)</strong> 감정형 사람들은 패션을 통해 기분과 감정을 표현하는 것을 중요하게 생각합니다. 이들은 옷을 입었을 때의 느낌과 감정적 만족을 중시하며, 자신을 행복하게 해주는 스타일을 선택합니다. 패션을 통해 자신을 표현하고, 타인과의 관계에서 긍정적인 이미지를 만들고자 합니다.";
    const J_TEXT =
      "<strong>(J)</strong> 판단형 사람들은 계획적이고 체계적으로 옷을 고릅니다. 이들은 중요한 약속이나 이벤트에 대비해 미리 옷을 준비하고, 옷장을 깔끔하게 정리합니다. 쇼핑할 때도 목록을 작성하고, 필요한 아이템을 정확하게 구매하는 편입니다.";
    const P_TEXT =
      "<strong>(P)</strong> 인식형 사람들은 즉흥적이고 유연하게 패션을 선택합니다. 이들은 쇼핑할 때 현장에서 즉흥적으로 결정을 내리고, 기분에 따라 옷을 고릅니다. 옷장을 자주 정리하지 않으며, 필요한 순간에만 정리하는 편입니다. 패션을 통해 자유롭고 자발적인 성격을 표현합니다.";

    const IE = I_SCORE >= E_SCORE ? "I" : "E";
    const SN = S_SCORE >= N_SCORE ? "S" : "N";
    const TF = T_SCORE >= F_SCORE ? "T" : "F";
    const JP = J_SCORE >= P_SCORE ? "J" : "P";

    const IE_TEXT = I_SCORE >= E_SCORE ? I_TEXT : E_TEXT;
    const SN_TEXT = S_SCORE >= N_SCORE ? S_TEXT : N_TEXT;
    const TF_TEXT = T_SCORE >= F_SCORE ? T_TEXT : F_TEXT;
    const JP_TEXT = J_SCORE >= P_SCORE ? J_TEXT : P_TEXT;

    const typeParam = searchParams.get("type");
    const resultMbti = typeParam || `${IE}${SN}${TF}${JP}`;
    const resultText = typeParam
      ? ""
      : `${IE_TEXT}<br /><br />${SN_TEXT}<br /><br />${TF_TEXT}<br /><br />${JP_TEXT}`;

    setName(resultMbti);
    setText(resultText);
    setIsLoading(false);
  }, [searchParams]);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center px-4 py-8">
          <div className="text-center">
            <Loader2 className="w-8 h-8 text-luxury-gold animate-spin mx-auto mb-4" />
            <p className="text-gray-400">결과를 불러오는 중...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-3xl space-y-6">
          {/* Header */}
          <Card className="bg-[#1E1E1E]/90 border-white/10">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-6 h-6 text-luxury-gold" />
                <CardTitle className="text-3xl font-serif text-luxury-gold">
                  당신의 패션 MBTI
                </CardTitle>
              </div>
            </CardHeader>
          </Card>

          {/* Result Card */}
          <Card className="bg-[#1E1E1E]/90 border-luxury-gold/30 border-2 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="p-4 rounded-full bg-luxury-gold/10 border-2 border-luxury-gold/30">
                  <Shirt className="w-8 h-8 text-luxury-gold" />
                </div>
                <div className="text-center">
                  <h2 className="text-4xl font-serif font-bold text-pink-500 mb-2">
                    {name}
                  </h2>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Image */}
              <div className="w-full pb-4">
                <img
                  src={`https://mindpang-image.s3.ap-northeast-2.amazonaws.com/fashion-mbti/${name.toLowerCase()}.webp`}
                  alt={`${name} 패션 MBTI`}
                  className="w-full h-auto rounded-lg"
                />
              </div>

              {/* Adsense component would go here */}
              <div className="my-4">{/* Adsense placeholder */}</div>

              {/* Text */}
              {text && (
                <div
                  className="text-gray-300 leading-relaxed space-y-4 prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: text }}
                />
              )}
            </CardContent>
          </Card>

          {/* Fshare component */}
          <Fshare
            title="패션 MBTI 성향 테스트 - 마인드팡"
            imageUrl="https://mindpang-image.s3.ap-northeast-2.amazonaws.com/fashion-mbti.png"
            url="https://mindpang.com/test/fashion-mbti"
          />
        </div>
      </div>
    </Layout>
  );
}
