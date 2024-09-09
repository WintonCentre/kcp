#!/usr/bin/env sh
echo "===============Adding build number============="
BUILD_SEARCH="v-0.0-0.00-0-hash"
GIT_TAG=$(git tag --points-at HEAD --sort=-creatordate | head -n 1)
GIT_HASH=$(git rev-parse --short HEAD)

if [ -z "$GIT_TAG" ]; then
    GIT_TAG="NO_TAG"
fi

echo ${BUILD_SEARCH}
echo ${GIT_TAG}
echo ${GIT_HASH}

sed -i "s|${BUILD_SEARCH}|${GIT_TAG}-${GIT_HASH}|g" resources/public/js/app.js
