import Link from "next/link";
import Hero from "./components/Hero";
import ProductCard from "./components/ProductCard";
import { getAllProducts } from "@/lib/products";

export default function Home() {
  const products = getAllProducts();

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 font-sans dark:bg-black">
      <Hero />

      <section className="mx-auto w-full max-w-5xl px-6 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
              Featured products
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {products.length} hand-picked items from our catalogue
            </p>
          </div>

          <Link
            href="/products"
            className="text-sm font-medium text-zinc-950 underline-offset-4 hover:underline dark:text-zinc-50"
          >
            View all products →
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
