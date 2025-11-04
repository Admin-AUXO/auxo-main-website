# Deployment

This document covers the CI/CD and deployment process.

---

## 1. Deployment Environments

-   **Production:**
    -   **Platform:** GitHub Pages
    -   **Branch:** `master`
    -   **Workflow:** `.github/workflows/deploy.yml`

---

## 2. CI/CD Workflow (`deploy.yml`)

-   **Trigger:** Push to `master` branch.
-   **Steps:**
    1.  Checkout code.
    2.  Setup Node.js.
    3.  Install dependencies (`npm ci`).
    4.  Run checks (`npm run lint` & `npm run check`).
    5.  Build project (`npm run build`).
    6.  Deploy `dist/` directory to GitHub Pages.

---

## 3. Manual Deployment & Local Build

**CRITICAL:** Always run commands from the project root: `A:\AUXO\Main Website`

**PowerShell Syntax:** Use semicolons (`;`) instead of `&&`.

1.  **Navigate to Project Root:**
    ```powershell
    cd "A:\AUXO\Main Website"
    ```
2.  **Install Dependencies:**
    ```powershell
    npm ci
    ```
3.  **Run Checks & Build:**
    ```powershell
    npm run lint; npm run check; npm run build
    ```
4.  **Preview Production Build:**
    ```powershell
    npm run preview
    ```

---

## 4. Pre-Deployment Checklist

-   [ ] All local checks pass: `npm run lint`, `npm run check`, `npm run build`.
-   [ ] Environment variables are correctly configured in repository secrets.
-   [ ] **CRITICAL:** `BREVO_FROM_EMAIL` is verified in the Brevo dashboard.
-   [ ] Security headers in `public/_headers` are up-to-date.
-   [ ] No sensitive data is included in the commit.
-   [ ] Documentation has been updated if required.

---

## 5. Maintenance Mode

-   **Integration:** `astro-maintenance`
-   **To Enable:** Set `MAINTENANCE_MODE=true` as an environment variable.
-   **To Disable:** Set to `false` or remove the variable.

---

## 6. Rollback Procedure

1.  Revert the commit in the `master` branch.
2.  Push the revert commit.
3.  GitHub Actions will automatically redeploy the previous version.

