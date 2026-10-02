#!/bin/bash
# restart-coturn.sh

echo
echo "Restarting COTURN Service ...";
echo

sudo systemctl daemon-reload
sudo systemctl start coturn
sudo systemctl enable coturn

echo

exit

