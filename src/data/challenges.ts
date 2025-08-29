export interface Challenge {
  id: string;
  title: string;
  description: string;
  task: string;
  feedback: string;
  category: 'nutrition' | 'hydration' | 'movement' | 'mental-health' | 'sleep';
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  points: number;
  icon: string;
  color: string;
  interactionType: 'simple' | 'counter' | 'timer' | 'checklist';
  targetCount?: number;
  maxValue?: number;
}

export const challenges: Challenge[] = [
  // Nutrition Challenges
  {
    id: 'swap-snack',
    title: 'Swap a Snack',
    description: 'Replace one sugary snack with a healthy alternative',
    task: 'Replace one sugary snack today (e.g., chocolate bar) with a piece of fruit or handful of nuts.',
    feedback: "Nice! You just saved 200+ calories and boosted your fiber intake.",
    category: 'nutrition',
    difficulty: 'easy',
    estimatedTime: '2 minutes',
    points: 20,
    icon: '🍎',
    color: 'bg-green-500',
    interactionType: 'simple'
  },
  {
    id: 'veggie-boost',
    title: 'Veggie Boost',
    description: 'Add extra vegetables to your meals',
    task: 'Add an extra serving of vegetables to 2 meals today.',
    feedback: "Excellent! You've increased your nutrient density and fiber intake.",
    category: 'nutrition',
    difficulty: 'easy',
    estimatedTime: '5 minutes',
    points: 25,
    icon: '🥦',
    color: 'bg-green-600',
    interactionType: 'counter',
    targetCount: 2
  },
  {
    id: 'sugar-free-day',
    title: 'Sugar-Free Challenge',
    description: 'Avoid added sugars for the entire day',
    task: 'Go a full day without consuming any added sugars (check labels!).',
    feedback: "Amazing willpower! Your blood sugar levels will thank you.",
    category: 'nutrition',
    difficulty: 'hard',
    estimatedTime: 'All day',
    points: 50,
    icon: '🚫',
    color: 'bg-red-500',
    interactionType: 'simple'
  },

  // Hydration Challenges
  {
    id: 'hydration-tracker',
    title: 'Hydration Tracker',
    description: 'Track your daily water intake',
    task: 'Drink 6–8 glasses of water today. Tap to tick each one off.',
    feedback: "Hydration complete! Your brain and body thank you.",
    category: 'hydration',
    difficulty: 'easy',
    estimatedTime: 'Throughout day',
    points: 30,
    icon: '💧',
    color: 'bg-blue-500',
    interactionType: 'counter',
    targetCount: 8
  },
  {
    id: 'morning-water',
    title: 'Morning Hydration',
    description: 'Start your day with water',
    task: 'Drink a full glass of water within 30 minutes of waking up.',
    feedback: "Perfect start! You've kickstarted your metabolism and hydration.",
    category: 'hydration',
    difficulty: 'easy',
    estimatedTime: '2 minutes',
    points: 15,
    icon: '🌅',
    color: 'bg-blue-400',
    interactionType: 'simple'
  },

  // Movement Challenges
  {
    id: 'ten-minute-move',
    title: '10-Minute Move',
    description: 'Quick movement break',
    task: 'Do a quick 10-minute movement break — walk, stretch, or dance.',
    feedback: "Movement unlocks motivation. Keep going!",
    category: 'movement',
    difficulty: 'easy',
    estimatedTime: '10 minutes',
    points: 25,
    icon: '🏃‍♂️',
    color: 'bg-orange-500',
    interactionType: 'timer',
    maxValue: 600 // 10 minutes in seconds
  },
  {
    id: 'stairs-challenge',
    title: 'Take the Stairs',
    description: 'Choose stairs over elevators',
    task: 'Take the stairs instead of elevators/escalators 3 times today.',
    feedback: "Step by step, you're building stronger legs and better health!",
    category: 'movement',
    difficulty: 'easy',
    estimatedTime: '5 minutes',
    points: 20,
    icon: '🪜',
    color: 'bg-orange-600',
    interactionType: 'counter',
    targetCount: 3
  },
  {
    id: 'walking-meeting',
    title: 'Walking Meeting',
    description: 'Turn a call into a walk',
    task: 'Take one phone call or virtual meeting while walking.',
    feedback: "Multi-tasking at its finest! Walking boosts creativity too.",
    category: 'movement',
    difficulty: 'medium',
    estimatedTime: '20-30 minutes',
    points: 35,
    icon: '🚶‍♀️',
    color: 'bg-orange-400',
    interactionType: 'simple'
  },
  {
    id: 'desk-stretches',
    title: 'Desk Stretches',
    description: 'Combat desk fatigue with stretches',
    task: 'Do 5 different desk stretches throughout your workday.',
    feedback: "Your spine and muscles appreciate the relief from sitting!",
    category: 'movement',
    difficulty: 'easy',
    estimatedTime: '10 minutes total',
    points: 20,
    icon: '🧘‍♂️',
    color: 'bg-purple-500',
    interactionType: 'counter',
    targetCount: 5
  },

  // Mental Health Challenges
  {
    id: 'gratitude-practice',
    title: 'Gratitude Practice',
    description: 'Practice daily gratitude',
    task: 'Write down 3 things you\'re grateful for today.',
    feedback: "Gratitude rewires your brain for positivity and better mental health.",
    category: 'mental-health',
    difficulty: 'easy',
    estimatedTime: '5 minutes',
    points: 25,
    icon: '🙏',
    color: 'bg-purple-600',
    interactionType: 'counter',
    targetCount: 3
  },
  {
    id: 'digital-detox',
    title: 'Digital Detox Hour',
    description: 'Take a break from screens',
    task: 'Spend 1 hour without any screens (phone, TV, computer).',
    feedback: "Mental reset complete! Your mind feels clearer already.",
    category: 'mental-health',
    difficulty: 'medium',
    estimatedTime: '1 hour',
    points: 40,
    icon: '📵',
    color: 'bg-indigo-500',
    interactionType: 'timer',
    maxValue: 3600 // 1 hour in seconds
  },
  {
    id: 'breathing-exercise',
    title: 'Deep Breathing',
    description: 'Practice mindful breathing',
    task: 'Do a 5-minute deep breathing exercise (4 seconds in, 4 seconds hold, 4 seconds out).',
    feedback: "Calm restored! Deep breathing activates your relaxation response.",
    category: 'mental-health',
    difficulty: 'easy',
    estimatedTime: '5 minutes',
    points: 20,
    icon: '🌬️',
    color: 'bg-teal-500',
    interactionType: 'timer',
    maxValue: 300 // 5 minutes in seconds
  },

  // Sleep Challenges
  {
    id: 'sleep-schedule',
    title: 'Consistent Sleep',
    description: 'Maintain a regular sleep schedule',
    task: 'Go to bed and wake up at the same time today (within 30 minutes of your target).',
    feedback: "Consistency is key! Your circadian rhythm loves this routine.",
    category: 'sleep',
    difficulty: 'medium',
    estimatedTime: 'Planning',
    points: 35,
    icon: '😴',
    color: 'bg-indigo-600',
    interactionType: 'simple'
  },
  {
    id: 'phone-free-bedroom',
    title: 'Phone-Free Bedroom',
    description: 'Keep devices out of the bedroom',
    task: 'Charge your phone outside the bedroom tonight.',
    feedback: "Sweet dreams! Removing screens improves sleep quality significantly.",
    category: 'sleep',
    difficulty: 'medium',
    estimatedTime: '1 minute setup',
    points: 30,
    icon: '🛏️',
    color: 'bg-violet-500',
    interactionType: 'simple'
  },
  {
    id: 'wind-down-routine',
    title: 'Wind-Down Routine',
    description: 'Create a relaxing bedtime routine',
    task: 'Spend 30 minutes before bed doing relaxing activities (reading, gentle stretching, etc.).',
    feedback: "Perfect preparation for quality sleep! Your body knows it's time to rest.",
    category: 'sleep',
    difficulty: 'easy',
    estimatedTime: '30 minutes',
    points: 25,
    icon: '🕯️',
    color: 'bg-violet-600',
    interactionType: 'timer',
    maxValue: 1800 // 30 minutes in seconds
  }
];