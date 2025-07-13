"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, Building2, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ContentItem } from "@/lib/content";
import { useLanguage } from "@/lib/language-context";

interface CaseStudiesListProps {
  caseStudies: ContentItem[];
}

export default function CaseStudiesList({ caseStudies }: CaseStudiesListProps) {
  const { t } = useLanguage();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-background py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Breadcrumb navigation */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-pixl-teal transition-colors">
              {t("common.home")}
            </Link>
            <span>/</span>
            <span className="text-foreground">
              {t("navigation.caseStudies")}
            </span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-foreground">
            {t("caseStudies.title")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t("caseStudies.description")}
          </p>
        </div>

        {/* Case studies grid */}
        {caseStudies.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              No case studies available yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((caseStudy) => (
              <Card
                key={caseStudy.slug}
                className="group border-border/20 hover:border-pixl-teal/30 transition-all duration-300 overflow-hidden"
              >
                {/* Featured image */}
                {caseStudy.frontmatter.image && (
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={caseStudy.frontmatter.image}
                      alt={caseStudy.frontmatter.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    {caseStudy.frontmatter.industry && (
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-pixl-teal/90 text-black">
                          {caseStudy.frontmatter.industry}
                        </Badge>
                      </div>
                    )}
                  </div>
                )}

                <CardContent className="p-6">
                  {/* Meta information */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    {caseStudy.frontmatter.date && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(caseStudy.frontmatter.date)}</span>
                      </div>
                    )}
                    {caseStudy.frontmatter.client && (
                      <div className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        <span>{caseStudy.frontmatter.client}</span>
                      </div>
                    )}
                  </div>

                  {/* Title and description */}
                  <div className="space-y-3 mb-4">
                    <h2 className="text-xl font-bold text-foreground group-hover:text-pixl-teal transition-colors">
                      {caseStudy.frontmatter.title}
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                      {caseStudy.frontmatter.description}
                    </p>
                  </div>

                  {/* Keywords */}
                  {caseStudy.frontmatter.keywords &&
                    caseStudy.frontmatter.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {caseStudy.frontmatter.keywords
                          .slice(0, 3)
                          .map((keyword, index) => (
                            <span
                              key={index}
                              className="bg-pixl-teal/10 text-pixl-teal px-2 py-1 rounded text-xs font-medium border border-pixl-teal/20"
                            >
                              {keyword}
                            </span>
                          ))}
                      </div>
                    )}

                  {/* Read more button */}
                  <Link href={`/case-studies/${caseStudy.slug}`}>
                    <Button
                      variant="ghost"
                      className="w-full group/btn hover:bg-pixl-teal/10 hover:text-pixl-teal"
                    >
                      {t("common.readMore")}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
