import { Metadata } from "next";
import Script from "next/script";
import Layout from "@/components/Layout";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, FileText, Activity, ArrowRight, Sparkles } from "lucide-react";

const metaUrl = "https://mindpang.com/test/tf";
const title = "TF 테스트 - 마인드팡";
const description =
  "TF테스트는 사람의 사고 방식과 의사 결정 과정을 이해하기 위해 개발된 심리 테스트입니다. MBTI의 T(이성적 사고)와 F(감정적 사고)를 중심으로, 주어진 상황에서 어떻게 반응하는지 분석합니다. T 유형은 논리적이고 객관적인 접근 방식을 선호하며, 문제 해결을 위해 사실과 데이터를 중시합니다. 반면 F 유형은 공감과 감정을 중요시하며, 다른 사람의 감정과 자신의 감정을 고려하여 결정을 내립니다.😄";
const logo =
  "https://mindpang-image.s3.ap-northeast-2.amazonaws.com/TF-test.webp";

const articles = [
  {
    title: "TF 테스트 개요",
    description:
      "TF 테스트는 다양한 상황에서 개인이 이성적으로(T) 또는 감정적으로(F) 반응하는지를 평가하는 심리 검사입니다. 이 테스트는 당신의 사고 방식을 분석하여, 이성적 사고와 감정적 사고의 균형을 맞추는 데 도움을 줍니다.",
    icon: Brain,
  },
  {
    title: "TF 테스트의 중요성",
    description:
      "TF 테스트는 사람의 사고 방식과 의사 결정 과정을 이해하는 데 중요한 도구입니다. 이성적 사고(T)는 논리적이고 객관적인 결정을 돕고, 감정적 사고(F)는 공감과 감정을 중시하여 인간관계를 개선합니다. 두 가지 사고 방식의 균형은 개인의 성공과 행복에 필수적입니다.",
    icon: FileText,
  },
  {
    title: "TF 테스트의 활용 사례",
    description:
      "TF 테스트는 개인의 사고 성향을 진단하고, 이를 바탕으로 더 나은 의사 결정을 위한 조언을 제공합니다. 이는 자기 이해, 대인 관계 개선, 직장에서의 문제 해결, 갈등 관리 등에 유용하게 활용될 수 있습니다.",
    icon: Activity,
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
  openGraph: {
    title: title,
    description: description,
    url: metaUrl,
    siteName: "Mindpang",
    images: [
      {
        url: logo,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
    images: [logo],
  },
  alternates: {
    canonical: metaUrl,
  },
};

async function incrementCount() {
  try {
    const url = `https://api.mindpang.com/api/mind/count.php?link=tf`;
    await fetch(url, { cache: "no-store" });
  } catch (error) {
    console.error("Error incrementing count:", error);
  }
}

export default async function TFTestPage() {
  incrementCount();

  return (
    <Layout>
      <main className="test-main site-layout flex justify-center flex-col min-h-screen">
        <Script
          id="tf-jsonld"
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
              TF 테스트
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              TF테스트는 사람의 사고 방식과 의사 결정 과정을 이해하기 위해
              개발된 심리 테스트입니다. MBTI의 T(이성적 사고)와 F(감정적 사고)를
              중심으로, 주어진 상황에서 어떻게 반응하는지 분석합니다.
            </p>
            <div className="pt-4">
              <Link href="/test/tf/play">
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
                TF 테스트에 대해 알아보기
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
