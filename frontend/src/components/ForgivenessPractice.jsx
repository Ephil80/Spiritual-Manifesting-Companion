import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Plus, Heart, Calendar, Trash2 } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const ForgivenessPractice = () => {
  const [entries, setEntries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    person: '',
    situation: '',
    feelings: ''
  });

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/journals/forgiveness`);
      setEntries(response.data);
    } catch (error) {
      console.error('Error fetching forgiveness entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddForgiveness = async () => {
    if (formData.person.trim() && formData.situation.trim()) {
      try {
        const template = `I forgive ${formData.person} and release this resentment from my heart. I choose my emotional freedom over carrying this burden. This forgiveness is my gift to myself.`;
        const response = await axios.post(`${API_URL}/api/journals/forgiveness`, {
          ...formData,
          template
        });
        setEntries([response.data, ...entries]);
        setFormData({ person: '', situation: '', feelings: '' });
        setShowForm(false);
      } catch (error) {
        console.error('Error adding forgiveness entry:', error);
        alert('Failed to save forgiveness. Please try again.');
      }
    }
  };

  const handleDeleteEntry = async (entryId) => {
    if (window.confirm('Are you sure you want to delete this forgiveness entry?')) {
      try {
        await axios.delete(`${API_URL}/api/journals/forgiveness/${entryId}`);
        setEntries(entries.filter(entry => entry.id !== entryId));
      } catch (error) {
        console.error('Error deleting forgiveness entry:', error);
        alert('Failed to delete entry. Please try again.');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Heart className="w-6 h-6 text-green-500" />
          <h2 className="text-2xl font-semibold text-gray-800">Forgiveness Practice</h2>
        </div>
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="bg-green-500 hover:bg-green-600 text-white transition-all duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Forgive Someone
        </Button>
      </div>

      <div className="bg-green-50 p-6 rounded-lg border border-green-200">
        <h3 className="text-lg font-medium text-green-800 mb-2">Forgiveness: Your Emotional Plunger 🪠</h3>
        <p className="text-green-700 mb-3">
          Think of forgiveness as an <strong>emotional plunger</strong> - it clears out the toxic buildup of resentment, anger, 
          and hurt that's clogging your emotional well-being. This isn't about condoning what happened or letting someone off the hook. 
          It's about <strong>unclogging yourself</strong> so you can flow freely again.
        </p>
        <p className="text-green-700 mb-4">
          Forgiveness is one of the <strong>healthiest and most freeing things you can do for yourself</strong>. When you forgive, 
          you're not changing the past - you're releasing its grip on your present and future. You're the one carrying the burden 
          of unforgiveness, not them. Let it go and feel the liberation.
        </p>
        <div className="bg-white/70 p-4 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2">Why This Works:</h4>
          <ul className="text-green-700 space-y-1 text-sm">
            <li>• Clears toxic emotional blockages from your system</li>
            <li>• Frees up massive energy previously spent on resentment</li>
            <li>• Opens your heart to receive love and blessings again</li>
            <li>• Transforms you from victim to victor of your own life</li>
            <li>• One of the most powerful acts of self-love and healing</li>
          </ul>
        </div>
      </div>

      {showForm && (
        <Card className="border-green-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg text-green-700">Practice Forgiveness</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Who do you need to forgive?</label>
              <Input
                value={formData.person}
                onChange={(e) => setFormData({...formData, person: e.target.value})}
                placeholder="Person's name or description..."
                className="focus:ring-green-400 focus:border-green-400"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">What happened?</label>
              <Textarea
                value={formData.situation}
                onChange={(e) => setFormData({...formData, situation: e.target.value})}
                placeholder="Describe the situation..."
                className="min-h-[80px] focus:ring-green-400 focus:border-green-400"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">How has this affected you? (Optional)</label>
              <Textarea
                value={formData.feelings}
                onChange={(e) => setFormData({...formData, feelings: e.target.value})}
                placeholder="Express your feelings..."
                className="min-h-[60px] focus:ring-green-400 focus:border-green-400"
              />
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-700 font-medium mb-2">Forgiveness Declaration:</p>
              <p className="text-sm text-green-600 italic">
                "I forgive [person] and release this resentment from my heart. I choose my emotional freedom over carrying this burden. This forgiveness is my gift to myself."
              </p>
            </div>
            
            <div className="flex space-x-3">
              <Button 
                onClick={handleAddForgiveness}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                Choose Forgiveness
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowForm(false)}
                className="border-green-300 text-green-600 hover:bg-green-50"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading your forgiveness entries...</div>
        ) : entries.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No forgiveness entries yet. Start your healing journey today!</div>
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
                    className="text-gray-400 hover:text-green-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <p className="text-gray-800 font-semibold mb-2">{entry.person}</p>
                <p className="text-gray-600 text-sm mb-2"><strong>Situation:</strong> {entry.situation}</p>
                {entry.feelings && (
                  <p className="text-gray-600 text-sm mb-4"><strong>Impact:</strong> {entry.feelings}</p>
                )}
                
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg">
                  <p className="text-sm text-green-600 italic">"{entry.template}"</p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};