#!/bin/bash

set -e
echo "Publishing to Kidney Staging server"
TARGET='kidney-staging.wintoncentre.uk:/var/www/kidney-staging.wintoncentre.uk/'
LOCAL_DEV='resources/public'
echo "===============rsync-ing files==================="
rsync -avz --omit-dir-times --del --no-perms --no-owner --no-group $LOCAL_DEV $USER@$TARGET
echo "================================="
echo "Uploaded to " $TARGET
echo "================================="