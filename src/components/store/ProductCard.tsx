import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { formatPrice, type Product } from "@/data/products";
import { useStore } from "@/lib/store";

export function Price({ p, className = "" }: { p: Product; className?: string }) {
  return (
    <span className={`flex items-baseline gap-2 ${className}`}>
      <span>{formatPrice(p.price)}</span>
      {p.compareAt && <s className="text-[0.8em] text-muted-foreground">{formatPrice(p.compareAt)}</s>}
    </span>
  );
}

export function ProductCard({ p }: { p: Product }) {
  const { add } = useStore();
  return (
    <article className="group flex flex-col rounded-2xl border bg-card p-2 transition-shadow duration-300 hover:shadow-xl hover:shadow-foreground/5 md:p-3">
      <Link to="/products/$handle" params={{ handle: p.handle }} className="relative block aspect-square overflow-hidden rounded-xl bg-ink">
        <img src={p.image} alt={`${p.brand} ${p.name}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      </Link>
      <div className="flex flex-1 flex-col px-1 pt-4 pb-1">
        <p className="text-[0.6rem] uppercase tracking-[0.15em] text-muted-foreground">{p.concentration} · {p.size}</p>
        <Link to="/products/$handle" params={{ handle: p.handle }}>
          <h3 className="mt-1.5 font-sans text-sm leading-snug md:text-base">{p.brand} – {p.name}</h3>
        </Link>
        <div className="mt-auto flex items-center justify-between pt-4">
          <Price p={p} className="text-sm font-medium" />
          <button
            aria-label={`Add ${p.name} to bag`}
            onClick={() => add(p.handle)}
            className="grid size-9 place-items-center rounded-full bg-foreground text-background transition-colors hover:bg-gold hover:text-gold-foreground"
          >
            <ShoppingBag className="size-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
