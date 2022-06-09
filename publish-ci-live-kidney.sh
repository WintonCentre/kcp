#!/bin/bash

set -e
echo "Publishing to live production server for kidney"
TARGET='kidney.kcp.wintoncentre.uk:/var/www/kidney.kcp.wintoncentre.uk/html'
LOCAL_DEV='resources/public/'
echo "===============building kidney-specific files==============="
bb kidney
echo "=========================================================="
echo "===============rsync-ing files==================="
rsync -avz --omit-dir-times --del --no-perms --no-owner --no-group $LOCAL_DEV $USER@$TARGET
echo "================================="
echo "Uploaded to " $TARGET
echo "================================="