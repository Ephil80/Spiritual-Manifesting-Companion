import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Plus, Smile, Calendar, Trash2, Sparkles } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const KindnessPractice = () => {
  const [entries, setEntries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    recipient: '',
    action: ''
  });

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/journals/kindness`);
      setEntries(response.data);
    } catch (error) {
      console.error('Error fetching kindness entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddKindness = async () => {
    if (formData.recipient.trim() && formData.action.trim()) {
      try {
        const template = `I gave kindness to ${formData.recipient} without expectation of return. I trust the universe to multiply this love.`;
        const response = await axios.post(`${API_URL}/api/journals/kindness`, {
          ...formData,
          template
        });
        setEntries([response.data, ...entries]);
        setFormData({ recipient: '', action: '' });
        setShowForm(false);
      } catch (error) {
        console.error('Error adding kindness entry:', error);
        alert('Failed to save kindness entry. Please try again.');
      }
    }
  };

  const handleDeleteEntry = async (entryId) => {
    if (window.confirm('Are you sure you want to delete this kindness entry?')) {
      try {
        await axios.delete(`${API_URL}/api/journals/kindness/${entryId}`);
        setEntries(entries.filter(entry => entry.id !== entryId));
      } catch (error) {
        console.error('Error deleting kindness entry:', error);
        alert('Failed to delete entry. Please try again.');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Smile className="w-6 h-6 text-pink-500" />
          <h2 className="text-2xl font-semibold text-gray-800">Kindness Practice</h2>
        </div>
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="bg-pink-500 hover:bg-pink-600 text-white transition-all duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Log Kindness
        </Button>
      </div>

      <div className="bg-pink-50 p-6 rounded-lg border border-pink-200">
        <h3 className="text-lg font-medium text-pink-800 mb-2">Random Acts of Kindness</h3>
        <p className="text-pink-700 mb-4">
          When you give kindness without expecting anything in return, you activate the divine law of circulation. 
          What you give freely comes back multiplied in unexpected and beautiful ways.
        </p>
        <div className="bg-white/70 p-4 rounded-lg">
          <h4 className="font-semibold text-pink-800 mb-2">Daily Benefits:</h4>
          <ul className="text-pink-700 space-y-1 text-sm">
            <li>• Activates the universal law of giving and receiving</li>
            <li>• Releases ego's need for recognition or return</li>
            <li>• Creates positive karma and divine favor</li>
            <li>• Expands your heart's capacity for unconditional love</li>
            <li>• Attracts unexpected blessings into your life</li>
          </ul>
        </div>
      </div>

      {showForm && (
        <Card className="border-pink-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg text-pink-700">Record Your Act of Kindness</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Who did you help?</label>
              <Input
                value={formData.recipient}
                onChange={(e) => setFormData({...formData, recipient: e.target.value})}
                placeholder="e.g., A stranger at the store, My neighbor..."
                className="focus:ring-pink-400 focus:border-pink-400"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">What did you do?</label>
              <Textarea
                value={formData.action}
                onChange={(e) => setFormData({...formData, action: e.target.value})}
                placeholder="Describe your act of kindness..."
                className="min-h-[80px] focus:ring-pink-400 focus:border-pink-400"
              />
            </div>
            
            <div className="bg-pink-50 p-4 rounded-lg">
              <p className="text-sm text-pink-700 font-medium mb-2">Kindness Affirmation:</p>
              <p className="text-sm text-pink-600 italic">
                "I gave kindness to [recipient] without expectation of return. I trust the universe to multiply this love."
              </p>
            </div>
            
            <div className="flex space-x-3">
              <Button 
                onClick={handleAddKindness}
                className="bg-pink-500 hover:bg-pink-600 text-white"
              >
                Save Kindness
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowForm(false)}
                className="border-pink-300 text-pink-600 hover:bg-pink-50"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading your kindness entries...</div>
        ) : entries.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No kindness entries yet. Start spreading kindness today!</div>
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
                    className="text-gray-400 hover:text-pink-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex items-start space-x-2 mb-3">
                  <Sparkles className="w-5 h-5 text-pink-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-800 font-medium mb-1">{entry.recipient}</p>
                    <p className="text-gray-600 text-sm">{entry.action}</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-3 rounded-lg">
                  <p className="text-sm text-pink-600 italic">"{entry.template}"</p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};