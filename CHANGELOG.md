# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)

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
