import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import logo from "@/assets/ak-logo.png";
import { collections, products } from "@/data/products";

export function Newsletter() {
  return (
    <section className="relative bg-[linear-gradient(to_bottom,var(--color-background)_50%,var(--color-ink)_50%)] px-4">
      <div className="mx-auto max-w-5xl rounded-3xl bg-gold px-6 py-14 text-center text-gold-foreground md:py-20">
        <h2 className="headline text-4xl md:text-6xl">Join the<br /><em>Essentials circle</em></h2>
        <p className="mt-4 text-sm">Be first to hear about new arrivals.</p>
        <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="you@email.com" aria-label="Email address"
            className="h-12 flex-1 rounded-full border border-gold-foreground/40 bg-transparent px-5 text-sm outline-none placeholder:text-gold-foreground/60 focus:border-gold-foreground" />
          <button type="submit" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 text-xs uppercase tracking-[0.18em] text-ink-foreground transition hover:gap-3">
            Subscribe <ArrowRight className="size-3.5" />
          </button>
        </form>
        <p className="mt-3 text-[0.65rem] opacity-70">Preview only — no email is sent.</p>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-ink pt-16 pb-8 text-ink-foreground">
      <div className="container-x grid gap-10 md:grid-cols-5">
        <div className="md:col-span-2">
          <img src={logo} alt="Essentials by AK" className="h-20 w-auto" />
          <p className="mt-4 max-w-xs text-sm text-ink-foreground/60">Premium fragrances. Iconic scents. Made to leave an impression.</p>
        </div>
        <div>
          <p className="headline text-sm text-gold">Fragrances</p>
          <ul className="mt-4 space-y-2 text-sm text-ink-foreground/80">
            {products.map((p) => (
              <li key={p.handle}><Link to="/products/$handle" params={{ handle: p.handle }} className="hover:text-gold">{p.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="headline text-sm text-gold">Collections</p>
          <ul className="mt-4 space-y-2 text-sm text-ink-foreground/80">
            {collections.map((c) => (
              <li key={c.id}><Link to="/shop" search={{ c: c.id }} className="hover:text-gold">{c.title}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="headline text-sm text-gold">Explore</p>
          <ul className="mt-4 space-y-2 text-sm text-ink-foreground/80">
            <li><Link to="/" className="hover:text-gold">Home</Link></li>
            <li><Link to="/shop" className="hover:text-gold">Shop all</Link></li>
            <li><Link to="/" hash="faq" className="hover:text-gold">FAQ</Link></li>
          </ul>
        </div>
      </div>
      <div className="container-x mt-14 border-t border-ink-foreground/10 pt-6 text-xs text-ink-foreground/50">
        © {new Date().getFullYear()} Essentials by AK. All rights reserved.
      </div>
    </footer>
  );
}
