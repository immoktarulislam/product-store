import type { Metadata } from "next";
import AuthForm from "../components/AuthForm";

export const metadata: Metadata = {
    title: "Sign Up | Product Store",
    description: "Create a Product Store account.",
};

export default function SignUpPage() {
    return (
        <div className="mx-auto flex w-full max-w-5xl flex-1 items-center justify-center px-6 py-16">
            <AuthForm mode="sign-up" />
        </div>
    );
}
