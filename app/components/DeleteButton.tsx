'use client';

import { deleteStudent } from '../actions/studentActions'; // ใช้ Server Action ที่สร้างขึ้น

type DeleteButtonProps = {
  studentId: number;
};

export default function DeleteButton({ studentId }: DeleteButtonProps) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      confirm(
        '⚠️ คุณแน่ใจหรือไม่ว่าต้องการลบนักเรียนคนนี้? การลบนี้จะไม่สามารถย้อนกลับได้!'
      )
    ) {
      try {
        const result = await deleteStudent(studentId.toString());

        if (result.success) {
          alert(result.message);
          window.location.reload();
        } else {
          alert(result.message);
        }
      } catch (error) {
        console.error('เกิดข้อผิดพลาดขณะลบ:', error);
        alert('เกิดข้อผิดพลาดขณะลบข้อมูล');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button
        type="submit"
        className="text-red-600 hover:text-red-800 hover:underline font-semibold transition-colors duration-200"
      >
        🗑️ ลบ
      </button>
    </form>
  );
}