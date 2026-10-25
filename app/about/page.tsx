import type { Metadata } from "next";
import Link from "next/link";
import { getAllProducts } from "@/lib/products";

export const metadata: Metadata = {
    title: "About Us | Product Store",
    description: "Who we are and what we sell at Product Store.",
};

const values = [
    {
        title: "Fair pricing",
        body: "Straightforward prices with no hidden fees — what you see is what you pay at checkout.",
    },
    {
        title: "Fast delivery",
        body: "Orders over ৳2,000 ship free and most deliveries arrive within 2-3 working days.",
    },
    {
        title: "Easy returns",
        body: "Changed your mind? Return any item within 7 days for a full refund.",
    },
];

export default function AboutPage() {
    const products = getAllProducts();
    const categories = new Set(products.map((p) => p.category)).size;
    const brands = new Set(products.map((p) => p.brand)).size;

    return (
        <div className="mx-auto w-full max-w-5xl flex-1 px-6 py-14">
            <span className="inline-block rounded-full border border-black/[.08] px-3 py-1 text-xs font-medium text-zinc-600 dark:border-white/[.145] dark:text-zinc-300">
                About us
            </span>

            <h1 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-4xl">
                A store built for everyday shoppers
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
                Product Store brings electronics, fashion, home essentials and
                more into one catalogue so you can shop without hopping between
                shops. Every listing shows the real price, stock level and
                specifications up front, and orders are backed by 7-day
                returns.
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                    { value: products.length, label: "Products" },
                    { value: categories, label: "Categories" },
                    { value: brands, label: "Brands" },
                    { value: "2-3 days", label: "Delivery" },
                ].map(({ value, label }) => (
                    <div
                        key={label}
                        className="rounded-2xl border border-black/[.08] p-4 dark:border-white/[.145]"
                    >
                        <dt className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                            {label}
                        </dt>
                        <dd className="mt-1 text-2xl font-semibold text-black dark:text-zinc-50">
                            {value}
                        </dd>
                    </div>
                ))}
            </dl>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
                {values.map(({ title, body }) => (
                    <div
                        key={title}
                        className="rounded-2xl border border-black/[.08] bg-white p-5 dark:border-white/[.145] dark:bg-zinc-900"
                    >
                        <h2 className="text-sm font-semibold text-black dark:text-zinc-50">
                            {title}
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                            {body}
                        </p>
                    </div>
                ))}
            </div>

            <div className="mt-12 flex flex-col gap-3 sm:flex-row">
                <Link
                    href="/products"
                    className="flex h-11 items-center justify-center rounded-full bg-black px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                >
                    Browse products
                </Link>
                <Link
                    href="/contact"
                    className="flex h-11 items-center justify-center rounded-full border border-black/[.08] px-6 text-sm font-medium text-black transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:text-zinc-50 dark:hover:bg-white/[.08]"
                >
                    Contact us
                </Link>
            </div>
        </div>
    );
}
