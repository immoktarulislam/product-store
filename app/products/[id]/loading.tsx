export default function Loading() {
    return (
        <div className="mx-auto w-full max-w-5xl animate-pulse px-6 py-10">
            <div className="h-4 w-48 rounded bg-black/[.06] dark:bg-white/[.08]" />

            <div className="mt-6 grid grid-cols-1 gap-10 md:grid-cols-2">
                <div className="aspect-square w-full rounded-2xl bg-black/[.06] dark:bg-white/[.08]" />

                <div className="flex flex-col gap-4">
                    <div className="h-3 w-24 rounded bg-black/[.06] dark:bg-white/[.08]" />
                    <div className="h-8 w-3/4 rounded bg-black/[.06] dark:bg-white/[.08]" />
                    <div className="h-5 w-32 rounded bg-black/[.06] dark:bg-white/[.08]" />
                    <div className="h-10 w-40 rounded bg-black/[.06] dark:bg-white/[.08]" />
                    <div className="space-y-2">
                        <div className="h-4 w-full rounded bg-black/[.06] dark:bg-white/[.08]" />
                        <div className="h-4 w-full rounded bg-black/[.06] dark:bg-white/[.08]" />
                        <div className="h-4 w-2/3 rounded bg-black/[.06] dark:bg-white/[.08]" />
                    </div>
                </div>
            </div>
        </div>
    );
}
