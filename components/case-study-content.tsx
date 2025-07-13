"use client";

import {
  ArrowLeft,
  Calendar,
  Building2,
  Tags,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ContentItem } from "@/lib/content";
import { useLanguage } from "@/lib/language-context";

interface CaseStudyContentProps {
  caseStudy: ContentItem;
}

export function CaseStudyContent({ caseStudy }: CaseStudyContentProps) {
  const { t } = useLanguage();
  const { frontmatter, htmlContent } = caseStudy;

  const formattedDate = new Date(frontmatter.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-background">
      {/* Breadcrumb navigation */}
      <div className="max-w-4xl mx-auto px-6 pt-8 pb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-pixl-teal transition-colors">
            {t("common.home")}
          </Link>
          <span>/</span>
          <Link
            href="/case-studies"
            className="hover:text-pixl-teal transition-colors"
          >
            {t("navigation.caseStudies")}
          </Link>
          <span>/</span>
          <span className="text-foreground">{frontmatter.title}</span>
        </div>
      </div>

      {/* Back to case studies button */}
      <div className="max-w-4xl mx-auto px-6 pb-8">
        <Link href="/case-studies">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 hover:bg-pixl-teal/10 hover:text-pixl-teal transition-all duration-300 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {t("common.goBack")}
          </Button>
        </Link>
      </div>

      {/* Hero section */}
      <div className="max-w-4xl mx-auto px-6 pt-12 pb-8">
        <div className="space-y-6">
          {/* Meta information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {frontmatter.date && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formattedDate}</span>
              </div>
            )}
            {frontmatter.industry && (
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                <span>{frontmatter.industry}</span>
              </div>
            )}
          </div>

          {/* Title and description */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              {frontmatter.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              {frontmatter.description}
            </p>
          </div>

          {/* Keywords */}
          {frontmatter.keywords && frontmatter.keywords.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <Tags className="h-4 w-4 text-muted-foreground" />
              {frontmatter.keywords.map((keyword, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-pixl-teal/10 text-pixl-teal border-pixl-teal/20"
                >
                  {keyword}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Hero image */}
      {frontmatter.image && (
        <div className="max-w-6xl mx-auto px-6 mb-12">
          <div className="relative aspect-video rounded-xl overflow-hidden">
            <Image
              src={frontmatter.image}
              alt={frontmatter.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 pb-16">
        <Card className="border-border/20 shadow-sm">
          <CardContent className="p-8 md:p-12">
            <div
              className="prose prose-neutral dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-code:text-pixl-teal prose-code:bg-pixl-teal/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-blockquote:border-l-pixl-teal prose-blockquote:text-muted-foreground prose-a:text-pixl-teal prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </CardContent>
        </Card>

        {/* Footer actions */}
        <div className="mt-12 pt-8 border-t border-border/20">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                {t("caseStudies.youreNext.readyToStart") ||
                  "Ready to start your project?"}
              </h3>
              <p className="text-muted-foreground">
                {t("caseStudies.youreNext.tellUs") ||
                  "Tell us about your challenge and we'll build the solution."}
              </p>
            </div>
            <div className="flex gap-4">
              <Link href="/#contact">
                <Button className="bg-pixl-teal hover:bg-pixl-teal/90 text-black font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-pixl-teal/25 gap-2 group">
                  {t("common.startProject") || "Start Your Project"}
                  <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/#case-studies">
                <Button
                  variant="outline"
                  className="px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 border-border/50 hover:border-pixl-teal/30"
                >
                  {t("common.viewMore") || "View More Cases"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
