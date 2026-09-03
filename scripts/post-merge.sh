#!/bin/bash
set -euo pipefail

# Exclude the optional api-spec package from automated dependency installation.
pnpm install --frozen-lockfile \
  --filter "./artifacts/**" \
  --filter "./lib/**" \
  --filter "./scripts" \
  --filter "!@workspace/api-spec"

pnpm run typecheck
pnpm --filter db push
pnpm --filter @workspace/manufacture-os run build
