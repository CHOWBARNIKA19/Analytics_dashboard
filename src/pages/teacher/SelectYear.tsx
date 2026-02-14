import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { departments, years } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SelectYear = () => {
  const { deptId } = useParams();
  const navigate = useNavigate();
  const dept = departments.find(d => d.id === deptId);

  return (
    <DashboardLayout title={`${dept?.name || ''} — Select Year`}>
      <div className="max-w-3xl mx-auto">
        <Button variant="ghost" size="sm" onClick={() => navigate('/teacher')} className="mb-4 text-muted-foreground">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Departments
        </Button>
        <div className="mb-8">
          <h2 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
            <span>{dept?.icon}</span> {dept?.short} — Select Year
          </h2>
          <p className="text-muted-foreground mt-1">Choose the year of study</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {years.map(year => (
            <Card
              key={year.id}
              className="cursor-pointer group hover:shadow-elevated transition-all duration-300 hover:border-primary/30"
              onClick={() => navigate(`/teacher/${deptId}/year/${year.id}`)}
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-display font-bold text-primary mb-2">{year.name}</div>
                <p className="text-sm text-muted-foreground">{year.label}</p>
                <div className="flex items-center justify-center gap-1 mt-3 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  View Students <ArrowRight className="w-3 h-3" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SelectYear;
