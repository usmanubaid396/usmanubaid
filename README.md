# Usman Ubaid — Full-Stack SaaS, LMS & 3D Interactive Systems

Developer portfolio featuring selected production work, technical skills, an interactive ecosystem, and a development workflow. Built with React, Three.js, WebGL, Tailwind CSS, and Vite.

Location: Lahore & Vehari, Pakistan.

## Selected work

- [DIFF. MDCAT](https://diffmdcat.vercel.app) — a full-stack learning management system with practice question banks, past papers, timed quizzes, explanations, student profiles, progress analytics, live rankings, and protected test sessions.
- [HealthcarePK](https://healthcarepk.online) — pharmaceutical business portfolio.
- [Universal Contract Maker](https://universal-contract-maker.vercel.app/) — contract creation tool.
- This portfolio — scroll-driven spatial cards, hover tilt, and a shared Three.js scene.

## Skills demonstrated through the DIFF. MDCAT LMS

| Area | Technologies and implemented workflows |
| --- | --- |
| Frontend | React, TypeScript, TanStack Start/Router/Query, Tailwind CSS, Radix UI, Zustand, React Hook Form, and Zod |
| Authentication | Firebase Google and email/password sign-in, password recovery, auth state management, and Firebase Admin ID token verification |
| Access control | Student, mentor, and administrator checks; session approval and expiry; Firestore ownership rules; private assessment data served through a server API |
| Live data | Cloud Firestore profiles, progress, attempt synchronization, and snapshot subscriptions for rankings |
| SQL support | Server-only parameterized queries, PostgreSQL/Neon connection pooling, tracked SQL migrations, PGLite preview fallback, and Better Auth/Kysely integration |
| Learning workflows | Chapter-wise MCQs, archived past papers, timed practice, explanations, attempt history, analytics, and protected test sessions |
| Admin and mentor tools | Student enrollment, session access management, test management, and validated TXT/JSON question imports |
| Content pipelines | Python CSV/archive question-bank import scripts, structured question IDs, and generated chapter manifests |
| Study exports | KaTeX mathematical notation and jsPDF/html2canvas quiz-review PDF generation |
| Delivery and checks | Vite, Vercel deployment, SEO generation, Node tests, Playwright flows, and Firestore emulator integration tests |

These additions were checked against the physicslab implementation. Firebase Auth and Firestore power the LMS student and assessment flows. PostgreSQL/Neon and Better Auth are supported by separate server integration code; this portfolio does not claim that those backends are configured on the live deployment. No uptime, user-count, or performance measurements are inferred from dependencies.

## Portfolio interactions

The DIFF. MDCAT project uses the same work-card renderer as the other projects. The skills cards reuse the existing hover-tilt component, glass panels, red/blue accents, and typography. Ecosystem navigation and scroll height scale with the module count on desktop.

Phones and touch devices use ordinary-flow project cards, expandable capability panels, static skill badges, and a readable lifecycle list. Safe-area spacing, 44px navigation targets, and 16px form inputs support mobile use. The lightweight mobile WebGL scene uses 150 particles, 8 shards, a pixel ratio capped at 1, and a 24fps render budget; it pauses past the hero and while the tab is hidden. Reduced-motion users receive a static background. Three.js loads separately from the main interface, and GPU resources are disposed when the scene unmounts.

## Run locally

```sh
npm install
npm run dev
```

```sh
npm run build
npm run preview
```

## Contact

- Email: usman@healthcarepk.online
- [GitHub](https://github.com/usmanubaid396)
- [LinkedIn](https://linkedin.com/in/uu51)
