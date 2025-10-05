import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Plus, Shield, Calendar } from 'lucide-react';
import { mockEntries } from '../mock';

export const BanishingPractice = () => {
  const [entries, setEntries] = useState(mockEntries.banishing);
  const [newBanish, setNewBanish] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleAddBanishing = () => {
    if (newBanish.trim()) {
      const entry = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        negative: newBanish,
        template: `I release and banish ${newBanish} in harmony with all under grace in a perfect way in accordance with the divine design. Thank you for hearing me.`
      };
      setEntries([entry, ...entries]);
      setNewBanish('');
      setShowForm(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="w-6 h-6 text-red-500" />
          <h2 className="text-2xl font-semibold text-gray-800">Banishing Practice</h2>
        </div>
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="bg-red-500 hover:bg-red-600 text-white transition-all duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Banish Negativity
        </Button>
      </div>

      <div className="bg-red-50 p-6 rounded-lg border border-red-200">
        <h3 className="text-lg font-medium text-red-800 mb-2">Banishing & the Divine Design</h3>
        <p className="text-red-700 mb-4">
          Banishing releases ego-created fears, limiting beliefs, and negative patterns that block our divine blessings. 
          When we consciously release what no longer serves us, we create sacred space for the Divine Design to manifest our highest good.
        </p>
        <div className="bg-white/70 p-4 rounded-lg">
          <h4 className="font-semibold text-red-800 mb-2">Daily Benefits:</h4>
          <ul className="text-red-700 space-y-1 text-sm">
            <li>• Clears ego-created blocks to receiving divine abundance</li>
            <li>• Releases fear-based patterns that limit your potential</li>
            <li>• Creates space for divine guidance and inspiration</li>
            <li>• Transforms negative energy into spiritual strength</li>
            <li>• Aligns you with your divine nature of peace and love</li>
          </ul>
        </div>
      </div>

      {showForm && (
        <Card className="border-red-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg text-red-700">Banish Negative Patterns</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">What negative pattern or energy would you like to release?</p>
              <Textarea
                value={newBanish}
                onChange={(e) => setNewBanish(e.target.value)}
                placeholder="I release and banish..."
                className="min-h-[100px] focus:ring-red-400 focus:border-red-400"
              />
            </div>
            
            {newBanish && (
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-sm text-red-700 font-medium mb-2">Divine Banishing:</p>
                <p className="text-sm text-red-600 italic">
                  "I release and banish {newBanish} in harmony with all under grace in a perfect way in accordance with the divine design. Thank you for hearing me."
                </p>
              </div>
            )}
            
            <div className="flex space-x-3">
              <Button 
                onClick={handleAddBanishing}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Banish
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

      <div className="space-y-4">
        {entries.map((entry) => (
          <Card key={entry.id} className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2 mb-3">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-500">{new Date(entry.date).toLocaleDateString()}</span>
              </div>
              
              <p className="text-gray-800 mb-4">
                <span className="font-medium">Released:</span> <span className="italic">{entry.negative}</span>
              </p>
              
              <div className="bg-gradient-to-r from-red-50 to-pink-50 p-3 rounded-lg">
                <p className="text-sm text-red-600 italic">"{entry.template}"</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};