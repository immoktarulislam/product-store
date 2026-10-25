import type { Metadata } from "next";
import CartView from "../components/CartView";

export const metadata: Metadata = {
    title: "Your Cart | Product Store",
    description: "Review the items in your cart and check out.",
};

export default function CartPage() {
    return (
        <div className="mx-auto w-full max-w-5xl flex-1 px-6 py-14">
            <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
                Your cart
            </h1>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Quantities are saved in this browser, so your cart survives a
                refresh.
            </p>

            <div className="mt-8">
                <CartView />
            </div>
        </div>
    );
}
