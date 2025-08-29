import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { GraduationCap, Home, User, Trophy, Target, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { isAuthenticated, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Successfully signed out",
      });
    }
  };

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/modules', label: 'Modules', icon: GraduationCap },
    { path: '/challenges', label: 'Challenges', icon: Target },
    { path: '/profile', label: 'Profile', icon: User }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-white">
              <Trophy className="h-8 w-8" />
              <span className="text-xl font-bold">HealthLearn</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-white/20 text-white font-medium'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              
              {isAuthenticated ? (
                <Button 
                  onClick={handleSignOut}
                  variant="ghost" 
                  size="sm" 
                  className="text-white/80 hover:bg-white/10 hover:text-white"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              ) : (
                <Button asChild variant="ghost" size="sm" className="text-white/80 hover:bg-white/10 hover:text-white">
                  <Link to="/auth">Sign In</Link>
                </Button>
              )}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" className="text-white">
                <GraduationCap className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-muted/50 border-t mt-auto">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-muted-foreground text-sm">
            HealthLearn - Educational Platform for Healthy Living
          </p>
          <p className="text-muted-foreground text-xs mt-1">
            Academic Project - Demo Version
          </p>
        </div>
      </footer>
    </div>
  );
}