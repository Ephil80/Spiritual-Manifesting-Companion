import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Plus, Wrench, Calendar } from 'lucide-react';
import { mockForgiveness } from '../mock';

export const ForgivenessPractice = () => {
  const [entries, setEntries] = useState(mockForgiveness || []);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    person: '',
    situation: '',
    feelings: ''
  });

  const handleAddForgiveness = () => {
    if (formData.person.trim() && formData.situation.trim()) {
      const entry = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        ...formData,
        template: `I forgive ${formData.person} and release this resentment from my heart. I choose my emotional freedom over carrying this burden. This forgiveness is my gift to myself.`
      };
      setEntries([entry, ...entries]);
      setFormData({ person: '', situation: '', feelings: '' });
      setShowForm(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Wrench className="w-6 h-6 text-green-500" />
          <h2 className="text-2xl font-semibold text-gray-800">Forgiveness Practice</h2>
        </div>
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="bg-green-500 hover:bg-green-600 text-white transition-all duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Clear Emotional Blockage
        </Button>
      </div>

      <div className="bg-green-50 p-6 rounded-lg border border-green-200">
        <h3 className="text-lg font-medium text-green-800 mb-2">Forgiveness: Your Emotional Plunger</h3>
        <p className="text-green-700 mb-4">
          Think of forgiveness as an emotional plunger for spiritual blockages. When you hold onto resentment, 
          it clogs up your entire system - blocking your joy, peace, and ability to receive blessings. 
          <span className="font-semibold"> Forgiveness isn't about letting anyone off the hook</span> - 
          infinite wisdom handles divine justice perfectly.
        </p>
        <p className="text-green-700">
          <span className="font-semibold">Here's the truth:</span> When you carry resentment, you're drinking poison 
          and expecting the other person to get sick. Meanwhile, they're often living their life completely unaware 
          of your suffering. Forgiveness is your gift to <span className="italic">yourself</span> - your emotional freedom.
        </p>
      </div>

      {showForm && (
        <Card className="border-green-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg text-green-700">Clear Your Emotional Blockage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Who needs to be forgiven?</label>
              <Input
                value={formData.person}
                onChange={(e) => setFormData({...formData, person: e.target.value})}
                placeholder="Name or describe the person..."
                className="focus:ring-green-400 focus:border-green-400"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">What happened?</label>
              <Textarea
                value={formData.situation}
                onChange={(e) => setFormData({...formData, situation: e.target.value})}
                placeholder="Briefly describe the situation that hurt you..."
                className="min-h-[80px] focus:ring-green-400 focus:border-green-400"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">How has holding onto this affected you? (Optional)</label>
              <Textarea
                value={formData.feelings}
                onChange={(e) => setFormData({...formData, feelings: e.target.value})}
                placeholder="How has this resentment been blocking your peace and joy?"
                className="min-h-[60px] focus:ring-green-400 focus:border-green-400"
              />
            </div>
            
            {formData.person && formData.situation && (
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-700 font-medium mb-2">Your Emotional Freedom Declaration:</p>
                <p className="text-sm text-green-600 italic">
                  "I forgive {formData.person} and release this resentment from my heart. I choose my emotional freedom over carrying this burden. This forgiveness is my gift to myself."
                </p>
              </div>
            )}
            
            <div className="flex space-x-3">
              <Button 
                onClick={handleAddForgiveness}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                Clear the Blockage
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowForm(false)}
                className="border-green-300 text-green-600 hover:bg-green-50"
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
              
              <div className="mb-4">
                <p className="text-gray-800 mb-2">
                  <span className="font-medium">Forgiven:</span> <span className="italic">{entry.person}</span>
                </p>
                {entry.situation && (
                  <p className="text-gray-600 text-sm mb-2">
                    <span className="font-medium">Situation:</span> {entry.situation}
                  </p>
                )}
                {entry.feelings && (
                  <p className="text-gray-600 text-sm mb-3">
                    <span className="font-medium">Impact on me:</span> {entry.feelings}
                  </p>
                )}
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg">
                <p className="text-sm text-green-600 italic">"{entry.template}"</p>
              </div>
              
              <div className="mt-3 p-3 bg-green-100 rounded-lg">
                <p className="text-green-800 text-xs font-medium">✨ Emotional blockage cleared! Your system is now free-flowing again.</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Benefits of Forgiveness */}
      <Card className="bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200">
        <CardHeader>
          <CardTitle className="text-lg text-emerald-800">Why Forgiveness Benefits YOU</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-emerald-700">
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-sm">🚰 Unclogs Your Energy</p>
                <p className="text-xs">Resentment blocks your natural flow of joy, peace, and abundance</p>
              </div>
              <div>
                <p className="font-semibold text-sm">💚 Frees Your Heart</p>
                <p className="text-xs">Opens space for love, gratitude, and new blessings to enter</p>
              </div>
              <div>
                <p className="font-semibold text-sm">🧘‍♀️ Restores Inner Peace</p>
                <p className="text-xs">Stops the mental replay of painful events that drain your energy</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-sm">⚡ Increases Your Power</p>
                <p className="text-xs">Reclaims energy you were wasting on old hurts and redirects it to your growth</p>
              </div>
              <div>
                <p className="font-semibold text-sm">🎯 Aligns with Divine Design</p>
                <p className="text-xs">Divine justice operates perfectly - you don't need to carry the burden</p>
              </div>
              <div>
                <p className="font-semibold text-sm">🌟 Models Divine Love</p>
                <p className="text-xs">Aligns you with infinite forgiveness and unconditional love</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-white/70 rounded-lg">
            <p className="text-emerald-800 font-medium mb-2">Remember:</p>
            <p className="text-emerald-700 text-sm italic">
              "Forgiveness doesn't excuse their behavior. It prevents their behavior from destroying your heart. 
              You're not freeing them - you're freeing yourself."
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};