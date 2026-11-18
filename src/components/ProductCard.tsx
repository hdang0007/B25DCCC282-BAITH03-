import { ArrowUpRight, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { addToCart } from '../features/cart/cartSlice'
import type { Product } from '../types'
const categoryNames: Record<string, string> = { "men's clothing": 'Thời trang nam', "women's clothing": 'Thời trang nữ', jewelery: 'Phụ kiện', electronics: 'Công nghệ' }
const formatPrice = (price: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(price)
export function ProductCard({ product, index }: { product: Product; index: number }) { const dispatch = useAppDispatch(); return <article className="product-card" style={{ animationDelay: `${Math.min(index, 8) * 55}ms` }}><Link to={`/products/${product.id}`} className="product-image-wrap" aria-label={`Xem ${product.title}`}><span className="product-badge">{categoryNames[product.category] ?? product.category}</span><img src={product.image} alt={product.title} loading="lazy" /><span className="image-arrow"><ArrowUpRight size={17} /></span></Link><div className="product-info"><div className="product-copy"><p className="product-category">{categoryNames[product.category] ?? product.category}</p><Link to={`/products/${product.id}`} className="product-title">{product.title}</Link><p className="product-price">{formatPrice(product.price)}</p></div><button className="add-button" onClick={() => dispatch(addToCart(product))} aria-label={`Thêm ${product.title} vào giỏ hàng`} title="Thêm vào giỏ"><Plus size={19} /></button></div></article> }
