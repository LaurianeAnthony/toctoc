# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React Native mobile application built with Expo SDK 53 and Expo Router for file-based routing. The app supports iOS, Android, and web platforms with automatic dark/light theme support.

## Development Commands

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm run web` - Run web version
- `npm run lint` - Run ESLint
- `npm run reset-project` - Reset to blank app (moves current app to app-example)

## Architecture

### Routing

The app uses Expo Router with file-based routing:

- `app/_layout.tsx` - Root layout with theme provider and stack navigator
- `app/(tabs)/_layout.tsx` - Tab layout with bottom navigation
- `app/(tabs)/index.tsx` - Home screen
- `app/(tabs)/explore.tsx` - Explore screen
- `app/(tabs)/explore2.tsx` - Second explore screen
- `app/+not-found.tsx` - 404 page

### Theming System

- `constants/Colors.ts` - Color definitions for light/dark themes
- `hooks/useColorScheme.ts` - Color scheme detection hook
- `hooks/useThemeColor.ts` - Theme-aware color selection hook
- Components use `ThemedText` and `ThemedView` for automatic theme support

### Component Structure

- `components/` - Reusable UI components
- `components/ui/` - Platform-specific UI components (iOS/Android variants)
- Components follow themed patterns using `useThemeColor` hook
- Custom tab bar with haptic feedback and blur effects on iOS

### Path Aliases

The project uses `@/*` path aliases that resolve to the root directory (configured in tsconfig.json).

### Key Features

- File-based routing with typed routes enabled
- Cross-platform design with platform-specific optimizations
- Automatic theme switching (light/dark)
- Haptic feedback on tab interactions
- Blur effects and native UI elements
- Font loading with SpaceMono font
- Edge-to-edge display on Android

## Configuration Files

- `app.json` - Expo configuration with plugins and platform settings
- `tsconfig.json` - TypeScript config extending Expo base with strict mode
- `eslint.config.js` - ESLint configuration using Expo config
