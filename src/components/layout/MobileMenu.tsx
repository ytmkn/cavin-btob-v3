"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "ストア", href: "/store" },
  { label: "注文する", href: "/order" },
  { label: "注文履歴", href: "/history" },
];

const accountItems = [
  { label: "ダッシュボード", href: "/" },
  { label: "店舗を探す", href: "/shops" },
  { label: "記念日管理", href: "/anniversary" },
  { label: "請求書", href: "/invoices" },
  { label: "設定", href: "/settings" },
];

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div
        className={`fixed top-[64px] left-0 right-0 bg-cq-surface/95 backdrop-blur-xl border-b border-cq-border/30 z-40 md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[calc(100vh-64px)] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="px-6 py-6 space-y-1">
          {navItems.map((item) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`block px-4 py-3 text-[11px] tracking-[0.15em] uppercase transition-colors ${
                  isActive
                    ? "text-cq-text"
                    : "text-cq-text-secondary/70 hover:text-cq-text"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          {/* Kintsugi divider */}
          <div className="cq-kintsugi my-4" />

          {/* Account Section */}
          <p className="px-4 py-2 text-[10px] tracking-[0.2em] uppercase text-cq-text-secondary/50">
            アカウント
          </p>
          {accountItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`block px-4 py-2.5 text-xs transition-colors ${
                pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                  ? "text-cq-text"
                  : "text-cq-text-secondary/70 hover:text-cq-text"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
