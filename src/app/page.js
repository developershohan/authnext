"use client";

import { Button } from "@heroui/react";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-4xl flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-4xl font-bold">Hello world!</h1>
      <p className="max-w-xl text-foreground/70">
        The auth flow is wired up and the app is rendering with a stable client
        tree now.
      </p>
      <div className="flex gap-3">
        <Button as="a" href="/register" color="primary">
          Open Register
        </Button>
        <Button as="a" href="/dashboard" variant="bordered">
          Open Dashboard
        </Button>
      </div>
    </main>
  );
}
