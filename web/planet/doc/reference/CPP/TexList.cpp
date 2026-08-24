
/////////////////////////////////////////////////////////////////////////////
//
// TexList.cpp - Texture List Control
//  Dave Wellsted, Mar 2001
//
/////////////////////////////////////////////////////////////////////////////

#include "stdafx.h"
#include "texlist.h"
#include "CFileGet.h"



/////////////////////////////////////////////////////////////////////////////
// Construction
/////////////////////////////////////////////////////////////////////////////

CTexList::CTexList() {

	m_pList = NULL;
	m_dwNum	= 0;
	m_dwMax	= 0;
}

CTexList::~CTexList() { Free(); }



/////////////////////////////////////////////////////////////////////////////
// Load Texture
/////////////////////////////////////////////////////////////////////////////

BOOL CTexList::LoadTexture() {
	
	CString s;
	CFileGet get;
	
	get.SetTitle( "Load Texture" );
	get.SetTemplate( "Windows Bitmaps (*.bmp)|*.bmp||" );
	get.SetDefFile( "*.bmp" );
	get.SetDefExt( "bmp" );
	get.SetParent( AfxGetMainWnd() );

	s = get.GetFile();
	if( s == "" ) return FALSE;

	// Temporary bitmap
	CPixMap pix;

	// Load it
	if( !pix.LoadWinBmp( s ) ) return FALSE;

	// Create new texture
	return CreateTexture( pix );
}



/////////////////////////////////////////////////////////////////////////////
// Allocate Pointer Buffer
/////////////////////////////////////////////////////////////////////////////

BOOL CTexList::Alloc() {

	int count;
	int bytes;
	CTexture** p;
	
	// Already done?
	if( m_pList ) return TRUE;

	// Compute entries and bytes
	count = 16;
	bytes = count * sizeof(CTexture*);

	// Allocate buffer
	p = (CTexture**)(malloc(bytes));
	if( !p ) return FALSE;

	// Save settings
	m_pList = p;
	m_dwMax = (DWORD)(count);
	m_dwNum = 0;

	// Clear buffer
	memset( p, 0, bytes );

	// Cool!
	return TRUE;
}



/////////////////////////////////////////////////////////////////////////////
// Grow Pointer Buffer
/////////////////////////////////////////////////////////////////////////////

BOOL CTexList::Grow() {

	int old_count;
	int count;
	int bytes;
	int x;
	CTexture** p;

	// No buffer yet?
	if( !m_pList ) return Alloc();
	
	// Compute entries and bytes
	old_count = (int)(m_dwNum);
	count = 16 + (int)(m_dwMax);
	bytes = count * sizeof(CTexture*);

	// Allocate buffer
	p = (CTexture**)(malloc(bytes));
	if( !p ) return FALSE;

	// Copy old data to new (if any)	
	for( x=0; x<old_count; x++ )
		p[x] = m_pList[x];

	// Clear remaining entries
	while( x<count ) { p[x]=NULL; x++; }

	// Remove old buffer
	free( m_pList );

	// Save settings
	m_pList = p;
	m_dwMax = (DWORD)(count);

	// Cool!
	return TRUE;
}



/////////////////////////////////////////////////////////////////////////////
// Free Pointer Buffer and All Textures
/////////////////////////////////////////////////////////////////////////////

void CTexList::Free() {

	DWORD dw;
	CTexture* p;

	if( !m_pList ) return;

	for( dw=0; dw<m_dwNum; dw++ ) {

		p = m_pList[dw];
		if( p ) delete p;
	}

	free( m_pList );
	
	m_pList = NULL;
	m_dwNum = 0;
	m_dwMax = 0;
}



/////////////////////////////////////////////////////////////////////////////
// Create Texture from PixMap
/////////////////////////////////////////////////////////////////////////////

BOOL CTexList::CreateTexture( CPixMap& pImg ) {

	CTexture* pTex;

	// Allocate new texture
	pTex = new CTexture;
	if( !pTex ) return FALSE;

	// Assign bitmap to texture
	if( pTex->SetImage( &pImg ) &&
		AppendTexture( pTex ) ) return TRUE;

	// Drats!
	delete pTex;
	return FALSE;
}



/////////////////////////////////////////////////////////////////////////////
// Append Texture to List
/////////////////////////////////////////////////////////////////////////////

BOOL CTexList::AppendTexture( CTexture* pTex ) {

	// Check Pointer
	if( !pTex ) return FALSE;

	// Resize buffer, if needed
	if( (m_dwNum == m_dwMax) && (!Grow()) )
		return FALSE;

	// Assign pointer
	m_pList[m_dwNum] = pTex;
	m_dwNum++;
	
	// Cool!
	return TRUE;		
}



/////////////////////////////////////////////////////////////////////////////
// Remove a Texture and Destroy it
/////////////////////////////////////////////////////////////////////////////

BOOL CTexList::DeleteTexture( DWORD dwIdx ) {

	CTexture* pTex;

	if( !m_pList ) return FALSE;
	if( dwIdx >= m_dwNum ) return FALSE;
	
	// Delete object (if any)
	pTex = m_pList[dwIdx];
	if( pTex ) delete pTex;

	// Cover up the whole
	dwIdx++;
	while( dwIdx < m_dwNum ) {

		m_pList[dwIdx-1] = m_pList[dwIdx];
		dwIdx++;
	}

	// Bump texture count
	m_dwNum--;

	// Nullify the freed up cell
	m_pList[m_dwNum] = NULL;

	// Cool!
	return TRUE;
}
