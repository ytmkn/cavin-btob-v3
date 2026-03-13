"use client";

import { useState } from "react";
import { X, Plus, Mail, MessageSquare, CreditCard } from "lucide-react";
import { STYLES } from "@/lib/mock-data";

type Member = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "member" | "viewer";
};

type CompanyInfo = {
  companyName: string;
  representative: string;
  address: string;
};

const ROLE_LABELS: Record<string, string> = {
  admin: "管理者",
  member: "メンバー",
  viewer: "閲覧者",
};

export default function SettingsPage() {
  // Company info
  const [company, setCompany] = useState<CompanyInfo>({
    companyName: "株式会社サンプル",
    representative: "山下 美智子",
    address: "東京都港区南青山1-2-3",
  });
  const [showCompanyModal, setShowCompanyModal] = useState(false);

  // Members
  const [members, setMembers] = useState<Member[]>([
    { id: "m1", name: "山下 美智子", email: "yamashita@example.com", role: "admin" },
    { id: "m2", name: "田中 拓也", email: "tanaka@example.com", role: "member" },
  ]);
  const [showMemberModal, setShowMemberModal] = useState(false);

  // Notifications
  const [emailNotify, setEmailNotify] = useState(true);
  const [slackWebhook, setSlackWebhook] = useState("");
  const [showSlackModal, setShowSlackModal] = useState(false);

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<"invoice" | "credit">("invoice");
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  return (
    <div className="max-w-3xl mx-auto space-y-20">
      {/* Header */}
      <div>
        <p className="text-[10px] tracking-[0.3em] uppercase text-cq-accent/80 mb-2">
          SETTINGS
        </p>
        <h1 className="cq-heading-display text-2xl text-cq-text font-light tracking-wide">
          アカウント設定
        </h1>
      </div>

      {/* Company Info */}
      <section>
        <h2 className="text-[11px] tracking-[0.15em] uppercase text-cq-text-secondary/50 mb-6">
          ご法人情報
        </h2>
        <div className="space-y-4">
          <InfoRow label="会社名" value={company.companyName} />
          <InfoRow label="代表者" value={company.representative} />
          <InfoRow label="住所" value={company.address} />
        </div>
        <div className="mt-6">
          <button
            onClick={() => setShowCompanyModal(true)}
            className="text-xs text-cq-text-secondary/50 hover:text-cq-text transition-colors"
          >
            編集する
          </button>
        </div>
        <div className="cq-kintsugi mt-10" />
      </section>

      {/* Members */}
      <section>
        <h2 className="text-[11px] tracking-[0.15em] uppercase text-cq-text-secondary/50 mb-6">
          メンバー
        </h2>
        <div className="space-y-1">
          {members.map((m) => (
            <div key={m.id} className="flex items-center gap-4 py-4 border-b border-cq-border/10 last:border-0">
              <span className="text-[11px] text-cq-accent/60 shrink-0">
                {m.name.charAt(0)}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-cq-text">{m.name}</p>
                <p className="text-xs text-cq-text-secondary/40 mt-0.5">{m.email}</p>
              </div>
              <span className="text-[11px] text-cq-text-secondary/50">
                {ROLE_LABELS[m.role]}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <button
            onClick={() => setShowMemberModal(true)}
            className="text-xs text-cq-accent hover:text-cq-accent-light transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-3 h-3" />
            メンバーを追加
          </button>
        </div>
        <div className="cq-kintsugi mt-10" />
      </section>

      {/* Notifications */}
      <section>
        <h2 className="text-[11px] tracking-[0.15em] uppercase text-cq-text-secondary/50 mb-6">
          通知設定
        </h2>
        <div className="space-y-6">
          {/* Email */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <Mail className="w-3.5 h-3.5 text-cq-text-secondary/40" />
              <span className="text-sm text-cq-text">メール通知</span>
            </div>
            <button
              onClick={() => setEmailNotify(!emailNotify)}
              className={`relative w-11 h-6 rounded-full transition-colors ${emailNotify ? "bg-cq-accent" : "bg-cq-border/50"}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${emailNotify ? "translate-x-5" : ""}`} />
            </button>
          </div>

          {/* Slack */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-3.5 h-3.5 text-cq-text-secondary/40" />
              <div>
                <span className="text-sm text-cq-text">Slack連携</span>
                {slackWebhook ? (
                  <p className="text-[10px] text-cq-accent/60 mt-0.5">設定済み</p>
                ) : (
                  <p className="text-[10px] text-cq-text-secondary/30 mt-0.5">未設定</p>
                )}
              </div>
            </div>
            <button
              onClick={() => setShowSlackModal(true)}
              className="text-xs text-cq-text-secondary/50 hover:text-cq-text transition-colors"
            >
              設定する
            </button>
          </div>
        </div>
        <div className="cq-kintsugi mt-10" />
      </section>

      {/* Payment */}
      <section>
        <h2 className="text-[11px] tracking-[0.15em] uppercase text-cq-text-secondary/50 mb-6">
          お支払い方法
        </h2>
        <div className="flex items-center gap-3 py-3">
          <CreditCard className="w-3.5 h-3.5 text-cq-accent/40" />
          <span className="text-sm text-cq-text">
            {paymentMethod === "invoice" ? "請求書払い" : "クレジットカード"}
          </span>
        </div>
        <div className="mt-4">
          <button
            onClick={() => setShowPaymentModal(true)}
            className="text-xs text-cq-text-secondary/50 hover:text-cq-text transition-colors"
          >
            変更する
          </button>
        </div>
      </section>

      {/* === Modals === */}

      {/* Company Edit Modal */}
      {showCompanyModal && (
        <ModalBackdrop onClose={() => setShowCompanyModal(false)}>
          <ModalContent title="ご法人情報の編集" onClose={() => setShowCompanyModal(false)}>
            <CompanyEditForm
              initial={company}
              onSave={(data) => { setCompany(data); setShowCompanyModal(false); }}
              onCancel={() => setShowCompanyModal(false)}
            />
          </ModalContent>
        </ModalBackdrop>
      )}

      {/* Add Member Modal */}
      {showMemberModal && (
        <ModalBackdrop onClose={() => setShowMemberModal(false)}>
          <ModalContent title="メンバーを追加" onClose={() => setShowMemberModal(false)}>
            <AddMemberForm
              onAdd={(m) => { setMembers((prev) => [...prev, m]); setShowMemberModal(false); }}
              onCancel={() => setShowMemberModal(false)}
            />
          </ModalContent>
        </ModalBackdrop>
      )}

      {/* Slack Modal */}
      {showSlackModal && (
        <ModalBackdrop onClose={() => setShowSlackModal(false)}>
          <ModalContent title="Slack連携設定" onClose={() => setShowSlackModal(false)}>
            <SlackForm
              initial={slackWebhook}
              onSave={(url) => { setSlackWebhook(url); setShowSlackModal(false); }}
              onCancel={() => setShowSlackModal(false)}
            />
          </ModalContent>
        </ModalBackdrop>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <ModalBackdrop onClose={() => setShowPaymentModal(false)}>
          <ModalContent title="お支払い方法の変更" onClose={() => setShowPaymentModal(false)}>
            <PaymentForm
              initial={paymentMethod}
              onSave={(method) => { setPaymentMethod(method); setShowPaymentModal(false); }}
              onCancel={() => setShowPaymentModal(false)}
            />
          </ModalContent>
        </ModalBackdrop>
      )}
    </div>
  );
}

/* --- Reusable components --- */

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-6 py-2 border-b border-cq-border/10">
      <span className="w-20 shrink-0 text-[11px] tracking-[0.1em] text-cq-text-secondary/50">{label}</span>
      <span className="text-sm text-cq-text">{value}</span>
    </div>
  );
}

/* --- Modal helpers --- */

function ModalBackdrop({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      {children}
    </div>
  );
}

function ModalContent({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="relative w-full max-w-md bg-cq-surface-raised rounded-[var(--cq-radius-lg)] shadow-xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-cq-border/20">
        <h2 className="cq-heading-display text-lg text-cq-text font-light tracking-wide">{title}</h2>
        <button onClick={onClose} className="p-1.5 text-cq-text-secondary/40 hover:text-cq-text rounded-md transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[11px] tracking-[0.1em] text-cq-text-secondary/60 mb-1.5 block">{label}</span>
      {children}
    </label>
  );
}

function FormActions({ onCancel, submitLabel }: { onCancel: () => void; submitLabel: string }) {
  return (
    <div className="flex gap-4 justify-end pt-4">
      <button type="button" onClick={onCancel} className="text-xs text-cq-text-secondary/50 hover:text-cq-text transition-colors">
        キャンセル
      </button>
      <button type="submit" className="text-xs text-cq-accent hover:text-cq-accent-light transition-colors">
        {submitLabel}
      </button>
    </div>
  );
}

/* --- Form components --- */

function CompanyEditForm({ initial, onSave, onCancel }: { initial: CompanyInfo; onSave: (data: CompanyInfo) => void; onCancel: () => void }) {
  const [companyName, setCompanyName] = useState(initial.companyName);
  const [representative, setRepresentative] = useState(initial.representative);
  const [address, setAddress] = useState(initial.address);

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave({ companyName, representative, address }); }} className="space-y-4">
      <FormField label="会社名">
        <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} required className="form-input" />
      </FormField>
      <FormField label="代表者">
        <input value={representative} onChange={(e) => setRepresentative(e.target.value)} required className="form-input" />
      </FormField>
      <FormField label="住所">
        <input value={address} onChange={(e) => setAddress(e.target.value)} required className="form-input" />
      </FormField>
      <FormActions onCancel={onCancel} submitLabel="保存" />
    </form>
  );
}

function AddMemberForm({ onAdd, onCancel }: { onAdd: (m: Member) => void; onCancel: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"admin" | "member" | "viewer">("member");

  return (
    <form onSubmit={(e) => { e.preventDefault(); onAdd({ id: `m-${Date.now()}`, name, email, role }); }} className="space-y-4">
      <FormField label="名前">
        <input value={name} onChange={(e) => setName(e.target.value)} required className="form-input" />
      </FormField>
      <FormField label="メールアドレス">
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="form-input" />
      </FormField>
      <FormField label="権限">
        <select value={role} onChange={(e) => setRole(e.target.value as Member["role"])} className="form-input">
          <option value="admin">管理者</option>
          <option value="member">メンバー</option>
          <option value="viewer">閲覧者</option>
        </select>
      </FormField>
      <FormActions onCancel={onCancel} submitLabel="追加する" />
    </form>
  );
}

function SlackForm({ initial, onSave, onCancel }: { initial: string; onSave: (url: string) => void; onCancel: () => void }) {
  const [url, setUrl] = useState(initial);

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(url); }} className="space-y-4">
      <FormField label="Webhook URL">
        <input value={url} onChange={(e) => setUrl(e.target.value)} required className="form-input" placeholder="https://hooks.slack.com/services/..." />
      </FormField>
      <FormActions onCancel={onCancel} submitLabel="保存" />
    </form>
  );
}

function PaymentForm({ initial, onSave, onCancel }: { initial: "invoice" | "credit"; onSave: (method: "invoice" | "credit") => void; onCancel: () => void }) {
  const [method, setMethod] = useState(initial);

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(method); }} className="space-y-4">
      <div className="space-y-3">
        <label className="flex items-center gap-3 py-3 cursor-pointer border-b border-cq-border/10">
          <input type="radio" name="payment" value="invoice" checked={method === "invoice"} onChange={() => setMethod("invoice")} className="accent-[var(--cq-color-accent)]" />
          <span className="text-sm text-cq-text">請求書払い</span>
        </label>
        <label className="flex items-center gap-3 py-3 cursor-pointer">
          <input type="radio" name="payment" value="credit" checked={method === "credit"} onChange={() => setMethod("credit")} className="accent-[var(--cq-color-accent)]" />
          <span className="text-sm text-cq-text">クレジットカード</span>
        </label>
      </div>
      <FormActions onCancel={onCancel} submitLabel="変更する" />
    </form>
  );
}
