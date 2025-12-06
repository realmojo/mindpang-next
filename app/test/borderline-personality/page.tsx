import { Metadata } from "next";
import Script from "next/script";
import Layout from "@/components/Layout";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Brain, AlertCircle, Heart, ArrowRight } from "lucide-react";

const metaUrl = "https://mindpang.com/test/borderline-personality";
const title = "경계성 인격장애 테스트 자가진단 - 마인드팡";
const description =
  "경계성 인격장애는 정신건강 장애의 한 형태로, 환자가 자기 정체성을 일관되게 유지하기 어려운 특징을 보입니다. 이 장애는 자아의 일부분이나 인격적 특성이 분리되어 있는 것처럼 여겨져, 여러 인격이 공존하는 듯한 느낌을 줄 수 있습니다.";
const logo =
  "https://mindpang-image.s3.ap-northeast-2.amazonaws.com/borderline-personality.png";

const articles = [
  {
    title: "경계성 인격장애란",
    description:
      "경계성 인격장애는 정신건강 장애의 한 형태로, 환자가 자기 정체성을 일관되게 유지하기 어려운 특징을 보입니다. 이 장애는 자아의 일부분이나 인격적 특성이 분리되어 있는 것처럼 여겨져, 여러 인격이 공존하는 듯한 느낌을 줄 수 있습니다.",
    icon: Brain,
  },
  {
    title: "경계성 원인",
    description:
      "갑작스러운 감정 변화, 관계 불안정성, 자아 정체성에 대한 혼란 등이 일상에서 나타날 수 있습니다. 주로 스트레스 상황에서 증상이 악화되며, 원인은 정확히 규명되지 않았지만 정서적, 생물학적, 환경적 요인이 복합적으로 작용할 것으로 생각됩니다.",
    icon: AlertCircle,
  },
  {
    title: "경계성 인격장애 치료",
    description:
      "경계성 인격장애를 치료하기 위해서는 전문가의 도움이 필요하며, 정신치료와 의약품이 종합적으로 사용될 수 있습니다. 정신건강 전문가는 환자의 과거 경험, 현재의 심리적 상태를 평가하여 맞춤형 치료 계획을 수립합니다. 환자와의 심리적 상담을 통해 자아 인식을 강화하고 안정된 정서 통제를 돕는 것이 중요합니다. 또한, 의약품은 증상 완화를 위해 사용되며, 환자의 개별적인 상황에 맞게 조절됩니다.",
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
      { test_link: "borderline-personality" }
    );

    if (error) {
      const { data: currentData, error: fetchError } = await supabaseAdmin
        .from("mindpang_test")
        .select("count")
        .eq("link", "borderline-personality")
        .single();

      if (!fetchError && currentData) {
        
        await (supabaseAdmin as any)
          .from("mindpang_test")
          .update({ count: ((currentData as any).count || 0) + 1 })
          .eq("link", "borderline-personality");
      }
    }
  } catch (error) {
    console.error("Error incrementing count:", error);
  }
}

export default async function BorderlinePersonalityPage() {
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
              <Brain className="w-8 h-8 text-luxury-gold" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-100 tracking-tight">
              경계성 인격장애 테스트
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              경계성 인격장애 자가진단 테스트를 통해
              <br />
              자신의 상태를 확인해보세요.
            </p>
            <div className="pt-4">
              <Link href="/test/borderline-personality/play">
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
                경계성 인격장애에 대해 알아보기
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
