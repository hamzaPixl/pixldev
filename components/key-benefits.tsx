import { Zap, Target, CheckCircle2 } from "lucide-react";
import { ScrollAnimation } from "@/components/scroll-animation";

const KeyBenefits = () => {
  return (
    <section id="core-values" className="w-full py-16 xs:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollAnimation direction="up" className="text-center mb-16">
          <p className="mb-4 text-sm text-pixl-teal font-semibold uppercase tracking-wider lg:text-base">
            OUR CORE VALUES
          </p>
          <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Why Choose Pixl?
          </h2>
        </ScrollAnimation>
        
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Real Tools, Not AI Noise */}
          <ScrollAnimation direction="up" delay={100}>
            <div className="group rounded-xl bg-card/10 backdrop-blur-lg border border-border/20 hover:border-pixl-teal/30 hover:bg-card/20 transition-all duration-300 p-6">
            <span className="mb-6 flex size-14 items-center justify-center rounded-full bg-pixl-teal/10 border border-pixl-teal/20 group-hover:bg-pixl-teal/20 transition-all duration-300">
              <CheckCircle2 className="size-7 text-pixl-teal" />
            </span>
            <h3 className="mb-3 text-xl font-bold text-foreground group-hover:text-pixl-teal transition-colors duration-300">
              Real Tools, Not AI Noise
            </h3>
            <p className="leading-relaxed text-muted-foreground">
              We build practical, effective solutions that work. No buzzwords, no gimmicks — just intelligent software that solves real business problems and delivers measurable results.
            </p>
            </div>
          </ScrollAnimation>

          {/* Launch Fast */}
          <ScrollAnimation direction="up" delay={200}>
            <div className="group rounded-xl bg-card/10 backdrop-blur-lg border border-border/20 hover:border-pixl-teal/30 hover:bg-card/20 transition-all duration-300 p-6">
            <span className="mb-6 flex size-14 items-center justify-center rounded-full bg-pixl-teal/10 border border-pixl-teal/20 group-hover:bg-pixl-teal/20 transition-all duration-300">
              <Zap className="size-7 text-pixl-teal" />
            </span>
            <h3 className="mb-3 text-xl font-bold text-foreground group-hover:text-pixl-teal transition-colors duration-300">
              Launch Fast
            </h3>
            <p className="leading-relaxed text-muted-foreground">
              Our 3-step process ensures rapid delivery and value. From audit to launch, we move quickly without compromising quality, getting your solutions live and working fast.
            </p>
            </div>
          </ScrollAnimation>

          {/* Full Solution Delivery */}
          <ScrollAnimation direction="up" delay={300}>
            <div className="group rounded-xl bg-card/10 backdrop-blur-lg border border-border/20 hover:border-pixl-teal/30 hover:bg-card/20 transition-all duration-300 p-6">
            <span className="mb-6 flex size-14 items-center justify-center rounded-full bg-pixl-teal/10 border border-pixl-teal/20 group-hover:bg-pixl-teal/20 transition-all duration-300">
              <Target className="size-7 text-pixl-teal" />
            </span>
            <h3 className="mb-3 text-xl font-bold text-foreground group-hover:text-pixl-teal transition-colors duration-300">
              Full Solution Delivery
            </h3>
            <p className="leading-relaxed text-muted-foreground">
              We can fully own and deliver your project, end-to-end. From planning to deployment to ongoing support — you get a complete solution, not just code.
            </p>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default KeyBenefits;