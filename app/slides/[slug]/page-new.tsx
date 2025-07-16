"use client";

import { useState, useEffect, use } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { slideConfigurations } from "@/data/slides";
import PasscodeInput from "@/components/passcode-input";

interface SlidePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function SlidePage({ params }: SlidePageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Unwrap the params Promise
  const { slug } = use(params);

  // Get configuration for the current slug
  const config = slideConfigurations[slug as keyof typeof slideConfigurations];

  // If slug doesn't exist, show 404
  if (!config) {
    notFound();
  }

  const { slides, partnerLogo, partnerName } = config;

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/check-access", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ slug: slug }),
        });

        if (response.ok) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [slug]);

  // Keyboard navigation
  useEffect(() => {
    if (!isAuthenticated) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        if (currentSlide < slides.length - 1) {
          setCurrentSlide(currentSlide + 1);
        }
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (currentSlide > 0) {
          setCurrentSlide(currentSlide - 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentSlide, slides.length, isAuthenticated]);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  // Handle touch events for swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pixl-teal mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  // Show passcode input if not authenticated
  if (!isAuthenticated) {
    return (
      <PasscodeInput
        onCorrectPasscode={() => setIsAuthenticated(true)}
        partnerName={partnerName}
        partnerLogo={partnerLogo || undefined}
        slug={slug}
      />
    );
  }

  return (
    <div className="min-h-screen bg-muted flex flex-col overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-1 md:p-4">
        <div
          className="relative w-full max-w-6xl h-[calc(100vh-2rem)] md:h-[calc(100vh-4rem)] bg-card border border-border rounded-xl md:rounded-3xl shadow-2xl overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Partnership Header - Inside slide container */}
          <div className="absolute top-0 left-0 right-0 z-10 bg-card/95 backdrop-blur-sm border-b border-border px-3 py-3 md:px-6 md:py-4">
            <div className="flex items-center justify-center gap-3 md:gap-6">
              <div className="flex items-center gap-3">
                <Image
                  src="/Logo White.svg"
                  alt="Pixl Logo"
                  width={32}
                  height={32}
                  className="md:w-12 md:h-12"
                />
                <span className="text-lg md:text-xl font-bold text-foreground">
                  Pixl
                </span>
              </div>

              {partnerLogo && (
                <>
                  <span className="text-2xl md:text-3xl font-bold text-pixl-teal mx-2">
                    ×
                  </span>

                  <div className="flex items-center gap-3">
                    <Image
                      src={partnerLogo}
                      alt={`${partnerName} Logo`}
                      width={32}
                      height={32}
                      className="md:w-12 md:h-12 rounded"
                    />
                    <span className="text-lg md:text-xl font-bold text-foreground">
                      {partnerName}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Slide Container */}
          <div className="relative w-full h-full flex flex-col pt-16 md:pt-20">
            {/* Slide Content */}
            <div className="flex-1 flex flex-col justify-center items-center text-center p-6 md:p-12 lg:p-16">
              <div className="w-full max-w-5xl">
                <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6 lg:mb-8 leading-tight">
                  {slides[currentSlide].title}
                </h1>
                <h2 className="text-lg md:text-2xl lg:text-3xl font-semibold text-pixl-teal mb-6 md:mb-8 lg:mb-12 leading-relaxed">
                  {slides[currentSlide].subtitle}
                </h2>
                <div className="text-base md:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                  {slides[currentSlide].content}
                </div>
              </div>
            </div>

            {/* Mobile Touch Navigation Areas */}
            <div className="md:hidden absolute inset-0 flex">
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="flex-1 bg-transparent"
                aria-label="Previous slide"
              />
              <button
                onClick={nextSlide}
                disabled={currentSlide === slides.length - 1}
                className="flex-1 bg-transparent"
                aria-label="Next slide"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex absolute bottom-6 left-6 right-6 justify-between items-center">
              <Button
                variant="outline"
                size="lg"
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="flex items-center gap-2 bg-card/80 backdrop-blur-sm border-border hover:bg-accent"
              >
                <ChevronLeft className="w-4 h-4" />
                Précédent
              </Button>

              {/* Slide indicator */}
              <div className="flex items-center gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "bg-pixl-teal scale-125"
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="lg"
                onClick={nextSlide}
                disabled={currentSlide === slides.length - 1}
                className="flex items-center gap-2 bg-card/80 backdrop-blur-sm border-border hover:bg-accent"
              >
                Suivant
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden absolute bottom-4 left-4 right-4">
              <div className="flex justify-between items-center mb-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevSlide}
                  disabled={currentSlide === 0}
                  className="flex items-center gap-1 bg-card/90 backdrop-blur-sm text-xs"
                >
                  <ChevronLeft className="w-3 h-3" />
                  Préc.
                </Button>

                <div className="text-xs text-muted-foreground bg-card/90 backdrop-blur-sm px-2 py-1 rounded-full border border-border">
                  {currentSlide + 1} / {slides.length}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextSlide}
                  disabled={currentSlide === slides.length - 1}
                  className="flex items-center gap-1 bg-card/90 backdrop-blur-sm text-xs"
                >
                  Suiv.
                  <ChevronRight className="w-3 h-3" />
                </Button>
              </div>

              {/* Mobile Slide indicators */}
              <div className="flex items-center justify-center gap-1">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "bg-pixl-teal scale-125"
                        : "bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Desktop Slide counter */}
            <div className="hidden md:block absolute top-3 right-4 text-sm text-muted-foreground bg-card/80 backdrop-blur-sm px-3 py-1 rounded-full border border-border">
              {currentSlide + 1} / {slides.length}
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="hidden md:block absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground bg-card/80 backdrop-blur-sm px-3 py-1 rounded-full border border-border">
        Utilisez les flèches ou la barre d&apos;espace pour naviguer
      </div>

      {/* Mobile Instructions */}
      <div className="md:hidden text-center text-xs text-muted-foreground py-2">
        Tapez à gauche/droite ou utilisez les boutons pour naviguer
      </div>
    </div>
  );
}
