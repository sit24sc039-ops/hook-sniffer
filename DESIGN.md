# Design Brief

**Hook Sniffer** — Sleek, tactical anti-phishing cybersecurity app with neon-accented dark mode. Deep blacks create a "secure fortress"; neon green signals active threat scanning and high-alert states. No soft corners, no pastels.

## Tone

Ruthlessly technical, high-alert cybersecurity dashboard. Tactical, scanner-like UI inspired by security operations centers. Minimal decoration, maximum clarity on threat status.

## Palette

| Token | OKLCH | Purpose |
|-------|-------|---------|
| `background` | `0.145 0 0` | Deep black app base |
| `card` | `0.18 0 0` | Lifted card surface, tactical grey |
| `foreground` | `0.95 0 0` | Near-white scanner readout text |
| `accent` (primary) | `0.72 0.28 145` | Neon green—threat alerts, active states, scanning indicators |
| `destructive` | `0.65 0.19 22` | Red—high-risk threats, warnings |
| `muted` | `0.22 0 0` | Subtle dividers and disabled states |
| `border` | `0.28 0 0` | Card + section borders, tactical definition |

## Typography

- **Display**: General Sans (geometric, modern confidence for logo + headings)
- **Body**: DM Sans (neutral legibility for info-dense scanning UI)
- **Mono**: Geist Mono (technical telemetry for threat codes, timestamps, URLs)
- **Scale**: 12/14/16/18/20/24/32 px (tight hierarchy for scanning clarity)

## Elevation & Depth

No large drop shadows. Use **borders** + **minimal lifting** for hierarchy:
- `card`: 1px border-border, bg-card
- Threat modals: 1px border-accent (neon green) + semi-transparent backdrop
- Buttons: 1px border-accent on hover/active, solid bg-accent
- Inputs: 1px inset border-input, minimal visual weight

## Structural Zones

| Zone | Treatment |
|------|-----------|
| Header/Status Bar | `bg-card`, `border-b-border`, threat status pill with accent highlight |
| Main Content | `bg-background`, cards with `border-border` 1px, spaced grid |
| Bottom Nav (5 tabs) | `bg-card`, highlight current tab with `bg-accent`, minimal padding |
| Modals (Threat Alerts) | Backdrop with opacity, card with `border-accent`, neon border accent |

## Spacing & Rhythm

**Density**: 2×, 4×, 8×, 12×, 16×, 24× px scale. Compact layout (mobile-first) for rapid threat scanning. Breathing room between threat cards (16px gap).

## Component Patterns

- **Security Score**: Circular progress, accent color at 100%, muted at 0%
- **Threat Alert**: Modal with neon green border, "🚨" icon, action buttons (Delete/Ignore)
- **Scan Animation**: Radar pulse using `scan-pulse` keyframe (2s cycle)
- **Threat Cards**: Left border-accent accent bar, mono font for URLs + risk score
- **Bottom Nav**: 5 tabs, active tab bg-accent + text-primary-foreground, inactive text-muted-foreground

## Motion

- **Smooth transitions**: 0.3s cubic-bezier (default `transition-smooth` utility)
- **Scan radar**: `animate-scan-pulse` (2s infinite pulse)
- **Threat alert modal**: `animate-threat-alert` (1.5s breathing)
- **Shield icon**: `animate-shield-bounce` on new threat detection
- **Disabled**: No animations on disabled states

## Constraints

- ✓ Dark mode only (class-based, `.dark`)
- ✓ Mobile-first responsive (sm, md, lg breakpoints)
- ✓ No gradients, no soft shadows, no glass morphism
- ✓ Token-only colors (no arbitrary hex/rgb values)
- ✓ High contrast for accessibility (foreground/background ≥ 0.7 L diff)
- ✓ Accent used sparingly: threat indicators, active states, CTAs

## Signature Detail

**Neon-accented border interrupts**: Threat modals, threat cards, and active buttons use neon green (`accent`) borders to signal urgency. This single detail creates visual identity and ensures threats are unmissable.
