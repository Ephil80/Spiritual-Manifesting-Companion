import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { GratitudeJournal } from "./components/GratitudeJournal";
import { BlessingPractice } from "./components/BlessingPractice";
import { ManifestingJournal } from "./components/ManifestingJournal";
import { SurrenderPractice } from "./components/SurrenderPractice";
import { BanishingPractice } from "./components/BanishingPractice";
import { DailyInspiration } from "./components/DailyInspiration";
import { NotificationSystem } from "./components/NotificationSystem";
import { BlessTheCreator } from "./components/BlessTheCreator";
import { ForgivenessPractice } from "./components/ForgivenessPractice";
import { SpiritualSettings } from "./components/SpiritualSettings";
import { KindnessPractice } from "./components/KindnessPractice";
import { SpiritualProvider, useSpiritualSettings } from "./contexts/SpiritualContext";
import { PremiumProvider, usePremium } from "./contexts/PremiumContext";
import { GameOfLife } from "./components/GameOfLife";
import { NevilleGoddard } from "./components/NevilleGoddard";
import { PremiumUpgrade, PremiumLock } from "./components/PremiumUpgrade";
import { Heart, Users, Sparkles, Bird, Shield, Lightbulb, Bell, Gift, Wrench, Settings, Smile, BookOpen, Crown, Brain } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const { getSpiritualText } = useSpiritualSettings();
  const { isPremium } = usePremium();
  
  const helloWorldApi = async () => {
    try {
      const response = await axios.get(`${API}/`);
      console.log(response.data.message);
    } catch (e) {
      console.error(e, `errored out requesting / api`);
    }
  };

  useEffect(() => {
    helloWorldApi();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-lg border-b border-indigo-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              ✨ The Spiritual Manifesting Companion
            </h1>
            <p className="text-lg text-gray-600 mt-2">Transform Your Life Through Sacred Practices</p>
          </div>
        </div>
      </header>

      {/* Philosophy Section */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-8 rounded-2xl border border-indigo-100 mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome to Your Spiritual Journey</h2>
            <div className="max-w-4xl mx-auto text-gray-700 space-y-4">
              <p className="text-lg leading-relaxed">
                Life can feel overwhelming sometimes, but you're not alone on this journey. Whether you're spiritual, religious, 
                or just curious about personal growth, this companion is here to support you with gentle practices that actually work.
              </p>
              <p className="text-lg leading-relaxed">
                We all have two voices in our heads: the worried, controlling one (let's call it ego) and the calm, wise one (your inner knowing). 
                The worried voice means well but often creates stress by trying to control everything. Your wise voice knows there's a bigger picture.
              </p>
              <p className="text-lg leading-relaxed">
                Here's something beautiful: <span className="font-semibold text-green-600">life has a way of turning challenges into growth</span>. 
                Sometimes what feels like a setback opens doors you never saw coming. And sometimes our worry-brain can turn good things into stress through overthinking.
              </p>
              <p className="text-lg leading-relaxed">
                The practices here - <span className="font-semibold text-purple-600">gratitude, kindness, forgiveness, and letting go</span> - 
                are simple tools to help you connect with your calm, wise inner voice more often.
              </p>
              <div className="bg-white/80 p-4 rounded-lg mt-6">
                <p className="text-indigo-800 italic font-medium">
                  "Your worried mind thinks it needs to figure everything out, but your wise heart knows things unfold in their own perfect way."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Tabs defaultValue="inspiration" className="w-full">
          {/* Clean Navigation Menu */}
          <TabsList className="w-full h-auto bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-indigo-100 shadow-lg mb-8 flex flex-col items-stretch">
              
            {/* Daily Support Section */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">📚 Daily Support</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <TabsTrigger 
                  value="inspiration" 
                  className="flex items-center space-x-3 data-[state=active]:bg-amber-500 data-[state=active]:text-white bg-amber-50 hover:bg-amber-100 transition-all duration-200 justify-start p-4 rounded-lg border border-amber-200"
                >
                  <Lightbulb className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium">Daily Inspiration</div>
                    <div className="text-xs text-gray-500 data-[state=active]:text-white/80">Wisdom & spiritual teachings</div>
                  </div>
                </TabsTrigger>
                <TabsTrigger 
                  value="gameoflife" 
                  className="flex items-center space-x-3 data-[state=active]:bg-purple-500 data-[state=active]:text-white bg-purple-50 hover:bg-purple-100 transition-all duration-200 justify-start p-4 rounded-lg border border-purple-200 relative"
                >
                  <BookOpen className="w-5 h-5" />
                  <div className="text-left flex-1">
                    <div className="font-medium flex items-center gap-2">
                      The Game of Life
                      <Crown className="w-3 h-3 text-amber-500" />
                    </div>
                    <div className="text-xs text-gray-500 data-[state=active]:text-white/80">Florence Scovel Shinn</div>
                  </div>
                </TabsTrigger>
                <TabsTrigger 
                  value="neville" 
                  className="flex items-center space-x-3 data-[state=active]:bg-indigo-600 data-[state=active]:text-white bg-indigo-50 hover:bg-indigo-100 transition-all duration-200 justify-start p-4 rounded-lg border border-indigo-200 relative"
                >
                  <Brain className="w-5 h-5" />
                  <div className="text-left flex-1">
                    <div className="font-medium flex items-center gap-2">
                      Neville Goddard
                      <Crown className="w-3 h-3 text-amber-500" />
                    </div>
                    <div className="text-xs text-gray-500 data-[state=active]:text-white/80">Consciousness is reality</div>
                  </div>
                </TabsTrigger>
                <TabsTrigger 
                  value="reminders" 
                  className="flex items-center space-x-3 data-[state=active]:bg-indigo-500 data-[state=active]:text-white bg-indigo-50 hover:bg-indigo-100 transition-all duration-200 justify-start p-4 rounded-lg border border-indigo-200"
                >
                  <Bell className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium">Smart Reminders</div>
                    <div className="text-xs text-gray-500 data-[state=active]:text-white/80">Notifications & gentle nudges</div>
                  </div>
                </TabsTrigger>
              </div>
            </div>

            {/* Spiritual Practices Section */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">🙏 Spiritual Practices</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                <TabsTrigger 
                  value="gratitude" 
                  className="flex flex-col items-center space-y-2 data-[state=active]:bg-rose-500 data-[state=active]:text-white bg-rose-50 hover:bg-rose-100 transition-all duration-200 p-4 rounded-lg border border-rose-200"
                >
                  <Heart className="w-5 h-5" />
                  <span className="text-xs font-medium">Gratitude</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="blessings" 
                  className="flex flex-col items-center space-y-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white bg-blue-50 hover:bg-blue-100 transition-all duration-200 p-4 rounded-lg border border-blue-200"
                >
                  <Users className="w-5 h-5" />
                  <span className="text-xs font-medium">Blessings</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="kindness" 
                  className="flex flex-col items-center space-y-2 data-[state=active]:bg-pink-500 data-[state=active]:text-white bg-pink-50 hover:bg-pink-100 transition-all duration-200 p-4 rounded-lg border border-pink-200"
                >
                  <Smile className="w-5 h-5" />
                  <span className="text-xs font-medium">Kindness</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="forgiveness" 
                  className="flex flex-col items-center space-y-2 data-[state=active]:bg-green-500 data-[state=active]:text-white bg-green-50 hover:bg-green-100 transition-all duration-200 p-4 rounded-lg border border-green-200"
                >
                  <Wrench className="w-5 h-5" />
                  <span className="text-xs font-medium">Forgiveness</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="surrender" 
                  className="flex flex-col items-center space-y-2 data-[state=active]:bg-teal-500 data-[state=active]:text-white bg-teal-50 hover:bg-teal-100 transition-all duration-200 p-4 rounded-lg border border-teal-200"
                >
                  <Bird className="w-5 h-5" />
                  <span className="text-xs font-medium">Surrender</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="manifesting" 
                  className="flex flex-col items-center space-y-2 data-[state=active]:bg-violet-500 data-[state=active]:text-white bg-violet-50 hover:bg-violet-100 transition-all duration-200 p-4 rounded-lg border border-violet-200"
                >
                  <Sparkles className="w-5 h-5" />
                  <span className="text-xs font-medium">Manifesting</span>
                </TabsTrigger>
              </div>
            </div>

            {/* Tools & Settings Section */}
            <div>
              <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">⚙️ Tools & Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <TabsTrigger 
                  value="banishing" 
                  className="flex items-center space-x-3 data-[state=active]:bg-red-500 data-[state=active]:text-white bg-red-50 hover:bg-red-100 transition-all duration-200 justify-start p-4 rounded-lg border border-red-200"
                >
                  <Shield className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium">Clear Negativity</div>
                    <div className="text-xs text-gray-500 data-[state=active]:text-white/80">Release what no longer serves</div>
                  </div>
                </TabsTrigger>
                <TabsTrigger 
                  value="bless" 
                  className="flex items-center space-x-3 data-[state=active]:bg-rose-600 data-[state=active]:text-white bg-rose-50 hover:bg-rose-100 transition-all duration-200 justify-start p-4 rounded-lg border border-rose-200"
                >
                  <Gift className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium">Bless the Creator</div>
                    <div className="text-xs text-gray-500 data-[state=active]:text-white/80">Support this free app</div>
                  </div>
                </TabsTrigger>
                <TabsTrigger 
                  value="settings" 
                  className="flex items-center space-x-3 data-[state=active]:bg-gray-500 data-[state=active]:text-white bg-gray-50 hover:bg-gray-100 transition-all duration-200 justify-start p-4 rounded-lg border border-gray-200"
                >
                  <Settings className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium">Preferences</div>
                    <div className="text-xs text-gray-500 data-[state=active]:text-white/80">Customize your experience</div>
                  </div>
                </TabsTrigger>
                {!isPremium && (
                  <TabsTrigger 
                    value="upgrade" 
                    className="flex items-center space-x-3 data-[state=active]:bg-amber-500 data-[state=active]:text-white bg-gradient-to-br from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 transition-all duration-200 justify-start p-4 rounded-lg border-2 border-amber-300"
                  >
                    <Crown className="w-5 h-5 text-amber-600" />
                    <div className="text-left">
                      <div className="font-medium text-amber-700">Upgrade to Premium</div>
                      <div className="text-xs text-amber-600">Unlock master teachings</div>
                    </div>
                  </TabsTrigger>
                )}
              </div>
            </div>
          </TabsList>

          <TabsContent value="inspiration">
            <DailyInspiration />
          </TabsContent>
          
          <TabsContent value="gameoflife">
            {isPremium ? <GameOfLife /> : <PremiumLock featureName="The Game of Life - Florence Scovel Shinn Teachings" />}
          </TabsContent>
          
          <TabsContent value="neville">
            {isPremium ? <NevilleGoddard /> : <PremiumLock featureName="Neville Goddard - Complete Manifestation Teachings" />}
          </TabsContent>
          
          <TabsContent value="reminders">
            <NotificationSystem />
          </TabsContent>
          
          <TabsContent value="bless">
            <BlessTheCreator />
          </TabsContent>
          
          <TabsContent value="kindness">
            <KindnessPractice />
          </TabsContent>
          
          <TabsContent value="forgiveness">
            <ForgivenessPractice />
          </TabsContent>
          
          <TabsContent value="settings">
            <SpiritualSettings />
          </TabsContent>
          
          <TabsContent value="upgrade">
            <PremiumUpgrade />
          </TabsContent>
          
          <TabsContent value="gratitude">
            <GratitudeJournal />
          </TabsContent>
          
          <TabsContent value="blessings">
            <BlessingPractice />
          </TabsContent>
          
          <TabsContent value="manifesting">
            <ManifestingJournal />
          </TabsContent>
          
          <TabsContent value="surrender">
            <SurrenderPractice />
          </TabsContent>
          
          <TabsContent value="banishing">
            <BanishingPractice />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-white/50 backdrop-blur-lg border-t border-indigo-100 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">"Your friendly companion for spiritual growth and inner peace"</p>
            <p className="text-sm">✨ The Spiritual Manifesting Companion ✨</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <PremiumProvider>
      <SpiritualProvider>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />}>
                <Route index element={<Home />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </SpiritualProvider>
    </PremiumProvider>
  );
}

export default App;