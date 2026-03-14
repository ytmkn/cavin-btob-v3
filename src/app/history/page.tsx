"use client";

import { useState, useMemo } from "react";
import { Download, Search } from "lucide-react";
import { MOCK_ORDERS, SCENES } from "@/lib/mock-data";
import type { Order } from "@/lib/mock-data";
import { exportOrdersToCSV } from "@/lib/csv-utils";
import { OrderDetailModal } from "@/components/ui/OrderDetailModal";
import { EmptyState } from "@/components/ui/EmptyState";

const STATUS_TABS = [
  { key: "all", label: "すべて" },
  { key: "preparing", label: "準備中" },
  { key: "in_transit", label: "配送中" },
  { key: "delivered", label: "配達済み" },
  { key: "completed", label: "完了" },
] as const;

const STATUS_LABELS: Record<string, string> = {
  preparing: "お仕立て中",
  in_transit: "配送中",
  delivered: "お届け済み",
  completed: "完了",
};

type SortKey = "orderedAt" | "totalAmount";
type SortDir = "asc" | "desc";

export default function HistoryPage() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sceneFilter, setSceneFilter] = useState<string>("all");
  const [sortKey, setSortKey] = useState<SortKey>("orderedAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filtered = useMemo(() => {
    let result = [...MOCK_ORDERS];
    if (statusFilter !== "all") {
      result = result.filter((o) => o.status === statusFilter);
    }
    if (sceneFilter !== "all") {
      result = result.filter((o) => o.scene === sceneFilter);
    }
    result.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "orderedAt") {
        cmp = a.orderedAt.localeCompare(b.orderedAt);
      } else {
        cmp = a.totalAmount - b.totalAmount;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
    return result;
  }, [statusFilter, sceneFilter, sortKey, sortDir]);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-cq-accent/80 mb-2">
            ORDER HISTORY
          </p>
          <h1 className="cq-heading-display text-2xl text-cq-text font-light tracking-wide">
            ご注文履歴
          </h1>
        </div>
        <button
          onClick={() => exportOrdersToCSV(filtered)}
          className="text-xs text-cq-text-secondary/50 hover:text-cq-text transition-colors flex items-center gap-1.5"
        >
          <Download className="w-3 h-3" />
          CSV出力
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-6">
        {/* Status Tabs */}
        <div className="flex gap-6">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setStatusFilter(tab.key)}
              className={`relative pb-2 text-[11px] tracking-[0.1em] transition-colors ${
                statusFilter === tab.key
                  ? "text-cq-text"
                  : "text-cq-text-secondary/50 hover:text-cq-text-secondary"
              }`}
            >
              {tab.label}
              {statusFilter === tab.key && (
                <span className="absolute bottom-0 left-0 right-0 h-[0.5px] bg-cq-accent" />
              )}
            </button>
          ))}
        </div>

        {/* Scene Filter */}
        <select
          value={sceneFilter}
          onChange={(e) => setSceneFilter(e.target.value)}
          className="px-3 py-1.5 text-xs border border-cq-border/30 rounded-[var(--cq-radius-md)] bg-transparent text-cq-text-secondary focus:outline-none focus:border-cq-accent/40"
        >
          <option value="all">すべてのシーン</option>
          {SCENES.map((s) => (
            <option key={s.id} value={s.label}>
              {s.label}
            </option>
          ))}
        </select>

        {/* Sort */}
        <div className="flex gap-4 text-[11px] text-cq-text-secondary/50">
          <button
            onClick={() => handleSort("orderedAt")}
            className={`hover:text-cq-text transition-colors ${sortKey === "orderedAt" ? "text-cq-text" : ""}`}
          >
            日付順 {sortKey === "orderedAt" && (sortDir === "desc" ? "↓" : "↑")}
          </button>
          <button
            onClick={() => handleSort("totalAmount")}
            className={`hover:text-cq-text transition-colors ${sortKey === "totalAmount" ? "text-cq-text" : ""}`}
          >
            金額順 {sortKey === "totalAmount" && (sortDir === "desc" ? "↓" : "↑")}
          </button>
        </div>
      </div>

      {/* Count */}
      <p className="text-[11px] text-cq-text-secondary/40">{filtered.length} 件</p>

      {/* Order Cards */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={Search}
          title="該当する注文がありません"
          description="フィルター条件を変更してお試しください。"
        />
      ) : (
        <div className="space-y-4">
          {filtered.map((order) => (
            <button
              key={order.id}
              type="button"
              onClick={() => setSelectedOrder(order)}
              className="w-full text-left bg-white rounded-[var(--cq-radius-lg)] shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-6 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-all duration-200 cursor-pointer"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-sm text-cq-text">
                      {order.recipientName}
                    </span>
                    <span className="text-xs text-cq-text-secondary/40">
                      {order.recipientCompany}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-1.5">
                    <span className="text-[10px] tracking-[0.12em] uppercase text-cq-text-secondary/40">
                      {order.styleName}
                    </span>
                    <span className="text-[11px] text-cq-text-secondary/40">
                      by <span className="cq-heading-display">{order.maestroName}</span>
                    </span>
                    <span className="text-[10px] text-cq-text-secondary/30">
                      {order.scene}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-6 shrink-0">
                  <span className="text-sm font-light text-cq-accent tracking-wide">
                    &yen;{order.totalAmount.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-cq-text-secondary/50">
                    {STATUS_LABELS[order.status] ?? order.status}
                  </span>
                  <span className="text-[11px] text-cq-text-secondary/30">
                    {order.orderedAt}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      <OrderDetailModal
        order={selectedOrder}
        isOpen={selectedOrder !== null}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
}
