import { Metadata } from "next";
import Script from "next/script";
import Layout from "@/components/Layout";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Heart,
  FileText,
  Users,
  Shield,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const metaUrl = "https://mindpang.com/test/adult-attachment-styles";
const title =
  "성인애착유형 검사 테스트 - 당신의 관계 유형을 1분 만에 알아보세요";
const description =
  "성인 애착유형 테스트를 통해 나의 관계 성향을 확인해보세요. Secure(안정형), Anxious(불안형), Avoidant(회피형), Fearful(혼란형) 네 가지 애착유형 중 나는 어떤 스타일일까요? 연인, 친구, 가족 등 중요한 인간관계 속에서 당신의 애착 패턴을 1분 만에 파악해보세요.";
const logo =
  "https://mindpang-image.s3.ap-northeast-2.amazonaws.com/attachment-style.png";

const articles = [
  {
    title: "성인 애착유형 테스트란?",
    description:
      "이 테스트는 심리학의 애착이론(Attachment Theory)을 기반으로, 성인이 타인과 맺는 정서적 관계의 패턴을 파악하는 검사입니다. 연인, 친구, 가족과의 관계에서 나타나는 친밀감, 회피, 불안의 정도를 바탕으로 유형을 분석합니다.",
    icon: Heart,
  },
  {
    title: "안정형 (Secure Attachment)",
    description:
      "자신과 타인에 대한 신뢰를 기반으로 건강한 관계를 유지합니다. 친밀감을 잘 받아들이며 감정 표현이 자연스럽습니다. 갈등 상황에서도 안정적인 대응을 보이며 회복탄력성이 높습니다.",
    icon: Shield,
  },
  {
    title: "불안형 (Anxious Attachment)",
    description:
      "관계에서 거절당하거나 버림받는 것에 대한 불안이 크며, 타인에게 강한 정서적 의존을 보입니다. 관계 확인을 자주 하며 집착적인 양상을 보일 수 있습니다.",
    icon: Users,
  },
  {
    title: "회피형 (Avoidant Attachment)",
    description:
      "정서적 거리를 두고 독립성을 중요시하는 유형입니다. 친밀감을 불편하게 느끼고, 감정을 억제하거나 무시하는 경향이 있습니다.",
    icon: FileText,
  },
  {
    title: "혼란형 (Fearful-Avoidant Attachment)",
    description:
      "애착을 원하면서도 동시에 두려워하는 복합적인 유형입니다. 과거 트라우마나 신뢰의 결핍으로 인해 관계에 있어서 불안과 회피가 교차합니다.",
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
      { test_link: "adult-attachment-styles" }
    );

    if (error) {
      const { data: currentData, error: fetchError } = await supabaseAdmin
        .from("mindpang_test")
        .select("count")
        .eq("link", "adult-attachment-styles")
        .single();

      if (!fetchError && currentData) {
        
        await (supabaseAdmin as any)
          .from("mindpang_test")
          .update({ count: ((currentData as any).count || 0) + 1 })
          .eq("link", "adult-attachment-styles");
      }
    }
  } catch (error) {
    console.error("Error incrementing count:", error);
  }
}

export default async function AdultAttachmentStylesPage() {
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
              <Heart className="w-8 h-8 text-luxury-gold" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-100 tracking-tight">
              성인애착유형 검사 테스트
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              성인 애착유형 테스트를 통해 나의 관계 성향을 확인해보세요.
              <br />
              Secure(안정형), Anxious(불안형), Avoidant(회피형), Fearful(혼란형)
              네 가지 애착유형 중 나는 어떤 스타일일까요?
            </p>
            <div className="pt-4">
              <Link href="/test/adult-attachment-styles/play">
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
                애착유형에 대해 알아보기
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
