
import React from 'react';
import { cn } from '@/lib/utils';

type CalculatorDisplayProps = {
  value: string;
  expression?: string;
  className?: string;
};

const CalculatorDisplay: React.FC<CalculatorDisplayProps> = ({
  value,
  expression = '',
  className,
}) => {
  return (
    <div 
      className={cn(
        'calculator-display bg-calculator-display rounded-2xl p-5 flex flex-col items-end justify-end h-32 transition-all duration-300 mb-6',
        'glass dark:glass-dark',
        className
      )}
    >
      {expression && (
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1 h-5 overflow-hidden w-full text-right">
          {expression}
        </div>
      )}
      <div className="text-4xl font-light tracking-tight w-full text-right overflow-x-auto scrollbar-hide whitespace-nowrap">
        {value}
      </div>
    </div>
  );
};

export default CalculatorDisplay;
