import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Plus, Heart, Calendar, ArrowRight } from 'lucide-react';

const mockKindness = [
  {
    id: '1',
    recipient: 'Homeless person at the grocery store',
    kindAct: 'Bought them a meal and gave them $20 without expecting anything back',
    feelings: 'Felt so good to help without any agenda. Just pure giving from the heart.',
    date: '2025-01-15',
    template: 'I gave kindness to a homeless person at the grocery store without expectation of return. I trust the universe to multiply this love.'
  },
  {
    id: '2',
    recipient: 'My stressed coworker',
    kindAct: 'Brought them coffee and listened to their problems for an hour',
    feelings: 'It felt amazing to just be there for someone without wanting anything back.',
    date: '2025-01-14',
    template: 'I gave kindness to my stressed coworker without expectation of return. I trust the universe to multiply this love.'
  }
];

export const KindnessPractice = () => {
  const [entries, setEntries] = useState(mockKindness || []);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    recipient: '',
    kindAct: '',
    feelings: ''
  });

  const handleAddKindness = () => {
    if (formData.recipient.trim() && formData.kindAct.trim()) {
      const entry = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        ...formData,
        template: `I gave kindness to ${formData.recipient} without expectation of return. I trust the universe to multiply this love.`
      };
      setEntries([entry, ...entries]);
      setFormData({ recipient: '', kindAct: '', feelings: '' });
      setShowForm(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Heart className="w-6 h-6 text-pink-500" />
          <h2 className="text-2xl font-semibold text-gray-800">Kindness Practice</h2>
        </div>
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="bg-pink-500 hover:bg-pink-600 text-white transition-all duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Record Kind Act
        </Button>
      </div>

      <div className="bg-pink-50 p-6 rounded-lg border border-pink-200">
        <h3 className="text-lg font-medium text-pink-800 mb-2">The Universal Law of Kindness</h3>
        <p className="text-pink-700 mb-4">
          <span className="font-semibold">Here's a universal truth that always works:</span> When you give kindness to others 
          without expecting anything in return, it comes back to you multiplied - but never in the way you expect.
        </p>
        <p className="text-pink-700 mb-4">
          <span className="font-semibold text-red-600">Don't treat kindness like a transaction!</span> You're not going into 
          a shop where you give $5 and expect exactly $5 worth of goods back. True kindness is giving freely and letting go completely.
        </p>
        <p className="text-pink-700">
          Give your kindness, release all expectations, and trust {'{divine source}'} to bring it back multiplied in whatever 
          beautiful way serves your highest good. This is one of life's most reliable spiritual laws.
        </p>
      </div>

      {showForm && (
        <Card className="border-pink-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg text-pink-700">Record Your Act of Kindness</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Who did you show kindness to?</label>
              <Input
                value={formData.recipient}
                onChange={(e) => setFormData({...formData, recipient: e.target.value})}
                placeholder="e.g., stranger, family member, coworker..."
                className="focus:ring-pink-400 focus:border-pink-400"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">What kind act did you do?</label>
              <Textarea
                value={formData.kindAct}
                onChange={(e) => setFormData({...formData, kindAct: e.target.value})}
                placeholder="Describe your act of kindness without any expectations..."
                className="min-h-[80px] focus:ring-pink-400 focus:border-pink-400"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">How did it feel to give without expecting anything back? (Optional)</label>
              <Textarea
                value={formData.feelings}
                onChange={(e) => setFormData({...formData, feelings: e.target.value})}
                placeholder="Share how it felt to give purely from the heart..."
                className="min-h-[60px] focus:ring-pink-400 focus:border-pink-400"
              />
            </div>
            
            {formData.recipient && formData.kindAct && (
              <div className="bg-pink-50 p-4 rounded-lg">
                <p className="text-sm text-pink-700 font-medium mb-2">Your Kindness Declaration:</p>
                <p className="text-sm text-pink-600 italic">
                  "I gave kindness to {formData.recipient} without expectation of return. I trust the universe to multiply this love."
                </p>
              </div>
            )}
            
            <div className="flex space-x-3">
              <Button 
                onClick={handleAddKindness}
                className="bg-pink-500 hover:bg-pink-600 text-white"
              >
                Record Kindness
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowForm(false)}
                className="border-pink-300 text-pink-600 hover:bg-pink-50"
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
                  <span className="font-medium">Kind act for:</span> <span className="italic">{entry.recipient}</span>
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  <span className="font-medium">What I did:</span> {entry.kindAct}
                </p>
                {entry.feelings && (
                  <p className="text-gray-600 text-sm mb-3">
                    <span className="font-medium">How it felt:</span> {entry.feelings}
                  </p>
                )}
              </div>
              
              <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-3 rounded-lg">
                <p className="text-sm text-pink-600 italic">"{entry.template}"</p>
              </div>
              
              <div className="mt-3 p-3 bg-pink-100 rounded-lg">
                <p className="text-pink-800 text-xs font-medium">✨ Love sent out without expectation - trusting the universe to multiply it!</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Benefits of Kindness Without Expectation */}
      <Card className="bg-gradient-to-r from-rose-50 to-pink-50 border-rose-200">
        <CardHeader>
          <CardTitle className="text-lg text-rose-800">Why Kindness Without Expectation Always Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-rose-700">
            <div className="flex items-start space-x-3">
              <ArrowRight className="w-5 h-5 text-rose-500 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">It's Not a Shop Transaction</p>
                <p className="text-xs">You don't give $5 of kindness expecting exactly $5 back. The universe doesn't work like a store.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <ArrowRight className="w-5 h-5 text-rose-500 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">Comes Back Multiplied</p>
                <p className="text-xs">Give freely, and it returns as opportunities, connections, unexpected help, or pure joy.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <ArrowRight className="w-5 h-5 text-rose-500 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">Never How You Expect</p>
                <p className="text-xs">Help a stranger, and maybe your child gets help at school. The return is always surprising and perfect.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <ArrowRight className="w-5 h-5 text-rose-500 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">Raises Your Vibration</p>
                <p className="text-xs">Giving without attachment aligns you with universal love and attracts more blessings naturally.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <ArrowRight className="w-5 h-5 text-rose-500 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">Creates Ripple Effects</p>
                <p className="text-xs">Your kindness inspires the recipient to be kind to others, creating an endless chain of love.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-white/70 rounded-lg">
            <p className="text-rose-800 font-medium mb-2">Universal Truth:</p>
            <p className="text-rose-700 text-sm italic">
              "Give freely, release completely, trust infinitely. The universe always returns love multiplied - 
              just never in the way your ego expects, but always in the way your soul needs."
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};