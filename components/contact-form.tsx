"use client";

import { useState, useEffect } from "react";
import { Send, Terminal } from "lucide-react";
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
        <div className="bg-card border-2 border-primary/30 overflow-hidden">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary/10 border-b border-primary/30">
            <Terminal className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
            <span className="font-pixel text-xs sm:text-sm text-primary">CONTACT.exe</span>
            <div className="flex-1" />
            <div className="flex gap-1 sm:gap-1.5">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-muted-foreground/30" />
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-muted-foreground/30" />
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-primary/50" />
            </div>
          </div>

          {/* Terminal content */}
          <div className="p-4 sm:p-6">
            <p className="text-primary text-xs sm:text-sm mb-1">
              <span className="text-muted-foreground">{">"}</span> {t("contact.initMessage")}
            </p>
            <p className="text-primary text-xs sm:text-sm mb-4">
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
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-background border-2 border-border px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base text-foreground focus:border-primary focus:outline-none transition-colors"
                  placeholder={t("contact.form.namePlaceholder")}
                />
              </div>

              {/* Email field */}
              <div>
                <label className="block text-[10px] sm:text-xs text-muted-foreground mb-2">
                  <span className="text-primary">{">"}</span> {t("contact.form.email")}
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-background border-2 border-border px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base text-foreground focus:border-primary focus:outline-none transition-colors"
                  placeholder={t("contact.form.emailPlaceholder")}
                />
              </div>

              {/* Message field */}
              <div>
                <label className="block text-[10px] sm:text-xs text-muted-foreground mb-2">
                  <span className="text-primary">{">"}</span> {t("contact.form.message")}
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-background border-2 border-border px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base text-foreground focus:border-primary focus:outline-none transition-colors resize-none"
                  placeholder={t("contact.form.messagePlaceholder")}
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 text-sm sm:text-base"
              >
                <Send className="w-3 h-3 sm:w-4 sm:h-4" />
                {status === "sending" ? t("common.sending") : status === "sent" ? t("common.sent") : t("common.sendMessage")}
              </button>
            </form>

            {status === "sent" && (
              <p className="text-primary text-xs sm:text-sm mt-4">
                <span className="text-muted-foreground">{">"}</span> {t("contact.successMessage")}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
