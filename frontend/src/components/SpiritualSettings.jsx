import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Settings, Heart, Check, Crown, Lock, Unlock } from 'lucide-react';
import { usePremium } from '../contexts/PremiumContext';

const spiritualPaths = [
  {
    id: 'universal',
    name: 'Universal Spirituality',
    divine: 'Infinite Love',
    source: 'Divine Design',
    wisdom: 'infinite wisdom',
    love: 'unconditional love',
    description: 'Universal spiritual language for all paths'
  },
  {
    id: 'christian',
    name: 'Christian Faith',
    divine: 'Jesus Christ',
    source: 'God\'s Plan',
    wisdom: 'divine wisdom',
    love: 'God\'s love',
    description: 'Following the teachings of Jesus Christ'
  },
  {
    id: 'islamic',
    name: 'Islamic Faith',
    divine: 'Allah',
    source: 'Allah\'s Will',
    wisdom: 'divine wisdom',
    love: 'Allah\'s mercy',
    description: 'Following the path of Islam'
  },
  {
    id: 'buddhist',
    name: 'Buddhist Path',
    divine: 'Buddha Nature',
    source: 'Dharma',
    wisdom: 'Buddha\'s wisdom',
    love: 'compassion',
    description: 'Following the Buddha\'s teachings'
  },
  {
    id: 'hindu',
    name: 'Hindu Dharma',
    divine: 'Divine Consciousness',
    source: 'Cosmic Order',
    wisdom: 'eternal wisdom',
    love: 'divine love',
    description: 'Following Sanatana Dharma'
  },
  {
    id: 'jewish',
    name: 'Jewish Faith',
    divine: 'The Almighty',
    source: 'Divine Providence',
    wisdom: 'divine wisdom',
    love: 'divine compassion',
    description: 'Following Jewish teachings'
  },
  {
    id: 'custom',
    name: 'Custom Spiritual Path',
    divine: 'Universe',
    source: 'Universal Intelligence',
    wisdom: 'infinite intelligence',
    love: 'universal love',
    description: 'Create your own spiritual language'
  }
];

export const SpiritualSettings = () => {
  const [selectedPath, setSelectedPath] = useState('universal');
  const [customSettings, setCustomSettings] = useState({
    divine: '',
    source: '',
    wisdom: '',
    love: ''
  });
  const [saved, setSaved] = useState(false);
  const { isPremium, activatePremium, deactivatePremium } = usePremium();

  useEffect(() => {
    // Load saved preferences
    const savedPath = localStorage.getItem('spiritualPath');
    const savedCustom = localStorage.getItem('customSpiritualSettings');
    
    if (savedPath) {
      setSelectedPath(savedPath);
    }
    if (savedCustom) {
      setCustomSettings(JSON.parse(savedCustom));
    }
  }, []);

  const handlePathChange = (pathId) => {
    setSelectedPath(pathId);
    if (pathId !== 'custom') {
      const path = spiritualPaths.find(p => p.id === pathId);
      setCustomSettings({
        divine: path.divine,
        source: path.source,
        wisdom: path.wisdom,
        love: path.love
      });
    }
  };

  const handleSave = () => {
    // Save preferences
    localStorage.setItem('spiritualPath', selectedPath);
    localStorage.setItem('customSpiritualSettings', JSON.stringify(customSettings));
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('spiritualSettingsUpdated', {
      detail: { path: selectedPath, settings: customSettings }
    }));
    
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const selectedPathData = spiritualPaths.find(p => p.id === selectedPath);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Settings className="w-6 h-6 text-indigo-500" />
        <h2 className="text-2xl font-semibold text-gray-800">Spiritual Preferences</h2>
      </div>

      {/* Introduction */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <CardHeader>
          <CardTitle className="text-lg text-indigo-800">Personalize Your Spiritual Experience</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-indigo-700 leading-relaxed">
            The core practices here - gratitude, kindness, forgiveness, surrender, and manifestation - 
            are universal tools that work within any spiritual framework. Choose how you'd like to connect with the divine source 
            that guides your journey.
          </p>
        </CardContent>
      </Card>

      {/* Spiritual Path Selection */}
      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle className="text-lg text-purple-800">Choose Your Spiritual Path</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Select Your Spiritual Framework:</label>
            <Select value={selectedPath} onValueChange={handlePathChange}>
              <SelectTrigger className="focus:ring-purple-400 focus:border-purple-400">
                <SelectValue placeholder="Choose your spiritual path" />
              </SelectTrigger>
              <SelectContent>
                {spiritualPaths.map((path) => (
                  <SelectItem key={path.id} value={path.id}>
                    <div>
                      <div className="font-medium">{path.name}</div>
                      <div className="text-xs text-gray-500">{path.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedPath && (
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-medium text-purple-800 mb-3">Your Spiritual Language:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Divine Source:</span>
                  <span className="ml-2 font-medium text-purple-700">
                    {selectedPath === 'custom' ? customSettings.divine : selectedPathData?.divine}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Guidance System:</span>
                  <span className="ml-2 font-medium text-purple-700">
                    {selectedPath === 'custom' ? customSettings.source : selectedPathData?.source}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Wisdom Source:</span>
                  <span className="ml-2 font-medium text-purple-700">
                    {selectedPath === 'custom' ? customSettings.wisdom : selectedPathData?.wisdom}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Love Expression:</span>
                  <span className="ml-2 font-medium text-purple-700">
                    {selectedPath === 'custom' ? customSettings.love : selectedPathData?.love}
                  </span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Custom Settings */}
      {selectedPath === 'custom' && (
        <Card className="border-purple-200">
          <CardHeader>
            <CardTitle className="text-lg text-purple-800">Customize Your Spiritual Language</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Divine Source Name:</label>
                <Input
                  value={customSettings.divine}
                  onChange={(e) => setCustomSettings({...customSettings, divine: e.target.value})}
                  placeholder="e.g., Universe, Source, Great Spirit"
                  className="focus:ring-purple-400 focus:border-purple-400"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Guidance System:</label>
                <Input
                  value={customSettings.source}
                  onChange={(e) => setCustomSettings({...customSettings, source: e.target.value})}
                  placeholder="e.g., Universal Plan, Cosmic Order"
                  className="focus:ring-purple-400 focus:border-purple-400"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Wisdom Source:</label>
                <Input
                  value={customSettings.wisdom}
                  onChange={(e) => setCustomSettings({...customSettings, wisdom: e.target.value})}
                  placeholder="e.g., infinite intelligence, cosmic wisdom"
                  className="focus:ring-purple-400 focus:border-purple-400"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Love Expression:</label>
                <Input
                  value={customSettings.love}
                  onChange={(e) => setCustomSettings({...customSettings, love: e.target.value})}
                  placeholder="e.g., universal love, cosmic compassion"
                  className="focus:ring-purple-400 focus:border-purple-400"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Preview */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-lg text-green-800">Preview Your Experience</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-green-700">
            <p>
              <span className="font-medium">Gratitude Example:</span> 
              " Thank you, {selectedPath === 'custom' ? customSettings.divine : selectedPathData?.divine}, for my health and family. I am so grateful for these blessings."
            </p>
            <p>
              <span className="font-medium">Blessing Example:</span> 
              " I ask {selectedPath === 'custom' ? customSettings.divine : selectedPathData?.divine} to bless my friend with healing and peace."
            </p>
            <p>
              <span className="font-medium">Surrender Example:</span> 
              " {selectedPath === 'custom' ? customSettings.divine : selectedPathData?.divine}, I surrender this situation to {selectedPath === 'custom' ? customSettings.source : selectedPathData?.source}. I trust in {selectedPath === 'custom' ? customSettings.wisdom : selectedPathData?.wisdom}."
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-center">
        <Button 
          onClick={handleSave}
          className={`px-8 py-3 ${saved ? 'bg-green-500 hover:bg-green-600' : 'bg-purple-500 hover:bg-purple-600'} text-white transition-all duration-200`}
        >
          {saved ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Preferences Saved!
            </>
          ) : (
            <>
              <Heart className="w-4 h-4 mr-2" />
              Save My Spiritual Preferences
            </>
          )}
        </Button>
      </div>

      {/* Important Note */}
      <Card className="bg-amber-50 border-amber-200">
        <CardContent className="pt-6">
          <div className="text-amber-800">
            <p className="font-medium mb-2">✨ Remember:</p>
            <p className="text-sm leading-relaxed">
              Regardless of your chosen spiritual language, the core Divine Design teachings remain the same: 
              your ego creates problems while your divine nature (connected to {selectedPath === 'custom' ? customSettings.divine : selectedPathData?.divine}) 
              creates solutions. These practices work within any faith because they address universal spiritual principles.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Creator/Admin Access Control */}
      <Card className="bg-gradient-to-br from-slate-50 to-gray-100 border-2 border-slate-300">
        <CardHeader className="bg-slate-800 text-white">
          <CardTitle className="text-lg flex items-center gap-2">
            <Crown className="w-5 h-5 text-amber-400" />
            Creator Access Panel
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white rounded-lg border-2 border-slate-200">
              <div className="flex items-center gap-3">
                {isPremium ? (
                  <Unlock className="w-6 h-6 text-green-500" />
                ) : (
                  <Lock className="w-6 h-6 text-gray-400" />
                )}
                <div>
                  <p className="font-semibold text-gray-800">Premium Access Status</p>
                  <p className="text-sm text-gray-600">
                    {isPremium 
                      ? "✅ Premium features unlocked - You can view all content" 
                      : "🔒 Viewing as free user - Premium features locked"
                    }
                  </p>
                </div>
              </div>
              <Button
                onClick={isPremium ? deactivatePremium : activatePremium}
                className={`${
                  isPremium 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600'
                } text-white font-semibold px-6`}
              >
                {isPremium ? (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    Lock Premium
                  </>
                ) : (
                  <>
                    <Crown className="w-4 h-4 mr-2" />
                    Unlock Premium
                  </>
                )}
              </Button>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>👨‍💻 Creator Note:</strong> Use this toggle to switch between free and premium views. 
                This helps you test both user experiences. Premium features include Florence Scovel Shinn's 
                "The Game of Life" and Neville Goddard's complete manifestation teachings.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};