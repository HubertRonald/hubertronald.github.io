#!/usr/bin/env bash
set -euo pipefail

RETAINAI_REF="${RETAINAI_REF:-v0.4.0-alpha.1}"
RETAINAI_REMOTE="${RETAINAI_REMOTE:-https://github.com/HubertRonald/RetainAI.git}"

mkdir -p .vendor
rm -rf .vendor/retainai

echo "Fetching RetainAI documentation source"
echo "Remote: ${RETAINAI_REMOTE}"
echo "Ref:    ${RETAINAI_REF}"

git clone --depth 1 --branch "${RETAINAI_REF}" "${RETAINAI_REMOTE}" .vendor/retainai
