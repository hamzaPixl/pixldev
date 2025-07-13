import { NextRequest, NextResponse } from "next/server";
import { getAllCaseStudies } from "@/lib/content";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const language = searchParams.get("lang") || "en";

  try {
    const caseStudies = await getAllCaseStudies(language);
    return NextResponse.json(caseStudies);
  } catch (error) {
    console.error("Error fetching case studies:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
