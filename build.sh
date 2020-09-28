#!/bin/bash

npm install
./bb-scripts/switch-10x-dev.clj prod
./lein-config.sh
clj -Afig:prod
