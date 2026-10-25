"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "./CartProvider";

export default function AddToCartButton({
    productId,
    disabled = false,
}: {
    productId: string;
    disabled?: boolean;
}) {
    const { add } = useCart();
    const [added, setAdded] = useState(false);
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => () => {
        if (timer.current) clearTimeout(timer.current);
    }, []);

    return (
        <button
            type="button"
            disabled={disabled}
            onClick={() => {
                add(productId);
                setAdded(true);
                if (timer.current) clearTimeout(timer.current);
                timer.current = setTimeout(() => setAdded(false), 1800);
            }}
            className={`flex h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                added
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            }`}
        >
            {added ? "Added to cart ✓" : "Add to cart"}
        </button>
    );
}
