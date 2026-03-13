"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus, Bell } from "lucide-react";

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
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div
        className={`fixed top-[72px] left-0 right-0 bg-cq-surface-raised border-b border-cq-border z-40 md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[calc(100vh-72px)] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="px-6 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`block px-4 py-3 text-base font-medium rounded-[var(--cq-radius-md)] transition-colors ${
                  isActive
                    ? "text-cq-primary bg-cq-surface border-l-2 border-cq-accent"
                    : "text-cq-text hover:bg-cq-surface"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          {/* Admin Section */}
          <div className="pt-2">
            <span className="block px-4 py-2 text-xs font-medium text-cq-text-secondary uppercase tracking-wider">
              管理
            </span>
            {adminSubItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`block pl-8 pr-4 py-3 text-base font-medium rounded-[var(--cq-radius-md)] transition-colors ${
                  pathname.startsWith(item.href)
                    ? "text-cq-primary bg-cq-surface border-l-2 border-cq-accent"
                    : "text-cq-text hover:bg-cq-surface"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Actions */}
          <div className="pt-4 border-t border-cq-border space-y-2">
            <Link
              href="/order"
              onClick={onClose}
              className="flex items-center justify-center gap-1.5 w-full px-4 py-3 bg-cq-primary text-white text-sm font-medium rounded-[var(--cq-radius-md)] hover:bg-cq-primary-light transition-colors"
            >
              <Plus className="w-4 h-4" />
              新規注文
            </Link>
            <button className="flex items-center gap-2 w-full px-4 py-3 text-sm text-cq-text-secondary hover:text-cq-text hover:bg-cq-surface rounded-[var(--cq-radius-md)] transition-colors">
              <Bell className="w-4 h-4" />
              通知
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
