
import React from 'react';
import { cn } from '@/lib/utils';

type CalculatorButtonProps = {
  value: string;
  type?: 'number' | 'operator' | 'function';
  onClick: (value: string) => void;
  className?: string;
  doubleWidth?: boolean;
};

const CalculatorButton: React.FC<CalculatorButtonProps> = ({
  value,
  type = 'number',
  onClick,
  className,
  doubleWidth = false,
}) => {
  const handleClick = () => {
    onClick(value);
  };

  return (
    <button
      className={cn(
        'calculator-button h-16 select-none active:animate-button-press',
        {
          'bg-calculator-button text-calculator-text hover:bg-calculator-button-hover': type === 'number',
          'bg-calculator-operator text-white hover:bg-calculator-operator-hover': type === 'operator',
          'bg-gray-200 dark:bg-gray-700 text-calculator-text': type === 'function',
          'col-span-2': doubleWidth,
        },
        className
      )}
      onClick={handleClick}
      aria-label={value}
    >
      {value}
    </button>
  );
};

export default CalculatorButton;
