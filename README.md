# Primeor Solutions — Web Development Internship

Front-end projects completed by **Kashav Thappa** during the Web Developer internship at
**Primeor Solutions** (29 May 2026 – 29 June 2026). The repository contains every task from
all three levels of the internship task list, organised in a separate folder per level and
linked together by a portfolio home page.

**Intern:** Kashav Thappa · B.Tech Computer Science & Engineering, Shri Mata Vaishno Devi University, Katra
**Role:** Web Developer Intern (Intern ID: PS/WDI/2026/190) · **Mode:** Remote

**Live site:** [primeor.vercel.app](https://primeor.vercel.app/)

---

## Tasks

| Level | Task | Folder | Live | What it covers |
|---|---|---|---|---|
| 1 | Task 1 — HTML & CSS | [`level-1/task-1`](level-1/task-1) | [open](https://primeor.vercel.app/level-1/task-1/) | Styled page with heading, paragraph, image, background colours and spacing; a clean form with input fields and a submit button; a responsive Home / About / Contact navigation with hover effects |
| 1 | Task 2 — JavaScript | [`level-1/task-2`](level-1/task-2) | [open](https://primeor.vercel.app/level-1/task-2/) | Button that changes its background colour on click; greeting alert ("Good Morning / Afternoon / Evening") based on the system time; addition calculator with instant result and input validation |
| 2 | Task 1 — Front-end frameworks | [`level-2/task-1`](level-2/task-1) | [open](https://primeor.vercel.app/level-2/task-1/) | Built with **Tailwind CSS**: responsive card component with image and text, responsive grid layout (1 → 2 → 3 → 4 columns), services section for a company website |
| 2 | Task 2 — Responsive design | [`level-2/task-2`](level-2/task-2) | [open](https://primeor.vercel.app/level-2/task-2/) | A fixed-width page (`basic.html`) converted into a mobile-first responsive page with CSS media queries, a CSS-only hamburger menu, and layouts for mobile, tablet and desktop |
| 3 | Task 1 — Image manipulation | [`level-3/task-1`](level-3/task-1) | [open](https://primeor.vercel.app/level-3/task-1/) | CSS gallery whose thumbnails enlarge on click (`:target` lightbox), automatic slideshow in pure HTML and CSS (keyframe animations), smooth image hover effects |
| 3 | Task 2 — Landing page | [`level-3/task-2`](level-3/task-2) | [open](https://primeor.vercel.app/level-3/task-2/) | "Web Developer Internship Program at Primeor Solutions" landing page: headline, overview and duration, highlights, qualifications, Apply Now / Learn More actions, contact footer (website, email, LinkedIn, location) |

## Tech stack

- HTML5 (semantic markup, `<dialog>`, `<details>`, `<output>`)
- CSS3 (custom properties, Flexbox, Grid, media queries, transitions, keyframe animations, `backdrop-filter`)
- JavaScript (ES5/ES6, no libraries)
- Tailwind CSS v4 (Level 2 · Task 1 only, compiled ahead of time)
- Git & GitHub, Vercel

## Project structure

```
.
├── index.html                 Portfolio home page (links to every task)
├── 404.html                   Custom not-found page
├── assets/
│   ├── css/site.css           Shared design tokens, navigation, buttons, footer, scroll reveal
│   ├── css/home.css           Home page styles
│   ├── js/site.js             Shared navigation toggle and scroll-reveal logic
│   └── img/                   WebP images (full size and -sm thumbnails) and favicon
├── level-1/
│   ├── task-1/                index.html · style.css · script.js
│   └── task-2/                index.html · style.css · script.js
├── level-2/
│   ├── task-1/                index.html · tailwind.css (built) · src/input.css (Tailwind source)
│   └── task-2/                index.html · basic.html (original) · style.css
├── level-3/
│   ├── task-1/                index.html · style.css · script.js (optional keyboard support)
│   └── task-2/                index.html · style.css · script.js
├── package.json               Tailwind build scripts and local dev server
└── vercel.json                Static hosting configuration
```

## Running locally

The site is plain static HTML, so any static server works:

```bash
npm run dev          # serves the project at http://localhost:3000
```

or `python -m http.server`, or the VS Code Live Server extension.

### Rebuilding the Tailwind CSS (Level 2 · Task 1)

The compiled `level-2/task-1/tailwind.css` is committed, so this is only needed after editing
that page's classes:

```bash
npm install
npm run tailwind:build     # or: npm run tailwind:watch
```

## Deploying to Vercel

The site is live at **https://primeor.vercel.app/** and redeploys automatically on every push to `main`.

To deploy your own copy:

1. Import the GitHub repository in Vercel (**Add New → Project**).
2. Keep **Framework Preset: Other**. No build command or output directory is needed;
   `vercel.json` already skips the install step and serves the repository root.
3. Deploy.

`vercel.json` also enables trailing slashes (so relative paths inside each task folder always
resolve), sets basic security headers, and adds caching for the `assets/` folder.

## Design notes

- Clean, minimal look inspired by Apple's product pages: system font stack (Inter as fallback),
  generous whitespace, large tight headlines, frosted-glass sticky navigation and soft shadows.
- Motion uses one easing curve throughout and respects `prefers-reduced-motion`.
- Accessibility: skip links, visible focus rings, labelled form fields with inline errors,
  `aria-expanded` on menu buttons, keyboard support for dialogs and the lightbox.
- Images are WebP with explicit dimensions and lazy loading below the fold.

Photographs are from [Unsplash](https://unsplash.com) (free to use under the Unsplash License).

## Author

**Kashav Thappa** — [github.com/KASHAVTHAPPA](https://github.com/KASHAVTHAPPA) · kashavthappa2005@gmail.com
