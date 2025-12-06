import { Metadata } from "next";
import Script from "next/script";
import Layout from "@/components/Layout";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

interface PageProps {
  params: Promise<{
    category: string;
    link: string;
  }>;
}

async function getItemData(link: string) {
  try {
    const url = `https://api.mindpang.com/api/mind/item.php?link=${link}`;
    const response = await fetch(url, {
      cache: "no-store", // Ensure fresh data
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const data = await response.json();

    // Log for debugging if item is missing
    if (!data?.item) {
      console.warn("API response missing item:", data);
    }

    return data;
  } catch (error) {
    console.error("Error fetching item data:", error);
    throw error;
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  try {
    const { link } = await params;
    const data = await getItemData(link);
    const item = data?.item;

    if (!item) {
      return {
        title: "마인드팡 - 무료 심리테스트",
        description: "무료 심리테스트, MBTI 성격유형검사",
      };
    }

    return {
      title: `${item.title} - 마인드팡`,
      description: item.description || "무료 심리테스트",
      alternates: {
        canonical: `https://mindpang.com/${item.category}/${item.link}`,
      },
      openGraph: {
        title: item.title,
        description: item.description || "무료 심리테스트",
        url: `https://mindpang.com/${item.category}/${item.link}`,
        siteName: "마인드팡",
        images: [
          {
            url:
              item.logo || "https://mindpang.com/mindpang-opengraph-logo.png",
            width: 1200,
            height: 630,
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: item.title,
        description: item.description || "무료 심리테스트",
        images: [
          item.logo || "https://mindpang.com/mindpang-opengraph-logo.png",
        ],
        site: "@mindpang.com",
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "마인드팡 - 무료 심리테스트",
      description: "무료 심리테스트, MBTI 성격유형검사",
    };
  }
}

export default async function TestPage({ params }: PageProps) {
  try {
    const { link } = await params;
    const data = await getItemData(link);
    const item = data?.item;
    const recentlyItems = data?.recentlyItems || [];
    const popularItems = data?.popularItems || [];

    if (!item) {
      return (
        <Layout>
          <main className="test-main relative test-layout">
            <div className="text-center p-10">
              <h1 className="text-2xl font-bold mb-4">
                테스트를 찾을 수 없습니다
              </h1>
              <Link href="/" className="btn btn-secondary">
                홈으로 돌아가기
              </Link>
            </div>
          </main>
        </Layout>
      );
    }

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      url: `https://mindpang.com/${item.category}/${item.link}`,
      name: `${item.title} - 마인드팡`,
      description: item.description || "",
      logo: item.logo || "",
      mainEntity: {
        "@type": "Article",
        headline: `${item.title} - 마인드팡`,
        description: item.description || "",
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
        image: item.logo || "",
      },
    };

    async function incrementCount() {
      try {
        const url = `https://api.mindpang.com/api/mind/count.php?link=${link}`;
        await fetch(url, { cache: "no-store" });
      } catch (error) {
        console.error("Error incrementing count:", error);
      }
    }

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
                <Sparkles className="w-8 h-8 text-luxury-gold" />
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-100 tracking-tight">
                {item.title}
              </h1>
              <p
                className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
              <div className="pt-4">
                <Link href={`/${item.category}/${item.link}/play`}>
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

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 justify-center">
                {item.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full bg-luxury-gold/10 border border-luxury-gold/20 text-luxury-gold text-sm font-medium"
                  >
                    # {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

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
          {item.articles && item.articles.length > 0 && (
            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-luxury-gold" />
                <h2 className="text-2xl font-serif font-bold text-luxury-gold">
                  {item.title}에 대해 알아보기
                </h2>
              </div>

              <div className="grid gap-6">
                {item.articles.map(
                  (
                    article: {
                      title: string;
                      description: string;
                      url: string;
                    },
                    index: number
                  ) => (
                    <Card
                      key={index}
                      className="bg-[#1E1E1E]/80 border-white/10 hover:border-luxury-gold/30 transition-all duration-300 hover:shadow-lg hover:shadow-luxury-gold/10"
                    >
                      <CardHeader>
                        <CardTitle
                          className="text-xl font-serif text-luxury-gold"
                          dangerouslySetInnerHTML={{ __html: article.title }}
                        />
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
                  )
                )}
              </div>
            </div>
          )}

          <Sidebar recentlyItems={recentlyItems} popularItems={popularItems} />
        </main>
      </Layout>
    );
  } catch (error) {
    console.error("Error rendering test page:", error);
    return (
      <Layout>
        <main className="test-main relative test-layout">
          <div className="text-center p-10">
            <h1 className="text-2xl font-bold mb-4">오류가 발생했습니다</h1>
            <p className="mb-4">테스트를 불러오는 중 문제가 발생했습니다.</p>
            <Link href="/" className="btn btn-secondary">
              홈으로 돌아가기
            </Link>
          </div>
        </main>
      </Layout>
    );
  }
}
