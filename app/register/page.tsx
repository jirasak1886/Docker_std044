'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
export default function RegisterPage() {
    const router = useRouter()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })
        if (res.ok) router.push('/login')
        else {
            const data = await res.json()
            setError(data.error || 'สมัครไม่สําเร็จ')
        }
    }
    return (
        <div className="max-w-sm mx-auto p-6">
            <h1 className="text-xl font-bold mb-4">สมัครสมาชิก</h1>
            <form onSubmit={onSubmit} className="space-y-3">
                <input className="w-full border p-2 rounded" placeholder="Username"
                    value={username} onChange={e => setUsername(e.target.value)} required />
                <input className="w-full border p-2 rounded" placeholder="Password"
                    type="password"
                    value={password} onChange={e => setPassword(e.target.value)} required />
                {error && <p className="text-red-600 text-sm">{error}</p>}
                <button className="bg-blue-600 text-white px-4 py-2 rounded">สมัคร</button>
            </form>
        </div>
    )
}