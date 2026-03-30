# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[Unreleased]: https://github.com/mmlado/react-native-animated-ur-qr/compare/v0.1.1...HEAD
[0.1.1]: https://github.com/mmlado/react-native-animated-ur-qr/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/mmlado/react-native-animated-ur-qr/releases/tag/v0.1.0
