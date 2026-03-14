"use client";

import { useState, useMemo } from "react";
import {
  Search,
  MapPin,
  Clock,
  Phone,
  Flower2,
  X,
} from "lucide-react";
import { SHOPS } from "@/lib/mock-data";
import type { Shop } from "@/lib/mock-data";

// データからユニーク値を抽出
const ALL_AREAS = Array.from(
  new Set(SHOPS.map((s) => s.area.split("・")[0]))
);
const ALL_STYLES = Array.from(
  new Set(SHOPS.flatMap((s) => s.specialStyles))
);
const ALL_FEATURES = Array.from(
  new Set(SHOPS.flatMap((s) => s.features))
);

type ShopType = "all" | "shop" | "atelier";

export default function ShopFinder({ hideHeader = false }: { hideHeader?: boolean } = {}) {
  const [query, setQuery] = useState("");
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [shopType, setShopType] = useState<ShopType>("all");
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const hasActiveFilters =
    query !== "" ||
    selectedAreas.length > 0 ||
    shopType !== "all" ||
    selectedStyles.length > 0 ||
    selectedFeatures.length > 0;

  const filteredShops = useMemo(() => {
    return SHOPS.filter((shop) => {
      // フリーテキスト検索（店舗名・住所・エリア・説明）
      if (query) {
        const q = query.toLowerCase();
        const searchable = [
          shop.name,
          shop.nameEn,
          shop.area,
          shop.address,
          shop.description,
        ]
          .join(" ")
          .toLowerCase();
        if (!searchable.includes(q)) return false;
      }

      // エリアフィルタ
      if (selectedAreas.length > 0) {
        const shopRegion = shop.area.split("・")[0];
        if (!selectedAreas.includes(shopRegion)) return false;
      }

      // タイプフィルタ
      if (shopType === "atelier" && !shop.isAtelier) return false;
      if (shopType === "shop" && shop.isAtelier) return false;

      // スタイルフィルタ（OR条件）
      if (selectedStyles.length > 0) {
        if (!selectedStyles.some((s) => shop.specialStyles.includes(s)))
          return false;
      }

      // 特徴フィルタ（OR条件）
      if (selectedFeatures.length > 0) {
        if (!selectedFeatures.some((f) => shop.features.includes(f)))
          return false;
      }

      return true;
    });
  }, [query, selectedAreas, shopType, selectedStyles, selectedFeatures]);

  const toggleArray = (arr: string[], value: string) =>
    arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];

  const resetFilters = () => {
    setQuery("");
    setSelectedAreas([]);
    setShopType("all");
    setSelectedStyles([]);
    setSelectedFeatures([]);
  };

  return (
    <section>
      {!hideHeader && (
        <div className="mb-8">
          <p className="cq-brand-text text-xs text-cq-accent tracking-[0.2em] mb-1">
            FIND A SHOP
          </p>
          <h2 className="text-xl text-cq-text font-light tracking-wide">
            店舗・アトリエを探す
          </h2>
          <p className="text-sm text-cq-text-secondary mt-2 font-light">
            マエストロの作品を直接ご覧いただけるショップ＆アトリエ
          </p>
        </div>
      )}

      {/* 検索・フィルタ */}
      <div className="bg-cq-surface-raised rounded-[var(--cq-radius-lg)] border border-cq-border p-5 mb-6 space-y-4">
        {/* フリーテキスト検索 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cq-text-secondary" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="店舗名・住所・エリアで探す"
            className="form-input w-full pl-10 pr-4 py-2.5 text-sm text-cq-text bg-cq-surface border-cq-border-subtle placeholder:text-cq-text-secondary/50 focus:outline-none focus:border-cq-accent transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-cq-text-secondary hover:text-cq-text transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* フィルタグループ */}
        <div className="space-y-3">
          {/* エリア */}
          <FilterRow label="エリア">
            {ALL_AREAS.map((area) => (
              <FilterButton
                key={area}
                label={area}
                active={selectedAreas.includes(area)}
                onClick={() =>
                  setSelectedAreas(toggleArray(selectedAreas, area))
                }
              />
            ))}
          </FilterRow>

          {/* タイプ */}
          <FilterRow label="タイプ">
            <FilterButton
              label="すべて"
              active={shopType === "all"}
              onClick={() => setShopType("all")}
            />
            <FilterButton
              label="ショップ"
              active={shopType === "shop"}
              onClick={() => setShopType("shop")}
            />
            <FilterButton
              label="アトリエ"
              active={shopType === "atelier"}
              onClick={() => setShopType("atelier")}
            />
          </FilterRow>

          {/* スタイル */}
          <FilterRow label="スタイル">
            {ALL_STYLES.map((style) => (
              <FilterButton
                key={style}
                label={style}
                active={selectedStyles.includes(style)}
                onClick={() =>
                  setSelectedStyles(toggleArray(selectedStyles, style))
                }
                accent
              />
            ))}
          </FilterRow>

          {/* 特徴 */}
          <FilterRow label="特徴">
            {ALL_FEATURES.map((feature) => (
              <FilterButton
                key={feature}
                label={feature}
                active={selectedFeatures.includes(feature)}
                onClick={() =>
                  setSelectedFeatures(toggleArray(selectedFeatures, feature))
                }
              />
            ))}
          </FilterRow>
        </div>

        {/* フィルタ状態 */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-2 border-t border-cq-border-subtle">
            <p className="text-xs text-cq-text-secondary">
              {filteredShops.length}件の店舗が見つかりました
            </p>
            <button
              onClick={resetFilters}
              className="text-xs text-cq-accent hover:text-cq-accent/80 transition-colors"
            >
              フィルタをリセット
            </button>
          </div>
        )}
      </div>

      {/* 店舗リスト */}
      {filteredShops.length > 0 ? (
        <div className="space-y-6">
          {filteredShops.map((shop) => (
            <ShopCard key={shop.id} shop={shop} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-sm text-cq-text-secondary mb-2">
            条件に一致する店舗が見つかりませんでした
          </p>
          <button
            onClick={resetFilters}
            className="text-xs text-cq-accent hover:text-cq-accent/80 transition-colors"
          >
            フィルタをリセットして全店舗を表示
          </button>
        </div>
      )}
    </section>
  );
}

// --- サブコンポーネント ---

function FilterRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[10px] text-cq-text-secondary tracking-wide w-14 shrink-0">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function FilterButton({
  label,
  active,
  onClick,
  accent = false,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  accent?: boolean;
}) {
  const base =
    "text-[10px] px-2.5 py-1 rounded-[var(--cq-radius-sm)] border transition-all cursor-pointer select-none";
  const activeStyle = accent
    ? "cq-brand-text bg-cq-accent/10 border-cq-accent/30 text-cq-accent"
    : "bg-cq-primary/5 border-cq-primary/20 text-cq-text";
  const inactiveStyle =
    "text-cq-text-secondary bg-transparent border-cq-border-subtle hover:border-cq-border hover:text-cq-text";

  return (
    <button
      onClick={onClick}
      className={`${base} ${active ? activeStyle : inactiveStyle}`}
    >
      {label}
    </button>
  );
}

function ShopCard({ shop }: { shop: Shop }) {
  return (
    <div className="bg-white rounded-[var(--cq-radius-lg)] shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-all duration-200 group">
      <div className="flex flex-col md:flex-row">
        {/* Shop Image */}
        <div className="relative md:w-[280px] h-[180px] md:h-auto shrink-0 overflow-hidden">
          <img
            src={shop.imageUrl}
            alt={shop.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/10" />
          {shop.isAtelier && (
            <span className="absolute top-3 left-3 cq-brand-text text-[10px] text-white bg-cq-primary/80 backdrop-blur-sm px-2 py-0.5 rounded-[var(--cq-radius-sm)]">
              ATELIER
            </span>
          )}
          <div className="absolute bottom-3 left-3 md:hidden">
            <p className="cq-brand-text text-sm text-white tracking-[0.15em] drop-shadow-md">
              {shop.nameEn}
            </p>
          </div>
        </div>

        {/* Shop Info */}
        <div className="flex-1 p-5 md:p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <p className="cq-brand-text text-xs text-cq-accent tracking-[0.15em] mb-1 hidden md:block">
                {shop.nameEn}
              </p>
              <h3 className="text-lg text-cq-text font-light tracking-wide">
                {shop.name}
              </h3>
            </div>
            <span className="cq-brand-text text-[10px] text-cq-text-secondary tracking-[0.1em] shrink-0">
              {shop.area}
            </span>
          </div>

          <p className="text-xs text-cq-text-secondary leading-relaxed mb-4">
            {shop.description}
          </p>

          {/* Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
            <div className="flex items-center gap-2 text-xs text-cq-text-secondary">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-cq-accent" />
              <span>{shop.address}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-cq-text-secondary">
              <Clock className="w-3.5 h-3.5 shrink-0 text-cq-accent" />
              <span>
                {shop.hours}（{shop.closed}）
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-cq-text-secondary">
              <Phone className="w-3.5 h-3.5 shrink-0 text-cq-accent" />
              <span>{shop.phone}</span>
            </div>
            {shop.maestros.length > 0 && (
              <div className="flex items-center gap-2 text-xs text-cq-text-secondary">
                <Flower2 className="w-3.5 h-3.5 shrink-0 text-cq-accent" />
                <span>
                  在籍:{" "}
                  {shop.maestros
                    .map((m) => (
                      <span key={m} className="cq-heading-display">
                        {m}
                      </span>
                    ))
                    .reduce<React.ReactNode[]>(
                      (acc, el, i) =>
                        i === 0 ? [el] : [...acc, ", ", el],
                      []
                    )}
                </span>
              </div>
            )}
          </div>

          {/* Features + Styles */}
          <div className="flex flex-wrap items-center gap-2">
            {shop.features.map((f) => (
              <span
                key={f}
                className="text-[10px] text-cq-text-secondary bg-cq-surface px-2.5 py-1 rounded-[var(--cq-radius-sm)] border border-cq-border-subtle"
              >
                {f}
              </span>
            ))}
            {shop.specialStyles.map((s) => (
              <span
                key={s}
                className="cq-brand-text text-[9px] text-cq-accent bg-cq-accent/8 px-2 py-1 rounded-[var(--cq-radius-sm)] border border-cq-accent/15"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
