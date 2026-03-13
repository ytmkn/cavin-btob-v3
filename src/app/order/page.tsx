"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import {
  Crown,
  TrendingUp,
  Store,
  Building2,
  Heart,
  Flower2,
  Cake,
  Check,
  ChevronRight,
  ChevronLeft,
  Loader2,
  ArrowLeft,
  Home,
} from "lucide-react";
import { SCENES, STYLES, BUDGET_RANGES, MAESTROS } from "@/lib/mock-data";
import type { Maestro, FlowerStyle } from "@/lib/mock-data";

// Icon mapping
const SCENE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Crown,
  TrendingUp,
  Store,
  Building2,
  Heart,
  Flower2,
  Cake,
};

// Step definitions
const STEPS = [
  { id: 1, label: "シーンとスタイル" },
  { id: 2, label: "マエストロ" },
  { id: 3, label: "お届け先とご確認" },
] as const;

// Rank badge styling
const RANK_STYLES: Record<string, string> = {
  "S-RANK": "bg-cq-primary/85 text-cq-accent border border-cq-primary/20",
  "A-RANK": "bg-cq-primary/70 text-cq-surface border border-cq-primary/15",
  DEBUT: "bg-cq-surface text-cq-text-secondary border border-cq-border",
};

// Form state
type DeliveryForm = {
  companyName: string;
  recipientName: string;
  postalCode: string;
  address: string;
  deliveryDate: string;
  message: string;
};

const initialForm: DeliveryForm = {
  companyName: "",
  recipientName: "",
  postalCode: "",
  address: "",
  deliveryDate: "",
  message: "",
};

export default function OrderPage() {
  const [step, setStep] = useState(1);
  const [selectedScene, setSelectedScene] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<FlowerStyle | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [selectedMaestro, setSelectedMaestro] = useState<Maestro | null>(null);
  const [form, setForm] = useState<DeliveryForm>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Recommended styles for the selected scene
  const recommendedStyles = useMemo(() => {
    if (!selectedScene) return [];
    const scene = SCENES.find((s) => s.id === selectedScene);
    if (!scene) return [];
    return STYLES.filter((st) => (scene.recommendedStyles as readonly string[]).includes(st.name));
  }, [selectedScene]);

  const otherStyles = useMemo(() => {
    if (!selectedScene) return STYLES;
    const scene = SCENES.find((s) => s.id === selectedScene);
    if (!scene) return STYLES;
    return STYLES.filter((st) => !(scene.recommendedStyles as readonly string[]).includes(st.name));
  }, [selectedScene]);

  // Form handlers
  const updateForm = useCallback(
    (field: keyof DeliveryForm, value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handlePostalCode = useCallback(
    (value: string) => {
      // Remove non-digits
      const digits = value.replace(/\D/g, "");
      // Auto-hyphen
      if (digits.length <= 3) {
        updateForm("postalCode", digits);
      } else {
        updateForm("postalCode", `${digits.slice(0, 3)}-${digits.slice(3, 7)}`);
      }
    },
    [updateForm]
  );

  // Compute totals
  const basePrice = useMemo(() => {
    if (!selectedBudget) return 0;
    const budget = BUDGET_RANGES.find((b) => b.id === selectedBudget);
    return budget ? budget.min : 0;
  }, [selectedBudget]);

  const nominationFee = selectedMaestro?.nominationFee ?? 0;
  const totalPrice = basePrice + nominationFee;

  // Step navigation
  const canProceedStep1 = selectedScene && selectedStyle && selectedBudget;
  const canProceedStep2 = selectedMaestro !== null;

  const handleSubmit = useCallback(() => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsComplete(true);
    }, 1500);
  }, []);

  const handleReset = useCallback(() => {
    setStep(1);
    setSelectedScene(null);
    setSelectedStyle(null);
    setSelectedBudget(null);
    setSelectedMaestro(null);
    setForm(initialForm);
    setIsComplete(false);
  }, []);

  // Completion screen
  if (isComplete) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center space-y-6">
        <div className="mx-auto w-20 h-20 bg-cq-accent/10 rounded-[var(--cq-radius-lg)] flex items-center justify-center border border-cq-accent/20">
          <Check className="w-10 h-10 text-cq-primary" />
        </div>
        <h1 className="text-3xl text-cq-text font-light tracking-wide">
          ご注文ありがとうございます
        </h1>
        <p className="text-cq-text-secondary text-lg font-light">
          マエストロが心を込めてお仕立ていたします
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <button onClick={handleReset} className="cq-btn-primary">
            <Flower2 className="w-4 h-4" />
            NEW ORDER
          </button>
          <Link href="/" className="cq-btn-secondary">
            <Home className="w-4 h-4" />
            DASHBOARD
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-0 mb-10 px-4">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-[var(--cq-radius-md)] flex items-center justify-center text-sm font-medium transition-colors ${
                  step >= s.id
                    ? "bg-cq-accent text-white"
                    : "bg-cq-surface border border-cq-border text-cq-text-secondary"
                }`}
              >
                {step > s.id ? <Check className="w-4 h-4" /> : s.id}
              </div>
              <span
                className={`cq-heading text-sm hidden sm:inline ${
                  step >= s.id ? "text-cq-text" : "text-cq-text-secondary"
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`w-12 sm:w-20 h-px mx-3 ${
                  step > s.id ? "bg-cq-accent" : "bg-cq-border"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Scene & Style */}
      {step === 1 && (
        <div className="space-y-10 cq-flower-bg rounded-[var(--cq-radius-lg)] p-6 md:p-10">
          {/* Scene Selection */}
          <div>
            <h2 className="text-2xl text-cq-text font-light tracking-wide mb-2">
              贈る場面をお選びください
            </h2>
            <p className="text-cq-text-secondary mb-6">
              シーンに合わせて最適なスタイルをご提案します
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {SCENES.map((scene) => {
                const IconComponent = SCENE_ICONS[scene.icon];
                const isSelected = selectedScene === scene.id;
                return (
                  <button
                    key={scene.id}
                    type="button"
                    onClick={() => {
                      setSelectedScene(scene.id);
                      setSelectedStyle(null); // Reset style when scene changes
                    }}
                    className={`flex flex-col items-center gap-3 p-5 rounded-[var(--cq-radius-md)] border transition-all cursor-pointer ${
                      isSelected
                        ? "border-cq-primary bg-cq-primary/5 shadow-sm"
                        : "border-cq-border bg-cq-surface-raised hover:border-cq-primary/30 hover:shadow-sm"
                    }`}
                  >
                    {IconComponent && (
                      <IconComponent
                        className={`w-7 h-7 ${
                          isSelected ? "text-cq-primary" : "text-cq-text-secondary"
                        }`}
                      />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        isSelected ? "text-cq-primary" : "text-cq-text"
                      }`}
                    >
                      {scene.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Style Selection (appears after scene) */}
          {selectedScene && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h3 className="text-lg text-cq-text font-light tracking-wide mb-4">
                スタイルを選ぶ
              </h3>

              {/* Recommended styles */}
              {recommendedStyles.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-cq-accent font-medium mb-3 tracking-wide">
                    おすすめスタイル
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {recommendedStyles.map((style) => (
                      <StyleCard
                        key={style.id}
                        style={style}
                        isSelected={selectedStyle?.id === style.id}
                        onSelect={() => setSelectedStyle(style)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Other styles */}
              {otherStyles.length > 0 && (
                <div>
                  <p className="text-xs text-cq-text-secondary font-medium mb-3 tracking-wide">
                    その他のスタイル
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {otherStyles.map((style) => (
                      <StyleCard
                        key={style.id}
                        style={style}
                        isSelected={selectedStyle?.id === style.id}
                        onSelect={() => setSelectedStyle(style)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Budget selector */}
              {selectedStyle && (
                <div className="mt-8 animate-in fade-in duration-200">
                  <h3 className="text-lg text-cq-text font-light tracking-wide mb-4">
                    ご予算
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {BUDGET_RANGES.map((budget) => (
                      <button
                        key={budget.id}
                        type="button"
                        onClick={() => setSelectedBudget(budget.id)}
                        className={`px-5 py-2.5 rounded-[var(--cq-radius-md)] text-sm font-medium border transition-all cursor-pointer ${
                          selectedBudget === budget.id
                            ? "bg-cq-accent text-white border-cq-accent"
                            : "bg-cq-surface-raised border-cq-border text-cq-text hover:border-cq-accent/40"
                        }`}
                      >
                        {budget.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Next button */}
          <div className="flex justify-end pt-4">
            <button
              type="button"
              disabled={!canProceedStep1}
              onClick={() => setStep(2)}
              className="cq-btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
            >
              NEXT
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Maestro */}
      {step === 2 && (
        <div className="space-y-8 cq-flower-bg rounded-[var(--cq-radius-lg)] p-6 md:p-10">
          <div>
            <h2 className="text-2xl text-cq-text font-light tracking-wide mb-2">
              あなたの花を仕立てるマエストロ
            </h2>
            <p className="text-cq-text-secondary">
              選ばれた職人が、一つひとつ心を込めてお作りします
            </p>
          </div>

          <div className="space-y-4">
            {MAESTROS.map((maestro) => {
              const isSelected = selectedMaestro?.id === maestro.id;
              return (
                <button
                  key={maestro.id}
                  type="button"
                  onClick={() => setSelectedMaestro(maestro)}
                  className={`w-full text-left p-6 rounded-[var(--cq-radius-lg)] border-2 transition-all cursor-pointer ${
                    isSelected
                      ? "border-cq-accent bg-cq-accent/5 shadow-md ring-1 ring-cq-accent/20"
                      : "border-cq-border bg-cq-surface-raised hover:border-cq-accent/30 hover:shadow-sm"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    {/* Maestro info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="cq-heading-display text-xl text-cq-text">
                          {maestro.stageName}
                        </h3>
                        <span
                          className={`px-2.5 py-0.5 text-[11px] font-bold tracking-wider rounded-[var(--cq-radius-sm)] ${RANK_STYLES[maestro.rank]}`}
                        >
                          {maestro.rank}
                        </span>
                        {isSelected && (
                          <div className="w-6 h-6 bg-cq-accent rounded-[var(--cq-radius-sm)] flex items-center justify-center ml-auto sm:ml-0">
                            <Check className="w-3.5 h-3.5 text-white" />
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-cq-text-secondary leading-relaxed mb-3">
                        {maestro.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-cq-text-secondary">
                        <span>
                          完遂率{" "}
                          <span className="font-medium text-cq-text">
                            {maestro.perfectionRate}%
                          </span>
                        </span>
                        <span>
                          実績{" "}
                          <span className="font-medium text-cq-text">
                            {maestro.totalWorks}件
                          </span>
                        </span>
                        <span>拠点: {maestro.location}</span>
                      </div>
                    </div>

                    {/* Nomination fee */}
                    <div className="shrink-0 text-right sm:text-left">
                      {maestro.nominationFee > 0 ? (
                        <div>
                          <p className="text-xs text-cq-text-secondary">
                            指名料
                          </p>
                          <p className="cq-heading text-lg text-cq-accent">
                            &yen;{maestro.nominationFee.toLocaleString()}
                          </p>
                        </div>
                      ) : (
                        <span className="text-xs font-medium text-cq-success bg-cq-success/8 px-3 py-1 rounded-[var(--cq-radius-sm)] border border-cq-success/20">
                          指名料無料
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="cq-btn-secondary"
            >
              <ChevronLeft className="w-4 h-4" />
              BACK
            </button>
            <button
              type="button"
              disabled={!canProceedStep2}
              onClick={() => setStep(3)}
              className="cq-btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
            >
              NEXT
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Delivery + Confirm */}
      {step === 3 && (
        <div className="cq-flower-bg rounded-[var(--cq-radius-lg)] p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Delivery Form */}
            <div className="space-y-6">
              <h2 className="text-2xl text-cq-text font-light tracking-wide">お届け先</h2>

              <div className="space-y-4">
                <FormField
                  label="会社名"
                  value={form.companyName}
                  onChange={(v) => updateForm("companyName", v)}
                  placeholder="株式会社〇〇"
                />
                <FormField
                  label="お届け先ご担当者名"
                  value={form.recipientName}
                  onChange={(v) => updateForm("recipientName", v)}
                  placeholder="山田 太郎"
                />
                <FormField
                  label="郵便番号"
                  value={form.postalCode}
                  onChange={handlePostalCode}
                  placeholder="000-0000"
                  maxLength={8}
                />
                <FormField
                  label="ご住所"
                  value={form.address}
                  onChange={(v) => updateForm("address", v)}
                  placeholder="東京都渋谷区..."
                />
                <FormField
                  label="お届け希望日"
                  value={form.deliveryDate}
                  onChange={(v) => updateForm("deliveryDate", v)}
                  type="date"
                />
                <div>
                  <label className="block text-sm font-medium text-cq-text mb-1.5">
                    メッセージカード
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => updateForm("message", e.target.value)}
                    placeholder="心を込めたメッセージをどうぞ..."
                    maxLength={200}
                    rows={4}
                    className="w-full px-4 py-3 border border-cq-border rounded-[var(--cq-radius-md)] bg-cq-surface-raised text-cq-text text-sm placeholder:text-cq-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-cq-accent/30 focus:border-cq-accent resize-none transition-colors"
                  />
                  <p className="text-xs text-cq-text-secondary text-right mt-1">
                    {form.message.length}/200
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div>
              <h2 className="text-2xl text-cq-text font-light tracking-wide mb-6">
                ご注文内容
              </h2>
              <div className="bg-cq-surface-raised rounded-[var(--cq-radius-lg)] border border-cq-border p-6 space-y-4">
                <SummaryRow
                  label="シーン"
                  value={
                    SCENES.find((s) => s.id === selectedScene)?.label ?? ""
                  }
                />
                <SummaryRow
                  label="スタイル"
                  value={selectedStyle?.name ?? ""}
                  isBrand
                />
                <SummaryRow
                  label="マエストロ"
                  value={selectedMaestro?.stageName ?? ""}
                  isDisplay
                />
                {form.companyName && (
                  <SummaryRow label="お届け先" value={form.companyName} />
                )}
                {form.recipientName && (
                  <SummaryRow label="ご担当者" value={form.recipientName} />
                )}
                {form.deliveryDate && (
                  <SummaryRow label="お届け日" value={form.deliveryDate} />
                )}

                <div className="border-t border-cq-border pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-cq-text-secondary">商品代金</span>
                    <span className="text-cq-text">
                      &yen;{basePrice.toLocaleString()}〜
                    </span>
                  </div>
                  {nominationFee > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-cq-text-secondary">指名料</span>
                      <span className="text-cq-text">
                        &yen;{nominationFee.toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-baseline pt-3 border-t border-cq-border-subtle">
                    <span className="text-sm text-cq-text-secondary">
                      合計（税込）
                    </span>
                    <span className="text-2xl font-light text-cq-accent tracking-wide">
                      &yen;{totalPrice.toLocaleString()}〜
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                  className="cq-btn-primary w-full justify-center mt-4 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      PROCESSING...
                    </>
                  ) : (
                    "CONFIRM ORDER"
                  )}
                </button>
              </div>

              {/* Back button */}
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex items-center gap-2 mt-4 text-sm text-cq-text-secondary hover:text-cq-text transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                マエストロ選択に戻る
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Sub-components

function StyleCard({
  style,
  isSelected,
  onSelect,
}: {
  style: FlowerStyle;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative overflow-hidden rounded-[var(--cq-radius-lg)] border-2 transition-all text-left cursor-pointer ${
        isSelected
          ? "border-cq-accent shadow-lg ring-2 ring-cq-accent/20"
          : "border-cq-border hover:border-cq-accent/40 hover:shadow-md"
      }`}
    >
      {/* Flower Image */}
      <div className="relative h-36 sm:h-40 overflow-hidden">
        <img
          src={style.imageUrl}
          alt={style.imageAlt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Style name on image */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <div className="flex items-center gap-2">
            <span className="cq-brand-text text-base text-white drop-shadow-md">
              {style.name}
            </span>
            {style.tier === "NOMINATION" && (
              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-cq-accent/90 text-cq-primary rounded-[var(--cq-radius-sm)] tracking-wider">
                指名限定
              </span>
            )}
          </div>
        </div>

        {/* Selected checkmark */}
        {isSelected && (
          <div className="absolute top-2.5 right-2.5 w-7 h-7 bg-cq-accent rounded-[var(--cq-radius-sm)] flex items-center justify-center shadow-lg">
            <Check className="w-4 h-4 text-white" />
          </div>
        )}
      </div>

      {/* Description */}
      <div className="p-3 bg-cq-surface-raised">
        <p className="text-xs text-cq-text-secondary leading-relaxed line-clamp-2">
          {style.description}
        </p>
      </div>
    </button>
  );
}

function FormField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  maxLength?: number;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-cq-text mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className="w-full px-4 py-3 border border-cq-border rounded-[var(--cq-radius-md)] bg-cq-surface-raised text-cq-text text-sm placeholder:text-cq-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-cq-accent/30 focus:border-cq-accent transition-colors"
      />
    </div>
  );
}

function SummaryRow({
  label,
  value,
  isBrand,
  isDisplay,
}: {
  label: string;
  value: string;
  isBrand?: boolean;
  isDisplay?: boolean;
}) {
  return (
    <div className="flex justify-between items-baseline">
      <span className="text-sm text-cq-text-secondary">{label}</span>
      <span
        className={`text-sm text-cq-text ${isBrand ? "cq-brand-text" : ""} ${isDisplay ? "cq-heading-display" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}
