'use server';

import { prisma } from './prismaClient';
import { revalidatePath } from 'next/cache';

export interface StudentData {
  firstName: string;
  lastName: string;
  major: string;
  faculty: string;
  email: string;
  phone: string;
}

// Create
export async function createStudent(formData: FormData) {
  const data: StudentData = {
    firstName: formData.get('firstName') as string,
    lastName: formData.get('lastName') as string,
    major: formData.get('major') as string,
    faculty: formData.get('faculty') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
  };

  try {
    await prisma.student.create({ data });
    revalidatePath('/');
    return { success: true, message: 'เพิ่มข้อมูลนักเรียนเรียบร้อยแล้ว' };
  } catch (error: any) {
    console.error(error);
    return { success: false, message: 'เกิดข้อผิดพลาดในการเพิ่มข้อมูล' };
  }
}

// Update
export async function updateStudent(id: string, formData: FormData) {
  const data: StudentData = {
    firstName: formData.get('firstName') as string,
    lastName: formData.get('lastName') as string,
    major: formData.get('major') as string,
    faculty: formData.get('faculty') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
  };

  try {
    await prisma.student.update({ where: { id: Number(id) }, data });
    revalidatePath('/');
    return { success: true, message: 'แก้ไขข้อมูลเรียบร้อยแล้ว' };
  } catch (error: any) {
    console.error(error);
    return { success: false, message: 'เกิดข้อผิดพลาดในการแก้ไขข้อมูล' };
  }
}

// Delete
export async function deleteStudent(id: string) {
  try {
    await prisma.student.delete({ where: { id: Number(id) } });
    revalidatePath('/');
    return { success: true, message: 'ลบข้อมูลเรียบร้อยแล้ว' };
  } catch (error: any) {
    console.error(error);
    return { success: false, message: 'เกิดข้อผิดพลาดในการลบข้อมูล' };
  }
}

// Get all students
export async function getStudents() {
  try {
    return await prisma.student.findMany({ orderBy: { createdAt: 'desc' } });
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Get student by ID
export async function getStudentById(id: string) {
  try {
    return await prisma.student.findUnique({ where: { id: Number(id) } });
  } catch (error) {
    console.error(error);
    return null;
  }
}
