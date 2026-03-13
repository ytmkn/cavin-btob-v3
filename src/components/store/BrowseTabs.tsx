"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Flower2,
  ArrowRight,
  Crown,
  TrendingUp,
  Store,
  Building2,
  Heart,
  Cake,
} from "lucide-react";
import {
  FLOWER_PRODUCTS,
  STYLES,
  SCENES,
  PRICE_RANGES,
} from "@/lib/mock-data";

const sceneIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  inauguration: Crown,
  ipo: TrendingUp,
  opening: Store,
  relocation: Building2,
  gratitude: Heart,
  condolence: Flower2,
  birthday: Cake,
};

function countProductsByScene(sceneId: string): number {
  return FLOWER_PRODUCTS.filter((p) => p.scene.includes(sceneId)).length;
}

type Tab = "scene" | "style" | "budget";

const tabs: { id: Tab; label: string }[] = [
  { id: "scene", label: "シーンで探す" },
  { id: "style", label: "スタイルで探す" },
  { id: "budget", label: "ご予算から探す" },
];

export default function BrowseTabs() {
  const [activeTab, setActiveTab] = useState<Tab>("scene");

  return (
    <section>
      <div className="mb-6">
        <p className="cq-brand-text text-xs text-cq-accent tracking-[0.2em] mb-1">
          BROWSE
        </p>
        <h2 className="text-xl text-cq-text font-light tracking-wide">
          アレンジメントを探す
        </h2>
      </div>

      {/* タブ */}
      <div className="flex gap-1 mb-6 border-b border-cq-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-5 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "text-cq-text"
                : "text-cq-text-secondary hover:text-cq-text"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-2 right-2 h-[1.5px] bg-cq-accent" />
            )}
          </button>
        ))}
      </div>

      {/* タブコンテンツ */}
      {activeTab === "scene" && <SceneContent />}
      {activeTab === "style" && <StyleContent />}
      {activeTab === "budget" && <BudgetContent />}
    </section>
  );
}

function SceneContent() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {SCENES.map((scene) => {
        const Icon = sceneIcons[scene.id] || Flower2;
        const productCount = countProductsByScene(scene.id);
        return (
          <Link
            key={scene.id}
            href="/order"
            className="bg-cq-surface-raised rounded-[var(--cq-radius-md)] border border-cq-border p-5 hover:bg-cq-surface hover:shadow-sm hover:border-cq-accent/30 transition-all group"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-cq-surface rounded-[var(--cq-radius-md)] group-hover:bg-cq-accent/5 transition-colors">
                <Icon className="w-5 h-5 text-cq-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-cq-text">
                  {scene.label}
                </p>
                <p className="text-[11px] text-cq-text-secondary mt-0.5">
                  {productCount}件のアレンジメント
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

function StyleContent() {
  return (
    <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
      {STYLES.map((style) => (
        <Link
          key={style.id}
          href="/order"
          className="flex-none w-[240px] snap-start rounded-[var(--cq-radius-lg)] overflow-hidden hover:shadow-lg transition-shadow group"
        >
          <div className="relative h-[260px]">
            <img
              src={style.imageUrl}
              alt={style.imageAlt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute top-3 left-3">
              <span
                className={`text-[10px] font-medium px-2 py-0.5 rounded-[var(--cq-radius-sm)] ${
                  style.tier === "NOMINATION"
                    ? "bg-cq-accent/90 text-cq-primary"
                    : "bg-white/20 text-white/90 backdrop-blur-sm"
                }`}
              >
                {style.tier}
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="cq-brand-text text-lg tracking-[0.2em] text-white drop-shadow-md">
                {style.name}
              </p>
              <p className="text-xs mt-1 leading-relaxed text-white/80">
                {style.description}
              </p>
              <p className="text-xs mt-2 font-medium flex items-center gap-1 text-white/90 group-hover:text-white transition-colors">
                このスタイルを見る
                <ArrowRight className="w-3 h-3" />
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function BudgetContent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {PRICE_RANGES.map((range) => {
        const borderColor =
          range.id === "casual"
            ? "border-l-cq-primary"
            : range.id === "standard"
              ? "border-l-cq-accent"
              : "border-l-cq-text";
        return (
          <Link
            key={range.id}
            href="/order"
            className={`bg-cq-surface-raised rounded-[var(--cq-radius-md)] border border-cq-border border-l-4 ${borderColor} p-5 hover:shadow-sm transition-shadow`}
          >
            <p className="cq-heading text-base text-cq-text mb-1">
              {range.label}
            </p>
            <p className="text-sm text-cq-accent font-medium mb-1">
              {range.range}
            </p>
            <p className="text-xs text-cq-text-secondary">
              {range.description}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
