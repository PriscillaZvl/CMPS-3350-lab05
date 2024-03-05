#!/bin/bash

DEST=~/public_html/3350/lab05
declare -a FILES=("game.html" "level.js" "audio/cartoon-jump-6462.mp3" "audio/collision.mp3" "fonts/Kubasta.ttf")
mkdir -p $DEST
for i in "${FILES[@]}"
do
    echo "Copying $i to $DEST"
    cp "$i" $DEST/.
done
