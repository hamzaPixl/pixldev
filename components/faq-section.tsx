'use client';

import { Badge } from "@/components/ui/badge";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqSectionProps {
  badge?: string;
  heading?: string;
  description?: string;
  faqs?: FaqItem[];
}

const pixlFaqs: FaqItem[] = [
  {
    question: "How do we deliver your AI solution?",
    answer: "We follow a streamlined 3-step process: Audit your challenge and define the vision, Build with AI and expert precision, then Deliver and optimize for lasting impact. Most projects launch in 4-8 weeks with clear milestones throughout."
  },
  {
    question: "What are the key steps in our process?",
    answer: "Step 1: Audit - We analyze your current workflow and identify opportunities. Step 2: Build - We develop custom AI solutions integrated with your existing systems. Step 3: Deliver - We launch, train your team, and provide ongoing optimization."
  },
  {
    question: "How do we measure success?",
    answer: "We track concrete metrics like time saved, cost reduction, and efficiency gains. Our solutions typically deliver 40-80% improvements in target processes. We establish success criteria upfront and provide regular progress reports with measurable outcomes."
  },
];

const FaqSection = ({
  badge = "FAQ",
  heading = "Common Questions & Answers",
  description = "Our delivery process, key steps, and how we measure success for every project.",
  faqs = pixlFaqs,
}: FaqSectionProps) => {
  return (
    <section id="faq" className="w-full py-16 xs:py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="text-xs font-semibold bg-pixl-teal/10 text-pixl-teal border border-pixl-teal/20 hover:bg-pixl-teal/20 mb-4">
            {badge}
          </Badge>
          <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight mb-6 text-foreground">
            {heading}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="group rounded-xl bg-card/10 backdrop-blur-lg border border-border/20 hover:border-pixl-teal/30 hover:bg-card/20 transition-all duration-300 p-6"
            >
              <div className="flex gap-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-pixl-teal/10 border border-pixl-teal/20 group-hover:bg-pixl-teal/20 transition-all duration-300 font-mono text-sm font-semibold text-pixl-teal">
                  {(index + 1).toString().padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-3 text-foreground group-hover:text-pixl-teal transition-colors duration-300">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Still have questions?
          </p>
          <button 
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="text-pixl-teal hover:text-white font-medium transition-colors duration-300"
          >
            Get in touch with our team →
          </button>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;