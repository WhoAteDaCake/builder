#!/usr/bin/env bash

# rm -rf repo
# git clone git@github.com:SpotlightData/nanowire-extensions.git
# mv nanowire-extensions repo
cp .builder.js ./repo || true
cd repo
# yarn packages
../../../bin/builder.js bundle