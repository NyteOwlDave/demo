
/////////////////////////////////////////////////////////////////////////////
//
// PlanFunc.h - Functions for Manipulating Planets
//  Dave Wellsted, Mar 2001
//
/////////////////////////////////////////////////////////////////////////////

#ifndef PLANFUNC_DEFINED
#define PLANFUNC_DEFINED


#pragma pack(1)


//----------------------------------------------------------
// Planet Structure
//
// This serves as both the file header and the in-memory
//  control structure for a planet object.  When on disk,
//  the xxx_ofs members are used, and contain offsets into
//  the file.  When in RAM, the xxx_ptr members are used,
//  and contain pointers to the buffers that contain the
//  data.  The user data block is optional... it can be
//  used for whatever you want, but your program should
//  have a way of uniquely identifying the data, so that
//  it will not conflict with planet files designed/used
//  by other applications.
//
// The Image Map and Texture Map MUST both exist for the
//  object to be loaded/saved.  This implies that the
//  planet must be compiled before saving.
//
// If the 
//
//----------------------------------------------------------

typedef struct tagPLANET {

	char	magic[4];		// Initials: "p3d", 0

	DWORD	numpal;			// Palette Entries Used
	RGBQUAD	pal[256];		// Palette

	// Rotation Data (Compile Time)
	double	xrot;
	double	yrot;
	double	zrot;
	
	// Rotation Data (Render Time)
	int		spin;

	DWORD	tex_size;		// width and height of tex map
	DWORD	img_size;		// width and height of img map
	DWORD	img_bytes;		// # of bytes in img map
	DWORD	dat_bytes;		// # of bytes in user data
		
	// Image Map
	union {
		DWORD	img_ofs;	// Offset in file of img map
		BYTE*	img_ptr;	// Ptr in RAM to img map
	};

	// Texture Map
	union {
		DWORD	tex_ofs;	// Offset in file of tex map
		BYTE*	tex_ptr;	// Ptr in RAM to tex map
	};

	// User Data
	union {
		DWORD	dat_ofs;	// Offset in file of user data
		BYTE*	dat_ptr;	// Ptr in RAM to user data
	};

} PLANET;

#pragma pack()


// File Control
PLANET* LoadPlanet( CFile* );
BOOL SavePlanet( CFile*, PLANET* );

// Data Control
PLANET* CreatePlanet( DWORD );
void DestroyPlanet( PLANET* );
BOOL SetPlanetSize( PLANET*, DWORD );
BOOL SetPlanetTexture( PLANET*, BYTE*, DWORD );
BOOL SetPlanetColors( PLANET*, RGBQUAD*, DWORD );
BOOL SetPlanetAngles( PLANET*, double, double, double );

BOOL SetPlanetData( PLANET*, BYTE*, DWORD );

// Compiling and Rendering
BOOL CompilePlanet( PLANET* );
BOOL RenderPlanet( PLANET*, BYTE* );
BOOL RenderTexture( BYTE*, BYTE*, SIZE&, SIZE& );

#endif  // !PLANFUNC_DEFINED

