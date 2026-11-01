import { Link } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { formatPrice, products } from "@/data/products";
import { useStore } from "@/lib/store";

export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore();
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!searchOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSearchOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen, setSearchOpen]);

  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return products;
    return products.filter((p) =>
      [p.name, p.brand, p.concentration, ...p.notes.top, ...p.notes.middle, ...p.notes.base].join(" ").toLowerCase().includes(t),
    );
  }, [q]);

  if (!searchOpen) return null;
  const close = () => { setSearchOpen(false); setQ(""); };

  return (
    <div className="fixed inset-0 z-50 animate-in fade-in bg-ink/95 text-ink-foreground" role="dialog" aria-label="Search">
      <div className="container-x pt-8">
        <div className="flex items-center gap-4 border-b border-gold/50 pb-4">
          <Search className="size-5 text-gold" />
          <input
            autoFocus value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, house or note — e.g. bergamot"
            className="flex-1 bg-transparent font-serif text-2xl outline-none placeholder:text-ink-foreground/40 md:text-4xl"
          />
          <button aria-label="Close search" onClick={close} className="p-2 hover:text-gold"><X className="size-6" /></button>
        </div>
        <p className="eyebrow mt-8">{results.length} {results.length === 1 ? "result" : "results"}</p>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {results.map((p) => (
            <li key={p.handle}>
              <Link to="/products/$handle" params={{ handle: p.handle }} onClick={close} className="flex items-center gap-4 p-2 transition-colors hover:bg-ink-foreground/5">
                <img src={p.image} alt="" className="size-20 object-cover" />
                <div>
                  <p className="text-[0.6rem] uppercase tracking-[0.25em] text-gold">{p.brand}</p>
                  <p className="font-serif text-lg">{p.name}</p>
                  <p className="text-xs text-ink-foreground/60">{p.concentration} · {p.size} · {formatPrice(p.price)}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
