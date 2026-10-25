"use client";

import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useSyncExternalStore,
    type ReactNode,
} from "react";

export type CartItem = { id: string; qty: number };

type CartContextValue = {
    items: CartItem[];
    /** False during SSR/hydration, true once the client store is in use. */
    hydrated: boolean;
    count: number;
    add: (id: string, qty?: number) => void;
    setQty: (id: string, qty: number) => void;
    remove: (id: string) => void;
    clear: () => void;
};

const STORAGE_KEY = "product-store-cart";
const MAX_QTY = 99;

type Listener = () => void;

const listeners = new Set<Listener>();
let cachedRaw: string | null = null;

function parseCart(raw: string): CartItem[] {
    try {
        const parsed: unknown = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed.filter(
            (item): item is CartItem =>
                !!item &&
                typeof (item as CartItem).id === "string" &&
                typeof (item as CartItem).qty === "number"
        );
    } catch {
        return [];
    }
}

function readRaw(): string {
    if (typeof window === "undefined") return "[]";
    if (cachedRaw !== null) return cachedRaw;
    try {
        cachedRaw = window.localStorage.getItem(STORAGE_KEY) ?? "[]";
    } catch {
        cachedRaw = "[]";
    }
    return cachedRaw;
}

function subscribe(listener: Listener) {
    listeners.add(listener);

    // Keep the cached snapshot in sync when another tab changes the cart.
    const onStorage = (event: StorageEvent) => {
        if (event.key === STORAGE_KEY || event.key === null) {
            cachedRaw = null;
            listener();
        }
    };
    window.addEventListener("storage", onStorage);

    return () => {
        listeners.delete(listener);
        window.removeEventListener("storage", onStorage);
    };
}

function commit(next: CartItem[]) {
    const raw = JSON.stringify(next);
    cachedRaw = raw;
    try {
        window.localStorage.setItem(STORAGE_KEY, raw);
    } catch {
        // Storage may be unavailable (private mode, quota).
    }
    for (const listener of listeners) listener();
}

const subscribeToCart = subscribe;
const getCartSnapshot = readRaw;
const getCartServerSnapshot = () => "[]";

const subscribeToHydration = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
    const raw = useSyncExternalStore(
        subscribeToCart,
        getCartSnapshot,
        getCartServerSnapshot
    );
    const hydrated = useSyncExternalStore(
        subscribeToHydration,
        getClientSnapshot,
        getServerSnapshot
    );

    const items = useMemo(() => parseCart(raw), [raw]);

    const add = useCallback((id: string, qty = 1) => {
        const current = parseCart(readRaw());
        const existing = current.find((item) => item.id === id);
        const next = existing
            ? current.map((item) =>
                  item.id === id
                      ? { ...item, qty: Math.min(MAX_QTY, item.qty + qty) }
                      : item
              )
            : [
                  ...current,
                  { id, qty: Math.min(MAX_QTY, Math.max(1, qty)) },
              ];
        commit(next);
    }, []);

    const setQty = useCallback((id: string, qty: number) => {
        const current = parseCart(readRaw());
        const next =
            qty <= 0
                ? current.filter((item) => item.id !== id)
                : current.map((item) =>
                      item.id === id
                          ? { ...item, qty: Math.min(MAX_QTY, qty) }
                          : item
                  );
        commit(next);
    }, []);

    const remove = useCallback((id: string) => {
        commit(parseCart(readRaw()).filter((item) => item.id !== id));
    }, []);

    const clear = useCallback(() => commit([]), []);

    const count = useMemo(
        () => items.reduce((total, item) => total + item.qty, 0),
        [items]
    );

    const value = useMemo(
        () => ({ items, hydrated, count, add, setQty, remove, clear }),
        [items, hydrated, count, add, setQty, remove, clear]
    );

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
}

export function useCart(): CartContextValue {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used inside a <CartProvider>");
    }
    return context;
}
