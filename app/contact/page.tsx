import type { Metadata } from "next";
import ContactForm from "../components/ContactForm";

export const metadata: Metadata = {
    title: "Contact | Product Store",
    description: "Get in touch with the Product Store team.",
};

const details = [
    { label: "Email", value: "support@productstore.com", href: "mailto:support@productstore.com" },
    { label: "Phone", value: "+880 1700-000000", href: "tel:+8801700000000" },
    { label: "Address", value: "12 Gulshan Avenue, Dhaka 1212", href: null },
    { label: "Support hours", value: "Sat-Thu, 9:00 AM - 8:00 PM", href: null },
];

export default function ContactPage() {
    return (
        <div className="mx-auto w-full max-w-5xl flex-1 px-6 py-14">
            <span className="inline-block rounded-full border border-black/[.08] px-3 py-1 text-xs font-medium text-zinc-600 dark:border-white/[.145] dark:text-zinc-300">
                Contact
            </span>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
                Talk to us
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
                Questions about an order, a product or a return? Send a message
                and our team will get back to you within one working day.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.2fr]">
                <dl className="space-y-4">
                    {details.map(({ label, value, href }) => (
                        <div
                            key={label}
                            className="rounded-2xl border border-black/[.08] p-4 dark:border-white/[.145]"
                        >
                            <dt className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                                {label}
                            </dt>
                            <dd className="mt-1 text-sm font-medium text-black dark:text-zinc-50">
                                {href ? (
                                    <a
                                        href={href}
                                        className="underline-offset-4 hover:underline"
                                    >
                                        {value}
                                    </a>
                                ) : (
                                    value
                                )}
                            </dd>
                        </div>
                    ))}
                </dl>

                <div className="rounded-2xl border border-black/[.08] bg-white p-6 dark:border-white/[.145] dark:bg-zinc-900">
                    <h2 className="text-sm font-semibold text-black dark:text-zinc-50">
                        Send a message
                    </h2>
                    <div className="mt-4">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
