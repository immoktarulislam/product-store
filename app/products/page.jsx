import Link from "next/link";
import ProductCard from "../components/ProductCard";
import { getAllProducts } from "@/lib/products";

export const metadata = {
    title: "All Products | Product Store",
    description: "Browse the full product catalogue.",
};

export default function ProductsPage() {
    const products = getAllProducts();

    const categories = [...new Set(products.map((p) => p.category))];

    return (
        <div className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
                        All Products
                    </h1>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                        {products.length} items in {categories.length} categories
                    </p>
                </div>

                <Link
                    href="/products-client"
                    className="text-sm font-medium text-zinc-950 underline-offset-4 hover:underline dark:text-zinc-50"
                >
                    Load from API instead →
                </Link>
            </div>

            <ul className="mt-6 flex flex-wrap gap-2">
                {categories.map((category) => (
                    <li
                        key={category}
                        className="rounded-full border border-black/[.08] px-3 py-1 text-xs font-medium text-zinc-600 dark:border-white/[.145] dark:text-zinc-300"
                    >
                        {category}
                    </li>
                ))}
            </ul>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
