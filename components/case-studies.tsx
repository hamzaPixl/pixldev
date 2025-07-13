"use client";

import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export interface CaseStudyItem {
  id: string;
  title: string;
  description: string;
  challenge: string;
  solution: string;
  result: string;
  industry: string;
  technologies: string[];
  image: string;
}

const caseStudiesData: CaseStudyItem[] = [
  {
    id: "logistics-dashboard",
    title: "Smart Logistics Dashboard",
    description: "Real-time supply chain visibility that reduced delivery delays by 60%",
    challenge: "Logistics company struggling with manual tracking, delayed updates, and lack of real-time visibility across supply chain.",
    solution: "AI-powered dashboard with predictive analytics, automated alerts, and real-time tracking integration with IoT sensors.",
    result: "60% reduction in delivery delays, 40% improvement in route optimization, 25% cost savings",
    industry: "Logistics",
    technologies: ["React", "Python", "MongoDB", "IoT Integration"],
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=600&fit=crop"
  },
  {
    id: "finance-automation",
    title: "Financial Processing Automation",
    description: "Automated invoice processing saving 15 hours per week",
    challenge: "Accounting firm spending excessive time on manual invoice processing and data entry tasks.",
    solution: "AI-powered document processing system with OCR, automated categorization, and integration with existing accounting software.",
    result: "15 hours/week time savings, 99% accuracy rate, 70% faster invoice processing",
    industry: "Finance",
    technologies: ["OCR APIs", "Next.js", "TypeScript", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop"
  }
];

export interface CaseStudiesProps {
  title?: string;
  description?: string;
  items?: CaseStudyItem[];
}

const CaseStudies = ({
  title = "Case Studies",
  description = "Real results from real businesses. See how we've helped companies transform their operations with AI-powered solutions.",
  items = caseStudiesData,
}: CaseStudiesProps) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <section id="case-studies" className="w-full py-16 xs:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight mb-6 text-foreground">
            {title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">{description}</p>
        </div>
        <div className="mb-8 flex items-end justify-between md:mb-14 lg:mb-16">
          <div className="flex-1"></div>
          <div className="hidden shrink-0 gap-2 md:flex">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                carouselApi?.scrollPrev();
              }}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto hover:bg-pixl-teal/10 hover:text-pixl-teal"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                carouselApi?.scrollNext();
              }}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto hover:bg-pixl-teal/10 hover:text-pixl-teal"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            align: "start",
            loop: false,
            slidesToScroll: 1,
            breakpoints: {
              "(max-width: 768px)": {
                slidesToScroll: 1,
              },
              "(min-width: 768px)": {
                slidesToScroll: 3,
              },
            },
          }}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="pl-2 md:pl-4 basis-full md:basis-1/3"
              >
                <Card className="group backdrop-blur-lg border-border/20 hover:border-pixl-teal/30 transition-all duration-300 h-[560px] flex flex-col">
                  <div className="relative h-56 w-full overflow-hidden rounded-t-xl">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-pixl-teal/90 text-black px-3 py-1 rounded-full text-sm font-medium">
                        {item.industry}
                      </span>
                    </div>
                  </div>
                  
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-pixl-teal transition-colors duration-300">
                      {item.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {item.description}
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      <div>
                        <h4 className="font-semibold text-sm text-pixl-teal mb-1">Challenge</h4>
                        <p className="text-sm text-muted-foreground">{item.challenge}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-sm text-pixl-teal mb-1">Result</h4>
                        <p className="text-sm text-foreground font-medium">{item.result}</p>
                      </div>
                    </div>
                    
                    <div className="mt-auto space-y-3">
                      <div>
                        <h4 className="font-semibold text-sm text-muted-foreground mb-2">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {item.technologies.map((tech) => (
                            <span 
                              key={tech}
                              className="bg-pixl-teal/10 text-pixl-teal px-2 py-1 rounded text-xs font-medium border border-pixl-teal/20"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        className="w-full mt-4 group/btn hover:bg-pixl-teal/10 hover:text-pixl-teal"
                      >
                        Learn More 
                        <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
            
            {/* You're Next Card */}
            <CarouselItem className="pl-2 md:pl-4 basis-full md:basis-1/3">
              <Card 
                className="group bg-pixl-teal backdrop-blur-lg border-pixl-teal hover:bg-pixl-teal/90 transition-all duration-300 cursor-pointer h-[560px] flex flex-col"
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <CardContent className="p-8 text-center flex-1 flex flex-col justify-center items-center">
                  <div className="space-y-6">
                    <h3 className="text-3xl md:text-4xl font-bold text-black dark:text-white">
                      You&apos;re Next
                    </h3>
                    
                    <p className="text-black/80 dark:text-white/80 text-lg leading-relaxed max-w-sm mx-auto">
                      Ready to join our success stories? Let&apos;s discuss your project and create the next case study together.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-black dark:text-white mb-2">Ready to Start?</h4>
                        <p className="text-black/70 dark:text-white/70 leading-relaxed">Tell us about your challenge and we&apos;ll build the solution</p>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="lg"
                        className="border-black/30 dark:border-white/30 text-black dark:text-white bg-black/5 dark:bg-white/5 hover:bg-black/15 dark:hover:bg-white/15 hover:border-black/50 dark:hover:border-white/50 hover:text-black dark:hover:text-white font-semibold px-8 py-3 rounded-full transition-all duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          const contactSection = document.getElementById('contact');
                          if (contactSection) {
                            contactSection.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                      >
                        Start Your Project
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
        <div className="mt-8 flex justify-center gap-2">
          {[...items, { id: 'next' }].map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
                currentSlide === index ? "bg-pixl-teal" : "bg-pixl-teal/20"
              }`}
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;