
'
' vec.bas (vec.js)
'

' Constants
const TINY# = 1e-8
const HUGE# = 1e+8
const D2R# = Math.PI / 180
const R2D# = 180 / Math.PI

' Vector 2D class
Type Vector2
    x as Double
    y as Double
End Type


Function DegToRad# ( n# )
    DegToRad# = ( n# * D2R# )
End Function

Function RadToDeg# ( n# )
    RadToDeg# = ( n# * R2D# )
End Function

Function Minimum ( a, b )
    If ( b < a ) Then
        Minimum = b
    Else
        Minimum = a
    End If
End Function

Function Maximum ( a, b )
    If ( a > b ) Then
        Maximum = a
    Else
        Maximum = b
    End If
End Function

Function Median ( a, b, c ) {
    Median = Minimum( Maximum( a, b ), c )
End Function


' Copy (0, 0, 0) -> vo
Sub VecZero( vo( 3 ) as Double ) {
    vo( 0 ) = 0.0
    vo( 1 ) = 0.0
    vo( 2 ) = 0.0
End Sub

' Copy (x, y, z) -> vo
Sub VecInit( x#, y#, z#, vo( 3 ) as Double ) {
    vo( 0 ) = x#
    vo( 1 ) = y#
    vo( 2 ) = z#
End Sub

' Copy vi -> vo
Sub VecCopy( vi(3) as Double, vo(3) as Double ) {
    vo( 0 ) = vi( 0 )
    vo( 1 ) = vi( 1 )
    vo( 2 ) = vi( 2 )
End Sub

' Dot Product
Function VecDot# ( va(3) as Double, vb(3) as Double ) {
    vx# = va( 0 ) * vb( 0 )
    vy# = va( 1 ) * vb( 1 )
    vz# = va( 2 ) * vb( 2 )
    VecDot# = ( vx# + vy# + vz# )
End Function

' Vector Length Squared
Function VecLenSqr# ( a( 3 ) as Double ) {
    return VecDot#( a, a )
End Function

' Cross Product
Sub VecCross( va(3) as Double, vb(3) as Double, vo(3) as Double ) {
    vo( 0 ) = va( 1 )*vb( 2 ) - va( 2 )*vb( 1 )
    vo( 1 ) = va( 2 )*vb( 0 ) - va( 0 )*vb( 2 )
    vo( 2 ) = va( 0 )*vb( 1 ) - va( 1 )*vb( 0 )
End Sub

' Compute Normal Vector
Function VecNormal# ( vi(3) as Double, vo(3) as Double) {
    k# = VecLenSqr# ( vi )
    if ( k# > TINY ) {
        t# = 1 / Sqr ( k# )
        vo( 0 ) = t# * vi( 0 );
        vo( 1 ) = t# * vi( 1 );
        vo( 2 ) = t# * vi( 2 );
    }
    else {
        vo( 0 ) = 1.0
        vo( 1 ) = 0.0
        vo( 2 ) = 0.0
    }
    VecNormal# = k#
End Function

' Scale Vector
Sub VecScale( k#, vi(3) as Double, vo(3) as Double )
    vo( 0 ) = k# * vi( 0 )
    vo( 1 ) = k# * vi( 1 )
    vo( 2 ) = k# * vi( 2 )
End Sub

' Elementwise Add
Sub VecAdd( va(3) as Double, vb(3) as Double, vo(3) as Double )
    vo( 0 ) = va( 0 ) + vb( 0 )
    vo( 1 ) = va( 1 ) + vb( 1 )
    vo( 2 ) = va( 2 ) + vb( 2 )
End Sub

' Elementwise Subtract
Sub VecSub( va(3) as Double, vb(3) as Double, vo(3) as Double )
    vo( 0 ) = va( 0 ) - vb( 0 )
    vo( 1 ) = va( 1 ) - vb( 1 )
    vo( 2 ) = va( 2 ) - vb( 2 )
End Sub

