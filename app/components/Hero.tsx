import Image from "next/image";
import Link from "next/link";

const highlights = [
    { label: "Free delivery", detail: "Orders over ৳2,000" },
    { label: "7-day returns", detail: "No questions asked" },
    { label: "Secure payment", detail: "bKash, card & COD" },
];

export default function Hero() {
    return (
        <section className="relative w-full overflow-hidden bg-zinc-900">
            <Image
                src="/banner.jpg"
                alt="Shelves of products in a store"
                fill
                priority
                sizes="100vw"
                className="object-cover object-center opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25" />

            <div className="relative mx-auto w-full max-w-5xl px-6 py-20 sm:py-28">
                <span className="inline-block rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium tracking-wide text-zinc-100 backdrop-blur">
                    New arrivals every week
                </span>

                <h1 className="mt-6 max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
                    Everything you need, in one store
                </h1>

                <p className="mt-4 max-w-xl text-base leading-7 text-zinc-300 sm:text-lg">
                    Browse quality products at fair prices. Fast delivery,
                    secure checkout, and hassle-free returns on every order.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link
                        href="/products"
                        className="flex h-11 items-center justify-center rounded-full bg-white px-6 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
                    >
                        Shop now
                    </Link>
                    <Link
                        href="/products-client"
                        className="flex h-11 items-center justify-center rounded-full border border-white/30 px-6 text-sm font-medium text-white transition-colors hover:bg-white/10"
                    >
                        Load products from API
                    </Link>
                </div>

                <dl className="mt-12 grid max-w-2xl grid-cols-1 gap-6 border-t border-white/15 pt-8 sm:grid-cols-3">
                    {highlights.map(({ label, detail }) => (
                        <div key={label}>
                            <dt className="text-sm font-semibold text-white">
                                {label}
                            </dt>
                            <dd className="mt-1 text-sm text-zinc-400">
                                {detail}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}
