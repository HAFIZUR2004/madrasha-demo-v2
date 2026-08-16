'use client';

import { useEffect, useState } from 'react';
import IDCard from '@/components/IDCard';
import { IStudent } from '@/app/types/student';

export default function IDCardsPage() {
  const [student, setStudent] = useState<IStudent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // আপনার API থেকে ডেটা আনুন (এখানে ডেমো ডেটা দিচ্ছি)
    // আপনি যদি API ব্যবহার করেন তবে fetch('/api/students/current') ব্যবহার করুন
    const fetchStudent = async () => {
      try {
        // ডেমো ডেটা (আপনার 실제 API কল এখানে বসাবে)
        const demoData: IStudent = {
          _id: '123',
          name: 'আফসার মাহমুদ',
          rollNo: '105',
          department: 'কিতাব বিভাগ',
          phone: '017XXXXXXXX',
          photo: '/placeholder-avatar.png',
          qrData: 'student-105',
        };
        
        setStudent(demoData);
      } catch (error) {
        console.error('ডেটা আনার সমস্যা:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, []);

  if (loading) {
    return <div className="text-center p-10 text-lg">লোডিং...</div>;
  }

  if (!student) {
    return <div className="text-center p-10 text-red-500">কোনো ছাত্র পাওয়া যায়নি</div>;
  }

  return (
    <div className="p-6 flex justify-center">
      <IDCard student={student} />
    </div>
  );
}