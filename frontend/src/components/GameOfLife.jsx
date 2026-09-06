import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Sparkles, Heart, DollarSign, Shield, Target, Briefcase, Home, Copy, Check } from 'lucide-react';

const AFFIRMATION_CATEGORIES = [
  {
    id: 'health',
    title: 'Health & Healing',
    icon: Heart,
    color: 'emerald',
    affirmations: [
      "I give thanks for my radiant health and strength. Every cell in my body is filled with light and divine energy.",
      "Infinite Spirit, I cast the burden of this disease upon you, and I go free to be healthy, happy, and whole.",
      "My body is a temple of the living God, and I treat it with reverence and respect.",
      "Divine Love floods my consciousness with health, and every cell in my body is filled with light.",
      "I am God's perfect child, and God's perfect child cannot be sick."
    ]
  },
  {
    id: 'wealth',
    title: 'Wealth & Abundance',
    icon: DollarSign,
    color: 'amber',
    affirmations: [
      "Infinite Spirit, open the way for my great abundance. I am an irresistible magnet for all that belongs to me by Divine Right.",
      "My supply comes from God, and now pours in and fills all my needs. I give thanks for my immediate, endless, and limitless supply.",
      "I am one with God, and God is all abundance. Therefore, I cannot be separated from my supply.",
      "Unexpected doors fly open, unexpected channels are free, and endless avalanches of abundance are poured out upon me under grace in perfect ways.",
      "I now let go of worn-out things, worn-out conditions, and worn-out relationships. Divine order is established in my mind, body, and affairs."
    ]
  },
  {
    id: 'love',
    title: 'Love & Relationships',
    icon: Heart,
    color: 'rose',
    affirmations: [
      "Divine Love, expressing through me, now draws to me my perfect mate. I give thanks that this union is revealed under grace in a perfect way.",
      "I am now living with my ideal husband/wife in a beautiful home, in perfect harmony, happiness, and abundance.",
      "As I am one with God, I am now one with my perfect love, my soul's perfect mate, united by Divine Love.",
      "Divine Love, radiating through me, blesses and magnetizes every person I contact.",
      "I give thanks that I now attract wonderful and loving people into my life, all divinely selected for my highest good."
    ]
  },
  {
    id: 'success',
    title: 'Success & Opportunity',
    icon: Target,
    color: 'violet',
    affirmations: [
      "Infinite Spirit, open the way for the Divine Design of my life to manifest. Let the genius within me now be released and let me see clearly the perfect plan.",
      "I am now under direct inspiration, and I do everything that I am to do, making no mistakes.",
      "My good now flows to me in a steady, unbroken, ever-increasing stream of success, happiness, and abundance.",
      "The Divine Design of my life now takes shape in definite, concrete experiences leading to my heart's desire.",
      "I cast this burden on the Christ within, and I go free to be my divine self, doing what I love to do, and I do it well!"
    ]
  },
  {
    id: 'protection',
    title: 'Protection & Guidance',
    icon: Shield,
    color: 'blue',
    affirmations: [
      "I am always under direct inspiration. I make right decisions quickly. I am Divinely protected, guided, and inspired.",
      "The Light of God surrounds me, the Love of God enfolds me, the Power of God protects me, and the Presence of God watches over me. Wherever I am, God is!",
      "My angels go before me to make clear, easy, and successful my way. God's armor is around me, and I am invincible to every attack.",
      "I am surrounded by the white light of the Christ, through which nothing negative can penetrate.",
      "Divine Intelligence goes before me, making straight, easy, and successful my way."
    ]
  },
  {
    id: 'work',
    title: 'Right Work & Career',
    icon: Briefcase,
    color: 'indigo',
    affirmations: [
      "I have a perfect work in a perfect way. I give perfect service for perfect pay.",
      "I am fully equipped for the Divine Plan of my life. I am more than equal to this situation.",
      "The genius within me is now released. I now fulfill my destiny and achieve my greatest success.",
      "I am guided to do the right thing at the right time, and I am always in my right place doing my right work.",
      "My true place is revealed to me under grace. I recognize it instantly and I step into it with ease and joy."
    ]
  },
  {
    id: 'home',
    title: 'Home & Harmony',
    icon: Home,
    color: 'teal',
    affirmations: [
      "Infinite Spirit, open the way for my right home, my divinely designed home, which is already prepared for me. I give thanks that I now move in under grace in a perfect way.",
      "I now dwell in a beautiful home, in perfect harmony, in perfect peace, and with perfect furnishings.",
      "I give thanks that Divine order is established in my home and in my affairs. I see clearly and act quickly and my greatest expectations are realized.",
      "My home is filled with the Spirit of Love. Everyone who enters feels this peace and harmony.",
      "I am at peace in my home. Divine Love and Divine Light fill every room, and we are all blessed and happy."
    ]
  }
];

export const GameOfLife = () => {
  const [selectedCategory, setSelectedCategory] = useState(AFFIRMATION_CATEGORIES[0]);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getColorClasses = (color) => {
    const colors = {
      emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100',
      amber: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100',
      rose: 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100',
      violet: 'bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100',
      blue: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100',
      indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100',
      teal: 'bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100'
    };
    return colors[color] || colors.violet;
  };

  const getActiveColorClasses = (color) => {
    const colors = {
      emerald: 'bg-emerald-500 text-white border-emerald-600',
      amber: 'bg-amber-500 text-white border-amber-600',
      rose: 'bg-rose-500 text-white border-rose-600',
      violet: 'bg-violet-500 text-white border-violet-600',
      blue: 'bg-blue-500 text-white border-blue-600',
      indigo: 'bg-indigo-500 text-white border-indigo-600',
      teal: 'bg-teal-500 text-white border-teal-600'
    };
    return colors[color] || colors.violet;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <Sparkles className="w-6 h-6 text-violet-500" />
        <h2 className="text-2xl font-semibold text-gray-800">The Game of Life</h2>
      </div>

      {/* Introduction */}
      <Card className="border-violet-200 bg-gradient-to-br from-violet-50 to-purple-50">
        <CardContent className="pt-6">
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-violet-800">✨ Your Word is Your Wand</h3>
            <p className="text-violet-700 text-sm leading-relaxed">
              Florence Scovel Shinn taught that <strong>your words have creative power</strong>. The game of life is won by 
              those who speak words of faith, love, and abundance. These powerful affirmations, based on her timeless wisdom, 
              can transform your reality when spoken with feeling and conviction.
            </p>
            <div className="bg-white/70 p-4 rounded-lg">
              <p className="text-violet-800 text-sm font-semibold mb-2">🎯 How to Use These Affirmations:</p>
              <ul className="text-violet-700 text-xs space-y-1">
                <li>• Speak them out loud with feeling and conviction</li>
                <li>• Say them in the morning and before bed</li>
                <li>• Believe they are already true as you speak them</li>
                <li>• Write them down and place them where you'll see them</li>
                <li>• Feel the emotion of already having what you desire</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Selection */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {AFFIRMATION_CATEGORIES.map((category) => {
          const Icon = category.icon;
          const isActive = selectedCategory.id === category.id;
          return (
            <Button
              key={category.id}
              onClick={() => setSelectedCategory(category)}
              className={`h-auto py-4 flex flex-col items-center space-y-2 transition-all border-2 ${
                isActive 
                  ? getActiveColorClasses(category.color)
                  : getColorClasses(category.color)
              }`}
              variant="outline"
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-semibold text-center">{category.title}</span>
            </Button>
          );
        })}
      </div>

      {/* Affirmations Display */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          {React.createElement(selectedCategory.icon, { className: 'w-6 h-6' })}
          {selectedCategory.title} Affirmations
        </h3>
        
        {selectedCategory.affirmations.map((affirmation, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-200 border-violet-100">
            <CardContent className="pt-5">
              <div className="flex items-start justify-between gap-4">
                <p className="text-gray-800 leading-relaxed flex-1 text-base">
                  "{affirmation}"
                </p>
                <Button
                  onClick={() => copyToClipboard(affirmation, index)}
                  variant="ghost"
                  size="sm"
                  className="flex-shrink-0 text-violet-600 hover:text-violet-700 hover:bg-violet-50"
                  title="Copy affirmation"
                >
                  {copiedIndex === index ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Florence's Core Teachings */}
      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="text-lg text-purple-800">📖 Florence's Core Teachings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-white/70 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">The Game of Life is a Game of Boomerangs</h4>
              <p className="text-purple-700 text-sm">
                Your thoughts, words, and actions come back to you. Speak only what you wish to experience.
              </p>
            </div>
            
            <div className="bg-white/70 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">The Power of the Spoken Word</h4>
              <p className="text-purple-700 text-sm">
                Words and thoughts are a tremendous vibratory force, ever molding your body and affairs. 
                Speak your word knowing it has power.
              </p>
            </div>
            
            <div className="bg-white/70 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">Divine Design vs. Selfish Design</h4>
              <p className="text-purple-700 text-sm">
                Release your ego's limited plans and ask for your Divine Design. The Divine Design is always perfect 
                and far better than you could imagine.
              </p>
            </div>

            <div className="bg-white/70 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">The Law of Non-Resistance</h4>
              <p className="text-purple-700 text-sm">
                Resist nothing. What you resist persists. Instead, bless the situation and it will dissolve. 
                "None of these things move me" is a powerful statement.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Treatment */}
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="pt-6">
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-amber-800">⚡ Quick Treatment for Any Situation</h3>
            <p className="text-amber-700 text-base italic leading-relaxed">
              "Infinite Spirit, I cast this burden upon you. The Divine Design of my life now takes shape 
              in definite, concrete experiences leading to my heart's desire. I am under direct inspiration, 
              and I now move forward fearlessly, guided and protected. All things work together for good, 
              for I love the Lord and am called according to His purpose."
            </p>
            <p className="text-amber-600 text-xs">
              💡 Use this whenever you feel stuck, worried, or uncertain. Speak it with conviction and let it go.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
