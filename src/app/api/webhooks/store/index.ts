import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { authSlice, type AuthState } from './slices/authSlice';
import { cartSlice, type CartState } from './slices/cartSlice';
import { uiSlice, type UIState } from './slices/uiSlice';

export type StoreState = AuthState & CartState & UIState;

export const useStore = create<StoreState>()(
  devtools(
    persist(
      (...a) => ({
        ...authSlice(...a),
        ...cartSlice(...a),
        ...uiSlice(...a),
      }),
      {
        name: 'app-storage',
        partialize: (state) => ({ 
          user: state.user,
          cart: state.cart,
          theme: state.theme
        }),
      }
    )
  )
);

