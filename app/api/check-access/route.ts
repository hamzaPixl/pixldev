import { NextRequest, NextResponse } from "next/server";
import { slideConfigurations } from "@/data/slides";

export async function POST(request: NextRequest) {
  try {
    const { slug } = await request.json();

    if (!slug || typeof slug !== "string") {
      return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    }

    // Check if the presentation exists
    const config =
      slideConfigurations[slug as keyof typeof slideConfigurations];

    if (!config) {
      return NextResponse.json(
        { error: "Presentation not found" },
        { status: 404 }
      );
    }

    // Check if user has valid session cookie
    const sessionCookie = request.cookies.get(`slides_access_${slug}`);

    if (sessionCookie && sessionCookie.value === "verified") {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
  } catch (error) {
    console.error("Access check error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
