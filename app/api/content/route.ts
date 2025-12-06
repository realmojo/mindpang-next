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
    const { data: itemData, error: itemError } = await supabaseAdmin
      .from("mindpang_test")
      .select(
        `
        id,
        title,
        link,
        adsenses,
        category,
        description,
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

    // 조회수 증가
    if ((itemData as any).id) {
      // PostgreSQL 함수를 사용하여 SET count = count + 1 실행

      const { error: rpcError } = await (supabaseAdmin as any).rpc(
        "increment_test_count",
        { test_link: link }
      );

      if (rpcError) {
        // 함수가 없으면 fallback으로 직접 업데이트
        const { data: currentData, error: fetchError } = await supabaseAdmin
          .from("mindpang_test")
          .select("count")
          .eq("id", (itemData as any).id)
          .single();

        if (!fetchError && currentData) {
          await (supabaseAdmin as any)
            .from("mindpang_test")
            .update({ count: ((currentData as any).count || 0) + 1 })
            .eq("id", (itemData as any).id);
        }
      }
    }

    // 데이터 후처리
    const testContent = Array.isArray((itemData as any).mindpang_test_content)
      ? (itemData as any).mindpang_test_content[0]
      : (itemData as any).mindpang_test_content;

    const typedItemData = itemData as any;

    // PHP API와 동일한 형식으로 반환
    const response = {
      idx: typedItemData.id,
      title: typedItemData.title,
      link: typedItemData.link,
      adsenses: typedItemData.adsenses
        ? typeof typedItemData.adsenses === "string"
          ? JSON.parse(typedItemData.adsenses)
          : typedItemData.adsenses
        : null,
      category: typedItemData.category,
      description: typedItemData.description,
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

    return NextResponse.json(response, {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
