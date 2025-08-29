import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Layout } from '@/components/Layout';
import { useGameification } from '@/hooks/useGameification';
import { modules } from '@/data/modules';
import { CheckCircle, Lock, Play } from 'lucide-react';
import * as Icons from 'lucide-react';

const Modules = () => {
  const { user } = useGameification();

  const getModuleStatus = (moduleId: string) => {
    if (user.completedModules.includes(moduleId)) {
      return 'completed';
    }
    return 'available';
  };

  const getModuleProgress = (moduleId: string) => {
    const progress = user.moduleProgress[moduleId];
    if (!progress) return 0;
    return progress.completed ? 100 : (progress.attempts > 0 ? 50 : 0);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Learning Modules</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Complete interactive modules to learn about nutrition, physical activity, 
            and healthy lifestyle choices. Each module includes educational content and a quiz.
          </p>
        </div>

        {/* Progress Overview */}
        <div className="mb-12 bg-gradient-card rounded-2xl p-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Your Progress</h2>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {user.completedModules.length} / {modules.length} Complete
            </Badge>
          </div>
          <Progress 
            value={(user.completedModules.length / modules.length) * 100} 
            className="h-3"
          />
          <p className="text-muted-foreground mt-2">
            {user.points} points earned • {user.badges.length} badges unlocked
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((module, index) => {
            const status = getModuleStatus(module.id);
            const progress = getModuleProgress(module.id);
            const IconComponent = Icons[module.icon as keyof typeof Icons] as any;
            
            return (
              <Card 
                key={module.id} 
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
                  status === 'completed' 
                    ? 'ring-2 ring-success/20 bg-success/5' 
                    : 'hover:shadow-xl'
                }`}
              >
                <CardHeader className="relative">
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-lg ${
                      status === 'completed' ? 'bg-success/20' : 'bg-primary/10'
                    }`}>
                      {IconComponent && (
                        <IconComponent className={`h-6 w-6 ${
                          status === 'completed' ? 'text-success' : 'text-primary'
                        }`} />
                      )}
                    </div>
                    {status === 'completed' && (
                      <CheckCircle className="h-6 w-6 text-success" />
                    )}
                  </div>
                  
                  <CardTitle className="text-xl mt-4">{module.title}</CardTitle>
                  <CardDescription className="text-base">
                    {module.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Progress Bar */}
                  {progress > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  )}

                  {/* Module Stats */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{module.quiz.questions.length} questions</span>
                    <span>~5 min read</span>
                  </div>

                  {/* Action Button */}
                  <Button asChild className="w-full" variant={status === 'completed' ? 'outline' : 'default'}>
                    <Link to={`/module/${module.id}`} className="flex items-center gap-2">
                      {status === 'completed' ? (
                        <>
                          <CheckCircle className="h-4 w-4" />
                          Review Module
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4" />
                          Start Module
                        </>
                      )}
                    </Link>
                  </Button>
                </CardContent>

                {/* Module Number Badge */}
                <div className="absolute top-4 right-4 bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Completion Call to Action */}
        {user.completedModules.length === modules.length && (
          <div className="mt-16 text-center bg-gradient-hero text-white rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">🎉 Congratulations!</h2>
            <p className="text-xl mb-6">
              You've completed all modules and mastered the fundamentals of healthy living!
            </p>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link to="/profile">View Your Achievements</Link>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Modules;