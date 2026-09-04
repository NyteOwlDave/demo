<style>
@import url("https://nyteowldave.neocities.org/style.css");
</style>

<style>
.remote {
    position : fixed;
    left     : -2000px;
    width    : 1px;
    height   : 1px;
}
</style>

----------------------------------------------------------------

<a id="visitor" class="remote">Remote</a>

----------------------------------------------------------------

# Knot Puzzle

> <button onclick="p5()">P5 Sketch</button>

----------------------------------------------------------------

<script>
move_series = "L9,T6,D3,R6,A9,U6,L3,T6,D9,R6,A3,U6";
</script>

<script>
function p5() {
    visit( p5.address );
};
p5.address = ( "https://editor.p5js.org/nyteowldave64/sketches/Bf0Hxf6lH" );
</script>

<script>
function visit( u ) {
    const a = visitor;
    a.href = ( u );
    a.setAttribute( "target", u );
    a.click();
};
</script>
