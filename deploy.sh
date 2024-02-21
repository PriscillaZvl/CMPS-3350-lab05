#!/bin/bash

DEST=~/public_html/3350/lab05
declare -a FILES=("game.html" "game.js" "level.js")
mkdir -p $DEST
for i in "${FILES[@]}"
do
    echo "Copying $i to $DEST"
    cp "$i" $DEST/.
done