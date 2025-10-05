import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus, Sparkles, Calendar } from 'lucide-react';
import { mockEntries, categories } from '../mock';

export const ManifestingJournal = () => {
  const [entries, setEntries] = useState(mockEntries.manifesting);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    desire: ''
  });

  const handleAddManifestation = () => {
    if (formData.desire.trim() && formData.category) {
      const entry = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        ...formData,
        template: `I desire ${formData.desire}, this or something better, in harmony with all under grace in a perfect way in accordance with the divine design. Thank you for hearing me.`
      };
      setEntries([entry, ...entries]);
      setFormData({ category: '', desire: '' });
      setShowForm(false);
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-6 h-6 text-violet-500" />
          <h2 className="text-2xl font-semibold text-gray-800">Manifesting Journal</h2>
        </div>
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="bg-violet-500 hover:bg-violet-600 text-white transition-all duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Manifest Desire
        </Button>
      </div>

      <div className="bg-violet-50 p-6 rounded-lg border border-violet-200">
        <h3 className="text-lg font-medium text-violet-800 mb-2">Manifesting & the Divine Design</h3>
        <p className="text-violet-700 mb-4">
          True manifestation isn't about forcing outcomes through ego-driven desires, but aligning with the Divine Design to receive what serves our highest good. 
          We were created in the image of the divine - the only thing stopping our blessings is our ego's tainted perception of what we need.
        </p>
        <div className="bg-white/70 p-4 rounded-lg">
          <h4 className="font-semibold text-violet-800 mb-2">Daily Benefits:</h4>
          <ul className="text-violet-700 space-y-1 text-sm">
            <li>• Aligns your desires with divine will for perfect outcomes</li>
            <li>• Releases ego attachment and opens to "this or something better"</li>
            <li>• Activates your divine creative power as a co-creator with God</li>
            <li>• Attracts opportunities that serve your soul's highest purpose</li>
            <li>• Transforms scarcity mindset into abundant divine trust</li>
          </ul>
        </div>
      </div>

      {showForm && (
        <Card className="border-violet-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg text-violet-700">Manifest Your Desire</CardTitle>
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
            
            {formData.desire && (
              <div className="bg-violet-50 p-4 rounded-lg">
                <p className="text-sm text-violet-700 font-medium mb-2">Divine Manifestation:</p>
                <p className="text-sm text-violet-600 italic">
                  "I desire {formData.desire}, this or something better, in harmony with all under grace in a perfect way in accordance with the divine design. Thank you for hearing me."
                </p>
              </div>
            )}
            
            <div className="flex space-x-3">
              <Button 
                onClick={handleAddManifestation}
                className="bg-violet-500 hover:bg-violet-600 text-white"
              >
                Manifest
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

      <div className="space-y-4">
        {entries.map((entry) => (
          <Card key={entry.id} className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(entry.category)}`}>
                    {entry.category.charAt(0).toUpperCase() + entry.category.slice(1)}
                  </span>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">{new Date(entry.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-800 mb-4">
                <span className="font-medium">Manifesting:</span> <span className="italic">{entry.desire}</span>
              </p>
              
              <div className="bg-gradient-to-r from-violet-50 to-purple-50 p-3 rounded-lg">
                <p className="text-sm text-violet-600 italic">"{entry.template}"</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};