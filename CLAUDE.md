# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React Native mobile application built with Expo SDK 54 and Expo Router for file-based routing. The app is a checklist management system that supports iOS, Android, and web platforms with automatic dark/light theme support.

## Development Commands

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm run web` - Run web version
- `npm run lint` - Run ESLint

## Architecture

### Routing

The app uses Expo Router with file-based routing. Key routes:

- `app/_layout.tsx` - Root layout with ThemeProvider, SQLiteProvider, and Stack navigator
- `app/(tabs)/_layout.tsx` - Tab layout with custom TabBar component
- `app/(tabs)/index.tsx` - Calendar screen (home)
- `app/(tabs)/checklist.tsx` - Checklist management screen
- `app/(tabs)/example.tsx` - Settings/example screen
- `app/checklist-instance.tsx` - Detail screen for a checklist instance (outside tabs)
- `app/+not-found.tsx` - 404 page

### Database Layer

The app uses `expo-sqlite` with a repository pattern:

- **Database initialization**: `lib/database/index.ts` contains `initializeDatabase()` which sets up the schema and seeds data. This function is called automatically via `SQLiteProvider.onInit` in `app/_layout.tsx`.
- **Schema**: Two main tables - `checklist_instances` and `step_instances` with a foreign key relationship.
- **Repositories**: Located in `lib/repositories/`
  - `ChecklistInstanceRepository` - Handles checklist instance queries
  - `StepInstanceRepository` - Handles step instance queries, including `findByChecklistInstanceId()`
- **Type definitions**: `type/checklist.ts` defines `Checklist`, `ChecklistInstance`, `Step`, and `StepInstance` types

**Important**: The database is initialized at app startup with WAL mode enabled. When adding new tables or modifying the schema, update `lib/database/index.ts`.

### Theming System

- `constants/Colors.ts` - Color definitions for light/dark themes
- `hooks/useColorScheme.ts` - Color scheme detection hook (with web variant)
- `hooks/useThemeColor.ts` - Theme-aware color selection hook
- `hooks/useTheme.ts` - Additional theme utilities
- Components use `ThemedText` and `ThemedView` for automatic theme support

### Component Structure

- `components/` - Reusable UI components
- `components/ui/` - Platform-specific UI components with iOS/Android variants
  - `IconSymbol` - Platform-specific icon component (uses SF Symbols on iOS)
  - `TabBarBackground` - Platform-specific tab bar background (blur effect on iOS)
  - `TabBar` - Custom tab bar with haptic feedback
  - `ButtonItem` - Button component for checklist instances
  - `ButtonIcon` - Icon button component
  - `Typography` - Typography system
- Custom tab bar with haptic feedback via `expo-haptics`

### Path Aliases

The project uses `@/*` path aliases that resolve to the root directory (configured in `tsconfig.json`).

### Key Features

- File-based routing with typed routes
- SQLite local database with repository pattern
- Cross-platform design with platform-specific optimizations
- Automatic theme switching (light/dark)
- Haptic feedback on tab interactions (iOS)
- Blur effects on iOS via `expo-blur`
- Font loading with SpaceMono and Roboto fonts

## Configuration Files

- `app.json` - Expo configuration with plugins and platform settings
- `tsconfig.json` - TypeScript config with strict mode and path aliases
- `eslint.config.js` - ESLint configuration using Expo config with Prettier
- `package.json` - Uses Expo SDK 54, React 19, React Native 0.81
