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
import { Sparkles, Heart, TrendingUp, ArrowRight } from "lucide-react";
import Image from "next/image";

const metaUrl = "https://mindpang.com/test/wonyoung-think";
const title = "원영적 사고 테스트 - 마인드팡";
const description =
  "원영적 사고 테스트로 당신의 긍정적인 사고 성향을 확인해보세요. 이 테스트는 일상 생활에서 발생하는 다양한 상황에 대한 반응을 통해 당신의 사고 방식을 평가합니다. 모든 일에 대해 긍정적으로 생각하고 있는지 알아보고, 원영적 사고를 키울 수 있는 방법을 찾아보세요.  지금 바로 시작하세요!😄";
const logo =
  "https://mindpang-image.s3.ap-northeast-2.amazonaws.com/wonyoung-think/wonyoung-think-logo.png";

const articles = [
  {
    title: "원영적 사고 테스트 개요",
    description:
      "원영적 사고 테스트는 일상 생활에서 발생하는 다양한 상황에 대한 반응을 통해 긍정적인 사고 성향을 평가하는 심리 검사입니다. 이 테스트는 당신의 사고 방식을 분석하고, 긍정적인 마인드를 키울 수 있는 방법을 제시합니다.",
    icon: Sparkles,
  },
  {
    title: "원영적 사고의 중요성",
    description:
      "원영적 사고는 모든 사건이 긍정적인 결과로 이어질 것이라는 낙관적인 믿음을 기반으로 합니다. 이는 개인의 행복과 정신 건강에 중요한 영향을 미치며, 스트레스와 어려움을 효과적으로 극복할 수 있게 도와줍니다.",
    icon: Heart,
  },
  {
    title: "원영적 사고 테스트의 활용 사례",
    description:
      "원영적 사고 테스트는 개인의 긍정적 사고 성향을 진단하고, 이를 바탕으로 더 나은 삶을 위한 실질적인 조언을 제공합니다. 이는 개인의 자기 개발, 스트레스 관리, 대인 관계 향상 등에 유용하게 사용될 수 있습니다.",
    icon: TrendingUp,
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

async function getItemData() {
  try {
    const response = await fetch(
      `https://api.mindpang.com/api/mind/item.php?link=wonyoung-think`,
      { cache: "no-store" }
    );
    if (!response.ok) {
      return { item: {}, tags: [] };
    }
    const data = await response.json();
    return {
      item: data?.item || {},
      tags: data?.item?.tags?.split(",") || [],
    };
  } catch (error) {
    console.error("Error fetching item data:", error);
    return { item: {}, tags: [] };
  }
}

async function incrementCount() {
  try {
    const url = `https://api.mindpang.com/api/mind/count.php?link=wonyoung-think`;
    await fetch(url, { cache: "no-store" });
  } catch (error) {
    console.error("Error incrementing count:", error);
  }
}

export default async function WonyoungThinkPage() {
  const { item, tags } = await getItemData();
  incrementCount();

  return (
    <Layout>
      <main className="test-main site-layout flex justify-center flex-col min-h-screen">
        <Script
          id="wonyoung-think-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1963334904140891"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-luxury-gold/10 via-transparent to-luxury-gold/5 rounded-2xl p-8 mb-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1)_0%,transparent_70%)]"></div>
          <div className="relative z-10 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-luxury-gold/20 mb-4">
              <Sparkles className="w-8 h-8 text-luxury-gold" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-100 tracking-tight">
              원영적 사고 테스트
            </h1>
            {item.logo && (
              <div className="mb-6">
                <Image
                  src={item.logo}
                  alt={item.link || "원영적 사고 테스트"}
                  width={800}
                  height={400}
                  className="w-full h-auto rounded-lg shadow-md"
                  loading="lazy"
                />
              </div>
            )}
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              원영적 사고 테스트로 당신의 긍정적인 사고 성향을 확인해보세요.
              이 테스트는 일상 생활에서 발생하는 다양한 상황에 대한 반응을
              통해 당신의 사고 방식을 평가합니다.
            </p>
            <div className="pt-4">
              <Link href="/test/wonyoung-think/play">
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
            data-ad-client="ca-pub-1963334904140891"
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
                원영적 사고에 대해 알아보기
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

