#!/usr/bin/env sh

if [ -n "$GITHUB_HEAD_REF" ]; then
  # we're running on github actions (detached head, it's a rebase workflow so gloss over that...)
  HEAD_COMMIT_SHA=$(git rev-parse origin/$GITHUB_HEAD_REF)
  TAG=$(git tag --points-at $HEAD_COMMIT_SHA --sort=-creatordate | head -n 1)
else
  # we're running locally
  TAG=$(git tag --points-at HEAD --sort=-creatordate | head -n 1)
fi

if echo "$TAG" | grep -E -q '^v-[0-9]+\.[0-9]+-[0-9]+\.[0-9]+$'; then
  echo "Tag format is correct: $TAG"
else
  echo "Tag format is incorrect: $TAG"
  exit 1
fi