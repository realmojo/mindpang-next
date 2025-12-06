import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json(
        { success: false, error: "Supabase 설정이 완료되지 않았습니다." },
        { status: 500 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const link = searchParams.get("link") || "";

    if (link === "") {
      return NextResponse.json({ error: "no var" }, { status: 400 });
    }

    // 메인 아이템 조회 (JOIN)
    const { data: itemData, error: itemError } = await (supabaseAdmin as any)
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
      return NextResponse.json({ error: "no" }, { status: 404 });
    }

    // 데이터 후처리
    const testContent = Array.isArray((itemData as any).mindpang_test_content)
      ? (itemData as any).mindpang_test_content[0]
      : (itemData as any).mindpang_test_content;

    const processedItem = {
      idx: (itemData as any).id,
      title: itemData.title,
      link: itemData.link,
      adsenses: (itemData as any).adsenses
        ? typeof (itemData as any).adsenses === "string"
          ? JSON.parse((itemData as any).adsenses)
          : itemData.adsenses
        : null,
      articles: (itemData as any).articles
        ? typeof (itemData as any).articles === "string"
          ? JSON.parse((itemData as any).articles)
          : itemData.articles
        : null,
      category: itemData.category,
      description: itemData.description,
      tags: (itemData as any).tags
        ? itemData.tags.split(",").map((tag: string) => tag.trim())
        : [],
      logo: itemData.logo,
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

    // PHP API와 동일한 형식으로 반환
    const response = {
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

    return NextResponse.json(response);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
