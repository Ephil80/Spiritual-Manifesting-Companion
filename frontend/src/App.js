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
          {/* Clean Two-Row Navigation */}
          <div className="mb-8 space-y-4">
            {/* Row 1: Daily Support & Main Practices */}
            <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-indigo-100">
              <TabsList className="grid grid-cols-4 md:grid-cols-8 bg-transparent gap-2">
                <TabsTrigger value="inspiration" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white hover:bg-amber-50 p-3 rounded-lg border border-amber-200">
                  <Lightbulb className="w-4 h-4 md:mr-2" />
                  <span className="hidden md:inline">Inspiration</span>
                </TabsTrigger>
                <TabsTrigger value="reminders" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white hover:bg-indigo-50 p-3 rounded-lg border border-indigo-200">
                  <Bell className="w-4 h-4 md:mr-2" />
                  <span className="hidden md:inline">Reminders</span>
                </TabsTrigger>
                <TabsTrigger value="gratitude" className="data-[state=active]:bg-rose-500 data-[state=active]:text-white hover:bg-rose-50 p-3 rounded-lg border border-rose-200">
                  <Heart className="w-4 h-4 md:mr-2" />
                  <span className="hidden md:inline">Gratitude</span>
                </TabsTrigger>
                <TabsTrigger value="blessings" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white hover:bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <Users className="w-4 h-4 md:mr-2" />
                  <span className="hidden md:inline">Blessings</span>
                </TabsTrigger>
                <TabsTrigger value="kindness" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white hover:bg-pink-50 p-3 rounded-lg border border-pink-200">
                  <Smile className="w-4 h-4 md:mr-2" />
                  <span className="hidden md:inline">Kindness</span>
                </TabsTrigger>
                <TabsTrigger value="forgiveness" className="data-[state=active]:bg-green-500 data-[state=active]:text-white hover:bg-green-50 p-3 rounded-lg border border-green-200">
                  <Wrench className="w-4 h-4 md:mr-2" />
                  <span className="hidden md:inline">Forgiveness</span>
                </TabsTrigger>
                <TabsTrigger value="surrender" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white hover:bg-teal-50 p-3 rounded-lg border border-teal-200">
                  <Bird className="w-4 h-4 md:mr-2" />
                  <span className="hidden md:inline">Surrender</span>
                </TabsTrigger>
                <TabsTrigger value="manifesting" className="data-[state=active]:bg-violet-500 data-[state=active]:text-white hover:bg-violet-50 p-3 rounded-lg border border-violet-200">
                  <Sparkles className="w-4 h-4 md:mr-2" />
                  <span className="hidden md:inline">Manifesting</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Row 2: Advanced Tools */}
            <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-gray-100">
              <TabsList className="grid grid-cols-3 bg-transparent gap-2">
                <TabsTrigger value="banishing" className="data-[state=active]:bg-red-500 data-[state=active]:text-white hover:bg-red-50 p-3 rounded-lg border border-red-200 flex items-center justify-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span className="font-medium">Clear Negativity</span>
                </TabsTrigger>
                <TabsTrigger value="bless" className="data-[state=active]:bg-rose-600 data-[state=active]:text-white hover:bg-rose-50 p-3 rounded-lg border border-rose-200 flex items-center justify-center space-x-2">
                  <Gift className="w-4 h-4" />
                  <span className="font-medium">Bless the Creator</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="data-[state=active]:bg-gray-500 data-[state=active]:text-white hover:bg-gray-50 p-3 rounded-lg border border-gray-200 flex items-center justify-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span className="font-medium">Preferences</span>
                </TabsTrigger>
              </TabsList>
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