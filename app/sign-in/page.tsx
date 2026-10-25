import type { Metadata } from "next";
import AuthForm from "../components/AuthForm";

export const metadata: Metadata = {
    title: "Sign In | Product Store",
    description: "Sign in to your Product Store account.",
};

export default function SignInPage() {
    return (
        <div className="mx-auto flex w-full max-w-5xl flex-1 items-center justify-center px-6 py-16">
            <AuthForm mode="sign-in" />
        </div>
    );
}
