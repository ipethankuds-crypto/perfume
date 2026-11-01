import type { Product } from "@/data/products";

export function NotesList({ p, tone = "light" }: { p: Product; tone?: "light" | "dark" }) {
  const rows = [["Top", p.notes.top], ["Heart", p.notes.middle], ["Base", p.notes.base]] as const;
  const line = tone === "dark" ? "border-ink-foreground/15" : "border-border";
  return (
    <dl className={`divide-y ${line} border-y ${line}`}>
      {rows.map(([k, v]) => (
        <div key={k} className={`grid grid-cols-[5rem_1fr] gap-4 py-4 ${line}`}>
          <dt className="eyebrow pt-1">{k}</dt>
          <dd className="font-serif text-lg leading-snug">{v.join(", ")}</dd>
        </div>
      ))}
    </dl>
  );
}
