// app/components/EditStudentForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { editStudent } from '../actions/studentActions';
import Link from 'next/link';

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  major: string;
  faculty: string;
  email: string;
  phone: string;
}

interface EditStudentFormProps {
  student: Student;
}

const iconMap: Record<string, React.ReactNode> = {
  firstName: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  lastName: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  major: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
    </svg>
  ),
  faculty: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  email: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  phone: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
};

export default function EditStudentForm({ student }: EditStudentFormProps) {
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);

    try {
      const result = await editStudent(student.id.toString(), formData);
      setMessage(result.message);
      setSuccess(result.success);

      if (result.success) {
        setTimeout(() => {
          router.push('/');
        }, 2000);
      }
    } catch (error) {
      setMessage('เกิดข้อผิดพลาดในการแก้ไขข้อมูล กรุณาลองใหม่อีกครั้ง');
      setSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleInputChange = () => {
    setHasChanges(true);
  };

  const formFields = [
    {
      label: 'ชื่อ',
      name: 'firstName',
      placeholder: 'กรอกชื่อจริง',
      type: 'text',
      defaultValue: student.firstName,
      required: true,
    },
    {
      label: 'นามสกุล',
      name: 'lastName',
      placeholder: 'กรอกนามสกุล',
      type: 'text',
      defaultValue: student.lastName,
      required: true,
    },
    {
      label: 'คณะ',
      name: 'faculty',
      placeholder: 'เช่น คณะวิทยาศาสตร์',
      type: 'text',
      defaultValue: student.faculty,
      required: true,
    },
    {
      label: 'สาขาวิชา',
      name: 'major',
      placeholder: 'เช่น วิทยาการคอมพิวเตอร์',
      type: 'text',
      defaultValue: student.major,
      required: true,
    },
    {
      label: 'อีเมล',
      name: 'email',
      placeholder: 'example@email.com',
      type: 'email',
      defaultValue: student.email,
      required: true,
    },
    {
      label: 'เบอร์โทรศัพท์',
      name: 'phone',
      placeholder: '08xxxxxxxx',
      type: 'tel',
      defaultValue: student.phone,
      required: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-white/70 hover:text-white transition-colors duration-200 group"
              >
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors duration-200">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">กลับหน้าหลัก</span>
                </div>
              </Link>
              <div className="h-8 w-px bg-white/30"></div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">แก้ไขข้อมูลนักเรียน</h1>
                <p className="text-blue-100 text-sm md:text-base mt-1">
                  นักเรียน ID: #{student.id} - {student.firstName} {student.lastName}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-medium">
                1
              </div>
              <span className="ml-2 text-sm font-medium text-blue-600">แก้ไขข้อมูล</span>
            </div>
            <div className="flex-1 h-px bg-gray-200"></div>
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 bg-gray-300 text-gray-600 rounded-full text-sm font-medium">
                2
              </div>
              <span className="ml-2 text-sm font-medium text-gray-500">บันทึกการเปลี่ยนแปลง</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Student Info Card */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-lg p-6 mb-8 text-white">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold">ข้อมูลปัจจุบัน</h2>
              <div className="text-blue-100 mt-1 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <p>• ชื่อ: {student.firstName} {student.lastName}</p>
                <p>• คณะ: {student.faculty}</p>
                <p>• สาขา: {student.major}</p>
                <p>• อีเมล: {student.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                แก้ไขข้อมูลนักเรียน
              </h3>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-blue-100 bg-white/20 px-2 py-1 rounded-full">
                  ID: #{student.id}
                </span>
                {hasChanges && (
                  <span className="text-xs text-yellow-200 bg-yellow-600/20 px-2 py-1 rounded-full animate-pulse">
                    มีการแก้ไข
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 bg-gray-50">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              {/* Form Header */}
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-blue-100 rounded-full p-2">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">
                    แก้ไขข้อมูลส่วนตัว
                  </h4>
                </div>
                <p className="text-gray-600">
                  กรุณาแก้ไขข้อมูลที่ต้องการเปลี่ยนแปลง ระบบจะบันทึกการเปลี่ยนแปลงทั้งหมด
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {formFields.map(({ label, name, placeholder, type, defaultValue, required }) => (
                    <div key={name} className="space-y-2">
                      <label
                        htmlFor={name}
                        className="flex items-center space-x-2 text-sm font-semibold text-gray-700"
                      >
                        <span className="text-blue-600">{iconMap[name]}</span>
                        <span>{label}</span>
                        {required && <span className="text-red-500">*</span>}
                      </label>
                      <div className="relative">
                        <input
                          type={type}
                          name={name}
                          id={name}
                          required={required}
                          placeholder={placeholder}
                          defaultValue={defaultValue}
                          disabled={isSubmitting}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 text-gray-900
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200
                            hover:border-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Change Warning */}
                {hasChanges && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-amber-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      <p className="text-sm text-amber-800">
                        คุณได้แก้ไขข้อมูลแล้ว กรุณากดปุ่ม "บันทึกการแก้ไข" เพื่อยืนยันการเปลี่ยนแปลง
                      </p>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting || !hasChanges}
                    className="w-full sm:w-auto min-w-[200px] px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-lg shadow-lg
                      hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                      disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 transform hover:scale-105"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        <span>กำลังบันทึก...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>บันทึกการแก้ไข</span>
                      </div>
                    )}
                  </button>

                  <Link
                    href="/"
                    className="w-full sm:w-auto min-w-[200px] px-8 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg shadow-sm
                      hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                      transition duration-200 text-center"
                  >
                    ยกเลิก
                  </Link>
                </div>

                {/* Success/Error Message */}
                {message && (
                  <div className="mt-6">
                    <div
                      className={`px-4 py-3 rounded-lg text-center font-medium border transition duration-200 ${
                        success
                          ? 'bg-green-50 text-green-800 border-green-200'
                          : 'bg-red-50 text-red-800 border-red-200'
                      }`}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        {success ? (
                          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                        )}
                        <span>{message}</span>
                      </div>
                      {success && (
                        <p className="text-sm text-green-600 mt-2">
                          กำลังพาคุณกลับสู่หน้าหลัก...
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-200">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="bg-blue-100 rounded-full p-2">
                <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="ml-3">
              <h4 className="text-base font-semibold text-blue-900">คำแนะนำการแก้ไขข้อมูล</h4>
              <div className="mt-2 text-sm text-blue-700 space-y-1">
                <p>• ตรวจสอบข้อมูลให้ถูกต้องก่อนบันทึก</p>
                <p>• การแก้ไขจะมีผลทันทีหลังจากบันทึก</p>
                <p>• หากมีปัญหา สามารถติดต่อเจ้าหน้าที่ได้ที่ admissions@university.ac.th</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}