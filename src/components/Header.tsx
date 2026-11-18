import { ArrowRight, LogOut, Moon, ShoppingBag, Sun } from 'lucide-react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { selectCartCount } from '../features/cart/cartSlice'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
export function Header() {
  const count = selectCartCount(useAppSelector((state) => state.cart)); const { user, logout } = useAuth(); const { theme, toggleTheme } = useTheme(); const navigate = useNavigate()
  const handleLogout = () => { logout(); navigate('/') }
  return <header className="site-header"><div className="header-inner"><Link className="brand" to="/"><span className="brand-mark"><ShoppingBag size={20} strokeWidth={2.2} /></span><span>shop<span className="brand-accent">mini</span><small>CURATED EVERYDAY</small></span></Link><nav className="main-nav" aria-label="Điều hướng chính"><NavLink to="/">Cửa hàng</NavLink><a href="/#about">Về chúng tôi</a></nav><div className="header-actions"><button className="icon-button theme-button" onClick={toggleTheme} aria-label="Đổi giao diện" title="Đổi giao diện">{theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}</button><Link className="cart-link" to="/cart" aria-label={`Giỏ hàng, ${count} sản phẩm`}><ShoppingBag size={19} /><span className="cart-label">Giỏ hàng</span><span className="cart-count">{count}</span></Link>{user ? <div className="user-chip"><span className="avatar">{user.username.charAt(0).toUpperCase()}</span><span className="user-name">{user.username}</span><button className="icon-button logout-button" title="Đăng xuất" aria-label="Đăng xuất" onClick={handleLogout}><LogOut size={16} /></button></div> : <Link className="login-link" to="/login">Đăng nhập <ArrowRight size={15} /></Link>}</div></div></header>
}
