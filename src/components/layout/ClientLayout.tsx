"use client";

import { useState, useCallback } from "react";
import { TopNav } from "./TopNav";
import { MobileMenu } from "./MobileMenu";
import { Footer } from "./Footer";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <>
      <TopNav isMobileMenuOpen={isMobileMenuOpen} onToggleMobileMenu={toggleMobileMenu} />
      <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
      <main className="min-h-[calc(100vh-64px-80px)] px-6 lg:px-10 py-10">{children}</main>
      <Footer />
    </>
  );
}
