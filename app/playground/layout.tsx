import { ReactNode } from "react";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";

export default function PlaygroundLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="pt-16">{children}</main>
      <Footer />
    </>
  );
}
