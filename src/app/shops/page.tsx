import ShopFinder from "@/components/store/ShopFinder";

export default function ShopsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-14">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[var(--cq-radius-lg)] min-h-[200px] md:min-h-[240px]">
        <img
          src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=1200&h=400&fit=crop&q=80&crop=center"
          alt="店舗・アトリエ"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cq-primary/30 to-cq-primary/80" />
        <div className="relative flex flex-col justify-end gap-3 p-8 md:p-12 h-full min-h-[200px] md:min-h-[240px]">
          <p className="cq-brand-text text-xs text-white/80 tracking-[0.25em]">
            FIND A SHOP
          </p>
          <h1 className="text-2xl md:text-3xl text-white leading-tight font-light tracking-wide">
            店舗・アトリエを探す
          </h1>
          <p className="text-white/70 text-sm max-w-lg font-light">
            マエストロの作品を直接ご覧いただけるショップ＆アトリエ。お近くの店舗や、ご希望の条件でお探しいただけます。
          </p>
        </div>
      </section>

      <ShopFinder hideHeader />
    </div>
  );
}
