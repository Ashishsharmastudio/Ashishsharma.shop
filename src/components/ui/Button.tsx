import { ButtonHTMLAttributes, ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  showArrow?: boolean;
  id?: string;
  className?: string;
  onClick?: (e: any) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  showArrow = false,
  className = '',
  id,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-sans font-medium text-sm transition-all duration-300 relative overflow-hidden focus:outline-none';
  
  const variants = {
    primary: 'bg-studio-text-primary text-studio-bg hover:bg-studio-accent hover:text-white px-6 py-3.5 rounded-full border border-transparent shadow-lg shadow-black/10',
    secondary: 'bg-studio-card text-studio-text-primary hover:bg-studio-text-primary hover:text-studio-bg px-6 py-3.5 rounded-full border border-studio-border',
    outline: 'bg-transparent text-studio-text-primary border border-studio-border hover:border-studio-text-primary px-6 py-3.5 rounded-full',
    text: 'bg-transparent text-studio-text-primary hover:text-studio-accent px-0 py-2 border-b border-transparent hover:border-studio-accent rounded-none'
  };

  return (
    <motion.button
      id={id}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-1.5">
        {children}
        {showArrow && (
          <motion.span
            className="inline-block"
            variants={{
              initial: { x: 0, y: 0 },
              hover: { x: 2, y: -2 }
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <ArrowUpRight className="w-4 h-4" />
          </motion.span>
        )}
      </span>
    </motion.button>
  );
}
