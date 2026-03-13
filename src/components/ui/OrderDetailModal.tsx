"use client";

import { useEffect, useCallback } from "react";
import { X } from "lucide-react";
import type { Order } from "@/lib/mock-data";

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

type OrderDetailModalProps = {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
};

export function OrderDetailModal({ order, isOpen, onClose }: OrderDetailModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-cq-surface-raised rounded-[var(--cq-radius-lg)] shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-cq-border">
          <h2 className="text-xl text-cq-text font-light tracking-wide">ご注文詳細</h2>
          <button
            onClick={onClose}
            className="p-1.5 text-cq-text-secondary hover:text-cq-text hover:bg-cq-surface rounded-[var(--cq-radius-md)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Order code & status */}
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium text-cq-text">{order.orderCode}</span>
            <span
              className={`px-3 py-1 text-xs font-medium rounded-[var(--cq-radius-sm)] ${STATUS_COLORS[order.status] ?? ""}`}
            >
              {STATUS_LABELS[order.status] ?? order.status}
            </span>
          </div>

          {/* Detail rows */}
          <div className="space-y-3.5">
            <DetailRow label="シーン" value={order.scene} />
            <DetailRow label="スタイル" value={order.styleName} />
            <DetailRow label="マエストロ" value={`${order.maestroName} (${order.maestroRank})`} />
            <DetailRow label="お届け先" value={`${order.recipientName} / ${order.recipientCompany}`} />
            <DetailRow label="お届け日" value={order.deliveryDate} />
            <DetailRow label="注文者" value={order.orderedBy} />
            <DetailRow label="注文日" value={order.orderedAt} />
            {order.message && <DetailRow label="メッセージ" value={order.message} />}
          </div>

          {/* Amount */}
          <div className="flex items-center justify-between pt-4 border-t border-cq-border">
            <span className="text-sm text-cq-text-secondary">合計金額（税込）</span>
            <span className="text-2xl font-light text-cq-accent tracking-wide">
              ¥{order.totalAmount.toLocaleString("ja-JP")}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-cq-border bg-cq-surface/50">
          <button
            onClick={onClose}
            className="w-full py-2.5 text-sm font-medium text-cq-text-secondary border border-cq-border rounded-[var(--cq-radius-md)] hover:bg-cq-surface transition-colors"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-4">
      <span className="w-24 shrink-0 text-sm text-cq-text-secondary">{label}</span>
      <span className="text-sm text-cq-text">{value}</span>
    </div>
  );
}
