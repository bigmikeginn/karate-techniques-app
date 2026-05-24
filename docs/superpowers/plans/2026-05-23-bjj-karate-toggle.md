# BJJ Karate Toggle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a top-level Karate/BJJ switch so students can browse either discipline with the same interface and behavior.

**Architecture:** Keep the existing home screen as the primary experience and make it discipline-aware. Store Karate and BJJ as separate data sets behind a small discipline registry, then have the UI choose the active data set based on a `discipline` state. Avoid routing changes unless later requested.

**Tech Stack:** Next.js App Router, React client state, TypeScript, Tailwind CSS, existing JSON technique format.

---

## File Structure

- Modify `src/types/technique.ts`
  - Add a `Discipline` type and optional display metadata only if needed by components.
- Create `src/data/bjj-techniques.json`
  - Broad BJJ category/technique data using the same shape as `techniques.json`, focused on widespread fundamentals and common classroom/competition techniques.
- Create `src/data/disciplines.ts`
  - Single registry for Karate and BJJ labels, data imports, short names, and theme hints.
- Modify `src/app/layout.tsx`
  - Rename metadata from Karate-only to martial arts technique library.
- Modify `src/app/page.tsx`
  - Use the discipline registry, add the desktop centered toggle, add a mobile-friendly toggle in/near the hamburger/sidebar area, reset filters when switching disciplines, and update labels/counts.
- Modify `src/data/technique_descriptions.ts`
  - Add BJJ description defaults and make fallback wording discipline-neutral.
- Modify `src/data/technique_translations.ts`
  - Keep Japanese-name behavior working for Karate and avoid forcing BJJ English terms through Japanese translation logic.
- Modify `src/lib/categoryColors.ts`
  - Add BJJ category colors or make color fallback stable for new BJJ slugs.
- Modify `README.md`
  - Update project description and data notes from Karate-only to Karate/BJJ.

## UX Decision

- Desktop: Put a two-option segmented control in the visual center of the sticky header, between the logo/title area and the search box. This matches the request and keeps the discipline switch always visible.
- Mobile: Keep the header compact. Put a small Karate/BJJ segmented control in the header row if it fits; also include the same switch at the top of the slide-out menu so it is still easy to reach. This is slightly better than hiding it only in the menu because switching disciplines is a core action.
- BJJ should use the exact same browsing pattern: categories in the sidebar, primary techniques in the grid, search, technique cards, and the same detail modal.
- BJJ names should use the most common English/popular name. Do not add Japanese/Portuguese/English translation pairs for BJJ.
- BJJ content should avoid ultra-niche modern systems, flexibility-heavy techniques, strength-reliant techniques, and player-branded/patented-style entries such as Octopus Guard or Dead Orchard.

## Task 1: Add BJJ Data and Discipline Registry

**Files:**
- Create: `src/data/bjj-techniques.json`
- Create: `src/data/disciplines.ts`
- Modify: `src/types/technique.ts`

- [ ] **Step 1: Add the discipline type**

In `src/types/technique.ts`, add:

```ts
export type Discipline = 'karate' | 'bjj';
```

Keep `Technique` and `Category` compatible with the existing JSON shape.

- [ ] **Step 2: Create starter BJJ categories**

Create `src/data/bjj-techniques.json` with the same format as `techniques.json`. Use a broad but mainstream BJJ library:

```json
[
  {
    "name": "Positions",
    "slug": "bjj-positions",
    "techniques": [
      { "name": "Closed Guard", "slug": "closed-guard", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Open Guard", "slug": "open-guard", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Half Guard", "slug": "half-guard", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Side Control", "slug": "side-control", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Mount", "slug": "mount", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Back Control", "slug": "back-control", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Turtle", "slug": "turtle", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "North-South", "slug": "north-south", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Knee on Belly", "slug": "knee-on-belly", "primary": true, "secondary": false, "tertiary": false, "description": "" }
    ]
  },
  {
    "name": "Movement & Fundamentals",
    "slug": "bjj-movement-fundamentals",
    "techniques": [
      { "name": "Shrimp Escape", "slug": "shrimp-escape", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Bridge", "slug": "bridge", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Technical Stand-Up", "slug": "technical-stand-up", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Forward Roll", "slug": "forward-roll", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Backward Roll", "slug": "backward-roll", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Hip Switch", "slug": "hip-switch", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Frame and Recover", "slug": "frame-and-recover", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Pummeling", "slug": "pummeling", "primary": true, "secondary": false, "tertiary": false, "description": "" }
    ]
  },
  {
    "name": "Escapes",
    "slug": "bjj-escapes",
    "techniques": [
      { "name": "Bridge and Roll Escape", "slug": "bridge-and-roll-escape", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Elbow Knee Escape", "slug": "elbow-knee-escape", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Side Control Frame Escape", "slug": "side-control-frame-escape", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Back Escape", "slug": "back-escape", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Knee on Belly Escape", "slug": "knee-on-belly-escape", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Turtle Escape", "slug": "turtle-escape", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Headlock Escape", "slug": "headlock-escape", "primary": true, "secondary": false, "tertiary": false, "description": "" }
    ]
  },
  {
    "name": "Guards",
    "slug": "bjj-guards",
    "techniques": [
      { "name": "Closed Guard", "slug": "closed-guard", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Butterfly Guard", "slug": "butterfly-guard", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Half Guard", "slug": "half-guard", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "De La Riva Guard", "slug": "de-la-riva-guard", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Spider Guard", "slug": "spider-guard", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Collar Sleeve Guard", "slug": "collar-sleeve-guard", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "X Guard", "slug": "x-guard", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Single Leg X Guard", "slug": "single-leg-x-guard", "primary": true, "secondary": false, "tertiary": false, "description": "" }
    ]
  },
  {
    "name": "Sweeps",
    "slug": "bjj-sweeps",
    "techniques": [
      { "name": "Scissor Sweep", "slug": "scissor-sweep", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Hip Bump Sweep", "slug": "hip-bump-sweep", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Flower Sweep", "slug": "flower-sweep", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Butterfly Sweep", "slug": "butterfly-sweep", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Old School Sweep", "slug": "old-school-sweep", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Single Leg X Sweep", "slug": "single-leg-x-sweep", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "De La Riva Sweep", "slug": "de-la-riva-sweep", "primary": true, "secondary": false, "tertiary": false, "description": "" }
    ]
  },
  {
    "name": "Guard Passing",
    "slug": "bjj-guard-passing",
    "techniques": [
      { "name": "Knee Slice Pass", "slug": "knee-slice-pass", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Toreando Pass", "slug": "toreando-pass", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Over Under Pass", "slug": "over-under-pass", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Double Under Pass", "slug": "double-under-pass", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Stack Pass", "slug": "stack-pass", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Leg Drag", "slug": "leg-drag", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Body Lock Pass", "slug": "body-lock-pass", "primary": true, "secondary": false, "tertiary": false, "description": "" }
    ]
  },
  {
    "name": "Submissions",
    "slug": "bjj-submissions",
    "techniques": [
      { "name": "Rear Naked Choke", "slug": "rear-naked-choke", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Armbar", "slug": "armbar", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Triangle Choke", "slug": "triangle-choke", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Kimura", "slug": "kimura", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Americana", "slug": "americana", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Guillotine", "slug": "guillotine", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Cross Collar Choke", "slug": "cross-collar-choke", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Omoplata", "slug": "omoplata", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Ezekiel Choke", "slug": "ezekiel-choke", "primary": true, "secondary": false, "tertiary": false, "description": "" }
    ]
  },
  {
    "name": "Takedowns",
    "slug": "bjj-takedowns",
    "techniques": [
      { "name": "Double Leg Takedown", "slug": "double-leg-takedown", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Single Leg Takedown", "slug": "single-leg-takedown", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Ankle Pick", "slug": "ankle-pick", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Arm Drag to Back", "slug": "arm-drag-to-back", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Body Lock Takedown", "slug": "body-lock-takedown", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Hip Throw", "slug": "hip-throw", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Guard Pull", "slug": "guard-pull", "primary": true, "secondary": false, "tertiary": false, "description": "" }
    ]
  },
  {
    "name": "Transitions & Control",
    "slug": "bjj-transitions-control",
    "techniques": [
      { "name": "Guard to Mount", "slug": "guard-to-mount", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Side Control to Mount", "slug": "side-control-to-mount", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Mount to Back", "slug": "mount-to-back", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Back Take", "slug": "back-take", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Knee on Belly Transition", "slug": "knee-on-belly-transition", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Turtle Breakdown", "slug": "turtle-breakdown", "primary": true, "secondary": false, "tertiary": false, "description": "" },
      { "name": "Seatbelt Control", "slug": "seatbelt-control", "primary": true, "secondary": false, "tertiary": false, "description": "" }
    ]
  }
]
```

- [ ] **Step 3: Add the registry**

Create `src/data/disciplines.ts`:

```ts
import { Category, Discipline } from '@/types/technique';
import karateTechniques from '@/data/techniques.json';
import bjjTechniques from '@/data/bjj-techniques.json';

export const disciplines: Record<Discipline, {
  id: Discipline;
  label: string;
  shortLabel: string;
  title: string;
  logoAlt: string;
  categories: Category[];
}> = {
  karate: {
    id: 'karate',
    label: 'Karate',
    shortLabel: 'Karate',
    title: 'Jitsu-Do Karate',
    logoAlt: 'Jitsu-Do Karate',
    categories: karateTechniques as Category[],
  },
  bjj: {
    id: 'bjj',
    label: 'BJJ',
    shortLabel: 'BJJ',
    title: 'Jitsu-Do BJJ',
    logoAlt: 'Jitsu-Do BJJ',
    categories: bjjTechniques as Category[],
  },
};
```

- [ ] **Step 4: Verify TypeScript data imports**

Run:

```bash
npm run lint
```

Expected: no import/type errors from the new JSON or registry.

## Task 2: Make the Home UI Discipline-Aware

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace the fixed Karate data import**

Replace `techniquesData` usage with:

```ts
import { disciplines } from '@/data/disciplines';
import { Discipline } from '@/types/technique';
```

Add state:

```ts
const [activeDiscipline, setActiveDiscipline] = useState<Discipline>('karate');
const discipline = disciplines[activeDiscipline];
const categories: Category[] = discipline.categories;
```

- [ ] **Step 2: Reset browsing state when switching disciplines**

Add:

```ts
const switchDiscipline = (nextDiscipline: Discipline) => {
  if (nextDiscipline === activeDiscipline) return;
  setActiveDiscipline(nextDiscipline);
  setSelectedCategories(new Set());
  setSearchTerm('');
  setSelectedTechnique(null);
};
```

- [ ] **Step 3: Add a reusable segmented control inside `page.tsx`**

Add a small local component above `return` or inline in JSX:

```tsx
const DisciplineToggle = ({ compact = false }: { compact?: boolean }) => (
  <div className={`inline-grid grid-cols-2 rounded border border-white/20 bg-black p-1 ${compact ? 'w-full' : 'min-w-52'}`}>
    {(Object.keys(disciplines) as Discipline[]).map((id) => {
      const isActive = activeDiscipline === id;
      return (
        <button
          key={id}
          type="button"
          onClick={() => switchDiscipline(id)}
          className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors rounded-sm ${
            isActive
              ? 'bg-red-600 text-white'
              : 'text-white/55 hover:text-white hover:bg-white/5'
          }`}
          aria-pressed={isActive}
        >
          {disciplines[id].shortLabel}
        </button>
      );
    })}
  </div>
);
```

- [ ] **Step 4: Place the toggle in the header**

In the header flex layout:

- Desktop/tablet: render `<DisciplineToggle />` in a centered header slot.
- Mobile: render a compact version in the header or at the top of the sidebar. Prefer both if spacing remains clean after visual check.

- [ ] **Step 5: Replace Karate-only labels**

Change:

```tsx
Jitsu-Do Karate
Techniques Library
```

to use:

```tsx
{discipline.title}
{discipline.label} Techniques Library
```

Change the search placeholder to:

```tsx
placeholder={`Search ${discipline.label} techniques...`}
```

Change empty-state wording from generic “techniques” only where the discipline label improves clarity.

- [ ] **Step 6: Verify behavior**

Run:

```bash
npm run lint
npm run build
```

Expected: both commands succeed.

## Task 3: Add BJJ Descriptions, Colors, and Naming Polish

**Files:**
- Modify: `src/data/technique_descriptions.ts`
- Modify: `src/data/technique_translations.ts`
- Modify: `src/lib/categoryColors.ts`

- [ ] **Step 1: Add BJJ descriptions**

Add descriptions for the starter BJJ techniques, for example:

```ts
'Closed Guard': 'A control position using both legs around the opponent from the bottom.',
'Side Control': 'A dominant top position controlling the opponent chest-to-chest from the side.',
'Mount': 'A dominant top position seated over the opponent with control of their hips and upper body.',
'Back Control': 'A dominant position behind the opponent, usually with hooks or a seatbelt grip.',
'Bridge and Roll Escape': 'A mount escape using a strong bridge to reverse the opponent.',
'Shrimp Escape': 'A hip escape movement used to create space and recover guard.',
'Knee Slice Pass': 'A guard pass that drives one knee through the opponent’s guard line.',
'Rear Naked Choke': 'A strangle from back control using the arms without relying on the lapel.',
'Armbar': 'A straight arm lock that controls the elbow joint.',
'Double Leg Takedown': 'A takedown attacking both legs to bring the opponent to the mat.',
```

Keep ASCII punctuation when editing; write `opponent's` instead of curly apostrophes.

- [ ] **Step 2: Make fallback text discipline-neutral**

Change fallback from:

```ts
'A fundamental karate technique'
```

to:

```ts
'A fundamental martial arts technique'
```

- [ ] **Step 3: Add BJJ category colors**

In `src/lib/categoryColors.ts`, add entries for:

```ts
'bjj-positions'
'bjj-movement-fundamentals'
'bjj-escapes'
'bjj-guards'
'bjj-sweeps'
'bjj-guard-passing'
'bjj-submissions'
'bjj-takedowns'
'bjj-transitions-control'
```

Use the existing multi-color approach so BJJ does not become one single-color block.

- [ ] **Step 4: Verify card rendering**

Run the app:

```bash
npm run dev
```

Open the local site and verify:

- Karate still loads by default.
- BJJ toggle switches the visible categories and grid.
- Search works in both modes.
- Category checkboxes filter only the active discipline.
- Technique modal opens for BJJ and Karate.

## Task 4: Update Metadata and Docs

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `README.md`

- [ ] **Step 1: Update app metadata**

Change:

```ts
title: "Karate Techniques Library",
description: "Comprehensive library of karate techniques, stances, blocks, strikes, and katas for martial arts practitioners",
```

to:

```ts
title: "Martial Arts Techniques Library",
description: "A student resource for Karate and Brazilian Jiu-Jitsu techniques.",
```

- [ ] **Step 2: Update README language**

Update the title and intro from Karate-only to Karate/BJJ. Mention:

- Karate data comes from the existing CSV update flow.
- BJJ starter data lives in `src/data/bjj-techniques.json`.
- Both disciplines use the same browsing UI.

- [ ] **Step 3: Final verification**

Run:

```bash
npm run lint
npm run build
```

Expected: both pass.

If a dev server is running, open the app and visually confirm desktop and mobile widths:

- Desktop width around 1440px.
- Mobile width around 390px.

## Out of Scope for This Pass

- User accounts, favorites, or student progress.
- Upload workflows for BJJ images/videos.
- Changing the CSV converter to support both Karate and BJJ. That can be done later once the desired BJJ source of truth is known.
- Redesigning the older `/category/[slug]` and `/technique/[slug]` pages unless they become part of the main student flow.
- Niche or trend-specific BJJ entries such as Octopus Guard, Dead Orchard, player-branded systems, and techniques requiring unusual flexibility or strength.

## Self-Review

- Spec coverage: The plan adds a Karate/BJJ toggle, keeps Karate as default, makes BJJ look and operate like Karate, and handles desktop/mobile placement.
- Placeholder scan: No implementation step depends on “TBD” work.
- Type consistency: `Discipline`, `Category`, and the JSON shape match the current project types.
