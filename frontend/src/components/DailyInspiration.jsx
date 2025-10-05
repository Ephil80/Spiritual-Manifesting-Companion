import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Star, RefreshCw, Calendar } from 'lucide-react';
import { dailyWisdom, spiritualTeachings } from '../inspirationData';

export const DailyInspiration = () => {
  const [currentWisdom, setCurrentWisdom] = useState(null);
  const [currentTeaching, setCurrentTeaching] = useState(null);
  const [showFullTeaching, setShowFullTeaching] = useState(false);

  useEffect(() => {
    // Get today's wisdom and story based on date
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    
    setCurrentWisdom(dailyWisdom[dayOfYear % dailyWisdom.length]);
    setCurrentStory(inspirationalStories[dayOfYear % inspirationalStories.length]);
  }, []);

  const getNewWisdom = () => {
    const randomIndex = Math.floor(Math.random() * dailyWisdom.length);
    setCurrentWisdom(dailyWisdom[randomIndex]);
  };

  const getNewStory = () => {
    const randomIndex = Math.floor(Math.random() * inspirationalStories.length);
    setCurrentStory(inspirationalStories[randomIndex]);
  };

  if (!currentWisdom || !currentStory) return null;

  return (
    <div className="space-y-6">
      {/* Daily Wisdom Card */}
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-amber-500" />
              <CardTitle className="text-lg text-amber-800">Today's Divine Wisdom</CardTitle>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={getNewWisdom}
              className="text-amber-600 hover:text-amber-800 hover:bg-amber-100"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <blockquote className="text-lg text-amber-800 italic mb-4 leading-relaxed">
            "{currentWisdom.quote}"
          </blockquote>
          <div className="bg-white/70 p-4 rounded-lg">
            <p className="text-amber-700 text-sm font-medium mb-2">Divine Insight:</p>
            <p className="text-amber-600 text-sm leading-relaxed">{currentWisdom.insight}</p>
          </div>
          {currentWisdom.practice && (
            <div className="mt-4 bg-amber-100 p-3 rounded-lg">
              <p className="text-amber-800 text-sm font-medium mb-1">Today's Practice:</p>
              <p className="text-amber-700 text-sm">{currentWisdom.practice}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Daily Story Card */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-purple-500" />
              <CardTitle className="text-lg text-purple-800">Inspirational Story</CardTitle>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={getNewStory}
              className="text-purple-600 hover:text-purple-800 hover:bg-purple-100"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="text-xl font-semibold text-purple-800 mb-3">{currentStory.title}</h3>
          
          <div className="text-purple-700 space-y-4">
            <p className="leading-relaxed">{currentStory.excerpt}</p>
            
            {!showStory && (
              <Button 
                onClick={() => setShowStory(true)}
                className="bg-purple-500 hover:bg-purple-600 text-white"
              >
                Read Full Story
              </Button>
            )}
            
            {showStory && (
              <div className="space-y-4">
                <p className="leading-relaxed">{currentStory.fullStory}</p>
                
                <div className="bg-white/70 p-4 rounded-lg mt-4">
                  <p className="text-purple-800 font-medium mb-2">Divine Lesson:</p>
                  <p className="text-purple-700 text-sm italic">{currentStory.lesson}</p>
                </div>
                
                <Button 
                  variant="outline" 
                  onClick={() => setShowStory(false)}
                  className="border-purple-300 text-purple-600 hover:bg-purple-50"
                >
                  Collapse Story
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Daily Affirmation */}
      <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-emerald-700 text-lg mb-4 leading-relaxed">
              Remember: Your ego creates problems, but the Divine Design creates solutions. 
              Every challenge is an invitation to surrender deeper into divine trust.
            </p>
            <div className="bg-white/70 p-4 rounded-lg">
              <p className="text-emerald-800 font-semibold mb-2">Today's Affirmation:</p>
              <p className="text-emerald-700 italic">
                "I choose Divine Design over ego chaos. I am aligned with my highest good."
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};