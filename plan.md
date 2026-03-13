# 全画面ラグジュアリーデザイン改修計画

## 共通原則
- **Breathe**: space-y-14 → space-y-20、カード間gap拡大
- **One at a time**: 密度を下げる
- **Image first**: UIパーツ控えめ、写真主役
- **SaaS感排除**: KPIカード、rounded-full pills、ステータスドット、テーブルヘッダー背景色を除去
- **ラグジュアリー表現**: cq-heading-display見出し、10px uppercase ラベル、kintsugi divider、余白で分離

## 各ページの改修

### 1. Dashboard (page.tsx)
- Quick Stats 3カードを**削除**
- ヒーロー: "FOR BUSINESS"削除、CTAを"花を贈る"/"コレクションを見る"に
- 誕生日通知: border控えめに、アイコン背景削除
- 最近の注文: ステータスドット→控えめテキスト、バッジスタイル統一
- ピックアップ: border/shadow削除、写真主役

### 2. Order (order/page.tsx)
- ステップインジケーター: 控えめ化
- マエストロ選択: 完遂率・実績件数を削除。ランクバッジ削除
- CTA: "NEXT"→"次へ"、"CONFIRM ORDER"→"ご注文を確定する"

### 3. History (history/page.tsx)
- テーブル → カードリスト
- フィルター: rounded-full → テキストタブ
- タイトル: display font

### 4. Anniversary/Invoices/Settings
- タイトル: display font
- フィルター: rounded-full → テキストタブ
- border/shadow控えめ
- Settings: SectionCardアイコン削除

## 実装順序
1. Dashboard → 2. Order → 3. History → 4. Anniversary/Invoices/Settings → ビルド
