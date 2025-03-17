
import { FC, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'default' | 'seeker' | 'recruiter' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  className?: string;
  glow?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  variant = 'default',
  size = 'md',
  icon,
  className = '',
  glow = false,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-background rounded-lg';
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  const variantClasses = {
    default: 'bg-purple-500 hover:bg-purple-600 text-white shadow-sm',
    seeker: 'relative overflow-hidden bg-blue-purple-gradient hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-600 text-white shadow-sm',
    recruiter: 'relative overflow-hidden bg-gold-navy-gradient hover:bg-gradient-to-r hover:from-gold-500 hover:to-navy-500 text-white shadow-sm',
    outline: 'border border-white/10 bg-transparent hover:bg-white/5 text-white'
  };
  
  const glowClasses = glow
    ? variant === 'seeker'
      ? 'shadow-neon-purple hover:shadow-neon-purple'
      : variant === 'recruiter'
      ? 'shadow-neon-gold hover:shadow-neon-gold'
      : 'shadow-neon-purple hover:shadow-neon-purple'
    : '';

  return (
    <button
      className={cn(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        glowClasses,
        'shine',
        className
      )}
      {...props}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
