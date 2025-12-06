import { Metadata } from "next";
import Script from "next/script";
import Layout from "@/components/Layout";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Sparkles, Target, ArrowRight } from "lucide-react";

const metaUrl = "https://mindpang.com/test/speed";
const title = "반응속도 테스트 - 마인드팡";
const description =
  "반응속도 테스트는 개인이 외부 자극에 대한 빠른 반응 능력을 측정하는 데 사용되는 테스트입니다. 이 테스트는 주로 운전사, 운동선수, 군인 등 다양한 분야에서 성과 및 안전에 관련된 중요한 역할을 합니다.";
const logo =
  "https://mindpang-image.s3.ap-northeast-2.amazonaws.com/reactspeed.png";

const articles = [
  {
    title: "반응속도 테스트란",
    description:
      "반응속도 테스트는 개인이 외부 자극에 대한 빠른 반응 능력을 측정하는 데 사용되는 테스트입니다. 이 테스트는 주로 운전사, 운동선수, 군인 등 다양한 분야에서 성과 및 안전에 관련된 중요한 역할을 합니다.",
    icon: Zap,
  },
  {
    title: "반응속도 특징",
    description:
      "반응속도 테스트는 주로 시각적 자극이나 소리에 대한 반응 시간을 측정합니다. 참가자는 특정 자극에 얼마나 빠르게 반응하는지를 파악함으로써 그들의 민첩성과 반응 능력을 확인할 수 있습니다.",
    icon: Target,
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
      { test_link: "speed" }
    );

    if (error) {
      const { data: currentData, error: fetchError } = await supabaseAdmin
        .from("mindpang_test")
        .select("count")
        .eq("link", "speed")
        .single();

      if (!fetchError && currentData) {
        
        await (supabaseAdmin as any)
          .from("mindpang_test")
          .update({ count: ((currentData as any).count || 0) + 1 })
          .eq("link", "speed");
      }
    }
  } catch (error) {
    console.error("Error incrementing count:", error);
  }
}

export default async function SpeedPage() {
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
              반응속도 테스트
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              당신의 반응속도를 측정해보세요
            </p>
            <div className="pt-4">
              <Link href="/test/speed/play">
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
            data-ad-slot="8897750578"
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
                반응속도에 대해 알아보기
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
