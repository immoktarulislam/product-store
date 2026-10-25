import Image from "next/image";
import Link from "next/link";
import { formatPrice, getDiscount, type Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
    const discount = getDiscount(product);

    return (
        <Link
            href={`/products/${product.id}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-black/[.08] bg-white transition-shadow hover:shadow-lg dark:border-white/[.145] dark:bg-zinc-900"
        >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {product.badge ? (
                    <span className="absolute left-3 top-3 rounded-full bg-black/80 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
                        {product.badge}
                    </span>
                ) : null}
                {discount > 0 ? (
                    <span className="absolute right-3 top-3 rounded-full bg-emerald-600 px-2.5 py-1 text-xs font-medium text-white">
                        -{discount}%
                    </span>
                ) : null}
            </div>

            <div className="flex flex-1 flex-col gap-1.5 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    {product.brand} · {product.category}
                </p>

                <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-black dark:text-zinc-50">
                    {product.name}
                </h3>

                <p className="text-xs text-amber-600 dark:text-amber-400">
                    ★ {product.rating.toFixed(1)}
                    <span className="text-zinc-500 dark:text-zinc-400">
                        {" "}
                        ({product.reviews})
                    </span>
                </p>

                <div className="mt-auto flex items-end justify-between pt-3">
                    <div>
                        <p className="text-base font-semibold text-black dark:text-zinc-50">
                            {formatPrice(product.price)}
                        </p>
                        {discount > 0 ? (
                            <p className="text-xs text-zinc-500 line-through dark:text-zinc-400">
                                {formatPrice(product.oldPrice)}
                            </p>
                        ) : null}
                    </div>

                    <span className="text-xs font-medium text-zinc-600 transition-colors group-hover:text-black dark:text-zinc-300 dark:group-hover:text-white">
                        View details →
                    </span>
                </div>
            </div>
        </Link>
    );
}
