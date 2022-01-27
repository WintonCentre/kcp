#!/bin/bash

set -e
echo "Publishing to live production server for lung"
TARGET='lung.transplants.wintoncentre.uk:/var/www/lung.transplants.wintoncentre.uk/'
LOCAL_DEV='resources/public/'
echo "===============rsync-ing files==================="
rsync -avz --omit-dir-times --del --no-perms --no-owner --no-group $LOCAL_DEV $USER@$TARGET
echo "================================="
echo "Uploaded to " $TARGET
echo "================================="