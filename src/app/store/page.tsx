import Link from "next/link";
import {
  Flower2,
  ArrowRight,
  Sparkles,
  Truck,
  FileText,
  Shield,
} from "lucide-react";
import {
  FLOWER_PRODUCTS,
  MAESTROS,
} from "@/lib/mock-data";
import BrowseTabs from "@/components/store/BrowseTabs";

import type { MaestroRank } from "@/lib/mock-data";

const rankBadgeStyles: Record<MaestroRank, string> = {
  "S-RANK": "bg-cq-primary/85 text-cq-accent border border-cq-primary/20",
  "A-RANK": "bg-cq-primary/70 text-cq-surface border border-cq-primary/15",
  DEBUT: "bg-cq-surface text-cq-text-secondary border border-cq-border",
};

const recommendedProducts = FLOWER_PRODUCTS.filter((p) => p.isRecommended);
const newProducts = FLOWER_PRODUCTS.filter((p) => p.isNew);

export default function StorePage() {
  return (
    <div className="max-w-6xl mx-auto space-y-14">
      {/* Store Hero */}
      <section className="relative overflow-hidden rounded-[var(--cq-radius-lg)] min-h-[240px] md:min-h-[280px]">
        <img
          src="https://images.unsplash.com/photo-1457089328109-e5d9bd499191?w=1200&h=400&fit=crop&q=80"
          alt="フラワーコレクション"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cq-primary/30 to-cq-primary/80" />
        <div className="relative flex flex-col justify-end gap-3 p-8 md:p-12 h-full min-h-[240px] md:min-h-[280px]">
          <p className="cq-brand-text text-xs text-white/80 tracking-[0.25em]">
            CAQUEHIN STORE
          </p>
          <h1 className="text-2xl md:text-3xl text-white leading-tight font-light tracking-wide">
            フラワーコレクション
          </h1>
          <p className="text-white/70 text-sm max-w-lg font-light">
            シーン・スタイル・ご予算からお探しいただけます。マエストロが一つひとつ心を込めてお仕立ていたします。
          </p>
        </div>
      </section>

      {/* バリュープロポジション Bar */}
      <section className="cq-card px-6 py-4">
        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-3">
          {[
            { icon: Flower2, text: "マエストロによるお仕立て" },
            { icon: Truck, text: "最短翌日お届け" },
            { icon: FileText, text: "請求書払い対応" },
            { icon: Shield, text: "品質保証" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-cq-primary" />
              <span className="text-xs text-cq-primary font-medium">{text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Kintsugi divider */}
      <div className="cq-kintsugi" />

      {/* 今季のおすすめ */}
      <section>
        <div className="mb-6">
          <p className="cq-brand-text text-xs text-cq-accent tracking-[0.2em] mb-1">
            SEASONAL PICKS
          </p>
          <h2 className="text-xl text-cq-text font-light tracking-wide">今季のおすすめ</h2>
        </div>
        <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {recommendedProducts.map((product) => (
            <div
              key={product.id}
              className="flex-none w-[280px] snap-start bg-cq-surface-raised rounded-[var(--cq-radius-lg)] border border-cq-border shadow-sm hover:shadow-lg transition-shadow group overflow-hidden"
            >
              <div className="relative h-[180px] overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="cq-brand-text text-[10px] text-white/90 tracking-[0.15em] bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded">
                    {product.styleName}
                  </span>
                  {product.isNew && (
                    <span className="text-[9px] font-bold text-white bg-cq-accent px-1.5 py-0.5 rounded">
                      NEW
                    </span>
                  )}
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="cq-heading text-base text-white drop-shadow-md">
                    {product.name}
                  </h3>
                  <p className="text-[11px] text-white/70">
                    {product.nameEn}
                  </p>
                </div>
              </div>
              <div className="p-4 flex flex-col">
                <p className="text-xs text-cq-text-secondary leading-relaxed line-clamp-2 mb-3">
                  {product.description}
                </p>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[11px] text-cq-text-secondary">
                    by{" "}
                    <span className="cq-heading-display">
                      {product.maestroName}
                    </span>
                  </span>
                  <span
                    className={`text-[9px] font-medium px-1.5 py-0.5 rounded-[var(--cq-radius-sm)] ${rankBadgeStyles[product.maestroRank]}`}
                  >
                    {product.maestroRank}
                  </span>
                </div>
                <div className="mt-auto pt-3 border-t border-cq-border-subtle flex items-center justify-between">
                  <span className="text-sm font-light text-cq-accent tracking-wide">
                    {product.priceRange}
                  </span>
                  <Link
                    href="/order"
                    className="text-xs font-medium text-cq-primary hover:text-cq-primary-light transition-colors flex items-center gap-1 cq-brand-text"
                  >
                    ORDER
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* アレンジメントを探す（タブ切り替え） */}
      <BrowseTabs />

      {/* マエストロのご紹介 */}
      <section>
        <div className="mb-6">
          <p className="cq-brand-text text-xs text-cq-accent tracking-[0.2em] mb-1">
            MEET THE MAESTROS
          </p>
          <h2 className="text-xl text-cq-text font-light tracking-wide">
            マエストロのご紹介
          </h2>
        </div>
        <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {MAESTROS.map((maestro) => (
            <div
              key={maestro.id}
              className="flex-none w-[300px] snap-start bg-cq-surface-raised rounded-[var(--cq-radius-lg)] border border-cq-border p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <h3 className="cq-heading-display text-xl text-cq-text">
                  {maestro.stageName}
                </h3>
                <span
                  className={`text-[10px] font-medium px-2 py-0.5 rounded-[var(--cq-radius-sm)] ${rankBadgeStyles[maestro.rank]}`}
                >
                  {maestro.rank}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-cq-text-secondary mb-3">
                <span>{maestro.location}</span>
                <span>完遂率 {maestro.perfectionRate}%</span>
                <span>{maestro.totalWorks}作品</span>
              </div>
              <p className="text-xs text-cq-text-secondary leading-relaxed line-clamp-2 mb-4">
                {maestro.description}
              </p>
              <Link
                href="/order"
                className="text-xs font-medium text-cq-accent hover:text-cq-accent-light transition-colors flex items-center gap-1"
              >
                指名して注文
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 新着アレンジメント */}
      <section>
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-cq-accent" />
            <p className="cq-brand-text text-xs text-cq-accent tracking-[0.2em]">
              NEW ARRIVALS
            </p>
          </div>
          <h2 className="text-xl text-cq-text font-light tracking-wide">
            新着アレンジメント
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {newProducts.map((product) => (
            <div
              key={product.id}
              className="bg-cq-surface-raised rounded-[var(--cq-radius-md)] border border-cq-border shadow-sm hover:shadow-lg transition-shadow overflow-hidden group"
            >
              <div className="relative h-[160px] overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="text-[9px] font-bold text-white bg-cq-accent px-1.5 py-0.5 rounded shadow">
                    NEW
                  </span>
                  <span className="cq-brand-text text-[10px] text-white/90 tracking-[0.12em] bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded">
                    {product.styleName}
                  </span>
                </div>
                <div className="absolute bottom-2.5 left-2.5">
                  <h3 className="cq-heading text-sm text-white drop-shadow-md">
                    {product.name}
                  </h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs text-cq-text-secondary leading-relaxed line-clamp-2 mb-3">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-light text-cq-accent tracking-wide">
                    {product.priceRange}
                  </span>
                  <Link
                    href="/order"
                    className="text-xs font-medium text-cq-accent hover:text-cq-accent-light transition-colors flex items-center gap-1"
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

      {/* 全商品一覧 */}
      <section>
        <div className="mb-6">
          <p className="cq-brand-text text-xs text-cq-accent tracking-[0.2em] mb-1">
            ALL ARRANGEMENTS
          </p>
          <h2 className="text-xl text-cq-text font-light tracking-wide">
            すべてのアレンジメント
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {FLOWER_PRODUCTS.map((product) => (
            <Link
              key={product.id}
              href="/order"
              className="bg-cq-surface-raised rounded-[var(--cq-radius-md)] border border-cq-border shadow-sm hover:shadow-lg transition-shadow overflow-hidden group"
            >
              <div className="relative h-[140px] overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute top-2 left-2 flex items-center gap-1">
                  <span className="cq-brand-text text-[9px] text-white/90 tracking-[0.12em] bg-black/30 backdrop-blur-sm px-1.5 py-0.5 rounded">
                    {product.styleName}
                  </span>
                  {product.isNew && (
                    <span className="text-[8px] font-bold text-white bg-cq-accent px-1 py-0.5 rounded">
                      NEW
                    </span>
                  )}
                </div>
                <div className="absolute bottom-2 left-2 right-2">
                  <h3 className="cq-heading text-xs text-white drop-shadow-md truncate">
                    {product.name}
                  </h3>
                </div>
              </div>
              <div className="p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-light text-cq-accent tracking-wide">
                    {product.priceRange}
                  </span>
                  <span className="text-[10px] text-cq-text-secondary">
                    {product.maestroName}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
