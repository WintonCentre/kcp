#!/usr/bin/env sh
echo "===============Adding build number============="
BUILD_SEARCH="v-0.0-0.00-0-hash"
GIT_TAG=$(git describe --tags --abbrev=0)
GIT_HASH=$(git rev-parse --short HEAD)

if [ -z "$GIT_TAG" ]; then
    GIT_TAG="NO_TAG"
fi

if [ -z "$GITHUB_RUN_NUMBER" ]; then
    BUILD_NUMBER="0"
else
  BUILD_NUMBER="$GITHUB_RUN_NUMBER"
fi


echo ${BUILD_SEARCH}
echo ${GIT_TAG}
echo ${GIT_HASH}
echo ${BUILD_NUMBER}

sed -i "s|${BUILD_SEARCH}|${GIT_TAG}-${BUILD_NUMBER}-${GIT_HASH}|g" resources/public/js/app.js
