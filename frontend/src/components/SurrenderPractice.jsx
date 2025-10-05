import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Plus, Bird, Calendar } from 'lucide-react';
import { mockEntries } from '../mock';

export const SurrenderPractice = () => {
  const [entries, setEntries] = useState(mockEntries.surrender);
  const [newSurrender, setNewSurrender] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleAddSurrender = () => {
    if (newSurrender.trim()) {
      const entry = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        situation: newSurrender,
        template: `I surrender ${newSurrender} in harmony with all under grace in a perfect way in accordance with the divine design. Thank you for hearing me.`
      };
      setEntries([entry, ...entries]);
      setNewSurrender('');
      setShowForm(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Dove className="w-6 h-6 text-teal-500" />
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
        <h3 className="text-lg font-medium text-teal-800 mb-2">About Surrender</h3>
        <p className="text-teal-700">
          Surrendering to the divine design means releasing our need to control outcomes and trusting in the greater wisdom of the universe. 
          When we surrender our worries, fears, and challenges, we open ourselves to divine guidance and solutions beyond our limited perspective.
        </p>
      </div>

      {showForm && (
        <Card className="border-teal-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg text-teal-700">Surrender to the Divine Design</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">What situation would you like to surrender?</p>
              <Textarea
                value={newSurrender}
                onChange={(e) => setNewSurrender(e.target.value)}
                placeholder="I surrender my concerns about..."
                className="min-h-[100px] focus:ring-teal-400 focus:border-teal-400"
              />
            </div>
            
            {newSurrender && (
              <div className="bg-teal-50 p-4 rounded-lg">
                <p className="text-sm text-teal-700 font-medium mb-2">Divine Surrender:</p>
                <p className="text-sm text-teal-600 italic">
                  "I surrender {newSurrender} in harmony with all under grace in a perfect way in accordance with the divine design. Thank you for hearing me."
                </p>
              </div>
            )}
            
            <div className="flex space-x-3">
              <Button 
                onClick={handleAddSurrender}
                className="bg-teal-500 hover:bg-teal-600 text-white"
              >
                Surrender
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
        {entries.map((entry) => (
          <Card key={entry.id} className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2 mb-3">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-500">{new Date(entry.date).toLocaleDateString()}</span>
              </div>
              
              <p className="text-gray-800 mb-4">
                <span className="font-medium">Surrendered:</span> <span className="italic">{entry.situation}</span>
              </p>
              
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-3 rounded-lg">
                <p className="text-sm text-teal-600 italic">"{entry.template}"</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};