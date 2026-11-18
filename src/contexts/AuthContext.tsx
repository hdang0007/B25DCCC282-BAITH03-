import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { User } from '../types'
interface AuthContextValue { user: User | null; login: (username: string, password: string) => boolean; logout: () => void }
const AuthContext = createContext<AuthContextValue | undefined>(undefined)
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => { const savedUser = localStorage.getItem('shopmini-user'); return savedUser ? { username: savedUser } : null })
  const value = useMemo(() => ({ user, login: (username: string, password: string) => { if (password !== '123456' || !username.trim()) return false; const nextUser = { username: username.trim() }; localStorage.setItem('shopmini-user', nextUser.username); setUser(nextUser); return true }, logout: () => { localStorage.removeItem('shopmini-user'); setUser(null) } }), [user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export function useAuth() { const context = useContext(AuthContext); if (!context) throw new Error('useAuth cần được dùng bên trong AuthProvider'); return context }
