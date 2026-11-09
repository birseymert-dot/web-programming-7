import { create } from "zustand";

const STORAGE_KEY = "everyday-shop-cart";

function isValidItem(item) {
  return (
    item !== null &&
    typeof item === "object" &&
    Number.isFinite(item.id) &&
    typeof item.title === "string" &&
    Number.isFinite(item.price) &&
    Number.isInteger(item.quantity) &&
    item.quantity > 0
  );
}

function readStoredItems() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === null) return [];

    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed.filter(isValidItem) : [];
  } catch {
    return [];
  }
}

export const useCartStore = create((set) => ({
  items: readStoredItems(),

  addItem: (product) =>
    set((state) => {
      const currentItem = state.items.find((item) => item.id === product.id);
      const items = currentItem
        ? state.items.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
          )
        : [
            ...state.items,
            {
              id: product.id,
              title: product.title,
              price: product.price,
              quantity: 1,
            },
          ];

      return { items };
    }),

  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((item) => item.id !== id) })),

  setQuantity: (id, quantity) =>
    set((state) => ({
      items:
        !Number.isInteger(quantity) || quantity < 1
          ? state.items.filter((item) => item.id !== id)
          : state.items.map((item) => (item.id === id ? { ...item, quantity } : item)),
    })),

  clear: () => set({ items: [] }),
}));

// Persist only cart changes outside React component effects.
useCartStore.subscribe((state, previousState) => {
  if (state.items === previousState.items) return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  } catch {
    // The in-memory cart remains usable if browser storage is unavailable.
  }
});
