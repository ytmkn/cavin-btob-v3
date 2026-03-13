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

const STATUS_COLORS: Record<string, string> = {
  issued: "bg-cq-accent/10 text-cq-accent",
  paid: "bg-cq-success/10 text-cq-success",
  overdue: "bg-cq-error/10 text-cq-error",
};

export default function InvoicesPage() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = statusFilter === "all"
    ? MOCK_INVOICES
    : MOCK_INVOICES.filter((inv) => inv.status === statusFilter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <h1 className="cq-heading text-2xl text-cq-text">ご請求書</h1>

      {/* Filter */}
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

      {/* Invoice Cards */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="請求書がありません"
          description="該当する請求書が見つかりませんでした。"
        />
      ) : (
        <div className="space-y-4">
          {filtered.map((invoice) => (
            <InvoiceCard
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

function InvoiceCard({
  invoice,
  isExpanded,
  onToggle,
}: {
  invoice: Invoice;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-cq-surface-raised border border-cq-border rounded-[var(--cq-radius-lg)] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Main Row */}
      <div
        className="flex flex-col sm:flex-row sm:items-center gap-4 px-6 py-5 cursor-pointer"
        onClick={onToggle}
      >
        {/* Left: Invoice number & period */}
        <div className="flex-1 min-w-0">
          <p className="font-medium text-cq-text">{invoice.invoiceNumber}</p>
          <p className="text-xs text-cq-text-secondary mt-0.5">{invoice.period}</p>
        </div>

        {/* Center: order count + amount */}
        <div className="flex items-baseline gap-4">
          <span className="text-sm text-cq-text-secondary">{invoice.orderCount}件</span>
          <span className="font-serif text-xl text-cq-text">
            ¥{invoice.totalAmount.toLocaleString("ja-JP")}
          </span>
        </div>

        {/* Right: status + due date + actions */}
        <div className="flex items-center gap-3 shrink-0">
          <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${STATUS_COLORS[invoice.status] ?? ""}`}>
            {STATUS_LABELS[invoice.status] ?? invoice.status}
          </span>
          <span className="text-xs text-cq-text-secondary hidden sm:inline">
            期限: {invoice.dueDate}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              generateInvoicePDF(invoice);
            }}
            className="p-2 text-cq-text-secondary hover:text-cq-primary hover:bg-cq-surface rounded-md transition-colors"
            title="PDF出力"
          >
            <Download className="w-4 h-4" />
          </button>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-cq-text-secondary" />
          ) : (
            <ChevronDown className="w-4 h-4 text-cq-text-secondary" />
          )}
        </div>
      </div>

      {/* Expanded Detail */}
      {isExpanded && (
        <div className="px-6 py-4 border-t border-cq-border bg-cq-surface/30">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
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
      <p className="text-xs text-cq-text-secondary mb-0.5">{label}</p>
      <p className="text-cq-text font-medium">{value}</p>
    </div>
  );
}
