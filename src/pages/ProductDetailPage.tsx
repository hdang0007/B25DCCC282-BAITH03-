import { ArrowLeft, ArrowRight, Check, Plus, ShieldCheck, Truck } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { addToCart } from '../features/cart/cartSlice'
import { fetchProducts } from '../features/products/productsSlice'
const formatPrice = (price: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'USD' }).format(price)
const categoryNames: Record<string, string> = { "men's clothing": 'Thời trang nam', "women's clothing": 'Thời trang nữ', jewelery: 'Phụ kiện', electronics: 'Công nghệ' }
export function ProductDetailPage() {
  const { id } = useParams(); const dispatch = useAppDispatch(); const { items, status } = useAppSelector((state) => state.products); const product = items.find((entry) => entry.id === Number(id))
  useEffect(() => { if (status === 'idle') void dispatch(fetchProducts()) }, [dispatch, status])
  if (status === 'loading' || status === 'idle') return <div className="loading-state detail-loading"><span className="spinner" /><span>Đang tải món đồ này...</span></div>
  if (!product) return <section className="not-found"><span className="not-found-number">404</span><h1>Không tìm thấy món đồ.</h1><Link className="button button-dark" to="/">Quay lại cửa hàng <ArrowRight size={16} /></Link></section>
  return <section className="detail-page"><Link className="back-link" to="/"><ArrowLeft size={16} /> Trở lại bộ sưu tập</Link><div className="detail-layout"><div className="detail-image"><img src={product.image} alt={product.title} /><span className="detail-image-index">SHOPMINI SELECTION · 00{product.id}</span></div><div className="detail-copy"><div className="section-kicker"><span className="kicker-line" />{categoryNames[product.category] ?? product.category}</div><h1>{product.title}</h1>{product.rating && <div className="detail-rating"><span>★★★★★</span> {product.rating.rate} <span className="rating-count">({product.rating.count} đánh giá)</span></div>}<p className="detail-price">{formatPrice(product.price)}</p><div className="detail-rule" /><p className="detail-description">{product.description}</p><div className="detail-note"><span><Check size={15} /></span> Một lựa chọn được ShopMini tuyển chọn kỹ càng.</div><button className="button button-dark detail-add" onClick={() => dispatch(addToCart(product))}>Thêm vào giỏ hàng <Plus size={17} /></button><div className="detail-perks"><div><Truck size={17} /><span>Miễn phí giao hàng đơn từ $50</span></div><div><ShieldCheck size={17} /><span>Đổi trả dễ dàng trong 30 ngày</span></div></div><div className="detail-bottom">MÃ SẢN PHẨM <span>SM-{String(product.id).padStart(4, '0')}</span></div></div></div><div className="detail-next"><span>THÊM MÓN HAY VÀO BỘ SƯU TẬP</span><Link to="/">Khám phá tất cả <ArrowRight size={16} /></Link></div></section>
}
