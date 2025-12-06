import { Metadata } from "next";
import Script from "next/script";
import Layout from "@/components/Layout";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Shirt, Users, Palette, ArrowRight } from "lucide-react";

const metaUrl = "https://mindpang.com/test/fashion-mbti";
const title = "패션 MBTI 성향 테스트 - 마인드팡";
const description =
  "패션 MBTI는 개인의 성격 유형을 기반으로 선호하는 패션 스타일을 분석하는 테스트입니다. MBTI 지표인 외향-내향, 감각-직관, 사고-감정, 판단-인식을 사용하여 각 성격 유형에 맞는 패션 스타일을 추천합니다. 이를 통해 개인의 성격에 맞춘 패션 선택을 도와줍니다.";
const logo =
  "https://mindpang-image.s3.ap-northeast-2.amazonaws.com/fashion-mbti.png";

const articles = [
  {
    title: "패션 MBTI 개요",
    description:
      "패션 MBTI는 Myers-Briggs Type Indicator(MBTI)를 기반으로 한 패션 스타일 분류 시스템입니다. MBTI는 개인의 성격 유형을 16가지로 분류하며, 패션 MBTI는 이 성격 유형에 따라 사람들이 선호하는 패션 스타일을 분석합니다.",
    icon: Shirt,
  },
  {
    title: "MBTI 성격 유형별 패션 스타일",
    description:
      "패션 MBTI를 통해 소비자의 패션 선택 패턴을 분석할 수 있습니다. 이는 패션 트렌드를 예측하고, 제품 개발 및 재고 관리에 유용한 데이터를 제공할 수 있습니다.",
    icon: Palette,
  },
  {
    title: "패션 MBTI 활용 사례",
    description:
      "패션 MBTI는 스타일리스트가 고객의 성격 유형에 맞는 맞춤형 스타일링 서비스를 제공하는 데 도움이 됩니다. 이는 고객의 만족도를 높이고, 스타일링 서비스의 효과를 극대화할 수 있습니다.",
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
    const { supabaseAdmin } = await import("@/lib/supabase");
    if (!supabaseAdmin) return;

    
    const { error } = await (supabaseAdmin as any).rpc(
      "increment_test_count",
      { test_link: "fashion-mbti" }
    );

    if (error) {
      const { data: currentData, error: fetchError } = await supabaseAdmin
        .from("mindpang_test")
        .select("count")
        .eq("link", "fashion-mbti")
        .single();

      if (!fetchError && currentData) {
        
        await (supabaseAdmin as any)
          .from("mindpang_test")
          .update({ count: ((currentData as any).count || 0) + 1 })
          .eq("link", "fashion-mbti");
      }
    }
  } catch (error) {
    console.error("Error incrementing count:", error);
  }
}

export default async function FashionMBTIPage() {
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
              <Shirt className="w-8 h-8 text-luxury-gold" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-100 tracking-tight">
              패션 MBTI 성향 테스트
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              나의 패션 MBTI 성향은 무엇일까?
            </p>
            <div className="pt-4">
              <Link href="/test/fashion-mbti/play">
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
                패션 MBTI에 대해 알아보기
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
