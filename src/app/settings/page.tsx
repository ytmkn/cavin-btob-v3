"use client";

import { useState } from "react";
import { X, Plus, Mail, MessageSquare, CreditCard, Building2, Users, Bell, Wallet } from "lucide-react";

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

const ROLE_COLORS: Record<string, string> = {
  admin: "bg-cq-primary/10 text-cq-primary",
  member: "bg-cq-accent/10 text-cq-accent",
  viewer: "bg-cq-surface text-cq-text-secondary",
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
    <div className="space-y-8 max-w-3xl">
      {/* Header */}
      <h1 className="cq-heading text-2xl text-cq-text">アカウント設定</h1>

      {/* Company Info */}
      <SectionCard icon={Building2} title="ご法人情報">
        <div className="space-y-3">
          <InfoRow label="会社名" value={company.companyName} />
          <InfoRow label="代表者" value={company.representative} />
          <InfoRow label="住所" value={company.address} />
        </div>
        <div className="mt-5">
          <button
            onClick={() => setShowCompanyModal(true)}
            className="px-4 py-2 text-sm font-medium border border-cq-border text-cq-text rounded-[var(--cq-radius-md)] hover:bg-cq-surface transition-colors"
          >
            編集
          </button>
        </div>
      </SectionCard>

      {/* Members */}
      <SectionCard icon={Users} title="メンバー">
        <div className="space-y-3">
          {members.map((m) => (
            <div key={m.id} className="flex items-center gap-3 py-2">
              <div className="w-9 h-9 rounded-full bg-cq-primary flex items-center justify-center shrink-0">
                <span className="text-white text-sm font-medium">{m.name.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-cq-text truncate">{m.name}</p>
                <p className="text-xs text-cq-text-secondary truncate">{m.email}</p>
              </div>
              <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${ROLE_COLORS[m.role]}`}>
                {ROLE_LABELS[m.role]}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-5">
          <button
            onClick={() => setShowMemberModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-cq-primary text-white rounded-[var(--cq-radius-md)] hover:bg-cq-primary-light transition-colors"
          >
            <Plus className="w-4 h-4" />
            メンバーを追加
          </button>
        </div>
      </SectionCard>

      {/* Notifications */}
      <SectionCard icon={Bell} title="通知設定">
        <div className="space-y-5">
          {/* Email */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-cq-text-secondary" />
              <span className="text-sm text-cq-text">メール通知</span>
            </div>
            <button
              onClick={() => setEmailNotify(!emailNotify)}
              className={`relative w-11 h-6 rounded-full transition-colors ${emailNotify ? "bg-cq-success" : "bg-cq-border"}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${emailNotify ? "translate-x-5" : ""}`} />
            </button>
          </div>

          {/* Slack */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-4 h-4 text-cq-text-secondary" />
              <div>
                <span className="text-sm text-cq-text">Slack連携</span>
                {slackWebhook ? (
                  <p className="text-xs text-cq-success mt-0.5">設定済み</p>
                ) : (
                  <p className="text-xs text-cq-text-secondary mt-0.5">未設定</p>
                )}
              </div>
            </div>
            <button
              onClick={() => setShowSlackModal(true)}
              className="px-3 py-1.5 text-xs font-medium border border-cq-border text-cq-text rounded-[var(--cq-radius-md)] hover:bg-cq-surface transition-colors"
            >
              設定する
            </button>
          </div>
        </div>
      </SectionCard>

      {/* Payment */}
      <SectionCard icon={Wallet} title="お支払い方法">
        <div className="flex items-center gap-3 py-2">
          <CreditCard className="w-5 h-5 text-cq-accent" />
          <span className="text-sm text-cq-text">
            {paymentMethod === "invoice" ? "請求書払い" : "クレジットカード"}
          </span>
        </div>
        <div className="mt-4">
          <button
            onClick={() => setShowPaymentModal(true)}
            className="px-4 py-2 text-sm font-medium border border-cq-border text-cq-text rounded-[var(--cq-radius-md)] hover:bg-cq-surface transition-colors"
          >
            変更
          </button>
        </div>
      </SectionCard>

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

/* --- Reusable Section Card --- */

function SectionCard({ icon: Icon, title, children }: { icon: React.ComponentType<{ className?: string }>; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-cq-surface-raised border border-cq-border rounded-[var(--cq-radius-lg)] p-6 lg:p-8">
      <div className="flex items-center gap-2.5 mb-5">
        <Icon className="w-5 h-5 text-cq-primary" />
        <h2 className="cq-heading text-lg text-cq-text">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-4">
      <span className="w-20 shrink-0 text-sm text-cq-text-secondary">{label}</span>
      <span className="text-sm text-cq-text">{value}</span>
    </div>
  );
}

/* --- Modal helpers --- */

function ModalBackdrop({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      {children}
    </div>
  );
}

function ModalContent({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="relative w-full max-w-md bg-cq-surface-raised rounded-[var(--cq-radius-lg)] shadow-xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-cq-border">
        <h2 className="cq-heading text-lg text-cq-text">{title}</h2>
        <button onClick={onClose} className="p-1.5 text-cq-text-secondary hover:text-cq-text rounded-md transition-colors">
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
      <span className="text-sm text-cq-text-secondary mb-1 block">{label}</span>
      {children}
    </label>
  );
}

function FormActions({ onCancel, submitLabel }: { onCancel: () => void; submitLabel: string }) {
  return (
    <div className="flex gap-3 justify-end pt-4">
      <button type="button" onClick={onCancel} className="px-4 py-2 text-sm text-cq-text-secondary border border-cq-border rounded-[var(--cq-radius-md)] hover:bg-cq-surface transition-colors">
        キャンセル
      </button>
      <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-cq-primary rounded-[var(--cq-radius-md)] hover:bg-cq-primary-light transition-colors">
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
        <label className="flex items-center gap-3 p-3 border border-cq-border rounded-[var(--cq-radius-md)] cursor-pointer hover:bg-cq-surface transition-colors">
          <input type="radio" name="payment" value="invoice" checked={method === "invoice"} onChange={() => setMethod("invoice")} className="accent-[var(--cq-color-primary)]" />
          <span className="text-sm text-cq-text">請求書払い</span>
        </label>
        <label className="flex items-center gap-3 p-3 border border-cq-border rounded-[var(--cq-radius-md)] cursor-pointer hover:bg-cq-surface transition-colors">
          <input type="radio" name="payment" value="credit" checked={method === "credit"} onChange={() => setMethod("credit")} className="accent-[var(--cq-color-primary)]" />
          <span className="text-sm text-cq-text">クレジットカード</span>
        </label>
      </div>
      <FormActions onCancel={onCancel} submitLabel="変更する" />
    </form>
  );
}
