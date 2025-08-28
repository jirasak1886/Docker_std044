'use server';
import { PrismaClient } from '@prisma/client';
declare global {
  var prisma: PrismaClient | undefined
}

// ใช้ singleton เพื่อลดปัญหา hot reload ใน dev
export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
