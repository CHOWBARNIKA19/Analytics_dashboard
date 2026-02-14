import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { departments } from '@/data/mockData';
import { Users, GraduationCap, BookOpen, Settings } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <DashboardLayout title="Admin Panel">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-display font-bold">Admin Dashboard</h2>
          <p className="text-muted-foreground mt-1">Manage departments, users, and analytics features</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Departments', value: departments.length, icon: BookOpen, color: 'text-primary' },
            { label: 'Total Students', value: '2,400+', icon: Users, color: 'text-secondary' },
            { label: 'Faculty', value: '120+', icon: GraduationCap, color: 'text-accent' },
            { label: 'Active Features', value: '12', icon: Settings, color: 'text-warning' },
          ].map(stat => (
            <Card key={stat.label}>
              <CardContent className="p-5">
                <stat.icon className={`w-6 h-6 ${stat.color} mb-2`} />
                <p className="text-2xl font-display font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-display">Department Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {departments.map(dept => (
                <div key={dept.id} className="p-4 rounded-lg border hover:shadow-card transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{dept.icon}</span>
                    <span className="font-display font-bold">{dept.short}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{dept.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;