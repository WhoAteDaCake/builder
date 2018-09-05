#!/usr/bin/env bash

git clone git@github.com:SpotlightData/nanowire-extensions.git
mv -r nanowire-extensions repo
cp .builder.js ./nanowire-extensions
cd nanowire-extensions
yarn packages
../../../bin/builder.js