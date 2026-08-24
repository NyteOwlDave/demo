
/////////////////////////////////////////////////////////////////////////////
//
// PlanetDlg.cpp - Get Planet Create Parameters
//  Dave Wellsted, Mar 2001
//
/////////////////////////////////////////////////////////////////////////////

#include "stdafx.h"
#include <math.h>
#include <float.h>
#include "Planet.h"
#include "PlanetDlg.h"
#include "TexDlg.h"



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

BEGIN_MESSAGE_MAP(CPlanetDlg, CDialog)
	//{{AFX_MSG_MAP(CPlanetDlg)
	ON_WM_PAINT()
	ON_BN_CLICKED(IDC_TEXTURE, OnTexture)
	//}}AFX_MSG_MAP
END_MESSAGE_MAP()



/////////////////////////////////////////////////////////////////////////////
// Construction
/////////////////////////////////////////////////////////////////////////////

CPlanetDlg::CPlanetDlg( CWnd* pParent )
		  : CDialog( CPlanetDlg::IDD, pParent ) {

	//{{AFX_DATA_INIT(CPlanetDlg)
	m_szSize = _T("256");
	m_xrot = 0.0;
	m_yrot = 0.0;
	//}}AFX_DATA_INIT

	m_bNewPlanet = FALSE;
	m_pPlanet    = NULL;
}

// Clean up
CPlanetDlg::~CPlanetDlg() {

	// If we created a new planet, and nobody claimed it,
	//  then we must regretfully destroy the poor thing...
	if( m_bNewPlanet && m_pPlanet )	{

		::DestroyPlanet( m_pPlanet );
		m_pPlanet = NULL;
		m_bNewPlanet = FALSE;
	}
}
		  


/////////////////////////////////////////////////////////////////////////////
// DDX/DDV
/////////////////////////////////////////////////////////////////////////////

void CPlanetDlg::DoDataExchange( CDataExchange* pDX ) {

	CDialog::DoDataExchange( pDX );
	//{{AFX_DATA_MAP(CPlanetDlg)
	DDX_Control(pDX, IDC_IMAGE, m_Image);
	DDX_CBString(pDX, IDC_PLANETSIZE, m_szSize);
	DDX_Text(pDX, IDC_XROT, m_xrot);
	DDX_Text(pDX, IDC_YROT, m_yrot);
	//}}AFX_DATA_MAP
}



/////////////////////////////////////////////////////////////////////////////
// Initialization
/////////////////////////////////////////////////////////////////////////////

BOOL CPlanetDlg::OnInitDialog() {

	CDialog::OnInitDialog();
	
	// Get Preview Window
	m_Image.GetWindowRect( &m_rcPreview );
	ScreenToClient( &m_rcPreview );
	m_rcPreview.DeflateRect( 2, 2 );

	// If we ain't gots a planet...
	if( !m_pPlanet ) {
	
		// Make a new one
		m_pPlanet = ::CreatePlanet( 256 );
		if( !m_pPlanet ) {

			AfxMessageBox( "Out of memory." );
			EndDialog( IDCANCEL );
			return TRUE;
		}

		// Remind ourself to delete this later, if it
		//  is never claimed by the caller...
		m_bNewPlanet = TRUE;
	}

	// Get angles, convert to degrees
	m_xrot = Deg( m_pPlanet->xrot );
	m_yrot = Deg( m_pPlanet->yrot );

	// Get current size
	m_szSize.Format( "%i", m_pPlanet->img_size );		
	
	// Show updated data
	UpdateData( FALSE );	

	// Show Texture (if any)
	ShowTexture();

	return TRUE;
}



/////////////////////////////////////////////////////////////////////////////
// OK Button
/////////////////////////////////////////////////////////////////////////////

void CPlanetDlg::OnOK() {

	double xrot, yrot;

	// Get Latest Settings
	UpdateData( TRUE );

	// Get angles, converted to radians
	xrot = Rad( m_xrot );
	yrot = Rad( m_yrot );
	::SetPlanetAngles( m_pPlanet, xrot, yrot, 0.0 );

	// Get size, too
	::SetPlanetSize( m_pPlanet, ::atoi( m_szSize ) );

	// Time to say bye-bye!
	EndDialog( IDOK );
}



/////////////////////////////////////////////////////////////////////////////
// Drawing
/////////////////////////////////////////////////////////////////////////////

void CPlanetDlg::OnPaint() {

	CPaintDC dc(this);

	// Draw Texture, if we have one
	if( m_bmp.IsValid()	)
		m_bmp.Preview( &dc, &m_rcPreview );
}



/////////////////////////////////////////////////////////////////////////////
// Angle Conversions
/////////////////////////////////////////////////////////////////////////////

// Radians to Degrees
double CPlanetDlg::Deg( double n ) {

	double pi;

	// Load PI
	_asm {

		fldpi
		fstp	[pi]	
	}

	// Convert to degrees 
	n = n * 180.0 / pi;

	// Safety net
	if( ::_isnan( n ) ) n = 0.0;

	// Convert to 0 through 360
	while( n < 0.0 )	n += 360.0;
	while( n >= 360.0 ) n -= 360.0;

	// Return result
	return n;
}

// Degrees to Radians
double CPlanetDlg::Rad( double n ) {

	double pi;

	// Safety net
	if( ::_isnan( n ) ) n = 0.0;

	// Convert to 0 through 360
	while( n < 0.0 )	n += 360.0;
	while( n >= 360.0 ) n -= 360.0;
	
	// Now, to -180 through +180
	if( n > 180.0 ) n -= 360.0;

	// Load PI
	_asm {

		fldpi
		fstp	[pi]	
	}

	// Return result
	n = n * pi / 180.0;

	// Safety net
	if( ::_isnan( n ) ) n = 0.0;

	// Return result
	return n;
}



/////////////////////////////////////////////////////////////////////////////
// Copy Texels and Palette into Sample PixMap
/////////////////////////////////////////////////////////////////////////////

void CPlanetDlg::ShowTexture() {

	int size;
	BYTE* pTex;
	RGBQUAD* pPal;

	// Destroy old preview & flag redraw
	m_bmp.DestroyDIB();
	InvalidateRect( &m_rcPreview );

	// Do we have a planet?
	if( !m_pPlanet ) return;

	// How 'bout a texture?
	pTex = m_pPlanet->tex_ptr;
	if( !pTex ) return;
	
	// And a tex size?
	size = (int)(m_pPlanet->tex_size);
	if( !size ) return;

	// An' a palette, too
	pPal = m_pPlanet->pal;

	// Create a preview bitmap
	if( !m_bmp.CreateDIB256( size, -size, pPal ) )
		return;

	// Copy over the texels
	memcpy( m_bmp.m_bits, pTex, size*size );
}



/////////////////////////////////////////////////////////////////////////////
// Set New Texture
/////////////////////////////////////////////////////////////////////////////

void CPlanetDlg::OnTexture() {
	
	DWORD size;
	RGBQUAD* pPal;
	CTexture* pTex = NULL;
	CTexDlg dlg;
	
	// Do Dialog
	if( dlg.DoModal() != IDOK ) return;
	
	// Get texture pointer & validate
	pTex = dlg.m_pTexture;
	if( !pTex ) goto NoSet;
	if( !pTex->IsValid() ) goto NoSet;

	// Get Palette Ptr & Texture Size
	pPal = pTex->m_pal;
	size = (DWORD)(pTex->m_iSize);

	// Set new palette
	if( ! ::SetPlanetColors( m_pPlanet, pPal, 256 ) )
		goto NoSet;

	// Set new texture
	if( ! ::SetPlanetTexture( m_pPlanet, 
							  pTex->m_pTexels, 
							  size ) ) 
		goto NoSet;

	// Update preview window
	ShowTexture();
	return;


// Dang it!
NoSet:
	AfxMessageBox( "Could not set texture." );
	ShowTexture();
	return;
}



/////////////////////////////////////////////////////////////////////////////
// Assign a planet to be editted
/////////////////////////////////////////////////////////////////////////////
//
// If the caller does not assign a planet for editting, before the DoModal()
// call, then the dialog will create one.
//
// This function will fail is a planet is already assigned, or a new one has
// been created.
//
/////////////////////////////////////////////////////////////////////////////

BOOL CPlanetDlg::EditPlanet( PLANET* p ) {

	if( m_pPlanet ) return FALSE;
	m_pPlanet = p;
	return TRUE;
}



/////////////////////////////////////////////////////////////////////////////
// Obtain Ownership of the Planet
/////////////////////////////////////////////////////////////////////////////
//
// When a new planet is created by the dialog, the caller must obtain
// ownership, or it will be deleted by the destructor.
//
/////////////////////////////////////////////////////////////////////////////

PLANET* CPlanetDlg::GetPlanet() {

	PLANET* p = m_pPlanet;
	m_pPlanet = NULL;
	return p;
}

