import { getStudents } from './actions/studentActions'
import AdmissionForm from './components/AdmissionForm'
import StudentList from './components/StudentList'

export default async function HomePage() {
  const students = await getStudents()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ระบบจัดการข้อมูลนักเรียน
          </h1>
          <p className="text-gray-600 text-lg">
            ระบบ CRUD สำหรับจัดการข้อมูลการสมัครเรียน
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <AdmissionForm />
            </div>
          </div>

          {/* Students List Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                รายชื่อนักเรียน
              </h2>
              <p className="text-gray-600">
                จำนวนนักเรียนทั้งหมด: {students.length} คน
              </p>
            </div>
            
            <StudentList students={students} />
          </div>
        </div>
      </div>
    </div>
  )
}