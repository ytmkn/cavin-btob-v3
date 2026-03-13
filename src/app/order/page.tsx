"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Loader2,
  ArrowLeft,
  Flower2,
} from "lucide-react";
import { SCENES, STYLES, BUDGET_RANGES, MAESTROS } from "@/lib/mock-data";
import type { Maestro, FlowerStyle } from "@/lib/mock-data";

// Step definitions
const STEPS = [
  { id: 1, label: "シーンとスタイル" },
  { id: 2, label: "マエストロ" },
  { id: 3, label: "お届け先とご確認" },
] as const;

// Scene images for visual selection
const SCENE_IMAGES: Record<string, string> = {
  inauguration: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400&h=300&fit=crop&q=80",
  ipo: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400&h=300&fit=crop&q=80",
  opening: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=400&h=300&fit=crop&q=80",
  relocation: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400&h=300&fit=crop&q=80",
  gratitude: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&h=300&fit=crop&q=80",
  condolence: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop&q=80",
  birthday: "https://images.unsplash.com/photo-1457089328109-e5d9bd499191?w=400&h=300&fit=crop&q=80",
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
      const digits = value.replace(/\D/g, "");
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
      <div className="max-w-2xl mx-auto py-20 text-center space-y-8">
        <div className="mx-auto w-16 h-16 flex items-center justify-center">
          <Flower2 className="w-10 h-10 text-cq-accent" />
        </div>
        <div className="space-y-3">
          <p className="text-[10px] tracking-[0.3em] uppercase text-cq-accent/80">
            ORDER CONFIRMED
          </p>
          <h1 className="cq-heading-display text-3xl text-cq-text font-light tracking-wide">
            ご注文ありがとうございます
          </h1>
          <p className="text-cq-text-secondary/70 text-sm font-light max-w-sm mx-auto leading-relaxed">
            マエストロが心を込めてお仕立ていたします。
            準備が整いましたらメールでお知らせします。
          </p>
        </div>
        <div className="cq-kintsugi max-w-xs mx-auto" />
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
          <button
            onClick={handleReset}
            className="text-xs tracking-[0.15em] uppercase text-cq-accent hover:text-cq-accent-light transition-colors flex items-center gap-1.5"
          >
            もう一度贈る
            <ChevronRight className="w-3 h-3" />
          </button>
          <span className="w-[1px] h-4 bg-cq-border/30 hidden sm:block" />
          <Link
            href="/"
            className="text-xs tracking-[0.15em] uppercase text-cq-text-secondary/50 hover:text-cq-text transition-colors"
          >
            ホームに戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Step Indicator — minimal, text-based */}
      <div className="flex items-center justify-center gap-0 px-4">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center">
            <div className="flex items-center gap-2">
              <span
                className={`text-[11px] tracking-[0.1em] transition-colors ${
                  step >= s.id
                    ? "text-cq-text"
                    : "text-cq-text-secondary/40"
                }`}
              >
                {step > s.id ? (
                  <Check className="w-3.5 h-3.5 text-cq-accent inline-block" />
                ) : (
                  <span className="text-cq-accent/60">{s.id}</span>
                )}
              </span>
              <span
                className={`text-[11px] tracking-[0.1em] hidden sm:inline ${
                  step >= s.id ? "text-cq-text" : "text-cq-text-secondary/40"
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`w-12 sm:w-20 h-[0.5px] mx-4 ${
                  step > s.id ? "bg-cq-accent/60" : "bg-cq-border/30"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Scene & Style */}
      {step === 1 && (
        <div className="space-y-14">
          {/* Scene Selection — visual cards */}
          <section>
            <p className="text-[10px] tracking-[0.3em] uppercase text-cq-accent/80 mb-2">
              SCENE
            </p>
            <h2 className="cq-heading-display text-2xl text-cq-text font-light tracking-wide mb-3">
              贈る場面をお選びください
            </h2>
            <p className="text-xs text-cq-text-secondary/60 mb-8">
              シーンに合わせて最適なスタイルをご提案します
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {SCENES.map((scene) => {
                const isSelected = selectedScene === scene.id;
                const imageUrl = SCENE_IMAGES[scene.id] || SCENE_IMAGES.inauguration;
                return (
                  <button
                    key={scene.id}
                    type="button"
                    onClick={() => {
                      setSelectedScene(scene.id);
                      setSelectedStyle(null);
                    }}
                    className={`relative h-[120px] sm:h-[140px] rounded-[var(--cq-radius-md)] overflow-hidden group cursor-pointer transition-all ${
                      isSelected
                        ? "ring-2 ring-cq-accent ring-offset-2 ring-offset-cq-surface"
                        : ""
                    }`}
                  >
                    <img
                      src={imageUrl}
                      alt={scene.label}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className={`absolute inset-0 transition-colors ${
                      isSelected ? "bg-black/20" : "bg-black/30 group-hover:bg-black/40"
                    }`} />
                    <div className="relative flex flex-col justify-end h-full p-4">
                      <p className="text-sm text-white font-medium drop-shadow-md">
                        {scene.label}
                      </p>
                    </div>
                    {isSelected && (
                      <div className="absolute top-2.5 right-2.5 w-6 h-6 bg-cq-accent rounded-[var(--cq-radius-sm)] flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Style Selection */}
          {selectedScene && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <p className="text-[10px] tracking-[0.3em] uppercase text-cq-accent/80 mb-2">
                STYLE
              </p>
              <h3 className="cq-heading-display text-xl text-cq-text font-light tracking-wide mb-8">
                スタイルを選ぶ
              </h3>

              {/* Recommended styles */}
              {recommendedStyles.length > 0 && (
                <div className="mb-8">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-cq-accent/60 mb-4">
                    おすすめスタイル
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  <p className="text-[10px] tracking-[0.15em] uppercase text-cq-text-secondary/40 mb-4">
                    その他のスタイル
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <div className="mt-14 animate-in fade-in duration-200">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-cq-accent/80 mb-2">
                    BUDGET
                  </p>
                  <h3 className="cq-heading-display text-xl text-cq-text font-light tracking-wide mb-8">
                    ご予算
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {BUDGET_RANGES.map((budget) => (
                      <button
                        key={budget.id}
                        type="button"
                        onClick={() => setSelectedBudget(budget.id)}
                        className={`px-6 py-3 text-sm font-light tracking-wide border transition-all cursor-pointer rounded-[var(--cq-radius-md)] ${
                          selectedBudget === budget.id
                            ? "border-cq-accent text-cq-accent bg-cq-accent/5"
                            : "border-cq-border/30 text-cq-text-secondary hover:border-cq-accent/30 hover:text-cq-text"
                        }`}
                      >
                        {budget.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Next button */}
          <div className="flex justify-end pt-4">
            <button
              type="button"
              disabled={!canProceedStep1}
              onClick={() => setStep(2)}
              className="text-xs tracking-[0.15em] uppercase text-cq-accent hover:text-cq-accent-light transition-colors flex items-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              次へ
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Maestro */}
      {step === 2 && (
        <div className="space-y-14">
          <section>
            <p className="text-[10px] tracking-[0.3em] uppercase text-cq-accent/80 mb-2">
              MAESTRO
            </p>
            <h2 className="cq-heading-display text-2xl text-cq-text font-light tracking-wide mb-3">
              あなたの花を仕立てるマエストロ
            </h2>
            <p className="text-xs text-cq-text-secondary/60 mb-10">
              選ばれた職人が、一つひとつ心を込めてお作りします
            </p>

            <div className="space-y-6">
              {MAESTROS.map((maestro) => {
                const isSelected = selectedMaestro?.id === maestro.id;
                return (
                  <button
                    key={maestro.id}
                    type="button"
                    onClick={() => setSelectedMaestro(maestro)}
                    className={`w-full text-left transition-all cursor-pointer ${
                      isSelected
                        ? "bg-cq-accent/[0.03]"
                        : "hover:bg-cq-surface-raised/50"
                    } py-8 -mx-4 px-4 rounded-[var(--cq-radius-md)]`}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-8 items-start">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="cq-heading-display text-2xl text-cq-text tracking-wide">
                            {maestro.stageName}
                          </h3>
                          {isSelected && (
                            <Check className="w-4 h-4 text-cq-accent" />
                          )}
                        </div>
                        <p className="text-[10px] tracking-[0.15em] uppercase text-cq-text-secondary/50 mt-1">
                          {maestro.location}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-cq-text-secondary leading-relaxed mb-4">
                          {maestro.description}
                        </p>
                        <div className="flex items-center gap-6">
                          <span className="text-[10px] text-cq-text-secondary/40">
                            {maestro.specialties.join(" / ")}
                          </span>
                          {maestro.nominationFee > 0 ? (
                            <span className="text-xs text-cq-text-secondary/50">
                              指名料 <span className="text-cq-accent font-light">&yen;{maestro.nominationFee.toLocaleString()}</span>
                            </span>
                          ) : (
                            <span className="text-xs text-cq-text-secondary/50">
                              指名料無料
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* Kintsugi divider between items */}
                    <div className="cq-kintsugi mt-8" />
                  </button>
                );
              })}
            </div>
          </section>

          {/* Navigation */}
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs tracking-[0.15em] uppercase text-cq-text-secondary/50 hover:text-cq-text transition-colors flex items-center gap-1.5"
            >
              <ChevronLeft className="w-3 h-3" />
              戻る
            </button>
            <button
              type="button"
              disabled={!canProceedStep2}
              onClick={() => setStep(3)}
              className="text-xs tracking-[0.15em] uppercase text-cq-accent hover:text-cq-accent-light transition-colors flex items-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              次へ
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Delivery + Confirm */}
      {step === 3 && (
        <div className="space-y-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            {/* Left: Delivery Form */}
            <section>
              <p className="text-[10px] tracking-[0.3em] uppercase text-cq-accent/80 mb-2">
                DELIVERY
              </p>
              <h2 className="cq-heading-display text-2xl text-cq-text font-light tracking-wide mb-8">
                お届け先
              </h2>

              <div className="space-y-5">
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
                  <label className="block text-[11px] tracking-[0.1em] text-cq-text-secondary/60 mb-2">
                    メッセージカード
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => updateForm("message", e.target.value)}
                    placeholder="心を込めたメッセージをどうぞ..."
                    maxLength={200}
                    rows={4}
                    className="w-full px-4 py-3 border border-cq-border/30 rounded-[var(--cq-radius-md)] bg-transparent text-cq-text text-sm placeholder:text-cq-text-secondary/30 focus:outline-none focus:border-cq-accent/40 resize-none transition-colors"
                  />
                  <p className="text-[10px] text-cq-text-secondary/30 text-right mt-1">
                    {form.message.length}/200
                  </p>
                </div>
              </div>
            </section>

            {/* Right: Order Summary */}
            <section>
              <p className="text-[10px] tracking-[0.3em] uppercase text-cq-accent/80 mb-2">
                SUMMARY
              </p>
              <h2 className="cq-heading-display text-2xl text-cq-text font-light tracking-wide mb-8">
                ご注文内容
              </h2>
              <div className="space-y-5">
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

                <div className="cq-kintsugi" />

                <div className="space-y-3 pt-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-cq-text-secondary/60">商品代金</span>
                    <span className="text-cq-text font-light">
                      &yen;{basePrice.toLocaleString()}〜
                    </span>
                  </div>
                  {nominationFee > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-cq-text-secondary/60">指名料</span>
                      <span className="text-cq-text font-light">
                        &yen;{nominationFee.toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-baseline pt-4">
                    <span className="text-[11px] tracking-[0.1em] text-cq-text-secondary/50">
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
                  className="w-full mt-6 py-4 text-xs tracking-[0.2em] uppercase text-center border border-cq-accent text-cq-accent hover:bg-cq-accent hover:text-white transition-all rounded-[var(--cq-radius-md)] disabled:opacity-40"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      お仕立ての準備をしています...
                    </span>
                  ) : (
                    "ご注文を確定する"
                  )}
                </button>
              </div>

              {/* Back button */}
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex items-center gap-2 mt-6 text-xs text-cq-text-secondary/50 hover:text-cq-text transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3 h-3" />
                マエストロ選択に戻る
              </button>
            </section>
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
      className={`group relative overflow-hidden rounded-[var(--cq-radius-md)] transition-all text-left cursor-pointer ${
        isSelected
          ? "ring-2 ring-cq-accent ring-offset-2 ring-offset-cq-surface"
          : "hover:opacity-90"
      }`}
    >
      <div className="relative h-36 sm:h-44 overflow-hidden">
        <img
          src={style.imageUrl}
          alt={style.imageAlt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-2">
            <span className="cq-heading-display text-base text-white tracking-wide drop-shadow-md">
              {style.name}
            </span>
            {style.tier === "NOMINATION" && (
              <span className="text-[9px] tracking-[0.1em] uppercase text-white/60">
                指名限定
              </span>
            )}
          </div>
        </div>
        {isSelected && (
          <div className="absolute top-3 right-3 w-6 h-6 bg-cq-accent rounded-[var(--cq-radius-sm)] flex items-center justify-center">
            <Check className="w-3.5 h-3.5 text-white" />
          </div>
        )}
      </div>
      <div className="py-3">
        <p className="text-xs text-cq-text-secondary/60 leading-relaxed line-clamp-2">
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
      <label className="block text-[11px] tracking-[0.1em] text-cq-text-secondary/60 mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className="w-full px-4 py-3 border border-cq-border/30 rounded-[var(--cq-radius-md)] bg-transparent text-cq-text text-sm placeholder:text-cq-text-secondary/30 focus:outline-none focus:border-cq-accent/40 transition-colors"
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
    <div className="flex justify-between items-baseline py-2 border-b border-cq-border/10">
      <span className="text-[11px] tracking-[0.1em] text-cq-text-secondary/50">{label}</span>
      <span
        className={`text-sm text-cq-text ${isBrand ? "cq-brand-text" : ""} ${isDisplay ? "cq-heading-display" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}
