# Cursor AI Setup

This guide explains how to use and maintain the `.cursorrules` file for guiding AI agents.

---

## 1. Purpose of `.cursorrules`

The `.cursorrules` file in the project root provides a set of high-level instructions that Cursor AI assistants must follow. It ensures that AI-generated code and changes align with the project's standards, architecture, and conventions.

-   **What it is:** A quick-reference rule set for the AI.
-   **What it is not:** A replacement for the detailed documentation in the `/docs` folder.

---

## 2. Maintaining Guidelines

### When to Update

Update the `.cursorrules` file when:

-   Core project conventions change.
-   A new, project-wide pattern is established.
-   The development workflow is modified.
-   AI agents repeatedly make the same mistakes.

### How to Update

1.  **Edit `.cursorrules`:** Modify the file directly in the project root.
2.  **Be Concise:** Use clear, direct language. Focus on actionable rules.
3.  **Reference Docs:** For details, link to the relevant document in the `/docs` directory instead of duplicating content.
4.  **Commit Changes:** The `.cursorrules` file is version-controlled and should be committed.

---

## 3. Version Control

-   **DO** commit the `.cursorrules` file. It contains project-specific guidelines that are essential for all contributors and AI agents.
-   **DON'T** commit the `.cursor/` directory or any `.cursor/mcp.json` files. These are local configurations and may contain secrets. They are already included in `.gitignore`.

---

## 4. Troubleshooting

If the AI agent is not following the guidelines, check the following:

1.  **File Location:** Ensure `.cursorrules` is in the project root.
2.  **Vagueness:** Check if the rules are too vague. Make them more specific and direct.
3.  **Conciseness:** If the file is too long, summarize the rules and reference the detailed documentation in `/docs` instead.

