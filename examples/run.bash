#!/usr/bin/env bash

SCRIPT="run.bash"
FOLDERS=$(echo */)
FOLDER_ARRAY=($FOLDERS)

for a in "${FOLDER_ARRAY[@]}" ; do cd "./$a" && bash $SCRIPT && cd ../  ; done