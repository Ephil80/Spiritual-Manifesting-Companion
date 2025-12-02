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
        <Tabs defaultValue="gratitude" className="w-full">
          {/* Card-Based Navigation Layout */}
          <div className="mb-8 space-y-6">
            {/* Main Practices Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <TabsTrigger 
                value="gratitude" 
                className="h-32 bg-rose-100 hover:bg-rose-200 data-[state=active]:bg-rose-400 data-[state=active]:text-white border-2 border-rose-200 rounded-2xl transition-all duration-200 flex flex-col items-center justify-center space-y-2 cursor-pointer"
              >
                <Heart className="w-8 h-8 text-rose-600 data-[state=active]:text-white" />
                <span className="font-semibold text-rose-700 data-[state=active]:text-white">Gratitude</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="blessings" 
                className="h-32 bg-blue-100 hover:bg-blue-200 data-[state=active]:bg-blue-400 data-[state=active]:text-white border-2 border-blue-200 rounded-2xl transition-all duration-200 flex flex-col items-center justify-center space-y-2 cursor-pointer"
              >
                <Users className="w-8 h-8 text-blue-600 data-[state=active]:text-white" />
                <span className="font-semibold text-blue-700 data-[state=active]:text-white">Blessings</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="kindness" 
                className="h-32 bg-pink-100 hover:bg-pink-200 data-[state=active]:bg-pink-400 data-[state=active]:text-white border-2 border-pink-200 rounded-2xl transition-all duration-200 flex flex-col items-center justify-center space-y-2 cursor-pointer"
              >
                <Smile className="w-8 h-8 text-pink-600 data-[state=active]:text-white" />
                <span className="font-semibold text-pink-700 data-[state=active]:text-white">Kindness</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="forgiveness" 
                className="h-32 bg-green-100 hover:bg-green-200 data-[state=active]:bg-green-400 data-[state=active]:text-white border-2 border-green-200 rounded-2xl transition-all duration-200 flex flex-col items-center justify-center space-y-2 cursor-pointer"
              >
                <Wrench className="w-8 h-8 text-green-600 data-[state=active]:text-white" />
                <span className="font-semibold text-green-700 data-[state=active]:text-white">Forgiveness</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="surrender" 
                className="h-32 bg-teal-100 hover:bg-teal-200 data-[state=active]:bg-teal-400 data-[state=active]:text-white border-2 border-teal-200 rounded-2xl transition-all duration-200 flex flex-col items-center justify-center space-y-2 cursor-pointer"
              >
                <Bird className="w-8 h-8 text-teal-600 data-[state=active]:text-white" />
                <span className="font-semibold text-teal-700 data-[state=active]:text-white">Surrender</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="manifesting" 
                className="h-32 bg-violet-100 hover:bg-violet-200 data-[state=active]:bg-violet-400 data-[state=active]:text-white border-2 border-violet-200 rounded-2xl transition-all duration-200 flex flex-col items-center justify-center space-y-2 cursor-pointer"
              >
                <Sparkles className="w-8 h-8 text-violet-600 data-[state=active]:text-white" />
                <span className="font-semibold text-violet-700 data-[state=active]:text-white">Manifesting</span>
              </TabsTrigger>
            </div>

            {/* Tools & Settings Section */}
            <div className="border-t pt-6">
              <div className="flex items-center justify-center space-x-8">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Settings className="w-5 h-5" />
                  <span className="font-medium">TOOLS & SETTINGS</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <TabsTrigger 
                  value="inspiration" 
                  className="h-20 bg-amber-50 hover:bg-amber-100 data-[state=active]:bg-amber-400 data-[state=active]:text-white border border-amber-200 rounded-xl flex flex-col items-center justify-center space-y-1 cursor-pointer"
                >
                  <Lightbulb className="w-5 h-5 text-amber-600 data-[state=active]:text-white" />
                  <span className="text-sm font-medium text-amber-700 data-[state=active]:text-white">Inspiration</span>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="reminders" 
                  className="h-20 bg-indigo-50 hover:bg-indigo-100 data-[state=active]:bg-indigo-400 data-[state=active]:text-white border border-indigo-200 rounded-xl flex flex-col items-center justify-center space-y-1 cursor-pointer"
                >
                  <Bell className="w-5 h-5 text-indigo-600 data-[state=active]:text-white" />
                  <span className="text-sm font-medium text-indigo-700 data-[state=active]:text-white">Reminders</span>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="banishing" 
                  className="h-20 bg-red-50 hover:bg-red-100 data-[state=active]:bg-red-400 data-[state=active]:text-white border border-red-200 rounded-xl flex flex-col items-center justify-center space-y-1 cursor-pointer"
                >
                  <Shield className="w-5 h-5 text-red-600 data-[state=active]:text-white" />
                  <span className="text-sm font-medium text-red-700 data-[state=active]:text-white">Clear</span>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="bless" 
                  className="h-20 bg-rose-50 hover:bg-rose-100 data-[state=active]:bg-rose-400 data-[state=active]:text-white border border-rose-200 rounded-xl flex flex-col items-center justify-center space-y-1 cursor-pointer"
                >
                  <Gift className="w-5 h-5 text-rose-600 data-[state=active]:text-white" />
                  <span className="text-sm font-medium text-rose-700 data-[state=active]:text-white">Bless Creator</span>
                </TabsTrigger>
              </div>
              
              <div className="flex justify-center mt-4">
                <TabsTrigger 
                  value="settings" 
                  className="h-16 px-8 bg-gray-50 hover:bg-gray-100 data-[state=active]:bg-gray-400 data-[state=active]:text-white border border-gray-200 rounded-xl flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Settings className="w-5 h-5 text-gray-600 data-[state=active]:text-white" />
                  <span className="font-medium text-gray-700 data-[state=active]:text-white">Preferences</span>
                </TabsTrigger>
              </div>
            </div>
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