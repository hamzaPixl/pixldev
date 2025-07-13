# PureLanding - Development Guidelines

## Project Overview

PureLanding is a modern landing page built with Next.js 15, Shadcn/UI, Tailwind CSS, and TypeScript. It features a multi-language system, theme switching, and modular component architecture.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI + Radix UI
- **Icons**: Lucide React
- **Animation**: Motion (Framer Motion successor)
- **Themes**: next-themes

## Project Structure

```
/
├── app/                          # App Router directory
│   ├── globals.css              # Global styles & CSS variables
│   ├── layout.tsx               # Root layout with providers
│   └── page.tsx                 # Homepage component
├── components/                   # Feature components
│   ├── ui/                      # Shadcn/UI base components
│   ├── navbar/                  # Navigation components
│   ├── hero.tsx                 # Landing sections
│   ├── features.tsx
│   ├── pricing.tsx
│   ├── testimonials.tsx
│   ├── faq.tsx
│   ├── cta-banner.tsx
│   ├── footer.tsx
│   ├── theme-toggle.tsx
│   └── language-switcher.tsx
├── lib/                         # Utilities & configurations
│   ├── translations/           # i18n translation files
│   ├── language-context.tsx    # Language context provider
│   └── utils.ts                # Utility functions (cn, etc.)
├── hooks/                       # Custom React hooks
│   ├── useTranslate.ts         # Translation hook
│   └── index.ts                # Hook exports
└── public/                      # Static assets
```

## Code Style & Conventions

### File Naming
- **Components**: PascalCase (e.g., `Hero.tsx`, `NavMenu.tsx`)
- **Hooks**: camelCase with 'use' prefix (e.g., `useTranslate.ts`)
- **Utilities**: camelCase (e.g., `utils.ts`)
- **Types**: PascalCase with descriptive names

### Component Patterns

#### 1. Component Structure
```tsx
// Standard component pattern
import { ComponentProps } from "react";

interface ComponentNameProps {
  // Props interface
}

const ComponentName = ({ prop1, prop2, ...props }: ComponentNameProps) => {
  return (
    <div className="...">
      {/* Component JSX */}
    </div>
  );
};

export default ComponentName;
```

#### 2. UI Component Pattern (Shadcn/UI)
```tsx
// UI components use forwardRef and cva for variants
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const componentVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "...",
        secondary: "...",
      },
      size: {
        default: "...",
        lg: "...",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    }
  }
);

export interface ComponentProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {
  asChild?: boolean;
}

const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <element
        className={cn(componentVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Component.displayName = "Component";

export { Component, componentVariants };
```

### CSS & Styling

#### Tailwind Configuration
- **Design System**: Uses CSS variables for colors (HSL format)
- **Dark Mode**: Class-based dark mode switching
- **Custom Screens**: `xs: 375px` breakpoint added
- **Border Radius**: CSS variable-based (`--radius`)
- **Animations**: Custom marquee animations for logo clouds

#### Class Naming Conventions
- Use Tailwind utility classes primarily
- Combine with `cn()` utility for conditional classes
- Responsive prefixes: `xs:`, `sm:`, `md:`, `lg:`, `xl:`
- Dark mode: `dark:` prefix

```tsx
// Examples
className="mt-6 max-w-[20ch] text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold"
className={cn("base-classes", condition && "conditional-classes", className)}
```

### State Management

#### Context Pattern
```tsx
// Context provider pattern used for language management
interface ContextType {
  value: string;
  setValue: (value: string) => void;
}

const Context = createContext<ContextType | undefined>(undefined);

export function Provider({ children }: { children: ReactNode }) {
  const value = useHook();
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useContext() {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error('useContext must be used within a Provider');
  }
  return context;
}
```

### Internationalization (i18n)

#### Translation Structure
```typescript
// Translation files structure
export const en = {
  common: {},
  navigation: {},
  hero: {},
  features: {},
  pricing: {},
  testimonials: {},
  cta: {},
  faq: {},
  footer: {},
};
```

#### Usage Pattern
```tsx
// Component using translations
import { useLanguage } from '@/lib/language-context';

const Component = () => {
  const { t } = useLanguage();
  
  return <h1>{t('hero.title')}</h1>;
};
```

### Component Architecture

#### Section Components
- Each landing page section is a separate component
- Self-contained with own styling and content
- Responsive design with mobile-first approach
- Consistent spacing: `py-12 xs:py-20 px-6`

#### Navigation Structure
```
navbar/
├── index.ts          # Export barrel
├── navbar.tsx        # Main navbar container
├── logo.tsx          # Logo component
├── nav-menu.tsx      # Desktop navigation menu
└── navigation-sheet.tsx # Mobile navigation drawer
```

### Asset Management

#### Icons
- Primary: Lucide React icons
- Usage: `import { IconName } from "lucide-react"`
- Size classes: `h-4 w-4`, `h-5 w-5`, `h-6 w-6`

#### Images
- Favicon set: Multiple sizes (16x16, 32x32, 192x192, 512x512)
- Format: PNG for icons, WebP for images
- Location: `/public/` directory

### Performance Optimizations

#### Next.js Features
- App Router for modern routing
- Turbopack for faster development builds
- Static generation for landing pages
- Built-in optimization for fonts (Geist)

#### Bundle Optimization
- Tree shaking with ES modules
- Component lazy loading where appropriate
- Optimized Tailwind CSS purging

## Development Workflow

### Scripts
```bash
npm run dev        # Development server with Turbopack
npm run build      # Production build
npm run start      # Production server
npm run lint       # ESLint checks
```

### Build Considerations
- Zero-config TypeScript setup
- ESLint integration with Next.js rules
- PostCSS with Tailwind CSS processing
- Automatic static optimization

## Common Patterns

### 1. Feature Data Arrays
```tsx
const features = [
  {
    icon: IconComponent,
    title: "Feature Title",
    description: "Feature description...",
  },
  // ...more features
];

// Render with map
{features.map((feature) => (
  <div key={feature.title}>
    <feature.icon className="h-6 w-6" />
    <h3>{feature.title}</h3>
    <p>{feature.description}</p>
  </div>
))}
```

### 2. Responsive Typography
```tsx
// Consistent heading pattern
<h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
  Heading Text
</h1>
```

### 3. Button Patterns
```tsx
// Primary CTA
<Button size="lg" className="w-full sm:w-auto rounded-full">
  Get Started <ArrowUpRight className="!h-5 !w-5" />
</Button>

// Secondary button
<Button variant="outline" size="lg" className="rounded-full shadow-none">
  Learn More
</Button>
```

### 4. Container Patterns
```tsx
// Section container
<div className="w-full py-12 xs:py-20 px-6">
  <div className="max-w-screen-lg mx-auto">
    {/* Content */}
  </div>
</div>
```

## Theme System

### CSS Variables
Located in `app/globals.css`, uses HSL color space:
```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  /* ... */
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  /* ... */
}
```

### Theme Toggle Implementation
- Uses `next-themes` for system/light/dark mode
- Persistent across page loads
- Automatic system preference detection

## Best Practices

### 1. Component Design
- Keep components focused and single-purpose
- Use TypeScript interfaces for props
- Implement proper prop forwarding with `forwardRef`
- Use composition over inheritance

### 2. Styling
- Mobile-first responsive design
- Use semantic color tokens (primary, secondary, etc.)
- Consistent spacing scale
- Avoid hardcoded colors

### 3. Accessibility
- Proper semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Color contrast compliance

### 4. Performance
- Minimize client-side JavaScript
- Use static generation where possible
- Optimize images and assets
- Tree shake unused code

## Future Considerations

### Potential Enhancements
- Animation library integration (Framer Motion)
- CMS integration for content management
- Advanced analytics implementation
- Progressive Web App features
- Advanced form handling

### Internationalization Expansion
- Complete translation implementation
- RTL language support
- Date/number localization
- Cultural adaptations

### SEO Improvements
- Structured data implementation
- Advanced meta tag optimization
- Sitemap generation
- Performance monitoring

## Commands Reference

```bash
# Development
npm run dev              # Start development server
npm run build           # Create production build
npm run start           # Start production server
npm run lint            # Run ESLint

# Project Analysis
npm list               # View dependencies
npm outdated          # Check for updates
npm audit             # Security audit
```

## Dependencies Management

### Core Dependencies
- Keep Next.js updated to latest stable
- Monitor Radix UI updates for accessibility improvements
- Regular Tailwind CSS updates for new features
- TypeScript version compatibility

### Update Strategy
1. Test updates in development environment
2. Check breaking changes in changelogs
3. Update dependencies incrementally
4. Run full test suite after updates