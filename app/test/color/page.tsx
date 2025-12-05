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
import { Sparkles, Eye, Palette, ArrowRight } from "lucide-react";

const metaUrl = "https://mindpang.com/test/color";
const title = "색맹 테스트 - 마인드팡";
const description =
  "색맹 테스트는 시각적 감각을 평가하고 색상 식별 능력을 확인하는 중요한 도구 중 하나입니다. 일반적으로 눈에 보이는 다양한 색상 패턴이나 숫자를 사용하여 특정 색상을 정확하게 식별할 수 있는지를 측정합니다. 흔히 사용되는 테스트 중 하나는 이채색 테스트인데, 여러 가지 색깔을 포함한 도트 패턴을 보고 특정 색깔을 찾아내는 능력을 테스트합니다.";
const logo = "https://mindpang-image.s3.ap-northeast-2.amazonaws.com/color.png";

const articles = [
  {
    title: "색맹 테스트를 즐겨보세요",
    description:
      "색맹 테스트는 시각적 감각을 평가하고 색상 식별 능력을 확인하는 중요한 도구 중 하나입니다. 일반적으로 눈에 보이는 다양한 색상 패턴이나 숫자를 사용하여 특정 색상을 정확하게 식별할 수 있는지를 측정합니다. 흔히 사용되는 테스트 중 하나는 이채색 테스트인데, 여러 가지 색깔을 포함한 도트 패턴을 보고 특정 색깔을 찾아내는 능력을 테스트합니다.",
    icon: Eye,
  },
  {
    title: "색맹테스트에 대하여",
    description:
      "이러한 테스트에서는 대부분 일반적인 색맹 유형을 식별하기 위해 빨강, 초록, 파랑 등 주요한 색상들을 사용합니다. 색맹은 주로 빨강-초록 색맹과 파랑-노랑 색맹으로 나뉘며, 특정 색상의 인식에 어려움을 겪는 것이 특징입니다.",
    icon: Palette,
  },
  {
    title: "색맹테스트 분류",
    description:
      "색맹 테스트는 안과 의학에서 일상 생활에서의 색상 구별 능력을 확인하거나, 특히 특정 직업에서 필요한 색상 식별 능력을 평가하기 위해 사용될 수 있습니다. 또한, 색맹 테스트를 통해 색각 이상을 발견하고 조기에 대처함으로써 색상에 의한 혼란을 방지할 수 있습니다.",
    icon: Eye,
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
    const url = `https://api.mindpang.com/api/mind/count.php?link=color`;
    await fetch(url, { cache: "no-store" });
  } catch (error) {
    console.error("Error incrementing count:", error);
  }
}

export default async function ColorPage() {
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
              <Eye className="w-8 h-8 text-luxury-gold" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-100 tracking-tight">
              색맹 테스트
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              색상 식별 능력을 확인하는 테스트입니다.
            </p>
            <div className="pt-4">
              <Link href="/test/color/play">
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
                색맹 테스트에 대해 알아보기
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

