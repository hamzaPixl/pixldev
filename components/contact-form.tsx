"use client";

import { useState, useEffect } from "react";
import { Send, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/lib/language-context";

export function ContactForm() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // Build mailto link
    const subject = encodeURIComponent(`Contact from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const mailtoLink = `mailto:hello@pixldev.be?subject=${subject}&body=${body}`;

    setTimeout(() => {
      window.location.href = mailtoLink;
      setStatus("sent");

      setTimeout(() => {
        setStatus("idle");
        setFormData({ name: "", email: "", message: "" });
      }, 2000);
    }, 500);
  };

  return (
    <section id="contact" className="px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
      <div className="max-w-2xl mx-auto">
        {/* Terminal header */}
        <div className="rounded-lg bg-card border border-border overflow-hidden shadow-lg">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-elevated border-b border-border">
            <Terminal className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
            <span className="font-mono text-xs sm:text-sm text-primary">contact.sh</span>
            <div className="flex-1" />
            <div className="flex gap-1 sm:gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
              <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
              <div className="w-2.5 h-2.5 rounded-full bg-primary/60" />
            </div>
          </div>

          {/* Terminal content */}
          <div className="p-4 sm:p-6">
            <p className="font-mono text-primary text-xs sm:text-sm mb-1">
              <span className="text-muted-foreground">{">"}</span> {t("contact.initMessage")}
            </p>
            <p className="font-mono text-primary text-xs sm:text-sm mb-4">
              <span className="text-muted-foreground">{">"}</span> {mounted ? t("contact.readyMessage") : "..."}<span className="animate-blink">_</span>
            </p>

            <p className="text-muted-foreground text-xs sm:text-sm mb-6">
              {t("contact.title")}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name field */}
              <div>
                <label className="block text-[10px] sm:text-xs text-muted-foreground mb-2">
                  <span className="text-primary">{">"}</span> {t("contact.form.name")}
                </label>
                <Input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t("contact.form.namePlaceholder")}
                  />
              </div>

              {/* Email field */}
              <div>
                <label className="block text-[10px] sm:text-xs text-muted-foreground mb-2">
                  <span className="text-primary">{">"}</span> {t("contact.form.email")}
                </label>
                <Input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t("contact.form.emailPlaceholder")}
                  />
              </div>

              {/* Message field */}
              <div>
                <label className="block text-[10px] sm:text-xs text-muted-foreground mb-2">
                  <span className="text-primary">{">"}</span> {t("contact.form.message")}
                </label>
                <Textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t("contact.form.messagePlaceholder")}
                  className="resize-none"
                  />
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                disabled={status === "sending"}
                className="w-full sm:w-auto"
                >
                <Send className="w-3 h-3 sm:w-4 sm:h-4" />
                {status === "sending" ? t("common.sending") : status === "sent" ? t("common.sent") : t("common.sendMessage")}
              </Button>
            </form>

            {status === "sent" && (
              <p className="font-mono text-primary text-xs sm:text-sm mt-4">
                <span className="text-muted-foreground">{">"}</span> {t("contact.successMessage")}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
