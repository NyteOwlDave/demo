
'
' mtx.bas (mtx.js)
'


' Empty Matrix
Sub MtxZero ( m( 4, 4 ) as Double )
    for j = 0 to 3
        for i = 0 to 3
            m( j, i ) = 0.0
        next i
    next j
End Sub

' Identity Matrix
Sub MtxIdentity ( m( 4, 4 ) as Double )
    for j = 0 to 3
        for i = 0 to 3
            If ( i = j ) then
                m( j, i ) = 1.0
            Else
                m( j, i ) = 0.0
            End If
        next i
    next j
End Sub

' Translation Matrix
Sub MtxTranslate( tx#, ty#, tz#, m( 4, 4 ) as Double )
    MtxIdentity m
    m( 0, 3 ) = tx#
    m( 1, 3 ) = ty#
    m( 2, 3 ) = tz#
    m( 3, 3 ) = 1.0
End Sub

' Rotation about X-Axis
Sub MtxRotateX( angle, m( 4, 4 ) as Double )
    MtxIdentity m
    c = Cos( angle )
    s = Sin( angle )
    m( 1, 1 ) = c
    m( 1, 2 ) = -s
    m( 2, 1 ) = s
    m( 2, 2 ) = c
End Sub

' Rotation about Y-Axis
Sub MtxRotateY( angle, m( 4, 4 ) as Double )
    MtxIdentity m
    c = Cos( angle )
    s = Sin( angle )
    m( 0, 0 ) = c
    m( 0, 2 ) = s
    m( 2, 0 ) = -s
    m( 2, 2 ) = c
End Sub

' Rotation about Z-Axis
Sub MtxRotateZ( angle, m( 4, 4 ) as Double )
    MtxIdentity m
    c = Cos( angle )
    s = Sin( angle )
    m( 0, 0 ) = c
    m( 0, 1 ) = -s
    m( 1, 0 ) = s
    m( 1, 1 ) = c
End Sub

' Concatenate Two Matrices
' MA x MB => MC
Sub MtxCat( ma( 4, 4 ) as Double, mb( 4, 4 ) as Double, mc( 4, 4 ) as Double )
    MtxZero mc
    for i = 0 to 3
        for j = 0 to 3
            for k = 0 to 3
                mc( i ,j ) = mc( i ,j ) + ma( i, k ) * mb( k, j )
            next k
        next j
    next i
End Sub

' Transform Vector
Sub MtxApply ( m( 4, 4 ) as Double, vi( 3 ) as Double, vo( 3 ) as Double ) {
    x# = m( 0, 0 ) * vi( 0 ) + m( 0, 1 ) * vi( 1 ) + m( 0, 2 ) * vi( 2 ) + m( 0, 3 )
    y# = m( 1, 0 ) * vi( 0 ) + m( 1, 1 ) * vi( 1 ) + m( 1, 2 ) * vi( 2 ) + m( 1, 3 )
    z# = m( 2, 0 ) * vi( 0 ) + m( 2, 1 ) * vi( 1 ) + m( 2, 2 ) * vi( 2 ) + m( 2, 3 )
    k# = 1 / m( 3 , 3 )
    vo( 0 ) = k# * x#
    vo( 1 ) = k# * y#
    vo( 2 ) = k# * z#
End Sub

' Camera Matrix
Sub MtxLookAt( eye( 3 ) as Double, target( 3 ) as Double, up( 3 ) as Double, m( 4,4 ) as Double )
    Dim x( 3 ) as Double
    Dim y( 3 ) as Double
    Dim z( 3 ) as Double
    VecSub eye, target, z
    If ( VecLenSqr( z ) < TINY ) Then
        ' Eye and target are in the same position
        z( 2 ) = 1.0
    End If
    k# = VecNormal#( z, z )
    VecCross up, z, x
    If ( VecLenSqr( x ) < TINY ) Then
        ' Eye and target are in the same vertical
        z( 2 ) = z( 2 ) + 0.0001
        VecCross up, z, x
    End If
    k# = Vec.Normal#( x, x )
    VecCross z, x, y
    m( 0, 0 ) = x( 0 ) : m( 0, 1 ) = x( 1 ) : m( 0, 2 ) = x( 2 )
    m( 1, 0 ) = y( 0 ) : m( 1, 1 ) = y( 1 ) : m( 1, 2 ) = y( 2 )
    m( 2, 0 ) = z( 0 ) : m( 2, 1 ) = z( 1 ) : m( 2, 2 ) = z( 2 )
    m( 0, 3 ) = 0.0 : m( 1, 3 ) = 0.0 : m( 2, 3 ) = 0.0
    m( 3, 0 ) = 0.0 : m( 3, 1 ) = 0.0 : m( 3, 2 ) = 0.0
    m( 3, 3 ) = 1.0
End Sub
