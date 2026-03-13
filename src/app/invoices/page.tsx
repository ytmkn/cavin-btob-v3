"use client";

import { useState } from "react";
import { FileText, ChevronDown, ChevronUp, Download } from "lucide-react";
import { MOCK_INVOICES } from "@/lib/mock-data";
import type { Invoice } from "@/lib/mock-data";
import { generateInvoicePDF } from "@/lib/pdf-utils";
import { EmptyState } from "@/components/ui/EmptyState";

const STATUS_TABS = [
  { key: "all", label: "すべて" },
  { key: "issued", label: "発行済み" },
  { key: "paid", label: "支払済み" },
  { key: "overdue", label: "未払い" },
] as const;

const STATUS_LABELS: Record<string, string> = {
  issued: "発行済み",
  paid: "支払済み",
  overdue: "未払い",
};

export default function InvoicesPage() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = statusFilter === "all"
    ? MOCK_INVOICES
    : MOCK_INVOICES.filter((inv) => inv.status === statusFilter);

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* Header */}
      <div>
        <p className="text-[10px] tracking-[0.3em] uppercase text-cq-accent/80 mb-2">
          INVOICES
        </p>
        <h1 className="cq-heading-display text-2xl text-cq-text font-light tracking-wide">
          ご請求書
        </h1>
      </div>

      {/* Filter — text tabs */}
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

      {/* Count */}
      <p className="text-[11px] text-cq-text-secondary/40">{filtered.length} 件</p>

      {/* Invoice List */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="請求書がありません"
          description="該当する請求書が見つかりませんでした。"
        />
      ) : (
        <div className="space-y-1">
          {filtered.map((invoice) => (
            <InvoiceRow
              key={invoice.id}
              invoice={invoice}
              isExpanded={expandedId === invoice.id}
              onToggle={() => setExpandedId(expandedId === invoice.id ? null : invoice.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function InvoiceRow({
  invoice,
  isExpanded,
  onToggle,
}: {
  invoice: Invoice;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-cq-border/15 last:border-0">
      {/* Main Row */}
      <div
        className="flex flex-col sm:flex-row sm:items-center gap-3 py-5 cursor-pointer hover:bg-cq-surface-raised/50 transition-colors -mx-4 px-4 rounded-[var(--cq-radius-md)]"
        onClick={onToggle}
      >
        <div className="flex-1 min-w-0">
          <p className="text-sm text-cq-text">{invoice.invoiceNumber}</p>
          <p className="text-xs text-cq-text-secondary/40 mt-0.5">{invoice.period}</p>
        </div>

        <div className="flex items-center gap-6 shrink-0">
          <span className="text-xs text-cq-text-secondary/40">{invoice.orderCount}件</span>
          <span className="text-sm font-light text-cq-accent tracking-wide">
            &yen;{invoice.totalAmount.toLocaleString("ja-JP")}
          </span>
          <span className="text-[11px] text-cq-text-secondary/50">
            {STATUS_LABELS[invoice.status] ?? invoice.status}
          </span>
          <span className="text-[11px] text-cq-text-secondary/30 hidden sm:inline">
            期限: {invoice.dueDate}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              generateInvoicePDF(invoice);
            }}
            className="text-cq-text-secondary/30 hover:text-cq-text transition-colors"
            title="PDF出力"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
          {isExpanded ? (
            <ChevronUp className="w-3.5 h-3.5 text-cq-text-secondary/30" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-cq-text-secondary/30" />
          )}
        </div>
      </div>

      {/* Expanded Detail */}
      {isExpanded && (
        <div className="pb-6 pt-2 ml-0 sm:ml-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <DetailItem label="請求番号" value={invoice.invoiceNumber} />
            <DetailItem label="対象期間" value={invoice.period} />
            <DetailItem label="注文件数" value={`${invoice.orderCount}件`} />
            <DetailItem label="発行日" value={invoice.issuedAt} />
            <DetailItem label="支払期限" value={invoice.dueDate} />
            <DetailItem label="ステータス" value={STATUS_LABELS[invoice.status] ?? invoice.status} />
          </div>
        </div>
      )}
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] tracking-[0.1em] text-cq-text-secondary/40 mb-1">{label}</p>
      <p className="text-sm text-cq-text">{value}</p>
    </div>
  );
}
