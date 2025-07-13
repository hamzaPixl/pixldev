# Pixl Homepage — Real Software. Built with AI.

A modern, professional homepage for Pixl, an AI software agency that builds smart, AI-powered software and automations that solve real business problems. Built with Next.js 15, TypeScript, Tailwind CSS, and Shadcn UI.

## 🚀 Live Demo

[Visit Pixl](https://pixldev.be)

## 🎯 About Pixl

Pixl builds smart, AI-powered software and automations that solve real business problems, fast. From dashboards to full SaaS apps — we deliver solutions, not hype.

**Our Mission**: Real Tools, Not AI Noise. We build practical, effective solutions that work.

## ✨ Features

### 🎨 Design & UX

- **Modern Glassmorphism Design** with backdrop blur effects
- **Smooth Scroll Animations** triggered by intersection observers
- **Responsive Layout** optimized for all devices
- **Dark/Light Theme** with clean white theme and professional dark theme
- **Pixl Green Branding** (#44b75e) with consistent color system

### 🔧 Technical Stack

- **Next.js 15** with App Router and TypeScript
- **Tailwind CSS** with custom design system
- **Shadcn UI** components for consistency
- **Embla Carousel** for case studies section
- **next-themes** for theme management
- **Lucide React** for icons

### 📱 Sections & Components

- **Hero Section** with animated title and scaling "Scale." word
- **About Section** with company information and metrics
- **Core Values** showcasing Pixl's approach
- **Capabilities** grid showing 8 key services
- **Case Studies** carousel with 2 projects + "You're Next" CTA
- **FAQ Section** with 3 focused questions
- **Contact Form** with glassmorphism design
- **Analytics Integration** (Google Analytics, Facebook Pixel, Hotjar, Plausible)

### 🎭 Interactive Elements

- **Scroll-triggered animations** for sections
- **Hover effects** with proper contrast in both themes
- **Smooth scrolling** navigation
- **Responsive carousel** showing 3 cards at once
- **Theme toggle** with system preference detection
- **Language switcher** (multi-language ready)

## 🛠️ Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or pnpm package manager

### Installation

1. **Clone the repository:**

```bash
git clone git@github.com:hamzaPixl/pixldev.git
cd pixldev
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start development server:**

```bash
npm run dev
```

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run start
```

## 📁 Project Structure

```
pixldev/
├── app/                        # Next.js App Router
│   ├── globals.css            # Global styles & CSS variables
│   ├── layout.tsx             # Root layout with providers
│   ├── page.tsx               # Homepage
│   ├── error.tsx              # 500 error page
│   └── not-found.tsx          # 404 error page
├── components/                # React components
│   ├── ui/                    # Shadcn UI components
│   │   ├── card.tsx
│   │   ├── carousel.tsx
│   │   └── button.tsx
│   ├── navbar/                # Navigation components
│   │   ├── navbar.tsx
│   │   ├── nav-menu.tsx
│   │   └── logo.tsx
│   ├── about-section.tsx      # About page section
│   ├── case-studies.tsx       # Case studies carousel
│   ├── contact.tsx            # Contact form
│   ├── faq-section.tsx        # FAQ section
│   ├── hero.tsx               # Hero section
│   ├── key-benefits.tsx       # Core values section
│   ├── what-we-build.tsx      # Capabilities grid
│   ├── scroll-animation.tsx   # Animation component
│   └── theme-toggle.tsx       # Theme switcher
├── lib/                       # Utilities
│   ├── analytics.ts           # Analytics integration
│   ├── language-context.tsx   # i18n context
│   └── utils.ts               # Utility functions
└── public/                    # Static assets
    ├── Logo Color.svg         # Pixl logo variants
    ├── favicon.ico
    └── images/
```

## 🎨 Customization

### Brand Colors

```css
/* CSS Variables in globals.css */
--pixl-teal: 140 49% 53%; /* #44b75e - Primary green */
--pixl-gold: 43 89% 70.2%; /* #f7c873 - Accent gold */
--pixl-dark: 0 0% 0%; /* #000000 - Dark theme */
```

### Theme System

- **Light Theme**: Clean white backgrounds with subtle borders
- **Dark Theme**: Pure black backgrounds with green accents
- **Automatic**: Follows system preference

### Analytics Configuration

Update analytics keys in `lib/analytics.ts`:

```typescript
export const analyticsConfig = {
  googleAnalytics: "GA_MEASUREMENT_ID",
  facebookPixel: "FACEBOOK_PIXEL_ID",
  hotjar: "HOTJAR_ID",
  plausible: "DOMAIN_NAME",
};
```

## 🔧 Development

### Adding New Sections

1. Create component in `components/`
2. Add to `app/page.tsx`
3. Update navigation in `components/navbar/nav-menu.tsx`
4. Add to footer links in `components/footer.tsx`

### Shadcn UI Components

Always use Shadcn components when available:

```bash
npx shadcn@latest add [component-name]
```

### Animation System

Use the `ScrollAnimation` component for scroll-triggered animations:

```tsx
<ScrollAnimation direction="up" delay={200}>
  <YourComponent />
</ScrollAnimation>
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables if needed
3. Deploy automatically on push to master

### Other Platforms

- **Netlify**: Works out of the box
- **Railway**: Full-stack deployment
- **Docker**: Use the included Dockerfile

## 📊 Analytics & Tracking

The website includes comprehensive analytics:

- **Google Analytics 4** for web analytics
- **Facebook Pixel** for social media tracking
- **Hotjar** for user behavior analytics
- **Plausible** for privacy-focused analytics

## 🌟 Key Features Deep Dive

### Smooth Animations

- **Hero Title**: Sequential fade-in with special scaling for "Scale."
- **Section Reveals**: Scroll-triggered animations with staggered delays
- **Hover Effects**: Consistent green hover states across all themes

### Case Studies Carousel

- **3-card display** on desktop, single card on mobile
- **Embla Carousel** for smooth scrolling
- **Green CTA card** for lead generation

### Contact Form

- **Glassmorphism design** with backdrop blur
- **Form validation** and smooth interactions
- **Responsive layout** adapting to all screen sizes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is proprietary and confidential. All rights reserved by Pixl SRL.

## 🏢 About Pixl SRL

**Pixl SRL**
TVA: BE 0805.449.693
Email: [contact@pixldev.be](mailto:contact@pixldev.be)
Phone: [+32 488 20 35 67](tel:+32488203567)

---

**Built with 🤖 Claude Code assistance**
_Co-Authored-By: Claude <noreply@anthropic.com>_
