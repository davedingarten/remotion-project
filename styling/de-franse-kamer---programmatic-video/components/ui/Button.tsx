import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'on-light' | 'on-dark'; // on-light = black button context, on-dark = white button context
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  className = '', 
  variant = 'on-light', 
  size = 'md',
  ...props 
}) => {
  // Base styles: uppercase, tracking, bold, border-2
  // Changed border-[3px] to border-2
  const baseStyles = "inline-flex items-center justify-center font-bold tracking-[0.15em] uppercase transition-all duration-300 border-2 focus:outline-none disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    // Zwarte rand/tekst op lichte achtergrond -> wordt zwart vlak met witte tekst
    'on-light': "border-black text-black bg-transparent hover:bg-black hover:text-white",
    
    // Witte rand/tekst op donkere achtergrond -> wordt wit vlak met zwarte tekst
    'on-dark': "border-white text-white bg-transparent hover:bg-white hover:text-black"
  };

  const sizes = {
    sm: "text-xs px-6 py-3",
    md: "text-sm px-8 py-4",
    lg: "text-base px-10 py-5"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};