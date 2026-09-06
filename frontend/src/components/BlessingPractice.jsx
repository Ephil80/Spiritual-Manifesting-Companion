import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus, Users, Calendar, Trash2 } from 'lucide-react';
import { categories } from '../mock';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const BlessingPractice = () => {
  const [entries, setEntries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    category: '',
    person: '',
    blessing: ''
  });

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/journals/blessings`);
      setEntries(response.data);
    } catch (error) {
      console.error('Error fetching blessing entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBlessing = async () => {
    if (formData.person.trim() && formData.blessing.trim() && formData.category) {
      try {
        const template = `I bless ${formData.person} with the Divine Design of ${formData.blessing}. May they receive their highest good.`;
        const response = await axios.post(`${API_URL}/api/journals/blessings`, {
          ...formData,
          template
        });
        setEntries([response.data, ...entries]);
        setFormData({ category: '', person: '', blessing: '' });
        setShowForm(false);
      } catch (error) {
        console.error('Error adding blessing entry:', error);
        alert('Failed to save blessing. Please try again.');
      }
    }
  };

  const handleDeleteEntry = async (entryId) => {
    if (window.confirm('Are you sure you want to delete this blessing?')) {
      try {
        await axios.delete(`${API_URL}/api/journals/blessings/${entryId}`);
        setEntries(entries.filter(entry => entry.id !== entryId));
      } catch (error) {
        console.error('Error deleting blessing entry:', error);
        alert('Failed to delete blessing. Please try again.');
      }
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      family: 'bg-blue-50 text-blue-700 border-blue-200',
      friends: 'bg-green-50 text-green-700 border-green-200',
      strangers: 'bg-purple-50 text-purple-700 border-purple-200',
      enemies: 'bg-rose-50 text-rose-700 border-rose-200'
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
        <h3 className="text-lg font-medium text-blue-800 mb-2">The Power of Blessing Others</h3>
        <p className="text-blue-700 mb-4">
          When you bless others, you align yourself with divine abundance. The energy you send out comes back multiplied. 
          This practice helps you move beyond ego's judgment into unconditional divine love for all beings.
        </p>
        <div className="bg-white/70 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">Daily Benefits:</h4>
          <ul className="text-blue-700 space-y-1 text-sm">
            <li>• Activates the law of circulation - what you give returns multiplied</li>
            <li>• Releases ego's judgment and opens your heart to divine love</li>
            <li>• Transforms enemies into opportunities for spiritual growth</li>
            <li>• Aligns you with infinite abundance and grace</li>
            <li>• Creates positive karma and divine favor in your life</li>
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
              <label className="text-sm font-medium text-gray-700 mb-2 block">Who are you blessing?</label>
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
              <label className="text-sm font-medium text-gray-700 mb-2 block">Person/People</label>
              <Input
                value={formData.person}
                onChange={(e) => setFormData({...formData, person: e.target.value})}
                placeholder="Name or description..."
                className="focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Your Blessing</label>
              <Input
                value={formData.blessing}
                onChange={(e) => setFormData({...formData, blessing: e.target.value})}
                placeholder="What do you wish for them?"
                className="focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-700 font-medium mb-2">Divine Blessing Prayer:</p>
              <p className="text-sm text-blue-600 italic">
                "I bless [person] with the Divine Design of [blessing]. May they receive their highest good."
              </p>
            </div>
            
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
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading your blessings...</div>
        ) : entries.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No blessings yet. Start by blessing someone today!</div>
        ) : (
          entries.map((entry) => (
            <Card key={entry.id} className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">{new Date(entry.date).toLocaleDateString()}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(entry.category)}`}>
                      {entry.category}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteEntry(entry.id)}
                    className="text-gray-400 hover:text-blue-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <p className="text-gray-800 font-medium mb-1">{entry.person}</p>
                <p className="text-gray-600 text-sm mb-4">Blessing: {entry.blessing}</p>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-600 italic">"{entry.template}"</p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};