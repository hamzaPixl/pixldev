'use client';

import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-background">
      <div className="text-center max-w-2xl mx-auto">
        {/* Large 404 Text */}
        <div className="mb-8">
          <h1 className="text-8xl xs:text-9xl sm:text-[12rem] font-bold text-pixl-teal/20 leading-none">
            404
          </h1>
        </div>
        
        {/* Glass Card */}
        <div className="rounded-xl bg-card/10 backdrop-blur-lg border border-border/20 p-8 md:p-12 mb-8">
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-3xl xs:text-4xl font-bold text-foreground">
                Page Not Found
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Oops! The page you&apos;re looking for seems to have wandered off into the digital void.
              </p>
            </div>
            
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Don&apos;t worry though - even our AI can&apos;t predict every click. 
                Let&apos;s get you back on track with some intelligent navigation.
              </p>
              
              <div className="flex flex-col xs:flex-row gap-4 justify-center items-center">
                <Button 
                  asChild
                  size="lg"
                  className="bg-pixl-teal hover:bg-pixl-teal/90 text-black font-semibold px-8 py-3 rounded-full transition-all duration-300"
                >
                  <Link href="/">
                    <Home className="mr-2 h-5 w-5" />
                    Back to Home
                  </Link>
                </Button>
                
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-pixl-teal/40 text-pixl-teal hover:bg-pixl-teal/10 hover:text-white hover:border-pixl-teal/60 px-8 py-3 rounded-full transition-all duration-300"
                  onClick={() => window.history.back()}
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Go Back
                </Button>
              </div>
            </div>
          </div>
          
          {/* Subtle pattern overlay */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,#000_50%,transparent_90%)] bg-[size:60px_60px] opacity-10 rounded-xl"></div>
        </div>
        
        {/* Helpful Links */}
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Looking for something specific? Try these popular pages:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/#about" 
              className="text-sm text-pixl-teal hover:text-pixl-teal/80 transition-colors"
            >
              About Us
            </Link>
            <Link 
              href="/#case-studies" 
              className="text-sm text-pixl-teal hover:text-pixl-teal/80 transition-colors"
            >
              Case Studies
            </Link>
            <Link 
              href="/#contact" 
              className="text-sm text-pixl-teal hover:text-pixl-teal/80 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}