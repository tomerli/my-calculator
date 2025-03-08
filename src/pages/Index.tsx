
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
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 transition-colors duration-500">
      <div className="w-full max-w-md px-4 py-12 animate-fade-up">
        <div className="text-center mb-8">
          <p className="text-gray-400 dark:text-gray-300 max-w-sm mx-auto">
            A beautiful calculator with a clean interface and smooth animations
          </p>
        </div>
        
        <Calculator className="shadow-2xl hover:shadow-3xl transition-shadow duration-500 pulse-glow" />
        
        <div className="mt-8 text-center text-sm text-gray-400 dark:text-gray-300">
          <p>Press keyboard keys to interact with the calculator</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
