import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
export default async function DashboardPage() {
    const session = await getServerSession(authOptions)
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p>ยินดีต้อนรับ, {session?.user?.username}</p>
            <p>บทบาท: {session?.user?.role}</p>
        </div>
    )
}