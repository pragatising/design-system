# Design System

> Production-ready design system inspired by GitHub's Primer

---

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start Storybook (interactive docs)
pnpm storybook

# Run tests
pnpm test

# Build packages
pnpm build
```

---

## 📚 Documentation

**[GUIDE.md](GUIDE.md)** - Complete learning resource
- Tech stack explained (what & why)
- Industry best practices
- Production standards
- How real design systems work

---

## 📦 Packages

```
packages/
├── tokens/          Design tokens (colors, spacing, typography)
├── primitives/      Layout components (Box, Flex, Grid, Text)
├── components/      UI components (Button, Input, Modal, etc.)
├── css/            CSS framework & utilities
├── icons/          Icon library
└── themes/         Theming system
```

---

## 🛠️ Tech Stack

- **TypeScript** - Type safety
- **React 18** - Components
- **Styled Components** - CSS-in-JS
- **Vite** - Build tool
- **Vitest** - Testing
- **React Testing Library** - Component testing
- **Storybook** - Documentation
- **pnpm** - Package manager

---

## 🎯 Commands

```bash
# Development
pnpm storybook              # Interactive component docs
pnpm test --watch          # Test watch mode

# Building
pnpm build                 # Build all packages
pnpm --filter @design-system/primitives build  # Build one

# Testing
pnpm test                  # Run all tests
pnpm test:coverage         # With coverage

# Quality
pnpm typecheck            # TypeScript check
pnpm lint                 # Lint code
pnpm format               # Format code
```

---

## 📖 Example Component

See `packages/primitives/src/Box/` for a complete example:
- `Box.tsx` - Component implementation
- `Box.test.tsx` - Unit tests
- `Box.stories.tsx` - Storybook documentation

---

## 🎨 Design Principles

1. **Accessibility First** - WCAG 2.1 AA compliant
2. **Type Safe** - Full TypeScript support
3. **Well Tested** - 80%+ coverage goal
4. **Documented** - Every component in Storybook
5. **Composable** - Small pieces, big possibilities

---

## 🤝 Contributing

This is a learning project. Focus: understanding production-ready design systems.

---

## 📄 License

MIT
