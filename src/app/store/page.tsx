import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Flower2,
  Truck,
  FileText,
  Shield,
} from "lucide-react";
import {
  FLOWER_PRODUCTS,
  MAESTROS,
} from "@/lib/mock-data";
import BrowseTabs from "@/components/store/BrowseTabs";

const recommendedProducts = FLOWER_PRODUCTS.filter((p) => p.isRecommended);
const newProducts = FLOWER_PRODUCTS.filter((p) => p.isNew);

export default function StorePage() {
  const featured = recommendedProducts[0];
  const restRecommended = recommendedProducts.slice(1);

  return (
    <div className="max-w-6xl mx-auto space-y-20">
      {/* ─── Hero — Editorial, image-first ─── */}
      <section className="relative overflow-hidden rounded-[var(--cq-radius-lg)] min-h-[320px] md:min-h-[420px]">
        <img
          src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=1200&h=600&fit=crop&q=80"
          alt="フラワーコレクション"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="relative flex flex-col justify-end p-10 md:p-16 h-full min-h-[320px] md:min-h-[420px]">
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/60 mb-3">
            CAQUEHIN STORE
          </p>
          <h1 className="cq-heading-display text-3xl md:text-4xl text-white leading-tight tracking-wide">
            フラワーコレクション
          </h1>
          <p className="text-white/50 text-sm max-w-md font-light mt-4 leading-relaxed">
            シーン・スタイル・ご予算からお探しいただけます。
            <br className="hidden md:block" />
            マエストロが一つひとつ心を込めてお仕立ていたします。
          </p>
          {/* バリュープロポジション — ヒーロー内に控えめに */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-8">
            {[
              { icon: Flower2, text: "マエストロによるお仕立て" },
              { icon: Truck, text: "最短翌日お届け" },
              { icon: FileText, text: "請求書払い対応" },
              { icon: Shield, text: "品質保証" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5">
                <Icon className="w-3 h-3 text-white/30" />
                <span className="text-[10px] text-white/40 tracking-wide">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured — 1 つ目を大きくフィーチャー ─── */}
      <section>
        <p className="text-[10px] tracking-[0.3em] uppercase text-cq-accent/80 mb-2">
          SEASONAL PICKS
        </p>
        <h2 className="cq-heading-display text-2xl text-cq-text font-light tracking-wide mb-10">
          今季のおすすめ
        </h2>

        {/* Featured large card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-cq-surface-raised rounded-[var(--cq-radius-lg)] overflow-hidden mb-8">
          <div className="relative h-[280px] md:h-[400px] overflow-hidden">
            <img
              src={featured.imageUrl}
              alt={featured.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10 md:bg-none" />
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <p className="text-[10px] tracking-[0.2em] uppercase text-cq-text-secondary/60 mb-3">
              {featured.styleName}
            </p>
            <h3 className="cq-heading-display text-2xl md:text-3xl text-cq-text mb-2">
              {featured.name}
            </h3>
            <p className="text-xs text-cq-text-secondary/60 mb-6">
              {featured.nameEn}
            </p>
            <p className="text-sm text-cq-text-secondary leading-relaxed mb-8 max-w-sm">
              {featured.description}
            </p>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[11px] text-cq-text-secondary/60">
                by{" "}
                <span className="cq-heading-display text-cq-text">
                  {featured.maestroName}
                </span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-light text-cq-accent tracking-wide">
                {featured.priceRange}
              </span>
              <Link
                href="/order"
                className="text-xs text-cq-text-secondary/70 hover:text-cq-text transition-colors flex items-center gap-1.5"
              >
                この花を贈る
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Rest of recommended — smaller cards */}
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {restRecommended.map((product) => (
            <div
              key={product.id}
              className="flex-none w-[260px] snap-start group bg-white rounded-[var(--cq-radius-lg)] shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-all duration-200"
            >
              <div className="relative h-[200px] overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-white/70 mb-1">
                    {product.styleName}
                  </p>
                  <h3 className="cq-heading text-sm text-white drop-shadow-md">
                    {product.name}
                  </h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs text-cq-text-secondary/70 leading-relaxed line-clamp-2 mb-3">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-light text-cq-accent/80 tracking-wide">
                    {product.priceRange}
                  </span>
                  <Link
                    href="/order"
                    className="text-[11px] text-cq-text-secondary/50 hover:text-cq-text transition-colors flex items-center gap-1"
                  >
                    この花を贈る
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Kintsugi divider ─── */}
      <div className="cq-kintsugi" />

      {/* ─── アレンジメントを探す（タブ切り替え） ─── */}
      <BrowseTabs />

      {/* ─── Kintsugi divider ─── */}
      <div className="cq-kintsugi" />

      {/* ─── マエストロのご紹介 — 哲学を前面に ─── */}
      <section>
        <p className="text-[10px] tracking-[0.3em] uppercase text-cq-accent/80 mb-2">
          MEET THE MAESTROS
        </p>
        <h2 className="cq-heading-display text-2xl text-cq-text font-light tracking-wide mb-12">
          マエストロのご紹介
        </h2>
        <div className="space-y-6">
          {MAESTROS.map((maestro) => (
            <div
              key={maestro.id}
              className="bg-white rounded-[var(--cq-radius-lg)] shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-8 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-all duration-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 md:gap-10 items-start">
                <div>
                  <h3 className="cq-heading-display text-2xl md:text-3xl text-cq-text tracking-wide">
                    {maestro.stageName}
                  </h3>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-cq-text-secondary/50 mt-1">
                    {maestro.location}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-cq-text-secondary leading-relaxed mb-6">
                    {maestro.description}
                  </p>
                  <div className="flex items-center gap-6">
                    <Link
                      href="/order"
                      className="text-xs text-cq-accent hover:text-cq-accent-light transition-colors flex items-center gap-1.5"
                    >
                      この方にお任せする
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                    <span className="text-[10px] text-cq-text-secondary/40">
                      {maestro.specialties.join(" / ")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Kintsugi divider ─── */}
      <div className="cq-kintsugi" />

      {/* ─── 新着アレンジメント ─── */}
      <section>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-cq-accent/60" />
          <p className="text-[10px] tracking-[0.3em] uppercase text-cq-accent/80">
            NEW ARRIVALS
          </p>
        </div>
        <h2 className="cq-heading-display text-2xl text-cq-text font-light tracking-wide mb-10">
          新着アレンジメント
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {newProducts.map((product) => (
            <Link
              key={product.id}
              href="/order"
              className="group bg-white rounded-[var(--cq-radius-lg)] shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-all duration-200"
            >
              <div className="relative h-[220px] overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-[9px] tracking-[0.15em] uppercase text-white/60 mb-1">
                    {product.styleName}
                  </p>
                  <h3 className="cq-heading text-sm text-white drop-shadow-md">
                    {product.name}
                  </h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs text-cq-text-secondary/70 leading-relaxed line-clamp-2 mb-3">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-light text-cq-accent/80 tracking-wide">
                    {product.priceRange}
                  </span>
                  <span className="text-[11px] text-cq-text-secondary/40 group-hover:text-cq-text-secondary transition-colors flex items-center gap-1">
                    この花を贈る
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Kintsugi divider ─── */}
      <div className="cq-kintsugi" />

      {/* ─── 全商品一覧 — ギャラリー体験 ─── */}
      <section>
        <p className="text-[10px] tracking-[0.3em] uppercase text-cq-accent/80 mb-2">
          ALL ARRANGEMENTS
        </p>
        <h2 className="cq-heading-display text-2xl text-cq-text font-light tracking-wide mb-10">
          すべてのアレンジメント
        </h2>
        {/* Masonry-style staggered grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-5 space-y-5">
          {FLOWER_PRODUCTS.map((product, i) => {
            const heights = ["h-[200px]", "h-[260px]", "h-[180px]", "h-[240px]"];
            const heightClass = heights[i % heights.length];
            return (
              <Link
                key={product.id}
                href="/order"
                className="block break-inside-avoid group bg-white rounded-[var(--cq-radius-lg)] shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-all duration-200"
              >
                <div className={`relative ${heightClass} overflow-hidden`}>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-[9px] tracking-[0.12em] uppercase text-white/60">
                      {product.styleName}
                    </p>
                    <h3 className="cq-heading text-xs text-white mt-0.5">
                      {product.name}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4">
                  <span className="text-[11px] font-light text-cq-accent/70 tracking-wide">
                    {product.priceRange}
                  </span>
                  <span className="text-[10px] text-cq-text-secondary/40">
                    {product.maestroName}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
