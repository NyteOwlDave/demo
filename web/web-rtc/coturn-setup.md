<style>
@import url("https://nyteowldave.neocities.org/style.css");
@import url("https://nyteowldave.github.io/std/style/ghost.css");
</style>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[me-omega]:
<http://dave-omega/demo/web/web-rtc/coturn-setup.html>
"Omega Edition"

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<h1 id="_T_"> 🧙 Install COTURN Server </h1>

> [`🔗` Omega][me-omega]
> [`🔗` File System](./)

> [`🔗 ` Related Links](./related-links.html)

----------------------------------------------------------------

# `🧙` Remarks

----------------------------------------------------------------

The `WebRTC` service was giving error message with `FireFox`.

`Gemini` suggested using a `TURN` service to supplement `STUN`.

Together, we decided that `COTURN` was the ideal candidate for
my __LAN Configuration__.

This document discusses __Installing__ and __Configuring__ the
`COTURN` package for `Ubuntu`.

----------------------------------------------------------------

## Bash `🖥️` Console

----------------------------------------------------------------

### `🧙` Install Package

<pre>

&gt; sudo apt update
&gt; sudo apt install coturn -y

</pre>

----------------------------------------------------------------

### `🧙` Open Config File

<pre>

&gt; sudo nano /etc/turnserver.conf

</pre>

----------------------------------------------------------------

### `🧙` Modify `turnserver.conf`

> Scroll through or clear the file, and ensure the following
> lines are uncommented and configured. Replace 192.168.1.X
> with your Ubuntu server's actual LAN IP address:

----------------------------------------------------------------

<pre>

# Enable STUN and TURN
listening-port=3478
tls-listening-port=5349

# Bind to your local network IP (Do not use 127.0.0.1)
listening-ip=192.168.1.X

# Run in TURN relay mode
relay-ip=192.168.1.X

# Disable public open-relay security features (perfect for your LAN)
lt-cred-mech

# Define your static username and password (which you'll put in your JS code)
user=chef:lasagna123

# Choose a local realm name
realm=my-lasagna-network.local

</pre>

----------------------------------------------------------------

### `🧙`  Enable and Start the Service

----------------------------------------------------------------

> By default, Ubuntu leaves the `COTURN` service disabled until
> you tell it to run automatically. First, edit the system
> default file:

----------------------------------------------------------------

<pre>

# Uncomment or add the line: TURNSERVER_ENABLED=1
# Save and Exit

&gt; sudo nano /etc/default/coturn

</pre>

----------------------------------------------------------------

<pre>

# Enable and Start TURN Service

&gt; sudo systemctl daemon-reload
&gt; sudo systemctl start coturn
&gt; sudo systemctl enable coturn

</pre>

----------------------------------------------------------------

# `👥` Add COTURN Account Credentials

----------------------------------------------------------------

<pre>

&gt; sudo turnadmin -a -u [UID] -r [REALM] -p [PWD]

</pre>

----------------------------------------------------------------

| Field | Value     |
|-------|-----------|
| REALM | caw-1947  |
| UID   | dave      |
| PWD   | (secured) |

----------------------------------------------------------------

# `💻` Firewall

<div center> (not currently used) </div>

----------------------------------------------------------------

<pre>

&gt; sudo ufw allow 3478/udp
&gt; sudo ufw allow 3478/tcp

# Relay port range specified in turnserver.conf
&gt; sudo ufw allow 49152:65535/udp

</pre>

----------------------------------------------------------------

# `💻` Client COTURN Setup

> [Gemini Has Notes](https://gemini.google.com/app/648a3941355c7570)

----------------------------------------------------------------

## JavaScript `🧑‍💻` Changes

----------------------------------------------------------------

<pre>

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Old Version (No TURN Server)

const rtcConfig = {
    iceServers: [ { urls: 'stun:stun.l.google.com:19302' } ]
};

const peerConnection = new RTCPeerConnection( rtcConfig );

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// New Version (With TURN Server)
// Requires TURN Provider Account

const configuration = {
  iceServers: [
    {
      urls: 'stun:stun.l.google.com:19302' // STUN for direct mapping
    },
    {
      urls: 'turn:://turnserver.com', // Your TURN relay server
      username   : 'dave' ,
      credential : 'dave'
    }
  ]
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// New Version (With TURN Server)
// Uses the COTURN Daemon

const configuration = {
  iceServers: [
    {
      urls: 'stun:192.168.1.X:3478' // Offline LAN Version
    },
    {
      urls: 'turn:192.168.1.X:3478',
      username: 'chef',
      credential: 'lasagna123'
    }
  ]
};

const peerConnection = new RTCPeerConnection( configuration );

</pre>

----------------------------------------------------------------

<script>
; doc = document
; doc . title = ( _T_.textContent ).trim()
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

