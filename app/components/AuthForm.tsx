"use client";

import Link from "next/link";
import { useState } from "react";

type Mode = "sign-in" | "sign-up";

export default function AuthForm({ mode }: { mode: Mode }) {
    const [submitted, setSubmitted] = useState(false);

    const isSignUp = mode === "sign-up";

    return (
        <div className="w-full max-w-sm rounded-2xl border border-black/[.08] bg-white p-6 shadow-sm dark:border-white/[.145] dark:bg-zinc-900">
            <h1 className="text-xl font-semibold tracking-tight text-black dark:text-zinc-50">
                {isSignUp ? "Create your account" : "Welcome back"}
            </h1>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {isSignUp
                    ? "Sign up to save your cart and track orders."
                    : "Sign in to continue to your account."}
            </p>

            <form
                className="mt-6 space-y-4"
                onSubmit={(event) => {
                    event.preventDefault();
                    setSubmitted(true);
                }}
            >
                {isSignUp ? (
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-black dark:text-zinc-50"
                        >
                            Full name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            autoComplete="name"
                            placeholder="Jane Doe"
                            className="mt-1.5 w-full rounded-lg border border-black/[.08] bg-transparent px-3 py-2 text-sm text-black outline-none transition-colors focus:border-black/40 dark:border-white/[.145] dark:text-zinc-50 dark:focus:border-white/40"
                        />
                    </div>
                ) : null}

                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-black dark:text-zinc-50"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="you@example.com"
                        className="mt-1.5 w-full rounded-lg border border-black/[.08] bg-transparent px-3 py-2 text-sm text-black outline-none transition-colors focus:border-black/40 dark:border-white/[.145] dark:text-zinc-50 dark:focus:border-white/40"
                    />
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-black dark:text-zinc-50"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        minLength={8}
                        autoComplete={
                            isSignUp ? "new-password" : "current-password"
                        }
                        placeholder="••••••••"
                        className="mt-1.5 w-full rounded-lg border border-black/[.08] bg-transparent px-3 py-2 text-sm text-black outline-none transition-colors focus:border-black/40 dark:border-white/[.145] dark:text-zinc-50 dark:focus:border-white/40"
                    />
                </div>

                <button
                    type="submit"
                    className="flex h-10 w-full items-center justify-center rounded-full bg-black text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                >
                    {isSignUp ? "Create account" : "Sign in"}
                </button>
            </form>

            {submitted ? (
                <p className="mt-4 rounded-lg bg-black/[.04] px-3 py-2 text-xs text-zinc-600 dark:bg-white/[.06] dark:text-zinc-300">
                    Demo only — no backend is connected yet, so nothing was
                    submitted.
                </p>
            ) : null}

            <p className="mt-5 text-center text-sm text-zinc-600 dark:text-zinc-400">
                {isSignUp ? (
                    <>
                        Already have an account?{" "}
                        <Link
                            href="/sign-in"
                            className="font-medium text-black underline-offset-4 hover:underline dark:text-zinc-50"
                        >
                            Sign in
                        </Link>
                    </>
                ) : (
                    <>
                        New here?{" "}
                        <Link
                            href="/sign-up"
                            className="font-medium text-black underline-offset-4 hover:underline dark:text-zinc-50"
                        >
                            Create an account
                        </Link>
                    </>
                )}
            </p>
        </div>
    );
}
