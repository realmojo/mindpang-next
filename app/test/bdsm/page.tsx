import { Metadata } from "next";
import Script from "next/script";
import Layout from "@/components/Layout";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, Users, ArrowRight, Scale } from "lucide-react";

const metaUrl = "https://mindpang.com/test/bdsm";
const title = "BDSM 성향 테스트 - 지배자, 복종자, 스위치 중 당신은 누구인가?";
const description =
  "성향 기반 자가 심리 테스트를 통해 Dominant, Submissive, Switch 유형을 간편하게 분석해드립니다. 이 테스트는 섹슈얼 취향이 아닌, 감정과 관계의 지배-복종 심리를 이해하는 데 초점을 맞췄습니다.";
const logo = "https://mindpang-image.s3.ap-northeast-2.amazonaws.com/bdsm.png";

const articles = [
  {
    title: "BDSM이란 단순한 섹슈얼 코드가 아닙니다",
    description:
      "BDSM은 Bondage, Discipline, Dominance, Submission, Sadism, Masochism의 줄임말이지만, 실제론 신뢰와 책임에 기반한 관계 역학입니다. 이 테스트는 그러한 관계 성향을 탐색합니다.",
    icon: Heart,
  },
  {
    title: "Dominant vs Submissive, 그리고 Switch",
    description:
      "Dominant는 주도권을 갖고 통제하는 것을 편안해하고, Submissive는 그에 따르며 안정감을 느끼는 성향입니다. Switch는 두 성향을 상황에 따라 넘나드는 사람들을 말하죠.",
    icon: Users,
  },
  {
    title: "이 테스트는 어떤 기준인가요?",
    description:
      "섹슈얼 취향을 전제로 하지 않으며, 성향과 감정의 흐름에 초점을 둔 문항들로 구성됩니다. 재미로 풀어보되, 자신을 이해하는 데 참고해보세요.",
    icon: Scale,
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
      { test_link: "bdsm" }
    );

    if (error) {
      const { data: currentData, error: fetchError } = await supabaseAdmin
        .from("mindpang_test")
        .select("count")
        .eq("link", "bdsm")
        .single();

      if (!fetchError && currentData) {
        
        await (supabaseAdmin as any)
          .from("mindpang_test")
          .update({ count: ((currentData as any).count || 0) + 1 })
          .eq("link", "bdsm");
      }
    }
  } catch (error) {
    console.error("Error incrementing count:", error);
  }
}

export default async function BDSMPage() {
  // Increment count in background
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
              <Scale className="w-8 h-8 text-luxury-gold" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-100 tracking-tight">
              BDSM 성향 테스트
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              당신의 내면 깊은 욕구는 어디로 향하고 있나요?
              <br />
              심리와 관계의 역학을 통해 알아보는 BDSM 성향 테스트!
            </p>
            <div className="pt-4">
              <Link href="/test/bdsm/play">
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
                BDSM 성향에 대해 알아보기
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
