import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DashboardLayout = ({ children, title }: { children: React.ReactNode; title?: string }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="gradient-hero sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-secondary-foreground" />
            </div>
            <div>
              <h1 className="text-sm font-display font-bold text-primary-foreground tracking-tight">
                Virtual Academic Analytics
              </h1>
              {title && <p className="text-xs text-primary-foreground/70">{title}</p>}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-primary-foreground">{user?.name}</p>
              <p className="text-xs text-primary-foreground/70 capitalize">{user?.role}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;