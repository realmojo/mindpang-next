import { Metadata } from "next";
import Script from "next/script";
import Layout from "@/components/Layout";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Heart, Users, ArrowRight } from "lucide-react";

const metaUrl = "https://mindpang.com/test/egen-teto-man";
const title =
  "에겐남 테토남 테스트 - 테스토스테론 vs 에스트로겐 당신의 에너지 유형은?";
const description =
  "당신의 행동과 감정 스타일을 테스토스테론 vs 에스트로겐 관점에서 분석합니다. 테토남·에겐남·테토녀·에겐녀까지, 유쾌하지만 놀랍도록 정확한 성향 분석 테스트! 내면의 에너지를 시각화하고 SNS에서 친구와 공유해보세요.";
const logo =
  "https://mindpang-image.s3.ap-northeast-2.amazonaws.com/egen-teto-man.png";

const articles = [
  {
    title: "테토남과 에겐남의 차이란?",
    description:
      "테토남은 테스토스테론적 특성을 가진 외향적, 주도형 남성. 반면 에겐남은 감성적이고 수동적인 내향형 남성입니다. 감정보다 행동이 앞서는가, 행동보다 감정이 앞서는가로 판단할 수 있습니다.",
    icon: Zap,
  },
  {
    title: "테토녀와 에겐녀도 존재합니다",
    description:
      "테토녀는 독립적이고 현실 지향적인 여성으로 커리어 중심 성향이 강하며, 에겐녀는 감성 중심의 내면형 여성으로 섬세하고 따뜻한 교류를 선호합니다. 당신의 내면은 어느 쪽에 가까울까요?",
    icon: Heart,
  },
  {
    title: "이 테스트의 목적은?",
    description:
      "진지한 심리학 검사는 아니지만, 당신의 사고방식과 연애 성향을 에너지 지향성 기준으로 유쾌하게 분류해드립니다. 생각보다 꽤 정확하다는 말이 많죠!",
    icon: Users,
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  url: metaUrl,
  name: title,
  description: description,
  logo: logo,
  mainEntity: {
    "@type": "Article",
    headline: title,
    description: description,
    author: {
      "@type": "Person",
      name: "Tedev",
    },
    publisher: {
      "@type": "Organization",
      name: "MindPang",
      logo: {
        "@type": "ImageObject",
        url: "https://mindpang.com/mindpang-trans-logo.png",
      },
    },
    image: logo,
  },
};

export const metadata: Metadata = {
  title: title,
  description: description,
  alternates: {
    canonical: metaUrl,
  },
  openGraph: {
    title: title,
    description: description,
    url: metaUrl,
    siteName: "Mindpang",
    images: [
      {
        url: logo,
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
    images: [logo],
    site: "@mindpang.com",
  },
  other: {
    "ia:markup_url": metaUrl,
    "ia:rules_url": metaUrl,
  },
};

async function incrementCount() {
  try {
    const url = `https://api.mindpang.com/api/mind/count.php?link=egen-teto-man`;
    await fetch(url, { cache: "no-store" });
  } catch (error) {
    console.error("Error incrementing count:", error);
  }
}

export default async function EgenTetoManPage() {
  incrementCount();

  return (
    <Layout>
      <main className="test-main site-layout flex justify-center flex-col min-h-screen">
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-luxury-gold/10 via-transparent to-luxury-gold/5 rounded-2xl p-8 mb-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1)_0%,transparent_70%)]"></div>
          <div className="relative z-10 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-luxury-gold/20 mb-4">
              <Zap className="w-8 h-8 text-luxury-gold" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-100 tracking-tight">
              에겐남 테토남 테스트
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              당신은 어떤 테스토스테론-에스트로겐 조합형 인간인가요?
              <br />
              1분 만에 알아보는 본능 기반 성향 테스트!
            </p>
            <div className="pt-4">
              <Link href="/test/egen-teto-man/play">
                <Button
                  size="lg"
                  className="bg-luxury-gold hover:bg-luxury-gold/90 text-black font-semibold text-lg px-8 py-6 h-auto rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  테스트 시작하기
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Adsense component would go here */}
        <div className="my-6">{/* Adsense placeholder */}</div>

        {/* Articles Section */}
        {articles.length > 0 && (
          <div className="space-y-6 mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-luxury-gold" />
              <h2 className="text-2xl font-serif font-bold text-luxury-gold">
                에겐남·테토남에 대해 알아보기
              </h2>
            </div>

            <div className="grid gap-6">
              {articles.map((article, index) => {
                const Icon = article.icon;

                return (
                  <Card
                    key={index}
                    className="bg-[#1E1E1E]/80 border-white/10 hover:border-luxury-gold/30 transition-all duration-300 hover:shadow-lg hover:shadow-luxury-gold/10"
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-luxury-gold/10 border-luxury-gold/20">
                          <Icon className="w-5 h-5 text-luxury-gold" />
                        </div>
                        <CardTitle className="text-xl font-serif text-luxury-gold">
                          {article.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 leading-relaxed">
                        {article.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
}

