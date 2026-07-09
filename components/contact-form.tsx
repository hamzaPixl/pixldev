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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget as HTMLFormElement;

    try {
      // Netlify Forms: POST urlencoded to the static form definition
      const body = new URLSearchParams({ "form-name": "contact" });
      new FormData(form).forEach((value, key) => {
        if (typeof value === "string") body.append(key, value);
      });
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(`Form submit failed: ${res.status}`);

      setStatus("sent");
      setTimeout(() => {
        setStatus("idle");
        setFormData({ name: "", email: "", message: "" });
      }, 4000);
    } catch {
      // Fallback: open the visitor's mail client instead of dropping the message
      const subject = encodeURIComponent(`Contact from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:hello@pixldev.be?subject=${subject}&body=${body}`;
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section id="contact" className="border-t border-border px-4 sm:px-6 py-14 sm:py-20">
      <div className="max-w-2xl mx-auto">
        <div className="eyebrow mb-6">{t("footer.contactTitle")}</div>
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
              {/* Honeypot for Netlify spam filtering */}
              <input type="text" name="bot-field" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              {/* Name field */}
              <div>
                <label htmlFor="contact-name" className="block text-[10px] sm:text-xs text-muted-foreground mb-2">
                  <span className="text-primary">{">"}</span> {t("contact.form.name")}
                </label>
                <Input
                  id="contact-name"
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t("contact.form.namePlaceholder")}
                  />
              </div>

              {/* Email field */}
              <div>
                <label htmlFor="contact-email" className="block text-[10px] sm:text-xs text-muted-foreground mb-2">
                  <span className="text-primary">{">"}</span> {t("contact.form.email")}
                </label>
                <Input
                  id="contact-email"
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t("contact.form.emailPlaceholder")}
                  />
              </div>

              {/* Message field */}
              <div>
                <label htmlFor="contact-message" className="block text-[10px] sm:text-xs text-muted-foreground mb-2">
                  <span className="text-primary">{">"}</span> {t("contact.form.message")}
                </label>
                <Textarea
                  id="contact-message"
                  name="message"
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
