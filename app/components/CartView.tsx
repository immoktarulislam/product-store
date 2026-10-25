"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart, type CartItem } from "./CartProvider";
import { formatPrice, getProductById, type Product } from "@/lib/products";

const FREE_DELIVERY_OVER = 2000;
const DELIVERY_FEE = 120;

export default function CartView() {
    const { items, hydrated, setQty, remove, clear } = useCart();
    const [note, setNote] = useState("");

    const lines: { item: CartItem; product: Product }[] = [];
    for (const item of items) {
        const product = getProductById(item.id);
        if (product) lines.push({ item, product });
    }

    const subtotal = lines.reduce(
        (total, { item, product }) => total + product.price * item.qty,
        0
    );
    const delivery =
        lines.length === 0 || subtotal >= FREE_DELIVERY_OVER ? 0 : DELIVERY_FEE;
    const total = subtotal + delivery;

    if (!hydrated) {
        return (
            <div className="h-64 animate-pulse rounded-2xl border border-black/[.08] bg-black/[.03] dark:border-white/[.145] dark:bg-white/[.04]" />
        );
    }

    if (lines.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-black/[.12] p-10 text-center dark:border-white/[.2]">
                <p className="text-sm font-medium text-black dark:text-zinc-50">
                    Your cart is empty
                </p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    Add a few products and they will show up here.
                </p>
                <Link
                    href="/products"
                    className="mt-6 inline-flex h-10 items-center justify-center rounded-full bg-black px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                >
                    Browse products
                </Link>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_1fr]">
            <ul className="space-y-4">
                {lines.map(({ item, product }) => (
                    <li
                        key={product.id}
                        className="flex gap-4 rounded-2xl border border-black/[.08] bg-white p-4 dark:border-white/[.145] dark:bg-zinc-900"
                    >
                        <Link
                            href={`/products/${product.id}`}
                            className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-24"
                        >
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                sizes="96px"
                                className="object-cover"
                            />
                        </Link>

                        <div className="flex min-w-0 flex-1 flex-col">
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold text-black dark:text-zinc-50">
                                        {product.name}
                                    </p>
                                    <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                                        {product.brand} · {product.category}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => remove(product.id)}
                                    className="shrink-0 text-xs font-medium text-zinc-500 transition-colors hover:text-red-600 dark:text-zinc-400"
                                >
                                    Remove
                                </button>
                            </div>

                            <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                                <div className="flex items-center gap-1 rounded-full border border-black/[.08] p-0.5 dark:border-white/[.145]">
                                    <button
                                        type="button"
                                        aria-label="Decrease quantity"
                                        onClick={() =>
                                            setQty(product.id, item.qty - 1)
                                        }
                                        className="flex h-7 w-7 items-center justify-center rounded-full text-sm text-black transition-colors hover:bg-black/[.06] dark:text-zinc-50 dark:hover:bg-white/[.08]"
                                    >
                                        −
                                    </button>
                                    <span className="w-6 text-center text-sm font-medium text-black dark:text-zinc-50">
                                        {item.qty}
                                    </span>
                                    <button
                                        type="button"
                                        aria-label="Increase quantity"
                                        onClick={() =>
                                            setQty(product.id, item.qty + 1)
                                        }
                                        className="flex h-7 w-7 items-center justify-center rounded-full text-sm text-black transition-colors hover:bg-black/[.06] dark:text-zinc-50 dark:hover:bg-white/[.08]"
                                    >
                                        +
                                    </button>
                                </div>

                                <p className="text-sm font-semibold text-black dark:text-zinc-50">
                                    {formatPrice(product.price * item.qty)}
                                </p>
                            </div>
                        </div>
                    </li>
                ))}

                <li>
                    <button
                        type="button"
                        onClick={() => {
                            clear();
                            setNote("Cart cleared.");
                        }}
                        className="text-xs font-medium text-zinc-500 transition-colors hover:text-red-600 dark:text-zinc-400"
                    >
                        Clear cart
                    </button>
                </li>
            </ul>

            <aside className="h-fit rounded-2xl border border-black/[.08] bg-white p-5 dark:border-white/[.145] dark:bg-zinc-900">
                <h2 className="text-sm font-semibold text-black dark:text-zinc-50">
                    Order summary
                </h2>

                <dl className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                        <dt className="text-zinc-600 dark:text-zinc-400">
                            Subtotal
                        </dt>
                        <dd className="font-medium text-black dark:text-zinc-50">
                            {formatPrice(subtotal)}
                        </dd>
                    </div>
                    <div className="flex justify-between">
                        <dt className="text-zinc-600 dark:text-zinc-400">
                            Delivery
                        </dt>
                        <dd className="font-medium text-black dark:text-zinc-50">
                            {delivery === 0 ? "Free" : formatPrice(delivery)}
                        </dd>
                    </div>
                    <div className="flex justify-between border-t border-black/[.06] pt-3 dark:border-white/[.08]">
                        <dt className="font-semibold text-black dark:text-zinc-50">
                            Total
                        </dt>
                        <dd className="font-semibold text-black dark:text-zinc-50">
                            {formatPrice(total)}
                        </dd>
                    </div>
                </dl>

                {delivery > 0 ? (
                    <p className="mt-3 rounded-lg bg-black/[.04] px-3 py-2 text-xs text-zinc-600 dark:bg-white/[.06] dark:text-zinc-300">
                        Add {formatPrice(FREE_DELIVERY_OVER - subtotal)} more for
                        free delivery.
                    </p>
                ) : null}

                <button
                    type="button"
                    onClick={() =>
                        setNote(
                            "Demo only — connect your backend and payment provider to place real orders."
                        )
                    }
                    className="mt-5 flex h-11 w-full items-center justify-center rounded-full bg-black text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                >
                    Proceed to checkout
                </button>

                {note ? (
                    <p className="mt-3 rounded-lg bg-black/[.04] px-3 py-2 text-xs text-zinc-600 dark:bg-white/[.06] dark:text-zinc-300">
                        {note}
                    </p>
                ) : null}

                <Link
                    href="/products"
                    className="mt-4 block text-center text-sm font-medium text-zinc-600 underline-offset-4 hover:text-black hover:underline dark:text-zinc-400 dark:hover:text-zinc-50"
                >
                    Continue shopping
                </Link>
            </aside>
        </div>
    );
}
