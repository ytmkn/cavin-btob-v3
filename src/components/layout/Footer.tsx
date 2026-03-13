import Link from "next/link";

export function Footer() {
  return (
    <footer className="px-6 lg:px-10 pt-0 pb-8">
      {/* Kintsugi top border */}
      <div className="cq-kintsugi mb-8" />
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="cq-overline text-[9px] text-cq-text-secondary">
          &copy; 2026 CAQUEHIN
        </p>
        <nav className="flex items-center gap-6">
          {[
            { label: "お問い合わせ", href: "/contact" },
            { label: "利用規約", href: "/terms" },
            { label: "プライバシー", href: "/privacy" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[11px] text-cq-text-secondary hover:text-cq-text transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
