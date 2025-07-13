"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Clock } from "lucide-react";
import React, { useState } from "react";
import { useLanguage } from "@/lib/language-context";

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create form data for Netlify
      const form = e.target as HTMLFormElement;
      const formDataToSend = new FormData(form);

      // Submit to Netlify
      const response = await fetch("/", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        setIsSubmitting(false);
        setIsSubmitted(true);

        // Reset form after success animation
        setTimeout(() => {
          setFormData({ name: "", email: "", company: "", message: "" });
          setIsSubmitted(false);
        }, 3000);
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setIsSubmitting(false);
      alert("There was an error submitting the form. Please try again.");
    }
  };

  const canSubmit = formData.name && formData.email && formData.message;

  return (
    <div id="contact" className="w-full py-16 xs:py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            {t("contact.title")}
          </h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-background/30 backdrop-blur-2xl border border-pixl-teal/20 shadow-xl shadow-pixl-teal/10 rounded-2xl p-8 before:absolute before:inset-0 before:bg-gradient-to-r before:from-pixl-teal/8 before:via-transparent before:to-pixl-teal/8 before:rounded-2xl before:-z-10 relative">
            {!isSubmitted ? (
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Hidden input for Netlify form detection */}
                <input type="hidden" name="form-name" value="contact" />

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2 text-foreground"
                    >
                      {t("contact.form.nameLabel")} {t("common.required")}
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="bg-background/50 border border-border/50 rounded-md focus:outline-none focus:ring-1 focus:ring-pixl-teal/50 focus:border-pixl-teal/50 focus-visible:ring-1 focus-visible:ring-pixl-teal/50"
                      placeholder={t("contact.form.namePlaceholder")}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2 text-foreground"
                    >
                      {t("contact.form.emailLabel")} {t("common.required")}
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-background/50 border border-border/50 rounded-md focus:outline-none focus:ring-1 focus:ring-pixl-teal/50 focus:border-pixl-teal/50 focus-visible:ring-1 focus-visible:ring-pixl-teal/50"
                      placeholder={t("contact.form.emailPlaceholder")}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium mb-2 text-foreground"
                  >
                    {t("contact.form.companyLabel")}
                  </label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="bg-background/50 border border-border/50 rounded-md focus:outline-none focus:ring-1 focus:ring-pixl-teal/50 focus:border-pixl-teal/50 focus-visible:ring-1 focus-visible:ring-pixl-teal/50"
                    placeholder={t("contact.form.companyPlaceholder")}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2 text-foreground"
                  >
                    {t("contact.form.messageLabel")} {t("common.required")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 bg-background/50 border border-border/50 rounded-md focus:outline-none focus:ring-1 focus:ring-pixl-teal/50 focus:border-pixl-teal/50 resize-none"
                    placeholder={t("contact.form.messagePlaceholder")}
                  />
                </div>

                <div className="text-center">
                  <Button
                    type="submit"
                    disabled={!canSubmit || isSubmitting}
                    className="bg-pixl-teal hover:bg-pixl-teal/90 text-black font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin mr-2" />
                        {t("common.sending")}
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        {t("common.sendMessage")}
                      </>
                    )}
                  </Button>

                  <div className="flex items-center justify-center mt-4 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    {t("common.replyTime")}
                  </div>
                </div>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-pixl-teal/10 border-2 border-pixl-teal rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Send className="h-6 w-6 text-pixl-teal" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-pixl-teal">
                  Message Sent!
                </h3>
                <p className="text-muted-foreground">
                  Thank you for reaching out. We&apos;ll get back to you within
                  24 hours.
                </p>
              </div>
            )}
          </div>

          {/* Privacy note */}
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Your privacy matters to us. We don&apos;t track or share your
              information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
