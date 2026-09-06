import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Sparkles, Moon, Eye, Crown, Wand2, Heart, Brain, Copy, Check } from 'lucide-react';

const TECHNIQUE_CATEGORIES = [
  {
    id: 'iam',
    title: 'I AM Affirmations',
    icon: Crown,
    color: 'purple',
    description: 'The power of I AM - your true identity',
    affirmations: [
      "I AM wealthy. I AM abundant. I AM successful.",
      "I AM healthy. I AM strong. I AM vibrant.",
      "I AM loved. I AM cherished. I AM adored.",
      "I AM powerful. I AM confident. I AM unstoppable.",
      "I AM living my ideal life now.",
      "I AM that I AM - the creator of my reality."
    ]
  },
  {
    id: 'sats',
    title: 'SATS Visualizations',
    icon: Moon,
    color: 'indigo',
    description: 'State Akin To Sleep - the golden gateway',
    scripts: [
      {
        title: "Wealth & Abundance",
        script: "Tonight as you drift to sleep, feel yourself in your ideal financial state. See your bank account with your desired balance. Feel the relief, the security, the freedom. Touch the things you've purchased. Feel the weight of financial abundance as a living reality. Fall asleep in this feeling."
      },
      {
        title: "Perfect Health",
        script: "As you enter the drowsy state, feel your body as perfectly healthy. Move your imaginal body with ease and vitality. Hear loved ones congratulating you on your radiant health. Feel the joy of complete wellbeing. Assume the feeling of perfect health and carry it into sleep."
      },
      {
        title: "Ideal Relationship",
        script: "In the state akin to sleep, feel the presence of your ideal partner beside you. Hear them say 'I love you.' Feel their touch, their warmth. Experience the reality of mutual love and devotion. Fall asleep in the feeling of your wish fulfilled."
      },
      {
        title: "Career Success",
        script: "Tonight, imagine you're already in your ideal career. Feel yourself doing work you love. Hear congratulations on your success. See the evidence of your achievement. Feel the satisfaction and fulfillment. Sleep in the assumption of your success."
      }
    ]
  },
  {
    id: 'living',
    title: 'Living in the End',
    icon: Eye,
    color: 'cyan',
    description: 'Assume the feeling of the wish fulfilled',
    practices: [
      {
        title: "The Bridge of Incidents",
        practice: "Don't worry about HOW it will happen. Simply live from the end result as if it's already done. The bridge of incidents will unfold naturally. Your only job is to maintain the assumption that it is finished."
      },
      {
        title: "Act As If",
        practice: "Throughout your day, think from the end, not of the end. If you desired wealth, you wouldn't think 'I want to be wealthy' - you'd think 'What should I do with all this wealth?' Live in the assumption it's already yours."
      },
      {
        title: "The Sabbath",
        practice: "After assuming your wish fulfilled, rest. Let go completely. The Sabbath is the interval between assumption and fulfillment. Trust the process. Know that it is done. Cease from labor and let the seed grow."
      },
      {
        title: "Persist in the Assumption",
        practice: "If circumstances seem contrary, persist! Don't deny what your senses show you, but know that your assumption will harden into fact. Persist in your new state regardless of what the outer world shows."
      }
    ]
  },
  {
    id: 'revision',
    title: 'Revision Technique',
    icon: Wand2,
    color: 'emerald',
    description: 'Rewrite the past to change the present',
    steps: [
      {
        title: "Identify the Event",
        instruction: "Choose an event from your day that you wish had gone differently. It could be a conversation, a missed opportunity, or any unwanted experience."
      },
      {
        title: "Relax Deeply",
        instruction: "Close your eyes and enter a relaxed, drowsy state. This is when the subconscious is most receptive to impression."
      },
      {
        title: "Replay It Perfectly",
        instruction: "In your imagination, replay the event exactly as you wish it had happened. See it vividly. Hear the words. Feel the emotions of the desired outcome."
      },
      {
        title: "Feel It Real",
        instruction: "Make it feel more real than the actual event. Engage all your senses. Experience the joy, relief, or satisfaction of the revised event."
      },
      {
        title: "Accept the Revision",
        instruction: "Accept this revised version as the true event. Your subconscious doesn't know the difference between 'real' and imagined. The revision becomes your new reality."
      },
      {
        title: "Watch It Manifest",
        instruction: "The revised event will influence your present and future. You'll notice circumstances aligning with your revision. Past, present, and future are one."
      }
    ]
  },
  {
    id: 'feeling',
    title: 'Feeling is the Secret',
    icon: Heart,
    color: 'rose',
    description: 'The emotion is the power that manifests',
    teachings: [
      {
        principle: "Feeling Creates Reality",
        explanation: "It's not the thoughts or words, but the FEELING behind them that creates. You must feel yourself into the state of your wish fulfilled. Feeling is the secret ingredient that brings thoughts to life."
      },
      {
        principle: "Sleep Impressed",
        explanation: "The feeling you fall asleep in is crucial. As you drift off, you're impressing your subconscious. This is why Neville emphasized: 'In a state akin to sleep, assume the feeling of your wish fulfilled and sleep in that assumption.'"
      },
      {
        principle: "Assumption Hardens Into Fact",
        explanation: "When you persist in feeling a state as real, despite outer evidence, that assumption will harden into fact. Time may vary, but persistence in the feeling guarantees manifestation."
      },
      {
        principle: "Change the Feeling, Change the Future",
        explanation: "Your future is simply your present state extended. Change your feeling NOW, and you change your future. Don't wait for circumstances to feel good - feel good to change circumstances."
      }
    ]
  },
  {
    id: 'consciousness',
    title: 'Consciousness is the Only Reality',
    icon: Brain,
    color: 'violet',
    description: 'Everything comes from consciousness',
    principles: [
      {
        title: "Imagination Creates Reality",
        text: "Your imagination is not fantasy - it's the workshop of God within you. What you imagine with feeling MUST manifest. Imagination is the true reality, and the 3D world is its shadow."
      },
      {
        title: "Everyone is You Pushed Out",
        text: "The people in your life are reflections of your consciousness. Change your conception of them, and they must change. No one can come into your experience without your consciousness creating them there."
      },
      {
        title: "There is No One to Change But Self",
        text: "Stop trying to change others or circumstances. Change your conception of self and everything changes. You are the operant power. The world is yourself pushed out."
      },
      {
        title: "Assume the State and It Will Externalize",
        text: "Don't look for signs or try to make it happen. Simply assume the state of your wish fulfilled and maintain it. The externalization is automatic. Creation is finished - you're just selecting the state."
      },
      {
        title: "The Present Moment is All",
        text: "There is no past or future - only NOW. Change your state NOW and the 'past' and 'future' rearrange themselves to reflect your present consciousness."
      }
    ]
  }
];

export const NevilleGoddard = () => {
  const [selectedCategory, setSelectedCategory] = useState(TECHNIQUE_CATEGORIES[0]);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getColorClasses = (color) => {
    const colors = {
      purple: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100',
      indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100',
      cyan: 'bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100',
      emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100',
      rose: 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100',
      violet: 'bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100'
    };
    return colors[color] || colors.purple;
  };

  const getActiveColorClasses = (color) => {
    const colors = {
      purple: 'bg-purple-500 text-white border-purple-600',
      indigo: 'bg-indigo-500 text-white border-indigo-600',
      cyan: 'bg-cyan-500 text-white border-cyan-600',
      emerald: 'bg-emerald-500 text-white border-emerald-600',
      rose: 'bg-rose-500 text-white border-rose-600',
      violet: 'bg-violet-500 text-white border-violet-600'
    };
    return colors[color] || colors.purple;
  };

  const renderContent = () => {
    const category = selectedCategory;
    
    if (category.affirmations) {
      return (
        <div className="space-y-3">
          {category.affirmations.map((affirmation, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-200 border-purple-100">
              <CardContent className="pt-5">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-gray-800 leading-relaxed flex-1 text-base font-medium">
                    {affirmation}
                  </p>
                  <Button
                    onClick={() => copyToClipboard(affirmation, index)}
                    variant="ghost"
                    size="sm"
                    className="flex-shrink-0 text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                  >
                    {copiedIndex === index ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    if (category.scripts) {
      return (
        <div className="space-y-4">
          {category.scripts.map((item, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-200 border-indigo-100 bg-gradient-to-br from-indigo-50 to-purple-50">
              <CardContent className="pt-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-indigo-800 flex items-center gap-2">
                      <Moon className="w-5 h-5" />
                      {item.title}
                    </h4>
                    <Button
                      onClick={() => copyToClipboard(item.script, index)}
                      variant="ghost"
                      size="sm"
                      className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-100"
                    >
                      {copiedIndex === index ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <p className="text-gray-700 leading-relaxed italic">{item.script}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    if (category.practices) {
      return (
        <div className="space-y-4">
          {category.practices.map((item, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-200 border-cyan-100">
              <CardContent className="pt-5">
                <h4 className="font-bold text-cyan-800 mb-2">{item.title}</h4>
                <p className="text-gray-700 leading-relaxed">{item.practice}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    if (category.steps) {
      return (
        <div className="space-y-4">
          {category.steps.map((step, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-200 border-emerald-100">
              <CardContent className="pt-5">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-emerald-800 mb-2">{step.title}</h4>
                    <p className="text-gray-700 leading-relaxed">{step.instruction}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    if (category.teachings) {
      return (
        <div className="space-y-4">
          {category.teachings.map((item, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-200 border-rose-100 bg-gradient-to-br from-rose-50 to-pink-50">
              <CardContent className="pt-5">
                <h4 className="font-bold text-rose-800 mb-2 flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  {item.principle}
                </h4>
                <p className="text-gray-700 leading-relaxed">{item.explanation}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    if (category.principles) {
      return (
        <div className="space-y-4">
          {category.principles.map((item, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-200 border-violet-100">
              <CardContent className="pt-5">
                <h4 className="font-bold text-violet-800 mb-2">{item.title}</h4>
                <p className="text-gray-700 leading-relaxed">{item.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <Sparkles className="w-6 h-6 text-purple-500" />
        <h2 className="text-2xl font-semibold text-gray-800">Neville Goddard Teachings</h2>
      </div>

      {/* Introduction */}
      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50">
        <CardContent className="pt-6">
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-purple-800">✨ Imagination Creates Reality</h3>
            <p className="text-purple-700 text-sm leading-relaxed">
              Neville Goddard taught that <strong>consciousness is the only reality</strong>. Your imagination is not fantasy - 
              it's the creative power of God within you. What you assume and feel to be true, with persistence, MUST manifest 
              in your 3D reality. These techniques are the keys to deliberate creation.
            </p>
            <div className="bg-white/70 p-4 rounded-lg">
              <p className="text-purple-800 text-sm font-semibold mb-2">🌙 The Core Secret:</p>
              <p className="text-purple-700 text-sm italic">
                "Assume the feeling of your wish fulfilled and continue in that assumption. The assumption, though false, 
                if persisted in, will harden into fact." - Neville Goddard
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Selection */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {TECHNIQUE_CATEGORIES.map((category) => {
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
              <div className="text-center">
                <div className="text-xs font-semibold">{category.title}</div>
                <div className="text-[10px] opacity-75 mt-1">{category.description}</div>
              </div>
            </Button>
          );
        })}
      </div>

      {/* Content Display */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          {React.createElement(selectedCategory.icon, { className: 'w-6 h-6' })}
          {selectedCategory.title}
        </h3>
        <p className="text-gray-600 italic">{selectedCategory.description}</p>
        
        {renderContent()}
      </div>

      {/* Neville's Golden Rule */}
      <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50">
        <CardContent className="pt-6">
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-amber-800 flex items-center gap-2">
              <Crown className="w-6 h-6" />
              Neville's Golden Rule
            </h3>
            <p className="text-amber-700 text-base leading-relaxed italic font-medium">
              "Go to the end. Dwell in the end, and you will hurt no one. Dwell in the end, and you will not aid another. You will 
              simply be the end and that is all you need do. Believe that you are already that which you want to be. Walk as though 
              you were it, and it shall be."
            </p>
            <p className="text-amber-600 text-xs mt-3">
              💫 Live from the end, not towards it. Assume it's already done, and it SHALL be done.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
