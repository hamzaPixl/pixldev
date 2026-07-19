import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MotionExport } from "./motion-export";

export const metadata: Metadata = {
  title: "Pixl motion export",
  robots: { index: false, follow: false },
};

export default async function BrandMotionExportPage({
  searchParams,
}: {
  searchParams: Promise<{ variant?: string }>;
}) {
  if (process.env.NODE_ENV === "production") notFound();
  const { variant } = await searchParams;
  const color = variant === "white" ? "#F7F8F8" : "#30CB77";
  return <MotionExport color={color} />;
}
