"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus, Bell, Menu, X, ChevronDown } from "lucide-react";

// メインナビ: ストア体験に集中
const navItems = [
  { label: "ストア", href: "/store" },
  { label: "注文する", href: "/order" },
  { label: "注文履歴", href: "/history" },
];

// アカウントメニューに格納
const accountSubItems = [
  { label: "ダッシュボード", href: "/" },
  { label: "店舗を探す", href: "/shops" },
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
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setIsAccountOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 h-[64px] bg-cq-surface/80 backdrop-blur-xl border-b border-cq-border/40 flex items-center px-6 lg:px-10">
      {/* Brand */}
      <Link href="/store" className="flex flex-col items-start shrink-0 mr-10">
        <span className="cq-heading-display text-cq-primary text-lg tracking-[0.2em] leading-tight">
          CAQUEHIN
        </span>
      </Link>

      {/* Desktop Navigation — minimal */}
      <nav className="hidden md:flex items-center gap-8 flex-1">
        {navItems.map((item) => {
          const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative py-1 text-[11px] tracking-[0.15em] uppercase transition-colors ${
                isActive ? "text-cq-text" : "text-cq-text-secondary/70 hover:text-cq-text"
              }`}
            >
              {item.label}
              {isActive && (
                <span className="absolute -bottom-[21px] left-0 right-0 h-[1px] bg-cq-accent" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Right Actions */}
      <div className="hidden md:flex items-center gap-5 ml-auto">
        <Link
          href="/order"
          className="text-[10px] tracking-[0.15em] uppercase text-cq-accent hover:text-cq-accent-light transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3 h-3" />
          注文する
        </Link>

        <div className="w-[1px] h-4 bg-cq-border/40" />

        <button className="relative p-1.5 text-cq-text-secondary/60 hover:text-cq-text transition-colors">
          <Bell className="w-4 h-4" />
        </button>

        {/* Account Menu */}
        <div ref={accountRef} className="relative">
          <button
            onClick={() => setIsAccountOpen(!isAccountOpen)}
            className="w-7 h-7 bg-cq-primary text-cq-surface rounded-full flex items-center justify-center text-[10px] font-medium hover:bg-cq-primary-light transition-colors"
          >
            M
          </button>

          {isAccountOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-cq-surface-raised border border-cq-border/50 rounded-[var(--cq-radius-md)] shadow-lg py-2 z-50">
              <div className="px-4 py-2 border-b border-cq-border/30 mb-1">
                <p className="text-xs text-cq-text font-medium">アカウント</p>
              </div>
              {accountSubItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsAccountOpen(false)}
                  className={`block px-4 py-2 text-xs transition-colors hover:bg-cq-surface ${
                    pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                      ? "text-cq-text"
                      : "text-cq-text-secondary"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Hamburger */}
      <button
        onClick={onToggleMobileMenu}
        className="md:hidden ml-auto p-2 text-cq-text-secondary hover:text-cq-text transition-colors"
        aria-label={isMobileMenuOpen ? "メニューを閉じる" : "メニューを開く"}
      >
        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>
    </header>
  );
}
