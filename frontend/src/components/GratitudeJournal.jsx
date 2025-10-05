import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Plus, Heart, Calendar } from 'lucide-react';
import { mockEntries } from '../mock';

export const GratitudeJournal = () => {
  const [entries, setEntries] = useState(mockEntries.gratitude);
  const [newEntry, setNewEntry] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleAddEntry = () => {
    if (newEntry.trim()) {
      const entry = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        content: newEntry,
        template: `I desire to express deep gratitude in harmony with all under grace in a perfect way in accordance with the divine design. Thank you for hearing me.`
      };
      setEntries([entry, ...entries]);
      setNewEntry('');
      setShowForm(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Heart className="w-6 h-6 text-rose-500" />
          <h2 className="text-2xl font-semibold text-gray-800">Gratitude Journal</h2>
        </div>
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="bg-rose-500 hover:bg-rose-600 text-white transition-all duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Gratitude
        </Button>
      </div>

      {showForm && (
        <Card className="border-rose-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg text-rose-700">Express Your Gratitude</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">What are you grateful for today?</p>
              <Textarea
                value={newEntry}
                onChange={(e) => setNewEntry(e.target.value)}
                placeholder="I am grateful for..."
                className="min-h-[100px] focus:ring-rose-400 focus:border-rose-400"
              />
            </div>
            
            <div className="bg-rose-50 p-4 rounded-lg">
              <p className="text-sm text-rose-700 font-medium mb-2">Divine Affirmation:</p>
              <p className="text-sm text-rose-600 italic">
                "I desire to express deep gratitude in harmony with all under grace in a perfect way in accordance with the divine design. Thank you for hearing me."
              </p>
            </div>
            
            <div className="flex space-x-3">
              <Button 
                onClick={handleAddEntry}
                className="bg-rose-500 hover:bg-rose-600 text-white"
              >
                Save Gratitude
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowForm(false)}
                className="border-rose-300 text-rose-600 hover:bg-rose-50"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {entries.map((entry) => (
          <Card key={entry.id} className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2 mb-3">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-500">{new Date(entry.date).toLocaleDateString()}</span>
              </div>
              
              <p className="text-gray-800 mb-4 leading-relaxed">{entry.content}</p>
              
              <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-3 rounded-lg">
                <p className="text-sm text-rose-600 italic">"{entry.template}"</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};