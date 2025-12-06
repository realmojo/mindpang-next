import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    if (!supabaseAdmin) {
      return new NextResponse("Supabase 설정이 완료되지 않았습니다.", {
        status: 500,
        headers: { "Content-Type": "text/plain" },
      });
    }

    const searchParams = request.nextUrl.searchParams;
    const link = searchParams.get("link") || "";

    if (link === "") {
      return new NextResponse("no var", {
        status: 400,
        headers: { "Content-Type": "text/plain" },
      });
    }

    // PostgreSQL 함수를 사용하여 SET count = count + 1 실행
    const { error } = await (supabaseAdmin as any).rpc("increment_test_count", {
      test_link: link,
    });

    if (error) {
      // 함수가 없으면 fallback으로 직접 업데이트
      const { data: currentData, error: fetchError } = await supabaseAdmin
        .from("mindpang_test")
        .select("count")
        .eq("link", link)
        .single();

      if (fetchError || !currentData) {
        return new NextResponse("no", {
          status: 404,
          headers: { "Content-Type": "text/plain" },
        });
      }

      const { error: updateError } = await (supabaseAdmin as any)
        .from("mindpang_test")
        .update({ count: ((currentData as any).count || 0) + 1 })
        .eq("link", link);

      if (updateError) {
        console.error("Error updating count:", updateError);
        return new NextResponse("error", {
          status: 500,
          headers: { "Content-Type": "text/plain" },
        });
      }
    }

    return new NextResponse("ok", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    console.error("API Error:", error);
    return new NextResponse("error", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
}
