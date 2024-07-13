[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<br />
<div align="center">

  <h3 align="center">ZeppOS Auto I18N Translator</h3>

  <p align="center">
    An auto i18n translation tool for ZeppOS
    <br />
    <a href="https://github.com/XiaomaiTX/zeppos-auto-i18n-translator/blob/master/README_zh-CN.md"><strong>中文文档</strong></a>
    <br />
    <br />
    <a href="https://github.com/XiaomaiTX/zeppos-auto-i18n-translator/issues">Report Bug</a>
    ·
    <a href="https://github.com/XiaomaiTX/zeppos-auto-i18n-translator/issues">Request Feature</a>
  </p>
</div>


## About The Project

A simple automatic i18n translation tool. You only need to write one .po file, and it will automatically generate .po files for other languages, helping developers quickly complete i18n translation tasks.


## Getting Started

### Prerequisites

You need to install Node.js and the required dependencies. For more details, please refer to [Installation](#installation).


### Installation

```sh
npm install @x1a0ma17x/zeppos-auto-i18n-translator -g
```

## Usage

After installation, run the following command to generate the configuration file:

```sh
z18n
```

Configuration file parameters:

| Parameter    | Description           | Type   | Example                                  |
| ------------ | --------------------- | ------ | ---------------------------------------- |
| originLang   | Original language     | string | zh-CN                                    |
| targetLangs  | Target languages      | array  | ["en-US", "zh-TW", "ru-RU", "fr-FR"]     |
| workingPath  | i18n folder path      | string | ./example/page/i18n                      |
| adapter      | Translation channel   | string | Translated                               |

Both `originLang` and `targetLangs` should be standard language codes. Refer to the [language codes supported by ZeppOS](https://docs.zepp.com/zh-cn/docs/reference/related-resources/language-list/) for more details.

Currently supported adapters:

| Adapter     | Description           |
| ----------- | --------------------- |
| Translated  | Translation channel   |

Once the configuration file is set, simply run `z18n` to complete the translation.


## Roadmap

- [ ] Support more adapters
  - [ ] DeepL


See the [open issues](https://github.com/XiaomaiTX/zeppos-auto-i18n-translator/issues) for a full list of proposed features (and known issues).




## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request




## License

Distributed under the MIT License. See `LICENSE.txt` for more information.




## Contact

XiaomaiTX - i@lenrome.cn

Project Link: [https://github.com/XiaomaiTX/zeppos-auto-i18n-translator](https://github.com/XiaomaiTX/zeppos-auto-i18n-translator)




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
