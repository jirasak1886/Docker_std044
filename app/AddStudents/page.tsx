
// app/add-student/page.tsx
import AdmissionForm from '../components/AdmissionForm';

export default function AddStudentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-blue-100 to-blue-400 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xl text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-800 drop-shadow-xl tracking-tight animate-fade-in">
          เพิ่มข้อมูลนักเรียน
        </h1>
        <p className="text-blue-700 mt-2 text-lg font-medium opacity-90">
          ระบบสมัครเรียนออนไลน์
        </p>
      </div>
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl p-5 md:p-8 border border-blue-300 hover:shadow-blue-400 transition-shadow duration-300 ease-in-out backdrop-blur-sm">
        <AdmissionForm />
      </div>
    </div>
  );
}