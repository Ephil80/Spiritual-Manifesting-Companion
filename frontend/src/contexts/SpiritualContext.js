import React, { createContext, useContext, useState, useEffect } from 'react';

const SpiritualContext = createContext();

export const useSpiritualSettings = () => {
  const context = useContext(SpiritualContext);
  if (!context) {
    throw new Error('useSpiritualSettings must be used within a SpiritualProvider');
  }
  return context;
};

const defaultSettings = {
  divine: 'Infinite Love',
  source: 'Divine Design', 
  wisdom: 'infinite wisdom',
  love: 'unconditional love'
};

export const SpiritualProvider = ({ children }) => {
  const [spiritualSettings, setSpiritualSettings] = useState(defaultSettings);
  const [spiritualPath, setSpiritualPath] = useState('universal');

  useEffect(() => {
    // Load saved preferences
    const savedPath = localStorage.getItem('spiritualPath');
    const savedSettings = localStorage.getItem('customSpiritualSettings');
    
    if (savedPath) {
      setSpiritualPath(savedPath);
    }
    
    if (savedSettings) {
      setSpiritualSettings(JSON.parse(savedSettings));
    }

    // Listen for settings updates
    const handleSettingsUpdate = (event) => {
      setSpiritualPath(event.detail.path);
      setSpiritualSettings(event.detail.settings);
    };

    window.addEventListener('spiritualSettingsUpdated', handleSettingsUpdate);
    
    return () => {
      window.removeEventListener('spiritualSettingsUpdated', handleSettingsUpdate);
    };
  }, []);

  // Helper functions to get spiritually-appropriate text
  const getSpiritualText = {
    // For gratitude
    gratitudeTemplate: (blessing) => 
      `Thank you, ${spiritualSettings.divine}, for my ${blessing}. I am so grateful for this blessing.`,
    
    // For blessings  
    blessingTemplate: (person, blessing) => 
      `I ask ${spiritualSettings.divine} to bless ${person} with ${blessing}. May they receive their highest good through ${spiritualSettings.source}.`,
    
    // For manifestation
    manifestTemplate: (desire) => 
      `${spiritualSettings.divine}, I desire ${desire}, this or something better, in alignment with ${spiritualSettings.source}. Thank you for hearing me.`,
    
    // For surrender
    surrenderTemplate: (situation) => 
      `${spiritualSettings.divine}, I surrender ${situation} to ${spiritualSettings.source}. I trust in ${spiritualSettings.wisdom} to guide this situation for the highest good of all.`,
    
    // For forgiveness
    forgivenessTemplate: (person) => 
      `${spiritualSettings.divine}, I forgive ${person} and release this resentment from my heart. Through ${spiritualSettings.love}, I choose my emotional freedom over carrying this burden.`,
    
    // For banishing
    banishingTemplate: (negative) => 
      `${spiritualSettings.divine}, I release and banish ${negative} from my life. Through ${spiritualSettings.source}, I clear this space for divine blessings to flow.`,
    
    // General divine references
    getDivine: () => spiritualSettings.divine,
    getSource: () => spiritualSettings.source,
    getWisdom: () => spiritualSettings.wisdom,
    getLove: () => spiritualSettings.love
  };

  const value = {
    spiritualSettings,
    spiritualPath,
    getSpiritualText,
    updateSettings: (newSettings) => {
      setSpiritualSettings(newSettings);
      localStorage.setItem('customSpiritualSettings', JSON.stringify(newSettings));
    }
  };

  return (
    <SpiritualContext.Provider value={value}>
      {children}
    </SpiritualContext.Provider>
  );
};