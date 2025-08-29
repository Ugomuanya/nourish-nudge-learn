import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { challenges, Challenge } from '@/data/challenges';
import { useToast } from '@/hooks/use-toast';

export interface UserChallenge {
  id: string;
  challengeId: string;
  startedAt: Date;
  completedAt?: Date;
  progress: any;
  isCompleted: boolean;
  pointsEarned: number;
}

export function useChallenges() {
  const [userChallenges, setUserChallenges] = useState<UserChallenge[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadUserChallenges();
  }, []);

  const loadUserChallenges = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // Load from localStorage for demo users
        const saved = localStorage.getItem('user-challenges');
        if (saved) {
          const parsed = JSON.parse(saved);
          setUserChallenges(parsed.map((c: any) => ({
            ...c,
            startedAt: new Date(c.startedAt),
            completedAt: c.completedAt ? new Date(c.completedAt) : undefined
          })));
        }
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('user_challenges')
        .select('*')
        .eq('user_id', session.user.id);

      if (error) throw error;

      const userChallenges = data?.map(item => ({
        id: item.id,
        challengeId: item.challenge_id,
        startedAt: new Date(item.started_at),
        completedAt: item.completed_at ? new Date(item.completed_at) : undefined,
        progress: item.progress || {},
        isCompleted: item.is_completed || false,
        pointsEarned: item.points_earned || 0
      })) || [];

      setUserChallenges(userChallenges);
    } catch (error) {
      console.error('Error loading challenges:', error);
      toast({
        title: "Error",
        description: "Failed to load challenges",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const startChallenge = async (challengeId: string) => {
    try {
      const challenge = challenges.find(c => c.id === challengeId);
      if (!challenge) return;

      // Check if already started today
      const existing = userChallenges.find(uc => 
        uc.challengeId === challengeId && 
        isToday(uc.startedAt) &&
        !uc.isCompleted
      );
      
      if (existing) {
        toast({
          title: "Challenge Active",
          description: "You've already started this challenge today!",
          variant: "default"
        });
        return;
      }

      const newUserChallenge: UserChallenge = {
        id: crypto.randomUUID(),
        challengeId,
        startedAt: new Date(),
        progress: getInitialProgress(challenge),
        isCompleted: false,
        pointsEarned: 0
      };

      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        const { error } = await supabase
          .from('user_challenges')
          .insert({
            id: newUserChallenge.id,
            user_id: session.user.id,
            challenge_id: challengeId,
            challenge_type: challenge.category,
            started_at: newUserChallenge.startedAt.toISOString(),
            progress: newUserChallenge.progress
          });

        if (error) throw error;
      } else {
        // Save to localStorage for demo users
        const updated = [...userChallenges, newUserChallenge];
        setUserChallenges(updated);
        localStorage.setItem('user-challenges', JSON.stringify(updated));
      }

      setUserChallenges(prev => [...prev, newUserChallenge]);
      
      toast({
        title: "Challenge Started!",
        description: `You've started the ${challenge.title} challenge.`,
      });

    } catch (error) {
      console.error('Error starting challenge:', error);
      toast({
        title: "Error",
        description: "Failed to start challenge",
        variant: "destructive"
      });
    }
  };

  const updateChallengeProgress = async (userChallengeId: string, progress: any) => {
    try {
      const userChallenge = userChallenges.find(uc => uc.id === userChallengeId);
      if (!userChallenge) return;

      const challenge = challenges.find(c => c.id === userChallenge.challengeId);
      if (!challenge) return;

      const isCompleted = checkIfCompleted(challenge, progress);
      const pointsEarned = isCompleted ? challenge.points : 0;

      const updatedChallenge = {
        ...userChallenge,
        progress,
        isCompleted,
        pointsEarned,
        completedAt: isCompleted ? new Date() : undefined
      };

      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        const { error } = await supabase
          .from('user_challenges')
          .update({
            progress,
            is_completed: isCompleted,
            points_earned: pointsEarned,
            completed_at: isCompleted ? new Date().toISOString() : null
          })
          .eq('id', userChallengeId);

        if (error) throw error;
      } else {
        // Update localStorage for demo users
        const updated = userChallenges.map(uc => 
          uc.id === userChallengeId ? updatedChallenge : uc
        );
        setUserChallenges(updated);
        localStorage.setItem('user-challenges', JSON.stringify(updated));
      }

      setUserChallenges(prev => 
        prev.map(uc => uc.id === userChallengeId ? updatedChallenge : uc)
      );

      if (isCompleted && !userChallenge.isCompleted) {
        toast({
          title: "Challenge Completed! 🎉",
          description: `${challenge.feedback} You earned ${pointsEarned} points!`,
        });
      }

    } catch (error) {
      console.error('Error updating challenge progress:', error);
      toast({
        title: "Error",
        description: "Failed to update progress",
        variant: "destructive"
      });
    }
  };

  const getInitialProgress = (challenge: Challenge) => {
    switch (challenge.interactionType) {
      case 'counter':
        return { count: 0, target: challenge.targetCount || 1 };
      case 'timer':
        return { seconds: 0, target: challenge.maxValue || 600 };
      case 'checklist':
        return { items: [], completed: [] };
      default:
        return { completed: false };
    }
  };

  const checkIfCompleted = (challenge: Challenge, progress: any) => {
    switch (challenge.interactionType) {
      case 'simple':
        return progress.completed === true;
      case 'counter':
        return progress.count >= (challenge.targetCount || 1);
      case 'timer':
        return progress.seconds >= (challenge.maxValue || 600);
      case 'checklist':
        return progress.completed.length >= progress.items.length;
      default:
        return false;
    }
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const getTodaysChallenges = () => {
    return userChallenges.filter(uc => isToday(uc.startedAt));
  };

  const getAvailableChallenges = () => {
    const startedToday = getTodaysChallenges().map(uc => uc.challengeId);
    return challenges.filter(c => !startedToday.includes(c.id));
  };

  const getCompletedChallenges = () => {
    return userChallenges.filter(uc => uc.isCompleted);
  };

  const getTotalPoints = () => {
    return userChallenges.reduce((total, uc) => total + uc.pointsEarned, 0);
  };

  return {
    userChallenges,
    loading,
    startChallenge,
    updateChallengeProgress,
    getTodaysChallenges,
    getAvailableChallenges,
    getCompletedChallenges,
    getTotalPoints,
    loadUserChallenges
  };
}