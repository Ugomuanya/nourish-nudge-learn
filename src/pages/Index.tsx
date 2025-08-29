import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Layout } from '@/components/Layout';
import { useGameification } from '@/hooks/useGameification';
import { useAuth } from '@/hooks/useAuth';
import { BookOpen, Trophy, Target, Users } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

const Index = () => {
  const { user, getProgressPercentage } = useGameification();
  const { isAuthenticated } = useAuth();
  const progressPercentage = getProgressPercentage();

  const features = [
    {
      icon: BookOpen,
      title: 'Interactive Learning',
      description: 'Engaging modules with quizzes and immediate feedback'
    },
    {
      icon: Trophy,
      title: 'Gamification',
      description: 'Earn points and badges as you progress through modules'
    },
    {
      icon: Target,
      title: 'Practical Knowledge',
      description: 'Learn actionable strategies for healthy living'
    },
    {
      icon: Users,
      title: 'For Young Adults',
      description: 'Content specifically designed for ages 15-25'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-white overflow-hidden">
        <div className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl font-bold leading-tight">
                Learn, Grow, and Live
                <span className="block text-accent"> Healthier</span>
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Master the fundamentals of nutrition, physical activity, and healthy habits through 
                interactive modules designed specifically for young adults.
              </p>
              
              {user.completedModules.length > 0 && isAuthenticated && (
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Your Progress</span>
                    <span className="text-sm">{progressPercentage}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-4">
                {isAuthenticated ? (
                  <>
                    <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                      <Link to="/modules">
                        {user.completedModules.length > 0 ? 'Continue Learning' : 'Start Learning'}
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                      <Link to="/profile">View Profile</Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                      <Link to="/auth">Get Started</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                      <Link to="/modules">Preview Modules</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10">
                <img 
                  src={heroImage} 
                  alt="Healthy lifestyle illustration" 
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-2xl z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {user.points > 0 && isAuthenticated && (
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{user.points}</div>
                <div className="text-muted-foreground">Points Earned</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">{user.badges.length}</div>
                <div className="text-muted-foreground">Badges Unlocked</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">{user.completedModules.length}</div>
                <div className="text-muted-foreground">Modules Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success">{progressPercentage}%</div>
                <div className="text-muted-foreground">Overall Progress</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose HealthLearn?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform combines scientific knowledge with engaging gamification 
              to make learning about health both fun and effective.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Health Journey?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of young adults who are already building healthier lifestyles 
            through our interactive learning platform.
          </p>
          <Button asChild size="lg" className="bg-gradient-primary hover:shadow-glow">
            <Link to={isAuthenticated ? "/modules" : "/auth"}>
              {isAuthenticated ? "Explore Learning Modules" : "Start Your Journey"}
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
