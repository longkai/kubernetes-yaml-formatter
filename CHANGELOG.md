# Change Log

All notable changes to the "kubernetes-yaml-formatter" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## 2.3.1 (03 Dec 2024)

- add `better-yaml.flowCollectionPadding` option. When true, a single space of padding will be added inside the delimiters of non-empty single-line flow collections. Default true.

## 2.3.0 (19 Nov 2024)

- add `better-yaml.documentOptions.version` global option to set YAML version used by documents without a %YAML directive.
- upgrade dependencies.

## 2.0.0 (03 Nov 2024)

Rename to **Better YAML Formatter** since it works well with what you think about YAML :)

- Rewrite from grounding with **Correct**, **Consistent** and **Customized** result.
- Add universal platform support where VS Code runs including web browser!
- Add extension preview support staring this version.
- Add range formatting support!
- Add builtin helm and ansible support(with range formatting or valid content).
- Add comment string customization support.
- Add fine grained directives support.
- Bug fixes.

## 1.1.0 (20 Oct 2022)

This release is brought you from my work place, [Shenzhen](https://en.wikipedia.org/wiki/Shenzhen).

- Add builtin Emoji support!
- Add a new setting `kubernetes-yaml-formatter.includeDocumentStart` to include `---` at document start(default `false`).

## 1.0.0 (30 Sep 2022)

Hello, World from my hometown, [Guilin](https://en.wikipedia.org/wiki/Guilin)!

Initial release of the kubernetes style yaml formatter which allows you to customize the sequence indent style.
