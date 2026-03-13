"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus, Bell, Menu, X, ChevronDown } from "lucide-react";

const navItems = [
  { label: "ダッシュボード", href: "/" },
  { label: "ストア", href: "/store" },
  { label: "店舗", href: "/shops" },
  { label: "注文する", href: "/order" },
  { label: "注文履歴", href: "/history" },
];

const adminSubItems = [
  { label: "記念日管理", href: "/anniversary" },
  { label: "請求書", href: "/invoices" },
  { label: "設定", href: "/settings" },
];

type TopNavProps = {
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
};

export function TopNav({ isMobileMenuOpen, onToggleMobileMenu }: TopNavProps) {
  const pathname = usePathname();
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const adminRef = useRef<HTMLDivElement>(null);

  const isAdminActive = adminSubItems.some((item) => pathname.startsWith(item.href));

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (adminRef.current && !adminRef.current.contains(event.target as Node)) {
        setIsAdminOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 h-[72px] bg-cq-surface-raised border-b border-cq-border flex items-center px-6 lg:px-10">
      {/* Brand */}
      <Link href="/" className="flex flex-col items-start shrink-0 mr-8">
        <span className="cq-heading-display text-cq-primary text-xl tracking-[0.12em] leading-tight">
          CAQUEHIN
        </span>
        <span className="cq-overline text-[9px] text-cq-text-secondary leading-tight mt-0.5">
          for Business
        </span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-1 flex-1">
        {navItems.map((item) => {
          const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-[var(--cq-radius-md)] hover:bg-cq-surface ${
                isActive ? "text-cq-text" : "text-cq-text-secondary hover:text-cq-text"
              }`}
            >
              {item.label}
              {isActive && (
                <span className="absolute bottom-0 left-4 right-4 h-[1.5px] bg-cq-accent" />
              )}
            </Link>
          );
        })}

        {/* Admin Dropdown */}
        <div ref={adminRef} className="relative">
          <button
            onClick={() => setIsAdminOpen(!isAdminOpen)}
            className={`relative flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-[var(--cq-radius-md)] hover:bg-cq-surface ${
              isAdminActive ? "text-cq-text" : "text-cq-text-secondary hover:text-cq-text"
            }`}
          >
            管理
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isAdminOpen ? "rotate-180" : ""}`} />
            {isAdminActive && (
              <span className="absolute bottom-0 left-4 right-4 h-[1.5px] bg-cq-accent" />
            )}
          </button>

          {isAdminOpen && (
            <div className="absolute top-full left-0 mt-1 w-44 bg-cq-surface-raised border border-cq-border rounded-[var(--cq-radius-lg)] shadow-lg py-1 z-50">
              {adminSubItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsAdminOpen(false)}
                  className={`block px-4 py-2.5 text-sm transition-colors hover:bg-cq-surface ${
                    pathname.startsWith(item.href) ? "text-cq-text font-medium" : "text-cq-text"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Right Actions */}
      <div className="hidden md:flex items-center gap-3 ml-auto">
        <Link
          href="/order"
          className="cq-btn-primary text-[10px] px-5 py-2.5"
        >
          <Plus className="w-3.5 h-3.5" />
          ORDER
        </Link>
        <button className="relative p-2 text-cq-text-secondary hover:text-cq-text hover:bg-cq-surface rounded-[var(--cq-radius-md)] transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        <button className="w-8 h-8 bg-cq-primary text-cq-surface rounded-full flex items-center justify-center text-sm font-medium">
          M
        </button>
      </div>

      {/* Mobile Hamburger */}
      <button
        onClick={onToggleMobileMenu}
        className="md:hidden ml-auto p-2 text-cq-text-secondary hover:text-cq-text transition-colors"
        aria-label={isMobileMenuOpen ? "メニューを閉じる" : "メニューを開く"}
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
    </header>
  );
}
