import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  const student = await prisma.student.upsert({
    where: { email: 'jira@example.com' },
    update: {
      firstName: 'Jira',
      lastName: 'Techapon',
      major: 'Computer Engineering',
      faculty: 'Engineering',
      phone: '0812345678'
    },
    create: {
      firstName: 'Jira',
      lastName: 'Techapon',
      major: 'Computer Engineering',
      faculty: 'Engineering',
      email: 'jira@example.com',
      phone: '0812345678'
    }
  })
  console.log('Student created/updated:', student)
}

main()
  .finally(async () => {
    await prisma.$disconnect()
  })