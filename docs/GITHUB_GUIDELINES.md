# GitHub Guidelines for AI Agents

This project uses GitHub's commit history as the single source of truth for all changes. A local changelog file is not maintained.

Your primary responsibility is to write clear, descriptive commit messages that effectively document your work.

---

## 1. Using Commit History for Context

Use the Git commit history strategically to gather context. Do not review the log for every task. Instead, refer to it in specific situations:

-   **When a request is ambiguous:** If a user's request lacks detail (e.g., "fix the header"), checking recent commits related to that component can provide the necessary context.
-   **To understand a file's history:** Before making significant changes to a file, you can review its recent commit history to understand its evolution and purpose.
-   **To identify related changes:** If you are working on a feature, reviewing its commit history can help you identify all the files and components that are part of that feature.

---

## 2. Writing Effective Commit Messages

Clear commit messages are critical. This project follows the **[Conventional Commits](https://www.conventionalcommits.org/)** specification.

### Format

```
<type>(optional scope): <description>

[optional body]
```

-   **Type:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`.
-   **Description:** A concise, imperative-tense summary of the change.
-   **Body (Optional):** A more detailed explanation of *what* was changed and *why*.

### Example

```
feat(api): add user authentication endpoint

Implement JWT-based authentication for the new `/api/users/login` route.
The endpoint validates user credentials against the database and returns a
signed token for subsequent requests.
```

---

## 3. Pull Requests (PRs)

-   **Keep PRs Focused:** Each PR should address a single, well-defined task or feature.
-   **Descriptive Titles:** The PR title should clearly and concisely summarize the change.
-   **Link Issues:** If a PR resolves a GitHub issue, use keywords like `closes #123` in the PR description to automatically link and close the issue on merge.

---

## 4. Branching Strategy

-   **Push to `master`:** All changes should be committed and pushed directly to the `master` branch.
-   **No New Branches:** Do not create any new branches for your work. All development happens directly on `master`.

