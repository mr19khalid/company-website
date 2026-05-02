import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingFallback: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-primary-600 animate-spin mx-auto mb-4" />
        <div className="text-gray-600">Loading premium content...</div>
      </div>
    </div>
  );
};

export default LoadingFallback;
export {};
