#!/bin/bash
# Show list of folders

# This is the first method (better!)
#
# Here's the algorithm:
#
# 1) List all files and folders in terse format (with type suffix)
# 2) Filter out anything not a folder
# 3) Remove the trailing / character

ls -aF -1 | egrep '/$' | cut -d '/' -f 1 | grep -v '\.';

