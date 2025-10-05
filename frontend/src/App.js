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
import { Heart, Users, Sparkles, Bird, Shield } from "lucide-react";

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

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Tabs defaultValue="gratitude" className="w-full">
          <TabsList className="grid grid-cols-5 mb-8 bg-white/70 backdrop-blur-sm p-1 rounded-xl border border-indigo-100">
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
              <Dove className="w-4 h-4" />
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