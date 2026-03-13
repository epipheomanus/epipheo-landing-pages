# Quokka's Wild Life Landing Page — Design Brainstorm

<response>
<text>
## Idea 1: "Cinematic Noir Editorial"

**Design Movement:** Film noir meets modern editorial magazine — think Criterion Collection meets Bloomberg Businessweek.

**Core Principles:**
1. Pure black canvas with surgical use of cyan and orange-red as accent spotlights
2. Dramatic vertical rhythm — tall sections with generous breathing room
3. Typography as architecture — headlines are structural elements, not just text
4. Cinematic framing — every section feels like a movie scene

**Color Philosophy:** The black (#000) isn't just a background — it's a stage. Cyan (#00E5CC) is the spotlight that draws the eye to key moments. Orange-red (#FF5F3C) is the emotional punctuation mark, used sparingly for urgency. White exists only as body text at reduced opacity, creating depth layers.

**Layout Paradigm:** Full-bleed cinematic sections stacked vertically. Each section is a "scene" with its own visual treatment. Content is left-aligned in the hero and proof sections (editorial asymmetry), centered for impact moments (stats, CTA). No sidebar, no grid — pure vertical narrative flow.

**Signature Elements:**
1. Thin cyan timeline line running through the Proof section like a film strip
2. Pill-shaped CTAs with cyan glow on hover — the only rounded elements on the page
3. Frosted glass nav that materializes on scroll

**Interaction Philosophy:** Minimal but meaningful. Elements fade up as you scroll (not bounce or slide). Counters tick up when visible. Hover states are subtle glows, not dramatic transforms. The page should feel like it's revealing itself, not performing.

**Animation:** Fade-in-up with 0.6s ease for sections entering viewport. Counter animation with easeOutQuart curve. Nav background transitions over 300ms. Hover glow transitions at 200ms. No parallax — it would fight the editorial tone.

**Typography System:** Barlow Condensed ExtraBold (800) for ALL headlines, always uppercase, tight letter-spacing (-0.02em), tight line-height (0.95). DM Sans for body text at reduced white opacity. Space Mono for labels and stats — the "data" voice of the page.
</text>
<probability>0.08</probability>
</response>

<response>
<text>
## Idea 2: "Animated Storybook Parallax"

**Design Movement:** Interactive children's book illustration meets tech startup — playful depth with serious business intent.

**Core Principles:**
1. Layered parallax backgrounds using the show's art as environmental storytelling
2. Whimsical micro-animations on characters (subtle bob, breathe)
3. Rounded, friendly UI elements that echo the show's art style
4. Color temperature shifts section-to-section (forest green → jungle teal → desert warm)

**Color Philosophy:** Each section's background art dictates a local color temperature. The cyan accent ties everything together as a through-line. Orange-red appears only in CTA moments, creating warmth and urgency against the cool palette.

**Layout Paradigm:** Scrollytelling with parallax depth layers. Characters peek in from edges. Backgrounds shift with scroll position. Content cards float above the illustrated world.

**Signature Elements:**
1. Characters that animate subtly (breathing, blinking) when in viewport
2. Illustrated vine/leaf decorative elements between sections
3. Hand-drawn style borders on cards and callouts

**Interaction Philosophy:** Playful and discoverable. Characters react to scroll. Hover reveals character names with a bounce. The page feels alive, like the show's world extends beyond the screen.

**Animation:** Parallax scroll at 0.3x-0.7x rates for background layers. Character idle animations (CSS keyframes, 3-4s loops). Section transitions with scale + fade. Bouncy easing (cubic-bezier(0.34, 1.56, 0.64, 1)) for interactive elements.

**Typography System:** Barlow Condensed for headlines with slightly looser tracking. DM Sans rounded feel for body. Space Mono for technical data points. Larger type sizes overall to match the storybook feel.
</text>
<probability>0.04</probability>
</response>

<response>
<text>
## Idea 3: "Swiss Brutalist Dark"

**Design Movement:** Swiss International Style meets dark-mode brutalism — Massimo Vignelli's grid discipline applied to a midnight canvas.

**Core Principles:**
1. Rigid grid system with mathematical spacing (8px base unit)
2. Extreme typographic hierarchy — headline sizes jump dramatically
3. Raw, undecorated surfaces — no gradients, no shadows, just color and type
4. Information density balanced with generous margins

**Color Philosophy:** Black is absolute. White text at varying opacities creates a grayscale depth system (100%, 70%, 50%, 30%). Cyan is the only chromatic color — used for interactive elements and data. Orange-red reserved exclusively for the primary CTA.

**Layout Paradigm:** 12-column grid with strict alignment. Content blocks snap to grid intersections. Asymmetric but mathematically precise. Large left margins for labels, content pushed right. Stats in a rigid 4-column grid.

**Signature Elements:**
1. Oversized step numbers (01-06) in the timeline, set in Space Mono at 4rem+
2. Hard horizontal rules between sections instead of gradients
3. Monospaced metadata labels aligned to a strict left margin

**Interaction Philosophy:** Functional, not decorative. Hover states change color, nothing moves. Scroll triggers are instant reveals, not animations. The page respects the user's time — no waiting for animations to complete.

**Animation:** Instant opacity transitions (0.15s) for scroll reveals. No easing curves — linear transitions only. Counter increments at fixed intervals (no smooth interpolation). The brutalist approach: if it moves, it moves with purpose and speed.

**Typography System:** Barlow Condensed at extreme sizes (7rem+ for hero, 4.5rem for section heads). Space Mono for ALL labels and metadata. DM Sans only for paragraph body text. Strict size scale: 12px, 14px, 18px, 24px, 36px, 48px, 72px, 96px.
</text>
<probability>0.06</probability>
</response>

---

## Selected Approach: Idea 1 — "Cinematic Noir Editorial"

This approach best matches the source design from Home.tsx and the client-facing premium feel required. The pure black stage, editorial asymmetry, and cinematic section framing align perfectly with Epipheo's brand positioning as a serious production company. The design treats the page as a narrative experience — each section is a "scene" that builds toward the CTA climax.
