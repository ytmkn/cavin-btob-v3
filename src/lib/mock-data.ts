// Mock data for CAQUEHIN for Business

export type MaestroRank = "S-RANK" | "A-RANK" | "DEBUT";

export interface Maestro {
  id: string;
  stageName: string;
  rank: MaestroRank;
  nominationFee: number;
  perfectionRate: number;
  totalWorks: number;
  location: string;
  specialties: string[];
  description: string;
}

export interface FlowerStyle {
  id: string;
  name: string;
  description: string;
  colorHint: string;
  tier: "STANDARD" | "NOMINATION";
  imageUrl: string;
  imageAlt: string;
}

export interface Order {
  id: string;
  orderCode: string;
  scene: string;
  styleName: string;
  maestroName: string;
  maestroRank: MaestroRank;
  recipientName: string;
  recipientCompany: string;
  deliveryDate: string;
  totalAmount: number;
  status: "preparing" | "in_transit" | "delivered" | "completed";
  orderedBy: string;
  orderedAt: string;
  message?: string;
}

export interface Employee {
  id: string;
  name: string;
  department: string;
  birthday: string;
  autoOrder: boolean;
  stylePref?: string;
  budget?: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  period: string;
  totalAmount: number;
  orderCount: number;
  status: "issued" | "paid" | "overdue";
  issuedAt: string;
  dueDate: string;
}

export const SCENES = [
  { id: "inauguration", label: "就任祝い", icon: "Crown", recommendedStyles: ["LUMINOUS", "ETHEREAL"] },
  { id: "ipo", label: "上場・IPO祝い", icon: "TrendingUp", recommendedStyles: ["LUMINOUS", "SAVAGE"] },
  { id: "opening", label: "開業・開店祝い", icon: "Store", recommendedStyles: ["LUMINOUS", "ETHEREAL", "SAVAGE"] },
  { id: "relocation", label: "移転祝い", icon: "Building2", recommendedStyles: ["ETHEREAL", "LUMINOUS"] },
  { id: "gratitude", label: "感謝・御礼", icon: "Heart", recommendedStyles: ["ETHEREAL", "LUMINOUS"] },
  { id: "condolence", label: "お悔やみ・弔事", icon: "Flower2", recommendedStyles: ["ETHEREAL"] },
  { id: "birthday", label: "社員誕生日", icon: "Cake", recommendedStyles: ["LUMINOUS", "ETHEREAL"] },
] as const;

export const BUDGET_RANGES = [
  { id: "5k-10k", label: "¥5,000〜¥10,000", min: 5000, max: 10000 },
  { id: "10k-20k", label: "¥10,000〜¥20,000", min: 10000, max: 20000 },
  { id: "20k-50k", label: "¥20,000〜¥50,000", min: 20000, max: 50000 },
] as const;

export const STYLES: FlowerStyle[] = [
  { id: "luminous", name: "LUMINOUS", description: "光と透明感の構成。祝福の場にふさわしい華やかさ", colorHint: "#F5E6CC", tier: "STANDARD", imageUrl: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400&h=300&fit=crop&q=80", imageAlt: "明るく透明感のある白とゴールドのフラワーアレンジメント" },
  { id: "ethereal", name: "ETHEREAL", description: "淡い色彩の階調。上品さと静謐さを兼ね備える", colorHint: "#E8E0F0", tier: "STANDARD", imageUrl: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400&h=300&fit=crop&q=80", imageAlt: "淡いラベンダーとホワイトの繊細なフラワーアレンジメント" },
  { id: "savage", name: "SAVAGE", description: "野性と暴力的な美。力強い印象を残したい場面に", colorHint: "#D4524D", tier: "STANDARD", imageUrl: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=400&h=300&fit=crop&q=80", imageAlt: "深紅のバラとダークリーフの力強いアレンジメント" },
  { id: "monolith", name: "MONOLITH", description: "黒による絶対的支配。最も格調高い表現", colorHint: "#2A2A2A", tier: "NOMINATION", imageUrl: "https://images.unsplash.com/photo-1457089328109-e5d9bd499191?w=400&h=300&fit=crop&q=80", imageAlt: "ダークトーンの格調高いモノクロームアレンジメント" },
  { id: "classic", name: "CLASSIC", description: "時代を超える正統な美しさ", colorHint: "#C9B896", tier: "STANDARD", imageUrl: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400&h=300&fit=crop&q=80", imageAlt: "バラとユリの正統派フラワーアレンジメント" },
];

export const MAESTROS: Maestro[] = [
  {
    id: "m1", stageName: "L'AMOUR", rank: "S-RANK",
    nominationFee: 11000, perfectionRate: 99.8, totalWorks: 1240,
    location: "表参道", specialties: ["LUMINOUS", "MONOLITH"],
    description: "光と影の絶対的なコントラストを操り、空間を支配する構成を得意とする。妥協を許さない完璧主義者。",
  },
  {
    id: "m2", stageName: "BOTANICA", rank: "A-RANK",
    nominationFee: 8000, perfectionRate: 98.5, totalWorks: 890,
    location: "銀座", specialties: ["ETHEREAL", "CLASSIC"],
    description: "繊細な色彩の重なりで空気をデザインする。法人ギフトでの指名率No.1。",
  },
  {
    id: "m3", stageName: "STUDIO NOUVEAU", rank: "DEBUT",
    nominationFee: 0, perfectionRate: 96.2, totalWorks: 120,
    location: "代官山", specialties: ["SAVAGE", "LUMINOUS"],
    description: "既成概念を覆す大胆な構成。監査期間中。あなたの評価が昇格を決定します。",
  },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: "o1", orderCode: "CQB-2401", scene: "就任祝い", styleName: "LUMINOUS",
    maestroName: "L'AMOUR", maestroRank: "S-RANK",
    recipientName: "佐藤 健一", recipientCompany: "株式会社テックフォース",
    deliveryDate: "2026-03-15", totalAmount: 35200,
    status: "in_transit", orderedBy: "山下 美智子", orderedAt: "2026-03-13",
    message: "新たなお立場でのご活躍を心よりお祈り申し上げます。",
  },
  {
    id: "o2", orderCode: "CQB-2402", scene: "上場祝い", styleName: "SAVAGE",
    maestroName: "BOTANICA", maestroRank: "A-RANK",
    recipientName: "高橋 裕子", recipientCompany: "グロースキャピタル株式会社",
    deliveryDate: "2026-03-18", totalAmount: 48500,
    status: "preparing", orderedBy: "田中 拓也", orderedAt: "2026-03-13",
  },
  {
    id: "o3", orderCode: "CQB-2398", scene: "感謝・御礼", styleName: "ETHEREAL",
    maestroName: "L'AMOUR", maestroRank: "S-RANK",
    recipientName: "鈴木 一郎", recipientCompany: "鈴木法律事務所",
    deliveryDate: "2026-03-10", totalAmount: 22000,
    status: "delivered", orderedBy: "山下 美智子", orderedAt: "2026-03-08",
  },
  {
    id: "o4", orderCode: "CQB-2395", scene: "社員誕生日", styleName: "LUMINOUS",
    maestroName: "STUDIO NOUVEAU", maestroRank: "DEBUT",
    recipientName: "伊藤 さくら", recipientCompany: "（自社）",
    deliveryDate: "2026-03-05", totalAmount: 8500,
    status: "completed", orderedBy: "山下 美智子", orderedAt: "2026-03-03",
  },
];

export const MOCK_EMPLOYEES: Employee[] = [
  { id: "e1", name: "伊藤 さくら", department: "エンジニアリング", birthday: "03-05", autoOrder: true, stylePref: "LUMINOUS", budget: 8000 },
  { id: "e2", name: "佐々木 翔", department: "マーケティング", birthday: "03-22", autoOrder: true, stylePref: "ETHEREAL", budget: 8000 },
  { id: "e3", name: "中村 恵", department: "デザイン", birthday: "04-10", autoOrder: false },
  { id: "e4", name: "渡辺 大輔", department: "セールス", birthday: "04-18", autoOrder: true, stylePref: "SAVAGE", budget: 8000 },
  { id: "e5", name: "小林 真由", department: "HR", birthday: "05-02", autoOrder: false },
  { id: "e6", name: "加藤 翼", department: "エンジニアリング", birthday: "06-15", autoOrder: true, stylePref: "LUMINOUS", budget: 8000 },
];

export const MOCK_INVOICES: Invoice[] = [
  { id: "i1", invoiceNumber: "INV-2026-03", period: "2026年3月", totalAmount: 114200, orderCount: 4, status: "issued", issuedAt: "2026-04-01", dueDate: "2026-04-30" },
  { id: "i2", invoiceNumber: "INV-2026-02", period: "2026年2月", totalAmount: 87500, orderCount: 3, status: "paid", issuedAt: "2026-03-01", dueDate: "2026-03-31" },
  { id: "i3", invoiceNumber: "INV-2026-01", period: "2026年1月", totalAmount: 156800, orderCount: 6, status: "paid", issuedAt: "2026-02-01", dueDate: "2026-02-28" },
];

// --- EC Catalog Data ---

export interface FlowerProduct {
  id: string;
  name: string;
  nameEn: string;
  styleName: string;
  maestroName: string;
  maestroRank: MaestroRank;
  priceRange: string;
  minPrice: number;
  description: string;
  colorHint: string;
  imageUrl: string;
  tags: string[];
  scene: string[];
  season: string[];
  isRecommended: boolean;
  isNew: boolean;
  popularity: number; // 1-100
}

export interface SeasonalCollection {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  colorFrom: string;
  colorTo: string;
  products: string[]; // product IDs
}

export const FLOWER_PRODUCTS: FlowerProduct[] = [
  {
    id: "fp1", name: "光の祝福", nameEn: "Celebration of Light",
    styleName: "LUMINOUS", maestroName: "L'AMOUR", maestroRank: "S-RANK",
    priceRange: "¥20,000〜¥35,000", minPrice: 20000,
    description: "陽光を閉じ込めたような透明感のあるアレンジメント。就任・上場など華やかなお祝いの席に。",
    colorHint: "#F5E6CC", imageUrl: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600&h=400&fit=crop&q=80",
    tags: ["祝い", "華やか", "上品"],
    scene: ["inauguration", "ipo", "opening"], season: ["spring", "all"],
    isRecommended: true, isNew: false, popularity: 95
  },
  {
    id: "fp2", name: "静寂の庭", nameEn: "Garden of Serenity",
    styleName: "ETHEREAL", maestroName: "BOTANICA", maestroRank: "A-RANK",
    priceRange: "¥15,000〜¥30,000", minPrice: 15000,
    description: "淡いラベンダーとホワイトの階調が織りなす静謐な空間。感謝や御礼の気持ちを品よく伝えます。",
    colorHint: "#E8E0F0", imageUrl: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=600&h=400&fit=crop&q=80",
    tags: ["上品", "静謐", "感謝"],
    scene: ["gratitude", "relocation"], season: ["spring", "summer"],
    isRecommended: true, isNew: false, popularity: 88
  },
  {
    id: "fp3", name: "炎の鼓動", nameEn: "Pulse of Flame",
    styleName: "SAVAGE", maestroName: "STUDIO NOUVEAU", maestroRank: "DEBUT",
    priceRange: "¥15,000〜¥30,000", minPrice: 15000,
    description: "赤と深紅のダイナミックな構成。新規事業の立ち上げや力強いメッセージを込めたい場面に。",
    colorHint: "#D4524D", imageUrl: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=600&h=400&fit=crop&q=80",
    tags: ["力強い", "情熱", "インパクト"],
    scene: ["ipo", "opening"], season: ["autumn", "all"],
    isRecommended: false, isNew: true, popularity: 76
  },
  {
    id: "fp4", name: "墨の支配", nameEn: "Reign of Ink",
    styleName: "MONOLITH", maestroName: "L'AMOUR", maestroRank: "S-RANK",
    priceRange: "¥35,000〜¥50,000", minPrice: 35000,
    description: "黒を基調とした最も格調高い表現。特別な方への最高の敬意を形にします。S-RANK指名限定。",
    colorHint: "#2A2A2A", imageUrl: "https://images.unsplash.com/photo-1457089328109-e5d9bd499191?w=600&h=400&fit=crop&q=80",
    tags: ["格調", "最高級", "指名限定"],
    scene: ["inauguration", "gratitude"], season: ["all"],
    isRecommended: true, isNew: false, popularity: 92
  },
  {
    id: "fp5", name: "春風のブーケ", nameEn: "Spring Breeze Bouquet",
    styleName: "LUMINOUS", maestroName: "BOTANICA", maestroRank: "A-RANK",
    priceRange: "¥8,000〜¥15,000", minPrice: 8000,
    description: "チューリップとスイートピーが踊る春限定のブーケ。社員のお誕生日やカジュアルなお祝いに。",
    colorHint: "#FFE4E1", imageUrl: "https://images.unsplash.com/photo-1457089328109-e5d9bd499191?w=600&h=400&fit=crop&q=80&crop=top",
    tags: ["春", "カジュアル", "誕生日"],
    scene: ["birthday"], season: ["spring"],
    isRecommended: true, isNew: true, popularity: 84
  },
  {
    id: "fp6", name: "永遠の調べ", nameEn: "Eternal Harmony",
    styleName: "CLASSIC", maestroName: "BOTANICA", maestroRank: "A-RANK",
    priceRange: "¥20,000〜¥35,000", minPrice: 20000,
    description: "時代を超える正統な美しさ。バラとユリを中心とした王道のフラワーギフト。",
    colorHint: "#C9B896", imageUrl: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&h=400&fit=crop&q=80",
    tags: ["正統", "王道", "安心"],
    scene: ["inauguration", "gratitude", "relocation"], season: ["all"],
    isRecommended: false, isNew: false, popularity: 80
  },
  {
    id: "fp7", name: "哀悼の白", nameEn: "White Condolence",
    styleName: "ETHEREAL", maestroName: "BOTANICA", maestroRank: "A-RANK",
    priceRange: "¥15,000〜¥30,000", minPrice: 15000,
    description: "白と淡いグリーンで構成された弔事専用アレンジメント。心からのお悔やみの気持ちを伝えます。",
    colorHint: "#F0F0F0", imageUrl: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=600&h=400&fit=crop&q=80",
    tags: ["弔事", "白", "静謐"],
    scene: ["condolence"], season: ["all"],
    isRecommended: false, isNew: false, popularity: 70
  },
  {
    id: "fp8", name: "新緑のオフィスグリーン", nameEn: "Fresh Office Green",
    styleName: "LUMINOUS", maestroName: "STUDIO NOUVEAU", maestroRank: "DEBUT",
    priceRange: "¥5,000〜¥10,000", minPrice: 5000,
    description: "オフィスに彩りを添える観葉植物×切り花のミックスアレンジ。定期注文にもおすすめ。",
    colorHint: "#90C5A9", imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop&q=80",
    tags: ["オフィス", "グリーン", "定期"],
    scene: ["birthday", "opening"], season: ["spring", "summer"],
    isRecommended: true, isNew: true, popularity: 72
  },
];

export const SEASONAL_COLLECTIONS: SeasonalCollection[] = [
  {
    id: "sc1", title: "春の花束コレクション", titleEn: "SPRING COLLECTION",
    description: "桜・チューリップ・スイートピーなど、春ならではの花材を使った限定コレクション",
    colorFrom: "#FDF2F8", colorTo: "#F0FDF4",
    products: ["fp5", "fp1", "fp2"]
  },
  {
    id: "sc2", title: "新年度のお祝いに", titleEn: "NEW YEAR CELEBRATION",
    description: "就任・異動・開業など、新たな門出を彩るフラワーギフト",
    colorFrom: "#FEF9C3", colorTo: "#F0FDF4",
    products: ["fp1", "fp4", "fp6"]
  },
];

// --- Shop / Atelier Data ---

export interface Shop {
  id: string;
  name: string;
  nameEn: string;
  area: string;
  address: string;
  hours: string;
  closed: string;
  phone: string;
  maestros: string[];
  specialStyles: string[];
  description: string;
  imageUrl: string;
  features: string[];
  isAtelier: boolean;
}

export const SHOPS: Shop[] = [
  {
    id: "s1", name: "表参道本店", nameEn: "OMOTESANDO FLAGSHIP",
    area: "東京・表参道", address: "東京都港区南青山5-12-3 1F",
    hours: "10:00〜19:00", closed: "火曜定休", phone: "03-6721-XXXX",
    maestros: ["L'AMOUR"], specialStyles: ["LUMINOUS", "MONOLITH"],
    description: "CAQUEHINの世界観を体現するフラッグシップ。L'AMOURの作品を間近でご覧いただけます。法人様専用サロンを完備。",
    imageUrl: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600&h=400&fit=crop&q=80&crop=center",
    features: ["法人サロン", "打ち合わせ可", "駐車場有"],
    isAtelier: false,
  },
  {
    id: "s2", name: "銀座サロン", nameEn: "GINZA SALON",
    area: "東京・銀座", address: "東京都中央区銀座6-8-15 2F",
    hours: "11:00〜20:00", closed: "水曜定休", phone: "03-6228-XXXX",
    maestros: ["BOTANICA"], specialStyles: ["ETHEREAL", "CLASSIC"],
    description: "BOTANICAが在籍するインティメートなサロン。繊細な色彩の世界を体験できる完全予約制のプライベート空間。",
    imageUrl: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=600&h=400&fit=crop&q=80&crop=center",
    features: ["完全予約制", "プライベート空間", "ギフト包装"],
    isAtelier: false,
  },
  {
    id: "s3", name: "代官山アトリエ", nameEn: "DAIKANYAMA ATELIER",
    area: "東京・代官山", address: "東京都渋谷区猿楽町18-5 B1F",
    hours: "12:00〜18:00", closed: "月・火曜定休", phone: "03-6455-XXXX",
    maestros: ["STUDIO NOUVEAU"], specialStyles: ["SAVAGE", "LUMINOUS"],
    description: "STUDIO NOUVEAUの創作拠点。既成概念を覆すアレンジメントが生まれる実験的空間。ワークショップも不定期開催。",
    imageUrl: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=600&h=400&fit=crop&q=80&crop=center",
    features: ["アトリエ見学可", "ワークショップ", "若手支援"],
    isAtelier: true,
  },
  {
    id: "s4", name: "丸の内ビジネスラウンジ", nameEn: "MARUNOUCHI BUSINESS LOUNGE",
    area: "東京・丸の内", address: "東京都千代田区丸の内2-4-1 丸ビル3F",
    hours: "9:00〜18:00", closed: "土日祝定休", phone: "03-5220-XXXX",
    maestros: ["L'AMOUR", "BOTANICA"], specialStyles: ["LUMINOUS", "CLASSIC"],
    description: "法人様専用のビジネスラウンジ。大口注文のご相談、定期契約のお打ち合わせに最適なロケーション。",
    imageUrl: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&h=400&fit=crop&q=80&crop=center",
    features: ["法人専用", "大口相談", "定期契約"],
    isAtelier: false,
  },
  {
    id: "s5", name: "京都祇園", nameEn: "KYOTO GION",
    area: "京都・祇園", address: "京都府京都市東山区祇園町南側570-8",
    hours: "10:00〜18:00", closed: "水曜定休", phone: "075-531-XXXX",
    maestros: [], specialStyles: ["ETHEREAL", "CLASSIC"],
    description: "京都の伝統美とCAQUEHINの美学が融合する唯一の関西拠点。茶室をリノベーションした趣のある空間。",
    imageUrl: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=600&h=400&fit=crop&q=80&crop=center",
    features: ["関西唯一", "茶室空間", "和の花材"],
    isAtelier: false,
  },
];

export const PRICE_RANGES = [
  { id: "casual", label: "カジュアル", range: "¥5,000〜¥10,000", description: "社員誕生日・ちょっとした感謝に" },
  { id: "standard", label: "スタンダード", range: "¥15,000〜¥30,000", description: "取引先へのお祝い・御礼に" },
  { id: "premium", label: "プレミアム", range: "¥30,000〜¥50,000", description: "特別なお祝い・最高の敬意を込めて" },
] as const;
