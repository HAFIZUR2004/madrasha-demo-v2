// types/student.ts

export interface IStudent {
  _id?: string;
  name: string;
  rollNo: string;
  department?: string;
  phone?: string;
  photo?: string;
  qrData?: string;
  class?: string;
  address?: string;
  createdAt?: Date;
  updatedAt?: Date;
  status?: 'active' | 'inactive';
}

// যদি আপনার IDCard-এর জন্য আলাদা টাইপ দরকার হয়:
export interface IDCard {
  _id?: string;
  studentId?: string;
  name: string;
  class: string;
  rollNo: string;
  studentPhoto?: string;
  schoolName?: string;
  address?: string;
  phone?: string;
  createdAt?: Date;
  updatedAt?: Date;
  status?: 'active' | 'inactive';
}