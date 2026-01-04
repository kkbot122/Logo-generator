'use client';

import { useState } from 'react';
import CreateBrandModal from '@/components/CreateBrandModal';

export default function CreateProjectTrigger({ 
  children, 
  className 
}: { 
  children: React.ReactNode, 
  className?: string 
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* The Button/Card you click */}
      <div 
        onClick={() => setIsOpen(true)} 
        className={className}
        role="button"
        tabIndex={0}
      >
        {children}
      </div>

      {/* The Modal that opens */}
      <CreateBrandModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </>
  );
}