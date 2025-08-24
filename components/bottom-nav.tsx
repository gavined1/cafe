"use client";

import Link from "next/link";
import { Home, Utensils, QrCode, History, User } from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/menu", label: "Menu", icon: Utensils },
  { href: "/scan", label: "Scan", icon: QrCode },
  { href: "/history", label: "History", icon: History },
  { href: "/profile", label: "Profile", icon: User },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-foreground/10 shadow-lg">
      <div className="max-w-2xl mx-auto flex justify-between items-center px-4 py-2">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center gap-1 text-xs font-medium text-muted-foreground hover:text-teal-600 transition-colors"
          >
            <Icon className="w-6 h-6 mb-0.5" />
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
