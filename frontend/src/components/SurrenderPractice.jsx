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
        template: `Letter to Divine Design: ${newSurrender}`
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
        <h3 className="text-lg font-medium text-teal-800 mb-2">Surrender & the Divine Design</h3>
        <p className="text-teal-700 mb-4">
          Surrender is the ego's greatest teacher. When we release our need to control outcomes and trust the Divine Design, 
          we step out of our own way and allow infinite wisdom to guide us to solutions beyond our limited perspective.
        </p>
        <div className="bg-white/70 p-4 rounded-lg">
          <h4 className="font-semibold text-teal-800 mb-2">Daily Benefits:</h4>
          <ul className="text-teal-700 space-y-1 text-sm">
            <li>• Releases ego's need to control and opens to divine flow</li>
            <li>• Transforms anxiety into peaceful trust in divine timing</li>
            <li>• Allows divine solutions beyond your current understanding</li>
            <li>• Frees mental energy for creative and joyful pursuits</li>
            <li>• Deepens your connection to divine guidance and intuition</li>
          </ul>
        </div>
      </div>

      {showForm && (
        <Card className="border-teal-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg text-teal-700">Write a Letter to Divine Design</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">Write about the situation: What's happening? What have you tried? How do you feel? Then surrender it completely.</p>
              <Textarea
                value={newSurrender}
                onChange={(e) => setNewSurrender(e.target.value)}
                placeholder="Dear Divine Design, I'm struggling with... I've tried... I feel... I surrender this to you completely..."
                className="min-h-[120px] focus:ring-teal-400 focus:border-teal-400"
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