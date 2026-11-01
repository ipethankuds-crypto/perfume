import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { NotesList } from "@/components/store/NotesList";
import { Price, ProductCard } from "@/components/store/ProductCard";
import { Button } from "@/components/ui/button";
import { getProduct, products } from "@/data/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/products/$handle")({
  loader: ({ params }) => {
    const product = getProduct(params.handle);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    if (!p) return { meta: [{ title: "Fragrance not found — Essentials by AK" }, { name: "robots", content: "noindex" }] };
    const title = `${p.brand} ${p.name} ${p.concentration} ${p.size} — Essentials by AK`;
    return {
      meta: [
        { title },
        { name: "description", content: p.description },
        { property: "og:title", content: title },
        { property: "og:description", content: p.description },
        { property: "og:image", content: p.image },
        { name: "twitter:image", content: p.image },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-x py-32 text-center">
      <h1 className="text-4xl">Fragrance not found</h1>
      <Link to="/shop" className="mt-6 inline-block underline">Back to shop</Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product: p } = Route.useLoaderData();
  const { add } = useStore();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(p.size);
  const related = products.filter((x) => x.handle !== p.handle).slice(0, 4);

  return (
    <>
      <div className="container-x py-8 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link> / <Link to="/shop" className="hover:text-foreground">Shop</Link> / <span className="text-foreground">{p.name}</span>
      </div>
      <section className="container-x grid gap-10 pb-20 md:grid-cols-2 md:gap-16">
        <div className="aspect-[4/5] overflow-hidden bg-card">
          <img src={p.image} alt={`${p.brand} ${p.name}`} className="h-full w-full object-cover" />
        </div>
        <div className="md:sticky md:top-32 md:self-start">
          <p className="eyebrow">{p.brand}</p>
          <h1 className="mt-3 text-4xl leading-tight md:text-5xl">{p.name}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{p.concentration}</p>
          <Price p={p} className="mt-6 text-xl" />
          <p className="mt-6 leading-relaxed text-muted-foreground">{p.description}</p>

          <div className="mt-8">
            <p className="text-xs uppercase tracking-[0.2em]">Size</p>
            <div className="mt-3 flex gap-2">
              {[p.size].map((s) => (
                <button key={s} onClick={() => setSize(s)}
                  className={`border px-5 py-2 text-sm ${size === s ? "border-foreground bg-foreground text-background" : ""}`}>{s}</button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <div className="flex items-center border">
              <button aria-label="Decrease" className="p-3" onClick={() => setQty((q) => Math.max(1, q - 1))}><Minus className="size-3" /></button>
              <span className="w-8 text-center">{qty}</span>
              <button aria-label="Increase" className="p-3" onClick={() => setQty((q) => q + 1)}><Plus className="size-3" /></button>
            </div>
            <Button variant="ink" size="xl" className="flex-1" onClick={() => add(p.handle, qty)}>Add to bag</Button>
          </div>

          <h2 className="mt-12 mb-4 text-2xl">Fragrance notes</h2>
          <NotesList p={p} />
        </div>
      </section>
      <section className="border-t py-20">
        <div className="container-x">
          <h2 className="text-3xl md:text-4xl">You may also like</h2>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-8 lg:grid-cols-4">
            {related.map((r) => <ProductCard key={r.handle} p={r} />)}
          </div>
        </div>
      </section>
    </>
  );
}
