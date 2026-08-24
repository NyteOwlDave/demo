; CLW file contains information for the MFC ClassWizard

[General Info]
Version=1
LastClass=CTextDlg
LastTemplate=CDialog
NewFileInclude1=#include "stdafx.h"
NewFileInclude2=#include "Planet.h"
LastPage=0

ClassCount=9
Class1=CPlanetApp
Class2=CPlanetDoc
Class3=CPlanetView
Class4=CMainFrame

ResourceCount=6
Resource1=IDD_ABOUTBOX
Resource2=IDR_MAINFRAME
Resource3=IDR_PLANETTYPE
Class5=CAboutDlg
Class6=CChildFrame
Class7=CPlanetDlg
Resource4=IDD_PLANETDLG
Class8=CTexDlg
Resource5=IDD_TEXDLG
Resource6=IDD_TEXTDLG
Class9=CTextDlg

[CLS:CPlanetApp]
Type=0
HeaderFile=Planet.h
ImplementationFile=Planet.cpp
Filter=N
BaseClass=CWinApp
VirtualFilter=AC

[CLS:CPlanetDoc]
Type=0
HeaderFile=PlanetDoc.h
ImplementationFile=PlanetDoc.cpp
Filter=N
BaseClass=CDocument
VirtualFilter=DC

[CLS:CPlanetView]
Type=0
HeaderFile=PlanetView.h
ImplementationFile=PlanetView.cpp
Filter=C
BaseClass=CView
VirtualFilter=VWC
LastObject=CPlanetView

[CLS:CMainFrame]
Type=0
HeaderFile=MainFrm.h
ImplementationFile=MainFrm.cpp
Filter=T
BaseClass=CMDIFrameWnd
VirtualFilter=fWC


[CLS:CChildFrame]
Type=0
HeaderFile=ChildFrm.h
ImplementationFile=ChildFrm.cpp
Filter=M

[CLS:CAboutDlg]
Type=0
HeaderFile=Planet.cpp
ImplementationFile=Planet.cpp
Filter=D

[DLG:IDD_ABOUTBOX]
Type=1
Class=CAboutDlg
ControlCount=5
Control1=IDC_STATIC,static,1342177283
Control2=IDC_STATIC,static,1342308480
Control3=IDC_STATIC,static,1342308352
Control4=IDOK,button,1342373889
Control5=IDC_STATIC,static,1342308352

[MNU:IDR_MAINFRAME]
Type=1
Class=CMainFrame
Command1=ID_FILE_NEW
Command2=ID_FILE_OPEN
Command3=ID_FILE_MRU_FILE1
Command4=ID_APP_EXIT
Command5=ID_VIEW_TOOLBAR
Command6=ID_VIEW_STATUS_BAR
Command7=ID_APP_ABOUT
CommandCount=7

[TB:IDR_MAINFRAME]
Type=1
Class=CMainFrame
Command1=ID_FILE_NEW
Command2=ID_FILE_OPEN
Command3=ID_FILE_SAVE
Command4=ID_COMMAND_TEXTURES
Command5=ID_COMMAND_SETTINGS
Command6=ID_COMMAND_COMPILE
Command7=ID_COMMAND_RENDER
Command8=ID_COMMAND_ANIMATE
Command9=ID_COMMAND_SPINCW
Command10=ID_COMMAND_SPINCCW
Command11=ID_AUTOCOMPILE
Command12=ID_AUTORENDER
Command13=ID_APP_ABOUT
CommandCount=13

[MNU:IDR_PLANETTYPE]
Type=1
Class=CPlanetView
Command1=ID_FILE_NEW
Command2=ID_FILE_OPEN
Command3=ID_FILE_CLOSE
Command4=ID_FILE_SAVE
Command5=ID_FILE_SAVE_AS
Command6=ID_FILE_MRU_FILE1
Command7=ID_APP_EXIT
Command8=ID_EDIT_UNDO
Command9=ID_EDIT_CUT
Command10=ID_EDIT_COPY
Command11=ID_EDIT_PASTE
Command12=ID_COMMAND_SETTINGS
Command13=ID_COMMAND_TEXTURES
Command14=ID_COMMAND_COMPILE
Command15=ID_COMMAND_RENDER
Command16=ID_COMMAND_ANIMATE
Command17=ID_VIEW_TOOLBAR
Command18=ID_VIEW_STATUS_BAR
Command19=ID_WINDOW_NEW
Command20=ID_WINDOW_CASCADE
Command21=ID_WINDOW_TILE_HORZ
Command22=ID_WINDOW_ARRANGE
Command23=ID_WINDOW_MATCH
Command24=ID_APP_ABOUT
CommandCount=24

[DLG:IDD_PLANETDLG]
Type=1
Class=CPlanetDlg
ControlCount=9
Control1=IDC_STATIC,static,1342308352
Control2=IDC_XROT,edit,1350631552
Control3=IDC_YROT,edit,1350631552
Control4=IDC_STATIC,static,1342308352
Control5=IDC_PLANETSIZE,combobox,1344339971
Control6=IDOK,button,1342242817
Control7=IDC_IMAGE,static,1342177287
Control8=IDC_TEXTURE,button,1342242816
Control9=IDC_STATIC,static,1342308352

[CLS:CPlanetDlg]
Type=0
HeaderFile=PlanetDlg.h
ImplementationFile=PlanetDlg.cpp
BaseClass=CDialog
Filter=D
LastObject=CPlanetDlg
VirtualFilter=dWC

[ACL:IDR_MAINFRAME]
Type=1
Command1=ID_COMMAND_SPINCW
Command2=ID_COMMAND_SPINCCW
CommandCount=2

[DLG:IDD_TEXDLG]
Type=1
Class=CTexDlg
ControlCount=22
Control1=IDC_NAMES,combobox,1344339971
Control2=IDOK,button,1342242817
Control3=IDC_PREVIEW,static,1342177287
Control4=IDC_CURVE,button,1342242816
Control5=IDC_IMPORT,button,1342242816
Control6=IDC_BAND,button,1342242816
Control7=IDC_RENAME,button,1342242816
Control8=IDC_PALETTE,button,1342242816
Control9=IDC_DELETE,button,1342242816
Control10=IDC_STATIC,static,1342308352
Control11=IDC_STATIC,static,1342308352
Control12=IDC_BASE,edit,1350631552
Control13=IDC_STATIC,static,1342308352
Control14=IDC_EXPO,edit,1350631552
Control15=IDC_STATIC,static,1342308352
Control16=IDC_NUMC,edit,1350631552
Control17=IDC_STATIC,static,1342308352
Control18=IDC_STATIC,static,1342308352
Control19=IDC_MAKETEX,button,1342242816
Control20=IDC_STATIC,button,1342177287
Control21=IDC_MINC,static,1342308481
Control22=IDC_MAXC,static,1342308481

[CLS:CTexDlg]
Type=0
HeaderFile=TexDlg.h
ImplementationFile=TexDlg.cpp
BaseClass=CDialog
Filter=D
VirtualFilter=dWC
LastObject=CTexDlg

[DLG:IDD_TEXTDLG]
Type=1
Class=CTextDlg
ControlCount=1
Control1=IDC_TEXT,edit,1350631552

[CLS:CTextDlg]
Type=0
HeaderFile=TextDlg.h
ImplementationFile=TextDlg.cpp
BaseClass=CDialog

