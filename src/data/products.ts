// Product data copied from the live Essentials by AK catalogue.
export type CollectionId = "eau-de-parfum" | "extrait" | "unisex" | "for-him";

export interface Product {
  handle: string;
  name: string;
  brand: string;
  concentration: string;
  size: string;
  price: number;
  compareAt?: number;
  image: string;
  collections: CollectionId[];
  description: string;
  notes: { top: string[]; middle: string[]; base: string[] };
}

const cdn = (f: string) => `https://cdn.shopify.com/s/files/1/0772/3669/9308/files/${f}`;

export const products: Product[] = [
  {
    handle: "afnan-supremacy-collectors-edition-eau-de-parfum-100-ml",
    name: "Supremacy Collector's Edition",
    brand: "Afnan",
    concentration: "Eau de Parfum",
    size: "100 mL",
    price: 55,
    compareAt: 66,
    image: cdn("ChatGPTImageAug27_2026_04_19_49PM.png?v=1787862032"),
    collections: ["eau-de-parfum", "unisex", "for-him"],
    description:
      "Afnan Supremacy Collector's Edition is a fruity, woody chypre fragrance for men, introduced in 2024. It delivers a bold blend of fresh fruity and woody notes and is widely regarded as an affordable alternative to Creed Aventus Absolu.",
    notes: {
      top: ["Pineapple", "Bergamot", "White Flowers", "Apple"],
      middle: ["Orange Blossom", "Birch", "Amber"],
      base: ["Oak Moss", "Musk", "Ambergris"],
    },
  },
  {
    handle: "arabiyat-prestige-marwa-eau-de-parfum-100-ml",
    name: "Marwa",
    brand: "Arabiyat Prestige",
    concentration: "Eau de Parfum",
    size: "100 mL",
    price: 51,
    compareAt: 62,
    image: cdn("ChatGPTImageAug26_2026_11_45_35PM_276ca5ad-6ae4-482e-9d26-b8cc1e1a83b3.png?v=1787802403"),
    collections: ["eau-de-parfum", "unisex"],
    description:
      "Luxury-inspired — a sophisticated interpretation of L.V. Imagination, delivering an upscale fragrance experience without the premium price tag.",
    notes: {
      top: ["Calabrian Bergamot", "Lemon", "Sicilian Orange"],
      middle: ["Nigerian Ginger", "Ceylon Cinnamon", "Tunisian Neroli"],
      base: ["Ambroxan", "Chinese Black Tea", "Olibanum", "Guaiac Wood"],
    },
  },
  {
    handle: "hawas-ice-by-rasasi",
    name: "Hawas Ice",
    brand: "Rasasi",
    concentration: "Eau de Parfum",
    size: "100 mL",
    price: 48,
    compareAt: 51,
    image: cdn("1B50B7EF-26E9-47AD-AAED-D38F70C47A9A.png?v=1791219264"),
    collections: ["eau-de-parfum", "for-him"],
    description:
      "Cool, fresh, and confidently bold. Crisp apple and bright citrus open the fragrance, followed by a smooth blend of plum, orange blossom, and cardamom. Musk, amber, driftwood, and moss leave a warm, woody finish.",
    notes: {
      top: ["Apple", "Italian Lemon", "Sicilian Bergamot", "Star Anise"],
      middle: ["Plum", "Orange Blossom", "Cardamom"],
      base: ["Musk", "Amber", "Driftwood", "Moss"],
    },
  },
  {
    handle: "oud-roses-ahmed-al-maghribi",
    name: "Oud & Roses",
    brand: "Ahmed Al-Maghribi",
    concentration: "Extrait de Parfum",
    size: "60 mL",
    price: 51,
    compareAt: 59,
    image: cdn("FullSizeRender.jpg?v=1790555136"),
    collections: ["extrait"],
    description:
      "A rich and sophisticated fragrance blending fresh fruity notes with warm florals and deep woods. Smooth musk, amber and ambergris give it an elegant, long-lasting finish.",
    notes: {
      top: ["Pineapple", "Bergamot", "Apple", "White Floral"],
      middle: ["Orange Blossom", "Birch", "Amber"],
      base: ["Oak Moss", "Musk", "Ambergris"],
    },
  },
];

export const collections: { id: CollectionId; title: string; blurb: string; image: string }[] = [
  { id: "eau-de-parfum", title: "Eau de Parfum", blurb: "Everyday signatures in 100 mL", image: products[0]!.image },
  { id: "extrait", title: "Extrait de Parfum", blurb: "Concentrated and rich", image: products[3]!.image },
  { id: "unisex", title: "Unisex", blurb: "Made to be shared", image: products[1]!.image },
  { id: "for-him", title: "For Him", blurb: "Fresh, woody, bold", image: products[2]!.image },
];

export const getProduct = (handle: string) => products.find((p) => p.handle === handle);
export const formatPrice = (n: number) => `$${n.toFixed(2)}`;
export const fullName = (p: Product) => `${p.brand} ${p.name}`;
