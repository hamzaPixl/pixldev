"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamic import for markdown editor
const MarkdownEditor = dynamic(
  () => import("@/components/playground/markdown-editor"),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pixl-teal mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading Markdown Editor...</p>
        </div>
      </div>
    ),
  }
);

interface PlaygroundComponentWrapperProps {
  componentName: string;
}

export default function PlaygroundComponentWrapper({
  componentName,
}: PlaygroundComponentWrapperProps) {
  if (componentName === "markdown-editor") {
    return (
      <Suspense fallback={
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pixl-teal mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      }>
        <MarkdownEditor />
      </Suspense>
    );
  }

  return <div className="p-8 text-center">Component not found</div>;
}
