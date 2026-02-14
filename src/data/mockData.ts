export const departments = [
  { id: 'cse', name: 'Computer Science & Engineering', short: 'CSE', icon: '💻', color: 'hsl(215, 80%, 48%)' },
  { id: 'it', name: 'Information Technology', short: 'IT', icon: '🌐', color: 'hsl(175, 55%, 42%)' },
  { id: 'ece', name: 'Electronics & Communication', short: 'ECE', icon: '📡', color: 'hsl(265, 60%, 55%)' },
  { id: 'eee', name: 'Electrical & Electronics', short: 'EEE', icon: '⚡', color: 'hsl(38, 92%, 50%)' },
  { id: 'bt', name: 'Biotechnology', short: 'BT', icon: '🧬', color: 'hsl(150, 60%, 42%)' },
  { id: 'aids', name: 'AI & Data Science', short: 'AIDS', icon: '🤖', color: 'hsl(0, 72%, 55%)' },
  { id: 'aiml', name: 'AI & Machine Learning', short: 'AIML', icon: '🧠', color: 'hsl(280, 65%, 50%)' },
  { id: 'ct', name: 'Computer Technology', short: 'CT', icon: '🖥️', color: 'hsl(200, 80%, 50%)' },
];

export const years = [
  { id: 1, name: 'I Year', label: 'First Year' },
  { id: 2, name: 'II Year', label: 'Second Year' },
  { id: 3, name: 'III Year', label: 'Third Year' },
  { id: 4, name: 'IV Year', label: 'Fourth Year' },
];

const firstNames = ['Rahul', 'Priya', 'Amit', 'Sneha', 'Vikram', 'Anjali', 'Arjun', 'Divya', 'Karthik', 'Meera', 'Rohan', 'Swathi'];
const lastNames = ['Kumar', 'Sharma', 'Singh', 'Patel', 'Reddy', 'Nair', 'Das', 'Gupta', 'Iyer', 'Joshi', 'Verma', 'Rao'];

export interface Student {
  id: string;
  name: string;
  rollNo: string;
  email: string;
  contact: string;
  department: string;
  year: number;
  attendance: number;
  cgpa: number;
  sgpa: number[];
  projects: number;
  competitions: number;
  academicGrowth: { sem: string; gpa: number }[];
  projectGrowth: { month: string; projects: number; competitions: number }[];
}

function generateStudents(dept: string, year: number): Student[] {
  const count = 8 + Math.floor(Math.random() * 5);
  return Array.from({ length: count }, (_, i) => {
    const firstName = firstNames[i % firstNames.length];
    const lastName = lastNames[(i + 3) % lastNames.length];
    const rollNo = `${dept.toUpperCase()}${year}${String(i + 1).padStart(2, '0')}`;
    const sgpa = Array.from({ length: year * 2 }, () => +(2.5 + Math.random() * 7.5).toFixed(2));
    const cgpa = +(sgpa.reduce((a, b) => a + b, 0) / sgpa.length).toFixed(2);
    
    return {
      id: `${dept}-${year}-${i}`,
      name: `${firstName} ${lastName}`,
      rollNo,
      email: `${firstName.toLowerCase()}.${rollNo.toLowerCase()}@university.edu`,
      contact: `+91 ${9000000000 + Math.floor(Math.random() * 999999999)}`,
      department: dept.toUpperCase(),
      year,
      attendance: +(60 + Math.random() * 38).toFixed(1),
      cgpa,
      sgpa,
      projects: Math.floor(Math.random() * 8),
      competitions: Math.floor(Math.random() * 5),
      academicGrowth: sgpa.map((gpa, idx) => ({ sem: `Sem ${idx + 1}`, gpa })),
      projectGrowth: ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'].slice(0, Math.min(6, year * 2)).map((month, idx) => ({
        month,
        projects: Math.floor(Math.random() * (idx + 1) * 1.5),
        competitions: Math.floor(Math.random() * (idx + 1)),
      })),
    };
  });
}

const studentCache: Record<string, Student[]> = {};

export function getStudents(dept: string, year: number): Student[] {
  const key = `${dept}-${year}`;
  if (!studentCache[key]) {
    studentCache[key] = generateStudents(dept, year);
  }
  return studentCache[key];
}

export function getStudentById(id: string): Student | undefined {
  for (const students of Object.values(studentCache)) {
    const found = students.find(s => s.id === id);
    if (found) return found;
  }
  // Try generating if not found
  for (const dept of departments) {
    for (const year of years) {
      const students = getStudents(dept.id, year.id);
      const found = students.find(s => s.id === id);
      if (found) return found;
    }
  }
  return undefined;
}

export function getPerformanceRemark(student: Student): { text: string; type: 'success' | 'warning' | 'destructive' | 'info' } {
  const { cgpa, attendance, projects, competitions } = student;
  
  if (cgpa >= 8 && projects >= 4 && competitions >= 2 && attendance >= 85) {
    return { text: '🌟 Outstanding! Excellent in academics, projects, and competitions.', type: 'success' };
  }
  if (cgpa >= 7 && projects >= 3 && attendance >= 75) {
    return { text: '👍 Good performance overall. Keep up the good work!', type: 'success' };
  }
  if (cgpa >= 7 && projects < 2) {
    return { text: '📚 Good at academics but needs more involvement in projects and competitions.', type: 'warning' };
  }
  if (cgpa < 6 && projects >= 3) {
    return { text: '🔧 Strong in projects but academics need significant improvement.', type: 'warning' };
  }
  if (attendance < 75) {
    return { text: '⚠️ Low attendance detected. Needs immediate improvement in regularity.', type: 'destructive' };
  }
  if (cgpa < 5) {
    return { text: '🚨 Needs improvement in academics. Consider additional support and mentoring.', type: 'destructive' };
  }
  return { text: '📈 Average performance. Has potential to improve in all areas.', type: 'info' };
}