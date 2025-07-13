"use client";

import {
  Bot,
  BarChart3,
  Workflow,
  Layers,
  Shield,
  Users,
  Server,
  Wrench,
} from "lucide-react";
import React, { useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/lib/language-context";

const capabilities = [
  {
    icon: Bot,
    titleKey: "capabilities.items.aiChatbots.title",
    descriptionKey: "capabilities.items.aiChatbots.description",
  },
  {
    icon: BarChart3,
    titleKey: "capabilities.items.smartDashboards.title",
    descriptionKey: "capabilities.items.smartDashboards.description",
  },
  {
    icon: Workflow,
    titleKey: "capabilities.items.workflowAutomation.title",
    descriptionKey: "capabilities.items.workflowAutomation.description",
  },
  {
    icon: Layers,
    titleKey: "capabilities.items.saasProducts.title",
    descriptionKey: "capabilities.items.saasProducts.description",
  },
  {
    icon: Shield,
    titleKey: "capabilities.items.patientTools.title",
    descriptionKey: "capabilities.items.patientTools.description",
  },
  {
    icon: Users,
    titleKey: "capabilities.items.businessPortals.title",
    descriptionKey: "capabilities.items.businessPortals.description",
  },
  {
    icon: Server,
    titleKey: "capabilities.items.scalableInfrastructure.title",
    descriptionKey: "capabilities.items.scalableInfrastructure.description",
  },
  {
    icon: Wrench,
    titleKey: "capabilities.items.internalTools.title",
    descriptionKey: "capabilities.items.internalTools.description",
  },
];

const WhatWeBuild = () => {
  const { t } = useLanguage();
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent, index: number) => {
      const card = cardsRef.current[index];
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      card.style.setProperty("--mouse-x", `${x}%`);
      card.style.setProperty("--mouse-y", `${y}%`);
    };

    cardsRef.current.forEach((card, cardIndex) => {
      if (card) {
        const mouseMoveHandler = (e: MouseEvent) =>
          handleMouseMove(e, cardIndex);
        card.addEventListener("mousemove", mouseMoveHandler);

        return () => {
          card.removeEventListener("mousemove", mouseMoveHandler);
        };
      }
    });
  }, []);

  return (
    <div id="capabilities" className="w-full py-16 xs:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight mb-6 text-foreground">
            {t("capabilities.title")}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {capabilities.map((capability, index) => (
            <Card
              key={capability.titleKey}
              className="group border-border/20 backdrop-blur-lg transition-all duration-300 hover:border-pixl-teal/30 cursor-pointer"
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
            >
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-pixl-teal/10 border border-pixl-teal/20 mb-4 group-hover:bg-pixl-teal/20 transition-all duration-300">
                  <capability.icon className="h-6 w-6 text-pixl-teal" />
                </div>

                <h3 className="text-lg font-semibold mb-3 text-foreground group-hover:text-pixl-teal transition-colors duration-300">
                  {t(capability.titleKey)}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(capability.descriptionKey)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatWeBuild;
