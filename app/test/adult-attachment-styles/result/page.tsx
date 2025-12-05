"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Shield,
  Users,
  FileText,
  Share2,
  RotateCcw,
  Home,
  Sparkles,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import Fshare from "@/components/Fshare";
interface ResultType {
  name: string;
  text: string;
  icon: typeof Heart;
  color: string;
  bgColor: string;
  borderColor: string;
  scores: {
    secure: number;
    anxious: number;
    avoidant: number;
    fearful: number;
  };
}

export default function AdultAttachmentStylesResultPage() {
  const [result, setResult] = useState<ResultType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const resultStr = localStorage.getItem(
      "mindpang-adult-attachment-styles-answer"
    );
    if (!resultStr) {
      window.location.href = "/test/adult-attachment-styles";
      return;
    }

    const result = JSON.parse(resultStr);
    let secure = 0,
      anxious = 0,
      avoidant = 0,
      fearful = 0;

    result.forEach((val: number, idx: number) => {
      const typeIdx = idx % 4;
      if (typeIdx === 0) secure += val;
      else if (typeIdx === 1) anxious += val;
      else if (typeIdx === 2) avoidant += val;
      else if (typeIdx === 3) fearful += val;
    });

    const scores = [
      { type: "안정형 (Secure)", value: secure },
      { type: "불안형 (Anxious)", value: anxious },
      { type: "회피형 (Avoidant)", value: avoidant },
      { type: "혼란형 (Fearful-Avoidant)", value: fearful },
    ];

    scores.sort((a, b) => b.value - a.value);
    const topType = scores[0].type;

    let resultData: ResultType | null = null;

    if (topType.includes("Secure")) {
      resultData = {
        name: "안정형 (Secure)",
        text: `
    <p style="margin-bottom:20px;"><strong>안정형(Secure Attachment)</strong> 애착유형을 가진 당신은 감정적으로 안정적이며, 타인과의 관계에서도 자연스럽게 친밀감을 형성할 수 있는 능력을 가지고 있습니다. 자신과 타인을 모두 신뢰하며, 가까운 사람들과의 갈등이나 긴장 상황에도 비교적 유연하게 대처합니다. 이러한 특성은 연애, 우정, 가족 관계 등 다양한 인간관계 속에서 긍정적으로 작용합니다.</p>
    <p style="margin-bottom:20px;">당신은 의사소통 능력이 뛰어나며, 감정을 억누르지 않고 건강하게 표현하는 데 익숙합니다. 독립성과 의존성 사이의 균형을 잘 유지하면서, 필요할 때 도움을 요청하고 줄 수 있는 능력도 갖추고 있습니다. 타인의 말에 귀 기울이며, 상대방의 감정 상태에도 민감하게 반응하기 때문에 신뢰 관계 형성이 빠릅니다.</p>
    <p style="margin-bottom:20px;">이러한 안정적인 애착 유형은 어린 시절부터 안정적인 양육 환경에서 비롯된 경우가 많으며, 시간이 지나면서도 성숙한 자아 인식과 대인관계를 통해 더욱 강화됩니다. 당신은 다양한 관계 속에서 중심을 잡아주는 존재이며, 타인에게 정서적인 안전지대를 제공할 수 있는 사람입니다.</p>
  `,
        icon: Shield,
        color: "text-green-400",
        bgColor: "bg-green-500/10",
        borderColor: "border-green-500/30",
        scores: { secure, anxious, avoidant, fearful },
      };
    } else if (topType.includes("Anxious")) {
      resultData = {
        name: "불안형 (Anxious)",
        text: `
    <p style="margin-bottom:20px;"><strong>불안형(Anxious Attachment)</strong> 애착유형의 사람들은 관계 속에서 상대의 반응에 매우 민감하고, 끊임없는 애정 확인을 통해 안심하려는 경향이 있습니다. 당신 역시 타인의 작은 행동에도 큰 의미를 부여하고, 상대방이 거리를 두는 순간 불안감이 증폭될 수 있습니다.</p>
    <p style="margin-bottom:20px;">감정 표현이 풍부하고, 누군가에게 사랑받고 싶다는 욕구가 강하지만 이러한 열망이 때때로 관계에서 부담을 줄 수 있습니다. 연인 관계에서는 지나치게 집착하거나 상대방을 의심하는 행동으로 인해 갈등이 생길 수 있으며, 친구나 가족과의 관계에서도 혼자 오해하거나 상처받는 경우가 많습니다.</p>
    <p style="margin-bottom:20px;">하지만 당신의 이러한 성향은 사실 타인을 진심으로 아끼고, 관계를 소중히 여기는 마음에서 비롯된 것입니다. 불안형 애착유형의 사람들은 감성적이고 섬세한 배려심을 가지고 있으며, 안정적인 환경과 애정 표현이 꾸준히 유지된다면 큰 관계적 안정감을 얻을 수 있습니다. 자기 자신에 대한 신뢰를 키워가는 과정이 애착 불안을 완화하는 핵심입니다.</p>
  `,
        icon: Users,
        color: "text-yellow-400",
        bgColor: "bg-yellow-500/10",
        borderColor: "border-yellow-500/30",
        scores: { secure, anxious, avoidant, fearful },
      };
    } else if (topType.includes("Avoidant")) {
      resultData = {
        name: "회피형 (Avoidant)",
        text: `
    <p style="margin-bottom:20px;"><strong>회피형(Avoidant Attachment)</strong> 애착유형을 가진 사람들은 독립심이 강하고, 감정적으로 타인과 너무 가까워지는 것을 불편하게 느끼는 경우가 많습니다. 당신 역시 관계에 있어 자기 통제권을 중요하게 여기며, 누군가가 지나치게 가까이 다가오면 경계심을 갖거나 거리를 두려는 경향이 있습니다.</p>
    <p style="margin-bottom:20px;">감정을 솔직하게 표현하거나 상대에게 자신의 약한 모습을 보이는 것이 어색하거나 두려울 수 있으며, 대화 중에도 감정적인 부분보다는 이성적이고 논리적인 접근을 선호합니다. 이러한 특성 때문에 주변 사람들과의 깊은 유대가 형성되기까지 시간이 오래 걸릴 수 있습니다.</p>
    <p style="margin-bottom:20px;">그러나 회피형 애착은 스스로를 보호하기 위한 무의식적 방어기제에서 비롯된 경우가 많으며, 이 또한 충분히 변화 가능성이 있습니다. 감정을 공유하고, 신뢰할 수 있는 대상과의 관계를 통해 서서히 마음을 열어간다면 보다 깊고 풍요로운 인간관계를 경험할 수 있습니다. 당신은 혼자서도 잘 해낼 수 있는 강점을 가진 동시에, 진정한 친밀감의 가치를 배워가는 과정에 있는 사람입니다.</p>
  `,
        icon: FileText,
        color: "text-blue-400",
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/30",
        scores: { secure, anxious, avoidant, fearful },
      };
    } else if (topType.includes("Fearful")) {
      resultData = {
        name: "혼란형 (Fearful-Avoidant)",
        text: `
    <p style="margin-bottom:20px;"><strong>혼란형(Fearful-Avoidant Attachment)</strong> 애착유형은 가장 복합적인 형태로, 관계에 대한 욕구와 동시에 두려움을 함께 가지고 있는 성향입니다. 당신은 누군가와 가까워지고 싶은 마음과, 그로 인해 상처받을지도 모른다는 불안 사이에서 끊임없이 갈등을 겪고 있을 가능성이 큽니다.</p>
    <p style="margin-bottom:20px;">이런 양가감정은 종종 과거의 부정적인 경험이나 트라우마에서 비롯된 경우가 많으며, 감정적으로 예측 불가능한 반응을 보이기도 합니다. 연인이나 친구와 가까워졌다가 스스로 거리를 두거나, 갑작스럽게 불신이 커지는 등 일관되지 않은 관계 패턴이 나타날 수 있습니다.</p>
    <p style="margin-bottom:20px;">하지만 이러한 혼란 역시 자기이해와 정서적 회복 과정을 통해 극복할 수 있습니다. 자신을 더 잘 이해하고, 신뢰할 수 있는 사람들과 안정적인 관계를 지속하면서, 점차 감정적 일관성과 안전한 애착감을 회복할 수 있습니다. 당신은 아주 섬세하고 깊은 내면을 가진 사람으로, 스스로를 이해하고 돌보는 과정을 통해 더욱 건강한 관계를 만들어나갈 수 있습니다.</p>
  `,
        icon: Heart,
        color: "text-purple-400",
        bgColor: "bg-purple-500/10",
        borderColor: "border-purple-500/30",
        scores: { secure, anxious, avoidant, fearful },
      };
    }

    setResult(resultData);
    setIsLoading(false);
  }, []);

  if (isLoading || !result) {
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

  const Icon = result.icon;

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
                  당신의 성인 애착 유형은?
                </CardTitle>
              </div>
            </CardHeader>
          </Card>

          {/* Adsense component would go here */}
          <div className="my-4">{/* Adsense placeholder */}</div>

          {/* Result Card */}
          <Card
            className={`bg-[#1E1E1E]/90 ${result.borderColor} border-2 hover:shadow-lg transition-all duration-300`}
          >
            <CardHeader>
              <div className="flex items-center justify-center gap-4 mb-4">
                <div
                  className={`p-4 rounded-full ${result.bgColor} border-2 ${result.borderColor}`}
                >
                  <Icon className={`w-8 h-8 ${result.color}`} />
                </div>
                <div className="text-center">
                  <h2 className="text-4xl font-serif font-bold text-gray-100 mb-2">
                    {result.name}
                  </h2>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div
                className="text-gray-300 leading-relaxed space-y-4 prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: result.text }}
              />

              {/* Score Breakdown */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <h3 className="text-lg font-semibold text-luxury-gold mb-4">
                  세부 점수
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-white/5">
                    <div className="text-sm text-gray-400 mb-1">안정형</div>
                    <div className="text-xl font-bold text-green-400">
                      {result.scores.secure}점
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5">
                    <div className="text-sm text-gray-400 mb-1">불안형</div>
                    <div className="text-xl font-bold text-yellow-400">
                      {result.scores.anxious}점
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5">
                    <div className="text-sm text-gray-400 mb-1">회피형</div>
                    <div className="text-xl font-bold text-blue-400">
                      {result.scores.avoidant}점
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5">
                    <div className="text-sm text-gray-400 mb-1">혼란형</div>
                    <div className="text-xl font-bold text-purple-400">
                      {result.scores.fearful}점
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fshare component would go here */}
          <Fshare
            title="성인 애착 유형 테스트 결과 - 마인드팡"
            url="https://mindpang.com/test/adult-attachment-styles"
            imageUrl="https://mindpang-image.s3.ap-northeast-2.amazonaws.com/adult-attachment-styles.png"
          />
        </div>
      </div>
    </Layout>
  );
}
