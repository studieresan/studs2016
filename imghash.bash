#!/bin/bash
for file in client/img/profile-pictures/square/*.jpg
do
    if [ -f "$file" ]
    then
        base=${file##*/}
        noext=${base%.*}
        newfile=$(printf '%s' "$noext" | openssl sha1)
        cp "$file" "client/img/profile-pictures/hashed/$newfile.jpg"
    fi
done
