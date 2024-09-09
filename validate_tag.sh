#!/usr/bin/env sh
TAG=$(git tag --points-at HEAD --sort=-creatordate | head -n 1)

if echo "$TAG" | grep -E -q '^v-[0-9]+\.[0-9]+-[0-9]+\.[0-9]+-[0-9]+$'; then
  echo "Tag format is correct: $TAG"
else
  echo "Tag format is incorrect: $TAG"
  exit 1
fi