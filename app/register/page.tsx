import type { Metadata } from "next";
import RegisterForm from "./register-form";

export const metadata: Metadata = {
  title: "Register | TechGadgets",
  description: "Create your TechGadgets account",
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">Create account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Register to start shopping with TechGadgets
          </p>
        </div>

        <RegisterForm />
      </div>
    </div>
  );
}
