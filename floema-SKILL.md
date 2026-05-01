# SKILL.md — Floema Design System
> Reference: https://www.floema.com
> Style: Refined Minimalist / European Industrial / Sustainable Product

---

## Design Philosophy

**"Spaces for people, made for life."**

Floema's aesthetic is **purposeful restraint**. Every element earns its place.
The design communicates quality, durability, and sustainability through what it removes, not what it adds.
Never decorative for its own sake — structural clarity is the decoration.

---

## Aesthetic Direction

- **Tone:** Refined minimalist × European industrial × Organic warmth
- **Feeling:** Calm confidence. Premium without ostentation. Built to last.
- **Avoid:** Drop shadows, gradients, rounded corners (>4px), stock-photo vibes, busy layouts, bright accent colors

---

## Color Palette

```css
:root {
  /* Backgrounds */
  --bg-primary:    #F7F5F2;   /* warm off-white — main canvas */
  --bg-secondary:  #EDEAE5;   /* slightly darker warm grey */
  --bg-dark:       #1C1C1A;   /* near-black for footer / dark sections */

  /* Text */
  --text-primary:  #1A1A18;   /* warm near-black */
  --text-muted:    #7A7874;   /* medium warm grey */
  --text-light:    #B0ABA5;   /* light warm grey — captions, labels */

  /* Borders & Dividers */
  --border:        #D8D4CE;   /* subtle warm grey border */
  --border-dark:   #3A3A38;   /* for dark sections */

  /* Accent — use sparingly */
  --accent:        #4A6741;   /* muted olive green — sustainability signal */
  --accent-warm:   #C8521A;   /* terracotta — CTAs only */
}
```

---

## Typography

### Font Stack
```css
/* Primary — geometric sans with warmth */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=DM+Serif+Display:ital@0;1&display=swap');

:root {
  --font-display: 'DM Serif Display', Georgia, serif;  /* hero titles, product names */
  --font-body:    'DM Sans', system-ui, sans-serif;     /* all body text */
}
```

### Type Scale
```css
.text-hero    { font-size: clamp(3rem, 6vw, 6rem);   font-family: var(--font-display); font-weight: 400; line-height: 1.05; letter-spacing: -0.02em; }
.text-h1      { font-size: clamp(2rem, 4vw, 3.5rem); font-family: var(--font-display); font-weight: 400; line-height: 1.15; }
.text-h2      { font-size: clamp(1.4rem, 2.5vw, 2rem); font-weight: 300; line-height: 1.3; }
.text-label   { font-size: 0.7rem;  font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-light); }
.text-body    { font-size: 0.95rem; font-weight: 300; line-height: 1.85; color: var(--text-muted); }
.text-caption { font-size: 0.75rem; font-weight: 400; color: var(--text-light); }
```

### Rules
- Headings: `font-weight: 300` or `400` only. Never bold for display text.
- Body: always `font-weight: 300`, generous `line-height: 1.8+`
- Labels / categories: ALL CAPS, `letter-spacing: 0.1em+`, small size
- Italic serif for product names or emphasis moments — use sparingly

---

## Spacing System

```css
:root {
  --space-xs:  0.5rem;    /*  8px */
  --space-sm:  1rem;      /* 16px */
  --space-md:  2rem;      /* 32px */
  --space-lg:  4rem;      /* 64px */
  --space-xl:  7rem;      /* 112px */
  --space-2xl: 12rem;     /* 192px */
}
```

**Principle:** Sections breathe. Use `--space-xl` between major sections.
Never compress. When in doubt, add more space.

---

## Layout

### Grid
```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2.5rem;
}

/* Product specs — 2 column label + value */
.spec-grid {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 0;
  border-top: 1px solid var(--border);
}

/* Asymmetric hero — text left, visual right */
.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 80vh;
  align-items: center;
}

/* Product collection — 3 or 4 column cards */
.collection-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1px;  /* tight gap — border effect */
  background: var(--border);  /* creates grid lines */
}

.collection-card {
  background: var(--bg-primary);
  padding: var(--space-lg);
}
```

### Key Layout Patterns
- **No rounded corners** on cards. `border-radius: 0` or max `2px`
- **1px borders** as structural dividers, never shadows
- **Full-bleed sections** alternating with contained content
- **Sticky nav** — minimal, borderless on scroll

---

## Navigation

```css
nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  padding: 1.5rem 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(247, 245, 242, 0.9);
  backdrop-filter: blur(8px);
  z-index: 100;
  /* NO border-bottom by default — appears only on scroll */
}

.nav-logo {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 400;
  letter-spacing: 0.02em;
}

.nav-link {
  font-size: 0.8rem;
  font-weight: 400;
  letter-spacing: 0.06em;
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.2s;
}
```

---

## Product Page Components

### Spec Table
```html
<div class="spec-section">
  <div class="spec-row">
    <span class="spec-label">Dimensions</span>
    <span class="spec-value">2000 × 554 × 465 mm</span>
  </div>
  <div class="spec-row">
    <span class="spec-label">Materials</span>
    <span class="spec-value">Recycled plastic · Galvanised steel</span>
  </div>
</div>
```

```css
.spec-row {
  display: grid;
  grid-template-columns: 160px 1fr;
  padding: var(--space-sm) 0;
  border-bottom: 1px solid var(--border);
  align-items: baseline;
}

.spec-label {
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-light);
}

.spec-value {
  font-size: 0.9rem;
  font-weight: 300;
  color: var(--text-primary);
}
```

### Color Swatch Grid
```css
.color-swatches {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.swatch {
  width: 32px;
  height: 32px;
  border: 1px solid var(--border);
  cursor: pointer;
  transition: transform 0.2s;
}

.swatch:hover { transform: scale(1.15); }
.swatch.active { outline: 2px solid var(--text-primary); outline-offset: 2px; }
```

### CTA Button
```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 2rem;
  background: var(--text-primary);
  color: var(--bg-primary);
  font-size: 0.8rem;
  font-weight: 400;
  letter-spacing: 0.08em;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: background 0.25s;
}

.btn-primary:hover { background: var(--accent-warm); }

.btn-ghost {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border);
}

.btn-ghost:hover {
  border-color: var(--text-primary);
  background: transparent;
}
```

---

## Decorative Elements

### Wireframe SVG Illustrations
Floema uses thin-line wireframe SVGs of products as footer/background decoration.
```css
.wireframe-illustration {
  opacity: 0.12;
  position: absolute;
  pointer-events: none;
  /* Place at section edges — bottom-right, bottom-left */
}
```

### Section Dividers
```css
/* Horizontal rule — always 1px, full width */
.divider {
  width: 100%;
  height: 1px;
  background: var(--border);
  margin: var(--space-xl) 0;
}

/* Number labels for sections */
.section-num {
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-light);
  margin-bottom: var(--space-sm);
}
```

---

## Animation Principles

- **Subtle only.** No bounces, no elastic easing.
- Fade + slight upward translation on scroll reveal: `translateY(16px)` → `translateY(0)`
- Duration: `0.6s–0.9s`, easing: `cubic-bezier(0.25, 0, 0.1, 1)`
- Page transitions: opacity fade, 300ms
- Hover states: `transition: 0.2s–0.25s ease`

```css
.reveal {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.8s cubic-bezier(0.25, 0, 0.1, 1),
              transform 0.8s cubic-bezier(0.25, 0, 0.1, 1);
}
.reveal.visible {
  opacity: 1;
  transform: none;
}
```

---

## Image Treatment

- Product shots: **white or very light warm grey background** only
- No lifestyle photography with people in hero positions
- Technical diagrams / wireframes as supplementary visuals
- Images never have borders, shadows, or border-radius
- Aspect ratios: product cards `4:3`, hero `16:9` or `3:2`

---

## Writing Style (Copy)

- **Short sentences.** Never more than 2 lines per paragraph in product context.
- Lead with function: *"When flexibility is needed, this bench responds."*
- Sustainability language: matter-of-fact, never preachy
- Feature lists: noun phrases only, no verbs (*"No maintenance required"* not *"You don't need to maintain it"*)
- Tone: confident, calm, European precision

---

## Anti-patterns (Never Do)

❌ Gradients of any kind  
❌ Box shadows (use borders instead)  
❌ Bright or saturated accent colors  
❌ Border-radius > 2px  
❌ Icon libraries (Heroicons, Font Awesome etc.) — use text arrows (→ ↓) or custom SVG  
❌ Card hover animations that move more than 3px  
❌ Centered body text (left-align always)  
❌ More than 2 font families  
❌ Background images behind text  
❌ Animations on every element — pick 2–3 moments that matter  

---

## Quick Reference Checklist

Before shipping any page built in this style:

- [ ] Spacing feels generous — sections breathe
- [ ] Typography weight is light (300) for body, display for headings
- [ ] No shadows anywhere — borders only
- [ ] Color palette stays within defined vars
- [ ] Mobile: single column, same spacing rhythm
- [ ] CTAs: max 1 primary per section
- [ ] All caps labels have `letter-spacing: 0.1em+`
- [ ] Images: no border-radius, no shadow
