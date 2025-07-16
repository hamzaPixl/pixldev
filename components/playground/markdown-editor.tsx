"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Eye, Code, Download, Copy, Check } from "lucide-react";

// Simple markdown parser (basic implementation)
const parseMarkdown = (markdown: string): string => {
  let html = markdown;

  // Headers
  html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>");
  html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");
  html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>");

  // Bold
  html = html.replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>");
  html = html.replace(/__(.*?)__/gim, "<strong>$1</strong>");

  // Italic
  html = html.replace(/\*(.*)\*/gim, "<em>$1</em>");
  html = html.replace(/_(.*?)_/gim, "<em>$1</em>");

  // Code blocks
  html = html.replace(/```([\s\S]*?)```/gim, "<pre><code>$1</code></pre>");

  // Inline code
  html = html.replace(/`(.*?)`/gim, "<code>$1</code>");

  // Links
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/gim,
    '<a href="$2" target="_blank">$1</a>'
  );

  // Images
  html = html.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/gim,
    '<img alt="$1" src="$2" style="max-width: 100%; height: auto;" />'
  );

  // Lists
  html = html.replace(/^\* (.*$)/gim, "<li>$1</li>");
  html = html.replace(/^\- (.*$)/gim, "<li>$1</li>");
  html = html.replace(/^1\. (.*$)/gim, "<li>$1</li>");

  // Wrap lists
  html = html.replace(/(<li>.*<\/li>)/gim, "<ul>$1</ul>");

  // Line breaks
  html = html.replace(/\n\n/gim, "</p><p>");
  html = html.replace(/\n/gim, "<br>");

  // Wrap in paragraphs
  html = "<p>" + html + "</p>";

  // Clean up empty paragraphs
  html = html.replace(/<p><\/p>/gim, "");
  html = html.replace(/<p>(<h[1-6]>)/gim, "$1");
  html = html.replace(/(<\/h[1-6]>)<\/p>/gim, "$1");
  html = html.replace(/<p>(<ul>)/gim, "$1");
  html = html.replace(/(<\/ul>)<\/p>/gim, "$1");
  html = html.replace(/<p>(<pre>)/gim, "$1");
  html = html.replace(/(<\/pre>)<\/p>/gim, "$1");

  return html;
};

const sampleMarkdown = `# Welcome to the Markdown Editor

This is a **live markdown editor** with real-time preview.

## Features

- Real-time preview
- Syntax highlighting
- Export functionality
- Copy to clipboard

### Supported Elements

You can use:

* **Bold text** with \`**text**\` or \`__text__\`
* *Italic text* with \`*text*\` or \`_text_\`
* \`Inline code\` with backticks
* [Links](https://example.com) with \`[text](url)\`

### Code Blocks

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

### Lists

1. Ordered lists
2. Are supported
3. With numbers

- Unordered lists
- Work with dashes
- Or asterisks

> This is a blockquote (coming soon!)

---

Happy writing! 🚀`;

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState(sampleMarkdown);
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [copied, setCopied] = useState<"markdown" | "html" | null>(null);

  const htmlOutput = parseMarkdown(markdown);

  const copyToClipboard = async (
    content: string,
    type: "markdown" | "html"
  ) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Live Markdown Editor
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Tab Switcher */}
          <div className="flex gap-2">
            <Badge
              variant={activeTab === "edit" ? "default" : "outline"}
              className={`cursor-pointer ${
                activeTab === "edit"
                  ? "bg-pixl-teal text-black hover:bg-pixl-teal/90"
                  : "hover:bg-muted"
              }`}
              onClick={() => setActiveTab("edit")}
            >
              <Code className="h-4 w-4 mr-1" />
              Editor
            </Badge>
            <Badge
              variant={activeTab === "preview" ? "default" : "outline"}
              className={`cursor-pointer ${
                activeTab === "preview"
                  ? "bg-pixl-teal text-black hover:bg-pixl-teal/90"
                  : "hover:bg-muted"
              }`}
              onClick={() => setActiveTab("preview")}
            >
              <Eye className="h-4 w-4 mr-1" />
              Preview
            </Badge>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => copyToClipboard(markdown, "markdown")}
              variant="outline"
              size="sm"
            >
              {copied === "markdown" ? (
                <>
                  <Check className="h-4 w-4 mr-1" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1" />
                  Copy Markdown
                </>
              )}
            </Button>

            <Button
              onClick={() => copyToClipboard(htmlOutput, "html")}
              variant="outline"
              size="sm"
            >
              {copied === "html" ? (
                <>
                  <Check className="h-4 w-4 mr-1" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1" />
                  Copy HTML
                </>
              )}
            </Button>

            <Button
              onClick={() =>
                downloadFile(markdown, "document.md", "text/markdown")
              }
              variant="outline"
              size="sm"
            >
              <Download className="h-4 w-4 mr-1" />
              Download .md
            </Button>

            <Button
              onClick={() =>
                downloadFile(htmlOutput, "document.html", "text/html")
              }
              variant="outline"
              size="sm"
            >
              <Download className="h-4 w-4 mr-1" />
              Download .html
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Editor/Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor */}
        <Card
          className={activeTab === "edit" ? "lg:col-span-1" : "hidden lg:block"}
        >
          <CardHeader>
            <CardTitle className="text-lg">Markdown Editor</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="w-full h-96 p-4 font-mono text-sm bg-muted/50 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-pixl-teal"
              placeholder="Start typing your markdown here..."
            />
          </CardContent>
        </Card>

        {/* Preview */}
        <Card
          className={
            activeTab === "preview" ? "lg:col-span-1" : "hidden lg:block"
          }
        >
          <CardHeader>
            <CardTitle className="text-lg">Live Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="w-full h-96 p-4 bg-muted/50 border rounded-lg overflow-auto prose prose-sm max-w-none
                prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground
                prose-strong:text-foreground prose-em:text-foreground prose-code:text-foreground
                prose-pre:bg-muted prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                prose-a:text-pixl-teal hover:prose-a:text-pixl-teal/80"
              dangerouslySetInnerHTML={{ __html: htmlOutput }}
            />
          </CardContent>
        </Card>
      </div>

      {/* Syntax Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Markdown Syntax Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-medium">Headers</h4>
              <div className="font-mono text-muted-foreground">
                <div># H1</div>
                <div>## H2</div>
                <div>### H3</div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Emphasis</h4>
              <div className="font-mono text-muted-foreground">
                <div>**bold**</div>
                <div>*italic*</div>
                <div>`code`</div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Lists</h4>
              <div className="font-mono text-muted-foreground">
                <div>- Item 1</div>
                <div>- Item 2</div>
                <div>1. Numbered</div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Links</h4>
              <div className="font-mono text-muted-foreground">
                <div>[text](url)</div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Images</h4>
              <div className="font-mono text-muted-foreground">
                <div>![alt](url)</div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Code Blocks</h4>
              <div className="font-mono text-muted-foreground">
                <div>```language</div>
                <div>code</div>
                <div>```</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
