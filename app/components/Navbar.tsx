"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "./CartProvider";

const centerLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

function NavLink({
    href,
    label,
    active,
}: {
    href: string;
    label: string;
    active: boolean;
}) {
    return (
        <Link
            href={href}
            aria-current={active ? "page" : undefined}
            className={`block rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                active
                    ? "bg-black/[.06] text-black dark:bg-white/[.145] dark:text-zinc-50"
                    : "text-zinc-600 hover:bg-black/[.04] hover:text-black dark:text-zinc-400 dark:hover:bg-white/[.08] dark:hover:text-zinc-50"
            }`}
        >
            {label}
        </Link>
    );
}

function CartButton({ count }: { count: number }) {
    return (
        <Link
            href="/cart"
            aria-label={`Cart with ${count} item${count === 1 ? "" : "s"}`}
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-black transition-colors hover:bg-black/[.06] dark:text-zinc-50 dark:hover:bg-white/[.08]"
        >
            <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <circle cx="9" cy="20" r="1.4" />
                <circle cx="18" cy="20" r="1.4" />
                <path d="M2 3h2.2l2.3 12.1a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L21 7H5.4" />
            </svg>

            {count > 0 ? (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-semibold leading-none text-white">
                    {count > 99 ? "99+" : count}
                </span>
            ) : null}
        </Link>
    );
}

export default function Navbar() {
    const pathname = usePathname();
    const { count, hydrated } = useCart();
    const [menuOpen, setMenuOpen] = useState(false);

    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname.startsWith(href);

    return (
        <header className="sticky top-0 z-50 border-b border-black/[.08] bg-white/80 backdrop-blur dark:border-white/[.145] dark:bg-black/80">
            <nav className="relative mx-auto grid w-full max-w-5xl grid-cols-[auto_1fr_auto] items-center gap-3 px-6 py-3 sm:grid-cols-[1fr_auto_1fr] sm:py-4">
                {/* Left: brand */}
                <div className="justify-self-start">
                    <Link
                        href="/"
                        className="text-lg font-semibold tracking-tight text-black dark:text-zinc-50"
                    >
                        Product Store
                    </Link>
                </div>

                {/* Center: primary links (desktop) */}
                <ul className="hidden items-center justify-center gap-1 sm:flex sm:gap-2">
                    {centerLinks.map(({ href, label }) => (
                        <li key={href}>
                            <NavLink
                                href={href}
                                label={label}
                                active={isActive(href)}
                            />
                        </li>
                    ))}
                </ul>

                {/* Right: cart + auth (desktop) + hamburger (mobile) */}
                <div className="flex items-center justify-self-end gap-1 sm:gap-2">
                    <CartButton count={hydrated ? count : 0} />

                    <Link
                        href="/sign-in"
                        className="hidden rounded-full px-3 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-black/[.04] hover:text-black sm:block dark:text-zinc-400 dark:hover:bg-white/[.08] dark:hover:text-zinc-50"
                    >
                        Sign in
                    </Link>
                    <Link
                        href="/sign-up"
                        className="hidden rounded-full bg-black px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 sm:block dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                    >
                        Sign up
                    </Link>

                    <button
                        type="button"
                        onClick={() => setMenuOpen((open) => !open)}
                        aria-expanded={menuOpen}
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-black transition-colors hover:bg-black/[.06] sm:hidden dark:text-zinc-50 dark:hover:bg-white/[.08]"
                    >
                        {menuOpen ? (
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                aria-hidden="true"
                            >
                                <path d="M6 6l12 12M18 6L6 18" />
                            </svg>
                        ) : (
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                aria-hidden="true"
                            >
                                <path d="M4 7h16M4 12h16M4 17h16" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile menu panel — any click inside closes it */}
                {menuOpen ? (
                    <div
                        onClick={() => setMenuOpen(false)}
                        className="absolute inset-x-0 top-full col-span-full border-b border-black/[.08] bg-white px-6 py-4 shadow-lg sm:hidden dark:border-white/[.145] dark:bg-black"
                    >
                        <ul className="flex flex-col gap-1">
                            {centerLinks.map(({ href, label }) => (
                                <li key={href}>
                                    <NavLink
                                        href={href}
                                        label={label}
                                        active={isActive(href)}
                                    />
                                </li>
                            ))}
                        </ul>

                        <div className="mt-3 flex flex-col gap-2 border-t border-black/[.06] pt-3 dark:border-white/[.08]">
                            <Link
                                href="/sign-in"
                                className="flex h-10 items-center justify-center rounded-full border border-black/[.08] text-sm font-medium text-black transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:text-zinc-50 dark:hover:bg-white/[.08]"
                            >
                                Sign in
                            </Link>
                            <Link
                                href="/sign-up"
                                className="flex h-10 items-center justify-center rounded-full bg-black text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                            >
                                Sign up
                            </Link>
                        </div>
                    </div>
                ) : null}
            </nav>
        </header>
    );
}
