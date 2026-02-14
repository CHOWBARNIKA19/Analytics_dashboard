import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { departments } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

const SelectDepartment = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout title="Select Department">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-display font-bold text-foreground">Departments</h2>
          <p className="text-muted-foreground mt-1">Choose a department to view student analytics</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {departments.map(dept => (
            <Card
              key={dept.id}
              className="cursor-pointer group hover:shadow-elevated transition-all duration-300 border hover:border-primary/30"
              onClick={() => navigate(`/teacher/${dept.id}`)}
            >
              <CardContent className="p-5">
                <div className="text-3xl mb-3">{dept.icon}</div>
                <h3 className="font-display font-bold text-foreground">{dept.short}</h3>
                <p className="text-xs text-muted-foreground mt-1">{dept.name}</p>
                <div className="flex items-center gap-1 mt-3 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  View <ArrowRight className="w-3 h-3" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SelectDepartment;