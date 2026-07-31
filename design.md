# Open Box Design System & Architecture

This document details the visual style, design choices, and user experience components of the Open Box website.

---

## 🎨 Theme & Colors

Open Box uses a custom high-contrast dark theme by default, with support for light theme toggling via `next-themes`. Colors are defined as CSS custom variables in HSL format for flexible opacity management.

### Dark Theme (Default)
- **Background**: `hsl(0 0% 4%)` (#0a0a0a)
- **Foreground**: `hsl(0 0% 96%)` (#f5f5f5)
- **Card**: `hsl(0 0% 7%)` (#111111)
- **Border/Input**: `hsl(0 0% 12%)` (#1f1f1f)
- **Muted Foreground**: `hsl(0 0% 65%)` (#a6a6a6)
- **Background Gradient Accent**: `linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0) 240px)`

### Light Theme
- **Background**: `hsl(0 0% 98%)` (#fafafa)
- **Foreground**: `hsl(0 0% 8%)` (#141414)
- **Card**: `hsl(0 0% 100%)` (#ffffff)
- **Border/Input**: `hsl(0 0% 88%)` (#e0e0e0)
- **Muted Foreground**: `hsl(0 0% 40%)` (#666666)
- **Background Gradient Accent**: `linear-gradient(180deg, rgba(0,0,0,0.015), rgba(0,0,0,0) 240px)`

### Server Gradients
Each sub-community or Discord server has a dedicated gradient color scheme:
- **Junction [Jn.]**: `from-rose-500 to-amber-300` ( Students & Curiosity)
- **OB Dev**: `from-green-400 to-emerald-600` (Developers & Technical reviews)
- **OB GG**: `from-red-500 to-rose-700` (Gaming & Tournaments)
- **OB Study**: `from-violet-400 to-fuchsia-500` (Focused Study Rooms)
- **OB Connect**: `from-orange-300 to-red-500` (Networking & Careers)

---

## 🔤 Typography

Google Fonts are loaded via Google Fonts CDN in `app/globals.css`:
*   **Headings (`h1`, `h2`, `h3`)**: **Syne** (Geometrical, bold, and modern font family)
*   **Body Text (`p`, `span`, `div`, etc.)**: **Inter** (Highly legible, crisp sans-serif font family)

### Font Scale Classes (Tailwind)
- **H1**: `font-heading text-5xl font-extrabold leading-tight tracking-normal sm:text-6xl`
- **H2**: `font-heading text-4xl font-bold leading-tight tracking-normal`
- **H3**: `font-heading text-2xl font-bold leading-tight tracking-normal`

---

## 🧩 Key Design Components

The UI is built with Tailwind CSS, leveraging Radix UI primitives and shadcn/ui. Below are the custom layout components:

1.  **Navbar (`components/Navbar.tsx`)**
    - Fixed at `top-0` with `backdrop-blur` and glassmorphic opacity using the `--surface` variable.
2.  **Footer (`components/Footer.tsx`)**
    - Grid-based layout featuring server directories, legal directories, contact fields, and copyright tags.
3.  **LoadingScreen (`components/LoadingScreen.tsx`)**
    - Full-screen initialization layout showing a custom loading animation before showing the landing page.
4.  **WhatsNewTab (`components/WhatsNewTab.tsx`)**
    - Floating interactive tab displaying recent platform updates, bug fixes, and announcements.
5.  **ConsentBanner (`components/ConsentBanner.tsx`)**
    - Custom slide-in banner for managing cookies and GDPR/privacy logging.
6.  **SecurityGuard (`components/SecurityGuard.tsx`)**
    - Client-side checks ensuring route parameters, request headers, and user auth state parameters are consistent.

---

## ✨ Animations & Visual Effects

Open Box implements smooth animations to improve UI immersion:
*   **Framer Motion**: Used for fluid page transitions, cards sliding/revealing on scroll, hover transformations on buttons/cards, and dynamic component mounts.
*   **GSAP (GreenSock)**: Integrated for timeline-driven, high-performance scroll triggers, complex multi-step UI reveals, and landing page interactive elements.
*   **Transitions**: Tailwind utility `transition-all duration-200` is used for hover effects on buttons and theme switches (dark <-> light).

---

## 📱 Responsiveness

We enforce a **Mobile-First** layout flow:
- All cards and tables display as stacks or collapse vertically on screens `< 768px` (mobile sizes).
- Margins and padding scale dynamically (e.g. `p-4 md:p-8`).
- Header sizes adapt from `text-5xl` to `sm:text-6xl`.
