# Product Store

A storefront built with **Next.js 16 (App Router)** — hero banner, a 12-product catalogue with detail pages, a fake JSON API, and a cart that persists in the browser.

## Features

- **Hero section** — full-width banner with gradient overlay, CTA buttons and trust badges (free delivery / 7-day returns / secure payment)
- **12 products** — cards with image, discount badge, rating, price and stock, rendered from local JSON
- **Product details** — `/products/[id]` with specs, feature list, stock status and related products, statically generated for all 12 ids
- **Fake API** — `GET /api/products` backed by `data/products.json` with simulated latency, `?id=` and `?category=` filters
- **Working cart** — add to cart, quantity steppers, remove/clear, order summary with free delivery over ৳2,000, persisted to `localStorage` (and synced across tabs)
- **Responsive navbar** — brand left, Home/About/Contact centre, cart + Sign in/Sign up right, with a hamburger menu on mobile
- **Footer** — link columns, socials and payment methods
- **Supporting pages** — About, Contact (demo form), Sign in, Sign up (demo forms)
- **Dark mode ready** — every component ships with `dark:` variants and follows the OS colour scheme

## Tech stack

| | |
| --- | --- |
| Framework | [Next.js](https://nextjs.org) 16 (App Router, `cacheComponents`) |
| UI | React 19, TypeScript |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"`) |
| Fonts | Geist / Geist Mono via `next/font` |
| Data | Local JSON + Route Handler (no external backend) |

## Getting started

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm start       # serve the production build
npm run lint    # eslint
```

## Routes

| Route | Description |
| --- | --- |
| `/` | Hero + featured grid of all 12 products |
| `/products` | Full catalogue with category chips |
| `/products/[id]` | Product details (12 statically generated pages) |
| `/products-client` | Same list, fetched **client-side** from the fake API |
| `/cart` | Cart with quantities and order summary |
| `/about` | About page with live catalogue stats |
| `/contact` | Contact details + demo message form |
| `/sign-in`, `/sign-up` | Demo auth forms (no backend) |
| `/api/products` | JSON API |

## Fake API

```bash
GET /api/products                       # all products
GET /api/products?id=aria-nc70-headphones # one product (404 if unknown)
GET /api/products?category=Audio          # filter by category
```

```bash
curl http://localhost:3000/api/products | jq '.count'
curl http://localhost:3000/api/products?category=Audio | jq '.products[].name'
```

The handler lives in `app/api/products/route.ts` and adds ~300 ms of simulated latency so client loading states are visible.

## Project structure

```
app/
├── layout.tsx              # Navbar + CartProvider + Footer
├── page.tsx                # Home: hero + featured grid
├── globals.css             # Tailwind + theme tokens
├── api/products/route.ts   # Fake API
├── components/
│   ├── Navbar.tsx          # Responsive nav + cart badge + hamburger
│   ├── Hero.tsx            # Hero section
│   ├── ProductCard.tsx     # Card used on every listing
│   ├── Footer.tsx
│   ├── CartProvider.tsx    # Cart store (useSyncExternalStore + localStorage)
│   ├── CartView.tsx        # Cart page UI
│   ├── AddToCartButton.tsx
│   ├── AuthForm.tsx        # Sign in / sign up
│   └── ContactForm.tsx
├── products/
│   ├── page.jsx            # Server-rendered catalogue
│   └── [id]/page.tsx       # Details + generateStaticParams
│       └── loading.tsx     # Skeleton (required by cacheComponents)
├── products-client/page.jsx
├── cart/ about/ contact/ sign-in/ sign-up/
data/
└── products.json           # The product database (12 items)
lib/
└── products.ts             # Helpers: getAllProducts, getProductById, formatPrice…
public/
├── banner.jpg              # Hero image
└── products/*.jpg          # Product images
```

## Adding a product

Append an object to `data/products.json` and drop an image in `public/products/`:

```jsonc
{
  "id": "my-new-product",          // URL slug → /products/my-new-product
  "name": "My New Product",
  "brand": "Brand",
  "category": "Audio",             // reuse an existing category to group cards
  "price": 1990,
  "oldPrice": 2490,                // strike-through price, drives the -% badge
  "rating": 4.5,
  "reviews": 120,
  "stock": 25,                     // 0 disables "Add to cart"
  "badge": "New",                  // optional pill on the card image
  "image": "/products/my-new-product.jpg",
  "description": "…",
  "features": ["…"],
  "specs": { "Warranty": "1 year" }
}
```

Because the detail route uses `generateStaticParams`, a restart of `next dev` (or a rebuild) picks up the new id.

## How the cart works

- State lives in `app/components/CartProvider.tsx`, exposed through `useCart()`
- Uses `useSyncExternalStore` over a small module-level store, so SSR and hydration never disagree
- Writes `{ id, qty }[]` to `localStorage` under **`product-store-cart`** and listens for `storage` events to sync other tabs
- Prices/details are joined from `lib/products.ts` at render time, so stale ids silently drop out of the cart

## Notes & limitations

- **Auth and checkout are demos** — the forms validate and confirm, but nothing is sent anywhere
- Contact form is client-side only
- Dark mode follows the OS (`prefers-color-scheme`); a manual toggle isn't wired up yet
- The product data, images (via Unsplash) and the ৳ (BDT) price format are placeholders — swap them for your own catalogue

## License

Unlicensed starter project — use it however you like.
