"use client";

import { useState } from "react";

const inputClass =
    "mt-1.5 w-full rounded-lg border border-black/[.08] bg-transparent px-3 py-2 text-sm text-black outline-none transition-colors focus:border-black/40 dark:border-white/[.145] dark:text-zinc-50 dark:focus:border-white/40";

export default function ContactForm() {
    const [sent, setSent] = useState(false);

    return (
        <form
            className="space-y-4"
            onSubmit={(event) => {
                event.preventDefault();
                setSent(true);
                event.currentTarget.reset();
            }}
        >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-black dark:text-zinc-50"
                    >
                        Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Jane Doe"
                        className={inputClass}
                    />
                </div>
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
                        placeholder="you@example.com"
                        className={inputClass}
                    />
                </div>
            </div>

            <div>
                <label
                    htmlFor="message"
                    className="block text-sm font-medium text-black dark:text-zinc-50"
                >
                    Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="How can we help?"
                    className={`${inputClass} resize-y`}
                />
            </div>

            <button
                type="submit"
                className="flex h-10 items-center justify-center rounded-full bg-black px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
                Send message
            </button>

            {sent ? (
                <p className="rounded-lg bg-emerald-50 px-3 py-2 text-xs text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                    Thanks! This is a demo form — connect it to your backend to
                    actually send messages.
                </p>
            ) : null}
        </form>
    );
}
