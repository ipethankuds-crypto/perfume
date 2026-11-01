import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/store/ProductCard";
import { collections, products, type CollectionId } from "@/data/products";

type Sort = "featured" | "price-asc" | "price-desc";

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): { c?: CollectionId } => {
    const c = s["c"] as CollectionId | undefined;
    return c && collections.some((x) => x.id === c) ? { c } : {};
  },
  head: () => ({
    meta: [
      { title: "Shop Fragrances — Essentials by AK" },
      { name: "description", content: "Browse Eau de Parfum and Extrait de Parfum fragrances from Afnan, Rasasi, Arabiyat Prestige and Ahmed Al-Maghribi." },
      { property: "og:title", content: "Shop Fragrances — Essentials by AK" },
      { property: "og:description", content: "Browse the full Essentials by AK fragrance collection." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const { c } = Route.useSearch();
  const [sort, setSort] = useState<Sort>("featured");
  const active = collections.find((x) => x.id === c);

  const list = useMemo(() => {
    const l = products.filter((p) => !c || p.collections.includes(c));
    if (sort === "price-asc") return [...l].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return [...l].sort((a, b) => b.price - a.price);
    return l;
  }, [c, sort]);

  const chip = "border px-4 py-2 text-[0.65rem] uppercase tracking-[0.2em] transition-colors";
  return (
    <div className="container-x py-14 md:py-20">
      <p className="eyebrow">Collection</p>
      <h1 className="mt-2 text-4xl md:text-6xl">{active?.title ?? "All fragrances"}</h1>
      <div className="mt-10 flex flex-col gap-4 border-y py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          <Link to="/shop" search={{}} className={`${chip} ${!c ? "border-foreground bg-foreground text-background" : "hover:border-foreground"}`}>All</Link>
          {collections.map((x) => (
            <Link key={x.id} to="/shop" search={{ c: x.id }}
              className={`${chip} ${c === x.id ? "border-foreground bg-foreground text-background" : "hover:border-foreground"}`}>
              {x.title}
            </Link>
          ))}
        </div>
        <label className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Sort
          <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="border bg-card px-3 py-2 text-foreground normal-case tracking-normal">
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </label>
      </div>
      <p className="mt-6 text-sm text-muted-foreground">{list.length} {list.length === 1 ? "fragrance" : "fragrances"}</p>
      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-8 lg:grid-cols-4">
        {list.map((p) => <ProductCard key={p.handle} p={p} />)}
      </div>
    </div>
  );
}
