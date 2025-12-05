import { Metadata } from "next";
import Script from "next/script";
import Layout from "@/components/Layout";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, AlertCircle, Activity, ArrowRight } from "lucide-react";

const metaUrl = "https://mindpang.com/test/depression";
const title = "우울증 자가진단 테스트 - 마인드팡";
const description =
  "우울증은 정신건강 장애 중 하나로, 지속적인 쇠약감, 흥미 상실, 에너지 부족, 자존감 하락 등이 특징적으로 나타나는 상태입니다. 이러한 증상들로 인해 일상 생활에 대한 흥미와 즐거움이 사라지며, 환자는 일상적인 활동에 대한 동기부여를 잃게 됩니다. 우울증은 대부분 심리적, 생물학적, 사회적인 다양한 요인들이 상호작용하여 발생하며, 유전적인 영향도 확인되고 있습니다.";
const logo =
  "https://mindpang-image.s3.ap-northeast-2.amazonaws.com/depression.png";

const articles = [
  {
    title: "우울증이란",
    description:
      "우울증은 정신건강 장애 중 하나로, 지속적인 쇠약감, 흥미 상실, 에너지 부족, 자존감 하락 등이 특징적으로 나타나는 상태입니다. 이러한 증상들로 인해 일상 생활에 대한 흥미와 즐거움이 사라지며, 환자는 일상적인 활동에 대한 동기부여를 잃게 됩니다. 우울증은 대부분 심리적, 생물학적, 사회적인 다양한 요인들이 상호작용하여 발생하며, 유전적인 영향도 확인되고 있습니다.",
    icon: Heart,
  },
  {
    title: "우울증 검사",
    description:
      "우울증은 적절한 치료 없이는 삶의 질을 현저히 저하시키고, 일상생활에 큰 영향을 미칩니다. 정신건강 전문가는 환자의 심리적 상태를 평가하고 맞춤형 치료 계획을 수립하는 데 주력합니다.",
    icon: AlertCircle,
  },
  {
    title: "우울증 치료",
    description:
      "행동 치료, 인지 치료, 의약품 등이 종합적으로 활용되며, 심리적 지원과 함께 생활 습관의 개선과 정기적인 활동이 중요한 역할을 합니다. 예방적 관리와 정기적인 치료를 통해 우울증을 극복하는 데 도움을 받을 수 있습니다.",
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
    const url = `https://api.mindpang.com/api/mind/count.php?link=depression`;
    await fetch(url, { cache: "no-store" });
  } catch (error) {
    console.error("Error incrementing count:", error);
  }
}

export default async function DepressionPage() {
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
              우울증 테스트
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              본인이 우울증이라고 생각이 드신다면
              <br />
              문항을 읽고 답해보세요.
            </p>
            <div className="pt-4">
              <Link href="/test/depression/play">
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
                우울증에 대해 알아보기
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

