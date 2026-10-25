import Link from "next/link";

const columns = [
    {
        title: "Shop",
        links: [
            { href: "/products", label: "All products" },
            { href: "/products-client", label: "Products via API" },
            { href: "/", label: "Featured" },
        ],
    },
    {
        title: "Company",
        links: [
            { href: "/about", label: "About us" },
            { href: "/contact", label: "Contact" },
        ],
    },
    {
        title: "Account",
        links: [
            { href: "/sign-in", label: "Sign in" },
            { href: "/sign-up", label: "Sign up" },
        ],
    },
];

const socials = [
    { href: "https://facebook.com", label: "Facebook" },
    { href: "https://instagram.com", label: "Instagram" },
    { href: "https://x.com", label: "X" },
    { href: "https://github.com", label: "GitHub" },
];

export default function Footer() {
    return (
        <footer className="border-t border-black/[.08] bg-white dark:border-white/[.145] dark:bg-black">
            <div className="mx-auto w-full max-w-5xl px-6 py-12">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <Link
                            href="/"
                            className="text-lg font-semibold tracking-tight text-black dark:text-zinc-50"
                        >
                            Product Store
                        </Link>
                        <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                            Quality products at fair prices, with fast delivery
                            and hassle-free returns across the country.
                        </p>
                        <ul className="mt-4 flex flex-wrap gap-3">
                            {socials.map(({ href, label }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs font-medium text-zinc-500 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-zinc-50"
                                    >
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Link columns */}
                    {columns.map(({ title, links }) => (
                        <div key={title}>
                            <h2 className="text-sm font-semibold text-black dark:text-zinc-50">
                                {title}
                            </h2>
                            <ul className="mt-3 space-y-2">
                                {links.map(({ href, label }) => (
                                    <li key={label}>
                                        <Link
                                            href={href}
                                            className="text-sm text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-zinc-50"
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-10 flex flex-col gap-3 border-t border-black/[.06] pt-6 dark:border-white/[.08] sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        © 2026 Product Store. All rights reserved.
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        We accept bKash · Nagad · Visa · Mastercard · Cash on
                        delivery
                    </p>
                </div>
            </div>
        </footer>
    );
}
