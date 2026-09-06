#!/usr/bin/env bash
set -euo pipefail

echo "Compatibility wrapper: RetainAI fetch is now registry-driven." >&2
exec node scripts/technical-docs/runner.mjs fetch retainai "$@"
