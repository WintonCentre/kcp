#!/bin/bash

set -e
echo "Publishing to Lung Staging server"
TARGET='lung-staging.wintoncentre.uk:/var/www/lung-staging.wintoncentre.uk/'
LOCAL_DEV='resources/public/'
echo "===============rsync-ing files==================="
rsync -avz --omit-dir-times --del --no-perms --no-owner --no-group $LOCAL_DEV $USER@$TARGET
echo "================================="
echo "Uploaded to " $TARGET
echo "================================="