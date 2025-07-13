'use client';

import { Bot, BarChart3, Workflow, Layers, Heart, Users, Server, Wrench } from "lucide-react";
import React, { useRef, useEffect } from "react";

const capabilities = [
  {
    icon: Bot,
    title: "AI Chatbots",
    description: "Intelligent assistants for customer support and internal workflows."
  },
  {
    icon: BarChart3,
    title: "Smart Dashboards", 
    description: "Real-time insights and data visualization for informed decisions."
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description: "Streamline operations and eliminate repetitive tasks."
  },
  {
    icon: Layers,
    title: "SaaS Products",
    description: "Custom software as a service, built for your market."
  },
  {
    icon: Heart,
    title: "Patient Tools",
    description: "Secure, intuitive tools for healthcare and wellness."
  },
  {
    icon: Users,
    title: "Business Portals",
    description: "Centralized hubs for internal teams and external partners."
  },
  {
    icon: Server,
    title: "Scalable Infrastructure",
    description: "Robust, secure foundations for your digital future."
  },
  {
    icon: Wrench,
    title: "Internal Tools",
    description: "Bespoke applications to boost team productivity."
  }
];

const WhatWeBuild = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent, index: number) => {
      const card = cardsRef.current[index];
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    };

    cardsRef.current.forEach((card, cardIndex) => {
      if (card) {
        const mouseMoveHandler = (e: MouseEvent) => handleMouseMove(e, cardIndex);
        card.addEventListener('mousemove', mouseMoveHandler);
        
        return () => {
          card.removeEventListener('mousemove', mouseMoveHandler);
        };
      }
    });
  }, []);

  return (
    <div id="capabilities" className="w-full py-16 xs:py-24 px-6 bg-pixl-dark-alt/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight mb-6 text-foreground">
            What We Build
          </h2>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {capabilities.map((capability, index) => (
            <div
              key={capability.title}
              className="group p-6 rounded-xl border border-border/20 bg-card/10 backdrop-blur-lg transition-all duration-300 hover:border-pixl-teal/30 hover:bg-card/20"
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
            >
              <div>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-pixl-teal/10 border border-pixl-teal/20 mb-4 group-hover:bg-pixl-teal/20 transition-all duration-300">
                  <capability.icon className="h-6 w-6 text-pixl-teal" />
                </div>
                
                <h3 className="text-lg font-semibold mb-3 text-foreground group-hover:text-pixl-teal transition-colors duration-300">
                  {capability.title}
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {capability.description}
                </p>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatWeBuild;