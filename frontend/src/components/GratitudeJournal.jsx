import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Plus, Heart, Calendar, Trash2, Send, Target, Sparkles, TrendingUp } from 'lucide-react';
import { useSpiritualSettings } from '../contexts/SpiritualContext';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const DAILY_GRATITUDE_GOAL = 3;

export const GratitudeJournal = () => {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState('');
  const [loading, setLoading] = useState(true);
  const { getSpiritualText } = useSpiritualSettings();

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/journals/gratitude`);
      setEntries(response.data);
    } catch (error) {
      console.error('Error fetching gratitude entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEntry = async () => {
    if (newEntry.trim()) {
      try {
        const response = await axios.post(`${API_URL}/api/journals/gratitude`, {
          content: newEntry,
          template: getSpiritualText.gratitudeTemplate(newEntry)
        });
        setEntries([response.data, ...entries]);
        setNewEntry('');
      } catch (error) {
        console.error('Error adding gratitude entry:', error);
        alert('Failed to save entry. Please try again.');
      }
    }
  };

  const handleDeleteEntry = async (entryId) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await axios.delete(`${API_URL}/api/journals/gratitude/${entryId}`);
        setEntries(entries.filter(entry => entry.id !== entryId));
      } catch (error) {
        console.error('Error deleting gratitude entry:', error);
        alert('Failed to delete entry. Please try again.');
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddEntry();
    }
  };

  // Get today's entries
  const today = new Date().toISOString().split('T')[0];
  const todayEntries = entries.filter(e => e.date === today);
  const todayCount = todayEntries.length;
  const goalProgress = Math.min((todayCount / DAILY_GRATITUDE_GOAL) * 100, 100);
  const goalMet = todayCount >= DAILY_GRATITUDE_GOAL;

  return (
    <div className="space-y-6">
      {/* Header with Goal */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Heart className="w-6 h-6 text-rose-500" />
          <h2 className="text-2xl font-semibold text-gray-800">Daily Gratitude Practice</h2>
        </div>
        <div className="flex items-center space-x-2 bg-rose-50 px-4 py-2 rounded-full border border-rose-200">
          <Target className="w-4 h-4 text-rose-600" />
          <span className="text-sm font-semibold text-rose-700">{todayCount}/{DAILY_GRATITUDE_GOAL} Today</span>
        </div>
      </div>

      {/* Daily Goal Progress */}
      <Card className="border-rose-200 bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-rose-800 flex items-center gap-2">
                  {goalMet ? (
                    <>
                      <Sparkles className="w-5 h-5 text-amber-500" />
                      Goal Complete! 🎉
                    </>
                  ) : (
                    <>
                      <TrendingUp className="w-5 h-5" />
                      Today's Progress
                    </>
                  )}
                </h3>
                <p className="text-sm text-rose-600 mt-1">
                  {goalMet 
                    ? "Amazing! You've hit your daily gratitude goal. Keep the momentum going!" 
                    : `Add ${DAILY_GRATITUDE_GOAL - todayCount} more to reach your daily goal`
                  }
                </p>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-rose-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-rose-500 to-pink-500 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${goalProgress}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Add Section */}
      <Card className="border-rose-300 shadow-lg bg-white">
        <CardContent className="pt-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-rose-500" />
              <h3 className="font-semibold text-rose-800">What are you grateful for right now?</h3>
            </div>
            <div className="relative">
              <Textarea
                value={newEntry}
                onChange={(e) => setNewEntry(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="I am grateful for..."
                className="min-h-[80px] pr-12 focus:ring-rose-400 focus:border-rose-400 resize-none text-base"
              />
              <Button
                onClick={handleAddEntry}
                disabled={!newEntry.trim()}
                className="absolute bottom-2 right-2 bg-rose-500 hover:bg-rose-600 text-white h-9 w-9 p-0 rounded-full shadow-md"
                title="Add gratitude (Enter)"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-rose-600 italic">
                ✨ Press Enter to add, or Shift+Enter for new line
              </p>
              {!goalMet && todayCount > 0 && (
                <p className="text-xs font-medium text-rose-700 bg-rose-100 px-2 py-1 rounded-full">
                  {DAILY_GRATITUDE_GOAL - todayCount} more to go!
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Encouragement Prompts */}
      {!goalMet && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="pt-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-amber-800">✨ Need inspiration? Try these:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-amber-700">
                <div>• A person who made you smile today</div>
                <div>• Something beautiful you saw or heard</div>
                <div>• A comfort in your life (home, bed, food)</div>
                <div>• A challenge that helped you grow</div>
                <div>• Your health or a body part that works well</div>
                <div>• An opportunity you have access to</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Why Gratitude Matters */}
      <div className="bg-rose-50 p-4 rounded-lg border border-rose-200">
        <h3 className="text-sm font-semibold text-rose-800 mb-2">❤️ Why {DAILY_GRATITUDE_GOAL} Gratitudes Daily?</h3>
        <p className="text-rose-700 text-sm mb-2">
          Research shows that listing 3+ gratitudes daily rewires your brain for positivity, reduces stress, 
          and attracts more abundance into your life. Make this a sacred daily habit!
        </p>
      </div>

      {/* Entries List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading your gratitude entries...</div>
        ) : entries.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Heart className="w-12 h-12 mx-auto mb-3 text-rose-300" />
            <p className="font-medium">Start your gratitude journey today!</p>
            <p className="text-sm mt-1">Add your first gratitude above to begin ✨</p>
          </div>
        ) : (
          <>
            {/* Today's Entries */}
            {todayEntries.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-rose-700 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Today's Gratitudes ({todayEntries.length})
                </h3>
                {todayEntries.map((entry) => (
                  <Card key={entry.id} className="hover:shadow-md transition-all duration-200 border-rose-200 bg-rose-50/50">
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-rose-600 font-medium">Today</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteEntry(entry.id)}
                          className="text-gray-400 hover:text-rose-600 h-8 w-8 p-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <p className="text-gray-800 mb-3 leading-relaxed font-medium">{entry.content}</p>
                      
                      <div className="bg-gradient-to-r from-rose-100 to-pink-100 p-3 rounded-lg">
                        <p className="text-sm text-rose-700 italic">"{entry.template}"</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Previous Entries */}
            {entries.filter(e => e.date !== today).length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2 pt-4">
                  <Calendar className="w-5 h-5" />
                  Previous Gratitudes ({entries.filter(e => e.date !== today).length})
                </h3>
                {entries.filter(e => e.date !== today).map((entry) => (
                  <Card key={entry.id} className="hover:shadow-md transition-all duration-200 border-gray-200">
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-500">{new Date(entry.date).toLocaleDateString()}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteEntry(entry.id)}
                          className="text-gray-400 hover:text-rose-600 h-8 w-8 p-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <p className="text-gray-800 mb-3 leading-relaxed">{entry.content}</p>
                      
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600 italic">"{entry.template}"</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};