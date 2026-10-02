<style>
@import url("https://nyteowldave.neocities.org/style.css");
@import url("https://nyteowldave.github.io/std/style/ghost.css");
</style>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[me-omega]:
<http://dave-legacy/app/demo/web/web-rtc/server-setup.html>
"Omega Edition"

[md-omega]:
<http://dave-legacy/app/demo/web/web-rtc/server-setup.md>
"MD ~ Omega Edition"

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<h1 id="_T_"> WebRTC 📡 Demo </h1>

> [`🔗 ` Omega][me-omega]
> [`🔗 ` File System](./)

> [`🔗 ` Related Links](./related-links.html)

----------------------------------------------------------------

## `🧙` Node Server Setup ~ Example #2

----------------------------------------------------------------

<pre>

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// server.js (Node)
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// # Ensure the Node.js WebSocket Package is Installed
// > npm install ws
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// + Gemini Chat
// @ https://gemini.google.com/app/648a3941355c7570
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// PORT : 8282
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const WebSocket = require('ws');

// Listen on port 8080 across all network interfaces (LAN accessible)
const wss = new WebSocket.Server({ port: 8282 });

wss.on('connection', (ws) => {
  console.log('New client connected.');

  ws.on('message', (message) => {
    // Relay the signaling data (offers, answers, ICE candidates) to all other peers
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected.');
  });
});

console.log('WebRTC signaling server running on port 8080...');

</pre>

----------------------------------------------------------------

## `🧙` Signaling Server ~ Example #1

----------------------------------------------------------------

<pre>

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// server-simple.js (Node)
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// # Ensure the Node.js WebSocket Package is Installed
// > npm install ws
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// + Gemini Chat
// @ https://gemini.google.com/app/648a3941355c7570
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// PORT : 8282
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Example conceptual Node.js signaling server snippet
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8282 }); // See Client

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    // Broadcast incoming signaling data to all other connected clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

</pre>

----------------------------------------------------------------

## `🧙` Install `WebSockets` for `Node.js`

----------------------------------------------------------------

### Bash `🖥️` Console

<pre>

&gt; npm install ws

</pre>

----------------------------------------------------------------

## `🧙` Start Server

----------------------------------------------------------------

### Bash `🖥️` Console

<pre>

&gt; node server.js

</pre>

----------------------------------------------------------------

# Source `📄` Files

----------------------------------------------------------------

> [`📄` Markdown Page][md-omega]

----------------------------------------------------------------

<script>
; doc = document
; doc . title = ( _T_.textContent ).trim()
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

