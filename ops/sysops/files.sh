#!/bin/bash
# Show list of files

# 2020-MAY-22
# Made to remove trailing asterisks
# This means no asterisks allowed in filenames!

ls -aCF -1 | egrep -v '/$' | cut -f 1 -d '*'

