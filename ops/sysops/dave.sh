#!/bin/bash

# List all folder names and file names to text files
# Concatenate both as explore.list

folders() {
  ls -aF -1 | egrep '/$' | cut -d '/' -f 1 | grep -v '\.';
}

files() {
   ls -aCF -1 | egrep -v '/$' | cut -f 1 -d '*'
}

folders > folder.list;
files   > file.list;

cat folder.list file.list > explore.list

