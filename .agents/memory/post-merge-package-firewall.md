---
name: Post-merge package firewall
description: Workspace install constraint affecting the automated post-merge setup.
---

Automated post-merge installs exclude the optional `@workspace/api-spec` package. The package keeps Orval as an on-demand `pnpm dlx` command rather than an installed dependency, so mandatory root installs used by publishing do not fetch the blocked tarball. The frontend/demo artifacts do not require codegen or database migration.

**Why:** A full frozen install failed with HTTP 403 before post-merge setup could run, while installing the application artifacts and shared runtime libraries without `api-spec` completed successfully.

**How to apply:** Keep Orval out of installed dependencies, retain it only as on-demand codegen, and keep post-merge installs scoped to application artifacts, shared libraries, and scripts before typecheck and web build.