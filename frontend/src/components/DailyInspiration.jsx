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
    // Fetch AI-generated daily wisdom and teaching
    fetchDailyContent();
  }, []);

  const fetchDailyContent = async () => {
    try {
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
      const API = `${BACKEND_URL}/api`;
      
      // Fetch daily wisdom
      const wisdomResponse = await fetch(`${API}/daily-wisdom`);
      if (wisdomResponse.ok) {
        const wisdomData = await wisdomResponse.json();
        setCurrentWisdom(wisdomData);
      } else {
        // Fallback to static content if API fails
        setCurrentWisdom(dailyWisdom[0]);
      }
      
      // Fetch spiritual teaching
      const teachingResponse = await fetch(`${API}/spiritual-teaching`);
      if (teachingResponse.ok) {
        const teachingData = await teachingResponse.json();
        setCurrentTeaching(teachingData);
      } else {
        // Fallback to static content if API fails
        setCurrentTeaching(spiritualTeachings[0]);
      }
    } catch (error) {
      console.error('Error fetching daily content:', error);
      // Fallback to static content
      setCurrentWisdom(dailyWisdom[0]);
      setCurrentTeaching(spiritualTeachings[0]);
    }
  };

  const getNewWisdom = async () => {
    try {
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
      const API = `${BACKEND_URL}/api`;
      
      const response = await fetch(`${API}/daily-wisdom`);
      if (response.ok) {
        const wisdomData = await response.json();
        setCurrentWisdom(wisdomData);
      }
    } catch (error) {
      console.error('Error fetching new wisdom:', error);
      // Fallback to random static content
      const randomIndex = Math.floor(Math.random() * dailyWisdom.length);
      setCurrentWisdom(dailyWisdom[randomIndex]);
    }
  };

  const getNewTeaching = async () => {
    try {
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
      const API = `${BACKEND_URL}/api`;
      
      const response = await fetch(`${API}/spiritual-teaching`);
      if (response.ok) {
        const teachingData = await response.json();
        setCurrentTeaching(teachingData);
      }
    } catch (error) {
      console.error('Error fetching new teaching:', error);
      // Fallback to random static content
      const randomIndex = Math.floor(Math.random() * spiritualTeachings.length);
      setCurrentTeaching(spiritualTeachings[randomIndex]);
    }
  };

  if (!currentWisdom || !currentTeaching) return null;

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

      {/* Spiritual Teaching Card */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-purple-500" />
              <CardTitle className="text-lg text-purple-800">Spiritual Teaching</CardTitle>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={getNewTeaching}
              className="text-purple-600 hover:text-purple-800 hover:bg-purple-100"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="text-xl font-semibold text-purple-800 mb-3">{currentTeaching.title}</h3>
          
          <div className="text-purple-700 space-y-4">
            <div className="bg-white/70 p-4 rounded-lg">
              <p className="text-purple-800 font-medium mb-2">Core Principle:</p>
              <p className="leading-relaxed text-sm">{currentTeaching.principle}</p>
            </div>
            
            {!showFullTeaching && (
              <Button 
                onClick={() => setShowFullTeaching(true)}
                className="bg-purple-500 hover:bg-purple-600 text-white"
              >
                Explore This Teaching
              </Button>
            )}
            
            {showFullTeaching && (
              <div className="space-y-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-purple-800 font-medium mb-2">Teaching:</p>
                  <p className="leading-relaxed text-sm">{currentTeaching.teaching}</p>
                </div>
                
                <div className="bg-white/70 p-4 rounded-lg">
                  <p className="text-purple-800 font-medium mb-2">How to Apply Today:</p>
                  <p className="leading-relaxed text-sm">{currentTeaching.application}</p>
                </div>
                
                <div className="bg-purple-100 p-4 rounded-lg">
                  <p className="text-purple-800 font-medium mb-2">Reflection:</p>
                  <p className="text-purple-700 text-sm italic">"{currentTeaching.reflection}"</p>
                </div>
                
                <Button 
                  variant="outline" 
                  onClick={() => setShowFullTeaching(false)}
                  className="border-purple-300 text-purple-600 hover:bg-purple-50"
                >
                  Collapse Teaching
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
              Remember: Life has a way of turning even our messiest moments into meaningful growth. 
              Every challenge is an opportunity for transformation and wisdom.
            </p>
            <div className="bg-white/70 p-4 rounded-lg">
              <p className="text-emerald-800 font-semibold mb-2">Today's Affirmation:</p>
              <p className="text-emerald-700 italic">
                "I am worthy of love and kindness. I trust life's process and choose peace over chaos in my heart."
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};