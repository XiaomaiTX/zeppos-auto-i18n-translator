[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<br />
<div align="center">
  <h3 align="center">ZeppOS Auto I18N Translator</h3>

  <p align="center">
    一个简单的i18n翻译工具
    <br />
    <a href="https://github.com/XiaomaiTX/zeppos-auto-i18n-translator/blob/master/README.md"><strong>English Doc</strong></a>
    <br />
    <br />
    <a href="https://github.com/XiaomaiTX/zeppos-auto-i18n-translator/issues">反馈Bug</a>
    ·
    <a href="https://github.com/XiaomaiTX/zeppos-auto-i18n-translator/issues">提出建议</a>
  </p>
</div>

## About The Project

一个简单自动的i18n翻译工具，您只用写一份.po文件即可，自动生成其他语言的.po文件，帮助开发者快速完成i18n翻译工作。

## Getting Started

### Prerequisites

你需要安装node.js，并且安装好依赖包，具体请参考[安装](#%e5%ae%89%e8%a3%85)

### 安装

```sh
npm install @x1a0ma17x/zeppos-auto-i18n-translator -g
```

## 如何使用

安装完成后，运行以下命令生成配置文件

```sh
z18n init
```

配置文件参数

| 参数 | 内容 | 类型 | 举例 |
| --- | --- | --- | --- |
| originLang | 原始语言 | string | zh-CN |
| targetLangs | 目标语言 | array | ["en-US", "zh-TW", "ru-RU", "fr-FR"] |
| workingPath | i18n文件夹路径 | string | ./example/page/i18n |
| adapter | 翻译渠道 | string | Translated |

originLang与targetLangs均为标准语言代码，可参考[ZeppOS中支持的语言代码](https://docs.zepp.com/zh-cn/docs/reference/related-resources/language-list/)

目前支持如下adapter

| adapter | 说明 |
| --- | --- |
| Translated | 翻译渠道 |


当设置好配置文件后，只需要运行`z18n`即可完成翻译

## Roadmap

- [ ] 支持更多adapter
  - [ ] DeepL


请参阅[open issues](https://github.com/XiaomaiTX/zeppos-auto-i18n-translator/issues)以获取提议功能（和已知问题）的完整列表。




## 如何为这个项目做贡献

贡献使得开源社区成为一个令人惊叹的学习、启发和创造的地方。您所做的任何贡献都**非常感谢**。

如果您有任何建议可以改进这个项目，请 fork 这个仓库并创建一个 pull request。您也可以简单地打开一个带有 "enhancement" 标签的 issue。
别忘了给项目点个星！再次感谢！

1. Fork 这个项目
2. 创建您的功能分支（`git checkout -b feature/AmazingFeature`）
3. 提交您的更改（`git commit -m 'Add some AmazingFeature'`）
4. 推送到分支（`git push origin feature/AmazingFeature`）
5. 打开一个 Pull Request




## License

根据 MIT 许可证分发。有关更多信息，请参见 `LICENSE.txt`。





## 联系作者

XiaomaiTX - i@lenrome.cn

项目地址: [https://github.com/XiaomaiTX/zeppos-auto-i18n-translator](https://github.com/XiaomaiTX/zeppos-auto-i18n-translator)




[contributors-shield]: https://img.shields.io/github/contributors/XiaomaiTX/zeppos-auto-i18n-translator.svg?style=for-the-badge
[contributors-url]: https://github.com/XiaomaiTX/zeppos-auto-i18n-translator/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/XiaomaiTX/zeppos-auto-i18n-translator.svg?style=for-the-badge
[forks-url]: https://github.com/XiaomaiTX/zeppos-auto-i18n-translator/network/members
[stars-shield]: https://img.shields.io/github/stars/XiaomaiTX/zeppos-auto-i18n-translator.svg?style=for-the-badge
[stars-url]: https://github.com/XiaomaiTX/zeppos-auto-i18n-translator/stargazers
[issues-shield]: https://img.shields.io/github/issues/XiaomaiTX/zeppos-auto-i18n-translator.svg?style=for-the-badge
[issues-url]: https://github.com/XiaomaiTX/zeppos-auto-i18n-translator/issues
[license-shield]: https://img.shields.io/github/license/XiaomaiTX/zeppos-auto-i18n-translator.svg?style=for-the-badge
[license-url]: https://github.com/XiaomaiTX/zeppos-auto-i18n-translator/blob/master/LICENSE.txt
