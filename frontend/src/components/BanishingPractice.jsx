import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Plus, Shield, Trash2, CheckCircle2, Circle } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const BanishingPractice = () => {
  const [entries, setEntries] = useState([]);
  const [newNegative, setNewNegative] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/journals/banishing`);
      setEntries(response.data);
    } catch (error) {
      console.error('Error fetching banishing entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBanishing = async () => {
    if (newNegative.trim()) {
      try {
        const template = `I release and banish ${newNegative}, under grace in a perfect way in harmony with all in accordance with the divine design ✨`;
        const response = await axios.post(`${API_URL}/api/journals/banishing`, {
          negative: newNegative,
          template
        });
        setEntries([response.data, ...entries]);
        setNewNegative('');
        setShowForm(false);
      } catch (error) {
        console.error('Error adding banishing entry:', error);
        alert('Failed to save banishing. Please try again.');
      }
    }
  };

  const handleToggleBanishing = async (entryId, currentStatus) => {
    try {
      const response = await axios.patch(`${API_URL}/api/journals/banishing/${entryId}`, {
        banished: !currentStatus
      });
      setEntries(entries.map(entry => 
        entry.id === entryId ? response.data : entry
      ));
    } catch (error) {
      console.error('Error updating banishing entry:', error);
      alert('Failed to update entry. Please try again.');
    }
  };

  const handleDeleteEntry = async (entryId) => {
    if (window.confirm('Are you sure you want to delete this banishing?')) {
      try {
        await axios.delete(`${API_URL}/api/journals/banishing/${entryId}`);
        setEntries(entries.filter(entry => entry.id !== entryId));
      } catch (error) {
        console.error('Error deleting banishing entry:', error);
        alert('Failed to delete entry. Please try again.');
      }
    }
  };

  // Separate banished and pending
  const pendingEntries = entries.filter(e => !e.banished);
  const banishedEntries = entries.filter(e => e.banished);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="w-6 h-6 text-red-500" />
          <h2 className="text-2xl font-semibold text-gray-800">Clear Negativity</h2>
        </div>
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="bg-red-500 hover:bg-red-600 text-white transition-all duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Release Negativity
        </Button>
      </div>

      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
        <p className="text-red-700 text-sm">
          🛱️ <strong>Release what no longer serves you!</strong> Write what you want to banish, then check it off when you feel it's cleared.
        </p>
      </div>

      {showForm && (
        <Card className="border-red-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg text-red-700">What Do You Want to Release?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">What would you like to release?</label>
              <Input
                value={newNegative}
                onChange={(e) => setNewNegative(e.target.value)}
                placeholder="e.g., Fear of failure, Negative thoughts, Self-doubt..."
                className="focus:ring-red-400 focus:border-red-400"
              />
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-sm text-red-700 font-medium mb-2">✨ The app will automatically format it as:</p>
              <p className="text-sm text-red-600 italic">
                "I release and banish [what you entered], under grace in a perfect way in harmony with all in accordance with the divine design ✨"
              </p>
            </div>
            
            <div className="flex space-x-3">
              <Button 
                onClick={handleAddBanishing}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Add to List
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowForm(false)}
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pending Banishings */}
      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading your banishings...</div>
      ) : (
        <>
          {pendingEntries.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-red-600 flex items-center gap-2">
                <Circle className="w-5 h-5" />
                Working On ({pendingEntries.length})
              </h3>
              {pendingEntries.map((entry) => (
                <Card key={entry.id} className="hover:shadow-md transition-all duration-200 border-red-100">
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => handleToggleBanishing(entry.id, entry.banished)}
                        className="mt-1 text-gray-300 hover:text-red-500 transition-colors flex-shrink-0"
                      >
                        <Circle className="w-6 h-6" />
                      </button>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-400">{new Date(entry.date).toLocaleDateString()}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteEntry(entry.id)}
                            className="text-gray-400 hover:text-red-600 h-8 w-8 p-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <p className="text-gray-800 leading-relaxed">
                          <span className="font-semibold">I release and banish</span> {entry.negative}, <span className="italic text-gray-600">under grace in a perfect way in harmony with all in accordance with the divine design</span> ✨
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Banished Items */}
          {banishedEntries.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-green-600 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Successfully Released! 🎉 ({banishedEntries.length})
              </h3>
              {banishedEntries.map((entry) => (
                <Card key={entry.id} className="hover:shadow-md transition-all duration-200 border-green-100 bg-green-50/30">
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => handleToggleBanishing(entry.id, entry.banished)}
                        className="mt-1 text-green-500 hover:text-gray-400 transition-colors flex-shrink-0"
                      >
                        <CheckCircle2 className="w-6 h-6" />
                      </button>
                      
                      <div className="flex-1 opacity-75">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-400">{new Date(entry.date).toLocaleDateString()}</span>
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
                          <span className="font-semibold">I released and banished</span> {entry.negative} ✨
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {pendingEntries.length === 0 && banishedEntries.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Shield className="w-12 h-12 mx-auto mb-3 text-red-300" />
              <p>No negativity to clear. You're doing great!</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};