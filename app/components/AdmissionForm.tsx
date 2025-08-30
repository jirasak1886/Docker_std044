'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createStudent } from '../actions/studentActions';
import Link from 'next/link';

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

export default function AdmissionForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);

    try {
      const result = await createStudent(formData);
      setMessage(result.message);
      setSuccess(result.success);

      if (result.success) {
        setTimeout(() => {
          router.push('/');
        }, 2000);
      }
    } catch (error) {
      setMessage('เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง');
      setSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  const formFields = [
    {
      label: 'ชื่อ',
      name: 'firstName',
      placeholder: 'กรอกชื่อจริง',
      type: 'text',
      required: true,
    },
    {
      label: 'นามสกุล',
      name: 'lastName',
      placeholder: 'กรอกนามสกุล',
      type: 'text',
      required: true,
    },
    {
      label: 'คณะ',
      name: 'faculty',
      placeholder: 'เช่น คณะวิทยาศาสตร์',
      type: 'text',
      required: true,
    },
    {
      label: 'สาขาวิชา',
      name: 'major',
      placeholder: 'เช่น วิทยาการคอมพิวเตอร์',
      type: 'text',
      required: true,
    },
    {
      label: 'อีเมล',
      name: 'email',
      placeholder: 'example@email.com',
      type: 'email',
      required: true,
    },
    {
      label: 'เบอร์โทรศัพท์',
      name: 'phone',
      placeholder: '08xxxxxxxx',
      type: 'tel',
      required: true,
    },
  ];

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 rounded-full p-2">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-5-2a2 2 0 11-4 0 2 2 0 014 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              ข้อมูลผู้สมัคร
            </h2>
          </div>
          <div className="text-sm text-gray-500 bg-blue-50 px-3 py-1 rounded-full">
            ขั้นตอนที่ 1/2
          </div>
        </div>
        <p className="text-gray-600 text-base">
          กรุณากรอกข้อมูลส่วนตัวให้ครบถ้วนและถูกต้อง เพื่อใช้ในกระบวนการสมัครเรียน
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formFields.map(({ label, name, placeholder, type, required }) => (
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
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 text-gray-900
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200
                    hover:border-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Terms and Conditions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-8">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="terms"
              required
              disabled={isSubmitting}
              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="text-sm text-gray-700">
              ฉันยอมรับ
              <a href="#" className="text-blue-600 hover:text-blue-800 underline mx-1">
                ข้อกำหนดและเงื่อนไข
              </a>
              และ
              <a href="#" className="text-blue-600 hover:text-blue-800 underline mx-1">
                นโยบายความเป็นส่วนตัว
              </a>
              ของสถาบัน
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex flex-col items-center pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto min-w-[200px] px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-lg shadow-lg
              hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 transform hover:scale-105"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>กำลังส่งข้อมูล...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                <span>ส่งใบสมัคร</span>
              </div>
            )}
          </button>

          {/* Success/Error Message */}
          {message && (
            <div className="mt-6 w-full max-w-md">
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
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            หากมีปัญหาในการกรอกฟอร์ม สามารถติดต่อเจ้าหน้าที่ได้ที่{' '}
            <a href="mailto:admissions@university.ac.th" className="text-blue-600 hover:text-blue-800 underline">
              admissions@university.ac.th
            </a>
            {' '}หรือโทร{' '}
            <a href="tel:021234567" className="text-blue-600 hover:text-blue-800 underline">
              02-123-4567 ต่อ 1234
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}