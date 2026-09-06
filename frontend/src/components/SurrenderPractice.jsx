import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Plus, Bird, Calendar, Trash2 } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const SurrenderPractice = () => {
  const [entries, setEntries] = useState([]);
  const [newSurrender, setNewSurrender] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/journals/surrender`);
      setEntries(response.data);
    } catch (error) {
      console.error('Error fetching surrender entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSurrender = async () => {
    if (newSurrender.trim()) {
      try {
        const template = `Letter to Divine Design: ${newSurrender}`;
        const response = await axios.post(`${API_URL}/api/journals/surrender`, {
          situation: newSurrender,
          template
        });
        setEntries([response.data, ...entries]);
        setNewSurrender('');
        setShowForm(false);
      } catch (error) {
        console.error('Error adding surrender entry:', error);
        alert('Failed to save surrender letter. Please try again.');
      }
    }
  };

  const handleDeleteEntry = async (entryId) => {
    if (window.confirm('Are you sure you want to delete this surrender letter?')) {
      try {
        await axios.delete(`${API_URL}/api/journals/surrender/${entryId}`);
        setEntries(entries.filter(entry => entry.id !== entryId));
      } catch (error) {
        console.error('Error deleting surrender entry:', error);
        alert('Failed to delete letter. Please try again.');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bird className="w-6 h-6 text-teal-500" />
          <h2 className="text-2xl font-semibold text-gray-800">Surrender Practice</h2>
        </div>
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="bg-teal-500 hover:bg-teal-600 text-white transition-all duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Surrender to Divine
        </Button>
      </div>

      <div className="bg-teal-50 p-6 rounded-lg border border-teal-200">
        <h3 className="text-lg font-medium text-teal-800 mb-2">About Surrender & Writing to Divine Design</h3>
        <p className="text-teal-700 mb-4">
          Here's something beautiful: The Divine Design for your life is better than you could ever imagine or create yourself. 
          Each of us has our own unique blueprint - like our own unique fingerprint - perfectly crafted for our highest joy and purpose.
        </p>
        <p className="text-teal-700 mb-4">
          The reason we often don't experience this perfection is simple: we were given free will, and the divine can't go against that. 
          So our ego creates its own plan, thinking it knows what will bring us everything we want. But our ego's plan is often imperfect and limited.
        </p>
        <p className="text-teal-700 mb-4">
          To manifest our Divine Design, we must surrender to it. Writing a heartfelt letter is the most effective way to do this - 
          pour out your struggles, your efforts, your feelings, then completely release control to Divine wisdom.
        </p>
        <div className="bg-white/70 p-4 rounded-lg">
          <p className="text-teal-800 font-semibold mb-2">✨ Why This Works So Powerfully:</p>
          <p className="text-teal-700 text-sm italic">
            When you truly surrender through letter writing, miracles usually happen within days - sometimes even hours. 
            Your Divine Design gets activated when you give permission through surrender.
          </p>
        </div>
      </div>

      {showForm && (
        <Card className="border-teal-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg text-teal-700">Write Your Surrender Letter to Divine Design</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">
                Pour your heart out. Explain your situation, what you've tried, how you feel, and then surrender it completely.
              </p>
              <Textarea
                value={newSurrender}
                onChange={(e) => setNewSurrender(e.target.value)}
                placeholder="Dear Divine Design, I am struggling with..."
                className="min-h-[200px] focus:ring-teal-400 focus:border-teal-400"
              />
            </div>
            
            <div className="bg-teal-50 p-4 rounded-lg">
              <p className="text-sm text-teal-700 font-medium mb-2">Example Format:</p>
              <p className="text-sm text-teal-600 italic">
                "Dear Divine Design, I am struggling with [situation]. I've tried [actions taken], but I feel [emotions]. 
                I surrender this situation to you completely, trusting that you know what's best for my highest good."
              </p>
            </div>
            
            <div className="flex space-x-3">
              <Button 
                onClick={handleAddSurrender}
                className="bg-teal-500 hover:bg-teal-600 text-white"
              >
                Complete Surrender
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowForm(false)}
                className="border-teal-300 text-teal-600 hover:bg-teal-50"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading your surrender letters...</div>
        ) : entries.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No surrender letters yet. Write your first letter to Divine Design!</div>
        ) : (
          entries.map((entry) => (
            <Card key={entry.id} className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">{new Date(entry.date).toLocaleDateString()}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteEntry(entry.id)}
                    className="text-gray-400 hover:text-teal-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-4 rounded-lg">
                  <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{entry.situation}</p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};