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
    const page = parseInt(searchParams.get("page") || "0", 10);
    const category = searchParams.get("category") || "";
    const search = searchParams.get("search") || "";

    const offset = 12;
    const startOffset = page * offset;

    // 메인 리스트 쿼리 구성 - status 필터를 ilike로 변경
    let query = supabaseAdmin
      .from("mindpang_test")
      .select(
        "id, title, description, category, logo, link, up, count, status, sort"
      )
      .eq("status", "active");

    // 카테고리 필터
    if (category !== "") {
      query = query.ilike("category", `%${category}%`);
    }

    // 검색 필터
    if (search !== "") {
      query = query.ilike("title", `%${search}%`);
    }

    // 정렬 및 페이지네이션
    query = query.order("sort", { ascending: true, nullsFirst: false });
    query = query.range(startOffset, startOffset + offset - 1);

    const { data: items, error: itemsError } = await query;

    if (itemsError) {
      console.error("Error fetching items:", itemsError);
      return NextResponse.json(
        { error: "Failed to fetch items" },
        { status: 500 }
      );
    }

    // 인기 항목 (count 기준, 상위 10개)
    const { data: popularItems, error: popularError } = await supabaseAdmin
      .from("mindpang_test")
      .select("id, title, logo, category, link")
      .eq("status", "active")
      .order("count", { ascending: false })
      .limit(10);

    if (popularError) {
      console.error("Error fetching popular items:", popularError);
      return NextResponse.json(
        { error: "Failed to fetch popular items" },
        { status: 500 }
      );
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
      return NextResponse.json(
        { error: "Failed to fetch recent items" },
        { status: 500 }
      );
    }

    // PHP API와 동일한 형식으로 반환 (idx -> id로 매핑)
    const response = {
      items:
        items?.map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          category: item.category,
          logo: item.logo,
          link: item.link,
          up: item.up,
          count: item.count,
        })) || [],
      popularItems:
        popularItems?.map((item: any) => ({
          id: item.id,
          title: item.title,
          logo: item.logo,
          category: item.category,
          link: item.link,
        })) || [],
      recentlyItems:
        recentlyItems?.map((item: any) => ({
          id: item.id,
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
