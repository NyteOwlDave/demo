100 REM ct_vfield_applesoft_basic
110     HOME
120     HGR: HCOLOR = 3: VTAB 22
130     PRINT "ct_vfield_applesoft_basic"
140     GOSUB 1000
150     GOSUB 3000
160     SP = 0
170     RS(SP, 0) = 0
180     RS(SP, 1) = -1
190     RS(SP, 2) = 0
200     RS(SP, 3) = 1
210     RS(SP, 4) = 0
220     GOSUB 8000
230     V1(1) = 0: V1(2) = 0: V1(3) = 1: V1(4) = 128
240     GOSUB 6000
245     PRINT "Chris Thomasson's Koch Complete!"
250 END

1000 REM ct_init
1010     PRINT "ct_init"
1020     DIM A0(6)
1030     DIM V0(4)
1040     DIM V1(4)
1050     DIM V2(4)
1060     DIM V3(4)
1070     DIM V4(4)
1080     DIM V5(4)
1090     RN = 3
1100     DIM RS(RN, 16)
1110         GOSUB 2000
1120 RETURN

2000 REM ct_init_plane
2010     PRINT "ct_init_plane"
2020     A0(1) = 279: REM m_plane.m_width
2030     A0(2) = 191: REM m_plane.m_height
2040     A0(3) = 0.0126106: REM m_plane.m_xstep
2050     A0(4) = 0.0126316: REM m_plane.m_ystep
2060     A0(5) = -1.75288: REM m_plane.m_axes.m_xmin
2070     A0(6) = 1.2: REM m_plane.m_axes.m_ymax
2080 RETURN

3000 REM ct_display_plane
3010     PRINT "ct_display_plane"
3020     FOR I0 = 1 TO 6
3030         PRINT "A0("; I0; ") = " A0(I0)
3040     NEXT I0
3050 RETURN

4000 REM ct_project_point
4010     REM PRINT "ct_project_point"
4020     V0(3) = (V0(1) - A0(5)) / A0(3)
4030     V0(4) = (A0(6) - V0(2)) / A0(4)
4040     IF V0(3) < 0 THEN V0(3) = INT(V0(3) - .5)
4050     IF V0(3) >= 0 THEN V0(3) = INT(V0(3) + .5)
4060     IF V0(4) < 0 THEN V0(4) = INT(V0(4) - .5)
4070     IF V0(4) >= 0 THEN V0(4) = INT(V0(4) + .5)
4080 RETURN

5000 REM ct_plot_point
5010     REM PRINT "ct_plot_point"
5020     GOSUB 4000
5030     IF V0(3) > -1 AND V0(3) <= A0(1) AND V0(4) > -1 AND V0(4) <= A0(2) THEN HPLOT V0(3), V0(4)
5040 RETURN

6000 REM ct_plot_circle
6010     PRINT "ct_plot_circle"
6020     AB = 6.28318 / V1(4)
6030     FOR I1 = 0 TO 6.28318 STEP AB
6040         V0(1) = V1(1) + COS(I1) * V1(3)
6050         V0(2) = V1(2) + SIN(I1) * V1(3)
6060         GOSUB 5000
6070     NEXT I1
6080 RETURN

7000 REM ct_plot_line
7010     PRINT "ct_plot_line"
7020     V0(1) = V5(1): V0(2) = V5(2)
7030     GOSUB 4000
7040     IF V0(3) < 0 THEN V0(3) = 0
7050     IF V0(3) > A0(1) THEN V0(3) = A0(1)
7060     IF V0(4) < 0 THEN V0(4) = 0
7070     IF V0(4) > A0(2) THEN V0(4) = A0(2)
7080     HPLOT V0(3), V0(4)
7090     V0(1) = V5(3): V0(2) = V5(4)
7100     GOSUB 4000
7110     IF V0(3) < 0 THEN V0(3) = 0
7120     IF V0(3) > A0(1) THEN V0(3) = A0(1)
7130     IF V0(4) < 0 THEN V0(4) = 0
7140     IF V0(4) > A0(2) THEN V0(4) = A0(2)
7150     HPLOT TO V0(3), V0(4)
7160 RETURN

8000 REM ct_koch
8010     IF RS(SP, 0) >= RN THEN RETURN
8020     PRINT "ct_koch = "; RS(SP, 0); " "; RS(SP, 1); " "; RS(SP, 2); " "; RS(SP, 3); " "; RS(SP, 4)"
8030     RS(SP, 5) = RS(SP, 3) - RS(SP, 1) : REM difx
8040     RS(SP, 6) = RS(SP, 4) - RS(SP, 2) : REM dify
8050     RS(SP, 7) = RS(SP, 1) + RS(SP, 5) / 2 : REM dify
8060     RS(SP, 8) = RS(SP, 2) + RS(SP, 6) / 2 : REM dify
8070     RS(SP, 9) = -RS(SP, 6) : REM perpx
8080     RS(SP, 10) = RS(SP, 5) : REM perpy
8090     RS(SP, 11) = RS(SP, 7) + RS(SP, 9) / 3 : REM tipx
8100     RS(SP, 12) = RS(SP, 8) + RS(SP, 10) / 3 : REM tipy
8110     RS(SP, 13) = RS(SP, 1) + RS(SP, 5) / 3 : REM k0x
8120     RS(SP, 14) = RS(SP, 2) + RS(SP, 6) / 3 : REM k0y
8130     RS(SP, 15) = RS(SP, 3) - RS(SP, 5) / 3 : REM k1x
8140     RS(SP, 16) = RS(SP, 4) - RS(SP, 6) / 3 : REM k1y

8145     IF RS(SP, 0) < RN - 1 GOTO 8230
8150     V5(1) = RS(SP, 1): V5(2) = RS(SP, 2): V5(3) = RS(SP, 13): V5(4) = RS(SP, 14)
8160     GOSUB 7000
8170     V5(1) = RS(SP, 13): V5(2) = RS(SP, 14): V5(3) = RS(SP, 11): V5(4) = RS(SP, 12)
8180     GOSUB 7000
8190     V5(1) = RS(SP, 11): V5(2) = RS(SP, 12): V5(3) = RS(SP, 15): V5(4) = RS(SP, 16)
8200     GOSUB 7000
8210     V5(1) = RS(SP, 15): V5(2) = RS(SP, 16): V5(3) = RS(SP, 3): V5(4) = RS(SP, 4)
8220     GOSUB 7000

8230     REM line 0
8240     SP = SP + 1
8250     RS(SP, 0) = RS(SP - 1, 0) + 1
8260     RS(SP, 1) = RS(SP - 1, 1)
8270     RS(SP, 2) = RS(SP - 1, 2)
8280     RS(SP, 3) = RS(SP - 1, 13)
8290     RS(SP, 4) = RS(SP - 1, 14)
8300     GOSUB 8000
8310     SP = SP - 1
8320     REM line 1
8330     SP = SP + 1
8340     RS(SP, 0) = RS(SP - 1, 0) + 1
8350     RS(SP, 1) = RS(SP - 1, 13)
8360     RS(SP, 2) = RS(SP - 1, 14)
8370     RS(SP, 3) = RS(SP - 1, 11)
8380     RS(SP, 4) = RS(SP - 1, 12)
8390     GOSUB 8000
8400     SP = SP - 1
8410     REM line 2
8420     SP = SP + 1
8430     RS(SP, 0) = RS(SP - 1, 0) + 1
8440     RS(SP, 1) = RS(SP - 1, 11)
8450     RS(SP, 2) = RS(SP - 1, 12)
8460     RS(SP, 3) = RS(SP - 1, 15)
8470     RS(SP, 4) = RS(SP - 1, 16)
8480     GOSUB 8000
8490     SP = SP - 1
8500     REM line 3
8510     SP = SP + 1
8520     RS(SP, 0) = RS(SP - 1, 0) + 1
8530     RS(SP, 1) = RS(SP - 1, 15)
8540     RS(SP, 2) = RS(SP - 1, 16)
8550     RS(SP, 3) = RS(SP - 1, 3)
8560     RS(SP, 4) = RS(SP - 1, 4)
8570     GOSUB 8000
8580     SP = SP - 1
8590 RETURN