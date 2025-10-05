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
import { Heart, Users, Sparkles, Bird, Shield, Lightbulb } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
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
              ✨ The Divine Design
            </h1>
            <p className="text-lg text-gray-600 mt-2">Spiritual Manifesting Companion</p>
          </div>
        </div>
      </header>

      {/* Philosophy Section */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-8 rounded-2xl border border-indigo-100 mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Understanding the Divine Design</h2>
            <div className="max-w-4xl mx-auto text-gray-700 space-y-4">
              <p className="text-lg leading-relaxed">
                Everything in the universe has a <span className="font-semibold text-indigo-700">Divine Design</span> - and we are no different. 
                Each of us has a unique divine blueprint for our highest good and greatest joy.
              </p>
              <p className="text-lg leading-relaxed">
                The challenge arises when our <span className="font-semibold text-red-600">ego</span> (Edging God Out) decides it knows better than this divine wisdom. 
                The Divine Design honors our free will and cannot override our choices, even when they lead us away from our highest path.
              </p>
              <p className="text-lg leading-relaxed">
                When we align with the Divine Design through <span className="font-semibold text-purple-600">gratitude, blessings, surrender, and conscious manifestation</span>, 
                we open ourselves to divine guidance and allow our highest good to unfold naturally.
              </p>
              <div className="bg-white/80 p-4 rounded-lg mt-6">
                <p className="text-indigo-800 italic font-medium">
                  "Trust the Divine Design. Your ego may think it knows the way, but your soul knows the truth."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Tabs defaultValue="inspiration" className="w-full">
          <TabsList className="grid grid-cols-6 mb-8 bg-white/70 backdrop-blur-sm p-1 rounded-xl border border-indigo-100">
            <TabsTrigger 
              value="inspiration" 
              className="flex items-center space-x-2 data-[state=active]:bg-amber-500 data-[state=active]:text-white transition-all duration-200"
            >
              <Lightbulb className="w-4 h-4" />
              <span className="hidden sm:inline">Inspiration</span>
            </TabsTrigger>
            <TabsTrigger 
              value="gratitude" 
              className="flex items-center space-x-2 data-[state=active]:bg-rose-500 data-[state=active]:text-white transition-all duration-200"
            >
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">Gratitude</span>
            </TabsTrigger>
            <TabsTrigger 
              value="blessings" 
              className="flex items-center space-x-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-all duration-200"
            >
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Blessings</span>
            </TabsTrigger>
            <TabsTrigger 
              value="manifesting" 
              className="flex items-center space-x-2 data-[state=active]:bg-violet-500 data-[state=active]:text-white transition-all duration-200"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Manifesting</span>
            </TabsTrigger>
            <TabsTrigger 
              value="surrender" 
              className="flex items-center space-x-2 data-[state=active]:bg-teal-500 data-[state=active]:text-white transition-all duration-200"
            >
              <Bird className="w-4 h-4" />
              <span className="hidden sm:inline">Surrender</span>
            </TabsTrigger>
            <TabsTrigger 
              value="banishing" 
              className="flex items-center space-x-2 data-[state=active]:bg-red-500 data-[state=active]:text-white transition-all duration-200"
            >
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Banishing</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="inspiration">
            <DailyInspiration />
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
            <p className="mb-2">"In harmony with all under grace in a perfect way"</p>
            <p className="text-sm">✨ Divine Design Spiritual Companion ✨</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;