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
    const { supabaseAdmin } = await import("@/lib/supabase");

    if (!supabaseAdmin) {
      console.error("Supabase admin client is not available");
      return {
        item: null,
        popularItems: [],
        recentlyItems: [],
      };
    }

    // 메인 아이템 조회 (JOIN)
    const { data: itemData, error: itemError } = await supabaseAdmin
      .from("mindpang_test")
      .select(
        `
        id,
        title,
        link,
        adsenses,
        articles,
        category,
        description,
        tags,
        logo,
        mindpang_test_content (
          type,
          testId,
          contents,
          results
        )
      `
      )
      .eq("link", link)
      .single();

    if (itemError || !itemData) {
      console.error("Error fetching item:", itemError);
      return {
        item: null,
        popularItems: [],
        recentlyItems: [],
      };
    }

    const typedItemData = itemData as any;

    // 조회수 증가
    if (typedItemData.id) {
      const { data: currentData } = await supabaseAdmin
        .from("mindpang_test")
        .select("count")
        .eq("id", typedItemData.id)
        .single();

      if (currentData) {
        const currentCount = (currentData as any).count || 0;
        const admin = supabaseAdmin; // 타입 가드를 위한 로컬 변수

        await (admin as any)
          .from("mindpang_test")
          .update({ count: currentCount + 1 })
          .eq("id", typedItemData.id);
      }
    }

    // 데이터 후처리
    const testContent = Array.isArray(typedItemData.mindpang_test_content)
      ? typedItemData.mindpang_test_content[0]
      : typedItemData.mindpang_test_content;

    const processedItem = {
      idx: typedItemData.id,
      title: typedItemData.title,
      link: typedItemData.link,
      adsenses: typedItemData.adsenses
        ? typeof typedItemData.adsenses === "string"
          ? JSON.parse(typedItemData.adsenses)
          : typedItemData.adsenses
        : null,
      articles: typedItemData.articles
        ? typeof typedItemData.articles === "string"
          ? JSON.parse(typedItemData.articles)
          : typedItemData.articles
        : null,
      category: typedItemData.category,
      description: typedItemData.description,
      tags: typedItemData.tags
        ? typedItemData.tags.split(",").map((tag: string) => tag.trim())
        : [],
      logo: typedItemData.logo,
      type: testContent?.type || null,
      testIdx: testContent?.testId || null,
      contents: testContent?.contents
        ? typeof testContent.contents === "string"
          ? JSON.parse(testContent.contents)
          : testContent.contents
        : null,
      results: testContent?.results
        ? typeof testContent.results === "string"
          ? JSON.parse(testContent.results.replace(/\n/g, "<br />"))
          : testContent.results
        : null,
    };

    // 인기 항목 (count 기준, 상위 10개)

    const { data: popularItems, error: popularError } = await supabaseAdmin
      .from("mindpang_test")
      .select("id, title, logo, category, link")
      .eq("status", "active")
      .order("count", { ascending: false })
      .limit(10);

    if (popularError) {
      console.error("Error fetching popular items:", popularError);
    }

    // 최근 항목 (sort 기준, 상위 10개)

    const { data: recentlyItems, error: recentError } = await supabaseAdmin
      .from("mindpang_test")
      .select("id, title, logo, category, link")
      .eq("status", "active")
      .order("sort", { ascending: true })
      .limit(10);

    if (recentError) {
      console.error("Error fetching recent items:", recentError);
    }

    return {
      item: processedItem,
      popularItems:
        popularItems?.map((item: any) => ({
          idx: item.id,
          title: item.title,
          logo: item.logo,
          category: item.category,
          link: item.link,
        })) || [],
      recentlyItems:
        recentlyItems?.map((item: any) => ({
          idx: item.id,
          title: item.title,
          logo: item.logo,
          category: item.category,
          link: item.link,
        })) || [],
    };
  } catch (error) {
    console.error("Error fetching item data:", error);
    return {
      item: null,
      popularItems: [],
      recentlyItems: [],
    };
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

    // 조회수 증가 (서버 사이드에서 직접 Supabase 호출)
    async function incrementCount() {
      try {
        const { supabaseAdmin } = await import("@/lib/supabase");
        if (!supabaseAdmin) return;

        // PostgreSQL 함수를 사용하여 SET count = count + 1 실행

        const { error } = await (supabaseAdmin as any).rpc(
          "increment_test_count",
          { test_link: link }
        );

        if (error) {
          // 함수가 없으면 fallback으로 직접 업데이트
          const { data: currentData, error: fetchError } = await supabaseAdmin
            .from("mindpang_test")
            .select("count")
            .eq("link", link)
            .single();

          if (!fetchError && currentData) {
            await (supabaseAdmin as any)
              .from("mindpang_test")
              .update({ count: ((currentData as any).count || 0) + 1 })
              .eq("link", link);
          }
        }
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
