import { getStudentById } from "../../actions/studentActions";
import EditStudentForm from "../../components/EditStudentForm";


interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditStudentPage({ params }: Props) {
  // รอให้ params resolve ก่อน
  const { id } = await params;
  
  const result = await getStudentById(Number(id));

  if (!result.success || !result.data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-200">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
          <h1 className="text-2xl font-semibold text-yellow-600 mb-4">ไม่พบข้อมูลนักเรียน</h1>
          <p className="text-gray-600 mb-4">{result.message || 'กรุณาตรวจสอบลิงก์หรือลองใหม่อีกครั้ง'}</p>
          <a 
            href="/" 
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition duration-200"
          >
            กลับหน้าแรก
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-300 p-6">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-yellow-700 mb-6 text-center">
          แก้ไขข้อมูลนักเรียน
        </h1>
        <EditStudentForm student={result.data} />
      </div>
    </div>
  );
}