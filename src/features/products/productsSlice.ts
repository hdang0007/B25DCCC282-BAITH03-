import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { Product } from '../../types'
interface ProductsState { items: Product[]; status: 'idle' | 'loading' | 'succeeded' | 'failed'; error: string | null }
const initialState: ProductsState = { items: [], status: 'idle', error: null }
export const fetchProducts = createAsyncThunk<Product[]>('products/fetchProducts', async () => {
  const response = await fetch('https://fakestoreapi.com/products')
  if (!response.ok) throw new Error('Không thể tải sản phẩm. Vui lòng thử lại.')
  return (await response.json()) as Product[]
})
const productsSlice = createSlice({ name: 'products', initialState, reducers: {}, extraReducers: (builder) => {
  builder.addCase(fetchProducts.pending, (state) => { state.status = 'loading'; state.error = null })
    .addCase(fetchProducts.fulfilled, (state, action) => { state.status = 'succeeded'; state.items = action.payload })
    .addCase(fetchProducts.rejected, (state, action) => { state.status = 'failed'; state.error = action.error.message ?? 'Đã có lỗi xảy ra.' })
} })
export default productsSlice.reducer
