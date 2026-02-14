import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { departments, years, getStudents } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const StudentList = () => {
  const { deptId, yearId } = useParams();
  const navigate = useNavigate();
  const dept = departments.find(d => d.id === deptId);
  const year = years.find(y => y.id === Number(yearId));
  const students = getStudents(deptId || '', Number(yearId));

  return (
    <DashboardLayout title={`${dept?.short} — ${year?.name} Students`}>
      <div className="max-w-5xl mx-auto">
        <Button variant="ghost" size="sm" onClick={() => navigate(`/teacher/${deptId}`)} className="mb-4 text-muted-foreground">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Year Selection
        </Button>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                {dept?.short} — {year?.name} Students
              </CardTitle>
              <span className="text-sm text-muted-foreground">{students.length} students</span>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Roll No</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead className="hidden sm:table-cell">Contact</TableHead>
                  <TableHead className="text-right">CGPA</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map(student => (
                  <TableRow
                    key={student.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => navigate(`/student/${student.id}`)}
                  >
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell className="text-muted-foreground">{student.rollNo}</TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground text-sm">{student.email}</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground text-sm">{student.contact}</TableCell>
                    <TableCell className="text-right font-semibold">{student.cgpa}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentList;