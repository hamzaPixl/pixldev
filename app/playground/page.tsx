"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FileText, Search, ArrowRight, ExternalLink } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export default function PlaygroundPage() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  // Playground tools data - using translations
  const playgroundTools = [
    {
      id: "markdown-editor",
      title: t("playground.tools.markdownEditor.title"),
      description: t("playground.tools.markdownEditor.description"),
      icon: FileText,
      category: "Content",
      difficulty: "Beginner",
      type: "tool",
      comingSoon: false,
    },
  ];

  const categories = [
    t("playground.categories.all"),
    t("playground.categories.content"),
  ];
  const difficulties = [
    t("playground.difficulties.all"),
    t("playground.difficulties.beginner"),
  ];

  const filteredTools = playgroundTools.filter((tool) => {
    const matchesSearch =
      tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === t("playground.categories.all") ||
      tool.category === selectedCategory;
    const matchesDifficulty =
      selectedDifficulty === t("playground.difficulties.all") ||
      tool.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-pixl-teal/10 to-background py-24">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-pixl-teal">{t("playground.title")}</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {t("playground.subtitle")}
            </p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder={t("playground.searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-pixl-teal hover:bg-pixl-teal/90 text-black"
                    : ""
                }
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Difficulty Filter */}
          <div className="flex gap-2 flex-wrap">
            {difficulties.map((difficulty) => (
              <Button
                key={difficulty}
                variant={
                  selectedDifficulty === difficulty ? "default" : "outline"
                }
                size="sm"
                onClick={() => setSelectedDifficulty(difficulty)}
                className={
                  selectedDifficulty === difficulty
                    ? "bg-pixl-teal hover:bg-pixl-teal/90 text-black"
                    : ""
                }
              >
                {difficulty}
              </Button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => {
            const Icon = tool.icon;

            return (
              <Card
                key={tool.id}
                className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-pixl-teal/30"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-pixl-teal/10 rounded-lg group-hover:bg-pixl-teal/20 transition-colors">
                        <Icon className="h-6 w-6 text-pixl-teal" />
                      </div>
                      <div>
                        <Badge variant="outline" className="text-xs mb-2">
                          {tool.category}
                        </Badge>
                      </div>
                    </div>
                    {tool.comingSoon && (
                      <Badge variant="secondary" className="text-xs">
                        Coming Soon
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg group-hover:text-pixl-teal transition-colors">
                    {tool.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {tool.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <Badge
                      className={`text-xs ${getDifficultyColor(
                        tool.difficulty
                      )}`}
                    >
                      {tool.difficulty}
                    </Badge>

                    {tool.comingSoon ? (
                      <Button variant="outline" size="sm" disabled>
                        Coming Soon
                      </Button>
                    ) : (
                      <Button
                        asChild
                        size="sm"
                        className="bg-pixl-teal hover:bg-pixl-teal/90 text-black"
                      >
                        <Link href={`/playground/${tool.id}`}>
                          <ExternalLink className="h-4 w-4 mr-1" />
                          {t("playground.buttons.launchTool")}
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">{t("playground.noResults.title")}</p>
              <p className="text-sm">{t("playground.noResults.subtitle")}</p>
            </div>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-muted/50 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t("playground.ctaSection.title")}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t("playground.ctaSection.description")}
          </p>
          <Button
            asChild
            size="lg"
            className="bg-pixl-teal hover:bg-pixl-teal/90 text-black font-semibold px-8 py-3 rounded-full"
          >
            <Link href="/#contact">
              {t("playground.buttons.requestCustom")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
