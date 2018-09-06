#!/usr/bin/env bash

# rm -rf repo
# git clone git@github.com:SpotlightData/react-lazylog.git
# mv react-lazylog repo
cd ./repo && git checkout build
cp ../.builder.js . || true
# yarn install
../../../bin/builder.js bundle
# ../../../bin/builder.js library