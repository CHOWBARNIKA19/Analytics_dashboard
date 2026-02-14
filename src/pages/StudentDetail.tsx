import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { getStudentById, getPerformanceRemark } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, User, Percent, BookOpen, Trophy, FolderOpen } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, Area, AreaChart } from 'recharts';

const StudentDetail = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const student = getStudentById(studentId || '');

  if (!student) {
    return (
      <DashboardLayout title="Student Not Found">
        <div className="text-center py-20">
          <p className="text-muted-foreground">Student not found.</p>
          <Button variant="outline" onClick={() => navigate(-1)} className="mt-4">Go Back</Button>
        </div>
      </DashboardLayout>
    );
  }

  const remark = getPerformanceRemark(student);

  const statCards = [
    { label: 'Attendance', value: `${student.attendance}%`, icon: Percent, color: student.attendance >= 75 ? 'text-success' : 'text-destructive' },
    { label: 'CGPA', value: student.cgpa.toFixed(2), icon: BookOpen, color: student.cgpa >= 7 ? 'text-success' : student.cgpa >= 5 ? 'text-warning' : 'text-destructive' },
    { label: 'Projects', value: student.projects, icon: FolderOpen, color: 'text-primary' },
    { label: 'Competitions', value: student.competitions, icon: Trophy, color: 'text-accent' },
  ];

  return (
    <DashboardLayout title={`${student.name} — Analytics`}>
      <div className="max-w-6xl mx-auto">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-4 text-muted-foreground">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Button>

        {/* Student Info */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center">
                <User className="w-7 h-7 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-display font-bold text-foreground">{student.name}</h2>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
                  <span>{student.rollNo}</span>
                  <span>{student.email}</span>
                  <span>{student.contact}</span>
                  <span>{student.department} — Year {student.year}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {statCards.map(stat => (
            <Card key={stat.label}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  <div>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className={`text-xl font-display font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-display">SGPA per Semester</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={student.academicGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 25%, 88%)" />
                  <XAxis dataKey="sem" tick={{ fontSize: 11 }} />
                  <YAxis domain={[0, 10]} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="gpa" fill="hsl(215, 80%, 48%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-display">Academic Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={student.academicGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 25%, 88%)" />
                  <XAxis dataKey="sem" tick={{ fontSize: 11 }} />
                  <YAxis domain={[0, 10]} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="gpa" stroke="hsl(175, 55%, 42%)" fill="hsl(175, 55%, 42%)" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-display">Projects & Competitions Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={student.projectGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 25%, 88%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="projects" stroke="hsl(265, 60%, 55%)" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="competitions" stroke="hsl(38, 92%, 50%)" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Remark */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <Badge variant={remark.type === 'success' ? 'default' : remark.type === 'destructive' ? 'destructive' : 'secondary'} className="mt-0.5 shrink-0">
                Remark
              </Badge>
              <p className="text-sm text-foreground font-medium">{remark.text}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentDetail;