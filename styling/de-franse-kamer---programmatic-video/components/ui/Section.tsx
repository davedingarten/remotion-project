import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  bgColor?: string;
}

export const Section: React.FC<SectionProps> = ({ 
  children, 
  className = '', 
  id,
  bgColor = 'bg-white'
}) => {
  return (
    <section id={id} className={`${bgColor} py-20 md:py-32 border-b border-neutral-100 last:border-0`}>
      <div className={`max-w-screen-xl mx-auto px-6 md:px-12 ${className}`}>
        {children}
      </div>
    </section>
  );
};