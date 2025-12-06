import { Metadata } from "next";
import Script from "next/script";
import Layout from "@/components/Layout";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, Zap, Users, ArrowRight } from "lucide-react";

const metaUrl = "https://mindpang.com/test/egen-teto-woman";
const title =
  "에겐녀 테토녀 테스트 - 에스트로겐 vs 테스토스테론 당신의 에너지 유형은?";
const description =
  "감성과 주도성의 균형을 알아보는 테스트! 당신의 성향을 에스트로겐과 테스토스테론 관점에서 분석합니다. 에겐녀·테토녀·에겐남·테토남 유형 중, 나는 어떤 에너지형 인간일까? 결과를 시각화하고 공유해보세요.";
const logo =
  "https://mindpang-image.s3.ap-northeast-2.amazonaws.com/egen-teto-woman.png";

const articles = [
  {
    title: "테토녀와 에겐녀의 차이란?",
    description:
      "테토녀는 독립적이고 목표 지향적인 여성으로, 리더십과 추진력을 중시하는 경향이 있습니다. 반면 에겐녀는 섬세하고 감성적인 성향으로, 주변과의 조화와 공감을 우선합니다. 당신은 어느 쪽에 더 가까운가요?",
    icon: Zap,
  },
  {
    title: "테토남과 에겐남도 존재합니다",
    description:
      "테토남은 본능적으로 행동하고 리더십을 중시하는 스타일, 에겐남은 감정 기반의 섬세한 성향을 보입니다. 여성형 테스트이지만 남성유형과의 대비도 결과에서 참고해보세요.",
    icon: Users,
  },
  {
    title: "이 테스트의 의도는?",
    description:
      "유쾌하고 직관적인 에너지 성향 테스트! 심리학에 기반한 과학적인 검사는 아니지만, 당신의 감정 스타일과 대인관계를 파악하는 데 도움을 줄 수 있습니다.",
    icon: Heart,
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
    const { supabaseAdmin } = await import("@/lib/supabase");
    if (!supabaseAdmin) return;

    
    const { error } = await (supabaseAdmin as any).rpc(
      "increment_test_count",
      { test_link: "egen-teto-woman" }
    );

    if (error) {
      const { data: currentData, error: fetchError } = await supabaseAdmin
        .from("mindpang_test")
        .select("count")
        .eq("link", "egen-teto-woman")
        .single();

      if (!fetchError && currentData) {
        
        await (supabaseAdmin as any)
          .from("mindpang_test")
          .update({ count: ((currentData as any).count || 0) + 1 })
          .eq("link", "egen-teto-woman");
      }
    }
  } catch (error) {
    console.error("Error incrementing count:", error);
  }
}

export default async function EgenTetoWomanPage() {
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
              <Heart className="w-8 h-8 text-luxury-gold" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-100 tracking-tight">
              에겐녀 테토녀 테스트
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              당신은 어떤 에스트로겐-테스토스테론 조합형 여성인가요?
              <br />
              1분 만에 알아보는 본능 기반 성향 테스트!
            </p>
            <div className="pt-4">
              <Link href="/test/egen-teto-woman/play">
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
                에겐녀·테토녀에 대해 알아보기
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
