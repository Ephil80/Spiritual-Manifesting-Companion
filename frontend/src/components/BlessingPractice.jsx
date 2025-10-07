import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus, Users, Calendar } from 'lucide-react';
import { mockEntries, categories } from '../mock';

export const BlessingPractice = () => {
  const [entries, setEntries] = useState(mockEntries.blessings);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    person: '',
    blessing: ''
  });

  const handleAddBlessing = () => {
    if (formData.person.trim() && formData.blessing.trim() && formData.category) {
      const entry = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        ...formData,
        template: `I bless ${formData.person} with the Divine Design of ${formData.blessing}. May they receive their highest good.`
      };
      setEntries([entry, ...entries]);
      setFormData({ category: '', person: '', blessing: '' });
      setShowForm(false);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      family: 'bg-blue-50 text-blue-700 border-blue-200',
      friends: 'bg-green-50 text-green-700 border-green-200',
      strangers: 'bg-purple-50 text-purple-700 border-purple-200',
      enemies: 'bg-orange-50 text-orange-700 border-orange-200'
    };
    return colors[category] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Users className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-semibold text-gray-800">Blessing Practice</h2>
        </div>
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 hover:bg-blue-600 text-white transition-all duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Send Blessing
        </Button>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-lg font-medium text-blue-800 mb-2">The Power of Sending Good Vibes</h3>
        <p className="text-blue-700 mb-4">
          When you send genuine good wishes to others - even people who've hurt you - something beautiful happens. 
          You free yourself from carrying negative energy and create space for more love in your own life. 
          It's like clearing out old resentment to make room for fresh joy.
        </p>
        <div className="bg-white/70 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">Daily Benefits:</h4>
          <ul className="text-blue-700 space-y-1 text-sm">
            <li>• Transforms judgment into compassion, healing your heart</li>
            <li>• Creates a flow of divine love that returns to you multiplied</li>
            <li>• Dissolves ego barriers and connects you to universal oneness</li>
            <li>• Attracts positive relationships and harmonious interactions</li>
            <li>• Aligns you with your divine nature as a being of love</li>
          </ul>
        </div>
      </div>

      {showForm && (
        <Card className="border-blue-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg text-blue-700">Send a Divine Blessing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
              <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                <SelectTrigger className="focus:ring-blue-400 focus:border-blue-400">
                  <SelectValue placeholder="Choose category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.blessing.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Person/Group</label>
              <Input
                value={formData.person}
                onChange={(e) => setFormData({...formData, person: e.target.value})}
                placeholder="Who are you blessing?"
                className="focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Blessing</label>
              <Textarea
                value={formData.blessing}
                onChange={(e) => setFormData({...formData, blessing: e.target.value})}
                placeholder="What do you wish for them?"
                className="min-h-[80px] focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
            
            {formData.person && formData.blessing && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-700 font-medium mb-2">Divine Blessing:</p>
                <p className="text-sm text-blue-600 italic">
                  "I bless {formData.person} with the Divine Design of {formData.blessing}. May they receive their highest good."
                </p>
              </div>
            )}
            
            <div className="flex space-x-3">
              <Button 
                onClick={handleAddBlessing}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Send Blessing
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowForm(false)}
                className="border-blue-300 text-blue-600 hover:bg-blue-50"
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
              
              <p className="text-gray-800 mb-2">
                <span className="font-medium">Blessing {entry.person}</span> with <span className="italic">{entry.blessing}</span>
              </p>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg">
                <p className="text-sm text-blue-600 italic">"{entry.template}"</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};