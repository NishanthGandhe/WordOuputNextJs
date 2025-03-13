'use client';

import { useState, useEffect, useRef } from 'react';

interface HackingTextProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
  glitchProbability?: number;
}

export default function HackingText({
  text,
  speed = 50,
  className = '',
  onComplete,
  glitchProbability = 0.03
}: HackingTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const completedTextRef = useRef('');
  
  const startAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsComplete(false);
    completedTextRef.current = '';
    setDisplayText('');
    
    let currentIndex = 0;
    
    const animate = () => {
      if (currentIndex >= text.length) {
        setIsAnimating(false);
        setIsComplete(true);
        if (onComplete) onComplete();
        return;
      }
      
      const targetChar = text[currentIndex];
      let attempts = 0;
      const maxAttempts = Math.floor(Math.random() * 8) + 3; 
      
      const tryCharacter = () => {
        attempts++;
        
        let tempCompletedText = completedTextRef.current;
        if (completedTextRef.current.length > 0 && Math.random() < glitchProbability) {
          const glitchIndex = Math.floor(Math.random() * completedTextRef.current.length);
          const glitchChar = chars[Math.floor(Math.random() * chars.length)];
          tempCompletedText = 
            completedTextRef.current.substring(0, glitchIndex) + 
            glitchChar + 
            completedTextRef.current.substring(glitchIndex + 1);
        }
        
        if (attempts >= maxAttempts) {
          completedTextRef.current += targetChar;
          currentIndex++;
          setDisplayText(completedTextRef.current);
          animationRef.current = setTimeout(animate, speed);
          return;
        }
        
        const randomChar = chars[Math.floor(Math.random() * chars.length)];
        setDisplayText(tempCompletedText + randomChar);
        
        animationRef.current = setTimeout(tryCharacter, speed);
      };
      
      tryCharacter();
    };
    
    animate();
  };
  
  const stopAnimation = () => {
    if (animationRef.current) {
      clearTimeout(animationRef.current);
      animationRef.current = null;
    }
    setIsAnimating(false);
  };
  
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, []);
  
  return {
    displayText,
    isAnimating,
    isComplete,
    startAnimation,
    stopAnimation
  };
}