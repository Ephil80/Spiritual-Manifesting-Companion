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
import { Heart, Users, Sparkles, Bird, Shield, Lightbulb, Bell, Gift, Wrench, Settings, Smile } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const { getSpiritualText } = useSpiritualSettings();
  
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
          {/* Organized Navigation with Section Headers */}
          <div className="mb-8 bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-indigo-100 shadow-lg">
            
            {/* Section Headers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <h3 className="text-sm font-bold text-amber-600 mb-1 uppercase tracking-wider">📚 Daily Support</h3>
                <p className="text-xs text-gray-500">Inspiration & reminders</p>
              </div>
              <div className="text-center">
                <h3 className="text-sm font-bold text-purple-600 mb-1 uppercase tracking-wider">🙏 Spiritual Practices</h3>
                <p className="text-xs text-gray-500">Core practices for growth</p>
              </div>
              <div className="text-center">
                <h3 className="text-sm font-bold text-gray-600 mb-1 uppercase tracking-wider">⚙️ Tools & Support</h3>
                <p className="text-xs text-gray-500">Advanced tools & preferences</p>
              </div>
            </div>

            {/* Single TabsList with visual organization */}
            <TabsList className="grid grid-cols-2 md:grid-cols-11 bg-white/50 p-2 rounded-xl gap-1">
              {/* Daily Support (2) */}
              <TabsTrigger value="inspiration" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white flex flex-col items-center p-2">
                <Lightbulb className="w-4 h-4 mb-1" />
                <span className="text-xs hidden md:block">Inspiration</span>
              </TabsTrigger>
              <TabsTrigger value="reminders" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white flex flex-col items-center p-2">
                <Bell className="w-4 h-4 mb-1" />
                <span className="text-xs hidden md:block">Reminders</span>
              </TabsTrigger>
              
              {/* Core Practices (6) */}
              <TabsTrigger value="gratitude" className="data-[state=active]:bg-rose-500 data-[state=active]:text-white flex flex-col items-center p-2">
                <Heart className="w-4 h-4 mb-1" />
                <span className="text-xs hidden md:block">Gratitude</span>
              </TabsTrigger>
              <TabsTrigger value="blessings" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white flex flex-col items-center p-2">
                <Users className="w-4 h-4 mb-1" />
                <span className="text-xs hidden md:block">Blessings</span>
              </TabsTrigger>
              <TabsTrigger value="kindness" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white flex flex-col items-center p-2">
                <Smile className="w-4 h-4 mb-1" />
                <span className="text-xs hidden md:block">Kindness</span>
              </TabsTrigger>
              <TabsTrigger value="forgiveness" className="data-[state=active]:bg-green-500 data-[state=active]:text-white flex flex-col items-center p-2">
                <Wrench className="w-4 h-4 mb-1" />
                <span className="text-xs hidden md:block">Forgiveness</span>
              </TabsTrigger>
              <TabsTrigger value="surrender" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white flex flex-col items-center p-2">
                <Bird className="w-4 h-4 mb-1" />
                <span className="text-xs hidden md:block">Surrender</span>
              </TabsTrigger>
              <TabsTrigger value="manifesting" className="data-[state=active]:bg-violet-500 data-[state=active]:text-white flex flex-col items-center p-2">
                <Sparkles className="w-4 h-4 mb-1" />
                <span className="text-xs hidden md:block">Manifesting</span>
              </TabsTrigger>
              
              {/* Tools & Support (3) */}
              <TabsTrigger value="banishing" className="data-[state=active]:bg-red-500 data-[state=active]:text-white flex flex-col items-center p-2">
                <Shield className="w-4 h-4 mb-1" />
                <span className="text-xs hidden md:block">Clear</span>
              </TabsTrigger>
              <TabsTrigger value="bless" className="data-[state=active]:bg-rose-600 data-[state=active]:text-white flex flex-col items-center p-2">
                <Gift className="w-4 h-4 mb-1" />
                <span className="text-xs hidden md:block">Bless</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-gray-500 data-[state=active]:text-white flex flex-col items-center p-2">
                <Settings className="w-4 h-4 mb-1" />
                <span className="text-xs hidden md:block">Settings</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="inspiration">
            <DailyInspiration />
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
  );
}

export default App;