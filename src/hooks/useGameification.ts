import { useState, useEffect } from 'react';
import { User, Badge, ModuleProgress, QuizResult } from '@/types';
import { supabase } from '@/integrations/supabase/client';

const STORAGE_KEY = 'health-education-user';

const DEFAULT_BADGES: Badge[] = [
  { id: 'first-steps', name: 'First Steps', description: 'Complete your first module', icon: '🌟', unlockedAt: new Date() },
  { id: 'nutrition-expert', name: 'Nutrition Expert', description: 'Master the nutrition module', icon: '🍎', unlockedAt: new Date() },
  { id: 'fitness-enthusiast', name: 'Fitness Enthusiast', description: 'Complete the physical activity module', icon: '💪', unlockedAt: new Date() },
  { id: 'sugar-aware', name: 'Sugar Aware', description: 'Learn about hidden sugars', icon: '🚫', unlockedAt: new Date() },
  { id: 'habit-builder', name: 'Habit Builder', description: 'Master healthy habit formation', icon: '🎯', unlockedAt: new Date() },
  { id: 'obesity-aware', name: 'Health Guardian', description: 'Understand obesity prevention', icon: '❤️', unlockedAt: new Date() },
  { id: 'perfect-score', name: 'Perfect Score', description: 'Get 100% on any quiz', icon: '🏆', unlockedAt: new Date() },
  { id: 'dedicated-learner', name: 'Dedicated Learner', description: 'Complete all modules', icon: '🎓', unlockedAt: new Date() }
];

const DEFAULT_USER: User = {
  id: 'demo-user',
  name: 'Demo Learner',
  email: 'demo@example.com',
  points: 0,
  badges: [],
  completedModules: [],
  moduleProgress: {}
};

export function useGameification() {
  const [user, setUser] = useState<User>(DEFAULT_USER);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      // Check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // Fallback to localStorage for demo users
        const savedUser = localStorage.getItem(STORAGE_KEY);
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
        setLoading(false);
        return;
      }

      const userId = session.user.id;
      
      // Load user profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      // Load user progress
      const { data: progressData } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId);

      // Load user badges
      const { data: badgesData } = await supabase
        .from('user_badges')
        .select('*')
        .eq('user_id', userId);

      // Calculate points and progress
      const totalPoints = progressData?.reduce((sum, p) => sum + p.points_earned, 0) || 0;
      const completedModules = progressData?.filter(p => p.completed).map(p => p.module_id) || [];
      
      const moduleProgress: Record<string, ModuleProgress> = {};
      progressData?.forEach(p => {
        moduleProgress[p.module_id] = {
          completed: p.completed,
          score: p.score,
          attempts: p.attempts,
          lastAttempt: p.last_attempt ? new Date(p.last_attempt) : undefined
        };
      });

      const badges: Badge[] = badgesData?.map(b => ({
        id: b.badge_id,
        name: b.badge_name,
        description: b.badge_description,
        icon: b.badge_icon,
        unlockedAt: new Date(b.unlocked_at)
      })) || [];

      setUser({
        id: userId,
        name: profile?.display_name || session.user.email?.split('@')[0] || 'User',
        email: session.user.email || '',
        points: totalPoints,
        badges,
        completedModules,
        moduleProgress
      });
    } catch (error) {
      console.error('Error loading user data:', error);
      // Fallback to localStorage
      const savedUser = localStorage.getItem(STORAGE_KEY);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } finally {
      setLoading(false);
    }
  };

  const saveUser = async (updatedUser: User) => {
    setUser(updatedUser);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // Fallback to localStorage for demo users
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
        return;
      }
      // Data will be saved through completeQuiz function to Supabase
    } catch (error) {
      console.error('Error saving user data:', error);
      // Fallback to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
    }
  };

  const completeQuiz = async (moduleId: string, result: QuizResult) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // Fallback to localStorage for demo users
        const updatedUser = { ...user };
        updatedUser.points += result.pointsEarned;
        updatedUser.moduleProgress[moduleId] = {
          completed: result.passed,
          score: result.score,
          attempts: (updatedUser.moduleProgress[moduleId]?.attempts || 0) + 1,
          lastAttempt: new Date()
        };
        if (result.passed && !updatedUser.completedModules.includes(moduleId)) {
          updatedUser.completedModules.push(moduleId);
        }
        const newBadges = checkForNewBadges(updatedUser, moduleId, result);
        updatedUser.badges = [...updatedUser.badges, ...newBadges];
        await saveUser(updatedUser);
        return newBadges;
      }

      const userId = session.user.id;
      
      // Upsert user progress
      const { error: progressError } = await supabase
        .from('user_progress')
        .upsert({
          user_id: userId,
          module_id: moduleId,
          completed: result.passed,
          score: result.score,
          total_questions: result.totalQuestions,
          attempts: (user.moduleProgress[moduleId]?.attempts || 0) + 1,
          points_earned: result.pointsEarned,
          last_attempt: new Date().toISOString()
        });

      if (progressError) throw progressError;

      // Award and save badges
      const updatedUser = { ...user };
      updatedUser.points += result.pointsEarned;
      updatedUser.moduleProgress[moduleId] = {
        completed: result.passed,
        score: result.score,
        attempts: (updatedUser.moduleProgress[moduleId]?.attempts || 0) + 1,
        lastAttempt: new Date()
      };
      if (result.passed && !updatedUser.completedModules.includes(moduleId)) {
        updatedUser.completedModules.push(moduleId);
      }
      
      const newBadges = checkForNewBadges(updatedUser, moduleId, result);
      
      // Save new badges to Supabase
      for (const badge of newBadges) {
        await supabase.from('user_badges').insert({
          user_id: userId,
          badge_id: badge.id,
          badge_name: badge.name,
          badge_description: badge.description,
          badge_icon: badge.icon,
          unlocked_at: new Date().toISOString()
        });
      }
      
      updatedUser.badges = [...updatedUser.badges, ...newBadges];
      setUser(updatedUser);
      
      return newBadges;
    } catch (error) {
      console.error('Error completing quiz:', error);
      // Fallback to localStorage
      const updatedUser = { ...user };
      updatedUser.points += result.pointsEarned;
      updatedUser.moduleProgress[moduleId] = {
        completed: result.passed,
        score: result.score,
        attempts: (updatedUser.moduleProgress[moduleId]?.attempts || 0) + 1,
        lastAttempt: new Date()
      };
      if (result.passed && !updatedUser.completedModules.includes(moduleId)) {
        updatedUser.completedModules.push(moduleId);
      }
      const newBadges = checkForNewBadges(updatedUser, moduleId, result);
      updatedUser.badges = [...updatedUser.badges, ...newBadges];
      await saveUser(updatedUser);
      return newBadges;
    }
  };

  const checkForNewBadges = (userData: User, moduleId: string, result: QuizResult): Badge[] => {
    const newBadges: Badge[] = [];
    const existingBadgeIds = userData.badges.map(b => b.id);

    // First Steps badge
    if (userData.completedModules.length === 0 && result.passed && !existingBadgeIds.includes('first-steps')) {
      newBadges.push(DEFAULT_BADGES.find(b => b.id === 'first-steps')!);
    }

    // Module-specific badges
    const moduleMapBadges = {
      'nutrition': 'nutrition-expert',
      'physical-activity': 'fitness-enthusiast',
      'sugar-salt-awareness': 'sugar-aware',
      'healthy-habits': 'habit-builder',
      'understanding-obesity': 'obesity-aware'
    };

    const moduleBadgeId = moduleMapBadges[moduleId as keyof typeof moduleMapBadges];
    if (moduleBadgeId && result.passed && !existingBadgeIds.includes(moduleBadgeId)) {
      newBadges.push(DEFAULT_BADGES.find(b => b.id === moduleBadgeId)!);
    }

    // Perfect score badge
    if (result.score === result.totalQuestions && !existingBadgeIds.includes('perfect-score')) {
      newBadges.push(DEFAULT_BADGES.find(b => b.id === 'perfect-score')!);
    }

    // Dedicated learner badge (all modules completed)
    const completedCount = userData.completedModules.length + (result.passed ? 1 : 0);
    if (completedCount === 5 && !existingBadgeIds.includes('dedicated-learner')) {
      newBadges.push(DEFAULT_BADGES.find(b => b.id === 'dedicated-learner')!);
    }

    return newBadges;
  };

  const resetProgress = () => {
    setUser(DEFAULT_USER);
    localStorage.removeItem(STORAGE_KEY);
  };

  const getProgressPercentage = () => {
    return Math.round((user.completedModules.length / 5) * 100);
  };

  return {
    user,
    loading,
    completeQuiz,
    resetProgress,
    getProgressPercentage,
    loadUserData
  };
}