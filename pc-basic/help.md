<style>
#sce {}
#sip {}
#sop {}
</style>

<textarea id="sce">
01 REM "TODO.BAS"
10 CLS
20 PRINT "HELP"
30 PRINT
40 PRINT "1. Open BASH Terminal"
50 PRINT "2. Type pc-basic-help"
60 PRINT "3. Hit [ENTER]"
100 PRINT
101 END
</textarea>

<textarea id="sip"></textarea>

<textarea id="sop"></textarea>

<fieldset>
<legend>Options</legend>
<div>
<select id="current-editor"></select>
<button>Configure</button>
</div>
<iframe src="options.html"></iframe>
</fieldset>

<script>
function initEditor( id ) {}
</script>

<script>
function initEditors( idList ) {}
</script>

<script>
const idList = [ 'sip', 'sop', 'sce' ];
</script>
