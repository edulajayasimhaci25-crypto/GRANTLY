# GRANTLY: Unified Scholarship Discovery & Management

**Problem:** Students struggle to find scholarships they qualify for, and lose track of rules, documents and deadlines across many portals.
**Solution:** One place that matches a student to scholarships, explains every rule, and turns the matches into an action plan.

## 60-second demo
1. Open the landing page and click **Find my scholarships**, then submit the profile.
2. **Discover:** see match rings, the total amount you qualify for, and "Almost there" tips on near misses.
3. Open a scholarship: every rule is marked met or missed, with what would fix it.
4. **Plan:** see which documents unlock the most scholarships, tick what you have, and follow the apply order.
5. **Compare** up to 3 scholarships, track them on the **Tracker**, and watch **Deadlines**.

## Features
- 30-second profile; all data stays in the browser (localStorage)
- Explainable match % with a rule-by-rule breakdown and fix suggestions
- Action plan: documents ranked by how many scholarships they unlock, plus apply order and readiness
- Search, sort, "only ones I qualify for"; side-by-side compare (up to 3)
- Per-scholarship document checklist, Kanban-style tracker, deadline timeline
- Hash routing (back button works), light and dark mode, keyboard navigation, ARIA labels, skip link, reduced-motion support, responsive layout

## Run
```
npm install
npm run dev
npm run build
```

## Stack
React 18, Vite, React Router. Sample data in `src/data.js` is illustrative; verify on official portals.

## Screenshots
Add screenshots here (landing, discover, plan, compare, mobile view).

## Demo
- In the app: open the **Demo** tab for an auto-playing walkthrough.
- The Demo tab is a self-playing video-style walkthrough (no recording needed).
