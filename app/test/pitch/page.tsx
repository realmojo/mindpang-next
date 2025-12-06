import { Metadata } from "next";
import Script from "next/script";
import Layout from "@/components/Layout";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, Sparkles, Brain, ArrowRight } from "lucide-react";

const metaUrl = "https://mindpang.com/test/pitch";
const title = "절대음감 테스트 - 마인드팡";
const description =
  "절대음감 테스트는 음악적 능력과 감각을 평가하는 검사로, 음악에 대한 민감성과 이해력을 측정하는 데 사용됩니다. 이 테스트는 음악적인 요소들을 인식하고 해석하는 능력을 평가하여 음악적 청각의 정도를 측정하고자 합니다. 흔히 음악 이론, 음악 구조, 음계, 리듬, 음악적 문맥 등에 대한 이해를 테스트하며, 참가자들은 음악 조각이나 음악 예시를 듣고 관련된 질문에 답하는 방식으로 진행됩니다.";
const logo = "https://mindpang-image.s3.ap-northeast-2.amazonaws.com/pitch.png";

const articles = [
  {
    title: "절대음감 테스트란",
    description:
      "절대음감 테스트는 음악적 능력과 감각을 평가하는 검사로, 음악에 대한 민감성과 이해력을 측정하는 데 사용됩니다. 이 테스트는 음악적인 요소들을 인식하고 해석하는 능력을 평가하여 음악적 청각의 정도를 측정하고자 합니다. 흔히 음악 이론, 음악 구조, 음계, 리듬, 음악적 문맥 등에 대한 이해를 테스트하며, 참가자들은 음악 조각이나 음악 예시를 듣고 관련된 질문에 답하는 방식으로 진행됩니다.",
    icon: Music,
  },
  {
    title: "절대음감에 대하여",
    description:
      "이 테스트는 음악 교육, 음악 연구, 음악 산업 등 다양한 분야에서 활용되며, 음악적인 재능과 흥미를 가진 개인들이 자신의 음악적 능력을 파악하고자 할 때 자주 활용됩니다. 또한, 음악 교육 기관이나 음악 학과에서 지원서나 선발과정에서 활용되기도 합니다.",
    icon: Brain,
  },
  {
    title: "절대음감과 상대음감",
    description:
      "절대음감 테스트는 다양한 형태와 수준이 존재하며, 참가자의 수준과 목적에 따라 다양한 테스트가 선택되어 사용됩니다. 이를 통해 음악적 지식과 기술을 향상시키는 데 도움을 주며, 참가자들은 자신의 음악적 능력을 정량적으로 평가할 수 있습니다.",
    icon: Sparkles,
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

    const { error } = await (supabaseAdmin as any).rpc("increment_test_count", {
      test_link: "pitch",
    });

    if (error) {
      const { data: currentData, error: fetchError } = await supabaseAdmin
        .from("mindpang_test")
        .select("count")
        .eq("link", "pitch")
        .single();

      if (!fetchError && currentData) {
        await (supabaseAdmin as any)
          .from("mindpang_test")
          .update({ count: ((currentData as any).count || 0) + 1 })
          .eq("link", "pitch");
      }
    }
  } catch (error) {
    console.error("Error incrementing count:", error);
  }
}

export default async function PitchPage() {
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
              <Music className="w-8 h-8 text-luxury-gold" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-100 tracking-tight">
              절대음감 테스트
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              당신의 절대음감 능력을 테스트해보세요
            </p>
            <div className="pt-4">
              <Link href="/test/pitch/play">
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
            data-ad-slot="4961454191"
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
                절대음감에 대해 알아보기
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
