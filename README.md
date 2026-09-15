# 居酒屋ルー

ホーム・お品書き・ルーについて・店舗案内の4ページからなる店舗サイトです。

サイト本体は `index.html` です。提供写真を画面サイズ別に軽量化しています。

## ローカル確認

- `npm run build`：配信ファイルを `dist/` に用意します。パッケージのインストールは不要です。
- `npm run verify`：5ページ・画像・内部リンク・店舗情報を確認します。
- `python3 -m http.server 4204 --bind 127.0.0.1 --directory dist`：http://127.0.0.1:4204/ で表示します。
- `node scripts/verify.mjs http://127.0.0.1:4204/`：実際の配信内容とファイルを照合します。

## GitHub Pages

`.github/workflows/pages.yml` が `main` 更新時に検証し、**dist/** のサイト本体を配信します。Pagesの配信元は **GitHub Actions** です。リポジトリのREADMEとWebサイトは別です。

GitHub Pages用のビルドでは `SITE_BASE_PATH=/izakayaru/` を設定します。通常のドメイン直下の配信では未設定（`/`）で動作します。

## 構成

- `index.html`：ホーム
- `menu.html`：お品書き・税込価格
- `about.html`：お店の紹介・ご利用シーン
- `access.html`：営業時間・定休日・電話・地図
- `404.html`：エラーページ
- `assets/`：軽量写真、共通スタイルと動作
- `scripts/`：配信準備・確認

予約は電話、最新のお知らせは店舗のInstagramへ案内します。個人情報を集めるフォームやInstagramの自動取得はありません。写真原本・認証情報・非公開の制作資料は含めていません。
