import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {
  cartFormatter,
  getProductFormatter,
  productCartFormatter,
} from '../utils/productFormatter';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface ProductItem {
  category: string;
  description: string;
  id: number;
  images: Array<string>;
  price: number;
  title: string;
  thumbnail: string;
  isFavorite: boolean;
  addedToCart: boolean;
}

export interface CartItem {
  item: ProductItem;
  count: number;
}

export interface Products {
  products: Array<ProductItem>;
  productDetails: ProductItem | null;
  cart: Array<CartItem>;
  loading: boolean;
  error: any;
}

const initialState: Products = {
  products: [],
  error: null,
  loading: false,
  productDetails: null,
  cart: [],
};

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async () => {
    const response = await axios.get('https://dummyjson.com/products');
    return response.data;
  },
);

export const getProductDetails = createAsyncThunk(
  'products/getProductDetails',
  async (id: number) => {
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    return response.data;
  },
);

export const ProductSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<{id: number}>) => {
      let obj: ProductItem | any = {};
      let favObj: ProductItem | any = {};

      let products: Array<ProductItem> = [];
      state.products.forEach((item: ProductItem) => {
        if (item.id === action.payload.id) {
          obj = {
            ...item,
            isFavorite: !item.isFavorite,
          };
          favObj = obj;
        } else {
          obj = {
            ...item,
          };
        }
        products.push(obj);
      });
      state.productDetails = favObj;
      state.products = products;
    },
    addToCart: (state, action: PayloadAction<ProductItem>) => {
      const {cartObj, products} = productCartFormatter({
        data: state.products,
        payload: action.payload,
        add: true,
        cartData: state.cart,
      });
      state.products = products;
      state.productDetails = cartObj;
      state.cart.push({
        count: 1,
        item: action.payload,
      });
    },
    removeFromCart: (state, action: PayloadAction<ProductItem>) => {
      const {cartObj, products, cartData} = productCartFormatter({
        data: state.products,
        payload: action.payload,
        add: false,
        cartData: state.cart,
      });
      state.products = products;
      state.productDetails = cartObj;
      state.cart = cartData;
    },
    increaseCart: (state, action: PayloadAction<{id: number}>) => {
      state.cart = cartFormatter(state.cart, action.payload, true);
    },
    decreaseCart: (state, action: PayloadAction<{id: number}>) => {
      state.cart = cartFormatter(state.cart, action.payload, false);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getProducts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = getProductFormatter(action.payload.products);
        state.loading = false;
      })
      .addCase(getProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductDetails.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        let obj: ProductItem | any = {};
        state.products.forEach((item: ProductItem) => {
          if (item.id === action.payload.id) {
            obj = {
              ...action.payload,
              isFavorite: item.isFavorite,
              addedToCart: false,
            };
          }
        });
        state.productDetails = obj;
        state.loading = false;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const {
  addFavorite,
  addToCart,
  decreaseCart,
  increaseCart,
  removeFromCart,
} = ProductSlice.actions;

export default ProductSlice.reducer;
