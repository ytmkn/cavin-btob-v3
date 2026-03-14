"use client";

import { useState, useRef } from "react";
import { User, Cake, Upload, Plus, X, Gift } from "lucide-react";
import { MOCK_EMPLOYEES, STYLES } from "@/lib/mock-data";
import type { Employee } from "@/lib/mock-data";
import { EmptyState } from "@/components/ui/EmptyState";

const MONTH_NAMES = [
  "1月", "2月", "3月", "4月", "5月", "6月",
  "7月", "8月", "9月", "10月", "11月", "12月",
];

export default function AnniversaryPage() {
  const [employees, setEmployees] = useState<Employee[]>(MOCK_EMPLOYEES);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCsvPreview, setShowCsvPreview] = useState(false);
  const [csvData, setCsvData] = useState<Omit<Employee, "id">[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const calendarData = MONTH_NAMES.map((name, idx) => {
    const monthStr = String(idx + 1).padStart(2, "0");
    const emps = employees.filter((e) => e.birthday.startsWith(monthStr));
    return { name, emps };
  });

  const currentMonth = new Date().getMonth();

  function handleCsvUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result as string;
      const lines = text.split("\n").filter((l) => l.trim());
      if (lines.length < 2) return;
      const parsed: Omit<Employee, "id">[] = [];
      for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(",").map((c) => c.trim().replace(/^"|"$/g, ""));
        if (cols.length >= 3) {
          parsed.push({ name: cols[0], department: cols[1], birthday: cols[2], autoOrder: false });
        }
      }
      setCsvData(parsed);
      setShowCsvPreview(true);
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  function confirmCsvImport() {
    const newEmps: Employee[] = csvData.map((d, i) => ({ ...d, id: `csv-${Date.now()}-${i}` }));
    setEmployees((prev) => [...prev, ...newEmps]);
    setShowCsvPreview(false);
    setCsvData([]);
  }

  return (
    <div className="max-w-6xl mx-auto space-y-14">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-cq-accent/80 mb-2">
            ANNIVERSARY
          </p>
          <h1 className="cq-heading-display text-2xl text-cq-text font-light tracking-wide">
            記念日管理
          </h1>
          <p className="mt-2 text-sm text-cq-text-secondary font-light">
            大切な方のお祝いを、忘れずに
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 text-sm border border-cq-border/60 text-cq-text-secondary rounded-[var(--cq-radius-md)] hover:bg-cq-surface-raised transition-colors"
          >
            <Upload className="w-3.5 h-3.5" />
            CSVアップロード
          </button>
          <input ref={fileInputRef} type="file" accept=".csv" className="hidden" onChange={handleCsvUpload} />
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-cq-accent/10 text-cq-accent border border-cq-accent/20 rounded-[var(--cq-radius-md)] hover:bg-cq-accent/15 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            社員を追加
          </button>
        </div>
      </div>

      {/* Employee Cards */}
      {employees.length === 0 ? (
        <EmptyState
          icon={Gift}
          title="社員が登録されていません"
          description="CSVアップロードまたは手動で社員情報を追加してください。"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {employees.map((emp) => (
            <div
              key={emp.id}
              className="bg-white rounded-[var(--cq-radius-lg)] shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-6 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-all duration-200"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-cq-accent/10 flex items-center justify-center shrink-0">
                  <span className="text-cq-accent text-sm">{emp.name.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-cq-text truncate">{emp.name}</p>
                  <p className="text-xs text-cq-text-secondary/60">{emp.department}</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-cq-text">
                  <Cake className="w-3.5 h-3.5 text-cq-accent/60" />
                  <span>{parseInt(emp.birthday.split("-")[0])}月{parseInt(emp.birthday.split("-")[1])}日</span>
                </div>
                {emp.autoOrder ? (
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-[11px] bg-cq-accent/8 text-cq-accent border border-cq-accent/15 rounded-[var(--cq-radius-sm)]">
                      自動注文 ON
                    </span>
                    <span className="text-xs text-cq-text-secondary">
                      {emp.stylePref} / &yen;{emp.budget?.toLocaleString("ja-JP")}
                    </span>
                  </div>
                ) : (
                  <p className="text-xs text-cq-text-secondary/50">自動注文 OFF</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Kintsugi divider */}
      <div className="cq-kintsugi" />

      {/* Calendar Section */}
      <section>
        <p className="text-[10px] tracking-[0.3em] uppercase text-cq-accent/80 mb-2">
          ANNUAL SCHEDULE
        </p>
        <h2 className="cq-heading-display text-xl text-cq-text font-light tracking-wide mb-8">
          年間スケジュール
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {calendarData.map((month, idx) => (
            <div
              key={month.name}
              className={`bg-cq-surface-raised border border-cq-border/20 rounded-[var(--cq-radius-md)] p-4 ${
                idx === currentMonth ? "border-l-2 border-l-cq-accent bg-cq-accent/[0.02]" : ""
              }`}
            >
              <p className={`text-sm mb-2 ${
                idx === currentMonth ? "text-cq-accent font-medium" : "text-cq-text-secondary/60"
              }`}>
                {month.name}
              </p>
              {month.emps.length > 0 ? (
                <div className="space-y-1">
                  {month.emps.map((e) => (
                    <p key={e.id} className="text-xs text-cq-text-secondary">
                      {e.name} — {parseInt(e.birthday.split("-")[1])}日
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-cq-text-secondary/30">&mdash;</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Add Employee Modal */}
      {showAddModal && <AddEmployeeModal onClose={() => setShowAddModal(false)} onAdd={(emp) => {
        setEmployees((prev) => [...prev, emp]);
        setShowAddModal(false);
      }} />}

      {/* CSV Preview Modal */}
      {showCsvPreview && (
        <ModalBackdrop onClose={() => setShowCsvPreview(false)}>
          <div className="relative w-full max-w-md bg-cq-surface-raised rounded-[var(--cq-radius-lg)] shadow-xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-cq-border/30">
              <h2 className="cq-heading-display text-lg text-cq-text font-light">CSVプレビュー</h2>
              <button onClick={() => setShowCsvPreview(false)} className="p-1.5 text-cq-text-secondary hover:text-cq-text rounded-md transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 py-4 max-h-[50vh] overflow-y-auto space-y-2">
              {csvData.map((d, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-cq-text py-2 border-b border-cq-border/15">
                  <User className="w-4 h-4 text-cq-text-secondary/50" />
                  <span className="font-medium">{d.name}</span>
                  <span className="text-cq-text-secondary">{d.department}</span>
                  <span className="text-cq-text-secondary/60 ml-auto">{d.birthday}</span>
                </div>
              ))}
              {csvData.length === 0 && <p className="text-sm text-cq-text-secondary">データがありません</p>}
            </div>
            <div className="px-6 py-4 border-t border-cq-border/30 flex gap-3 justify-end">
              <button onClick={() => setShowCsvPreview(false)} className="px-4 py-2 text-sm text-cq-text-secondary border border-cq-border/40 rounded-[var(--cq-radius-md)] hover:bg-cq-surface transition-colors">
                キャンセル
              </button>
              <button onClick={confirmCsvImport} className="px-4 py-2 text-sm text-cq-accent bg-cq-accent/10 border border-cq-accent/20 rounded-[var(--cq-radius-md)] hover:bg-cq-accent/15 transition-colors">
                {csvData.length}件を追加
              </button>
            </div>
          </div>
        </ModalBackdrop>
      )}
    </div>
  );
}

function ModalBackdrop({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      {children}
    </div>
  );
}

function AddEmployeeModal({ onClose, onAdd }: { onClose: () => void; onAdd: (emp: Employee) => void }) {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [birthday, setBirthday] = useState("");
  const [autoOrder, setAutoOrder] = useState(false);
  const [stylePref, setStylePref] = useState("LUMINOUS");
  const [budget, setBudget] = useState(8000);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !department || !birthday) return;
    onAdd({ id: `new-${Date.now()}`, name, department, birthday, autoOrder, ...(autoOrder ? { stylePref, budget } : {}) });
  }

  return (
    <ModalBackdrop onClose={onClose}>
      <div className="relative w-full max-w-md bg-cq-surface-raised rounded-[var(--cq-radius-lg)] shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-cq-border/30">
          <h2 className="cq-heading-display text-lg text-cq-text font-light">社員を追加</h2>
          <button onClick={onClose} className="p-1.5 text-cq-text-secondary hover:text-cq-text rounded-md transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <FormField label="名前">
            <input value={name} onChange={(e) => setName(e.target.value)} required className="form-input" placeholder="山田 太郎" />
          </FormField>
          <FormField label="部署">
            <input value={department} onChange={(e) => setDepartment(e.target.value)} required className="form-input" placeholder="エンジニアリング" />
          </FormField>
          <FormField label="誕生日 (MM-DD)">
            <input value={birthday} onChange={(e) => setBirthday(e.target.value)} required className="form-input" placeholder="03-15" pattern="\d{2}-\d{2}" />
          </FormField>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setAutoOrder(!autoOrder)}
              className={`relative w-11 h-6 rounded-full transition-colors ${autoOrder ? "bg-cq-accent" : "bg-cq-border"}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${autoOrder ? "translate-x-5" : ""}`} />
            </button>
            <span className="text-sm text-cq-text">自動注文</span>
          </div>
          {autoOrder && (
            <div className="space-y-4 pl-4 border-l-2 border-cq-accent/20">
              <FormField label="スタイル">
                <select value={stylePref} onChange={(e) => setStylePref(e.target.value)} className="form-input">
                  {STYLES.map((s) => (<option key={s.id} value={s.name}>{s.name}</option>))}
                </select>
              </FormField>
              <FormField label="予算">
                <input type="number" value={budget} onChange={(e) => setBudget(Number(e.target.value))} className="form-input" min={1000} step={1000} />
              </FormField>
            </div>
          )}
          <div className="flex gap-3 justify-end pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-cq-text-secondary border border-cq-border/40 rounded-[var(--cq-radius-md)] hover:bg-cq-surface transition-colors">
              キャンセル
            </button>
            <button type="submit" className="px-4 py-2 text-sm text-cq-accent bg-cq-accent/10 border border-cq-accent/20 rounded-[var(--cq-radius-md)] hover:bg-cq-accent/15 transition-colors">
              追加する
            </button>
          </div>
        </form>
      </div>
    </ModalBackdrop>
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
