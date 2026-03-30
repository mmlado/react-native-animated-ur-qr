# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.5] - 2026-03-30

### Fixed
- Lower default fragment capacity from 400 to 200 bytes to match hardware wallet QR standards and ensure animation triggers for typical payloads

## [0.1.4] - 2026-03-30

### Fixed
- Guard against empty `cbor`/`type` in `useAnimatedURQRCode` to prevent crash when UR string cannot be parsed

## [0.1.3] - 2026-03-30

### Fixed
- Upgrade npm to latest in publish workflow to meet OIDC Trusted Publishing minimum version requirement (11.5.1+)

## [0.1.2] - 2026-03-30

### Fixed
- Remove `registry-url` from `setup-node` to allow OIDC Trusted Publishing to work correctly

## [0.1.1] - 2026-03-30

### Fixed
- Switch CI publish workflow to Trusted Publishing (OIDC) — no npm token required

## [0.1.0] - 2026-03-29

### Added
- `AnimatedURQRCode` component for displaying animated BC-UR QR codes in React Native
- `useAnimatedURQRCode` hook for bringing your own QR renderer
- Automatic single/multi-fragment detection — no animation overhead for small payloads
- Configurable `interval` (ms) and `capacity` (fragment size) props
- Full TypeScript support

[Unreleased]: https://github.com/mmlado/react-native-animated-ur-qr/compare/v0.1.5...HEAD
[0.1.5]: https://github.com/mmlado/react-native-animated-ur-qr/compare/v0.1.4...v0.1.5
[0.1.4]: https://github.com/mmlado/react-native-animated-ur-qr/compare/v0.1.3...v0.1.4
[0.1.3]: https://github.com/mmlado/react-native-animated-ur-qr/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/mmlado/react-native-animated-ur-qr/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/mmlado/react-native-animated-ur-qr/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/mmlado/react-native-animated-ur-qr/releases/tag/v0.1.0
