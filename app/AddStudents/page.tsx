// app/add-student/page.tsx
import AdmissionForm from '../components/AdmissionForm';

export default function AddStudentPage() {
     return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-yellow-100 to-yellow-400 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xl text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-yellow-800 drop-shadow-xl tracking-tight animate-fade-in">
          เพิ่มข้อมูลนักเรียน
        </h1>
      </div>
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl p-5 md:p-8 border border-yellow-300 hover:shadow-yellow-400 transition-shadow duration-300 ease-in-out">
        <AdmissionForm />
      </div>
    </div>
  );
}