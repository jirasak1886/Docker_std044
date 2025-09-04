import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
export default async function AdminPage() {
    const session = await getServerSession(authOptions)
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Admin Area</h1>
            <p>ผู้ใช้: {session?.user?.username}</p>
            <p>บทบาท: {session?.user?.role}</p>
            <p className="text-sm text-gray-600 mt-2">หน้านี้สําหรับผู้ดูแลระบบเท่านั้น</p>
        </div>
    )
}