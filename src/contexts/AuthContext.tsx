import React, { createContext, useContext, useState, ReactNode } from 'react';
import { departments, years, getStudents } from '@/data/mockData';

export type UserRole = 'admin' | 'teacher' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  rollNo?: string;
  studentDataId?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const staffUsers: (User & { password: string })[] = [
  { id: '1', name: 'Dr. Admin', email: 'admin@university.edu', role: 'admin', password: 'admin123' },
  { id: '2', name: 'Prof. Sharma', email: 'teacher@university.edu', role: 'teacher', department: 'CSE', password: 'teacher123' },
];

function buildStudentUsers(): (User & { password: string })[] {
  const users: (User & { password: string })[] = [];
  for (const dept of departments) {
    for (const year of years) {
      const students = getStudents(dept.id, year.id);
      for (const s of students) {
        users.push({
          id: `user-${s.id}`,
          name: s.name,
          email: s.email,
          role: 'student',
          department: s.department,
          rollNo: s.rollNo,
          studentDataId: s.id,
          password: s.rollNo.toLowerCase(),
        });
      }
    }
  }
  return users;
}

let allUsers: (User & { password: string })[] | null = null;
function getAllUsers() {
  if (!allUsers) {
    allUsers = [...staffUsers, ...buildStudentUsers()];
  }
  return allUsers;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    const found = getAllUsers().find(u => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...userData } = found;
      setUser(userData);
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};