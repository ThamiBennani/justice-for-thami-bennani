#!/usr/bin/env bash
set -euo pipefail

required=(
  VITE_SITE_URL
  VITE_PUBLIC_ACTIONS_URL
  PUBLIC_ORIGINS
  ACS_EMAIL_SENDER_ADDRESS
)

failed=false
for variable in "${required[@]}"; do
  if [[ -z "${!variable:-}" ]]; then
    printf 'FAIL: %s is not set.\n' "$variable"
    failed=true
  fi
done

if [[ "$failed" == true ]]; then
  exit 1
fi

if [[ "$VITE_SITE_URL" != https://* ]]; then
  echo 'FAIL: VITE_SITE_URL must use HTTPS.'
  failed=true
fi

if [[ "$VITE_PUBLIC_ACTIONS_URL" != https://* ]] || [[ "$VITE_PUBLIC_ACTIONS_URL" =~ (localhost|127\.0\.0\.1|staging|test) ]]; then
  echo 'FAIL: VITE_PUBLIC_ACTIONS_URL must be a public HTTPS endpoint with a release-safe hostname.'
  failed=true
fi

IFS=',' read -r -a origins <<< "$PUBLIC_ORIGINS"
for origin in "${origins[@]}"; do
  origin="$(printf '%s' "$origin" | tr -d '[:space:]')"
  if [[ "$origin" != https://* ]] || [[ "$origin" =~ (localhost|127\.0\.0\.1|staging|test) ]]; then
    printf 'FAIL: disallowed public origin: %s\n' "$origin"
    failed=true
  fi
done

if [[ "$ACS_EMAIL_SENDER_ADDRESS" == *@*.azurecomm.net ]]; then
  echo 'FAIL: ACS_EMAIL_SENDER_ADDRESS must use a verified custom sender domain.'
  failed=true
fi

if [[ "$failed" == true ]]; then
  exit 1
fi

echo 'Release configuration passed.'