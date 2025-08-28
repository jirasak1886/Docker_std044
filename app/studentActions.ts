'use server'

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function createStudent(prevState: any, formData: FormData) {
  try {
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const major = formData.get('major') as string;
    const faculty = formData.get('faculty') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;

    // Create student in database
    const student = await prisma.student.create({
      data: {
        firstName,
        lastName,
        major,
        faculty,
        email,
        phone,
      },
    });

    revalidatePath('/');
    
    return {
      message: 'เพิ่มข้อมูลนักศึกษาสำเร็จ',
      success: true,
    };
  } catch (error) {
    return {
      message: 'เกิดข้อผิดพลาด: ' + (error as Error).message,
      success: false,
    };
  }
}