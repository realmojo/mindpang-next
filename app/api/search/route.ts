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
    const search = searchParams.get("search") || "";

    // 메인 쿼리 구성
    let query = supabaseAdmin
      .from("mindpang_test")
      .select("id, title, description, category, logo, link, up, sort")
      .eq("status", "active");

    // 검색 필터
    if (search !== "") {
      query = query.ilike("title", `%${search}%`);
    }

    // 정렬
    query = query.order("sort", { ascending: true, nullsFirst: false });

    const { data: items, error: itemsError } = await query;

    if (itemsError) {
      console.error("Error fetching items:", itemsError);
      return NextResponse.json(
        { error: "Failed to fetch items" },
        { status: 500 }
      );
    }

    // PHP API와 동일한 형식으로 반환 (idx -> id로 매핑)
    const response = {
      items:
        items?.map((item: any) => ({
          idx: item.id,
          title: item.title,
          description: item.description,
          category: item.category,
          logo: item.logo,
          link: item.link,
          up: item.up,
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

