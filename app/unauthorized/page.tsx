// app/unauthorized/page.tsx
export default function Unauthorized() {
    return (
        <div className="p-6">
            <h1 className="text-xl font-bold text-red-600">Access Denied</h1>
            <p>คุณไม่มีสิทธิ์เข้าถึงหน้านี้</p>
        </div>
    )
}