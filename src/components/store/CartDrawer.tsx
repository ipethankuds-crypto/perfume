import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { formatPrice } from "@/data/products";
import { useStore } from "@/lib/store";

export function CartDrawer() {
  const { cartOpen, setCartOpen, lines, subtotal, setQty } = useStore();
  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent className="flex w-full flex-col bg-background p-0 sm:max-w-md">
        <div className="border-b px-6 py-5">
          <SheetTitle className="font-serif text-2xl font-normal">Your bag</SheetTitle>
        </div>
        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="font-serif text-xl">Your bag is empty</p>
            <Button variant="ink" size="xl" onClick={() => setCartOpen(false)}>Continue shopping</Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y overflow-y-auto px-6">
              {lines.map(({ product: p, qty }) => (
                <li key={p.handle} className="flex gap-4 py-5">
                  <img src={p.image} alt="" className="h-24 w-20 object-cover" />
                  <div className="flex flex-1 flex-col">
                    <p className="eyebrow !text-[0.6rem]">{p.brand}</p>
                    <p className="font-serif">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.size}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border">
                        <button aria-label="Decrease" className="p-2" onClick={() => setQty(p.handle, qty - 1)}><Minus className="size-3" /></button>
                        <span className="w-6 text-center text-sm">{qty}</span>
                        <button aria-label="Increase" className="p-2" onClick={() => setQty(p.handle, qty + 1)}><Plus className="size-3" /></button>
                      </div>
                      <button className="text-xs text-muted-foreground underline" onClick={() => setQty(p.handle, 0)}>Remove</button>
                    </div>
                  </div>
                  <p className="text-sm">{formatPrice(p.price * qty)}</p>
                </li>
              ))}
            </ul>
            <div className="border-t px-6 py-5">
              <div className="flex justify-between text-sm"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <p className="mt-1 text-xs text-muted-foreground">Taxes and shipping calculated at checkout.</p>
              <Button variant="ink" size="xl" className="mt-4 w-full" type="button" aria-disabled title="Checkout is a preview only">
                Checkout
              </Button>
              <p className="mt-2 text-center text-[0.65rem] text-muted-foreground">Preview only — checkout is not connected.</p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
