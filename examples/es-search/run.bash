#!/usr/bin/env bash

rm -rf repo
git clone git@github.com:SpotlightData/es-search.git
mv es-search repo
cd ./repo
yarn packages