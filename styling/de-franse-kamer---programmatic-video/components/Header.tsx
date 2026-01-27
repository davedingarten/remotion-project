import React, { useState, useEffect } from 'react';
import { Button } from './ui/Button';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md border-b border-neutral-100 py-4 text-black' : 'bg-transparent py-6 text-white'}`}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo increased by ~15% from previous text-3xl to text-4xl/5xl range */}
        <div className="font-bold text-4xl md:text-5xl tracking-tighter">
          DeFranseKamer
        </div>
        <Button 
          variant={scrolled ? "on-light" : "on-dark"} 
          size="sm" 
          onClick={() => window.location.href = 'mailto:hello@defransekamer.com'}
        >
          Plan een demo
        </Button>
      </div>
    </header>
  );
};