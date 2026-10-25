/**
 * Fake products API — serves the local JSON dataset so the app works without
 * an external backend.
 *
 *   GET /api/products            -> all products
 *   GET /api/products?id=...     -> a single product (404 when unknown)
 *   GET /api/products?category=  -> filtered by category
 */

import allProducts from "@/data/products.json";

const LATENCY_MS = 300;

function wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function GET(request: Request) {
    // Simulated network latency so client loading states are visible.
    await wait(LATENCY_MS);

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const category = searchParams.get("category");

    if (id) {
        const product = allProducts.find((p) => p.id === id);
        if (!product) {
            return Response.json(
                { error: `Product "${id}" not found` },
                { status: 404 }
            );
        }
        return Response.json(product);
    }

    const result = category
        ? allProducts.filter(
              (p) => p.category.toLowerCase() === category.toLowerCase()
          )
        : allProducts;

    return Response.json({ count: result.length, products: result });
}
