<style>
@import url("https://nyteowldave.neocities.org/style.css");
@import url("https://nyteowldave.github.io/std/style/ghost.css");
</style>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[me-omega]:
<http://dave-omega/demo/web/web-rtc/ip-port-notes.html>
"Omega Edition"

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<h1 id="_T_"> IP Port Notes </h1>

----------------------------------------------------------------

> [`🔗` Omega][me-omega]
> [`🔗` File System](./)

> [`🔗` Related Links](./related-links.html)

----------------------------------------------------------------

# Port Assignments

----------------------------------------------------------------

| Port  | Used By |
|-------|----------------------------------|
| 3478  | COTURN ~ Dave Omega (IP 155)     |
| 3478  | listening-port (config file)     |
| 5349  | tls-listening-port (config file) |
| 8282  | WebSockets and Web RTC           |
| 19302 | stun:stun.l.google.com           |

----------------------------------------------------------------

# Config Files

----------------------------------------------------------------

| Owner              | File Location        | Notes   |
|--------------------|----------------------|---------|
| Ubuntu TURN Server | /etc/turnserver.conf | (1) (2) |
| COTURN Service     | /etc/default/coturn  | (1) (2) |

----------------------------------------------------------------

### __NOTES__

- (1) ~ Edit with `nano` editor
- (2) ~ Requires `sudo` password

----------------------------------------------------------------

<pre>

&gt; sudo nano /etc/turnserver.conf
&gt; sudo nano /etc/default/coturn

</pre>

----------------------------------------------------------------

<script>
; doc = document
; doc . title = ( _T_.textContent ).trim()
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

