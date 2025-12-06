import { Metadata } from "next";
import Script from "next/script";
import Layout from "@/components/Layout";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Wine, Users, Heart, ArrowRight } from "lucide-react";

const metaUrl = "https://mindpang.com/test/drink";
const title = "술궁합 테스트 - 당신과 함께 마시면 최고인 사람은?";
const description =
  "당신과 다른 사람 사이의 술궁합은? 성향별로 완벽히 어울리는 사람과 술자리를 통해 알아보세요. 지금 바로 테스트하고 새로운 케미를 찾아보세요.";
const logo = "https://mindpang-image.s3.ap-northeast-2.amazonaws.com/drink.png";

const articles = [
  {
    title: "술궁합이란 무엇일까요?",
    description:
      "술궁합은 사람마다 다른 성향과 선호도에 따라 누군가와 함께 마실 때 얼마나 편하고 즐거운지를 나타냅니다. 비슷한 스타일일 수도 있고, 완전히 다른 성향이 조화를 이루며 시너지효과를 내기도 합니다.",
    icon: Wine,
  },
  {
    title: "술자리 성향별 케미",
    description:
      "조용히 이야기를 좋아하는 사람과 시끌벅적한 사람 사이에도 의외로 완벽한 케미가 생길 수 있습니다. 서로 다른 스타일일 때 오히려 대화가 풍부해지고 새로운 추억도 쉽게 쌓일 수 있습니다.",
    icon: Users,
  },
  {
    title: "당신의 술자리 성향은?",
    description:
      "당신이 술자리에서 어떤 성향인지 알아보세요! 외향형인지 내향형인지, 주도형인지 경청형인지, 그리고 누군가와 만났을 때 케미가 어떻게 작용하는지도 지금 즉시 알아볼 수 있습니다.",
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
      name: "Mindpang",
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

    // PostgreSQL 함수를 사용하여 SET count = count + 1 실행

    const { error } = await (supabaseAdmin as any).rpc("increment_test_count", {
      test_link: "drink",
    });

    if (error) {
      // 함수가 없으면 fallback으로 직접 업데이트
      const { data: currentData, error: fetchError } = await supabaseAdmin
        .from("mindpang_test")
        .select("count")
        .eq("link", "drink")
        .single();

      if (!fetchError && currentData) {
        await (supabaseAdmin as any)
          .from("mindpang_test")
          .update({ count: ((currentData as any).count || 0) + 1 })
          .eq("link", "drink");
      }
    }
  } catch (error) {
    console.error("Error incrementing count:", error);
  }
}

export default async function DrinkPage() {
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
              <Wine className="w-8 h-8 text-luxury-gold" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-100 tracking-tight">
              술궁합 테스트
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              당신과 친구의 술궁합은 어떨까요?
              <br />
              1분 만에 알아보는 성향별 술자리 케미 분석!
            </p>
            <div className="pt-4">
              <Link href="/test/drink/play">
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

        {/* AdSense */}
        <div className="my-6">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-9130836798889522"
            data-ad-slot="8220251234"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </div>

        {/* Articles Section */}
        {articles.length > 0 && (
          <div className="space-y-6 mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-luxury-gold" />
              <h2 className="text-2xl font-serif font-bold text-luxury-gold">
                술궁합에 대해 알아보기
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
