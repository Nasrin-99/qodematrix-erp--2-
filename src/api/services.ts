
import { UserRole } from '../store/authStore';

export const authService = {
  login: async (credentials: any) => {
    // Mock login logic
    const { email } = credentials;
    let role: UserRole = 'student';
    if (email.includes('superadmin')) role = 'superadmin';
    else if (email.includes('admin')) role = 'schooladmin';
    else if (email.includes('teacher')) role = 'teacher';
    else if (email.includes('parent')) role = 'parent';

    return {
      user: {
        id: '1',
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        email,
        role,
      },
      token: 'mock-jwt-token',
    };
  },
};

export const schoolService = {
  getAll: async () => {
    return [
      { id: '1', name: 'Greenwood High School', location: 'New York, NY', plan: 'Premium', expiryDate: '2025-12-31', status: 'Active' },
      { id: '2', name: 'Riverside Academy', location: 'Chicago, IL', plan: 'Standard', expiryDate: '2025-06-30', status: 'Active' },
    ];
  },
  create: async (data: any) => {
    return { id: Math.random().toString(36).substr(2, 9), ...data, status: 'Active' };
  },
};

export const studentService = {
  getAll: async () => {
    return [
      { id: 'STU001', name: 'Alex Johnson', class: '10-A', parent: 'Robert Johnson', phone: '8199824069', status: 'Active' },
      { id: 'STU002', name: 'Sarah Miller', class: '8-B', parent: 'David Miller', phone: '8199824069', status: 'Active' },
    ];
  },
  create: async (data: any) => {
    return { id: 'STU' + Math.floor(Math.random() * 1000), ...data, status: 'Active' };
  },
};

export const teacherService = {
  getAll: async () => {
    return [
      { id: 'TCH001', name: 'Dr. Robert Smith', subject: 'Mathematics', classes: '10-A, 10-B', email: 'robert.s@school.com', status: 'Active' },
      { id: 'TCH002', name: 'Prof. Sarah Connor', subject: 'Physics', classes: '12-A, 12-C', email: 'sarah.c@school.com', status: 'Active' },
    ];
  },
};

export const classService = {
  getAll: async () => {
    return [
      { id: 'CLS001', name: '10-A', teacher: 'Dr. Robert Smith', students: 32, room: 'A-101' },
      { id: 'CLS002', name: '12-C', teacher: 'Prof. Sarah Connor', students: 28, room: 'C-304' },
    ];
  },
};

export const attendanceService = {
  getStats: async () => {
    return { present: 85, absent: 10, late: 5 };
  },
};

export const feeService = {
  getStats: async () => {
    return { collected: 125000, pending: 45000, overdue: 12000 };
  },
};

export const noticeService = {
  getAll: async () => {
    return [
      { id: '1', title: 'Annual Sports Day', content: 'The annual sports day will be held on March 15th.', date: '2024-03-01', type: 'Event' },
      { id: '2', title: 'Exam Schedule Released', content: 'Final exam schedule for all classes is now available.', date: '2024-02-28', type: 'Academic' },
    ];
  },
};

export const subscriptionService = {
  getPlans: async () => {
    return [
      { id: '1', name: 'Basic', price: 49, features: ['Up to 100 students', 'Basic reporting', 'Email support'] },
      { id: '2', name: 'Standard', price: 99, features: ['Up to 500 students', 'Advanced reporting', 'Priority support'] },
      { id: '3', name: 'Premium', price: 199, features: ['Unlimited students', 'Custom reporting', '24/7 support'] },
    ];
  },
};
