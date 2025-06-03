import { useState, useEffect } from 'react';

interface AnimationControlsResult {
  animate: boolean;
  setAnimate: (value: boolean) => void;
  handleAnimationEnd: () => void;
}

export const useAnimationControls = (stage: number): AnimationControlsResult => {
  const [animate, setAnimate] = useState(false);
  
  // Automatically start animation when stage changes
  useEffect(() => {
    if (stage > 0) {
      // Wait a bit before starting animation when stage changes
      const timer = setTimeout(() => {
        setAnimate(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [stage]);
  
  const handleAnimationEnd = () => {
    setAnimate(false);
  };
  
  return {
    animate,
    setAnimate,
    handleAnimationEnd
  };
};