#!/bin/bash
for name in client/img/profile-pictures/square/*
do
    newname="$(echo "$name" | cut -c8-)"
    mv "$name" client/"$newname"
done
