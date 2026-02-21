'use client';

import { motion } from 'motion/react';

export default function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Outer Hexagon Frame */}
        <motion.path
          d="M50 5L89.4 27.5V72.5L50 95L10.6 72.5V27.5L50 5Z"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        
        {/* Inner Flame/Sword Shape */}
        <motion.path
          d="M50 25C50 25 35 45 35 60C35 75 50 85 50 85C50 85 65 75 65 60C65 45 50 25 50 25Z"
          fill="currentColor"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
        />
        
        {/* Central Core */}
        <motion.circle
          cx="50"
          cy="60"
          r="8"
          fill="white"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.5, 1] }}
          transition={{ delay: 1.2, duration: 2, repeat: Infinity }}
        />
      </svg>
      
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-red-600/20 blur-xl rounded-full -z-10 animate-pulse" />
    </div>
  );
}
