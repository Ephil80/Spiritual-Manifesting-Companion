import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus, Sparkles, Calendar, Trash2, CheckCircle2, Circle } from 'lucide-react';
import { categories } from '../mock';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const ManifestingJournal = () => {
  const [entries, setEntries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    category: '',
    desire: ''
  });

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/journals/manifesting`);
      setEntries(response.data);
    } catch (error) {
      console.error('Error fetching manifesting entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddManifestation = async () => {
    if (formData.desire.trim() && formData.category) {
      try {
        const template = `I desire ${formData.desire}, this or something better, under grace in a perfect way in harmony with all in accordance with the divine design ✨`;
        const response = await axios.post(`${API_URL}/api/journals/manifesting`, {
          ...formData,
          template
        });
        setEntries([response.data, ...entries]);
        setFormData({ category: '', desire: '' });
        setShowForm(false);
      } catch (error) {
        console.error('Error adding manifesting entry:', error);
        alert('Failed to save entry. Please try again.');
      }
    }
  };

  const handleToggleManifestation = async (entryId, currentStatus) => {
    try {
      const response = await axios.patch(`${API_URL}/api/journals/manifesting/${entryId}`, {
        manifested: !currentStatus
      });
      setEntries(entries.map(entry => 
        entry.id === entryId ? response.data : entry
      ));
    } catch (error) {
      console.error('Error updating manifesting entry:', error);
      alert('Failed to update entry. Please try again.');
    }
  };

  const handleDeleteEntry = async (entryId) => {
    if (window.confirm('Are you sure you want to delete this manifestation?')) {
      try {
        await axios.delete(`${API_URL}/api/journals/manifesting/${entryId}`);
        setEntries(entries.filter(entry => entry.id !== entryId));
      } catch (error) {
        console.error('Error deleting manifesting entry:', error);
        alert('Failed to delete entry. Please try again.');
      }
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      health: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      finances: 'bg-amber-50 text-amber-700 border-amber-200',
      goals: 'bg-violet-50 text-violet-700 border-violet-200',
      relationships: 'bg-pink-50 text-pink-700 border-pink-200',
      career: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    };
    return colors[category] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  // Separate manifested and pending
  const pendingEntries = entries.filter(e => !e.manifested);
  const manifestedEntries = entries.filter(e => e.manifested);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-6 h-6 text-violet-500" />
          <h2 className="text-2xl font-semibold text-gray-800">Manifesting List</h2>
        </div>
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="bg-violet-500 hover:bg-violet-600 text-white transition-all duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Desire
        </Button>
      </div>

      <div className="bg-violet-50 p-4 rounded-lg border border-violet-200">
        <p className="text-violet-700 text-sm">
          ✨ <strong>Track your manifestations!</strong> Add what you desire, and check it off when it manifests. 
          The universe is working in your favor.
        </p>
      </div>

      {showForm && (
        <Card className="border-violet-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg text-violet-700">What Do You Desire?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
              <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                <SelectTrigger className="focus:ring-violet-400 focus:border-violet-400">
                  <SelectValue placeholder="Choose category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.manifesting.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Your Desire</label>
              <Input
                value={formData.desire}
                onChange={(e) => setFormData({...formData, desire: e.target.value})}
                placeholder="What do you wish to manifest?"
                className="focus:ring-violet-400 focus:border-violet-400"
              />
            </div>
            
            <div className="bg-violet-50 p-4 rounded-lg">
              <p className="text-sm text-violet-700 font-medium mb-2">✨ The app will automatically format it as:</p>
              <p className="text-sm text-violet-600 italic">
                "I desire [your desire], this or something better, under grace in a perfect way in harmony with all in accordance with the divine design ✨"
              </p>
            </div>
            
            <div className="flex space-x-3">
              <Button 
                onClick={handleAddManifestation}
                className="bg-violet-500 hover:bg-violet-600 text-white"
              >
                Add to List
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowForm(false)}
                className="border-violet-300 text-violet-600 hover:bg-violet-50"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pending Manifestations */}
      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading your manifestations...</div>
      ) : (
        <>
          {pendingEntries.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-violet-700 flex items-center gap-2">
                <Circle className="w-5 h-5" />
                Active Desires ({pendingEntries.length})
              </h3>
              {pendingEntries.map((entry) => (
                <Card key={entry.id} className="hover:shadow-md transition-all duration-200 border-violet-100">
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => handleToggleManifestation(entry.id, entry.manifested)}
                        className="mt-1 text-gray-300 hover:text-violet-500 transition-colors flex-shrink-0"
                      >
                        <Circle className="w-6 h-6" />
                      </button>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(entry.category)}`}>
                              {entry.category}
                            </span>
                            <span className="text-xs text-gray-400">{new Date(entry.date).toLocaleDateString()}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteEntry(entry.id)}
                            className="text-gray-400 hover:text-violet-600 h-8 w-8 p-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <p className="text-gray-800 leading-relaxed">
                          <span className="font-semibold">I desire</span> {entry.desire}, this or something better, <span className="italic text-gray-600">under grace in a perfect way in harmony with all in accordance with the divine design</span> ✨
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Manifested Items */}
          {manifestedEntries.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-green-600 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Manifested! 🎉 ({manifestedEntries.length})
              </h3>
              {manifestedEntries.map((entry) => (
                <Card key={entry.id} className="hover:shadow-md transition-all duration-200 border-green-100 bg-green-50/30">
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => handleToggleManifestation(entry.id, entry.manifested)}
                        className="mt-1 text-green-500 hover:text-gray-400 transition-colors flex-shrink-0"
                      >
                        <CheckCircle2 className="w-6 h-6" />
                      </button>
                      
                      <div className="flex-1 opacity-75">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(entry.category)}`}>
                              {entry.category}
                            </span>
                            <span className="text-xs text-gray-400">{new Date(entry.date).toLocaleDateString()}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteEntry(entry.id)}
                            className="text-gray-400 hover:text-red-600 h-8 w-8 p-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <p className="text-gray-700 leading-relaxed line-through decoration-green-500">
                          <span className="font-semibold">I desired</span> {entry.desire} ✨
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {pendingEntries.length === 0 && manifestedEntries.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Sparkles className="w-12 h-12 mx-auto mb-3 text-violet-300" />
              <p>No desires yet. Start manifesting your dreams!</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};