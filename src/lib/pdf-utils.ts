import type { Invoice } from "./mock-data";

const INVOICE_STATUS_LABELS: Record<string, string> = {
  issued: "発行済み",
  paid: "支払済み",
  overdue: "未払い",
};

export function generateInvoicePDF(invoice: Invoice) {
  const statusLabel = INVOICE_STATUS_LABELS[invoice.status] ?? invoice.status;

  const html = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>請求書 ${invoice.invoiceNumber}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: "Hiragino Kaku Gothic ProN", "SF Pro Display", system-ui, sans-serif;
      color: #0A0A0A;
      padding: 48px;
      max-width: 800px;
      margin: 0 auto;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 48px;
      padding-bottom: 24px;
      border-bottom: 2px solid #C4A265;
    }
    .header h1 {
      font-size: 28px;
      font-weight: 300;
      letter-spacing: 0.15em;
      text-transform: uppercase;
    }
    .header .invoice-number {
      text-align: right;
      font-size: 14px;
      color: #6B6B6B;
    }
    .header .invoice-number strong {
      display: block;
      font-size: 16px;
      color: #0A0A0A;
      margin-bottom: 4px;
    }
    .company-info {
      margin-bottom: 40px;
      font-size: 14px;
      line-height: 1.8;
      color: #6B6B6B;
    }
    .company-info .name {
      font-size: 16px;
      font-weight: 500;
      color: #0A0A0A;
      margin-bottom: 4px;
    }
    .details-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 32px;
    }
    .details-table th {
      text-align: left;
      padding: 12px 16px;
      font-size: 12px;
      font-weight: 500;
      color: #6B6B6B;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      border-bottom: 1px solid #E5E0D8;
    }
    .details-table td {
      padding: 14px 16px;
      font-size: 14px;
      border-bottom: 1px solid #F0EDE8;
    }
    .details-table .label {
      color: #6B6B6B;
      width: 180px;
    }
    .total-section {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 48px;
    }
    .total-box {
      background: #F5F2ED;
      padding: 20px 32px;
      border-radius: 4px;
      text-align: right;
    }
    .total-box .label {
      font-size: 12px;
      color: #6B6B6B;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 4px;
    }
    .total-box .amount {
      font-size: 28px;
      font-weight: 500;
    }
    .footer {
      margin-top: 48px;
      padding-top: 24px;
      border-top: 1px solid #E5E0D8;
      text-align: center;
      font-size: 12px;
      color: #6B6B6B;
      line-height: 1.8;
    }
    .status-badge {
      display: inline-block;
      padding: 2px 10px;
      border-radius: 2px;
      font-size: 12px;
      font-weight: 500;
      background: #F5F2ED;
      color: #6B6B6B;
    }
    @media print {
      body { padding: 24px; }
      @page { margin: 20mm; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>請求書</h1>
    <div class="invoice-number">
      <strong>${invoice.invoiceNumber}</strong>
      発行日: ${invoice.issuedAt}
    </div>
  </div>

  <div class="company-info">
    <p class="name">CAQUEHIN for Business</p>
    <p>株式会社カキン</p>
    <p>東京都港区南青山X-XX-XX</p>
    <p>TEL: 03-XXXX-XXXX</p>
  </div>

  <table class="details-table">
    <tbody>
      <tr>
        <td class="label">請求番号</td>
        <td>${invoice.invoiceNumber}</td>
      </tr>
      <tr>
        <td class="label">対象期間</td>
        <td>${invoice.period}</td>
      </tr>
      <tr>
        <td class="label">注文件数</td>
        <td>${invoice.orderCount} 件</td>
      </tr>
      <tr>
        <td class="label">ステータス</td>
        <td><span class="status-badge">${statusLabel}</span></td>
      </tr>
      <tr>
        <td class="label">発行日</td>
        <td>${invoice.issuedAt}</td>
      </tr>
      <tr>
        <td class="label">支払期限</td>
        <td>${invoice.dueDate}</td>
      </tr>
    </tbody>
  </table>

  <div class="total-section">
    <div class="total-box">
      <p class="label">合計金額（税込）</p>
      <p class="amount">&yen;${invoice.totalAmount.toLocaleString("ja-JP")}</p>
    </div>
  </div>

  <div class="footer">
    <p>CAQUEHIN for Business &mdash; 法人向けフラワーギフトサービス</p>
    <p>本請求書は電子的に発行されたものです。</p>
  </div>
</body>
</html>`;

  const printWindow = window.open("", "_blank");
  if (printWindow) {
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.addEventListener("load", () => {
      printWindow.print();
    });
  }
}
