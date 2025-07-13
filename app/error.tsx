'use client';

import { Button } from "@/components/ui/button";
import { Home, RefreshCw, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-background">
      <div className="text-center max-w-2xl mx-auto">
        {/* Large 500 Text */}
        <div className="mb-8">
          <h1 className="text-8xl xs:text-9xl sm:text-[12rem] font-bold text-red-500/20 leading-none">
            500
          </h1>
        </div>
        
        {/* Glass Card */}
        <div className="rounded-xl bg-card/10 backdrop-blur-lg border border-border/20 p-8 md:p-12 mb-8 relative overflow-hidden">
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-red-500/10 p-4">
                  <AlertTriangle className="h-8 w-8 text-red-500" />
                </div>
              </div>
              
              <h2 className="text-3xl xs:text-4xl font-bold text-foreground">
                Server Error
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Something went wrong on our end. Our AI is already working on a fix!
              </p>
            </div>
            
            <div className="space-y-4">
              <p className="text-muted-foreground">
                We&apos;ve been notified about this issue and our team is investigating. 
                In the meantime, you can try refreshing the page or return to our homepage.
              </p>
              
              <div className="flex flex-col xs:flex-row gap-4 justify-center items-center">
                <Button 
                  size="lg"
                  className="bg-pixl-teal hover:bg-pixl-teal/90 text-black font-semibold px-8 py-3 rounded-full transition-all duration-300"
                  onClick={reset}
                >
                  <RefreshCw className="mr-2 h-5 w-5" />
                  Try Again
                </Button>
                
                <Button 
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-pixl-teal/40 text-pixl-teal hover:bg-pixl-teal/10 hover:text-black dark:hover:text-white hover:border-pixl-teal/60 px-8 py-3 rounded-full transition-all duration-300"
                >
                  <Link href="/">
                    <Home className="mr-2 h-5 w-5" />
                    Back to Home
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Error Details (Development Only) */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-8 p-4 bg-muted/20 rounded-lg border border-border/30">
                <h3 className="font-semibold text-sm mb-2 text-foreground">Error Details (Development)</h3>
                <p className="text-xs text-muted-foreground font-mono break-all">
                  {error.message}
                </p>
                {error.digest && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Error ID: {error.digest}
                  </p>
                )}
              </div>
            )}
          </div>
          
          {/* Subtle pattern overlay */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,#000_50%,transparent_90%)] bg-[size:60px_60px] opacity-10 rounded-xl"></div>
        </div>
        
        {/* Support Info */}
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            If this problem persists, please contact our support team:
          </p>
          <div className="flex justify-center">
            <Link 
              href="mailto:contact@pixldev.be" 
              className="text-sm text-pixl-teal hover:text-pixl-teal/80 transition-colors"
            >
              contact@pixldev.be
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}