
/////////////////////////////////////////////////////////////////////////////
//
// TexDlg.cpp - Texture Management Dialog
//  Dave Wellsted, Mar 2001
//
/////////////////////////////////////////////////////////////////////////////

#include "stdafx.h"
#include "Planet.h"
#include "TexDlg.h"
#include "MakeTex.h"
#include "TextDlg.h"



/////////////////////////////////////////////////////////////////////////////
// Debug Junk
/////////////////////////////////////////////////////////////////////////////

#ifdef _DEBUG
	#define new DEBUG_NEW
	#undef THIS_FILE
	static char THIS_FILE[] = __FILE__;
#endif



/////////////////////////////////////////////////////////////////////////////
// Message Map
/////////////////////////////////////////////////////////////////////////////

BEGIN_MESSAGE_MAP(CTexDlg, CDialog)
	//{{AFX_MSG_MAP(CTexDlg)
	ON_BN_CLICKED(IDC_BAND, OnBand)
	ON_BN_CLICKED(IDC_CURVE, OnCurve)
	ON_BN_CLICKED(IDC_DELETE, OnDelete)
	ON_BN_CLICKED(IDC_IMPORT, OnImport)
	ON_BN_CLICKED(IDC_MAKETEX, OnMakeTex)
	ON_BN_CLICKED(IDC_PALETTE, OnPalette)
	ON_BN_CLICKED(IDC_RENAME, OnRename)
	ON_WM_PAINT()
	ON_CBN_SELCHANGE(IDC_NAMES, OnSelchangeNames)
	ON_WM_CTLCOLOR()
	ON_WM_LBUTTONUP()
	//}}AFX_MSG_MAP
END_MESSAGE_MAP()



/////////////////////////////////////////////////////////////////////////////
// Construction
/////////////////////////////////////////////////////////////////////////////

CTexDlg::CTexDlg( CWnd* pParent )
		: CDialog( CTexDlg::IDD, pParent ) {

	//{{AFX_DATA_INIT(CTexDlg)
	m_base = 0.0;
	m_expo = 0.0;
	m_uNum = 0;
	//}}AFX_DATA_INIT

	m_base = ::atof( GPS( "Prefs", "FracBase", "20.0" ) );
	m_expo = ::atof( GPS( "Prefs", "FracExpo", "3.0" ) );

	m_uNum   = GPI( "Prefs", "NumC", 255 );
	m_crMinC = GPI( "Prefs", "MinC", 0x101010 );
	m_crMaxC = GPI( "Prefs", "MaxC", 0xFFFFFF );

	m_pTexture = NULL;
	m_brMinC.CreateSolidBrush( m_crMinC );
	m_brMaxC.CreateSolidBrush( m_crMaxC );
}



/////////////////////////////////////////////////////////////////////////////
// DDX/DDV
/////////////////////////////////////////////////////////////////////////////

void CTexDlg::DoDataExchange( CDataExchange* pDX ) {

	CDialog::DoDataExchange( pDX );
	//{{AFX_DATA_MAP(CTexDlg)
	DDX_Control(pDX, IDC_PREVIEW, m_preview);
	DDX_Control(pDX, IDC_NAMES, m_names);
	DDX_Control(pDX, IDC_MINC, m_minc);
	DDX_Control(pDX, IDC_MAXC, m_maxc);
	DDX_Text(pDX, IDC_BASE, m_base);
	DDX_Text(pDX, IDC_EXPO, m_expo);
	DDX_Text(pDX, IDC_NUMC, m_uNum);
	DDV_MinMaxUInt(pDX, m_uNum, 1, 255);
	//}}AFX_DATA_MAP
}



/////////////////////////////////////////////////////////////////////////////
// Initialization
/////////////////////////////////////////////////////////////////////////////

BOOL CTexDlg::OnInitDialog() {

	CDialog::OnInitDialog();

	// Get Preview Rect
	GetClientArea( m_preview, m_rcPreview );
	GetClientArea( m_minc, m_rcMinC );
	GetClientArea( m_maxc, m_rcMaxC );

	// Load Texture Names
	LoadTexList( 0 );

	return TRUE;
}



/////////////////////////////////////////////////////////////////////////////
// Obtain Client Rect for a Child Window
/////////////////////////////////////////////////////////////////////////////

BOOL CTexDlg::GetClientArea( CWnd& wnd, CRect& rc ) {

	if( !wnd.GetSafeHwnd() ) return FALSE;
	wnd.GetClientRect( &rc );
	wnd.ClientToScreen( &rc );
	ScreenToClient( &rc );
	return TRUE;
}



/////////////////////////////////////////////////////////////////////////////
// Band Button
/////////////////////////////////////////////////////////////////////////////

void CTexDlg::OnBand() {

	int y;
	int size;
	int idx1;
	int idx2;
	BYTE* pBits;

	// Check texel ptr
	if( !m_pTexture ) {

		NoTexSel();
		return;
	}

	// Texture must have a texel buffer and valid size
	if( !m_pTexture->IsValid() ) {
	
		NoTexBits();
		return;
	}

	// This is probably not required, but...
	CWaitCursor csr;

	// Pointer and w/h
	pBits = m_pTexture->m_pTexels;
	size = m_pTexture->m_iSize;

	// Do the deed
	for( y=0; y<size; y+=2 ) {

		idx1 = y * size;
		idx2 = idx1 + size;

		memcpy( pBits+idx2, pBits+idx1, size );
	}

	// Show Results
	ShowTexture();
}



/////////////////////////////////////////////////////////////////////////////
// Curve Button
/////////////////////////////////////////////////////////////////////////////

void CTexDlg::OnCurve() {

	TODO();
	return;

	if( !m_pTexture ) {

		NoTexSel();
		return;
	}
}



/////////////////////////////////////////////////////////////////////////////
// Delete Button
/////////////////////////////////////////////////////////////////////////////

void CTexDlg::OnDelete() {

	int idx;	
	CString s;

	// Get texture index and pointer
	idx = m_names.GetCurSel();
	m_pTexture = GetTexPtr( idx );
	ShowTexture();
	if( !m_pTexture ) {
	
		NoTexSel();
		return;
	}

	// Ask permission first
	s.Format( "Are you sure you want to delete:\n\n%s ?",
			   m_pTexture->m_szName );
	if( ! ::Query( s ) ) return;

	// Try to delete
	if( ::g_TexList.DeleteTexture( (DWORD)(idx) ) )
		LoadTexList( 0 );

	// Oops!
	else AfxMessageBox( "Failed to delete texture." );
}



/////////////////////////////////////////////////////////////////////////////
// Import Button
/////////////////////////////////////////////////////////////////////////////

void CTexDlg::OnImport() {

	// Load Texture, fix name list, and select the one we loaded
	if( ::g_TexList.LoadTexture() )
		LoadTexList( 0x7FFFFFFF );	
}



/////////////////////////////////////////////////////////////////////////////
// Generate Button
/////////////////////////////////////////////////////////////////////////////

void CTexDlg::OnMakeTex() {

	CString s;
	CTexture* pTex = NULL;
	MAKETEXINFO info;

	if( !UpdateData( TRUE ) ) return;

	if( m_base <= 0.0 ) {

		AfxMessageBox( "Base must be > 0" );
		return;
	}

	if( m_expo <= 0.0 ) {

		AfxMessageBox( "Exponent must be > 0" );
		return;
	}

	// Patience, please!
	CWaitCursor csr;

	// Save Latest Settings
	s.Format( "%f", m_base );
	WPS( "Prefs", "FracBase", s );

	s.Format( "%f", m_expo );
	WPS( "Prefs", "FracExpo", s );

	WPI( "Prefs", "NumC", m_uNum );
	WPI( "Prefs", "MinC", (int)m_crMinC );
	WPI( "Prefs", "MaxC", (int)m_crMaxC );

	// Create Texture
	pTex = new CTexture;
	if( !pTex ) goto NoMem;

	// Allocate texel buffer
	if( !pTex->Alloc( 256 ) ) goto NoMem;

	// Setup Info Structure
	info.base  = m_base;
	info.expo  = m_expo;
	info.bits  = pTex->m_pTexels;
	info.num_c = m_uNum;
	GetRGB( &(info.rgb1), m_crMinC );
	GetRGB( &(info.rgb2), m_crMaxC );	

	// Generate Texture!
	if( ! ::MakeTex( &info ) ) {

		AfxMessageBox( "Failed to generate texture." );
		goto Fail;
	}

	// Set Texture Name and Palette
	pTex->m_szName = "Generated Texture";
	memcpy( pTex->m_pal, info.pal, 256*sizeof(RGBQUAD) );

	// Add to texture list
	if( !::g_TexList.AppendTexture( pTex ) ) goto NoMem;

	// Reload the Texture Names, select the one we made
	LoadTexList( 0x7FFFFFFF );

	// Cool!
	return;


NoMem:
	AfxMessageBox( "Out of Memory" );

Fail:
	if( pTex ) delete pTex;
}



/////////////////////////////////////////////////////////////////////////////
// Palette Button
/////////////////////////////////////////////////////////////////////////////

void CTexDlg::OnPalette() {

	TODO();
	return;

	if( !m_pTexture ) {

		NoTexSel();
		return;
	}
}



/////////////////////////////////////////////////////////////////////////////
// Rename Button
/////////////////////////////////////////////////////////////////////////////

void CTexDlg::OnRename() {

	int n;

	// Get Selected Texture Index and Pointer
	n = m_names.GetCurSel();
	m_pTexture = GetTexPtr( n );

	// Check Ptr
	if( !m_pTexture ) {

		NoTexSel();
		return;
	}
		
	// Popup Dialog to Edit Name
	CTextDlg dlg;
	dlg.m_sTitle = "Texture Name";
	dlg.m_sText = m_pTexture->m_szName;
	if( dlg.DoModal() != IDOK ) return;	
	m_pTexture->m_szName = dlg.m_sText;

	// Reload list of texture names, select again
	//  the one we just modified.
	LoadTexList( n );
}



/////////////////////////////////////////////////////////////////////////////
// Drawing
/////////////////////////////////////////////////////////////////////////////

void CTexDlg::OnPaint() {

	CPaintDC dc(this);
	
	// Draw Preview Bitmap
	if( m_bmp.IsValid() )
		m_bmp.Preview( &dc, &m_rcPreview );
}



/////////////////////////////////////////////////////////////////////////////
// Draw Color Previews
/////////////////////////////////////////////////////////////////////////////

HBRUSH CTexDlg::OnCtlColor( CDC* pDC, CWnd* pWnd, UINT nCode ) {

	// For Static Controls...	
	if( nCode == CTLCOLOR_STATIC ) {
	
		COLORREF clr;
		HBRUSH hbr;
		HWND hWnd = pWnd->GetSafeHwnd();
		
		if( hWnd == m_minc.m_hWnd ) {

			hbr = (HBRUSH)(m_brMinC);
			clr = m_crMinC;
		}
		
		else if( hWnd == m_maxc.m_hWnd ) {

			hbr = (HBRUSH)(m_brMaxC);
			clr = m_crMaxC;
		}

		else return CDialog::OnCtlColor( pDC, pWnd, nCode );
	
		pDC->SetBkColor( clr );
		pDC->SetTextColor( 0xFFFFFF^clr );
		return hbr;
	}
	
	return CDialog::OnCtlColor( pDC, pWnd, nCode );
}



/////////////////////////////////////////////////////////////////////////////
// Selecting a Texture to Preview
/////////////////////////////////////////////////////////////////////////////

void CTexDlg::OnSelchangeNames() {
	
	// Get Texture Pointer for this index
	m_pTexture = GetTexPtr( m_names.GetCurSel() );

	// Show Texture
	ShowTexture();
}



/////////////////////////////////////////////////////////////////////////////
// Update Preview Colors
/////////////////////////////////////////////////////////////////////////////

void CTexDlg::NewColors() {

	m_brMinC.DeleteObject();
	m_brMaxC.DeleteObject();

	m_brMinC.CreateSolidBrush( m_crMinC );
	m_brMaxC.CreateSolidBrush( m_crMaxC );

	m_minc.Invalidate();
	m_maxc.Invalidate();
}



/////////////////////////////////////////////////////////////////////////////
// Get Pointer to Selected Texture
/////////////////////////////////////////////////////////////////////////////

CTexture* CTexDlg::GetTexPtr( int n ) {
	
	CTexture** pPtr;

	// See if anything in the list
	pPtr = ::g_TexList.m_pList;
	if( !pPtr ) return NULL;

	// Get index & validate it
	if( n < 0 ) return NULL;	
	if( n >= (int)(::g_TexList.m_dwNum) ) return NULL;

	// Return texture ptr
	return pPtr[n];			
}



/////////////////////////////////////////////////////////////////////////////
// Copy Texels and Palette into Sample PixMap
/////////////////////////////////////////////////////////////////////////////

void CTexDlg::ShowTexture() {

	int size;
	CTexture* pTex = m_pTexture;

	// Remove old preview & flag a redraw
	m_bmp.DestroyDIB();
	InvalidateRect( &m_rcPreview );

	// Check new texture
	if( !pTex ) return;
	if( !pTex->IsValid() ) return;

	// Create new preview
	size = pTex->m_iSize;
	if( !m_bmp.CreateDIB256( size, -size, pTex->m_pal ) )
		return;

	// Copy over the texels
	memcpy( m_bmp.m_bits, pTex->m_pTexels, size*size );
}



/////////////////////////////////////////////////////////////////////////////
// Load List of Texture Names
/////////////////////////////////////////////////////////////////////////////

void CTexDlg::LoadTexList( int def ) {

	CTexture*	pTex;
	CTexture**	pPtr;
	int x,n;

	// Remove old entries
	m_names.ResetContent();	

	// Get/Check ptr array ptr
	pPtr = ::g_TexList.m_pList;	
	if( !pPtr ) return;

	// Get number of ptrs
	n = (int)(::g_TexList.m_dwNum);

	// Read in names
	for( x=0; x<n; x++ ) {

		pTex = pPtr[x];
		ASSERT( pTex );
		if( !pTex ) break;
		
		m_names.AddString( pTex->m_szName );
	}

	// Select Default Texture
	if( def >= 0 ) {

		n = m_names.GetCount();
		if( def >= n ) def = n-1;
		if( def >= 0 ) m_names.SetCurSel(def);
		m_pTexture = GetTexPtr( def );
		ShowTexture();
	}
}



/////////////////////////////////////////////////////////////////////////////
// Detect Clicks on Color Previews
/////////////////////////////////////////////////////////////////////////////

void CTexDlg::OnLButtonUp( UINT nFlags, CPoint point ) {
		
	if( m_rcMinC.PtInRect( point ) ) EditMinC();
	if( m_rcMaxC.PtInRect( point ) ) EditMaxC();
}



/////////////////////////////////////////////////////////////////////////////
// Edit Min Color
/////////////////////////////////////////////////////////////////////////////

void CTexDlg::EditMinC() {

	COLORREF cr;

	cr = m_crMinC;
	if( !EditColor( cr ) ) return;
	m_crMinC = cr;

	NewColors();
}



/////////////////////////////////////////////////////////////////////////////
// Edit Max Color
/////////////////////////////////////////////////////////////////////////////

void CTexDlg::EditMaxC() {

	COLORREF cr;

	cr = m_crMaxC;
	if( !EditColor( cr ) ) return;
	m_crMaxC = cr;

	NewColors();
}



/////////////////////////////////////////////////////////////////////////////
// Edit Specified Color
/////////////////////////////////////////////////////////////////////////////

BOOL CTexDlg::EditColor( COLORREF& cr ) {

	CWnd* pWnd = AfxGetMainWnd();
	CColorDialog dlg( cr, CC_FULLOPEN | CC_RGBINIT, pWnd );
	if( dlg.DoModal() != IDOK ) return FALSE;
	cr = dlg.GetColor();
	return TRUE;
}



/////////////////////////////////////////////////////////////////////////////
// Convert ColorRef to RGB
/////////////////////////////////////////////////////////////////////////////

void CTexDlg::GetRGB( RGBQUAD* rgb, COLORREF cr ) {

	rgb->rgbBlue  = (BYTE)((cr>>16) & 0xFF);
	rgb->rgbGreen = (BYTE)((cr>>8) & 0xFF);
	rgb->rgbRed   = (BYTE)(cr & 0xFF);
}



/////////////////////////////////////////////////////////////////////////////
// Announce that no Texture is Selected
/////////////////////////////////////////////////////////////////////////////

void CTexDlg::NoTexSel() {

	AfxMessageBox( "No texture is selected." );
}



/////////////////////////////////////////////////////////////////////////////
// Announce Texture has no Texels
/////////////////////////////////////////////////////////////////////////////

void CTexDlg::NoTexBits() {

	AfxMessageBox( "No texels in texture." );
}

