# マルチスケールシミュレーション最終課題

完成したwebサイト

https://roman-alpha.vercel.app/

github

https://github.com/kyohei-horikawa/roman

## 概要

今回は，roman numeralsをweb上で公開することを目指した．

使用した技術は以下の通り．

- [Next.js](https://nextjs.org/)
- [Tailwindcss](https://tailwindcss.com/)
- [Vercel](https://vercel.com/)

また，環境は以下の通り．

```
❯❯❯ node -v
v15.14.0

❯❯❯ npm -v
7.7.6

❯❯❯ npx -v
7.7.6
```

nodeは[volta](https://volta.sh/)を用いてインストールしている．[参考](https://zenn.dev/taichifukumoto/articles/how-to-use-volta)


### Next.js

Next.jsは，Reactをベースにしたフロントエンドフレームワークであり，Next.js関係の記事が1000LGTM付くなど注目度向上がうかがえる．

Next.jsはサーバーサイドレンダリング(SSR)やファイルベースルーティングなど多くの機能を**ゼロコンフィグ**で提供しており，開発会社Vercelが同名のプラットフォームVercelを展開しているため，デプロイ/ビルド/配信までをスムーズに行うことが可能．

#### 実際に使用して感じたメリット

- ファイルベースルーティング
  - Next.jsはpages/ディレクトリに置いたフォルダ/ファイルの構成に従って,HTMLを生成してページ遷移を実現する．ルーティングライブラリは不要で，URLの構造に合わせてjs(ts)ファイルを配置するだけ．
- Fast Refresh
  - Next.jsの開発サーバはソースコードの変更を検知して，stateを保持したまま変更があった個所だけを更新する．
- 画像最適化
  - 専用の画像コンポーネントが追加され，配置されるサイズに応じて元画像をトリミングして配信して，必要なサイズのデータだけをダウンロードするので画像の表示を大幅に高速化される．
- Zero Config
  - 上記すべてについて，webpack等の設定の必要がない．

[参考](https://qiita.com/Yuki_Oshima/items/5c0dfd8f7af8fb76af8f)

### Tailwindcss

Tailwindcssは，ユーティリティクラスの詰め合わせのライブラリであり，スタイリングを全て，ユーティリティクラスによって表現する．

例えば，

```
text-xs
```

といったコードは，

```
font-size: 0.75rem;
line-height: 1rem;
```
のように解釈される．

[チートシート](https://nerdcave.com/tailwind-cheat-sheet)を参考に，スタイリングしていく．

[参考](https://fixel.co.jp/blog/tailwindcss/)

### Vercel

GitHubと連携してプッシュするとビルド、デプロイまで自動化してくれる，ホスティングサービス．

## プロジェクトの作成

nodeがないならば，

```
# install Volta
curl https://get.volta.sh | bash

# install Node
volta install node

# check Node version
node -v

# install npm
volta insatll npm

# check npm version
npm -v
```

next.jsプロジェクトをcreate-next-appを用いて作成．

```
npx create-next-app roman
cd roman
npm run dev
```

これで，初期設定は完了して，開発サーバが立ち上がるので，localhost:3000で確認．

次に，tailwindのインストール．

[Install Tailwind CSS with Next.js](tailwind.config.js)


```
npm install --save --legacy-peer-deps tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

自動で生成された，tailwind.config.jsに以下を追記．

```tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

./styles/globals.cssに以下を追記．

```./styles/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

これでスタイルが当たるようになった．

以上で準備が整ったのでコーディングしていく．

## roman numeralsのロジック


```
const arabic = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
const roman = [
  "M",
  "CM",
  "D",
  "CD",
  "C",
  "XC",
  "L",
  "XL",
  "X",
  "IX",
  "V",
  "IV",
  "I",
];

const map_before = ["IV", "IX", "XL", "XC", "CD", "CM"];

const map_after = ["IIII", "VIIII", "XXXX", "LXXXX", "CCCC", "DCCCC"];

export const ArabicToRomanConverter = (props) => {
  let val = Number(props);
  let res = [];
  for (let i = 0; i < arabic.length; i++) {
    const quotient = Math.trunc(val / arabic[i]);
    if (quotient != 0) {
      res += roman[i].repeat(quotient);
      val -= arabic[i] * quotient;
    }
  }
  return res;
};

export const RomanToArabicConverter = (props) => {
  for (let i = 0; i < map_after.lenght; i++) {
    props = props.replace(map_before[i], map_after[i]);
  }
  let res = 0;
  for (let i = props.length - 1; i > -1; i--) {
    const index = roman.indexOf(props.charAt(i));
    res += arabic[index];
  }
  return res;
};
```

Arabic to Romanでは，アラビア数字とローマ数字の対応配列を用意して，大き方から割っていきその商の分だけローマ数字をresに追加する．その分だけ元のアラビア数字から引くという作業loopする．

Roman to Arabicでは，

```
const map_before = ["IV", "IX", "XL", "XC", "CD", "CM"];
const map_after = ["IIII", "VIIII", "XXXX", "LXXXX", "CCCC", "DCCCC"];
```

特殊なローマ数字を先に変換して，右から１文字ずつ対応するアラビア数字に変換していく．

## 工夫

### next/router

```
const router = useRouter();
```
とすることで，パスに関する情報を取得できる．
Arabic to RomanとRoman to Arabicのページを切り替えるボタンを実装した．

### 三項演算子を用いた記法

```
{res ? (<h2 className=" text-4xl text-red-500 text-center">{val + "   :   " + res}</h2>) : null}
```

condition ? exprIfTrue : exprIfFalse

resがtruthyな値の時は，h2を返し，falsyな値の時はnullを返す．こうすることで，結果の表示をコントロールできる．


## 改善点

- 4000以上のアラビア数字や，"A"などのローマ数字以外のものが入力された時にエラー処理をする．


