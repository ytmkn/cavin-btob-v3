"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  STYLES,
  SCENES,
  PRICE_RANGES,
} from "@/lib/mock-data";

// シーンごとの雰囲気を伝えるビジュアル（Unsplash）
const sceneImages: Record<string, string> = {
  inauguration: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400&h=300&fit=crop&q=80",
  ipo: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400&h=300&fit=crop&q=80",
  opening: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=400&h=300&fit=crop&q=80",
  relocation: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400&h=300&fit=crop&q=80",
  gratitude: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&h=300&fit=crop&q=80",
  condolence: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop&q=80",
  birthday: "https://images.unsplash.com/photo-1457089328109-e5d9bd499191?w=400&h=300&fit=crop&q=80",
};

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
      <p className="text-[10px] tracking-[0.3em] uppercase text-cq-accent/80 mb-2">
        BROWSE
      </p>
      <h2 className="cq-heading-display text-2xl text-cq-text font-light tracking-wide mb-10">
        アレンジメントを探す
      </h2>

      {/* タブ */}
      <div className="flex gap-6 mb-10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative pb-3 text-[11px] tracking-[0.1em] transition-colors ${
              activeTab === tab.id
                ? "text-cq-text"
                : "text-cq-text-secondary/50 hover:text-cq-text-secondary"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-[0.5px] bg-cq-accent" />
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
        const imageUrl = sceneImages[scene.id] || sceneImages.inauguration;
        return (
          <Link
            key={scene.id}
            href="/order"
            className="relative h-[140px] md:h-[160px] rounded-[var(--cq-radius-md)] overflow-hidden group"
          >
            <img
              src={imageUrl}
              alt={scene.label}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
            <div className="relative flex flex-col justify-end h-full p-4">
              <p className="text-sm text-white font-medium drop-shadow-md">
                {scene.label}
              </p>
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
          className="flex-none w-[240px] snap-start group bg-white rounded-[var(--cq-radius-lg)] shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-all duration-200"
        >
          <div className="relative h-[280px] overflow-hidden">
            <img
              src={style.imageUrl}
              alt={style.imageAlt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/50 mb-1">
                {style.tier}
              </p>
              <p className="cq-heading-display text-lg tracking-[0.15em] text-white drop-shadow-md">
                {style.name}
              </p>
            </div>
          </div>
          <div className="p-5">
            <p className="text-xs text-cq-text-secondary/70 leading-relaxed mb-2">
              {style.description}
            </p>
            <p className="text-[11px] text-cq-text-secondary/40 group-hover:text-cq-text-secondary transition-colors flex items-center gap-1">
              このスタイルを見る
              <ArrowRight className="w-3 h-3" />
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

function BudgetContent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {PRICE_RANGES.map((range) => (
        <Link
          key={range.id}
          href="/order"
          className="group bg-white rounded-[var(--cq-radius-lg)] shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-6 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-all duration-200"
        >
          <p className="text-sm font-light text-cq-accent tracking-wide mb-2">
            {range.range}
          </p>
          <p className="cq-heading text-base text-cq-text mb-2">
            {range.label}
          </p>
          <p className="text-xs text-cq-text-secondary/60 leading-relaxed mb-4">
            {range.description}
          </p>
          <p className="text-[11px] text-cq-text-secondary/40 group-hover:text-cq-text-secondary transition-colors flex items-center gap-1">
            この予算で探す
            <ArrowRight className="w-3 h-3" />
          </p>
        </Link>
      ))}
    </div>
  );
}
