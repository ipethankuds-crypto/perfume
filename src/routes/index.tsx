import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Citrus, Flower2, Leaf, Sparkles } from "lucide-react";
import { useState } from "react";
import { HeroBackground } from "@/components/store/HeroBackground";
import wrist from "@/assets/mood-wrist.jpg";
import notesImg from "@/assets/mood-notes.jpg";
import oud from "@/assets/mood-oud.jpg";
import { ProductCard, Price } from "@/components/store/ProductCard";
import { Newsletter } from "@/components/store/SiteFooter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { collections, products } from "@/data/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Essentials by AK — Find Your Signature Scent" },
      { name: "description", content: "Premium fragrances from Afnan, Rasasi, Arabiyat Prestige and Ahmed Al-Maghribi. Find your signature scent." },
      { property: "og:title", content: "Essentials by AK — Find Your Signature Scent" },
      { property: "og:description", content: "Premium fragrances. Iconic scents. Made to leave an impression." },
    ],
  }),
  component: Index,
});

const marquee = ["Eau de Parfum", "Extrait de Parfum", "Afnan", "Rasasi", "Arabiyat Prestige", "Ahmed Al-Maghribi", "Premium fragrances", "Iconic scents"];

const families = [
  { icon: Citrus, title: "Fresh citrus", text: "Bergamot, lemon and Sicilian orange open Marwa, Hawas Ice and Supremacy." },
  { icon: Sparkles, title: "Fruity", text: "Pineapple, apple and plum bring a bright, juicy lift to the top notes." },
  { icon: Flower2, title: "Floral & spice", text: "Orange blossom, neroli, cardamom and cinnamon shape the heart." },
  { icon: Leaf, title: "Woods & amber", text: "Oak moss, guaiac wood, amber, musk and ambergris form the base." },
];

const faqs = [
  { q: "What is the difference between Eau de Parfum and Extrait de Parfum?", a: "Extrait de Parfum contains a higher concentration of perfume oils than Eau de Parfum, so it typically wears richer and closer to the skin. Oud & Roses is an Extrait; the rest of the collection is Eau de Parfum." },
  { q: "What sizes are available?", a: "Supremacy, Marwa and Hawas Ice come in 100 mL. Oud & Roses Extrait comes in 60 mL." },
  { q: "How do I choose a scent?", a: "Start with the notes. For fresh citrus and fruit, look at Hawas Ice or Supremacy. For spice and tea, try Marwa. For a warmer floral and woody profile, try Oud & Roses." },
  { q: "Where can I see the full fragrance notes?", a: "Every product page lists the top, heart and base notes as provided by the house." },
];

const layers = [
  { tag: "Top", title: "The first impression.", text: "Bright opening notes like bergamot, lemon and pineapple — what you notice in the first minutes." },
  { tag: "Heart", title: "The character.", text: "Florals and spices such as orange blossom, neroli and cardamom settle in as the scent opens up." },
  { tag: "Base", title: "What stays with you.", text: "Woods, amber, musk and ambergris give the fragrance its depth and finish." },
];

function Headline({ a, b, className = "", center = false }: { a: string; b: string; className?: string; center?: boolean }) {
  return (
    <h2 className={`headline text-4xl md:text-6xl ${center ? "text-center" : ""} ${className}`}>
      {a}
      <br />
      <em className="text-gold">{b}</em>
    </h2>
  );
}

function Index() {
  const { add } = useStore();
  const [tab, setTab] = useState<"best" | "featured">("best");
  const [pick, setPick] = useState(0);
  const featured = tab === "best" ? products : [...products].sort((a, b) => b.price - a.price);
  const chosen = products[pick]!;

  return (
    <>
      {/* 1. Hero */}
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <HeroBackground />
        <div className="hero-video-overlay pointer-events-none absolute inset-0" />
        <div className="container-x relative flex min-h-[calc(100svh-6.5rem)] flex-col justify-center py-20">
          <span className="pill w-fit border-[#edc98a] bg-black/50 font-medium text-[#edc98a] animate-in fade-in slide-in-from-bottom-2 duration-700">Essentials by AK</span>
          <h1 className="headline hero-video-title mt-6 text-5xl animate-in fade-in slide-in-from-bottom-6 duration-1000 md:text-8xl">
            Find your
            <br />
            <em>signature scent.</em>
          </h1>
          <p className="hero-video-description mt-6 max-w-md font-medium leading-relaxed animate-in fade-in delay-300 duration-1000 fill-mode-both md:text-lg">Premium fragrances. Iconic scents. Made to leave an impression.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild variant="gold" size="xl"><Link to="/shop">Shop fragrances</Link></Button>
            <Button asChild variant="line" size="xl" className="border-white/70 bg-black/45 text-white hover:bg-ink-foreground hover:text-ink"><Link to="/" hash="collections">Explore collections</Link></Button>
          </div>
        </div>
      </section>

      {/* 2. Marquee */}
      <div className="overflow-hidden bg-gold py-3.5 text-gold-foreground">
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap text-xs font-medium uppercase tracking-[0.25em]">
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i} className="flex items-center gap-10">{m}<span aria-hidden>✦</span></span>
          ))}
        </div>
      </div>

      {/* 3. Products */}
      <section className="container-x py-20 md:py-28">
        <p className="eyebrow">Best sellers</p>
        <Headline a="Find the scent" b="that fits you." className="mt-4" />
        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-muted-foreground">Fresh, fruity, spiced or woody — every fragrance in the collection, with its size and price.</p>
          <div className="flex gap-2">
            {(["best", "featured"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`rounded-full px-5 py-2 text-[0.65rem] uppercase tracking-[0.18em] transition-colors ${tab === t ? "bg-foreground text-background" : "bg-gold/20 text-foreground hover:bg-gold/35"}`}>
                {t === "best" ? "Best sellers" : "Featured"}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
          {featured.map((p) => <ProductCard key={p.handle} p={p} />)}
        </div>
      </section>

      {/* 4. Collections */}
      <section id="collections" className="bg-secondary py-20 md:py-28">
        <div className="container-x">
          <p className="eyebrow text-center">Essentials collections</p>
          <Headline a="Fragrances with a" b="purpose." center className="mt-4" />
          <p className="mx-auto mt-6 max-w-lg text-center text-muted-foreground">Shop by concentration or by character — each collection draws from the real catalogue.</p>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {collections.slice(0, 3).map((c) => (
              <Link key={c.id} to="/shop" search={{ c: c.id }} className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-ink md:aspect-[3/4]">
                <img src={c.image} alt="" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                <span className="pill absolute left-4 top-4 bg-ink/60 backdrop-blur">{c.title}</span>
                <div className="absolute inset-x-0 bottom-0 p-6 text-ink-foreground">
                  <p className="font-serif text-2xl leading-tight">{c.blurb}.</p>
                  <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-[0.6rem] uppercase tracking-[0.18em] text-gold-foreground transition group-hover:gap-3">
                    Shop {c.title} <ArrowRight className="size-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Note families */}
      <section className="bg-ink py-20 text-ink-foreground md:py-28">
        <div className="container-x">
          <Headline a="The foundation of" b="every scent." center />
          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            {families.map(({ icon: Icon, title, text }) => (
              <div key={title} className="text-center">
                <div className="mx-auto grid size-16 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold"><Icon className="size-7" /></div>
                <h3 className="headline mt-5 text-lg">{title}</h3>
                <p className="mx-auto mt-3 max-w-[16rem] text-sm text-ink-foreground/60">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Layers timeline */}
      <section className="container-x py-20 md:py-28">
        <Headline a="Your scent." b="Your layers." center />
        <div className="mt-14 grid items-center gap-12 md:grid-cols-2">
          <ol className="relative space-y-10 border-l border-gold/40 pl-8">
            {layers.map((l) => (
              <li key={l.tag} className="relative">
                <span className="absolute -left-[2.45rem] top-1 size-3 rounded-full bg-gold ring-4 ring-gold/20" />
                <span className="pill">{l.tag} notes</span>
                <h3 className="headline mt-3 text-2xl">{l.title}</h3>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">{l.text}</p>
              </li>
            ))}
          </ol>
          <div className="relative pb-12">
            <img src={notesImg} alt="Bergamot, pineapple, cinnamon, black tea, oak moss and amber" loading="lazy" width={1200} height={1200} className="aspect-[4/5] w-[85%] rounded-2xl object-cover" />
            <img src={products[3]!.image} alt="Oud & Roses Extrait de Parfum" loading="lazy" className="absolute bottom-0 right-0 aspect-square w-[45%] rounded-2xl border-4 border-background object-cover shadow-2xl" />
          </div>
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="gold" size="xl"><Link to="/shop">Explore all notes <ArrowRight /></Link></Button>
        </div>
      </section>

      {/* 7. Choose your scent — interactive spotlight */}
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <img src={oud} alt="" loading="lazy" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover object-right opacity-80" />
        <div className="hero-fade absolute inset-0" />
        <div className="container-x relative grid items-center gap-10 py-20 md:grid-cols-[1fr_20rem] md:py-28">
          <div>
            <p className="eyebrow">Choose your scent</p>
            <ul className="mt-6 space-y-2">
              {products.map((p, i) => (
                <li key={p.handle}>
                  <button onClick={() => setPick(i)}
                    className={`headline text-left text-3xl transition-colors md:text-5xl ${pick === i ? "italic text-gold" : "text-ink-foreground/45 hover:text-ink-foreground"}`}>
                    {p.name}
                  </button>
                </li>
              ))}
            </ul>
            <Button asChild variant="gold" size="xl" className="mt-10">
              <Link to="/products/$handle" params={{ handle: chosen.handle }}>Shop now <ArrowRight /></Link>
            </Button>
          </div>
          <div key={chosen.handle} className="animate-in fade-in slide-in-from-right-4 rounded-2xl border border-ink-foreground/15 bg-ink/80 p-4 backdrop-blur duration-500">
            <img src={chosen.image} alt={chosen.name} className="aspect-square w-full rounded-xl object-cover" />
            <p className="mt-4 text-[0.6rem] uppercase tracking-[0.2em] text-gold">{chosen.brand}</p>
            <h3 className="font-serif text-xl">{chosen.name}</h3>
            <p className="text-xs text-ink-foreground/60">{chosen.concentration} · {chosen.size}</p>
            <ul className="mt-4 space-y-1.5 text-xs text-ink-foreground/80">
              {chosen.notes.top.slice(0, 2).concat(chosen.notes.middle.slice(0, 1), chosen.notes.base.slice(0, 1)).map((n) => (
                <li key={n} className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-gold" />{n}</li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between border-t border-ink-foreground/10 pt-4">
              <Price p={chosen} className="text-sm" />
              <Button variant="gold" size="sm" className="rounded-full" onClick={() => add(chosen.handle)}>Add to bag</Button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Zigzag collections */}
      <section className="bg-espresso py-20 text-ink-foreground md:py-28">
        <div className="container-x">
          <Headline a="Choose your scent." b="Wear it your way." center />
          <div className="relative mt-16">
            <div className="absolute inset-y-0 left-1/2 hidden w-px bg-gold/40 md:block" />
            {collections.map((c, i) => (
              <div key={c.id} className="relative grid items-center gap-6 py-8 md:grid-cols-2 md:gap-16">
                <span className="absolute left-1/2 top-1/2 hidden size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold md:block" />
                <div className={`${i % 2 ? "md:order-2" : "md:text-right"}`}>
                  <h3 className="headline text-2xl md:text-3xl">{c.title}</h3>
                  <p className="mt-2 text-sm text-ink-foreground/70">{c.blurb}.</p>
                  <Button asChild variant="gold" size="sm" className="mt-4 h-9 rounded-full px-5">
                    <Link to="/shop" search={{ c: c.id }}>Shop {c.title} <ArrowRight /></Link>
                  </Button>
                </div>
                <Link to="/shop" search={{ c: c.id }} className={`group block overflow-hidden rounded-2xl border border-gold/30 ${i % 2 ? "md:order-1" : ""}`}>
                  <img src={c.image} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-105" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Brand statement */}
      <section className="relative overflow-hidden bg-ink text-center text-ink-foreground">
        <img src={wrist} alt="" loading="lazy" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover opacity-55" />
        <div className="relative container-x py-24 md:py-36">
          <span className="pill">Essentials by AK</span>
          <h2 className="headline mt-6 text-5xl md:text-7xl">Made to leave<br /><em className="text-gold">an impression.</em></h2>
          <p className="mx-auto mt-6 max-w-md text-ink-foreground/75">Premium fragrances and iconic scents from Afnan, Rasasi, Arabiyat Prestige and Ahmed Al-Maghribi.</p>
          <Button asChild variant="gold" size="xl" className="mt-9"><Link to="/shop">Choose your fragrance</Link></Button>
        </div>
      </section>

      {/* 10. FAQ */}
      <section id="faq" className="container-x grid gap-10 py-20 md:grid-cols-2 md:py-28">
        <div>
          <p className="eyebrow">FAQs</p>
          <h2 className="headline mt-4 text-5xl md:text-6xl">Questions?<br />We've got<br /><em className="text-gold">answers.</em></h2>
          <p className="mt-6 max-w-sm text-muted-foreground">Everything you need to know about our fragrances, sizes and notes.</p>
        </div>
        <Accordion type="single" collapsible>
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`f${i}`}>
              <AccordionTrigger className="py-5 text-left text-base font-normal hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <Newsletter />
    </>
  );
}
