
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "../components/ProductCard";

export default function ProductsClientPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadProducts() {
            try {
                // Fake API backed by data/products.json (see app/api/products/route.ts)
                const res = await fetch("/api/products");

                if (!res.ok) {
                    throw new Error("Failed to load products");
                }

                const data = await res.json();
                setProducts(data.products);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadProducts();
    }, []);

    if (loading) {
        return (
            <div className="mx-auto w-full max-w-5xl px-6 py-10">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Loading products from /api/products...
                </p>
                <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-64 animate-pulse rounded-2xl border border-black/[.08] bg-black/[.04] dark:border-white/[.145] dark:bg-white/[.05]"
                        />
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mx-auto w-full max-w-5xl px-6 py-10">
                <p className="text-sm text-red-600">Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-5xl px-6 py-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
                        Products (client fetched)
                    </h1>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                        {products.length} items fetched from the fake API at
                        /api/products
                    </p>
                </div>

                <Link
                    href="/products"
                    className="text-sm font-medium text-zinc-950 underline-offset-4 hover:underline dark:text-zinc-50"
                >
                    View server-rendered list →
                </Link>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
