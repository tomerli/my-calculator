
import React, { useEffect, useState } from 'react';
import Calculator from '@/components/Calculator/Calculator';

const Index = () => {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <div className="w-full max-w-md px-4 py-12 animate-fade-up">
        <div className="text-center mb-8">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs font-medium tracking-wider mb-2 animate-fade-in">
            BEAUTIFULLY DESIGNED
          </span>
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-2">
            Minimal Calculator
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
            A beautiful calculator with a clean interface and smooth animations
          </p>
        </div>
        
        <Calculator className="shadow-2xl hover:shadow-3xl transition-shadow duration-500 pulse-glow" />
        
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Press keyboard keys to interact with the calculator</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
