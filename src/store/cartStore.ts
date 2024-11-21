import { create } from 'zustand';
import { CartItem, Article } from '../types';

interface CartState {
  items: CartItem[];
  addItem: (article: Article, quantity: number) => void;
  removeItem: (articleId: number) => void;
  updateQuantity: (articleId: number, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (article, quantity) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.article.id === article.id);
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.article.id === article.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      return { items: [...state.items, { article, quantity }] };
    }),
  removeItem: (articleId) =>
    set((state) => ({
      items: state.items.filter((item) => item.article.id !== articleId),
    })),
  updateQuantity: (articleId, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.article.id === articleId ? { ...item, quantity } : item
      ),
    })),
  clearCart: () => set({ items: [] }),
}));