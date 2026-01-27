import React from 'react';
import { Section } from './ui/Section';
import { Button } from './ui/Button';

// 4.1 Hero
export const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
    {/* Full width background image - Cinematic/Studio feel */}
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2670&auto=format&fit=crop" 
        alt="Camera lens macro cinematic" 
        className="w-full h-full object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-black/40" />
    </div>

    {/* Content overlay */}
    <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 w-full pt-20">
      <div className="max-w-4xl">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1] mb-8 md:mb-12 text-white whitespace-pre-line">
          Programmatic video.
          Gebouwd als HTML.
          Geleverd als video.
        </h1>
        <p className="text-xl md:text-2xl text-neutral-200 max-w-2xl leading-relaxed mb-10">
          Eén template. Oneindig veel varianten.<br />
          Voor elk scherm, elk formaat, elke context.
        </p>
        <div>
          <Button variant="on-dark" size="lg" onClick={() => window.location.href = 'mailto:hello@defransekamer.com'}>
            Plan een demo
          </Button>
        </div>
      </div>
    </div>
  </section>
);

// 4.2 Het Probleem
export const ProblemSection = () => (
  <Section bgColor="bg-white">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
      {/* Image: Stack of Old TVs - Chaos of formats/hardware. Reliable ID. */}
      <div className="order-2 md:order-1 relative aspect-square bg-neutral-100 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1600&auto=format&fit=crop" 
          alt="Stack of chaotic old vintage TVs" 
          className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
        />
      </div>
      <div className="order-1 md:order-2">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-8">
          Video-productie schaalt niet.
        </h2>
        <p className="text-2xl md:text-3xl text-neutral-600 leading-relaxed">
          Nieuwe formaten vragen nieuwe edits.
          Nieuwe schermen vragen nieuwe exports.
          Nieuwe content vraagt opnieuw beginnen.
          <br /><br />
          <span className="text-black font-medium">Dat werkt niet meer als snelheid en schaal belangrijk zijn.</span>
        </p>
      </div>
    </div>
  </Section>
);

// 4.3 De Oplossing
export const SolutionSection = () => (
  <Section bgColor="bg-neutral-50">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
      <div>
        <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-8">
          Video’s bouwen zoals je webpagina’s bouwt.
        </h2>
        <p className="text-2xl md:text-3xl text-neutral-600 leading-relaxed">
          Wij maken video-templates in HTML en React.
          <br /><br />
          Met Remotion renderen we deze automatisch
          naar video’s in elk gewenst formaat.
          <br /><br />
          <span className="text-black font-medium">Wat je op het web kunt bouwen,
          kun je nu als video uitrollen.</span>
        </p>
      </div>
      {/* Image: Code on screen - Literal representation of "Built as HTML" */}
      <div className="relative aspect-square bg-neutral-200 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop" 
          alt="Code editor screen React" 
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  </Section>
);

// 4.4 Differentiators
export const DifferentiatorsSection = () => {
  const items = [
    "Eén template, alle formaten",
    "Volledige designcontrole",
    "Data-gedreven content",
    "Pixel-perfect output",
    "Geen extra edit-kosten"
  ];

  return (
    <Section>
      <div className="mb-16">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
          Dit is geen video automation.<br />
          Dit is een videosysteem.
        </h2>
      </div>
      {/* Redesigned: Matches 'How it works' layout but with icons */}
      <div className="space-y-0">
        {items.map((item, i) => (
          <div key={i} className="flex items-center py-6 border-b border-black/20 last:border-0">
            <span className="w-12 md:w-16 shrink-0 text-black flex items-center justify-start">
               {/* Clean Check Icon */}
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
               </svg>
            </span>
            <p className="text-xl md:text-2xl font-medium tracking-wide text-black">
              {item}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
};

// 4.5 Use Cases
export const UseCasesSection = () => (
  <Section bgColor="bg-neutral-50">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
      {/* Image: Times Square / Urban Screens - Digital Out Of Home context */}
      <div className="order-2 md:order-1 relative aspect-square bg-neutral-200 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?q=80&w=2670&auto=format&fit=crop" 
          alt="City streets at night with digital screens" 
          className="object-cover w-full h-full"
        />
      </div>
      
      {/* Content Column */}
      <div className="order-1 md:order-2">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-12">Waar dit voor werkt</h2>
        
        <div className="space-y-12">
          <div>
            <h3 className="text-3xl font-bold mb-3">Retail & in‑store</h3>
            <p className="text-2xl md:text-3xl text-neutral-600">
              Meerdere schermformaten. Wisselende promoties. Locatie-specifieke content.
            </p>
          </div>
          
          <div>
            <h3 className="text-3xl font-bold mb-3">DOOH & large format</h3>
            <p className="text-2xl md:text-3xl text-neutral-600">
              Eén template voor alle netwerken. Automatisch schalen.
            </p>
          </div>
          
          <div>
            <h3 className="text-3xl font-bold mb-3">Social & performance</h3>
            <p className="text-2xl md:text-3xl text-neutral-600">
              Variaties per doelgroep. Snelle iteratie.
            </p>
          </div>
        </div>
      </div>
    </div>
  </Section>
);

// 4.6 Proof
export const ProofSection = () => (
  <Section>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
      <div>
        <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">Bewezen in de praktijk</h2>
        <p className="text-2xl md:text-3xl text-neutral-600 leading-relaxed mb-10">
          Voor Samsung ontwikkelden we een videosysteem
          waarmee één template automatisch werd uitgerold
          naar verschillende schermformaten
          voor retailomgevingen.
        </p>
      </div>
      {/* Image: Clean Modern Store Interior (Apple Store / Tech Store vibe) */}
      <div className="relative aspect-video bg-neutral-100 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2670&auto=format&fit=crop" 
          alt="Modern minimalist retail store interior" 
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  </Section>
);

// 4.7 How it works
export const HowItWorksSection = () => {
  const steps = [
    "Wij ontwerpen en bouwen het template",
    "Content komt uit data (CMS, feed, JSON)",
    "Remotion rendert automatisch alle video’s",
    "Klaar voor distributie"
  ];

  return (
    <Section bgColor="bg-neutral-50">
      <div className="max-w-screen-xl">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-12">Hoe het werkt</h2>
        <div className="space-y-0">
          {steps.map((step, i) => (
            <div key={i} className="flex items-baseline py-8 border-b border-neutral-200 last:border-0">
              <span className="text-xl font-mono text-neutral-400 w-16 md:w-24 shrink-0">0{i + 1}</span>
              <p className="text-2xl md:text-3xl font-medium">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

// 4.8 Footer CTA
export const FooterCTASection = () => (
  <section className="py-32 md:py-48 px-6 md:px-12 bg-black text-white text-center">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-10">
        Zien hoe dit werkt?
      </h2>
      <p className="text-2xl md:text-3xl text-neutral-400 mb-16">
        We laten het liever zien dan uitleggen.
      </p>
      <Button 
        variant="on-dark" 
        size="lg" 
        className="min-w-[240px]"
        onClick={() => window.location.href = 'mailto:hello@defransekamer.com'}
      >
        Plan een demo
      </Button>
    </div>
  </section>
);