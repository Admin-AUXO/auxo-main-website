# AI Agent Rules

**MANDATORY:** Read and follow these rules.

---

## 1. Pre-Work Checklist

1.  **Read Documentation:** Before coding, review relevant files in `docs/` to understand existing patterns.
2.  **Understand Request:** Fully analyze user requirements.
3.  **Plan:** Create a clear plan referencing the documentation.

---

## 2. Project Root & Command Syntax

-   **Project Root:** `A:\AUXO\Main Website`
-   **CRITICAL:** Always `cd "A:\AUXO\Main Website"` before running commands.
-   **PowerShell Syntax:**
    -   **DO:** Use separate commands or semicolons: `npm run lint; npm run check`
    -   **DON'T:** Use `&&`: `npm run lint && npm run check` (will fail).

---

## 3. Development Workflow

1.  **Analyze & Plan:** Understand the request and create a plan.
2.  **Navigate to Root:** `cd "A:\AUXO\Main Website"`
3.  **Implement:** Follow project conventions.
4.  **Check Locally:** Run `npm run lint`, `npm run check`, and `npm run build` from the project root.
5.  **Confirm:** Ask the user before pushing changes.
6.  **Update Docs:** If your changes affect structure, components, or features, update the relevant documentation.
7.  **Push to `master`:** All changes must be pushed directly to the `master` branch. Do not create new branches.

---

## 4. Core Principles & Rules

-   **Static First:** Prioritize Astro's static generation. Minimize client-side JS.
-   **Component-Based:** Reuse components from `src/components/` before creating new ones.
-   **Data-Driven:** Use TypeScript data files in `src/data/`. Do not hard-code content.
-   **TypeScript:** All code must be strongly typed.
-   **Mobile-First:** Ensure responsive design with minimum 44px x 44px touch targets.
-   **No New Dependencies:** Do not add new libraries without explicit instruction.

---

## 5. Code Conventions

-   **Naming:**
    -   Components: `PascalCase` (`MyComponent.astro`)
    -   Variables/Functions: `camelCase` (`myVariable`)
    -   Interfaces: `PascalCase` (`MyInterface`)
-   **Imports Order:** Astro → Third-party → Internal Components → Data → Types.
-   **Comments:** Explain *why*, not *what*. Avoid obvious comments.
-   **Tailwind CSS:** Follow existing utility-first patterns.

---

## 6. Content Management

-   **DO:** Use the `src/data/` directory for all content, organized by type:
    -   `config/`: Site-wide settings.
    -   `collections/`: Structured data (e.g., services, FAQs).
    -   `content/`: Page-specific content.
    -   `shared/`: Reusable text (buttons, labels).
-   **DON'T:** Hard-code strings in components. Check `src/data/shared/common.ts` first.

---

## 7. Navigation & URLs

-   **CRITICAL:** Always use `import.meta.env.BASE_URL` for all internal links and API calls.
-   **Pattern:** `<a href={`${base}about`}>About</a>`
-   **API Calls:** `fetch(`${import.meta.env.BASE_URL}api/contact`)`

---

## 8. Theme System (Dark/Light Mode)

-   **NEVER** use hardcoded colors like `text-white` or `bg-black`.
-   **ALWAYS** use theme-aware CSS variables and classes:
    -   Text: `text-primary`, `text-secondary`
    -   Backgrounds: `bg-primary`, `bg-card`
    -   Borders: `border-theme`
-   **Green Buttons (`bg-accent-green`):** Use `text-black dark:text-white` for correct contrast.
-   **Logo:** The logo color is a fixed green (`#A3E635`) and does not change with the theme.
-   **Testing:** Always test new components in both dark and light themes.

---

## 9. Security & Configuration

-   **NEVER** commit secrets or configuration files:
    -   `.env`
    -   `.cursor/`
    -   `.cursor/mcp.json`
-   **Brevo Email:** The sender email (`BREVO_FROM_EMAIL`) **MUST** be verified in the Brevo dashboard before deployment, or emails will fail.
-   **API Endpoints:** Endpoints in `src/pages/api/` have Zod validation and IP-based rate limiting. Do not bypass them.

---

## 10. MCP Server Usage

-   **Configuration:** MCP config is in `.cursor/mcp.json`. This file is in `.gitignore` and **MUST NOT** be committed.
-   **Usage:** Use MCP servers for file operations, GitHub interactions, and searching Astro docs.
-   **Security:** Do not expose MCP tokens in code, commits, or documentation.

---

## 11. Communication Protocol

-   **After Task Completion:** Ask "Are there any additional changes you'd like me to make?"
-   **For Small Changes:** Ask "Should I proceed with pushing these changes to GitHub?"

---

## 12. Documentation & Commit History

-   **Update Documentation:** If your changes affect project structure, components, APIs, etc., you must update the corresponding file in the `/docs` directory.
-   **Use GitHub for History:** This project uses the Git commit history as the changelog. Refer to `docs/GITHUB_GUIDELINES.md` for conventions on writing effective commit messages.
-   **Write Good Commits:** Your commit message is the changelog. Make it clear and descriptive.

