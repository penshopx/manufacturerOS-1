#!/bin/bash
set -euo pipefail

# The imported ManufactureOS app is frontend/demo-only and does not use the
# generated api-spec package or a database migration. Exclude api-spec because
# its optional Orval tool is blocked by the workspace package firewall.
pnpm install --frozen-lockfile \
  --filter "./artifacts/**" \
  --filter "./lib/**" \
  --filter "./scripts" \
  --filter "!@workspace/api-spec"

pnpm run typecheck
pnpm --filter @workspace/manufacture-os run build
