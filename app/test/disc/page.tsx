import { Metadata } from "next";
import Script from "next/script";
import Layout from "@/components/Layout";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Users,
  Target,
  Heart,
  Brain,
  ArrowRight,
} from "lucide-react";

const metaUrl = "https://mindpang.com/test/disc";
const title = "DISC 성격유형 테스트 - 당신의 행동 유형을 1분 만에 알아보세요";
const description =
  "Dominance, Influence, Steadiness, Conscientiousness 네 가지 행동 유형 중 당신은 어떤 유형일까요? 조직 내 커뮤니케이션과 리더십에서 나의 스타일을 확인해보세요.";
const logo = "https://mindpang-image.s3.ap-northeast-2.amazonaws.com/disc.png";

const articles = [
  {
    title: "DISC 테스트란?",
    description:
      "DISC는 사람의 행동 스타일을 4가지 유형(D, I, S, C)으로 분류한 심리모델입니다. 커뮤니케이션, 리더십, 팀워크를 분석하는 데 널리 쓰이며, 실생활 적용도가 높은 테스트입니다.",
    icon: Users,
  },
  {
    title: "D 유형 - 지배형",
    description:
      "D 유형은 결과 중심, 결단력 강한 스타일입니다. 도전적이고 목표 달성에 집중하며, 리더십이 뛰어난 성향을 가집니다.",
    icon: Target,
  },
  {
    title: "I 유형 - 사교형",
    description:
      "I 유형은 외향적이며 타인과의 관계를 중시합니다. 활발하고 긍정적인 에너지로 주변 사람들과 빠르게 친해지는 성격입니다.",
    icon: Heart,
  },
  {
    title: "S 유형 - 안정형",
    description:
      "S 유형은 인내심이 강하고 조화로운 관계를 선호하며, 주변 사람들과의 안정적 관계를 가장 중요하게 여깁니다. 갈등을 피하고 조용한 환경을 선호하는 경향이 있습니다.",
    icon: Heart,
  },
  {
    title: "C 유형 - 신중형",
    description:
      "C 유형은 분석적이고 정확성을 중시하며, 체계적인 환경에서 자신의 능력을 발휘합니다. 세부사항에 민감하고 실수를 최소화하려는 경향이 있습니다.",
    icon: Brain,
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
      { test_link: "disc" }
    );

    if (error) {
      const { data: currentData, error: fetchError } = await supabaseAdmin
        .from("mindpang_test")
        .select("count")
        .eq("link", "disc")
        .single();

      if (!fetchError && currentData) {
        
        await (supabaseAdmin as any)
          .from("mindpang_test")
          .update({ count: ((currentData as any).count || 0) + 1 })
          .eq("link", "disc");
      }
    }
  } catch (error) {
    console.error("Error incrementing count:", error);
  }
}

export default async function DISCPage() {
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
              <Users className="w-8 h-8 text-luxury-gold" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-100 tracking-tight">
              DISC 성격유형 테스트
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              나는 어떤 행동 유형일까? DISC 이론을 바탕으로 나의 커뮤니케이션 및
              행동 스타일을 1분 만에 파악해보세요!
            </p>
            <div className="pt-4">
              <Link href="/test/disc/play">
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
                DISC 유형에 대해 알아보기
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
