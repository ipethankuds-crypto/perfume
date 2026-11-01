import type { CollectionId } from "@/data/products";
import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/ak-logo.png";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useStore } from "@/lib/store";

const nav = [
  { label: "Shop all", to: "/shop" as const, search: {} },
  { label: "Eau de Parfum", to: "/shop" as const, search: { c: "eau-de-parfum" as CollectionId } },
  { label: "Extrait", to: "/shop" as const, search: { c: "extrait" as CollectionId } },
  { label: "Unisex", to: "/shop" as const, search: { c: "unisex" as CollectionId } },
];

export function SiteHeader() {
  const { count, setCartOpen, setSearchOpen } = useStore();
  const [menu, setMenu] = useState(false);
  return (
    <header className="boutique-header sticky top-0 z-40 text-ink-foreground">
      <p className="boutique-announcement py-2 text-center text-[0.6rem] font-medium uppercase tracking-[0.3em]">
        Premium fragrances · Iconic scents
      </p>
      <div className="container-x flex h-[4.5rem] items-center justify-between gap-4">
        <div className="flex items-center gap-2 md:hidden">
          <button aria-label="Open menu" onClick={() => setMenu(true)} className="boutique-icon"><Menu className="size-5" /></button>
        </div>
        <Link to="/" aria-label="Essentials by AK home" className="boutique-logo shrink-0 rounded-sm">
          <img src={logo} alt="Essentials by AK" className="h-11 w-auto" />
        </Link>
        <nav aria-label="Main navigation" className="hidden flex-1 justify-center md:flex">
          <div className="boutique-nav flex items-center gap-1 rounded-full p-1">
          {nav.map((n) => (
            <Link key={n.label} to={n.to} search={n.search} className="boutique-nav-link rounded-full px-3 py-2.5 text-[0.65rem] font-medium uppercase tracking-[0.15em] lg:px-5">
              {n.label}
            </Link>
          ))}
          </div>
        </nav>
        <div className="flex items-center gap-2">
          <button aria-label="Search" onClick={() => setSearchOpen(true)} className="boutique-icon"><Search className="size-5" /></button>
          <button aria-label="Shopping bag" onClick={() => setCartOpen(true)} className="boutique-icon relative">
            <ShoppingBag className="size-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-gold text-[0.6rem] text-gold-foreground">{count}</span>
            )}
          </button>
        </div>
      </div>
      <Sheet open={menu} onOpenChange={setMenu}>
        <SheetContent side="left" className="boutique-menu w-[85%] border-none text-ink-foreground">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <img src={logo} alt="Essentials by AK" className="boutique-logo mt-2 h-14 w-auto self-start" />
          <nav aria-label="Mobile navigation" className="mt-10 flex flex-col">
            <Link to="/" onClick={() => setMenu(false)} className="boutique-mobile-link border-b border-gold/20 py-4 font-serif text-2xl">Home</Link>
            {nav.map((n) => (
              <Link key={n.label} to={n.to} search={n.search} onClick={() => setMenu(false)} className="boutique-mobile-link border-b border-gold/20 py-4 font-serif text-2xl">
                {n.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
