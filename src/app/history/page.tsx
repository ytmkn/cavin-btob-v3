"use client";

import { useState, useMemo } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown, Download, Search } from "lucide-react";
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
  preparing: "準備中",
  in_transit: "配送中",
  delivered: "配達済み",
  completed: "完了",
};

const STATUS_COLORS: Record<string, string> = {
  preparing: "bg-cq-warning/10 text-cq-warning",
  in_transit: "bg-cq-primary/10 text-cq-primary",
  delivered: "bg-cq-accent/10 text-cq-accent",
  completed: "bg-cq-success/10 text-cq-success",
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

  function SortIcon({ column }: { column: SortKey }) {
    if (sortKey !== column) return <ArrowUpDown className="w-3.5 h-3.5 opacity-40" />;
    return sortDir === "asc" ? (
      <ArrowUp className="w-3.5 h-3.5" />
    ) : (
      <ArrowDown className="w-3.5 h-3.5" />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="cq-heading text-2xl text-cq-text">ご注文履歴</h1>
        <button
          onClick={() => exportOrdersToCSV(filtered)}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium border border-cq-border text-cq-text rounded-[var(--cq-radius-md)] hover:bg-cq-surface transition-colors"
        >
          <Download className="w-4 h-4" />
          CSV出力
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Status Tabs */}
        <div className="flex flex-wrap gap-2">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setStatusFilter(tab.key)}
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
                statusFilter === tab.key
                  ? "bg-cq-primary text-white"
                  : "bg-cq-surface text-cq-text-secondary hover:text-cq-text"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scene Filter */}
        <select
          value={sceneFilter}
          onChange={(e) => setSceneFilter(e.target.value)}
          className="px-3 py-1.5 text-sm border border-cq-border rounded-[var(--cq-radius-md)] bg-cq-surface-raised text-cq-text focus:outline-none focus:ring-2 focus:ring-cq-primary/20"
        >
          <option value="all">すべてのシーン</option>
          {SCENES.map((s) => (
            <option key={s.id} value={s.label}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* Count */}
      <p className="text-sm text-cq-text-secondary">{filtered.length} 件表示</p>

      {/* Table */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={Search}
          title="該当する注文がありません"
          description="フィルター条件を変更してお試しください。"
        />
      ) : (
        <div className="bg-cq-surface-raised border border-cq-border rounded-[var(--cq-radius-lg)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-cq-primary/5">
                  <th className="text-left px-4 py-3 font-medium text-cq-text-secondary text-xs tracking-wide">注文番号</th>
                  <th className="text-left px-4 py-3 font-medium text-cq-text-secondary text-xs tracking-wide">シーン</th>
                  <th className="text-left px-4 py-3 font-medium text-cq-text-secondary text-xs tracking-wide">お届け先</th>
                  <th className="text-left px-4 py-3 font-medium text-cq-text-secondary text-xs tracking-wide">スタイル</th>
                  <th className="text-left px-4 py-3 font-medium text-cq-text-secondary text-xs tracking-wide">マエストロ</th>
                  <th className="text-left px-4 py-3 font-medium text-cq-text-secondary text-xs tracking-wide">
                    <button onClick={() => handleSort("totalAmount")} className="flex items-center gap-1 hover:text-cq-text transition-colors">
                      金額 <SortIcon column="totalAmount" />
                    </button>
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-cq-text-secondary text-xs tracking-wide">ステータス</th>
                  <th className="text-left px-4 py-3 font-medium text-cq-text-secondary text-xs tracking-wide">
                    <button onClick={() => handleSort("orderedAt")} className="flex items-center gap-1 hover:text-cq-text transition-colors">
                      注文日 <SortIcon column="orderedAt" />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((order) => (
                  <tr
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className="border-t border-cq-border-subtle hover:bg-cq-accent/[0.03] cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3.5 font-medium text-cq-text">{order.orderCode}</td>
                    <td className="px-4 py-3.5 text-cq-text">{order.scene}</td>
                    <td className="px-4 py-3.5 text-cq-text">{order.recipientName}</td>
                    <td className="px-4 py-3.5 text-cq-text">{order.styleName}</td>
                    <td className="px-4 py-3.5 text-cq-text">{order.maestroName}</td>
                    <td className="px-4 py-3.5 text-cq-text">¥{order.totalAmount.toLocaleString("ja-JP")}</td>
                    <td className="px-4 py-3.5">
                      <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${STATUS_COLORS[order.status] ?? ""}`}>
                        {STATUS_LABELS[order.status] ?? order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-cq-text-secondary">{order.orderedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
