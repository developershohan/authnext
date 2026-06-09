"use client";

import {
  Avatar,
  Button,
  Dropdown,
  Toolbar,
} from "@heroui/react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

const publicMenuItems = [
  { label: "Home", href: "/" },
  { label: "Posts", href: "/posts" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = status === "authenticated";
  const isSessionLoading = status === "loading";
  const avatarFallback = session?.user?.email?.slice(0, 2).toUpperCase() || "SH";
  const menuItems = [
    ...publicMenuItems,
    ...(isSessionLoading
      ? []
      : isAuthenticated
        ? [{ label: "Dashboard", href: "/dashboard" }]
        : [{ label: "Register", href: "/register" }]),
  ];
  const profileMenuItems = isAuthenticated
    ? [
        { label: "Settings", href: "/settings" },
        { label: "Dashboard", href: "/dashboard" },
      ]
    : [
        { label: "Login", href: "/register" },
        { label: "Register", href: "/register" },
      ];

  const handleLogout = async () => {
    setIsMenuOpen(false);
    await signOut({ redirect: false, callbackUrl: "/register" });
    router.push("/register");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-default-200 bg-background/85 backdrop-blur-md">
      <Toolbar
        aria-label="Main navigation"
        className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        <div className="flex items-center gap-3">
          <Button
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center sm:hidden"
            isIconOnly
            onPress={() => setIsMenuOpen((open) => !open)}
            variant="ghost"
          >
            <span className="flex h-5 w-5 flex-col justify-center gap-1.5">
              <span
                className={`h-0.5 rounded-full bg-foreground transition ${
                  isMenuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`h-0.5 rounded-full bg-foreground transition ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-0.5 rounded-full bg-foreground transition ${
                  isMenuOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </span>
          </Button>

          <NextLink href="/" className="text-xl font-bold text-foreground">
            Shohan
          </NextLink>
        </div>

        <nav aria-label="Desktop navigation" className="hidden items-center gap-6 sm:flex">
          {menuItems.map((item) => (
            <NextLink
              key={item.label}
              className="text-sm font-medium text-foreground/75 transition hover:text-foreground"
              href={item.href}
            >
              {item.label}
            </NextLink>
          ))}
          {isAuthenticated ? (
            <button
              type="button"
              className="text-sm font-medium text-foreground/75 transition hover:text-foreground"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : null}
        </nav>

        <Dropdown>
          <Dropdown.Trigger
            aria-label="Open profile menu"
            className="rounded-full outline-none ring-offset-background transition hover:opacity-85 focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
          >
            <Avatar size="sm">
              <Avatar.Image
                alt="Profile"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80"
              />
              <Avatar.Fallback>{avatarFallback}</Avatar.Fallback>
            </Avatar>
          </Dropdown.Trigger>
          <Dropdown.Popover placement="bottom end">
            <Dropdown.Menu className="min-w-40" aria-label="Profile actions">
              {profileMenuItems.map((item) => (
                <Dropdown.Item key={item.label} id={item.label.toLowerCase()} textValue={item.label}>
                  <NextLink className="block w-full text-foreground" href={item.href}>
                    {item.label}
                  </NextLink>
                </Dropdown.Item>
              ))}
              {isAuthenticated ? (
                <Dropdown.Item id="logout" textValue="Logout">
                  <button
                    type="button"
                    className="block w-full text-left text-foreground"
                    onPress={handleLogout}
                  >
                    Logout
                  </button>
                </Dropdown.Item>
              ) : null}
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
      </Toolbar>

      {isMenuOpen ? (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-default-200 bg-background px-4 py-3 sm:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {menuItems.map((item) => (
              <NextLink
                key={item.label}
                className="rounded-lg px-3 py-2 text-base font-medium text-foreground/80 hover:bg-default-100 hover:text-foreground"
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </NextLink>
            ))}
            {isAuthenticated ? (
              <button
                type="button"
                className="rounded-lg px-3 py-2 text-left text-base font-medium text-foreground/80 hover:bg-default-100 hover:text-foreground"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : null}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
