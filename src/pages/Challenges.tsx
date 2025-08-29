import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useChallenges } from '@/hooks/useChallenges';
import { challenges, Challenge } from '@/data/challenges';
import { Play, Check, Clock, Target, Trophy, Zap } from 'lucide-react';

const Challenges = () => {
  const {
    loading,
    startChallenge,
    updateChallengeProgress,
    getTodaysChallenges,
    getAvailableChallenges,
    getCompletedChallenges,
    getTotalPoints
  } = useChallenges();

  const [activeTab, setActiveTab] = useState('today');

  const todaysChallenges = getTodaysChallenges();
  const availableChallenges = getAvailableChallenges();
  const completedChallenges = getCompletedChallenges();
  const totalPoints = getTotalPoints();

  const handleStartChallenge = (challengeId: string) => {
    startChallenge(challengeId);
  };

  const handleProgressUpdate = (userChallengeId: string, progress: any) => {
    updateChallengeProgress(userChallengeId, progress);
  };

  const renderChallengeCard = (challenge: Challenge, userChallenge?: any) => {
    const isActive = !!userChallenge;
    const isCompleted = userChallenge?.isCompleted;

    return (
      <Card key={challenge.id} className="relative overflow-hidden">
        <div className={`absolute top-0 left-0 w-1 h-full ${challenge.color}`} />
        
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="text-2xl">{challenge.icon}</div>
              <div>
                <CardTitle className="text-lg">{challenge.title}</CardTitle>
                <CardDescription className="text-sm">{challenge.description}</CardDescription>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-1">
              <Badge variant={
                challenge.difficulty === 'easy' ? 'secondary' : 
                challenge.difficulty === 'medium' ? 'default' : 'destructive'
              }>
                {challenge.difficulty}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Trophy className="h-3 w-3" />
                <span>{challenge.points} pts</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="text-sm">
            <p className="font-medium mb-1">Task:</p>
            <p className="text-muted-foreground">{challenge.task}</p>
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{challenge.estimatedTime}</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {challenge.category}
            </Badge>
          </div>

          {isActive && !isCompleted && (
            <ChallengeInteraction 
              challenge={challenge}
              userChallenge={userChallenge}
              onProgressUpdate={handleProgressUpdate}
            />
          )}

          {isCompleted && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 text-green-700 font-medium text-sm mb-1">
                <Check className="h-4 w-4" />
                Challenge Completed!
              </div>
              <p className="text-green-600 text-xs">{challenge.feedback}</p>
            </div>
          )}

          {!isActive && !isCompleted && (
            <Button 
              onClick={() => handleStartChallenge(challenge.id)}
              className="w-full"
              variant="outline"
            >
              <Play className="h-4 w-4 mr-2" />
              Start Challenge
            </Button>
          )}
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <p>Loading challenges...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Daily Challenges</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Take on interactive challenges that promote real-world behavior change
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <Card className="text-center">
              <CardContent className="pt-4">
                <div className="text-2xl font-bold text-primary">{totalPoints}</div>
                <div className="text-sm text-muted-foreground">Total Points</div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-4">
                <div className="text-2xl font-bold text-secondary">{todaysChallenges.length}</div>
                <div className="text-sm text-muted-foreground">Today's Challenges</div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-4">
                <div className="text-2xl font-bold text-green-600">{completedChallenges.length}</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Challenge Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="today">Today's Challenges</TabsTrigger>
            <TabsTrigger value="available">Available</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="mt-6">
            {todaysChallenges.length > 0 ? (
              <div className="grid gap-6">
                {todaysChallenges.map(userChallenge => {
                  const challenge = challenges.find(c => c.id === userChallenge.challengeId);
                  return challenge ? renderChallengeCard(challenge, userChallenge) : null;
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <Zap className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Active Challenges</h3>
                <p className="text-muted-foreground mb-4">
                  Start some challenges from the Available tab to begin your journey!
                </p>
                <Button onClick={() => setActiveTab('available')}>
                  Browse Challenges
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="available" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              {availableChallenges.map(challenge => renderChallengeCard(challenge))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            {completedChallenges.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {completedChallenges.map(userChallenge => {
                  const challenge = challenges.find(c => c.id === userChallenge.challengeId);
                  return challenge ? renderChallengeCard(challenge, userChallenge) : null;
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Completed Challenges</h3>
                <p className="text-muted-foreground">
                  Complete your first challenge to see it here!
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

// Challenge Interaction Component
const ChallengeInteraction = ({ challenge, userChallenge, onProgressUpdate }: {
  challenge: Challenge;
  userChallenge: any;
  onProgressUpdate: (id: string, progress: any) => void;
}) => {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const handleSimpleComplete = () => {
    onProgressUpdate(userChallenge.id, { completed: true });
  };

  const handleCounterIncrement = () => {
    const newCount = (userChallenge.progress.count || 0) + 1;
    onProgressUpdate(userChallenge.id, {
      ...userChallenge.progress,
      count: newCount
    });
  };

  const handleTimerStart = () => {
    if (isRunning) return;
    
    setIsRunning(true);
    const startTime = Date.now() - (timeElapsed * 1000);
    
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setTimeElapsed(elapsed);
      
      if (elapsed >= (challenge.maxValue || 600)) {
        setIsRunning(false);
        clearInterval(interval);
        onProgressUpdate(userChallenge.id, {
          ...userChallenge.progress,
          seconds: elapsed
        });
      }
    }, 1000);

    // Store interval ID to clear later if needed
    (window as any).challengeInterval = interval;
  };

  const handleTimerStop = () => {
    setIsRunning(false);
    if ((window as any).challengeInterval) {
      clearInterval((window as any).challengeInterval);
    }
    onProgressUpdate(userChallenge.id, {
      ...userChallenge.progress,
      seconds: timeElapsed
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  switch (challenge.interactionType) {
    case 'simple':
      return (
        <Button onClick={handleSimpleComplete} className="w-full">
          <Check className="h-4 w-4 mr-2" />
          Mark as Complete
        </Button>
      );

    case 'counter':
      const currentCount = userChallenge.progress.count || 0;
      const targetCount = challenge.targetCount || 1;
      const progress = (currentCount / targetCount) * 100;
      
      return (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span>Progress: {currentCount}/{targetCount}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <Button 
            onClick={handleCounterIncrement} 
            className="w-full"
            disabled={currentCount >= targetCount}
          >
            <Target className="h-4 w-4 mr-2" />
            {currentCount >= targetCount ? 'Completed!' : `Add One (${currentCount + 1}/${targetCount})`}
          </Button>
        </div>
      );

    case 'timer':
      const targetSeconds = challenge.maxValue || 600;
      const timerProgress = (timeElapsed / targetSeconds) * 100;
      
      return (
        <div className="space-y-3">
          <div className="text-center">
            <div className="text-2xl font-mono font-bold">
              {formatTime(timeElapsed)} / {formatTime(targetSeconds)}
            </div>
            <Progress value={timerProgress} className="h-2 mt-2" />
          </div>
          <div className="flex gap-2">
            {!isRunning ? (
              <Button onClick={handleTimerStart} className="flex-1">
                <Play className="h-4 w-4 mr-2" />
                Start Timer
              </Button>
            ) : (
              <Button onClick={handleTimerStop} variant="outline" className="flex-1">
                <Clock className="h-4 w-4 mr-2" />
                Stop Timer
              </Button>
            )}
          </div>
        </div>
      );

    default:
      return null;
  }
};

export default Challenges;