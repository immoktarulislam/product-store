import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ProductCard from "@/app/components/ProductCard";
import AddToCartButton from "@/app/components/AddToCartButton";
import {
    formatPrice,
    getAllProducts,
    getProductById,
    getRelatedProducts,
} from "@/lib/products";

export function generateStaticParams() {
    return getAllProducts().map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }: PageProps<"/products/[id]">) {
    const { id } = await params;
    const product = getProductById(id);

    if (!product) {
        return { title: "Product not found" };
    }

    return {
        title: `${product.name} | Product Store`,
        description: product.description,
    };
}

export default async function ProductDetailsPage({
    params,
}: PageProps<"/products/[id]">) {
    const { id } = await params;
    const product = getProductById(id);

    if (!product) {
        notFound();
    }

    const related = getRelatedProducts(product.id, 4);

    return (
        <div className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
            <nav className="text-sm text-zinc-500 dark:text-zinc-400">
                <Link href="/products" className="hover:text-black dark:hover:text-zinc-50">
                    Products
                </Link>
                <span className="mx-2">/</span>
                <span className="text-black dark:text-zinc-50">{product.name}</span>
            </nav>

            <div className="mt-6 grid grid-cols-1 gap-10 md:grid-cols-2">
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-black/[.08] bg-zinc-100 dark:border-white/[.145] dark:bg-zinc-900">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                    />
                    {product.badge ? (
                        <span className="absolute left-4 top-4 rounded-full bg-black/80 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                            {product.badge}
                        </span>
                    ) : null}
                </div>

                <div className="flex flex-col">
                    <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                        {product.brand} · {product.category}
                    </p>

                    <h1 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50">
                        {product.name}
                    </h1>

                    <p className="mt-2 text-sm text-amber-600 dark:text-amber-400">
                        ★ {product.rating.toFixed(1)}
                        <span className="text-zinc-500 dark:text-zinc-400">
                            {" "}
                            · {product.reviews} reviews
                        </span>
                    </p>

                    <div className="mt-5 flex items-baseline gap-3">
                        <span className="text-3xl font-semibold text-black dark:text-zinc-50">
                            {formatPrice(product.price)}
                        </span>
                        <span className="text-base text-zinc-500 line-through dark:text-zinc-400">
                            {formatPrice(product.oldPrice)}
                        </span>
                    </div>

                    <p
                        className={`mt-2 text-sm font-medium ${
                            product.stock > 0
                                ? "text-emerald-600 dark:text-emerald-400"
                                : "text-red-600"
                        }`}
                    >
                        {product.stock > 0
                            ? `In stock — ${product.stock} units left`
                            : "Out of stock"}
                    </p>

                    <p className="mt-5 text-sm leading-7 text-zinc-700 dark:text-zinc-300">
                        {product.description}
                    </p>

                    <ul className="mt-5 space-y-2">
                        {product.features.map((feature) => (
                            <li
                                key={feature}
                                className="flex gap-2 text-sm text-zinc-700 dark:text-zinc-300"
                            >
                                <span className="text-emerald-600 dark:text-emerald-400">
                                    ✓
                                </span>
                                {feature}
                            </li>
                        ))}
                    </ul>

                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                        <AddToCartButton
                            productId={product.id}
                            disabled={product.stock === 0}
                        />
                        <Link
                            href="/products"
                            className="flex h-11 items-center justify-center rounded-full border border-black/[.08] px-6 text-sm font-medium text-black transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:text-zinc-50 dark:hover:bg-white/[.08]"
                        >
                            Continue shopping
                        </Link>
                    </div>

                    <div className="mt-8 rounded-2xl border border-black/[.08] p-4 dark:border-white/[.145]">
                        <h2 className="text-sm font-semibold text-black dark:text-zinc-50">
                            Specifications
                        </h2>
                        <dl className="mt-3 divide-y divide-black/[.06] dark:divide-white/[.08]">
                            {Object.entries(product.specs).map(([key, value]) => (
                                <div
                                    key={key}
                                    className="flex justify-between gap-4 py-2 text-sm"
                                >
                                    <dt className="text-zinc-500 dark:text-zinc-400">
                                        {key}
                                    </dt>
                                    <dd className="text-right font-medium text-black dark:text-zinc-50">
                                        {value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>

            {related.length > 0 ? (
                <section className="mt-16">
                    <h2 className="text-xl font-semibold tracking-tight text-black dark:text-zinc-50">
                        You may also like
                    </h2>
                    <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
                        {related.map((item) => (
                            <ProductCard key={item.id} product={item} />
                        ))}
                    </div>
                </section>
            ) : null}
        </div>
    );
}
