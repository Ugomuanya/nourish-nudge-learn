import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Layout } from '@/components/Layout';
import { useGameification } from '@/hooks/useGameification';
import { modules } from '@/data/modules';
import { Trophy, Award, BookOpen, RotateCcw, Star, Calendar } from 'lucide-react';

const Profile = () => {
  const { user, resetProgress, getProgressPercentage, loading } = useGameification();
  const progressPercentage = getProgressPercentage();

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all progress? This action cannot be undone.')) {
      resetProgress();
    }
  };

  const getModuleProgress = (moduleId: string) => {
    return user.moduleProgress[moduleId];
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(date));
  };

  return (
    <Layout>
      {loading ? (
        <div className="container mx-auto px-4 py-12 text-center">
          <p>Loading user profile...</p>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{user.name}</h1>
            <p className="text-xl text-muted-foreground">{user.email}</p>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="text-center">
              <CardHeader className="pb-2">
                <CardTitle className="text-3xl font-bold text-primary">{user.points}</CardTitle>
                <CardDescription>Total Points</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center">
              <CardHeader className="pb-2">
                <CardTitle className="text-3xl font-bold text-secondary">{user.badges.length}</CardTitle>
                <CardDescription>Badges Earned</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center">
              <CardHeader className="pb-2">
                <CardTitle className="text-3xl font-bold text-accent">{user.completedModules.length}</CardTitle>
                <CardDescription>Modules Completed</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center">
              <CardHeader className="pb-2">
                <CardTitle className="text-3xl font-bold text-success">{progressPercentage}%</CardTitle>
                <CardDescription>Overall Progress</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Progress Section */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overall Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Learning Progress
                  </CardTitle>
                  <CardDescription>
                    Your journey through the health education modules
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Overall Completion</span>
                      <span className="text-muted-foreground">{progressPercentage}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-3" />
                  </div>

                  {/* Module Progress */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Module Progress</h3>
                    {modules.map((module) => {
                      const progress = getModuleProgress(module.id);
                      const isCompleted = user.completedModules.includes(module.id);
                      
                      return (
                        <div key={module.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-medium">{module.title}</h4>
                              {isCompleted && (
                                <Badge variant="default" className="bg-success text-success-foreground">
                                  Completed
                                </Badge>
                              )}
                            </div>
                            {progress && (
                              <div className="space-y-1">
                                <div className="flex justify-between text-sm text-muted-foreground">
                                  <span>Score: {progress.score}/{module.quiz.questions.length}</span>
                                  <span>Attempts: {progress.attempts}</span>
                                </div>
                                {progress.lastAttempt && (
                                  <p className="text-xs text-muted-foreground">
                                    Last attempt: {formatDate(progress.lastAttempt)}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                          <Button asChild variant="outline" size="sm">
                            <Link to={`/module/${module.id}`}>
                              {isCompleted ? 'Review' : 'Start'}
                            </Link>
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Badges Section */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Achievements
                  </CardTitle>
                  <CardDescription>
                    Badges you've earned on your learning journey
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {user.badges.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                      {user.badges.map((badge) => (
                        <div
                          key={badge.id}
                          className="flex flex-col items-center text-center p-4 border rounded-lg bg-gradient-card"
                        >
                          <div className="text-3xl mb-2">{badge.icon}</div>
                          <h3 className="font-semibold text-sm mb-1">{badge.name}</h3>
                          <p className="text-xs text-muted-foreground mb-2">{badge.description}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(badge.unlockedAt)}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Complete modules to earn your first badges!
                      </p>
                      <Button asChild className="mt-4">
                        <Link to="/modules">Start Learning</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button asChild className="w-full" variant="outline">
                    <Link to="/modules">Continue Learning</Link>
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full text-destructive hover:text-destructive"
                    onClick={handleReset}
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset Progress
                  </Button>
                </CardContent>
              </Card>

              {/* Motivational Section */}
              {progressPercentage < 100 && (
                <Card className="bg-gradient-primary text-white">
                  <CardHeader>
                    <CardTitle>Keep Going! 💪</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/90 mb-4">
                      You're {progressPercentage}% through your health education journey. 
                      Every module completed brings you closer to a healthier lifestyle!
                    </p>
                    <Button asChild variant="secondary" className="w-full">
                      <Link to="/modules">Continue Learning</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}

              {progressPercentage === 100 && (
                <Card className="bg-gradient-hero text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5" />
                      Congratulations! 🎉
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/90 mb-4">
                      You've completed all modules and mastered the fundamentals of healthy living. 
                      Well done on your dedication to learning!
                    </p>
                    <Button asChild variant="secondary" className="w-full">
                      <Link to="/modules">Review Modules</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Profile;