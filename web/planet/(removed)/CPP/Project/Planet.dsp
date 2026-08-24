# Microsoft Developer Studio Project File - Name="Planet" - Package Owner=<4>
# Microsoft Developer Studio Generated Build File, Format Version 6.00
# ** DO NOT EDIT **

# TARGTYPE "Win32 (x86) Application" 0x0101

CFG=Planet - Win32 Release
!MESSAGE This is not a valid makefile. To build this project using NMAKE,
!MESSAGE use the Export Makefile command and run
!MESSAGE 
!MESSAGE NMAKE /f "Planet.mak".
!MESSAGE 
!MESSAGE You can specify a configuration when running NMAKE
!MESSAGE by defining the macro CFG on the command line. For example:
!MESSAGE 
!MESSAGE NMAKE /f "Planet.mak" CFG="Planet - Win32 Release"
!MESSAGE 
!MESSAGE Possible choices for configuration are:
!MESSAGE 
!MESSAGE "Planet - Win32 Release" (based on "Win32 (x86) Application")
!MESSAGE "Planet - Win32 Debug" (based on "Win32 (x86) Application")
!MESSAGE 

# Begin Project
# PROP AllowPerConfigDependencies 0
# PROP Scc_ProjName ""
# PROP Scc_LocalPath ""
CPP=cl.exe
MTL=midl.exe
RSC=rc.exe

!IF  "$(CFG)" == "Planet - Win32 Release"

# PROP BASE Use_MFC 6
# PROP BASE Use_Debug_Libraries 0
# PROP BASE Output_Dir ".\Release"
# PROP BASE Intermediate_Dir ".\Release"
# PROP BASE Target_Dir ""
# PROP Use_MFC 6
# PROP Use_Debug_Libraries 0
# PROP Output_Dir ".\Release"
# PROP Intermediate_Dir ".\Temp\Release"
# PROP Target_Dir ""
# ADD BASE CPP /nologo /MD /W3 /GX /D "WIN32" /D "NDEBUG" /D "_WINDOWS" /D "_AFXDLL" /D "_MBCS" /Yu"stdafx.h" /c
# ADD CPP /nologo /MD /W3 /GX /Gy /D "WIN32" /D "NDEBUG" /D "_WINDOWS" /D "_AFXDLL" /D "_MBCS" /YX /FD /c
# ADD BASE MTL /nologo /D "NDEBUG" /win32
# ADD MTL /nologo /D "NDEBUG" /mktyplib203 /win32
# ADD BASE RSC /l 0x409 /d "NDEBUG" /d "_AFXDLL"
# ADD RSC /l 0x409 /d "NDEBUG" /d "_AFXDLL"
BSC32=bscmake.exe
# ADD BASE BSC32 /nologo
# ADD BSC32 /nologo
LINK32=link.exe
# ADD BASE LINK32 /nologo /subsystem:windows /machine:I386
# ADD LINK32 /nologo /subsystem:windows /machine:I386

!ELSEIF  "$(CFG)" == "Planet - Win32 Debug"

# PROP BASE Use_MFC 6
# PROP BASE Use_Debug_Libraries 1
# PROP BASE Output_Dir ".\Debug"
# PROP BASE Intermediate_Dir ".\Debug"
# PROP BASE Target_Dir ""
# PROP Use_MFC 6
# PROP Use_Debug_Libraries 1
# PROP Output_Dir ".\Debug"
# PROP Intermediate_Dir ".\Temp\Debug"
# PROP Target_Dir ""
# ADD BASE CPP /nologo /MDd /W3 /Gm /GX /Zi /Od /D "WIN32" /D "_DEBUG" /D "_WINDOWS" /D "_AFXDLL" /D "_MBCS" /Yu"stdafx.h" /c
# ADD CPP /nologo /MDd /W3 /Gm /GX /ZI /Od /D "WIN32" /D "_DEBUG" /D "_WINDOWS" /D "_AFXDLL" /D "_MBCS" /YX /FD /c
# ADD BASE MTL /nologo /D "_DEBUG" /win32
# ADD MTL /nologo /D "_DEBUG" /mktyplib203 /win32
# ADD BASE RSC /l 0x409 /d "_DEBUG" /d "_AFXDLL"
# ADD RSC /l 0x409 /d "_DEBUG" /d "_AFXDLL"
BSC32=bscmake.exe
# ADD BASE BSC32 /nologo
# ADD BSC32 /nologo
LINK32=link.exe
# ADD BASE LINK32 /nologo /subsystem:windows /debug /machine:I386
# ADD LINK32 /nologo /subsystem:windows /debug /machine:I386 /out:".\Debug\PlanetD.exe"

!ENDIF 

# Begin Target

# Name "Planet - Win32 Release"
# Name "Planet - Win32 Debug"
# Begin Group "Source Files"

# PROP Default_Filter "cpp;c;cxx;rc;def;r;odl;idl;hpj;bat;for;f90"
# Begin Source File

SOURCE=.\ChildFrm.cpp
# End Source File
# Begin Source File

SOURCE=.\MainFrm.cpp
# End Source File
# Begin Source File

SOURCE=.\MakeTex.cpp
# End Source File
# Begin Source File

SOURCE=.\Mtx.cpp
# End Source File
# Begin Source File

SOURCE=.\PixMap.cpp
# End Source File
# Begin Source File

SOURCE=.\Planet.cpp
# End Source File
# Begin Source File

SOURCE=.\Planet.rc
# End Source File
# Begin Source File

SOURCE=.\PlanetDlg.cpp
# End Source File
# Begin Source File

SOURCE=.\PlanetDoc.cpp
# End Source File
# Begin Source File

SOURCE=.\PlanetView.cpp
# End Source File
# Begin Source File

SOURCE=.\PlanFunc.cpp
# End Source File
# Begin Source File

SOURCE=.\Power.cpp
# End Source File
# Begin Source File

SOURCE=.\Random.cpp
# End Source File
# Begin Source File

SOURCE=.\StdAfx.cpp
# ADD CPP /Yc"stdafx.h"
# End Source File
# Begin Source File

SOURCE=.\TexDlg.cpp
# End Source File
# Begin Source File

SOURCE=.\TexList.cpp
# End Source File
# Begin Source File

SOURCE=.\TextDlg.cpp
# End Source File
# Begin Source File

SOURCE=.\Texture.cpp
# End Source File
# End Group
# Begin Group "Header Files"

# PROP Default_Filter "h;hpp;hxx;hm;inl;fi;fd"
# Begin Source File

SOURCE=.\ChildFrm.h
# End Source File
# Begin Source File

SOURCE=.\MainFrm.h
# End Source File
# Begin Source File

SOURCE=.\MakeTex.h
# End Source File
# Begin Source File

SOURCE=.\Mtx.h
# End Source File
# Begin Source File

SOURCE=.\PixMap.h
# End Source File
# Begin Source File

SOURCE=.\Planet.h
# End Source File
# Begin Source File

SOURCE=.\PlanetDlg.h
# End Source File
# Begin Source File

SOURCE=.\PlanetDoc.h
# End Source File
# Begin Source File

SOURCE=.\PlanetView.h
# End Source File
# Begin Source File

SOURCE=.\PlanFunc.h
# End Source File
# Begin Source File

SOURCE=.\Power.h
# End Source File
# Begin Source File

SOURCE=.\Random.h
# End Source File
# Begin Source File

SOURCE=.\resource.h
# End Source File
# Begin Source File

SOURCE=.\StdAfx.h
# End Source File
# Begin Source File

SOURCE=.\TexDlg.h
# End Source File
# Begin Source File

SOURCE=.\TexList.h
# End Source File
# Begin Source File

SOURCE=.\TextDlg.h
# End Source File
# Begin Source File

SOURCE=.\Texture.h
# End Source File
# End Group
# Begin Group "Resource Files"

# PROP Default_Filter "ico;cur;bmp;dlg;rc2;rct;bin;cnt;rtf;gif;jpg;jpeg;jpe"
# Begin Source File

SOURCE=.\res\Planet.ico
# End Source File
# Begin Source File

SOURCE=.\res\Planet.rc2
# End Source File
# Begin Source File

SOURCE=.\res\PlanetDoc.ico
# End Source File
# Begin Source File

SOURCE=.\res\Toolbar.bmp
# End Source File
# End Group
# End Target
# End Project
# Section Planet : {857F08A1-AE87-11D4-B553-C0C34DC10101}
# 	0:11:TextDlg.cpp:D:\Dvs\Win\Planet\TextDlg.cpp
# 	0:9:TextDlg.h:D:\Dvs\Win\Planet\TextDlg.h
# 	1:11:IDD_TEXTDLG:102
# 	2:16:Resource Include:resource.h
# 	2:11:TextDlg.cpp:TextDlg.cpp
# 	2:9:TextDlg.h:TextDlg.h
# 	2:10:ENUM: enum:enum
# 	2:15:CLASS: CTextDlg:CTextDlg
# 	2:11:IDD_TEXTDLG:IDD_TEXTDLG
# 	2:19:Application Include:Planet.h
# End Section
