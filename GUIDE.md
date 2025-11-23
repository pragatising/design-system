# Design System Guide

**Your learning resource for building production-ready design systems.**

---

## 🎯 What You're Learning

1. **Tech Stack** - What each tool does and why
2. **Best Practices** - Industry standards and conventions  
3. **Production Quality** - How real design systems are shipped

---

## 🛠️ Tech Stack Explained

### TypeScript (Language)
**What:** JavaScript with types  
**Why:** Catch errors before runtime, better IDE support  
**Production Use:** GitHub Primer, Material-UI, all major DS  

**Key Concepts:**
- **Strict mode** - Catches more potential bugs
- **Interfaces** - Define component prop shapes
- **Generics** - Reusable type-safe code

```typescript
// Example: Type-safe component props
interface ButtonProps {
  variant: 'primary' | 'secondary';  // Only these values allowed
  onClick: () => void;                // Function signature
  children: React.ReactNode;          // Any React content
}
```

---

### React 18+ (Component Framework)
**What:** Build UIs with reusable components  
**Why:** Industry standard, component-driven development  
**Production Use:** Every major design system  

**Key Concepts:**
- **Functional components** - Modern approach (not class components)
- **Hooks** - useState, useEffect for component logic
- **forwardRef** - Pass refs through components (accessibility)
- **Composition** - Build complex UIs from simple pieces

```typescript
// Modern React component
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, onClick }, ref) => {
    return (
      <button ref={ref} onClick={onClick}>
        {children}
      </button>
    );
  }
);
```

**Why forwardRef?** Screen readers and focus management need direct DOM access.

---

### Styled Components (CSS-in-JS)
**What:** Write CSS inside JavaScript  
**Why:** 
- Component-scoped styles (no conflicts)
- Props-based styling
- TypeScript support
- Automatic vendor prefixing

**Production Use:** Primer uses CSS + PostCSS, but many use styled-components (Polaris, Atlassian)

```typescript
// Styled component with props
const StyledButton = styled.button<{ $variant: string }>`
  background: ${props => props.$variant === 'primary' ? '#0969da' : 'transparent'};
  padding: 8px 16px;
  border-radius: 6px;
  
  &:hover {
    opacity: 0.9;
  }
`;
```

**Convention:** Prefix transient props with `$` so they don't pass to DOM.

---

### Vite (Build Tool)
**What:** Bundles your code for production  
**Why:** 
- Fast development (HMR - Hot Module Replacement)
- Optimized production builds
- Tree-shaking (removes unused code)

**What it does:**
1. **Dev:** Serves code instantly, updates on save
2. **Build:** Creates optimized bundles
3. **Outputs:** ES modules (modern) + CommonJS (legacy)

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    lib: {
      formats: ['es', 'cjs'],  // Both formats for compatibility
    },
    rollupOptions: {
      external: ['react', 'react-dom'],  // Don't bundle peer deps
    },
  },
});
```

**Why external?** Users install React themselves; don't bundle it twice.

---

### pnpm (Package Manager)
**What:** Installs and manages dependencies  
**Why:** 
- Faster than npm (uses symlinks)
- Saves disk space
- Workspace support for monorepos

**Monorepo:** Multiple packages in one repo (tokens, primitives, components)

```bash
# Workspace commands
pnpm install                                    # Install all
pnpm --filter @design-system/primitives build  # Build one package
pnpm -r build                                   # Build all packages
```

**Production Use:** Used by Vue, Vite, and growing adoption

---

### Vitest (Testing)
**What:** Test runner for Vite projects  
**Why:** 
- Fast (uses Vite's transform pipeline)
- Compatible with Jest APIs
- TypeScript support out of the box

**What to test:**
- Component renders correctly
- Props affect output
- User interactions work
- Accessibility (ARIA attributes)

```typescript
// Component test
test('Button calls onClick when clicked', () => {
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  
  fireEvent.click(screen.getByText('Click me'));
  expect(handleClick).toHaveBeenCalledOnce();
});
```

**Best Practice:** Test behavior, not implementation details.

---

### React Testing Library
**What:** Test React components like users do  
**Why:** 
- Encourages accessible markup
- Tests what users see/do
- Industry standard

**Key Principle:** "The more your tests resemble how users interact, the more confidence they give you."

```typescript
// Good: Test what user sees
expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();

// Bad: Test implementation
expect(wrapper.find('.submit-button')).toHaveLength(1);
```

**Production Use:** Used by Primer, Material-UI, every major DS

---

### Storybook (Documentation)
**What:** Interactive component playground  
**Why:** 
- Visual development
- Living documentation
- Design/dev collaboration
- Test different states

**Stories = Examples:**

```typescript
// Button.stories.tsx
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Click me',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    children: 'Disabled',
    disabled: true,
  },
};
```

**Production Use:** 
- Primer: https://primer.style/react/storybook
- Material-UI: Uses Storybook internally
- Shopify Polaris: https://polaris.shopify.com

**Best Practice:** Show all component states (default, hover, disabled, loading, error)

---

### ESLint + Prettier (Code Quality)
**What:** 
- ESLint: Finds code problems
- Prettier: Formats code consistently

**Why:** 
- Catches bugs before runtime
- Consistent code style across team
- Enforces best practices

**Key Rules We Use:**
```javascript
'react-hooks/rules-of-hooks': 'error',        // Correct Hook usage
'jsx-a11y/alt-text': 'error',                 // Accessibility
'@typescript-eslint/no-explicit-any': 'warn', // Avoid loose types
```

**Production Standard:** Every professional project uses linting.

---

## 📐 Industry Best Practices

### 1. Component API Design

**Props should be:**
- **Intuitive** - Names match user mental model
- **Consistent** - Similar props across components
- **Flexible** - Support common use cases
- **Typed** - TypeScript catches errors

```typescript
// ✅ Good: Clear, consistent
<Button variant="primary" size="md" loading>
  Submit
</Button>

// ❌ Bad: Inconsistent naming
<Button type="main" big spinnerVisible>
  Submit
</Button>
```

**Primer convention:** variant, size, disabled, loading

---

### 2. Accessibility (a11y)

**Must-haves:**
- Semantic HTML (`<button>` not `<div>`)
- ARIA labels for icons
- Keyboard navigation (Tab, Enter, Escape)
- Focus indicators
- Screen reader support

```typescript
// ✅ Accessible button
<button 
  aria-label="Close dialog"
  onClick={onClose}
>
  <CloseIcon />
</button>

// ❌ Not accessible
<div onClick={onClose}>
  <CloseIcon />
</div>
```

**Production Standard:** WCAG 2.1 AA compliance minimum

---

### 3. Component Composition

**Build small, compose big:**

```typescript
// Small pieces
<Box>
  <Flex gap={2}>
    <Avatar src="/user.jpg" />
    <Text>John Doe</Text>
  </Flex>
</Box>

// Not: <UserCard> with everything built-in
```

**Why:** Flexibility. Users can create variations without new components.

**Primer approach:** Primitives (Box, Flex) + Components (Button, Input)

---

### 4. Design Tokens

**What:** Design decisions as data (JSON)

```json
{
  "color": {
    "blue": {
      "500": "#0969da"
    }
  },
  "spacing": {
    "2": "8px"
  }
}
```

**Transform to:**
- CSS variables: `--color-blue-500: #0969da;`
- TypeScript: `tokens.color.blue[500]`
- Documentation: Storybook addons

**Why:** Single source of truth, easy theme changes, designer-developer sync

**Production Use:** Every modern DS (Primer, Material, Polaris)

---

### 5. Versioning & Publishing

**Semantic Versioning (semver):**
- **Major (1.0.0 → 2.0.0):** Breaking changes
- **Minor (1.0.0 → 1.1.0):** New features, backward compatible
- **Patch (1.0.0 → 1.0.1):** Bug fixes

**npm Publishing:**
```json
{
  "name": "@company/design-system",
  "version": "1.2.3",
  "main": "./dist/index.cjs",     // CommonJS
  "module": "./dist/index.mjs",   // ES modules
  "types": "./dist/index.d.ts"    // TypeScript types
}
```

**Best Practice:** Changelog for every release (what changed)

---

### 6. Documentation Standards

**Every component needs:**
1. **Props table** - What props, types, defaults
2. **Examples** - Common use cases
3. **Accessibility notes** - Keyboard, screen reader
4. **Do's and Don'ts** - When to use/not use

**Storybook provides:** Auto-generated props table, live examples

---

### 7. Testing Strategy

**Three levels:**

1. **Unit Tests** (Vitest + RTL)
   - Component renders
   - Props work
   - Events fire

2. **Visual Tests** (Storybook + Chromatic)
   - Components look right
   - All states covered

3. **Accessibility Tests** (jest-axe)
   - ARIA correct
   - Keyboard works

**Coverage target:** 80%+ for production systems

---

## 🚀 Production-Ready Checklist

### Per Component:
- [ ] TypeScript types exported
- [ ] Accessible (keyboard, ARIA, semantic HTML)
- [ ] Tested (unit tests pass)
- [ ] Documented (Storybook story)
- [ ] Responsive (works on mobile)
- [ ] Error states handled
- [ ] Loading states if async

### Per Release:
- [ ] All tests passing
- [ ] TypeScript compiles with no errors
- [ ] Storybook builds successfully
- [ ] Changelog updated
- [ ] Version bumped (semver)
- [ ] npm package published
- [ ] Git tag created

---

## 🏗️ How Production DSs Are Built

### 1. GitHub Primer (GitHub)
**Structure:**
- Monorepo with pnpm workspaces
- Packages: primitives, css, react, octicons
- Storybook for docs
- Changesets for versioning

**Convention:**
- Components in PascalCase
- Props use full words (disabled not isDisabled)
- sx prop for style overrides

### 2. Material-UI (Google)
**Structure:**
- Monorepo with yarn workspaces
- Packages: @mui/material, @mui/system, @mui/icons
- Extensive theming system

**Convention:**
- component prop for polymorphic components
- classes prop for style overrides

### 3. Polaris (Shopify)
**Structure:**
- Monorepo
- React components
- Design tokens
- Built-in documentation site

---

## 🎓 Key Takeaways

### For Designers:
1. **Tokens = Figma Variables** - Same concept, different format
2. **Components = Figma Components** - Reusable, documented
3. **Storybook = Interactive Specs** - Live examples replace static specs
4. **Props = Component Options** - Like Figma variants

### For Code:
1. **TypeScript catches errors** - Like spell-check for code
2. **Tests give confidence** - Know when you break something
3. **Storybook is your canvas** - See components as you build
4. **Small components compose** - Like Lego blocks

### Production Standards:
1. **Accessibility is not optional** - Legal + ethical requirement
2. **Documentation is part of the component** - Not an afterthought
3. **Tests prove it works** - No manual testing for every change
4. **Versioning communicates impact** - Users know what changed

---

## 📚 Learn More

When you want to dive deeper:
- **TypeScript:** typescriptlang.org/docs
- **React:** react.dev
- **Accessibility:** w3.org/WAI/ARIA/apg
- **Testing:** testing-library.com
- **Storybook:** storybook.js.org

---

**Now you understand the "why" behind everything. Let's build! 🚀**

