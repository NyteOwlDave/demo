#!/bin/bash
# install-coturn.sh

echo
echo "Installing COTURN Service for Ubuntu ...";

sudo apt update
sudo apt install coturn -y

echo
echo "Press ENTER to Edit Ubuntu's TURN Server Config File";
read $a;

# echo "Emulated for Now";
sudo nano /etc/turnserver.conf;

echo
echo "Press ENTER to Edit COTURN's Config File";
read $a;

# echo "Emulated for Now";
sudo nano /etc/default/coturn;

echo
echo "Finally, run 'restart-coturn.sh'";
echo

exit

