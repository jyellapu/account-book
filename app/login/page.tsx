import AccountBookLogo from "@/app/ui/account-logo";
import LoginForm from "../ui/auth/login-from";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-secondary p-3 md:h-36">
          <AccountBookLogo />
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
