import React from 'react';

export default function EngineeringGrid() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-[#050505] pointer-events-none">
      {/* Engineering grid lines */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Radial atmospheric glows */}
      {/* Purple glow behind sphere */}
      <div 
        className="absolute top-1/2 left-[75%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 filter blur-[120px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)',
        }}
      />

      {/* Blue/Cyan secondary glow */}
      <div 
        className="absolute top-1/3 left-[70%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-15 filter blur-[100px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)',
        }}
      />
    </div>
  );
}
