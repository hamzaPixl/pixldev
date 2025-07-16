import { NextRequest, NextResponse } from "next/server";
import { slideConfigurations } from "@/data/slides";

export async function POST(request: NextRequest) {
  try {
    const { passcode, slug } = await request.json();

    if (!passcode || typeof passcode !== "string") {
      return NextResponse.json({ error: "Invalid passcode" }, { status: 400 });
    }

    if (!slug || typeof slug !== "string") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // Get the configuration for this slug
    const config =
      slideConfigurations[slug as keyof typeof slideConfigurations];

    if (!config) {
      return NextResponse.json(
        { error: "Presentation not found" },
        { status: 404 }
      );
    }

    // Verify the passcode
    if (passcode === config.passcode) {
      // Set a secure session cookie that expires in 4 hours
      const response = NextResponse.json({ success: true });
      response.cookies.set(`slides_access_${slug}`, "verified", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 4 * 60 * 60, // 4 hours
        path: "/",
      });

      return response;
    } else {
      return NextResponse.json(
        { error: "Incorrect passcode" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Passcode verification error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
