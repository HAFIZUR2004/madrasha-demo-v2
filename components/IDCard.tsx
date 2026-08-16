'use client';

import { QRCodeSVG } from 'qrcode.react';
import { IStudent } from '@/app/types/student';

interface IDCardProps {
  student: IStudent;
  className?: string;
}

export default function IDCard({ student, className = '' }: IDCardProps) {
  // 🟢 student undefined হলে লোডিং দেখান (যদি ভুলবশত ডেটা না আসে)
  if (!student) {
    return <div className="text-center p-10">ডেটা লোড হচ্ছে...</div>;
  }

  return (
    <div className={`w-[300px] h-[450px] bg-white border border-slate-200 rounded-3xl p-6 shadow-xl flex flex-col items-center relative overflow-hidden print:shadow-none print:border-slate-300 ${className}`}>
      {/* Background Pattern */}
      <div className="absolute top-0 w-full h-32 bg-primary -skew-y-12 -translate-y-10" />
      
      <div className="z-10 mt-6 text-center">
        <div className="w-24 h-24 rounded-2xl border-4 border-white overflow-hidden mx-auto shadow-md">
          <img 
            src={student.photo || "/placeholder-avatar.png"} 
            className="w-full h-full object-cover" 
            alt={student.name || 'Student'}
          />
        </div>
        <h2 className="mt-4 font-bold text-xl text-slate-800">{student.name || 'নাম নেই'}</h2>
        <p className="text-primary font-bold tracking-widest text-sm uppercase">রোল: {student.rollNo || 'N/A'}</p>
      </div>

      <div className="w-full mt-6 space-y-3 text-sm">
        <div className="flex justify-between border-b border-slate-100 pb-1 text-slate-600">
          <span>বিভাগ</span> 
          <span className="font-bold text-slate-800 text-right">{student.department || 'N/A'}</span>
        </div>
        <div className="flex justify-between border-b border-slate-100 pb-1 text-slate-600">
          <span>ফোন</span> 
          <span className="font-bold text-slate-800 text-right">{student.phone || 'N/A'}</span>
        </div>
      </div>

      <div className="mt-auto bg-slate-50 p-2 rounded-2xl border border-slate-100 print:p-4">
        <QRCodeSVG 
          value={student.qrData || student._id || `student-${student.rollNo}`} 
          size={60}
          className="print:w-[100px] print:h-[100px]"
        />
      </div>
      <p className="mt-2 text-[10px] text-slate-400 uppercase tracking-tighter text-center">মাদরাসা ম্যানেজমেন্ট সিস্টেম</p>
    </div>
  );
}