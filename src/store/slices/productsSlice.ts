import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const API_URL = 'https://api.artic.edu/api/v1/artworks';

export interface Product {
  id: string; 
  title: string;
  thumbnail: string;
  artist_display: string;
  place_of_origin: string;
  dimensions: string;
  description: string | null;
  liked: boolean;
  image_url: string;
}

interface ProductsState {
  [x: string]: any;
  items: Product[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
};

export const loadProducts = createAsyncThunk('products/loadProducts', async () => {
  const response = await axios.get(API_URL, {
    params: {
      limit: 24,
    },
  });
  
  const products = response.data.data.map((item: any) => ({
    id: `api_${item.id}`, 
    title: item.title,
    thumbnail: item.thumbnail?.lqip || '',
    artist_display: item.artist_display || 'Unknown artist',
    place_of_origin: item.place_of_origin || 'Unknown origin',
    dimensions: item.dimensions || 'Unknown dimensions',
    description: item.description || 'No description available',
    liked: false,
    image_url: item.image_url || 'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg',
  }));

  return products;
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      const newProduct = {
        ...action.payload,
        id: uuidv4(),  
      };
      state.items.unshift(newProduct);  
      localStorage.setItem('products', JSON.stringify(state.items));
    },
    toggleLike(state, action) {
      const product = state.items.find(item => item.id === action.payload);
      if (product) {
        product.liked = !product.liked;
      }
    },
    removeProduct(state, action) {
      const productId = action.payload;
      state.items = state.items.filter(item => item.id !== productId);

      localStorage.setItem('products', JSON.stringify(state.items));
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index >= 0) {
        state.items[index] = action.payload;
        localStorage.setItem('products', JSON.stringify(state.items));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        const savedProducts = JSON.parse(localStorage.getItem('products') || '[]');
        state.status = 'idle';
        state.items = [...savedProducts, ...action.payload];
      })
      .addCase(loadProducts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { toggleLike, removeProduct, addProduct, updateProduct } = productsSlice.actions;

export default productsSlice.reducer;
