"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Flower2,
  CreditCard,
  Users,
  Cake,
  Gift,
  ArrowRight,
  ShoppingBag,
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

const statusDotColors: Record<Order["status"], string> = {
  preparing: "bg-cq-accent",
  in_transit: "bg-cq-primary",
  delivered: "bg-cq-success",
  completed: "bg-cq-text-secondary",
};

const statusBadgeColors: Record<Order["status"], string> = {
  preparing: "bg-cq-accent/15 text-cq-accent",
  in_transit: "bg-cq-primary/10 text-cq-primary",
  delivered: "bg-cq-success/15 text-cq-success",
  completed: "bg-cq-surface text-cq-text-secondary",
};

// 来月の誕生日をカウント
const nextMonthBirthdays = MOCK_EMPLOYEES.filter((e) => {
  const month = parseInt(e.birthday.split("-")[0], 10);
  const now = new Date();
  const nextMonth = now.getMonth() + 2;
  return month === nextMonth;
});

// 今月の誕生日で未手配のものをアクションアイテムに
const currentMonthBirthdays = MOCK_EMPLOYEES.filter((e) => {
  const month = parseInt(e.birthday.split("-")[0], 10);
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  return month === currentMonth;
});

// おすすめ商品（ダッシュボード用ピックアップ3件）
const pickupProducts = FLOWER_PRODUCTS.filter((p) => p.isRecommended).slice(0, 3);

export default function DashboardPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  return (
    <div className="max-w-6xl mx-auto space-y-14">
      {/* Section 1: Hero Banner with flower image */}
      <section className="relative overflow-hidden rounded-[var(--cq-radius-lg)] min-h-[320px] md:min-h-[380px]">
        <img
          src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=1200&h=500&fit=crop&q=80"
          alt="華やかなフラワーアレンジメント"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cq-primary/40 to-cq-primary/85" />
        <div className="relative flex flex-col justify-end gap-4 p-8 md:p-12 h-full min-h-[320px] md:min-h-[380px]">
          <p className="cq-brand-text text-xs text-white/80 tracking-[0.25em]">
            CAQUEHIN FOR BUSINESS
          </p>
          <h1 className="text-2xl md:text-4xl text-white leading-tight font-light tracking-wide">
            おはようございます、<br className="sm:hidden" />山下さん
          </h1>
          <p className="text-white/70 text-sm md:text-base max-w-md font-light">
            マエストロが心を込めてお仕立てする、<br />
            世界にひとつだけのフラワーギフト
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <Link href="/order" className="cq-btn-primary">
              <Gift className="w-4 h-4" />
              ORDER NOW
            </Link>
            <Link
              href="/store"
              className="cq-btn-secondary !text-white/90 !border-white/30 hover:!bg-white/10"
            >
              <ShoppingBag className="w-4 h-4" />
              BROWSE STORE
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="cq-card p-6">
          <div className="flex flex-col items-center text-center gap-2">
            <Flower2 className="w-5 h-5 text-cq-primary" />
            <p className="text-3xl font-light text-cq-text tracking-wide">
              {MOCK_ORDERS.length}
              <span className="text-sm ml-1 text-cq-text-secondary">件</span>
            </p>
            <p className="cq-overline text-cq-text-secondary">ORDERS</p>
          </div>
        </div>
        <div className="cq-card p-6">
          <div className="flex flex-col items-center text-center gap-2">
            <CreditCard className="w-5 h-5 text-cq-accent" />
            <p className="text-3xl font-light text-cq-accent tracking-wide">
              &yen;{MOCK_ORDERS.reduce((sum, o) => sum + o.totalAmount, 0).toLocaleString()}
            </p>
            <p className="cq-overline text-cq-text-secondary">MONTHLY SPEND</p>
          </div>
        </div>
        <div className="cq-card p-6">
          <div className="flex flex-col items-center text-center gap-2">
            <Users className="w-5 h-5 text-cq-primary" />
            <p className="text-3xl font-light text-cq-text tracking-wide">
              {nextMonthBirthdays.length}
              <span className="text-sm ml-1 text-cq-text-secondary">名</span>
            </p>
            <p className="cq-overline text-cq-text-secondary">UPCOMING BIRTHDAYS</p>
          </div>
        </div>
      </section>

      {/* Kintsugi divider */}
      <div className="cq-kintsugi" />

      {/* 花を贈る機会のお知らせ */}
      <section>
        <h2 className="text-xl text-cq-text font-light tracking-wide mb-5">
          花を贈る機会のお知らせ
        </h2>
        <div className="space-y-3">
          {currentMonthBirthdays.map((emp) => {
            const isAutoOrdered = emp.autoOrder;
            return (
              <div
                key={emp.id}
                className="bg-cq-surface-raised rounded-[var(--cq-radius-md)] border border-cq-border p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
              >
                <div className="p-2.5 bg-cq-accent/10 rounded-[var(--cq-radius-md)] shrink-0">
                  <Cake className="w-5 h-5 text-cq-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-cq-text">
                    {emp.name}さんのお誕生日
                  </p>
                  <p className="text-xs text-cq-text-secondary mt-0.5">
                    {emp.department} ・ {emp.birthday.replace("-", "月")}日
                    {emp.stylePref && (
                      <span className="ml-2 cq-brand-text text-[10px] tracking-[0.12em]">
                        {emp.stylePref}
                      </span>
                    )}
                  </p>
                </div>
                {isAutoOrdered ? (
                  <span className="text-xs font-medium text-cq-success bg-cq-success/8 px-3 py-1.5 rounded-[var(--cq-radius-sm)] border border-cq-success/20 whitespace-nowrap">
                    自動手配済み
                  </span>
                ) : (
                  <Link
                    href="/order"
                    className="text-sm font-medium text-cq-accent hover:text-cq-accent-light transition-colors whitespace-nowrap flex items-center gap-1"
                  >
                    <Gift className="w-4 h-4" />
                    ご注文はこちら
                  </Link>
                )}
              </div>
            );
          })}
          {currentMonthBirthdays.length === 0 && (
            <div className="bg-cq-surface-raised rounded-[var(--cq-radius-md)] border border-cq-border p-8 text-center">
              <Flower2 className="w-8 h-8 text-cq-border mx-auto mb-3" />
              <p className="text-sm text-cq-text-secondary">
                今月予定されているイベントはありません
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Section 10: 最近のご注文 (KEPT) */}
      <section>
        <h2 className="text-xl text-cq-text font-light tracking-wide mb-5">
          最近のご注文
        </h2>
        <div className="space-y-3">
          {MOCK_ORDERS.map((order) => (
            <button
              key={order.id}
              type="button"
              onClick={() => setSelectedOrder(order)}
              className="w-full text-left bg-cq-surface-raised rounded-[var(--cq-radius-md)] border border-cq-border p-5 hover:border-cq-accent/40 hover:shadow-sm transition-all cursor-pointer"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-center gap-3 shrink-0 sm:w-32">
                  <span
                    className={`w-2.5 h-2.5 rounded-full shrink-0 ${statusDotColors[order.status]}`}
                  />
                  <span className="text-xs text-cq-text-secondary">
                    {order.orderedAt}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-sm font-medium text-cq-text">
                      {order.recipientName}
                    </span>
                    <span className="text-xs text-cq-text-secondary">
                      {order.recipientCompany}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="cq-brand-text text-[11px] text-cq-text-secondary tracking-[0.12em]">
                      {order.styleName}
                    </span>
                    <span className="text-[11px] text-cq-text-secondary">
                      by{" "}
                      <span className="cq-heading-display">
                        {order.maestroName}
                      </span>
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="cq-heading text-base text-cq-accent">
                    &yen;{order.totalAmount.toLocaleString()}
                  </span>
                  <span
                    className={`text-[11px] font-medium px-2.5 py-1 rounded-[var(--cq-radius-sm)] whitespace-nowrap ${statusBadgeColors[order.status]}`}
                  >
                    {statusLabels[order.status]}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/history"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-cq-accent hover:text-cq-accent-light transition-colors"
          >
            すべてのご注文を見る
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Kintsugi divider */}
      <div className="cq-kintsugi" />

      {/* ストアへの導線: ピックアップ */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="cq-brand-text text-xs text-cq-accent tracking-[0.2em] mb-1">
              PICKUP
            </p>
            <h2 className="text-xl text-cq-text font-light tracking-wide">今季のおすすめ</h2>
          </div>
          <Link
            href="/store"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-cq-accent hover:text-cq-accent-light transition-colors"
          >
            ストアを見る
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {pickupProducts.map((product) => (
            <Link
              key={product.id}
              href="/store"
              className="bg-cq-surface-raised rounded-[var(--cq-radius-lg)] border border-cq-border shadow-sm hover:shadow-lg transition-shadow overflow-hidden group"
            >
              <div className="relative h-[140px] overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="cq-heading text-sm text-white drop-shadow-md">
                    {product.name}
                  </h3>
                </div>
              </div>
              <div className="p-3 flex items-center justify-between">
                <span className="text-xs font-light text-cq-accent tracking-wide">
                  {product.priceRange}
                </span>
                <span className="cq-brand-text text-[10px] text-cq-text-secondary">
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
