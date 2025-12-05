import { Metadata } from "next";
import Script from "next/script";
import Layout from "@/components/Layout";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, FileText, Activity, ArrowRight, Sparkles } from "lucide-react";

const metaUrl = "https://mindpang.com/test/adhd";
const title = "ADHD 테스트 자가진단 - 마인드팡";
const description =
  "성인 ADHD(주의력결핍과잉행동장애)는 일상생활에서 주의력 부족, 총명함, 임펄스 통제 문제로 특징지어지는 신경학적인 질환입니다. 일반적으로 어린이 때 발현되지만, 일부 개인은 성인이 되어도 증상이 지속되거나 재발할 수 있습니다. 주로 집중력이 부족하고 급한 충동으로 인해 실수를 저지르는 경향이 있으며, 일상생활에서 일을 조직하고 완료하는 데 어려움을 겪을 수 있습니다.";
const logo = "https://mindpang-image.s3.ap-northeast-2.amazonaws.com/adhd.png";

const articles = [
  {
    title: "ADHD란",
    description:
      "성인 ADHD(주의력결핍과잉행동장애)는 일상생활에서 주의력 부족, 총명함, 임펄스 통제 문제로 특징지어지는 신경학적인 질환입니다. 일반적으로 어린이 때 발현되지만, 일부 개인은 성인이 되어도 증상이 지속되거나 재발할 수 있습니다. 주로 집중력이 부족하고 급한 충동으로 인해 실수를 저지르는 경향이 있으며, 일상생활에서 일을 조직하고 완료하는 데 어려움을 겪을 수 있습니다.",
  },
  {
    title: "ADHD 검사",
    description:
      "성인 ADHD는 인지 기능, 대인관계, 직업 성취에 부정적인 영향을 미칠 수 있습니다. 지속적인 주의력 부족으로 인해 업무 성과가 저하되거나 사회적 어려움을 겪을 수 있습니다. 다양한 동반 증상 중에는 스트레스, 불안, 우울, 자아존중감의 하락이 포함될 수 있습니다.",
  },
  {
    title: "ADHD 증상",
    description:
      "성인 ADHD의 진단은 주로 증상 이력, 행동 관찰, 심리 평가를 통해 이루어집니다. 행동 요법, 인지 행동 요법, 약물 치료 등이 종합적으로 사용되어 치료될 수 있습니다. 적절한 치료로 증상을 관리하고 일상생활에서의 기능을 향상시키는 것이 목표입니다. 개별적인 치료 계획은 환자의 심각성과 다양한 증상에 따라 결정되어야 합니다.",
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
    const url = `https://api.mindpang.com/api/mind/count.php?link=adhd`;
    await fetch(url, { cache: "no-store" });
  } catch (error) {
    console.error("Error incrementing count:", error);
  }
}

export default async function ADHDTestPage() {
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
              ADHD 자가진단 테스트
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              본인이 ADHD라고 생각이 드신다면
              <br />
              문항을 읽고 답해보세요.
            </p>
            <div className="pt-4">
              <Link href="/test/adhd/play">
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
                ADHD에 대해 알아보기
              </h2>
            </div>

            <div className="grid gap-6">
              {articles.map((article, index) => {
                const icons = [Brain, FileText, Activity];
                const Icon = icons[index] || Brain;

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
                      <p
                        className="text-gray-300 leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: article.description,
                        }}
                      />
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
