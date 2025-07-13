"use client";

import { ArrowLeft, ArrowRight, Calendar, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useLanguage } from "@/lib/language-context";
import { ContentItem } from "@/lib/content";

export interface BlogCarouselProps {
  title?: string;
  description?: string;
  posts: ContentItem[];
}

const BlogCarousel = ({ title, description, posts }: BlogCarouselProps) => {
  const { t } = useLanguage();
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Use translations for default values
  const defaultTitle = title || "Latest Insights";
  const defaultDescription =
    description ||
    "Explore our latest thoughts on technology, development, and innovation.";

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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

  // If no posts, don't render the section
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section id="blog" className="w-full py-16 xs:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight mb-6 text-foreground">
            {defaultTitle}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {defaultDescription}
          </p>
          <div className="mt-8">
            <Link href="/blog">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 hover:bg-pixl-teal/10 hover:text-pixl-teal hover:border-pixl-teal/30 group"
              >
                {t("common.viewMore")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
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
              className="disabled:pointer-events-auto hover:bg-pixl-teal/10 hover:text-pixl-teal rounded-full"
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
              className="disabled:pointer-events-auto hover:bg-pixl-teal/10 hover:text-pixl-teal rounded-full"
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
            {posts.map((post) => (
              <CarouselItem
                key={post.slug}
                className="pl-2 md:pl-4 basis-full md:basis-1/3"
              >
                <Link href={`/blog/${post.slug}`} className="block group">
                  <Card className="backdrop-blur-lg border-border/20 hover:border-pixl-teal/30 transition-all duration-300 h-[600px] flex flex-col shadow-none overflow-hidden cursor-pointer">
                    {/* Featured image */}
                    {post.frontmatter.image && (
                      <div className="relative h-[200px] w-full overflow-hidden flex-shrink-0">
                        <Image
                          src={post.frontmatter.image}
                          alt={post.frontmatter.title}
                          fill
                          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        {post.frontmatter.category && (
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-pixl-teal text-white">
                              {post.frontmatter.category}
                            </Badge>
                          </div>
                        )}
                      </div>
                    )}

                    <CardContent className="p-6 pt-6 flex-1 flex flex-col">
                      {/* Meta information */}
                      <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mb-4 flex-wrap">
                        {post.frontmatter.date && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(post.frontmatter.date)}</span>
                          </div>
                        )}
                      </div>

                      {/* Title and description */}
                      <div className="mb-4">
                        <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-pixl-teal transition-colors duration-300">
                          {post.frontmatter.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                          {post.frontmatter.description}
                        </p>
                      </div>

                      <div className="flex-1 space-y-4">
                        {/* Keywords */}
                        {post.frontmatter.keywords &&
                          post.frontmatter.keywords.length > 0 && (
                            <div>
                              <h4 className="font-semibold text-foreground mb-2">
                                Tags
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {post.frontmatter.keywords
                                  .slice(0, 3)
                                  .map((keyword: string, index: number) => (
                                    <span
                                      key={index}
                                      className="bg-pixl-teal/10 text-pixl-teal px-2 py-1 rounded text-xs font-medium border border-pixl-teal/20"
                                    >
                                      {keyword}
                                    </span>
                                  ))}
                              </div>
                            </div>
                          )}

                        {/* Read more indicator */}
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-pixl-teal text-sm font-medium group-hover:text-pixl-teal/80 transition-colors">
                            {t("common.readMore")}
                          </span>
                          <ExternalLink className="h-4 w-4 text-pixl-teal transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}

            {/* View All Blog Posts Card */}
            <CarouselItem className="pl-2 md:pl-4 basis-full md:basis-1/3">
              <Card className="group bg-pixl-teal backdrop-blur-lg border-pixl-teal hover:bg-pixl-teal/90 transition-all duration-300 cursor-pointer h-[600px] flex flex-col shadow-none">
                <CardContent className="p-8 pt-8 text-center flex-1 flex flex-col justify-center items-center">
                  <div className="space-y-6">
                    <h3 className="text-3xl md:text-4xl font-bold text-white">
                      Explore More
                    </h3>

                    <p className="text-white/80 text-lg leading-relaxed max-w-sm mx-auto">
                      Dive deeper into our insights on technology, development,
                      and innovation.
                    </p>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-white mb-2">
                          Ready to Learn?
                        </h4>
                        <p className="text-white/70 leading-relaxed">
                          Check out all our articles and stay updated with the
                          latest trends.
                        </p>
                      </div>

                      <Link href="/blog">
                        <Button
                          variant="outline"
                          size="lg"
                          className="border-white/30 text-white bg-white/5 hover:bg-white/15 hover:border-white/50 hover:text-white font-semibold px-8 py-3 rounded-full transition-all duration-300"
                        >
                          View All Articles
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
        <div className="mt-8 flex justify-center gap-2">
          {[...posts, { slug: "view-all" }].map((_, index) => (
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

export default BlogCarousel;
