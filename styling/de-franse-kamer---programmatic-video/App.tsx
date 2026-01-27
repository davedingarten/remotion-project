import React from 'react';
import { Header } from './components/Header';
import {
  HeroSection,
  ProblemSection,
  SolutionSection,
  DifferentiatorsSection,
  UseCasesSection,
  ProofSection,
  HowItWorksSection,
  FooterCTASection
} from './components/Sections';

const App: React.FC = () => {
  return (
    <div className="min-h-screen font-sans selection:bg-black selection:text-white">
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <DifferentiatorsSection />
        <UseCasesSection />
        <ProofSection />
        <HowItWorksSection />
        <FooterCTASection />
      </main>
    </div>
  );
};

export default App;