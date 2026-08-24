# Microsoft Developer Studio Generated NMAKE File, Format Version 4.00
# ** DO NOT EDIT **

# TARGTYPE "Win32 (x86) Application" 0x0101

!IF "$(CFG)" == ""
CFG=Planet - Win32 Debug
!MESSAGE No configuration specified.  Defaulting to Planet - Win32 Debug.
!ENDIF 

!IF "$(CFG)" != "Planet - Win32 Release" && "$(CFG)" != "Planet - Win32 Debug"
!MESSAGE Invalid configuration "$(CFG)" specified.
!MESSAGE You can specify a configuration when running NMAKE on this makefile
!MESSAGE by defining the macro CFG on the command line.  For example:
!MESSAGE 
!MESSAGE NMAKE /f "Planet.mak" CFG="Planet - Win32 Debug"
!MESSAGE 
!MESSAGE Possible choices for configuration are:
!MESSAGE 
!MESSAGE "Planet - Win32 Release" (based on "Win32 (x86) Application")
!MESSAGE "Planet - Win32 Debug" (based on "Win32 (x86) Application")
!MESSAGE 
!ERROR An invalid configuration is specified.
!ENDIF 

!IF "$(OS)" == "Windows_NT"
NULL=
!ELSE 
NULL=nul
!ENDIF 
################################################################################
# Begin Project
# PROP Target_Last_Scanned "Planet - Win32 Debug"
RSC=rc.exe
CPP=cl.exe
MTL=mktyplib.exe

!IF  "$(CFG)" == "Planet - Win32 Release"

# PROP BASE Use_MFC 6
# PROP BASE Use_Debug_Libraries 0
# PROP BASE Output_Dir "Release"
# PROP BASE Intermediate_Dir "Release"
# PROP BASE Target_Dir ""
# PROP Use_MFC 6
# PROP Use_Debug_Libraries 0
# PROP Output_Dir "Release"
# PROP Intermediate_Dir "Temp\Release"
# PROP Target_Dir ""
OUTDIR=.\Release
INTDIR=.\Temp\Release

ALL : "$(OUTDIR)\Planet.exe" ".\Temp\Release\Planet.pch"

CLEAN : 
	-@erase ".\Temp\Release\Planet.pch"
	-@erase ".\Release\Planet.exe"
	-@erase ".\Temp\Release\Random.obj"
	-@erase ".\Temp\Release\TexList.obj"
	-@erase ".\Temp\Release\PlanFunc.obj"
	-@erase ".\Temp\Release\StdAfx.obj"
	-@erase ".\Temp\Release\PixMap.obj"
	-@erase ".\Temp\Release\Mtx.obj"
	-@erase ".\Temp\Release\Planet.obj"
	-@erase ".\Temp\Release\TexDlg.obj"
	-@erase ".\Temp\Release\Texture.obj"
	-@erase ".\Temp\Release\Power.obj"
	-@erase ".\Temp\Release\ChildFrm.obj"
	-@erase ".\Temp\Release\PlanetDlg.obj"
	-@erase ".\Temp\Release\TextDlg.obj"
	-@erase ".\Temp\Release\PlanetDoc.obj"
	-@erase ".\Temp\Release\MainFrm.obj"
	-@erase ".\Temp\Release\MakeTex.obj"
	-@erase ".\Temp\Release\PlanetView.obj"
	-@erase ".\Temp\Release\Planet.res"

"$(OUTDIR)" :
    if not exist "$(OUTDIR)/$(NULL)" mkdir "$(OUTDIR)"

"$(INTDIR)" :
    if not exist "$(INTDIR)/$(NULL)" mkdir "$(INTDIR)"

# ADD BASE CPP /nologo /MD /W3 /GX /D "WIN32" /D "NDEBUG" /D "_WINDOWS" /D "_AFXDLL" /D "_MBCS" /Yu"stdafx.h" /c
# ADD CPP /nologo /MD /W3 /GX /Gy /D "WIN32" /D "NDEBUG" /D "_WINDOWS" /D "_AFXDLL" /D "_MBCS" /YX /c
CPP_PROJ=/nologo /MD /W3 /GX /Gy /D "WIN32" /D "NDEBUG" /D "_WINDOWS" /D\
 "_AFXDLL" /D "_MBCS" /Fp"$(INTDIR)/Planet.pch" /YX /Fo"$(INTDIR)/" /c 
CPP_OBJS=.\Temp\Release/
CPP_SBRS=
# ADD BASE MTL /nologo /D "NDEBUG" /win32
# ADD MTL /nologo /D "NDEBUG" /win32
MTL_PROJ=/nologo /D "NDEBUG" /win32 
# ADD BASE RSC /l 0x409 /d "NDEBUG" /d "_AFXDLL"
# ADD RSC /l 0x409 /d "NDEBUG" /d "_AFXDLL"
RSC_PROJ=/l 0x409 /fo"$(INTDIR)/Planet.res" /d "NDEBUG" /d "_AFXDLL" 
BSC32=bscmake.exe
# ADD BASE BSC32 /nologo
# ADD BSC32 /nologo
BSC32_FLAGS=/nologo /o"$(OUTDIR)/Planet.bsc" 
BSC32_SBRS=
LINK32=link.exe
# ADD BASE LINK32 /nologo /subsystem:windows /machine:I386
# ADD LINK32 /nologo /subsystem:windows /machine:I386
LINK32_FLAGS=/nologo /subsystem:windows /incremental:no\
 /pdb:"$(OUTDIR)/Planet.pdb" /machine:I386 /out:"$(OUTDIR)/Planet.exe" 
LINK32_OBJS= \
	"$(INTDIR)/Random.obj" \
	"$(INTDIR)/TexList.obj" \
	"$(INTDIR)/PlanFunc.obj" \
	"$(INTDIR)/StdAfx.obj" \
	"$(INTDIR)/PixMap.obj" \
	"$(INTDIR)/Mtx.obj" \
	"$(INTDIR)/Planet.obj" \
	"$(INTDIR)/TexDlg.obj" \
	"$(INTDIR)/Texture.obj" \
	"$(INTDIR)/Power.obj" \
	"$(INTDIR)/ChildFrm.obj" \
	"$(INTDIR)/PlanetDlg.obj" \
	"$(INTDIR)/TextDlg.obj" \
	"$(INTDIR)/PlanetDoc.obj" \
	"$(INTDIR)/MainFrm.obj" \
	"$(INTDIR)/MakeTex.obj" \
	"$(INTDIR)/PlanetView.obj" \
	"$(INTDIR)/Planet.res"

"$(OUTDIR)\Planet.exe" : "$(OUTDIR)" $(DEF_FILE) $(LINK32_OBJS)
    $(LINK32) @<<
  $(LINK32_FLAGS) $(LINK32_OBJS)
<<

!ELSEIF  "$(CFG)" == "Planet - Win32 Debug"

# PROP BASE Use_MFC 6
# PROP BASE Use_Debug_Libraries 1
# PROP BASE Output_Dir "Debug"
# PROP BASE Intermediate_Dir "Debug"
# PROP BASE Target_Dir ""
# PROP Use_MFC 6
# PROP Use_Debug_Libraries 1
# PROP Output_Dir "Debug"
# PROP Intermediate_Dir "Temp\Debug"
# PROP Target_Dir ""
OUTDIR=.\Debug
INTDIR=.\Temp\Debug

ALL : "$(OUTDIR)\PlanetD.exe" ".\Temp\Debug\Planet.pch"

CLEAN : 
	-@erase ".\Temp\Debug\vc40.pdb"
	-@erase ".\Temp\Debug\vc40.idb"
	-@erase ".\Temp\Debug\Planet.pch"
	-@erase ".\Debug\PlanetD.exe"
	-@erase ".\Temp\Debug\ChildFrm.obj"
	-@erase ".\Temp\Debug\Power.obj"
	-@erase ".\Temp\Debug\PixMap.obj"
	-@erase ".\Temp\Debug\PlanFunc.obj"
	-@erase ".\Temp\Debug\Texture.obj"
	-@erase ".\Temp\Debug\Mtx.obj"
	-@erase ".\Temp\Debug\Planet.obj"
	-@erase ".\Temp\Debug\TexDlg.obj"
	-@erase ".\Temp\Debug\MainFrm.obj"
	-@erase ".\Temp\Debug\MakeTex.obj"
	-@erase ".\Temp\Debug\StdAfx.obj"
	-@erase ".\Temp\Debug\PlanetDlg.obj"
	-@erase ".\Temp\Debug\TextDlg.obj"
	-@erase ".\Temp\Debug\PlanetDoc.obj"
	-@erase ".\Temp\Debug\Random.obj"
	-@erase ".\Temp\Debug\TexList.obj"
	-@erase ".\Temp\Debug\PlanetView.obj"
	-@erase ".\Temp\Debug\Planet.res"
	-@erase ".\Debug\PlanetD.ilk"
	-@erase ".\Debug\PlanetD.pdb"

"$(OUTDIR)" :
    if not exist "$(OUTDIR)/$(NULL)" mkdir "$(OUTDIR)"

"$(INTDIR)" :
    if not exist "$(INTDIR)/$(NULL)" mkdir "$(INTDIR)"

# ADD BASE CPP /nologo /MDd /W3 /Gm /GX /Zi /Od /D "WIN32" /D "_DEBUG" /D "_WINDOWS" /D "_AFXDLL" /D "_MBCS" /Yu"stdafx.h" /c
# ADD CPP /nologo /MDd /W3 /Gm /GX /Zi /Od /D "WIN32" /D "_DEBUG" /D "_WINDOWS" /D "_AFXDLL" /D "_MBCS" /YX /c
CPP_PROJ=/nologo /MDd /W3 /Gm /GX /Zi /Od /D "WIN32" /D "_DEBUG" /D "_WINDOWS"\
 /D "_AFXDLL" /D "_MBCS" /Fp"$(INTDIR)/Planet.pch" /YX /Fo"$(INTDIR)/"\
 /Fd"$(INTDIR)/" /c 
CPP_OBJS=.\Temp\Debug/
CPP_SBRS=
# ADD BASE MTL /nologo /D "_DEBUG" /win32
# ADD MTL /nologo /D "_DEBUG" /win32
MTL_PROJ=/nologo /D "_DEBUG" /win32 
# ADD BASE RSC /l 0x409 /d "_DEBUG" /d "_AFXDLL"
# ADD RSC /l 0x409 /d "_DEBUG" /d "_AFXDLL"
RSC_PROJ=/l 0x409 /fo"$(INTDIR)/Planet.res" /d "_DEBUG" /d "_AFXDLL" 
BSC32=bscmake.exe
# ADD BASE BSC32 /nologo
# ADD BSC32 /nologo
BSC32_FLAGS=/nologo /o"$(OUTDIR)/Planet.bsc" 
BSC32_SBRS=
LINK32=link.exe
# ADD BASE LINK32 /nologo /subsystem:windows /debug /machine:I386
# ADD LINK32 /nologo /subsystem:windows /debug /machine:I386 /out:"Debug/PlanetD.exe"
LINK32_FLAGS=/nologo /subsystem:windows /incremental:yes\
 /pdb:"$(OUTDIR)/PlanetD.pdb" /debug /machine:I386 /out:"$(OUTDIR)/PlanetD.exe" 
LINK32_OBJS= \
	"$(INTDIR)/ChildFrm.obj" \
	"$(INTDIR)/Power.obj" \
	"$(INTDIR)/PixMap.obj" \
	"$(INTDIR)/PlanFunc.obj" \
	"$(INTDIR)/Texture.obj" \
	"$(INTDIR)/Mtx.obj" \
	"$(INTDIR)/Planet.obj" \
	"$(INTDIR)/TexDlg.obj" \
	"$(INTDIR)/MainFrm.obj" \
	"$(INTDIR)/MakeTex.obj" \
	"$(INTDIR)/StdAfx.obj" \
	"$(INTDIR)/PlanetDlg.obj" \
	"$(INTDIR)/TextDlg.obj" \
	"$(INTDIR)/PlanetDoc.obj" \
	"$(INTDIR)/Random.obj" \
	"$(INTDIR)/TexList.obj" \
	"$(INTDIR)/PlanetView.obj" \
	"$(INTDIR)/Planet.res"

"$(OUTDIR)\PlanetD.exe" : "$(OUTDIR)" $(DEF_FILE) $(LINK32_OBJS)
    $(LINK32) @<<
  $(LINK32_FLAGS) $(LINK32_OBJS)
<<

!ENDIF 

.c{$(CPP_OBJS)}.obj:
   $(CPP) $(CPP_PROJ) $<  

.cpp{$(CPP_OBJS)}.obj:
   $(CPP) $(CPP_PROJ) $<  

.cxx{$(CPP_OBJS)}.obj:
   $(CPP) $(CPP_PROJ) $<  

.c{$(CPP_SBRS)}.sbr:
   $(CPP) $(CPP_PROJ) $<  

.cpp{$(CPP_SBRS)}.sbr:
   $(CPP) $(CPP_PROJ) $<  

.cxx{$(CPP_SBRS)}.sbr:
   $(CPP) $(CPP_PROJ) $<  

################################################################################
# Begin Target

# Name "Planet - Win32 Release"
# Name "Planet - Win32 Debug"

!IF  "$(CFG)" == "Planet - Win32 Release"

!ELSEIF  "$(CFG)" == "Planet - Win32 Debug"

!ENDIF 

################################################################################
# Begin Source File

SOURCE=.\Planet.cpp
DEP_CPP_PLANE=\
	".\StdAfx.h"\
	".\Planet.h"\
	".\MainFrm.h"\
	".\ChildFrm.h"\
	".\PlanetDoc.h"\
	".\PlanetView.h"\
	".\TexDlg.h"\
	".\Random.h"\
	{$(INCLUDE)}"\DwwWin.h"\
	{$(INCLUDE)}"\DwwLib.h"\
	"..\..\..\Lib\Win\Inc\TextLibDef.h"\
	"..\..\..\Lib\Win\Inc\FileLibDef.h"\
	"..\..\..\Lib\Win\Inc\CtrlLibDef.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwMac.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwType.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwChar.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwLzss.h"\
	".\TexList.h"\
	".\Texture.h"\
	".\PixMap.h"\
	".\PlanFunc.h"\
	

"$(INTDIR)\Planet.obj" : $(SOURCE) $(DEP_CPP_PLANE) "$(INTDIR)"


# End Source File
################################################################################
# Begin Source File

SOURCE=.\StdAfx.cpp
DEP_CPP_STDAF=\
	".\StdAfx.h"\
	{$(INCLUDE)}"\DwwWin.h"\
	{$(INCLUDE)}"\DwwLib.h"\
	"..\..\..\Lib\Win\Inc\TextLibDef.h"\
	"..\..\..\Lib\Win\Inc\FileLibDef.h"\
	"..\..\..\Lib\Win\Inc\CtrlLibDef.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwMac.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwType.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwChar.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwLzss.h"\
	

!IF  "$(CFG)" == "Planet - Win32 Release"

# ADD CPP /Yc"stdafx.h"

BuildCmds= \
	$(CPP) /nologo /MD /W3 /GX /Gy /D "WIN32" /D "NDEBUG" /D "_WINDOWS" /D\
 "_AFXDLL" /D "_MBCS" /Fp"$(INTDIR)/Planet.pch" /Yc"stdafx.h" /Fo"$(INTDIR)/" /c\
 $(SOURCE) \
	

"$(INTDIR)\StdAfx.obj" : $(SOURCE) $(DEP_CPP_STDAF) "$(INTDIR)"
   $(BuildCmds)

"$(INTDIR)\Planet.pch" : $(SOURCE) $(DEP_CPP_STDAF) "$(INTDIR)"
   $(BuildCmds)

!ELSEIF  "$(CFG)" == "Planet - Win32 Debug"

# ADD CPP /Yc"stdafx.h"

BuildCmds= \
	$(CPP) /nologo /MDd /W3 /Gm /GX /Zi /Od /D "WIN32" /D "_DEBUG" /D "_WINDOWS"\
 /D "_AFXDLL" /D "_MBCS" /Fp"$(INTDIR)/Planet.pch" /Yc"stdafx.h" /Fo"$(INTDIR)/"\
 /Fd"$(INTDIR)/" /c $(SOURCE) \
	

"$(INTDIR)\StdAfx.obj" : $(SOURCE) $(DEP_CPP_STDAF) "$(INTDIR)"
   $(BuildCmds)

"$(INTDIR)\Planet.pch" : $(SOURCE) $(DEP_CPP_STDAF) "$(INTDIR)"
   $(BuildCmds)

!ENDIF 

# End Source File
################################################################################
# Begin Source File

SOURCE=.\MainFrm.cpp
DEP_CPP_MAINF=\
	".\StdAfx.h"\
	".\Planet.h"\
	".\MainFrm.h"\
	{$(INCLUDE)}"\DwwWin.h"\
	{$(INCLUDE)}"\DwwLib.h"\
	"..\..\..\Lib\Win\Inc\TextLibDef.h"\
	"..\..\..\Lib\Win\Inc\FileLibDef.h"\
	"..\..\..\Lib\Win\Inc\CtrlLibDef.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwMac.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwType.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwChar.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwLzss.h"\
	".\TexList.h"\
	".\Texture.h"\
	".\PixMap.h"\
	

"$(INTDIR)\MainFrm.obj" : $(SOURCE) $(DEP_CPP_MAINF) "$(INTDIR)"


# End Source File
################################################################################
# Begin Source File

SOURCE=.\ChildFrm.cpp
DEP_CPP_CHILD=\
	".\StdAfx.h"\
	".\Planet.h"\
	".\ChildFrm.h"\
	{$(INCLUDE)}"\DwwWin.h"\
	{$(INCLUDE)}"\DwwLib.h"\
	"..\..\..\Lib\Win\Inc\TextLibDef.h"\
	"..\..\..\Lib\Win\Inc\FileLibDef.h"\
	"..\..\..\Lib\Win\Inc\CtrlLibDef.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwMac.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwType.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwChar.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwLzss.h"\
	".\TexList.h"\
	".\Texture.h"\
	".\PixMap.h"\
	

"$(INTDIR)\ChildFrm.obj" : $(SOURCE) $(DEP_CPP_CHILD) "$(INTDIR)"


# End Source File
################################################################################
# Begin Source File

SOURCE=.\PlanetDoc.cpp
DEP_CPP_PLANET=\
	".\StdAfx.h"\
	".\Planet.h"\
	".\PlanetDoc.h"\
	".\PlanetDlg.h"\
	{$(INCLUDE)}"\DwwWin.h"\
	{$(INCLUDE)}"\DwwLib.h"\
	"..\..\..\Lib\Win\Inc\TextLibDef.h"\
	"..\..\..\Lib\Win\Inc\FileLibDef.h"\
	"..\..\..\Lib\Win\Inc\CtrlLibDef.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwMac.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwType.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwChar.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwLzss.h"\
	".\TexList.h"\
	".\Texture.h"\
	".\PixMap.h"\
	".\PlanFunc.h"\
	

"$(INTDIR)\PlanetDoc.obj" : $(SOURCE) $(DEP_CPP_PLANET) "$(INTDIR)"


# End Source File
################################################################################
# Begin Source File

SOURCE=.\PlanetView.cpp
DEP_CPP_PLANETV=\
	".\StdAfx.h"\
	".\Planet.h"\
	".\PlanetDoc.h"\
	".\PlanetView.h"\
	{$(INCLUDE)}"\DwwWin.h"\
	{$(INCLUDE)}"\DwwLib.h"\
	"..\..\..\Lib\Win\Inc\TextLibDef.h"\
	"..\..\..\Lib\Win\Inc\FileLibDef.h"\
	"..\..\..\Lib\Win\Inc\CtrlLibDef.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwMac.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwType.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwChar.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwLzss.h"\
	".\TexList.h"\
	".\Texture.h"\
	".\PixMap.h"\
	".\PlanFunc.h"\
	

"$(INTDIR)\PlanetView.obj" : $(SOURCE) $(DEP_CPP_PLANETV) "$(INTDIR)"


# End Source File
################################################################################
# Begin Source File

SOURCE=.\Planet.rc
DEP_RSC_PLANET_=\
	".\res\Planet.ico"\
	".\res\PlanetDoc.ico"\
	".\res\Toolbar.bmp"\
	".\res\Planet.rc2"\
	

"$(INTDIR)\Planet.res" : $(SOURCE) $(DEP_RSC_PLANET_) "$(INTDIR)"
   $(RSC) $(RSC_PROJ) $(SOURCE)


# End Source File
################################################################################
# Begin Source File

SOURCE=.\PixMap.cpp
DEP_CPP_PIXMA=\
	".\StdAfx.h"\
	".\PixMap.h"\
	{$(INCLUDE)}"\DwwWin.h"\
	{$(INCLUDE)}"\DwwLib.h"\
	"..\..\..\Lib\Win\Inc\TextLibDef.h"\
	"..\..\..\Lib\Win\Inc\FileLibDef.h"\
	"..\..\..\Lib\Win\Inc\CtrlLibDef.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwMac.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwType.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwChar.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwLzss.h"\
	

"$(INTDIR)\PixMap.obj" : $(SOURCE) $(DEP_CPP_PIXMA) "$(INTDIR)"


# End Source File
################################################################################
# Begin Source File

SOURCE=.\PlanFunc.cpp
DEP_CPP_PLANF=\
	".\StdAfx.h"\
	".\PlanFunc.h"\
	".\Mtx.h"\
	{$(INCLUDE)}"\DwwWin.h"\
	{$(INCLUDE)}"\DwwLib.h"\
	"..\..\..\Lib\Win\Inc\TextLibDef.h"\
	"..\..\..\Lib\Win\Inc\FileLibDef.h"\
	"..\..\..\Lib\Win\Inc\CtrlLibDef.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwMac.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwType.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwChar.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwLzss.h"\
	

"$(INTDIR)\PlanFunc.obj" : $(SOURCE) $(DEP_CPP_PLANF) "$(INTDIR)"


# End Source File
################################################################################
# Begin Source File

SOURCE=.\PlanetDlg.cpp
DEP_CPP_PLANETD=\
	".\StdAfx.h"\
	".\Planet.h"\
	".\PlanetDlg.h"\
	".\TexDlg.h"\
	{$(INCLUDE)}"\DwwWin.h"\
	{$(INCLUDE)}"\DwwLib.h"\
	"..\..\..\Lib\Win\Inc\TextLibDef.h"\
	"..\..\..\Lib\Win\Inc\FileLibDef.h"\
	"..\..\..\Lib\Win\Inc\CtrlLibDef.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwMac.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwType.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwChar.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwLzss.h"\
	".\TexList.h"\
	".\Texture.h"\
	".\PixMap.h"\
	".\PlanFunc.h"\
	

"$(INTDIR)\PlanetDlg.obj" : $(SOURCE) $(DEP_CPP_PLANETD) "$(INTDIR)"


# End Source File
################################################################################
# Begin Source File

SOURCE=.\Mtx.cpp
DEP_CPP_MTX_C=\
	".\StdAfx.h"\
	".\Mtx.h"\
	{$(INCLUDE)}"\DwwWin.h"\
	{$(INCLUDE)}"\DwwLib.h"\
	"..\..\..\Lib\Win\Inc\TextLibDef.h"\
	"..\..\..\Lib\Win\Inc\FileLibDef.h"\
	"..\..\..\Lib\Win\Inc\CtrlLibDef.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwMac.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwType.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwChar.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwLzss.h"\
	

"$(INTDIR)\Mtx.obj" : $(SOURCE) $(DEP_CPP_MTX_C) "$(INTDIR)"


# End Source File
################################################################################
# Begin Source File

SOURCE=.\TexList.cpp
DEP_CPP_TEXLI=\
	".\StdAfx.h"\
	".\TexList.h"\
	{$(INCLUDE)}"\CFileGet.h"\
	{$(INCLUDE)}"\DwwWin.h"\
	{$(INCLUDE)}"\DwwLib.h"\
	"..\..\..\Lib\Win\Inc\TextLibDef.h"\
	"..\..\..\Lib\Win\Inc\FileLibDef.h"\
	"..\..\..\Lib\Win\Inc\CtrlLibDef.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwMac.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwType.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwChar.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwLzss.h"\
	".\Texture.h"\
	".\PixMap.h"\
	

"$(INTDIR)\TexList.obj" : $(SOURCE) $(DEP_CPP_TEXLI) "$(INTDIR)"


# End Source File
################################################################################
# Begin Source File

SOURCE=.\Texture.cpp
DEP_CPP_TEXTU=\
	".\StdAfx.h"\
	".\Texture.h"\
	{$(INCLUDE)}"\DwwWin.h"\
	{$(INCLUDE)}"\DwwLib.h"\
	"..\..\..\Lib\Win\Inc\TextLibDef.h"\
	"..\..\..\Lib\Win\Inc\FileLibDef.h"\
	"..\..\..\Lib\Win\Inc\CtrlLibDef.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwMac.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwType.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwChar.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwLzss.h"\
	".\PixMap.h"\
	

"$(INTDIR)\Texture.obj" : $(SOURCE) $(DEP_CPP_TEXTU) "$(INTDIR)"


# End Source File
################################################################################
# Begin Source File

SOURCE=.\MakeTex.cpp
DEP_CPP_MAKET=\
	".\StdAfx.h"\
	".\MakeTex.h"\
	".\Random.h"\
	".\Power.h"\
	{$(INCLUDE)}"\DwwWin.h"\
	{$(INCLUDE)}"\DwwLib.h"\
	"..\..\..\Lib\Win\Inc\TextLibDef.h"\
	"..\..\..\Lib\Win\Inc\FileLibDef.h"\
	"..\..\..\Lib\Win\Inc\CtrlLibDef.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwMac.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwType.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwChar.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwLzss.h"\
	

"$(INTDIR)\MakeTex.obj" : $(SOURCE) $(DEP_CPP_MAKET) "$(INTDIR)"


# End Source File
################################################################################
# Begin Source File

SOURCE=.\TexDlg.cpp
DEP_CPP_TEXDL=\
	".\StdAfx.h"\
	".\Planet.h"\
	".\TexDlg.h"\
	".\MakeTex.h"\
	".\TextDlg.h"\
	{$(INCLUDE)}"\DwwWin.h"\
	{$(INCLUDE)}"\DwwLib.h"\
	"..\..\..\Lib\Win\Inc\TextLibDef.h"\
	"..\..\..\Lib\Win\Inc\FileLibDef.h"\
	"..\..\..\Lib\Win\Inc\CtrlLibDef.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwMac.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwType.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwChar.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwLzss.h"\
	".\TexList.h"\
	".\Texture.h"\
	".\PixMap.h"\
	

"$(INTDIR)\TexDlg.obj" : $(SOURCE) $(DEP_CPP_TEXDL) "$(INTDIR)"


# End Source File
################################################################################
# Begin Source File

SOURCE=.\Random.cpp
DEP_CPP_RANDO=\
	".\StdAfx.h"\
	".\Random.h"\
	{$(INCLUDE)}"\DwwWin.h"\
	{$(INCLUDE)}"\DwwLib.h"\
	"..\..\..\Lib\Win\Inc\TextLibDef.h"\
	"..\..\..\Lib\Win\Inc\FileLibDef.h"\
	"..\..\..\Lib\Win\Inc\CtrlLibDef.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwMac.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwType.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwChar.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwLzss.h"\
	

"$(INTDIR)\Random.obj" : $(SOURCE) $(DEP_CPP_RANDO) "$(INTDIR)"


# End Source File
################################################################################
# Begin Source File

SOURCE=.\Power.cpp
DEP_CPP_POWER=\
	".\StdAfx.h"\
	".\Power.h"\
	{$(INCLUDE)}"\DwwWin.h"\
	{$(INCLUDE)}"\DwwLib.h"\
	"..\..\..\Lib\Win\Inc\TextLibDef.h"\
	"..\..\..\Lib\Win\Inc\FileLibDef.h"\
	"..\..\..\Lib\Win\Inc\CtrlLibDef.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwMac.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwType.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwChar.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwLzss.h"\
	

"$(INTDIR)\Power.obj" : $(SOURCE) $(DEP_CPP_POWER) "$(INTDIR)"


# End Source File
################################################################################
# Begin Source File

SOURCE=.\TextDlg.cpp
DEP_CPP_TEXTD=\
	".\StdAfx.h"\
	".\Planet.h"\
	".\TextDlg.h"\
	{$(INCLUDE)}"\DwwWin.h"\
	{$(INCLUDE)}"\DwwLib.h"\
	"..\..\..\Lib\Win\Inc\TextLibDef.h"\
	"..\..\..\Lib\Win\Inc\FileLibDef.h"\
	"..\..\..\Lib\Win\Inc\CtrlLibDef.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwMac.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwType.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwChar.h"\
	"..\..\..\Lib\Win\Dww\Inc\DwwLzss.h"\
	".\TexList.h"\
	".\Texture.h"\
	".\PixMap.h"\
	

"$(INTDIR)\TextDlg.obj" : $(SOURCE) $(DEP_CPP_TEXTD) "$(INTDIR)"


# End Source File
# End Target
# End Project
################################################################################
################################################################################
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
################################################################################
