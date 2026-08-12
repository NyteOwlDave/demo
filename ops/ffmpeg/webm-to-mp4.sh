#!/bin/bash

A="$1";

convert() {
	echo;
	echo "IP: $A.webm";
	echo "OP: $A.mp4";
	echo;
	ffmpeg -i "${A}.webm" -vf "crop=800:800:8:50" "${A}.mp4";
	# 816x859
	# ffmpeg -i "${A}.webm" -c:v libx264 -crf 22 -c:a aac -b:a 128k "${A}.mp4";
	echo;
}

assist() {
	echo "USAGE: webm-to-mp4 [basename]";
	exit 1;
}

okay() {
	echo "IP: $A.webm";
	echo "OP: $A.mp4";
	exit 0;
}

[[ -z "$A" ]] && assist || convert;


