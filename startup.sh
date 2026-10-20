#!/bin/sh
# Bring the dev server up (the live preview runs this).
#
# The project root is the directory this script lives in, so the same file
# works in the sandbox (/workspace) and in a checkout anywhere else.
set -eu

cd "$(dirname "$0")"

# Free the port if a previous server is still holding it.
node scripts/preview.mjs stop >/dev/null 2>&1 || true

if curl -sf -o /dev/null --max-time 2 http://127.0.0.1:8080/; then
  exit 0
fi

npm run dev >>/tmp/app-startup.log 2>&1 &
