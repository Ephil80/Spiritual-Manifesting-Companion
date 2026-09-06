import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Crown, Check, Sparkles, Lock } from 'lucide-react';
import { usePremium } from '../contexts/PremiumContext';

export const PremiumUpgrade = () => {
  const { activatePremium } = usePremium();

  const freeFeatures = [
    'Daily Gratitude Journal with Goals',
    'Blessing Practice (6 Categories)',
    'Manifesting & Banishing Lists',
    'Surrender Letters to Divine Design',
    'Forgiveness Practice',
    'Kindness Tracker',
    'Daily Inspiration',
    'Smart Reminders'
  ];

  const premiumFeatures = [
    'Florence Scovel Shinn - The Game of Life',
    'Neville Goddard - Complete Teachings',
    'I AM Affirmations Library',
    'SATS Visualization Scripts',
    'Revision Technique Guides',
    'Living in the End Practices',
    'Advanced Manifestation Techniques',
    'Priority Support'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <Crown className="w-8 h-8 text-amber-500" />
          <h2 className="text-3xl font-bold text-gray-800">Upgrade to Premium</h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Unlock the timeless wisdom of Florence Scovel Shinn and Neville Goddard - two of the most powerful 
          teachers of manifestation and spiritual law.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {/* Free Plan */}
        <Card className="border-gray-300">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="text-2xl">Free Forever</CardTitle>
            <div className="text-4xl font-bold text-gray-800 mt-4">
              $0
              <span className="text-lg font-normal text-gray-600">/month</span>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">Includes:</h4>
                <ul className="space-y-2">
                  {freeFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button 
                disabled
                variant="outline"
                className="w-full"
              >
                Current Plan
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Premium Plan */}
        <Card className="border-amber-300 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-gradient-to-br from-amber-400 to-orange-500 text-white px-4 py-1 text-xs font-bold rounded-bl-lg">
            BEST VALUE
          </div>
          <CardHeader className="bg-gradient-to-br from-amber-50 to-orange-50 border-b border-amber-200">
            <CardTitle className="text-2xl flex items-center gap-2">
              <Crown className="w-6 h-6 text-amber-500" />
              Premium Access
            </CardTitle>
            <div className="text-4xl font-bold text-amber-600 mt-4">
              $9.99
              <span className="text-lg font-normal text-gray-600">/month</span>
            </div>
            <p className="text-sm text-amber-700 mt-2">Everything in Free, plus:</p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Premium Features:
                </h4>
                <ul className="space-y-2">
                  {premiumFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button 
                onClick={activatePremium}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-6 text-lg"
              >
                <Crown className="w-5 h-5 mr-2" />
                Upgrade Now
              </Button>
              <p className="text-xs text-center text-gray-500">
                Cancel anytime. No long-term commitment.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Value Proposition */}
      <Card className="max-w-4xl mx-auto border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
        <CardContent className="pt-6">
          <h3 className="text-xl font-bold text-purple-800 mb-4 text-center">
            Why Upgrade to Premium?
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="font-semibold text-purple-700 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Florence Scovel Shinn
              </h4>
              <p className="text-sm text-purple-600">
                Master the power of the spoken word with 35 powerful affirmations across 7 categories. 
                Learn the Game of Life principles that have transformed millions of lives since 1925.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-purple-700 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Neville Goddard
              </h4>
              <p className="text-sm text-purple-600">
                Access the most powerful manifestation techniques ever taught. SATS, revision, I AM affirmations, 
                and living in the end - the exact methods Neville used to transform lives.
              </p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-white/70 rounded-lg">
            <p className="text-center text-purple-700 italic text-sm">
              "These teachings have stood the test of time for a reason - they WORK. Unlock the secrets of 
              deliberate creation and transform your reality." ✨
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Demo Note */}
      <Card className="max-w-2xl mx-auto border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <p className="text-sm text-blue-700 text-center">
            <strong>Demo Mode:</strong> Click "Upgrade Now" to instantly activate premium features and explore 
            Florence Scovel Shinn and Neville Goddard's teachings. In production, this would process payment first.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export const PremiumLock = ({ featureName }) => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Card className="max-w-md border-amber-300">
        <CardContent className="pt-8 pb-8 text-center space-y-4">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8 text-amber-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Premium Feature</h3>
          <p className="text-gray-600">
            {featureName} is available with Premium Access.
          </p>
          <Button 
            onClick={() => window.location.hash = '#upgrade'}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold"
          >
            <Crown className="w-4 h-4 mr-2" />
            Upgrade to Premium
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
