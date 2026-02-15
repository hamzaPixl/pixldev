"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Clock,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { SharedLayout } from "@/components/shared-layout";
import { useLanguage } from "@/lib/language-context";
import { getBlogPost } from "@/lib/blog";
const dateLocaleMap = { en: "en-US", fr: "fr-FR", nl: "nl-NL" } as const;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogPostPage({ params }: PageProps) {
  const { slug } = use(params);
  const { t, currentLanguage } = useLanguage();
  const post = getBlogPost(slug, currentLanguage);

  if (!post) {
    notFound();
  }

  const Icon = post.icon;

  return (
    <SharedLayout>
      {/* Header */}
      <section className="border-b border-border px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-6">
            <Link
              href="/"
              className="hover:text-primary transition-colors"
            >
              {t("blog.home")}
            </Link>
            <span>/</span>
            <Link
              href="/blog"
              className="hover:text-primary transition-colors"
            >
              {t("blog.blog")}
            </Link>
            <span>/</span>
            <span className="text-foreground truncate">{post.title}</span>
          </div>

          {/* Back */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            {t("blog.allPosts")}
          </Link>

          {/* Title block */}
          <div className="flex gap-4 sm:gap-5 items-start mb-6">
            <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 border-2 border-primary/30 bg-primary/10 flex items-center justify-center">
              <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
            </div>
            <div>
              <h1 className="font-pixel text-2xl sm:text-3xl md:text-4xl text-foreground mb-2">
                {post.title}
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
                {post.description}
              </p>
            </div>
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider px-2 py-0.5 border text-primary border-primary/30 bg-primary/10">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(post.date).toLocaleDateString(dateLocaleMap[currentLanguage], {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>

          {/* Authors */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="text-xs text-muted-foreground">{t("blog.by")}</span>
            {post.authors.map((author) => (
              <a
                key={author.name}
                href={author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs sm:text-sm text-foreground hover:text-primary transition-colors pixel-link"
              >
                {author.name}
                <ExternalLink className="w-3 h-3" />
              </a>
            ))}
          </div>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] sm:text-xs text-muted-foreground border border-border px-1.5 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Baton Flow Diagram */}
      <section className="border-b border-border px-4 sm:px-6 py-12 sm:py-16 bg-card/50">
        <div className="max-w-5xl mx-auto">
          <BatonFlowDiagram t={t} />
        </div>
      </section>

      {/* Content */}
      <main className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="border-2 border-border bg-card p-6 sm:p-8 md:p-10">
            <BlogMarkdown content={post.content} />
          </div>

          {/* Footer CTA */}
          <div className="mt-8 sm:mt-12 border-2 border-border p-6 sm:p-8 text-center">
            <p className="font-pixel text-lg sm:text-xl text-foreground mb-2">
              {t("blog.ctaTitle")}
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              {t("blog.ctaSubtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors text-sm"
              >
                {t("blog.ctaContact")}
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 border-2 border-border text-foreground hover:border-primary/50 transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                {t("blog.allPosts")}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </SharedLayout>
  );
}

// ─── Baton Flow Diagram (visual) ──────────────────────────────────────

function BatonFlowDiagram({ t }: { t: (key: string) => string }) {
  const stages = [
    { label: "Planner", num: "01" },
    { label: "Implementer", num: "02" },
    { label: "Tester", num: "03" },
    { label: "Reviewer", num: "04" },
  ];

  const batonFields = [
    { key: "goal", value: '"Add user auth"', highlight: true },
    { key: "current_state", value: '["Routes created", "Tests passing"]', highlight: false },
    { key: "decision_log", value: '["Chose JWT over sessions"]', highlight: false },
    { key: "constraints", value: '["No breaking changes"]', highlight: false },
    { key: "work_scope", value: '["src/auth/*"]', highlight: false },
    { key: "artifacts", value: "[...]", highlight: false },
    { key: "open_questions", value: "[]", highlight: false },
    { key: "acceptance", value: '["All auth tests green"]', highlight: false },
  ];

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Title */}
      <div className="text-center">
        <p className="font-pixel text-lg sm:text-xl text-primary glow mb-2">
          {t("blog.batonFlowTitle")}
        </p>
        <div className="w-16 h-0.5 bg-primary/40 mx-auto" />
      </div>

      {/* Pipeline flow */}
      <div className="relative">
        {/* Connecting line (desktop) */}
        <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-px bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 -translate-y-1/2" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 relative">
          {stages.map((stage, i) => (
            <div key={stage.label} className="relative group">
              {/* Arrow between stages (desktop) */}
              {i < stages.length - 1 && (
                <div className="hidden md:flex absolute -right-3 sm:-right-4 top-1/2 -translate-y-1/2 z-10 flex-col items-center gap-0.5">
                  <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[7px] border-l-primary/50" />
                </div>
              )}

              {/* Stage card */}
              <div className="border-2 border-border bg-background p-4 sm:p-5 text-center pixel-border group-hover:pixel-border-active transition-all relative overflow-hidden">
                {/* Stage number */}
                <div className="absolute top-2 left-2 font-mono text-[10px] text-muted-foreground/40">
                  {stage.num}
                </div>

                {/* Terminal prompt icon */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-primary/30 bg-primary/5 flex items-center justify-center mx-auto mb-3 group-hover:border-primary/60 transition-colors">
                  <span className="font-pixel text-primary text-lg sm:text-xl glow">{">"}_</span>
                </div>

                {/* Label */}
                <div className="font-pixel text-base sm:text-lg text-foreground group-hover:text-primary transition-colors">
                  {stage.label}
                </div>

                {/* Baton badge */}
                <div className="mt-3 inline-flex items-center gap-1.5 px-2 py-1 border border-primary/20 bg-primary/5">
                  <div className="w-1.5 h-1.5 bg-primary/60 animate-pulse" />
                  <span className="font-mono text-[10px] sm:text-xs text-primary/70">baton + patch</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Baton object - big code block */}
      <div className="border-2 border-border bg-background relative overflow-hidden">
        {/* Header bar */}
        <div className="flex items-center gap-2 px-4 sm:px-6 py-3 border-b border-border bg-card/50">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 bg-primary/40" />
            <div className="w-2.5 h-2.5 bg-gold/40" />
            <div className="w-2.5 h-2.5 bg-muted-foreground/30" />
          </div>
          <span className="font-mono text-xs text-muted-foreground ml-2">baton.json</span>
          <span className="font-mono text-[10px] text-muted-foreground/50 ml-auto">~1,000 tokens</span>
        </div>

        {/* Code content */}
        <div className="p-5 sm:p-6 md:p-8 font-mono text-sm sm:text-base leading-relaxed">
          <div className="text-primary text-lg">{"{"}</div>

          {batonFields.map((field, i) => (
            <div key={field.key} className="flex flex-wrap gap-x-1 pl-4 sm:pl-8 py-0.5">
              <span className={field.highlight ? "text-gold glow-gold font-semibold" : "text-gold"}>
                {field.key}
              </span>
              <span className="text-muted-foreground">:</span>
              <span className="text-foreground/80 break-all">{field.value}</span>
              {i < batonFields.length - 1 && <span className="text-muted-foreground/40">,</span>}
            </div>
          ))}

          <div className="text-primary text-lg">{"}"}</div>
        </div>

        {/* Decorative scanline */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(120 100% 50%) 2px, hsl(120 100% 50%) 3px)",
        }} />
      </div>
    </div>
  );
}

// ─── Simple Markdown Renderer ─────────────────────────────────────────

function BlogMarkdown({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Heading ##
    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={i}
          className="font-pixel text-xl sm:text-2xl text-primary mt-10 mb-4 first:mt-0"
        >
          {line.slice(3)}
        </h2>
      );
      i++;
      continue;
    }

    // Heading ###
    if (line.startsWith("### ")) {
      elements.push(
        <h3
          key={i}
          className="font-pixel text-lg sm:text-xl text-foreground mt-8 mb-3"
        >
          {line.slice(4)}
        </h3>
      );
      i++;
      continue;
    }

    // Horizontal rule
    if (line.trim() === "---") {
      elements.push(
        <hr key={i} className="border-border my-8" />
      );
      i++;
      continue;
    }

    // Table
    if (line.startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      elements.push(<MarkdownTable key={`table-${i}`} lines={tableLines} />);
      continue;
    }

    // Unordered list
    if (line.startsWith("- ")) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="space-y-2 my-4 ml-1">
          {listItems.map((item, j) => (
            <li key={j} className="flex gap-2 text-sm sm:text-base text-muted-foreground">
              <span className="text-primary shrink-0 mt-1">{">"}</span>
              <span>
                <InlineMarkdown text={item} />
              </span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Blockquote
    if (line.startsWith("→ ") || line.startsWith("> ")) {
      const prefix = line.startsWith("→ ") ? "→ " : "> ";
      elements.push(
        <div
          key={i}
          className="border-l-2 border-primary/30 pl-3 sm:pl-4 py-0.5 my-1 text-sm text-muted-foreground"
        >
          <InlineMarkdown text={line.slice(prefix.length)} />
        </div>
      );
      i++;
      continue;
    }

    // Bold paragraph (**text**)
    if (line.startsWith("**") && !line.startsWith("**Stage")) {
      elements.push(
        <p key={i} className="text-sm sm:text-base text-muted-foreground my-3 leading-relaxed">
          <InlineMarkdown text={line} />
        </p>
      );
      i++;
      continue;
    }

    // Stage headers (bold + description)
    if (line.startsWith("**Stage")) {
      elements.push(
        <div key={i} className="mt-4 mb-1">
          <span className="font-pixel text-sm sm:text-base text-foreground">
            <InlineMarkdown text={line} />
          </span>
        </div>
      );
      i++;
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={i} className="text-sm sm:text-base text-muted-foreground my-3 leading-relaxed">
        <InlineMarkdown text={line} />
      </p>
    );
    i++;
  }

  return <div>{elements}</div>;
}

// ─── Inline markdown (bold, code, italic, links) ─────────────────────

function InlineMarkdown({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Code `...`
    const codeMatch = remaining.match(/^([\s\S]*?)`([^`]+)`([\s\S]*)/);
    if (codeMatch) {
      if (codeMatch[1]) {
        parts.push(
          <BoldItalic key={key++} text={codeMatch[1]} />
        );
      }
      parts.push(
        <code
          key={key++}
          className="text-primary bg-primary/10 px-1 py-0.5 text-xs sm:text-sm"
        >
          {codeMatch[2]}
        </code>
      );
      remaining = codeMatch[3];
      continue;
    }

    // No more inline patterns
    parts.push(<BoldItalic key={key++} text={remaining} />);
    break;
  }

  return <>{parts}</>;
}

function BoldItalic({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Bold **...**
    const boldMatch = remaining.match(/^([\s\S]*?)\*\*([^*]+)\*\*([\s\S]*)/);
    if (boldMatch) {
      if (boldMatch[1]) {
        parts.push(<ItalicText key={key++} text={boldMatch[1]} />);
      }
      parts.push(
        <strong key={key++} className="text-foreground font-semibold">
          {boldMatch[2]}
        </strong>
      );
      remaining = boldMatch[3];
      continue;
    }

    parts.push(<ItalicText key={key++} text={remaining} />);
    break;
  }

  return <>{parts}</>;
}

function ItalicText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const italicMatch = remaining.match(/^([\s\S]*?)\*([^*]+)\*([\s\S]*)/);
    if (italicMatch) {
      if (italicMatch[1]) parts.push(<span key={key++}>{italicMatch[1]}</span>);
      parts.push(
        <em key={key++} className="text-foreground/80 italic">
          {italicMatch[2]}
        </em>
      );
      remaining = italicMatch[3];
      continue;
    }

    parts.push(<span key={key++}>{remaining}</span>);
    break;
  }

  return <>{parts}</>;
}

// ─── Markdown Table ───────────────────────────────────────────────────

function MarkdownTable({ lines }: { lines: string[] }) {
  if (lines.length < 2) return null;

  const parseRow = (line: string) =>
    line
      .split("|")
      .map((c) => c.trim())
      .filter(Boolean);

  const headers = parseRow(lines[0]);
  // Skip separator row (line[1])
  const rows = lines.slice(2).map(parseRow);

  return (
    <div className="my-6 overflow-x-auto">
      <table className="w-full text-sm border-2 border-border">
        <thead>
          <tr className="border-b-2 border-border bg-card">
            {headers.map((h, i) => (
              <th
                key={i}
                className="px-3 sm:px-4 py-2 text-left font-pixel text-primary text-xs sm:text-sm"
              >
                <InlineMarkdown text={h} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-border last:border-b-0"
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="px-3 sm:px-4 py-2 text-muted-foreground text-xs sm:text-sm"
                >
                  <InlineMarkdown text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
