import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { getProduct, type Product } from "@/data/products";

export interface CartLine { product: Product; qty: number }

interface StoreCtx {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (handle: string, qty?: number) => void;
  setQty: (handle: string, qty: number) => void;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
}

const Ctx = createContext<StoreCtx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const value = useMemo<StoreCtx>(() => {
    const lines = Object.entries(items)
      .map(([h, qty]) => ({ product: getProduct(h)!, qty }))
      .filter((l) => l.product && l.qty > 0);
    return {
      lines,
      count: lines.reduce((s, l) => s + l.qty, 0),
      subtotal: lines.reduce((s, l) => s + l.qty * l.product.price, 0),
      add: (h, qty = 1) => {
        setItems((c) => ({ ...c, [h]: (c[h] ?? 0) + qty }));
        setCartOpen(true);
      },
      setQty: (h, qty) =>
        setItems((c) => {
          const n = { ...c };
          if (qty <= 0) delete n[h];
          else n[h] = qty;
          return n;
        }),
      cartOpen, setCartOpen, searchOpen, setSearchOpen,
    };
  }, [items, cartOpen, searchOpen]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useStore outside StoreProvider");
  return c;
}
