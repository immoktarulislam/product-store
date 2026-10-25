import data from "@/data/products.json";

export type Product = {
    id: string;
    name: string;
    brand: string;
    category: string;
    price: number;
    oldPrice: number;
    rating: number;
    reviews: number;
    stock: number;
    badge: string;
    image: string;
    description: string;
    features: string[];
    specs: Record<string, string>;
};

const products = data as unknown as Product[];

/** All products from the local JSON "database". */
export function getAllProducts(): Product[] {
    return products;
}

/** A single product by id, or undefined when it does not exist. */
export function getProductById(id: string): Product | undefined {
    return products.find((product) => product.id === id);
}

/** Products sharing a category, used for "related" listings. */
export function getRelatedProducts(id: string, limit = 4): Product[] {
    const current = getProductById(id);
    const sameCategory = products.filter(
        (product) => product.id !== id && product.category === current?.category
    );
    const others = products.filter(
        (product) => product.id !== id && product.category !== current?.category
    );
    return [...sameCategory, ...others].slice(0, limit);
}

/** Discount percentage, rounded, or 0 when there is no old price. */
export function getDiscount(product: Product): number {
    if (!product.oldPrice || product.oldPrice <= product.price) return 0;
    return Math.round((1 - product.price / product.oldPrice) * 100);
}

/** Formats a price as taka, matching the rest of the app (৳5,000). */
export function formatPrice(price: number): string {
    return `৳${price.toLocaleString("en-US")}`;
}
