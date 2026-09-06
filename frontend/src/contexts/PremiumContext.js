import React, { createContext, useContext, useState, useEffect } from 'react';

const PremiumContext = createContext();

export const usePremium = () => {
  const context = useContext(PremiumContext);
  if (!context) {
    throw new Error('usePremium must be used within PremiumProvider');
  }
  return context;
};

export const PremiumProvider = ({ children }) => {
  // For now, using localStorage. In production, this would check with your backend/payment system
  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for premium status
    const premiumStatus = localStorage.getItem('premium_status') === 'true';
    setIsPremium(premiumStatus);
    setIsLoading(false);
  }, []);

  const activatePremium = () => {
    localStorage.setItem('premium_status', 'true');
    setIsPremium(true);
  };

  const deactivatePremium = () => {
    localStorage.setItem('premium_status', 'false');
    setIsPremium(false);
  };

  return (
    <PremiumContext.Provider 
      value={{ 
        isPremium, 
        isLoading,
        activatePremium,
        deactivatePremium
      }}
    >
      {children}
    </PremiumContext.Provider>
  );
};
