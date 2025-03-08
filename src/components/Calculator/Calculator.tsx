
import React, { useState, useEffect } from 'react';
import CalculatorButton from './CalculatorButton';
import CalculatorDisplay from './CalculatorDisplay';
import { cn } from '@/lib/utils';

const Calculator: React.FC<{ className?: string }> = ({ className }) => {
  const [currentValue, setCurrentValue] = useState('0');
  const [storedValue, setStoredValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [expressionDisplay, setExpressionDisplay] = useState('');
  const [isNewCalculation, setIsNewCalculation] = useState(true);

  const MAX_DISPLAY_LENGTH = 12;

  const handleNumberInput = (num: string) => {
    if (isNewCalculation) {
      setCurrentValue(num);
      setExpressionDisplay(num);
      setIsNewCalculation(false);
    } else if (currentValue === '0' && num !== '.') {
      setCurrentValue(num);
      setExpressionDisplay(num);
    } else if (currentValue.length < MAX_DISPLAY_LENGTH) {
      // Check if adding a decimal
      if (num === '.' && currentValue.includes('.')) {
        return;
      }
      setCurrentValue((prev) => prev + num);
      setExpressionDisplay((prev) => prev + num);
    }
  };

  const handleOperation = (op: string) => {
    if (operation && !isNewCalculation) {
      handleCalculate();
    }

    setStoredValue(currentValue);
    setOperation(op);
    setExpressionDisplay(`${currentValue} ${op} `);
    setIsNewCalculation(true);
  };

  const handleCalculate = () => {
    if (!operation || !storedValue) return;

    let result: number;
    const num1 = parseFloat(storedValue);
    const num2 = parseFloat(currentValue);

    switch (operation) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '×':
        result = num1 * num2;
        break;
      case '÷':
        if (num2 === 0) {
          setCurrentValue('Error');
          setExpressionDisplay('Cannot divide by zero');
          setOperation(null);
          setStoredValue(null);
          setIsNewCalculation(true);
          return;
        }
        result = num1 / num2;
        break;
      default:
        return;
    }

    const formattedResult = formatResult(result);
    setCurrentValue(formattedResult);
    setExpressionDisplay(`${storedValue} ${operation} ${currentValue} =`);
    setOperation(null);
    setStoredValue(null);
    setIsNewCalculation(true);
  };

  const formatResult = (num: number): string => {
    if (Number.isNaN(num)) return 'Error';
    if (!Number.isFinite(num)) return 'Infinity';

    // Convert to string and limit length
    const numStr = num.toString();
    if (numStr.length <= MAX_DISPLAY_LENGTH) return numStr;

    // Try scientific notation
    const scientificStr = num.toExponential(6);
    if (scientificStr.length <= MAX_DISPLAY_LENGTH) return scientificStr;

    // Fallback: truncate
    return num.toPrecision(7);
  };

  const handleClear = () => {
    setCurrentValue('0');
    setStoredValue(null);
    setOperation(null);
    setExpressionDisplay('');
    setIsNewCalculation(true);
  };

  const handleToggleSign = () => {
    if (currentValue === '0' || currentValue === 'Error') return;
    setCurrentValue((prev) => (prev.startsWith('-') ? prev.slice(1) : '-' + prev));
    // Update expression display accordingly
    if (operation && !isNewCalculation) {
      setExpressionDisplay(`${storedValue} ${operation} ${currentValue.startsWith('-') ? currentValue.slice(1) : '-' + currentValue}`);
    } else {
      setExpressionDisplay(currentValue.startsWith('-') ? currentValue.slice(1) : '-' + currentValue);
    }
  };

  const handlePercentage = () => {
    const num = parseFloat(currentValue) / 100;
    const formattedResult = formatResult(num);
    setCurrentValue(formattedResult);
    
    if (operation && storedValue) {
      setExpressionDisplay(`${storedValue} ${operation} ${formattedResult}`);
    } else {
      setExpressionDisplay(formattedResult);
    }
  };

  const handleBackspace = () => {
    if (currentValue === '0' || currentValue === 'Error' || isNewCalculation) return;
    
    const newValue = currentValue.length === 1 ? '0' : currentValue.slice(0, -1);
    setCurrentValue(newValue);
    
    // Update expression display
    if (operation && storedValue) {
      setExpressionDisplay(`${storedValue} ${operation} ${newValue}`);
    } else {
      setExpressionDisplay(newValue);
    }
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.match(/[0-9.]/)) {
        handleNumberInput(e.key);
      } else if (e.key === '+' || e.key === '-') {
        handleOperation(e.key);
      } else if (e.key === '*') {
        handleOperation('×');
      } else if (e.key === '/') {
        handleOperation('÷');
      } else if (e.key === 'Enter' || e.key === '=') {
        handleCalculate();
      } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
        handleClear();
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === '%') {
        handlePercentage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentValue, storedValue, operation, isNewCalculation]);

  return (
    <div className={cn('max-w-sm mx-auto animate-fade-in p-6 rounded-3xl bg-calculator backdrop-blur-md', 'glass dark:glass-dark', className)}>
      <CalculatorDisplay value={currentValue} expression={expressionDisplay} />
      
      <div className="grid grid-cols-4 gap-3">
        <CalculatorButton value="C" type="function" onClick={handleClear} />
        <CalculatorButton value="±" type="function" onClick={handleToggleSign} />
        <CalculatorButton value="%" type="function" onClick={handlePercentage} />
        <CalculatorButton value="÷" type="operator" onClick={handleOperation} />
        
        <CalculatorButton value="7" onClick={handleNumberInput} />
        <CalculatorButton value="8" onClick={handleNumberInput} />
        <CalculatorButton value="9" onClick={handleNumberInput} />
        <CalculatorButton value="×" type="operator" onClick={handleOperation} />
        
        <CalculatorButton value="4" onClick={handleNumberInput} />
        <CalculatorButton value="5" onClick={handleNumberInput} />
        <CalculatorButton value="6" onClick={handleNumberInput} />
        <CalculatorButton value="-" type="operator" onClick={handleOperation} />
        
        <CalculatorButton value="1" onClick={handleNumberInput} />
        <CalculatorButton value="2" onClick={handleNumberInput} />
        <CalculatorButton value="3" onClick={handleNumberInput} />
        <CalculatorButton value="+" type="operator" onClick={handleOperation} />
        
        <CalculatorButton value="0" onClick={handleNumberInput} doubleWidth />
        <CalculatorButton value="." onClick={handleNumberInput} />
        <CalculatorButton value="=" type="operator" onClick={handleCalculate} />
      </div>
    </div>
  );
};

export default Calculator;
