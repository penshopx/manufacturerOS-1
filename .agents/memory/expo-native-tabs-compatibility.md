---
name: Expo native tabs compatibility
description: NativeTabs API shape required by the Expo Router version used in this workspace.
---

Use `NativeTabs.Trigger.Icon` and `NativeTabs.Trigger.Label` for native tab content. The installed Expo Router package does not export top-level `Icon` or `Label` members.

**Why:** The documented top-level imports failed TypeScript verification against the package version installed by the Expo scaffold, while the trigger-nested API compiled and ran correctly.

**How to apply:** When adding or changing native tabs in Expo artifacts in this workspace, prefer the trigger-nested API and verify it with the artifact typecheck before previewing.