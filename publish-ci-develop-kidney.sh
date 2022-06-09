#!/bin/bash

set -e
echo "Publishing to development server"
TARGET='kcp-dev.wintoncentre.uk:/var/www/kcp-dev.wintoncentre.uk/'
echo "generating configuration data"
#lein config
LOCAL_DEV='resources/public/'
echo "===============building kidney-specific files==============="
bb kidney
echo "===============rsync-ing files==================="
rsync -avz --omit-dir-times --del --no-perms --no-owner --no-group $LOCAL_DEV $USER@$TARGET
echo "================================="
echo "Uploaded to " $TARGET
echo "================================="