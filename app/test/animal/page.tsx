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
import {
  Sparkles,
  PawPrint,
  BookOpen,
  TreePine,
  ArrowRight,
} from "lucide-react";

const metaUrl = "https://mindpang.com/test/animal";
const title = `영적동물 테스트 - 마인드팡`;
const description =
  "영적 동물이란 일반적으로 동물의 지능이나 감성이 높아 인간과 유사한 정신적, 감성적 경험을 할 수 있다고 여겨지는 동물들을 가리킵니다. 이 개념은 동물 행동학, 인지 과학, 동물 윤리 등 다양한 분야에서 논의되고 있으며, 각자의 견해와 정의에 따라 다양한 동물이 영적이라고 여겨질 수 있습니다.";
const logo =
  "https://mindpang-image.s3.ap-northeast-2.amazonaws.com/animal.png";

const articles = [
  {
    title: "영적동물 테스트란",
    description:
      "영적 동물이란 일반적으로 동물의 지능이나 감성이 높아 인간과 유사한 정신적, 감성적 경험을 할 수 있다고 여겨지는 동물들을 가리킵니다. 이 개념은 동물 행동학, 인지 과학, 동물 윤리 등 다양한 분야에서 논의되고 있으며, 각자의 견해와 정의에 따라 다양한 동물이 영적이라고 여겨질 수 있습니다.",
    icon: PawPrint,
  },
  {
    title: "영적동물 대하여",
    description:
      "이러한 동물들이 영적이라고 인식되는 것은 그들이 감정을 경험하고 자기 및 타인의 상태를 이해할 수 있는 능력, 그리고 추상적인 개념이나 도덕적인 판단을 할 수 있는 능력을 가지고 있기 때문입니다. 그러나 이에 대한 명확한 정의나 측정 기준은 여전히 논란의 여지가 있으며, 연구와 더 깊은 이해가 요구되고 있습니다.",
    icon: BookOpen,
  },
  {
    title: "영적동물 분류",
    description:
      "코끼리, 고릴라, 돌고래, 개, 고양이 등 여러 동물들이 영적 동물로 간주되기도 합니다. 이들은 도구 사용, 문제 해결 능력, 감정 표현, 상호소통 등 다양한 특성을 보여줍니다. 특히 일부 포유류들은 그들만의 사회적 구조를 가지며, 서로 간의 상호작용에서 높은 지능과 감수성을 나타내기도 합니다.",
    icon: TreePine,
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
  console.log("incrementCount");
  try {
    const url = `https://api.mindpang.com/api/mind/count.php?link=animal`;
    await fetch(url, { cache: "no-store" });
  } catch (error) {
    console.error("Error incrementing count:", error);
  }
}

export default async function AnimalTestPage() {
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
              <PawPrint className="w-8 h-8 text-luxury-gold" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-100 tracking-tight">
              영적동물 테스트
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              본인의 영적동물은 어떤것인지 테스트 해보세요.
            </p>
            <div className="pt-4">
              <Link href="/test/animal/play">
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
                영적동물에 대해 알아보기
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
