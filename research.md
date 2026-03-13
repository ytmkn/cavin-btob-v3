# toCデザインシステム調査結果

## カラーパレット比較

| トークン | toC（CAQUEHIN iOS） | BtoB（現在） | 差異 |
|---|---|---|---|
| Primary | `#0A0A0A`（ほぼ黒） | `#2D5F4A`（フォレストグリーン） | **完全に別系統** |
| Primary Light | `#1A1A1A` | `#3A7A5E` | 別系統 |
| Accent | `#C4A265`（ゴールド） | `#C4956A`（アンティークゴールド） | 近いが色相ずれ |
| Surface | `#F5F2ED` | `#F7F5F2` | 近い |
| Surface Raised | (白系) | `#FFFFFF` | 同系 |
| Text | `#0A0A0A` | `#2C2C2C` | やや異なる |
| Text Secondary | `#6B6B6B` | `#7A7A7A` | 近い |
| Success | `#2D5A3D` | `#3A8F6A` | 近い |
| Error | `#8B2500` | `#C44751` | 異なる |
| Border | `rgba(0,0,0,0.04)` | `#E8E4DF` | 表現方法が異なる |

## 角丸（PARIAN ARRIS）

toCは最大4px。BtoBは6-16pxで一般的なUI。

| トークン | toC | BtoB（現在） |
|---|---|---|
| sharp | `1px` | — |
| subtle | `2px` | `6px` (sm) |
| standard | `4px` | `8px` (md) |
| — | — | `12px` (lg) |
| — | — | `16px` (xl) |

## タイポグラフィ

### toCのフォント体系
- 基本: SF Pro（iOS系統）
- overline: 11px / weight 500 / tracking 2px / UPPERCASE / color #6B6B6B
- ブランドロゴ「CAQUEHIN」: 12px / light(300) / tracking 6px
- ヒーロースタイル名: 32px / ultraLight(100) / tracking 10px
- マエストロ名: 28px / ultraLight(100) / tracking 6px
- セクションヘッダー: 11px / medium(500) / tracking 3px
- ランクバッジ: 8px / semibold(600) / tracking 1.5px
- スタッツラベル: 8px / medium(500) / tracking 2px
- VIEW ALL: 9px / light(300) / tracking 2px

### 設計則
1. ブランド用語（UPPERCASE）は必ずtracking 1.5-10px
2. 「芸術的な見出し」はultraLight(100) + 大tracking
3. 小さいラベルはmedium(500) + tracking

## コンポーネント

### CQButton
```css
/* Primary */
padding: 14px 24px;
background: #0A0A0A;
color: #F5F2ED;
border-radius: 1px;
font: 500 11px/1 sans-serif;
text-transform: uppercase;
letter-spacing: 2px;

/* Secondary */
padding: 14px 24px;
background: transparent;
color: #0A0A0A;
border: 1px solid #0A0A0A;
border-radius: 1px;

/* Deboss Effect */
/* default */ box-shadow: 0 2px 3px rgba(0,0,0,0.05);
/* pressed */ transform: scale(0.98) translateY(1px); box-shadow: 0 0 1px rgba(0,0,0,0.15);
transition: all 0.1s ease-in-out;
```

### CQCard
```css
padding: 16px;
background: #F5F2ED;
border-radius: 2px;
box-shadow: 0 1px 1px rgba(0,0,0,0.04);
border: 0.5px solid rgba(0,0,0,0.04);
```

### Kintsugi Divider
```css
height: 0.5px;
background: rgba(196, 162, 101, 0.3);
margin: 0 48px;
```

### TextField
```css
padding: 12px 16px;
background: #FFFFFF;
border-radius: 2px;
border: 0.5px solid rgba(107, 107, 107, 0.3);
box-shadow: 0 1px 1px rgba(0,0,0,0.04);
font-size: 17px;
```

### CQCallout
```css
padding: 16px;
background: #F5F2ED;
border-radius: 2px;
border: 0.5px solid rgba(0,0,0,0.06);
```

## シャドウ体系
- CQCard / TextField: `0 1px 1px rgba(0,0,0,0.04)` — 極めて控えめ
- CQButton default: `0 2px 3px rgba(0,0,0,0.05)`
- CQButton pressed: `0 0 1px rgba(0,0,0,0.15)`

## スペーシング
```css
--cq-space-xs: 4px;
--cq-space-sm: 8px;
--cq-space-md: 16px;
--cq-space-lg: 24px;
--cq-space-xl: 32px;
--cq-space-xxl: 48px;
```

## ブランド思想
1. **PARIAN**: 磁器の滑らかさ — Surface #F5F2ED + micro-texture
2. **ARRIS**: 稜線の鋭さ — 角丸1-4px
3. **Kintsugi**: 金継ぎ — ゴールドの区切り線
4. **Debossing**: 凹み — ボタン押下アニメ、控えめshadow
5. **Velarium**: 天蓋 — 余白、UIはコンテンツの背景

## 特殊UIパターン
- ヒーローオーバーレイ: `linear-gradient(to bottom, transparent 0%, transparent 33%, rgba(10,10,10,0.8) 100%)`
- ヒーロー文字: 32px / ultraLight(100) / tracking 10px / rgba(255,255,255,0.9)
- カスタムタブバー: bg #0A0A0A / active #C4A265 / inactive rgba(255,255,255,0.4)
- 進捗バー: height 2px / track rgba(0,0,0,0.05) / fill #C4A265
