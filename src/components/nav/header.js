"use client";

import {
  Avatar,
  Button,
  Dropdown,
  Link,
  Toolbar,
} from "@heroui/react";
import { useState } from "react";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Posts", href: "/posts" },
  { label: "Register", href: "/register" },
  { label: "Contact", href: "/contact" },
];

const profileMenuItems = [
  { label: "Settings", href: "/settings" },
  { label: "Login", href: "/login" },
  { label: "Logout", href: "/logout" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

          <Link href="/" className="text-xl font-bold text-foreground">
            Shohan
          </Link>
        </div>

        <nav aria-label="Desktop navigation" className="hidden items-center gap-6 sm:flex">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              className="text-sm font-medium text-foreground/75 transition hover:text-foreground"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
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
              <Avatar.Fallback>SH</Avatar.Fallback>
            </Avatar>
          </Dropdown.Trigger>
          <Dropdown.Popover placement="bottom end">
            <Dropdown.Menu className="min-w-40" aria-label="Profile actions">
              {profileMenuItems.map((item) => (
                <Dropdown.Item key={item.label} id={item.label.toLowerCase()} textValue={item.label}>
                  <Link className="w-full text-foreground" href={item.href}>
                    {item.label}
                  </Link>
                </Dropdown.Item>
              ))}
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
              <Link
                key={item.label}
                className="rounded-lg px-3 py-2 text-base font-medium text-foreground/80 hover:bg-default-100 hover:text-foreground"
                href={item.href}
                onPress={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {profileMenuItems.map((item) => (
              <Link
                key={item.label}
                className="rounded-lg px-3 py-2 text-base font-medium text-foreground/80 hover:bg-default-100 hover:text-foreground"
                href={item.href}
                onPress={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
