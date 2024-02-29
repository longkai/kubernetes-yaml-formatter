# Change Log

All notable changes to the "kubernetes-yaml-formatter-x" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## 1.4.0 (29 Feb 2024)

Hello from a day that doesn't exist!

This release adds the ability to use a local workspace config. So now all of your projects can have their own custom .yamlfmt (or yamlfmt.yaml or yamlfmt.yml) files in them!

There is also a toggle for which should take precidence global or workspace configs. Default is workspace, so that you can have global config enabled for any project that _doesn't_ have a workspace config, but it will use the workspace config if it does exist.

If you (for some reason) want to not listen to the project maintainer and lint things your own way, you can disable this setting and use your global config no matter what.

## 1.3.0 (26 Feb 2024)

Added option to use global config instead of extension config.
The global config lives in `$HOME/.config/yamlfmt/.yamlfmt`

This is equivilent to passing in `-global_conf` on the command line

In depth instructions can be found in the [yamlfmt documentation](https://github.com/google/yamlfmt/blob/main/docs/config-file.md)

## 1.2.1 (26 Feb 2024)

Updating underlaying packages and skeleton unit tests

## 1.2.0 (26 Feb 2024)

This is the first release of the new Kubernetes YAML Formatter X!
Huge thank you to [Longkai](https://github.com/longkai) for the original extension.

To keep with tradition, this release is brought to you from my hometown (and workplace, I work at home), [Cleveland](https://en.wikipedia.org/wiki/Cleveland)

- Updated `yamlfmt` to v0.11.0 and removed customizations
- Added support for all available options in `yamlfmt`

## 1.1.0 (20 Oct 2022)

This release is brought you from my work place, [Shenzhen](https://en.wikipedia.org/wiki/Shenzhen).

- Add builtin Emoji support!
- Add a new setting `kubernetes-yaml-formatter-x.includeDocumentStart` to include `---` at document start(default `false`).

## 1.0.0 (30 Sep 2022)

Hello, World from my hometown, [Guilin](https://en.wikipedia.org/wiki/Guilin)!

Initial release of the kubernetes style yaml formatter which allows you to customize the sequence indent style.
