"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Cake,
  Gift,
  ArrowRight,
} from "lucide-react";
import {
  MOCK_ORDERS,
  MOCK_EMPLOYEES,
  FLOWER_PRODUCTS,
} from "@/lib/mock-data";
import type { Order } from "@/lib/mock-data";
import { OrderDetailModal } from "@/components/ui/OrderDetailModal";

const statusLabels: Record<Order["status"], string> = {
  preparing: "お仕立て中",
  in_transit: "配送中",
  delivered: "お届け済み",
  completed: "完了",
};

// 今月の誕生日
const currentMonthBirthdays = MOCK_EMPLOYEES.filter((e) => {
  const month = parseInt(e.birthday.split("-")[0], 10);
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  return month === currentMonth;
});

// ピックアップ商品
const pickupProducts = FLOWER_PRODUCTS.filter((p) => p.isRecommended).slice(0, 3);

export default function DashboardPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  return (
    <div className="max-w-6xl mx-auto space-y-20">
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden rounded-[var(--cq-radius-lg)] min-h-[320px] md:min-h-[400px]">
        <img
          src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=1200&h=500&fit=crop&q=80"
          alt="華やかなフラワーアレンジメント"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="relative flex flex-col justify-end p-10 md:p-16 h-full min-h-[320px] md:min-h-[400px]">
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/50 mb-3">
            CAQUEHIN
          </p>
          <h1 className="cq-heading-display text-3xl md:text-4xl text-white leading-tight tracking-wide">
            おはようございます、山下さん
          </h1>
          <p className="text-white/50 text-sm max-w-md font-light mt-4 leading-relaxed">
            マエストロが心を込めてお仕立てする、世界にひとつだけのフラワーギフト
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <Link
              href="/order"
              className="text-xs tracking-[0.15em] uppercase text-cq-accent hover:text-cq-accent-light transition-colors flex items-center gap-1.5"
            >
              花を贈る
              <ArrowRight className="w-3 h-3" />
            </Link>
            <span className="w-[1px] h-4 bg-white/20" />
            <Link
              href="/store"
              className="text-xs tracking-[0.15em] uppercase text-white/50 hover:text-white/80 transition-colors flex items-center gap-1.5"
            >
              コレクションを見る
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 花を贈る機会のお知らせ ─── */}
      {currentMonthBirthdays.length > 0 && (
        <section>
          <p className="text-[10px] tracking-[0.3em] uppercase text-cq-accent/80 mb-2">
            UPCOMING
          </p>
          <h2 className="cq-heading-display text-2xl text-cq-text font-light tracking-wide mb-10">
            花を贈る機会のお知らせ
          </h2>
          <div className="space-y-4">
            {currentMonthBirthdays.map((emp) => (
              <div
                key={emp.id}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-5 border-b border-cq-border/20 last:border-0"
              >
                <Cake className="w-4 h-4 text-cq-accent/60 shrink-0 mt-0.5 sm:mt-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-cq-text">
                    {emp.name}さんのお誕生日
                  </p>
                  <p className="text-xs text-cq-text-secondary/60 mt-0.5">
                    {emp.department} ・ {emp.birthday.replace("-", "月")}日
                  </p>
                </div>
                {emp.autoOrder ? (
                  <span className="text-[11px] text-cq-text-secondary/50">
                    自動手配済み
                  </span>
                ) : (
                  <Link
                    href="/order"
                    className="text-xs text-cq-accent hover:text-cq-accent-light transition-colors flex items-center gap-1"
                  >
                    <Gift className="w-3 h-3" />
                    この方に花を贈る
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─── Kintsugi divider ─── */}
      <div className="cq-kintsugi" />

      {/* ─── 最近のご注文 ─── */}
      <section>
        <p className="text-[10px] tracking-[0.3em] uppercase text-cq-accent/80 mb-2">
          RECENT ORDERS
        </p>
        <h2 className="cq-heading-display text-2xl text-cq-text font-light tracking-wide mb-10">
          最近のご注文
        </h2>
        <div className="space-y-4">
          {MOCK_ORDERS.map((order) => (
            <button
              key={order.id}
              type="button"
              onClick={() => setSelectedOrder(order)}
              className="w-full text-left py-5 border-b border-cq-border/20 last:border-0 hover:bg-cq-surface-raised/50 transition-colors cursor-pointer -mx-4 px-4 rounded-[var(--cq-radius-md)]"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-sm text-cq-text">
                      {order.recipientName}
                    </span>
                    <span className="text-xs text-cq-text-secondary/50">
                      {order.recipientCompany}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] tracking-[0.12em] uppercase text-cq-text-secondary/50">
                      {order.styleName}
                    </span>
                    <span className="text-[11px] text-cq-text-secondary/50">
                      by{" "}
                      <span className="cq-heading-display text-cq-text-secondary/70">
                        {order.maestroName}
                      </span>
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-6 shrink-0">
                  <span className="text-sm font-light text-cq-accent tracking-wide">
                    &yen;{order.totalAmount.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-cq-text-secondary/50">
                    {statusLabels[order.status]}
                  </span>
                  <span className="text-[11px] text-cq-text-secondary/40">
                    {order.orderedAt}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/history"
            className="text-xs text-cq-text-secondary/50 hover:text-cq-text transition-colors flex items-center gap-1.5"
          >
            すべてのご注文を見る
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </section>

      {/* ─── Kintsugi divider ─── */}
      <div className="cq-kintsugi" />

      {/* ─── ピックアップ ─── */}
      <section>
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-cq-accent/80 mb-2">
              PICKUP
            </p>
            <h2 className="cq-heading-display text-2xl text-cq-text font-light tracking-wide">
              今季のおすすめ
            </h2>
          </div>
          <Link
            href="/store"
            className="text-xs text-cq-text-secondary/50 hover:text-cq-text transition-colors flex items-center gap-1.5"
          >
            ストアを見る
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {pickupProducts.map((product) => (
            <Link
              key={product.id}
              href="/store"
              className="group"
            >
              <div className="relative h-[180px] overflow-hidden rounded-[var(--cq-radius-md)] mb-4">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="cq-heading text-sm text-white drop-shadow-md">
                    {product.name}
                  </h3>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-light text-cq-accent/80 tracking-wide">
                  {product.priceRange}
                </span>
                <span className="text-[10px] text-cq-text-secondary/40">
                  {product.styleName}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Order Detail Modal */}
      <OrderDetailModal
        order={selectedOrder}
        isOpen={selectedOrder !== null}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
}
