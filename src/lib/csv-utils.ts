import type { Order, Invoice } from "./mock-data";

function downloadCSV(csvContent: string, filename: string) {
  const bom = "\uFEFF"; // UTF-8 BOM for Excel compatibility
  const blob = new Blob([bom + csvContent], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function escapeCSV(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

const ORDER_STATUS_LABELS: Record<string, string> = {
  preparing: "準備中",
  in_transit: "配送中",
  delivered: "配達済み",
  completed: "完了",
};

const INVOICE_STATUS_LABELS: Record<string, string> = {
  issued: "発行済み",
  paid: "支払済み",
  overdue: "未払い",
};

export function exportOrdersToCSV(orders: Order[]) {
  const headers = [
    "注文番号",
    "シーン",
    "宛先名",
    "宛先会社",
    "スタイル",
    "マエストロ",
    "金額",
    "ステータス",
    "注文日",
  ];

  const rows = orders.map((o) =>
    [
      escapeCSV(o.orderCode),
      escapeCSV(o.scene),
      escapeCSV(o.recipientName),
      escapeCSV(o.recipientCompany),
      escapeCSV(o.styleName),
      escapeCSV(o.maestroName),
      String(o.totalAmount),
      ORDER_STATUS_LABELS[o.status] ?? o.status,
      o.orderedAt,
    ].join(",")
  );

  const csv = [headers.join(","), ...rows].join("\n");
  const today = new Date().toISOString().slice(0, 10);
  downloadCSV(csv, `注文履歴_${today}.csv`);
}

export function exportInvoicesToCSV(invoices: Invoice[]) {
  const headers = [
    "請求番号",
    "対象期間",
    "注文件数",
    "合計金額",
    "ステータス",
    "発行日",
    "支払期限",
  ];

  const rows = invoices.map((i) =>
    [
      escapeCSV(i.invoiceNumber),
      escapeCSV(i.period),
      String(i.orderCount),
      String(i.totalAmount),
      INVOICE_STATUS_LABELS[i.status] ?? i.status,
      i.issuedAt,
      i.dueDate,
    ].join(",")
  );

  const csv = [headers.join(","), ...rows].join("\n");
  const today = new Date().toISOString().slice(0, 10);
  downloadCSV(csv, `請求書一覧_${today}.csv`);
}
