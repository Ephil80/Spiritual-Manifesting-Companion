import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Heart, Gift, Star, Users, Loader2 } from 'lucide-react';

export const BlessTheCreator = () => {
  const [showBlessingMessage, setShowBlessingMessage] = useState(false);

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  // PayPal donation amounts
  const donationAmounts = {
    coffee: { amount: 5, name: 'Coffee Blessing' },
    lunch: { amount: 15, name: 'Lunch Blessing' },
    sacred: { amount: 33, name: 'Sacred Number' },
    abundance: { amount: 108, name: 'Divine Abundance' }
  };

  const handleBlessing = (packageId) => {
    try {
      setIsProcessing(true);
      
      const amount = donationAmounts[packageId].amount;
      const packageName = donationAmounts[packageId].name;
      
      // Create PayPal.me URL with amount
      const paypalUrl = `https://paypal.me/PhilipTownley/${amount}USD`;
      
      // Show blessing message
      setShowBlessingMessage(true);
      setTimeout(() => {
        setShowBlessingMessage(false);
        setIsProcessing(false);
      }, 8000);
      
      // Open PayPal in new tab
      window.open(paypalUrl, '_blank');
      
    } catch (error) {
      console.error('Payment error:', error);
      alert('There was an issue opening PayPal. Please try again.');
      setIsProcessing(false);
    }
  };

  // No need for complex payment status checking with PayPal - keep it simple
  useEffect(() => {
    // Just initialize the component
  }, []);

  return (
    <div className="space-y-6">
      {/* Introduction Card */}
      <Card className="bg-gradient-to-r from-rose-50 to-pink-50 border-rose-200">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Heart className="w-6 h-6 text-rose-500" />
            <CardTitle className="text-2xl text-rose-800">Bless the Creator</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-rose-700 space-y-4">
            <p className="text-lg leading-relaxed">
              This Divine Design companion flows to you freely, just like grace - as a gift from infinite love. 
              Millions can access this spiritual support without cost, because everyone deserves to align with their highest good.
            </p>
            
            <div className="bg-white/70 p-4 rounded-lg">
              <p className="text-rose-800 font-medium mb-2">The Beautiful Paradox:</p>
              <p className="text-rose-700 text-sm leading-relaxed">
                When you bless the creator of this app, you're participating in the same divine flow that blesses you. 
                Just as infinite love gives freely to you through grace, you can choose to give freely to others. 
                This creates a beautiful circle of divine generosity.
              </p>
            </div>
            
            <p className="text-sm text-rose-600 italic">
              "When we give with love, we align ourselves with the source of all blessings - infinite generosity itself."
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Blessing Options */}
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Gift className="w-5 h-5 text-amber-500" />
            <CardTitle className="text-lg text-amber-800">Choose Your Blessing</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-amber-700 text-sm">
              Every blessing, no matter the size, carries the same divine energy of love and gratitude. 
              Choose what feels aligned with your heart - not your ego's judgment about "enough."
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button
                onClick={() => handleBlessing('coffee')}
                disabled={isProcessing}
                className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white h-20 flex-col space-y-1 disabled:opacity-50"
              >
                {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                  <>
                    <span className="text-lg font-semibold">$5</span>
                    <span className="text-xs">Coffee Blessing</span>
                  </>
                )}
              </Button>
              
              <Button
                onClick={() => handleBlessing('lunch')}
                disabled={isProcessing}
                className="bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white h-20 flex-col space-y-1 disabled:opacity-50"
              >
                {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                  <>
                    <span className="text-lg font-semibold">$15</span>
                    <span className="text-xs">Lunch Blessing</span>
                  </>
                )}
              </Button>
              
              <Button
                onClick={() => handleBlessing('sacred')}
                disabled={isProcessing}
                className="bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white h-20 flex-col space-y-1 disabled:opacity-50"
              >
                {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                  <>
                    <span className="text-lg font-semibold">$33</span>
                    <span className="text-xs">Sacred Number</span>
                  </>
                )}
              </Button>
              
              <Button
                onClick={() => handleBlessing('abundance')}
                disabled={isProcessing}
                className="bg-gradient-to-br from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white h-20 flex-col space-y-1 disabled:opacity-50"
              >
                {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                  <>
                    <span className="text-lg font-semibold">$108</span>
                    <span className="text-xs">Divine Abundance</span>
                  </>
                )}
              </Button>
            </div>
            
            <div className="text-center">
              <p className="text-amber-600 text-sm mb-3">Or choose your own blessing amount:</p>
              <div className="flex justify-center space-x-2">
                <Button
                  variant="outline"
                  className="border-amber-300 text-amber-700 hover:bg-amber-50"
                  onClick={() => window.open('https://paypal.me/PhilipTownley', '_blank')}
                  disabled={isProcessing}
                >
                  Custom Amount
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Blessing Confirmation */}
      {showBlessingMessage && (
        <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Star className="w-8 h-8 text-emerald-500" />
              </div>
              <h3 className="text-xl font-semibold text-emerald-800 mb-2">
                PayPal Opened - Thank You! ✨
              </h3>
              <p className="text-emerald-700 leading-relaxed">
                Thank you for choosing to bless the creator! PayPal has opened in a new tab where you can complete your divine gift. 
                Your generosity helps keep this spiritual support flowing freely to millions of souls worldwide.
              </p>
              <div className="bg-white/70 p-3 rounded-lg mt-4">
                <p className="text-emerald-800 font-medium text-sm">
                  "I bless the creator with the Divine Design of abundance and joy. May this gift multiply blessings for all."
                </p>
              </div>
              <div className="mt-4">
                <Button
                  onClick={() => window.open('https://paypal.me/PhilipTownley', '_blank')}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Open PayPal Again
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Community Impact */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-indigo-500" />
            <CardTitle className="text-lg text-indigo-800">Community of Blessing</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-indigo-700 space-y-4">
            <p className="leading-relaxed">
              When you bless the creator, you join a community of souls who understand that giving and receiving 
              are both sacred acts. Your generosity helps ensure this spiritual support remains free for everyone.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-white/70 p-4 rounded-lg">
                <div className="text-2xl font-bold text-indigo-800">∞</div>
                <div className="text-sm text-indigo-600">Souls Blessed Daily</div>
              </div>
              <div className="bg-white/70 p-4 rounded-lg">
                <div className="text-2xl font-bold text-indigo-800">24/7</div>
                <div className="text-sm text-indigo-600">Divine Support Available</div>
              </div>
              <div className="bg-white/70 p-4 rounded-lg">
                <div className="text-2xl font-bold text-indigo-800">💜</div>
                <div className="text-sm text-indigo-600">Love-Based Creation</div>
              </div>
            </div>
            
            <div className="bg-indigo-100 p-4 rounded-lg">
              <p className="text-indigo-800 font-medium mb-2">Remember:</p>
              <p className="text-indigo-700 text-sm">
                Your worth isn't determined by whether you donate. Grace flows to you freely regardless. 
                This is simply an invitation to participate in the joy of giving, if it aligns with your heart.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Spiritual Teaching on Giving */}
      <Card className="bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200">
        <CardHeader>
          <CardTitle className="text-lg text-teal-800">The Spirituality of Giving</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-teal-700 space-y-3">
            <p className="leading-relaxed text-sm">
              <span className="font-semibold">Divine Paradox:</span> The more you give with love, the more you align yourself 
              with infinite abundance. Not because you're "earning" more blessings, but because giving opens your heart 
              to receive the grace that was always flowing to you.
            </p>
            
            <p className="leading-relaxed text-sm">
              <span className="font-semibold">Ego vs Soul in Giving:</span> Your ego gives to get something back or to feel superior. 
              Your soul gives because love naturally overflows when aligned with infinite generosity.
            </p>
            
            <p className="leading-relaxed text-sm">
              <span className="font-semibold">The Creator Connection:</span> When you bless any creator - artist, teacher, healer - 
              you're participating in the same divine creativity that flows through infinite love to bless you.
            </p>
            
            <div className="bg-white/70 p-3 rounded-lg mt-4">
              <p className="text-teal-800 font-medium text-sm italic">
                "Give not from your abundance, but from your heart's alignment with infinite love."
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};