import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { CartItem, Product } from '../../types'
const initialState: CartItem[] = []
const cartSlice = createSlice({ name: 'cart', initialState, reducers: {
  addToCart: (state, action: PayloadAction<Product>) => { const existing = state.find((item) => item.product.id === action.payload.id); if (existing) existing.quantity += 1; else state.push({ product: action.payload, quantity: 1 }) },
  removeFromCart: (state, action: PayloadAction<number>) => state.filter((item) => item.product.id !== action.payload),
  updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => { const item = state.find((entry) => entry.product.id === action.payload.id); if (item && action.payload.quantity > 0) item.quantity = action.payload.quantity },
  clearCart: () => [],
} })
export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export const selectCartCount = (items: CartItem[]): number => items.reduce((sum, item) => sum + item.quantity, 0)
export const selectCartTotal = (items: CartItem[]): number => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
export default cartSlice.reducer
