@minofrk/xelto-diagram-canvas
===============================================================================

[![NPM Version](https://img.shields.io/npm/v/@minofrk/xelto-diagram-canvas.svg?style=flat-square)](https://www.npmjs.com/package/@minofrk/xelto-diagram-canvas)
[![License](https://img.shields.io/github/license/minofrk/xelto-diagram-canvas.js.svg?style=flat-square)](LICENSE)
[![Build Status](https://img.shields.io/travis/com/minofrk/xelto-diagram-canvas.js/master.svg?style=flat-square)](https://travis-ci.com/minofrk/xelto-diagram-canvas.js)
[![codecov](https://img.shields.io/codecov/c/github/minofrk/xelto-diagram-canvas.js.svg?style=flat-square)](https://codecov.io/gh/minofrk/xelto-diagram-canvas.js)

HTML 内の `<xelto-diagram>` タグに Canvas で描いた局面図を表示する Web Component です。

Usage
-------------------------------------------------------------------------------

ECMAScript 6 をサポートしたブラウザで動作します。

動作させたいページの `body` タグの最後に以下のコードを貼り付けます。xelto-canvas-diagram.js は [Releases](https://github.com/minofrk/xelto-diagram-canvas.js/releases) からダウンロードできますが、代わりに CDN を利用して読み込むタグを用いるとより簡単です。

```html
<!-- 本体読み込み（適宜書き換えてください） -->
<script src="./xelto-diagram-canvas.js"></script>

<!-- 局面図の描画を有効にするスクリプト -->
<script>
    customElements.define('xelto-diagram', XeltoDiagramCanvas);

    customElements.whenDefined('xelto-diagram').then(() => {
        Array.from(document.querySelectorAll('xelto-diagram')).forEach(x => x.refresh());
    });
</script>
```

Microsoft Edge, Firefox などの Web Components 非対応ブラウザでも動かしたい場合は、[webcomponents-loader.js](https://www.jsdelivr.com/package/npm/@webcomponents/webcomponentsjs) を xelto-diagram-canvas.js よりも先に読み込ませれば動くようになります。

```html
<!-- webcomponents-loader.js 読み込みの例 -->
<script src="https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.2.10/webcomponents-loader.js" integrity="sha256-Ao3dDPJ8Vd/wf6kjL2MlHNo8vYEeLyvDg8k0njnNS7Y=" crossorigin="anonymous"></script>
```

ページ内の局面図を表示させたい場所に次のように `xelto-diagram` 要素を書き、その中に表示したい局面を [MSF 形式](https://github.com/minofrk/mino-seslax-format)で記述することで局面図を表示することができます。

```html
<xelto-diagram>
    {
        "sast": "arxe",
        "arxe": {
            "txifol": [],
            "evol": null
        },
        "sorn": {
            "txifol": [],
            "evol": null
        },
        "ele": [
            ["rav", "nen", "pin", "mir", "ket", "lin", "len"],
            ["din", "rez", "kun", "mat", "lax", "jil", "tan"],
            [ null,  null,  null,  null,  null,  null,  null],
            [ null,  null,  null, "tem",  null,  null,  null],
            [ null,  null,  null,  null,  null,  null,  null],
            ["pal", "ful", "mik", "fav", "zan", "gil", "ruj"],
            ["dyu", "lis", "mel", "ser", "dia", "vio", "ral"]
        ],
        "korol": []
    }
</xelto-diagram>
```

以下は単に開始局面を表示するだけのページの例です。この例ではバージョン `0.0.1` の本体を CDN から取得して使用しています。

```html
<!DOCTYPE html>
<html>
    <body>
        <xelto-diagram>
            {
                "sast": "arxe",
                "arxe": {
                    "txifol": [],
                    "evol": null
                },
                "sorn": {
                    "txifol": [],
                    "evol": null
                },
                "ele": [
                    ["rav", "nen", "pin", "mir", "ket", "lin", "len"],
                    ["din", "rez", "kun", "mat", "lax", "jil", "tan"],
                    [ null,  null,  null,  null,  null,  null,  null],
                    [ null,  null,  null, "tem",  null,  null,  null],
                    [ null,  null,  null,  null,  null,  null,  null],
                    ["pal", "ful", "mik", "fav", "zan", "gil", "ruj"],
                    ["dyu", "lis", "mel", "ser", "dia", "vio", "ral"]
                ],
                "korol": []
            }
        </xelto-diagram>

        <!-- webcomponents-loader.js 読み込みの例 -->
        <script src="https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.2.10/webcomponents-loader.js" integrity="sha256-Ao3dDPJ8Vd/wf6kjL2MlHNo8vYEeLyvDg8k0njnNS7Y=" crossorigin="anonymous"></script>

        <!-- 本体読み込み（適宜書き換えてください） -->
        <script src="https://cdn.jsdelivr.net/npm/@minofrk/xelto-diagram-canvas@0.0.1/umd/xelto-diagram-canvas.js" integrity="sha256-TMtKhz9JCIPMutuO/a/FPr8yMQIOMN4y/VmCWJjnHO8=" crossorigin="anonymous"></script>

        <!-- 局面図の描画を有効にするスクリプト -->
        <script>
            customElements.define('xelto-diagram', XeltoDiagramCanvas);

            customElements.whenDefined('xelto-diagram').then(() => {
                Array.from(document.querySelectorAll('xelto-diagram')).forEach(x => x.refresh());
            });
        </script>
    </body>
</html>
```

### npm package

```
npm install @minofrk/xelto-diagram-canvas
```

このライブラリは `HTMLElement` を継承したクラス `XeltoDiagramCanvas` をエクスポートしています。これにより要素 `<xelto-diagram>` を定義することで下記 API が利用可能になります。 

API
-------------------------------------------------------------------------------

### Instance Methods

#### `refresh()`

局面図を再描画します。局面やフォントを変更してもこのメソッドを呼ばないと反映されません。

一度も `setState()` を呼ばずに `refresh()` を呼んだ場合、`customElements.define()` 時点での `<xelto-diagram>` の内容を局面図として解釈することを試みます。内容が [MSF 形式](https://github.com/minofrk/mino-seslax-format)と互換性を持たない場合はエラー表示をします。ただし `customElements.define()` 時点で HTML の解析が済んでいないと内容を読み取れず常にエラー表示になってしまうので、`<xelto-diagram>` の内容を描画したい場合は HTML の解析が終わってから `customElements.define()` するようにしてください。

#### `setState(state)`

表示する局面を設定します。設定する局面は [MSF 形式](https://github.com/minofrk/mino-seslax-format)に従うオブジェクトで表現します。

### Attributes

論理属性の `reversed` を指定すると駒の配置がソーン視点になります。

```html
<xelto-diagram reversed>
    ...
</xelto-diagram>
```

### CSS

以下に挙げるスタイルを `<xelto-diagram>` 要素に当てることで局面図の大きさやフォントなどを変えることができます。

- `width`
- `height`
- `font-family`

License
-------------------------------------------------------------------------------

See [LICENSE](LICENSE)
