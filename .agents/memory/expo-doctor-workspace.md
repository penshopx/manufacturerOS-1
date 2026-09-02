---
name: Expo doctor in the workspace
description: How to interpret Expo Doctor's duplicate-React warning in this multi-artifact pnpm workspace.
---

Expo Doctor can report duplicate React versions when run inside the mobile artifact because it also inspects the shared pnpm workspace, where a sibling web artifact may intentionally resolve a different React version.

**Why:** The mobile package can have a single, Expo-compatible React resolution while the workspace root still contains another peer resolution required by the web artifact. Treating the workspace-wide warning as a mobile bundle failure can lead to harmful cross-artifact dependency changes.

**How to apply:** First run the mobile package typecheck and Expo dependency check, then inspect the mobile package’s resolved React and React Query symlinks. Only change dependencies when the mobile package itself resolves multiple incompatible copies.