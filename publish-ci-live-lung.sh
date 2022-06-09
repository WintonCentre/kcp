#!/bin/bash

set -e
echo "Publishing to live production server for lung"
TARGET='lung.kcp.wintoncentre.uk:/var/www/lung.kcp.wintoncentre.uk/html'
LOCAL_DEV='resources/public/'
echo "===============building lung-specific files==============="
bb lung
echo "=========================================================="
echo "===============rsync-ing files==================="
rsync -avz --omit-dir-times --del --no-perms --no-owner --no-group $LOCAL_DEV $USER@$TARGET
echo "================================="
echo "Uploaded to " $TARGET
echo "================================="