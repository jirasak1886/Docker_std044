'use client'

import { useState, useTransition } from 'react'
import { createStudent, updateStudent, type StudentData } from '../actions/studentActions'

interface Student {
  id: string
  firstName: string
  lastName: string
  major: string
  faculty: string
  email: string
  phone: string
  createdAt: Date
  updatedAt: Date
}

interface AdmissionFormProps {
  student?: Student
  onClose?: () => void
  isEdit?: boolean
}

export default function AdmissionForm({ student, onClose, isEdit = false }: AdmissionFormProps) {
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState('')

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      let result
      
      if (isEdit && student) {
        result = await updateStudent(student.id, formData)
      } else {
        result = await createStudent(formData)
      }
      
      setMessage(result.message)
      
      if (result.success) {
        // Reset form if creating new student
        if (!isEdit) {
          const form = document.getElementById('student-form') as HTMLFormElement
          form?.reset()
        }
        
        // Close modal if editing
        if (isEdit && onClose) {
          setTimeout(() => {
            onClose()
          }, 1500)
        }
      }
    })
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        {isEdit ? 'แก้ไขข้อมูลนักเรียน' : 'ฟอร์มสมัครเรียน'}
      </h2>
      
      <form id="student-form" action={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            ชื่อ
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            defaultValue={student?.firstName || ''}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="กรอกชื่อ"
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            นามสกุล
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            defaultValue={student?.lastName || ''}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="กรอกนามสกุล"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            อีเมล
          </label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={student?.email || ''}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="กรอกอีเมล"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            เบอร์โทรศัพท์
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            defaultValue={student?.phone || ''}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="กรอกเบอร์โทรศัพท์"
          />
        </div>

        <div>
          <label htmlFor="faculty" className="block text-sm font-medium text-gray-700 mb-1">
            คณะ
          </label>
          <select
            id="faculty"
            name="faculty"
            defaultValue={student?.faculty || ''}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">เลือกคณะ</option>
            <option value="Engineering">คณะวิศวกรรมศาสตร์</option>
            <option value="Medicine">คณะแพทยศาสตร์</option>
            <option value="Science">คณะวิทยาศาสตร์</option>
            <option value="Arts">คณะศิลปศาสตร์</option>
            <option value="Business">คณะบริหารธุรกิจ</option>
            <option value="Education">คณะครุศาสตร์</option>
          </select>
        </div>

        <div>
          <label htmlFor="major" className="block text-sm font-medium text-gray-700 mb-1">
            สาขาวิชา
          </label>
          <input
            type="text"
            id="major"
            name="major"
            defaultValue={student?.major || ''}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="กรอกสาขาวิชา"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'กำลังบันทึก...' : (isEdit ? 'แก้ไข' : 'สมัครเรียน')}
          </button>
          
          {isEdit && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              ยกเลิก
            </button>
          )}
        </div>

        {message && (
          <div className={`mt-4 p-3 rounded-md text-sm ${
            message.includes('เรียบร้อย') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {message}
          </div>
        )}
      </form>
    </div>
  )
}