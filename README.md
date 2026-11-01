# Essentials Fragrance Boutique

Build a frontend-only UI for https://essentialsbyak.ca/, using https://ironfuellab.com/ as the reference for page structure, section flow, and product presentation.

Review both websites first. Keep Essentials by AK’s original colours, logo, perfume imagery, and brand identity. Adapt Iron Fuel’s layout into an elegant fragrance store with refined typography, generous spacing, and polished product photography.

Homepage layout:

Compact header with logo, navigation, search, and shopping bag.

Large perfume hero with “Find your signature scent,” short supporting text, and a “Shop Fragrances” button.

Featured product grid with real product images, names, sizes, prices, and add-to-bag buttons.

Image-led collection tiles based on the actual catalogue.

Product spotlight with a large bottle image and verified fragrance details.

Short brand introduction, FAQ accordion, newsletter section, and organised footer.

Borrow Iron Fuel’s section hierarchy, shopping buttons, and alternating image/text sections while keeping the styling appropriate for a premium perfume store.

Also create matching shop and product detail pages, a search overlay, mobile navigation, and cart drawer. Reuse the original store’s real product information and imagery. Do not invent reviews, guarantees, discounts, or product claims.

UI only: Do not build or connect any backend, database, Supabase, authentication, Shopify API, payment processing, or checkout integration. Use local product data and frontend state for demo interactions such as search, filtering, variant selection, and cart updates. Newsletter and checkout controls should be visual placeholders without submitting data or processing payments.

Make the design responsive, with two-column product grids on mobile, readable typography, subtle hover effects, and reusable components. Keep the scope focused on a polished storefront UI.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/230a2cf4-0001-40ac-9426-a9e7c9ea1a84).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Run it on your own computer (live preview on localhost)

1. Connect GitHub in Lovable (Project settings → Git) and download/clone the repository.
2. Install Node.js 20+ (https://nodejs.org) and Bun (https://bun.sh).
3. In the project folder run:
   ```bash
   bun install
   bun run dev
   ```
4. Open the address it prints (usually http://localhost:8080).

Any time you save a change to the code, the page in your browser updates by itself.
Changes made in Lovable reach your computer after you pull them from GitHub (`git pull`).
