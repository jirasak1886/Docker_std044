'use client'

import { useState, useTransition } from 'react'
import { deleteStudent } from '../actions/studentActions'
import AdmissionForm from './AdmissionForm'

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

interface StudentListProps {
  students: Student[]
}

export default function StudentList({ students }: StudentListProps) {
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState('')

  const handleDelete = (id: string, name: string) => {
    if (confirm(`คุณแน่ใจหรือไม่ที่จะลบข้อมูลของ ${name}?`)) {
      startTransition(async () => {
        const result = await deleteStudent(id)
        setMessage(result.message)
        
        setTimeout(() => {
          setMessage('')
        }, 3000)
      })
    }
  }

  const handleEdit = (student: Student) => {
    setEditingStudent(student)
  }

  const handleCloseEdit = () => {
    setEditingStudent(null)
  }

  return (
    <div>
      {message && (
        <div className={`mb-4 p-3 rounded-md text-sm ${
          message.includes('เรียบร้อย') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {message}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {students.map((student) => (
          <div key={student.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {student.firstName} {student.lastName}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(student)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  title="แก้ไข"
                >
                  แก้ไข
                </button>
                <button
                  onClick={() => handleDelete(student.id, `${student.firstName} ${student.lastName}`)}
                  disabled={isPending}
                  className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
                  title="ลบ"
                >
                  ลบ
                </button>
              </div>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600">
              <p><span className="font-medium">อีเมล:</span> {student.email}</p>
              <p><span className="font-medium">เบอร์โทร:</span> {student.phone}</p>
              <p><span className="font-medium">คณะ:</span> {student.faculty}</p>
              <p><span className="font-medium">สาขา:</span> {student.major}</p>
              <p className="text-xs text-gray-500">
                สร้างเมื่อ: {new Date(student.createdAt).toLocaleDateString('th-TH')}
              </p>
            </div>
          </div>
        ))}
      </div>

      {students.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">ยังไม่มีข้อมูลนักเรียน</div>
          <p className="text-gray-400 text-sm mt-2">เริ่มต้นโดยการเพิ่มนักเรียนคนแรกของคุณ</p>
        </div>
      )}

      {/* Edit Modal */}
      {editingStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <AdmissionForm
                student={editingStudent}
                onClose={handleCloseEdit}
                isEdit={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}