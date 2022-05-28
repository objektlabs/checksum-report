<p align="center"><br><img src="https://avatars.githubusercontent.com/u/54233521?s=200&v=4" width="128" height="128"/></p>

<h3 align="center">Checksum Generator</h3>
<p align="center"><strong><code>@objekt/checksum-generator</code></strong></p>
<p align="center">NodeJS utility library to generate checksums for files and directories.</p>

<p align="center">
	<img src="https://img.shields.io/maintenance/yes/2022?style=flat-square"/>
	<a href="https://github.com/capacitor-community/http/actions?query=workflow%3A%22Test+and+Build+Plugin%22"><img src="https://img.shields.io/github/workflow/status/capacitor-community/http/Test%20and%20Build%20Plugin?style=flat-square"/></a>
	<a href="https://www.npmjs.com/package/@objekt/checksum-generator"><img src="https://img.shields.io/npm/l/@objekt/checksum-generator?style=flat-square"/></a>
	<br>
	<a href="https://www.npmjs.com/package/@objekt/checksum-generator"><img src="https://img.shields.io/npm/dw/@objekt/checksum-generator?style=flat-square"/></a>
	<a href="https://www.npmjs.com/package/@objekt/checksum-generator"><img src="https://img.shields.io/npm/v/@objekt/checksum-generator?style=flat-square"/></a>
	<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
<a href="#contributors-"><img src="https://img.shields.io/badge/all%20contributors-1-orange?style=flat-square" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
</p>

<p align="center">
	[<a href="#introduction">Introduction</a>]
	[<a href="#configuration">Configuration</a>]
	[<a href="#usage">Usage</a>]
	[<a href="#api-reference">API Reference</a>]
	[<a href="#contributors-">Contributors</a>]
	[<a href="#license">License</a>]
</p>

## Introduction
This utility libary assists you to generate a checksum report for a  directory and its descendants.

This is useful to include in the root of distribution bundle, e.g. a static website, as a client application could use this report to validate it has downloaded the complete bundle.

Each file in the directory structure is read and its content hashed using the **sha1** algorithm with **hex** encoding by default.

The report is generated as a JSON string in the below format, where:
* **id** = uniquely identifies the report, i.e. the overall hash of all file hashes.
* **timestamp** = the timestamp on which the report was generated.
* **files** = is a flat array of each path and it's hash.

e.g.

```json
{
  "id":"9d307fdcafb3f6f2fbcd47899df78652936cea00",
  "timestamp":"2022-04-10T15:21:08.406Z",
  "files":[
    {
      "path":"index.html",
      "hash":"064c47308009992f133a44e368cf1dcfdaa9d85e"
    },
    {
      "path":"app.39b812d9.js",
      "hash":"1bd6e3344fbc3363b1faa00d1115378135aac5ce"
    },
    {
      "path":"vendors.70682963.js",
      "hash":"5b055ca612c8e6883decd76258261d85da3de644"
    },
    {
      "path":"assets/logo.png",
      "hash":"ed73e59a43d571044f457e62d385a6ea025f651c"
    }
  ]
}
```

## Installation
```bash
npm install @objekt/checksum-generator
```

## Configuration
No configuration needed. This libary targets NodeJS 16 and above.

## Usage

### Generate Checksum Report

Generate a checksum report for the dist directory.

```js
import { ChecksumReport } from '@objekt/checksum-report';

const report = await ChecksumReport.get('./dist');

console.log(report);
```

### Generate and Save Checksum Report to Disk

Generate and save a checksum for the dist directory as checksum.json to disk.

```js
import { ChecksumReport } from '@objekt/checksum-generator';

const report = await ChecksumReport.save('./dist', './dist/checksum.json');

console.log(report);
```

## API Reference

Full API documentation [here](https://objektlabs.github.io/checksum-generator/modules.html).

## Contributors ✨

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification.
Contributions of any kind welcome! ([emoji key](https://allcontributors.org/docs/en/emoji-key))
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/jn42lm1"><img src="https://avatars2.githubusercontent.com/u/54233338?v=4?s=100" width="100px;" alt=""/><br /><sub><b>jn42lm1</b></sub></a><br /><a href="https://github.com/objektlabs/checksum-generator/commits?author=jn42lm1" title="Code">💻</a> <a href="https://github.com/objektlabs/checksum-generator/commits?author=jn42lm1" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

[MIT](LICENSE)