"use client";

import Link from "next/link";
import { useActionState } from "react";
import { login, signup, type AuthFormState } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initial: AuthFormState = { error: null };

function Field(props: { id: string; label: string } & React.ComponentProps<typeof Input>) {
  const { id, label, ...input } = props;
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} name={id} className="h-10" {...input} />
    </div>
  );
}

function FormError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p role="alert" className="rounded-lg bg-negative-soft px-3 py-2.5 text-sm text-negative-ink">
      {message}
    </p>
  );
}

export function LoginForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState(login, initial);
  return (
    <form action={action} className="grid gap-5">
      <div>
        <h2 className="text-[28px] leading-9 font-normal">Sign in</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Demo login: <span className="font-mono text-xs text-foreground">demo@example.com</span> /{" "}
          <span className="font-mono text-xs text-foreground">demo1234</span>
        </p>
      </div>
      <input type="hidden" name="next" value={next} />
      <FormError message={state.error} />
      <Field id="email" label="Email" type="email" autoComplete="email" required defaultValue="demo@example.com" />
      <Field id="password" label="Password" type="password" autoComplete="current-password" required />
      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </Button>
      <p className="text-sm text-muted-foreground">
        New here?{" "}
        <Link href="/signup" className="text-foreground underline underline-offset-4">
          Create an account
        </Link>
      </p>
    </form>
  );
}

export function SignupForm() {
  const [state, action, pending] = useActionState(signup, initial);
  return (
    <form action={action} className="grid gap-5">
      <div>
        <h2 className="text-[28px] leading-9 font-normal">Create an account</h2>
        <p className="mt-2 text-sm text-muted-foreground">This sets up a new, empty workspace for your company.</p>
      </div>
      <FormError message={state.error} />
      <Field id="name" label="Your name" autoComplete="name" required />
      <Field id="company" label="Company" autoComplete="organization" required />
      <Field id="email" label="Email" type="email" autoComplete="email" required />
      <Field id="password" label="Password" type="password" autoComplete="new-password" minLength={8} required />
      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? "Creating account…" : "Create account"}
      </Button>
      <p className="text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-foreground underline underline-offset-4">
          Sign in
        </Link>
      </p>
    </form>
  );
}
