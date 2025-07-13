import { NextRequest, NextResponse } from "next/server";
import { getAllBlogPosts } from "@/lib/content";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const language = searchParams.get("lang") || "en";

  try {
    const blogPosts = await getAllBlogPosts(language);
    return NextResponse.json(blogPosts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
