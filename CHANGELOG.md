# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)

## [2.0.0] - 2025-03-19

### Added
- Native color provider integration with VS Code
- Color mixer on color hover
- Support for additional file types including TS/TSX, JS/JSX
- Improved hover information showing RGB and HEX values
- Support for decimal values in HSL color definitions
- RGBToHSL conversion utility

### Changed
- Migrated from eslintrc to flat config format (eslint.config.mjs)
- Updated NPM configuration with `shamefully-hoist` and `save-exact` options
- Improved syntax matching regex to handle decimal precision better
- Refactored codebase into separate providers (color-provider.ts, hover-provider.ts)
- Updated all dependencies to their latest versions

### Removed
- Custom decoration-based color preview in favor of native VS Code color provider

## [1.3.0] - 2024-08-06

### Added

- Extended color preview support to JavaScript, TypeScript, and JSX/TSX React files.
- Improved syntax matching for HSL color values across supported languages.

### Changed

- Modified the color preview box to be more aligned in the middle of the line.

### Updated

- Upgraded several dev dependencies to their latest versions and added type definitions for `semver` as they seemed to be missing.

## [1.2.2] - 2024-06-29

### Fixed

- News content security policy to hopefully actually show the demonstration image AGAIN. Turns out it also resolves to a different host name, so I had to add that one too.

## [1.2.1] - 2024-06-29

### Fixed

- News content security policy to hopefully actually show the demonstration image.

## [1.2.0] - 2024-06-29

### Added

- Feature to convert HEX colors to HSL in the correct syntax.
- Added internal feature to hassle and annoy users to see what's new in the extension.

## [1.1.1] - 2024-06-16

### Fixed

- Actually added `postcss` this time, didn't save the file before committing.

## [1.1.0] - 2024-06-16

### Added

- Support for additional languages: `tailwindcss` - Thanks to @alexeira.
- Support for additional languages: `less`, `postcss`, `scss`.

### Changed

- Refactored language support to use `ENABLED_LANGUAGES` array, improving maintainability.

## [1.0.0] - 2024-04-28

### Added

- Initial release of the extension.
