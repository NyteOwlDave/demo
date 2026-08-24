
/////////////////////////////////////////////////////////////////////////////
//
//  MAKEXION.CC
//
//  Original Code by Simon Hern, 1994
//  Ported to GNU by Dave Wellsted, Mar 2001
//
//  Create surface texture for a planet.
//
//  Mr. Hern calls his surface textures "Complexions", hence the nickname
//  of "XION".  I've modified the program to write three data files:
//
//  RIFF.DAT - 64x64 char array, with varying amplitude exponential waves
//  SKIN.DAT - 128x256 short array, temporary height map.
//  XION.DAT - 128x256 byte array, final height map.
//
//  The reason I've saved intermediate files is twofold:
//
//  (1) For flexibility... to allow rebuilding only those elements which
//      the user desires.
//  (2) Time savings.  Generation of the SKIN data, in particular, takes
//      a significant amount of time.
//
// The RIFF array need only be built once, since it never varies.  While it
// does not take much time to build, I thought it would be nice to have a
// hard copy of it.  It is an array of signed bytes which stores a series
// of exponential waves (64 waves, each having 64 samples) which are used
// to produce "hills" in the surface.
//
// The SKIN array is the bad-boy here.  It is an array of signed 16-bit
// altitudes.  It is built by applying a series of random wave patterns
// (with varying frequencies and amplitudes) to the surface.
//
// The XION array is derived directly from the SKIN array.  It has the same
// dimensions, but uses unsigned byte values, which (naturally) are perfect
// for 8-bit palette colors.  The algorithm is quite simple.  We simply
// scale the SKIN array's elements so that they span the desired range of
// palette colors, then write the results to the XION array.
//
/////////////////////////////////////////////////////////////////////////////

#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <conio.h>
#include <time.h>
#include <math.h>
#include <pc.h>
#include <sys/movedata.h>

#include "video.h"
#include "rnd.h"
#include "fileio.h"

#define Error() printf( ErrMsg )


// Routine to displace an area of landscape (in XION.S)
void fracture( int, int, int ) asm( "do_skin" );

// Generate Riff Data
static void make_riff( void );

// Generate Skin Data
static void make_skin( void );

// Generate Xion Data
static void make_xion( void );

// Show the XION array as a bitmap
static void show_xion( void );

// Precalculated values determining where landscape cracks.
// This is used by the external 'fracture' function.
char riff[64][64];       // 4k

// The (full size) skin array in which the surface is generated.
short skin[128][256];    // 64k

// Final resting place of the xion data (after rescaling).
// Byte-size values rather than word-size values.
static BYTE xion[128][256];   // 32k

// Altitude Limits:
// This in effect defines the palette range used for the final xion.
static int min_color = 1;
static int max_color = 80;

// Fracture Parameters:
// Strength of first break, and exponential decay of strength.
static double frac_base = 20.0;
static double frac_exp  = 3.0;
static double frac_inv  = 1.0 / 3.0;

// Sign-on banner
static char* banner =
 "MakeXion - Create Planet Surface Map\n"
 "Original Code by Simon Hern\n"
 "Enhancements by Dave Wellsted\n\n";

// Help Screen
static char* HelpInfo =
 "Command Switches:\n\n"
 "  /riff - removes old RIFF file\n"
 "  /skin - removes old SKIN file\n"
 "  /xion - removes old XION file\n"
 "  /view - shows the data as a grey-scale bitmap\n"
 "  /all  - all of the above\n"
 "  /b:n  - base for fracture count\n"
 "  /e:n  - exponent for fracture count\n"
 "  /f:n  - first palette color\n"
 "  /l:n  - last palette color\n"
 "  /?    - show this help information\n\n";

// Formatting strings
static char* ErrFmt      = "%s.\n";
static char* ArgErrFmt   = "Unknown Switch \"%s\".\n";
static char* ColorErrFmt = "Bad color value (%i).\n";
static char* FracErrFmt  = "Bad fracture count (%f,%f).\n";

static char* LoadFmt   = "¯ Loading %s data.\n";
static char* SaveFmt   = "¯ Saving %s data.\n";
static char* GenFmt    = "¯ Generating %s data.\n";
static char* DispFmt   = "¯ Equalizing (disp=%i).\n";
static char* StrikeFmt = "  Fracture # %5i \r";

static char* LimFmt =
 "  Min Skin  = %i\n"
 "  Max Skin  = %i\n"
 "  Min Color = %i\n"
 "  Max Color = %i\n";

// Error messages
static char* ErrMsg  = "¯ ERROR: ";
static char* ErrSave = "Save Failed";
static char* ErrLoad = "Load Failed";

// Data File Types
static char* XionName = "XION";
static char* SkinName = "SKIN";
static char* RiffName = "RIFF";

// Data File Names
static char* XionFile = "XION.DAT";
static char* SkinFile = "SKIN.DAT";
static char* RiffFile = "RIFF.DAT";

// Flags
BOOL bNewRiff = FALSE;
BOOL bNewSkin = FALSE;
BOOL bNewXion = FALSE;
BOOL bView    = FALSE;



//===========================================================================
// Main Entry Point
//===========================================================================

void main( int argc, char** argp, char** envp ) {

    int n;
    int i;
    char* p;
    char ch;

    ScreenClear();
    ScreenSetCursor( 0, 0 );

    // Initialize Random Number Generator
    init_rnd();

    // Sign-on Banner
    printf( banner );

    // Handle switches
    for( n=1; n<argc; n++ ) {

        p = argp[n];

        if( stricmp( p, "/?" ) == 0 ) {

            printf( HelpInfo );
            exit(0);
        }
        else if( stricmp( p, "/riff" ) == 0 ) bNewRiff = TRUE;
        else if( stricmp( p, "/skin" ) == 0 ) bNewSkin = TRUE;
        else if( stricmp( p, "/xion" ) == 0 ) bNewXion = TRUE;
        else if( stricmp( p, "/view" ) == 0 ) bView    = TRUE;
        else if( stricmp( p, "/all"  ) == 0 ) {

            bNewRiff = TRUE;
            bNewSkin = TRUE;
            bNewXion = TRUE;
            bView    = TRUE;
        }
        else {

            // Is this a switch?
            if( p[0]=='/' ) {

                // Get switch char
                ch = p[1];

                // Test switch char & ensure ':' follows it
                if( ch && (p[2] == ':') ) {

                    // Which one?
                    switch( ch ) {

                    // Base
                    case 'b':
                    case 'B':
                         frac_base = atof( p+3 );
                         continue;

                    // Exponent
                    case 'e':
                    case 'E':
                         frac_exp = atof( p+3 );
                         continue;

                    // First Color
                    case 'f':
                    case 'F':
                         min_color = atoi( p+3 );
                         continue;

                    // Last Color
                    case 'l':
                    case 'L':
                         max_color = atoi( p+3 );
                         continue;
                    }
                }
            }

            Error();
            printf( ArgErrFmt, p );
            exit( -1 );
        }
    }

    // Check out params
    if( (min_color < 0) ||
        (min_color > 255) ) {

        Error();
        printf( ColorErrFmt, min_color );
        exit( -1 );
    }

    if( (max_color < 0) ||
        (max_color > 255) ) {

        Error();
        printf( ColorErrFmt, max_color );
        exit( -1 );
    }

    if( (frac_base < 1.0) ||
        (frac_exp  < 1.0) ||
        (pow( frac_base, frac_exp ) >= 65536.0) ) {

        Error();
        printf( FracErrFmt, frac_base, frac_exp );
        exit( -1 );
    }

    // Load/Generate New File(s)
    make_xion();

    // Show the XION data, if requested
    if( bView ) show_xion();

    exit(0);
}



//===========================================================================
// Load/Generate RIFF Data
//===========================================================================
//
// If the RIFF file exists, it is loaded.  Otherwise, a new set of RIFF data
// is generated, and saved to the file.
//
//===========================================================================

static void make_riff( void ) {

    int x, y;

    double w;
    double sig;
    double gam;
    double pi_over_rho;
    double rho_over_pi;

    DWORD size = 64*64;

    // If RIFF file exists, just load it
    if( (!bNewRiff) && FileExists( RiffFile ) ) {

        printf( LoadFmt, RiffName );
        if( LoadFile( RiffFile, riff, size ) == size ) return;

        Error();
        printf( ErrFmt, ErrLoad );
    }

    // Force new Skin
    bNewSkin = TRUE;


    //-------------------------------------------------------
    // Generate RIFF data
    //-------------------------------------------------------
    printf( GenFmt, RiffName );

    // Compute Value of PI/RHO and its inverse
    pi_over_rho = PI / 128.0;
    rho_over_pi = 128.0 / PI;

    // Do It!
    for( y = 0; y < 64; y++ ) {

        for( x = 0; x < 64; x++ ) {

            w   = ( (double)y + 0.5 ) * pi_over_rho;
            sig = ( (double)x + 0.5 ) * pi_over_rho;

            gam = atan( tan(w) * cos(sig) );

            riff[y][x] = 64
                       - (char)(floor( gam * rho_over_pi + 0.5 ));
        }
    }

    // Save the RIFF data
    printf( SaveFmt, RiffName );
    if( SaveFile( RiffFile, riff, size ) != size ) {

        Error();
        printf( ErrFmt, ErrSave );
    }
}



//===========================================================================
// Load/Generate SKIN Data
//===========================================================================
//
// Loads the SKIN file, if one exists.  If not, generates new SKIN data and
// saves it to the file.
//
//===========================================================================

static void make_skin( void ) {

    int strike;          // Fracture Counter
    int numfrac;         // Number of fractures
    int blast;           // Depth of next fracture
    int rf_num;          // Riff to use on this fracture
    int r1;              // Preliminary random choice of riff
    int half;            // Random choice of which half of surface to hit
    int dirn;            // Random choice of whether to blast up or down
    int x_start;         // Position around equator to start at
    int x, y;            // Every program needs some x and y coordinates
    int displace;        // Displacement

    float r2, dis;       // Weight riff probabilities

    DWORD size = 256*256;

    // Load/Generate RIFF Data
    make_riff();

    // If SKIN file exists, just load it
    if( (!bNewSkin) && FileExists( SkinFile ) ) {

        printf( LoadFmt, SkinName );
        if( LoadFile( SkinFile, skin, size ) == size ) return;

        Error();
        printf( ErrFmt, ErrLoad );
    }

    // Force new Xion
    bNewXion = TRUE;


    //-------------------------------------------------------
    // Generate SKIN data
    //-------------------------------------------------------
    printf( GenFmt, SkinName );

    // Compute number of fractures
    numfrac = (int) (pow( frac_base, frac_exp ));

    // Clear displacement
    displace = 0;

    // Do It!
    for( strike = numfrac; strike >= 1; strike-- ) {

        // Blast energy.  Notice that this is coded for an exponential
        //  decay which varies as a function of 'strike'.
        blast = (int)(frac_base / pow( (double)strike, frac_inv ));

        // All the random stuff
        r1      = irnd( 64 );     // 0-63       Riff
        dirn    = irnd( 2 );      // 0-1        Prob. that blast is neg.
        half    = irnd( 2 );      // 0-1        Prob. that disp is affected
        x_start = irnd( 256 );    // 0-255      Start Column
        r2      = frnd( 1.0f );   // 0.0 - 1.0  Prob. that r1 is inverted

        // Balance choice of riffs evenly over the surface
        dis = (float)(sin( PI * ((double)r1 + 0.5) / 128.0 ));
        dis *= dis;
        if( r2 <= dis ) rf_num = r1;
        else            rf_num = 63 - r1;

        // We only displace the northern half,
        //  then make up for it at the end
        if( dirn == 0 ) blast = -blast;
        if( half == 0 ) displace -= blast;

        // Progress Report
        if( !(strike%10) ) {

            printf( StrikeFmt, strike );
            fflush( stdout );
        }

        // Use riff 'rf_num' to displace an area of the surface by
        //  depth 'blast', starting at position 'x_start'
        fracture( rf_num, blast, x_start );
    }

    // Erase working line
    printf( "                                        \r" );

    // Adjust samples to equalize distribution
    printf( DispFmt, displace );

    for( y=0; y<128; y++ )
       for( x=0; x<256; x++ )
          skin[y][x] += displace;

    // Save SKIN data
    printf( SaveFmt, SkinName );
    if( SaveFile( SkinFile, skin, size ) != size ) {

        Error();
        printf( ErrFmt, ErrSave );
    }
}



//===========================================================================
// Load/Generate XION Data
//===========================================================================
//
// Loads the XION file (if it exists).  If not, XION data is generated and
// saved to the file.
//
//===========================================================================

static void make_xion( void ) {

    int x, y;
    int amp_skin;        // Skin amplitude
    int max_skin;        // Maximum and minimum amplitudes
    int min_skin;

    // Scaling
    float range;
    float scale;
    float base;
    float ofs;
    float amp;

    DWORD size = 128*256;

    // Load/Generate the SKIN Data
    make_skin();

    // If XION file exists, just load it
    if( (!bNewXion) && FileExists( XionFile ) ) {

        printf( LoadFmt, XionName );
        if( LoadFile( XionFile, xion, size ) == size ) return;

        Error();
        printf( ErrFmt, ErrLoad );
    }


    //-------------------------------------------------------
    // Compute SKIN limits
    //-------------------------------------------------------
    printf( "¯ Calculating Limits:\n" );

    // Assume Nothing
    max_skin = min_skin = 0;

    // Do It!
    for( y = 0; y < 128; y++ ) {

        for( x = 0; x < 256; x++ ) {

            // Get amplitude
            amp_skin = skin[y][x];

            // Track min/max amplitudes
            if( amp_skin < min_skin ) min_skin = amp_skin;
            if( amp_skin > max_skin ) max_skin = amp_skin;
        }
    }

    // Report Limits
    printf( LimFmt,
            min_skin,  max_skin,
            min_color, max_color );


    //-------------------------------------------------------
    // Generate XION data
    //-------------------------------------------------------
    printf( GenFmt, XionName );

    // Compute constants
    ofs   = (float)(min_skin);
    range = (float)(max_skin - min_skin);
    base  = (float)(min_color);
    scale = (float)(max_color - min_color);

    // Do it!
    for( y = 0; y < 128; y++ ) {

        for( x = 0; x < 256; x++ ) {

            // Compute amplitude
            amp = (float)(skin[y][x]) - ofs;

            // Transform and save
            xion[y][x] = (BYTE)(base + scale * amp / range);
        }
    }

    // Save XION data
    printf( SaveFmt, XionName );
    if( SaveFile( XionFile, xion, size ) != size ) {

        Error();
        printf( ErrFmt, ErrSave );
    }
}



//===========================================================================
// Show the XION array as a bitmap
//===========================================================================

static void show_xion( void ) {

    int iMode;
    int row;
    int i;
    int c;
    RGB pal[256];
    float base_c, scale_c, range_c, amp_c;

    // Wait for keystroke
    printf( "Press any key to view data...\n" );
    getch();

    // Save Old Video Mode
    iMode = GetVideoMode();

    // Set New Video Mode
    if( !SetVideoMode( 0x13 ) ) {

        Error();
        printf( ErrFmt, "Can't set video mode" );
        getch();
        return;
    }

    // Init solid purple palette
    pal[0].r = 0;
    pal[0].g = 0;
    pal[0].b = 0;
    pal[0].extra = 0;
    for( i=1; i<256; i++ ) {

        pal[i].r = 63;
        pal[i].g = 0;
        pal[i].b = 63;
        pal[i].extra = 0;
    }

    // Create Grey-Scale entries for Used Colors
    range_c = (float)(max_color-min_color);
    scale_c = 63.0f;
    base_c  = (float)(min_color);
    for( i=min_color; i<=max_color; i++ ) {

        // Convert Index to 6-bit DAC value
        amp_c = ((float)(i) - base_c) / range_c * scale_c;
        c = (BYTE)(amp_c);

        // Save as grey-scale color
        pal[i].r = c;
        pal[i].g = c;
        pal[i].b = c;
        pal[i].extra = 0;
    }

    // Set Palette
    SetPalette( pal );

    // Draw RIFF Data
    for( row=0, i=0xA0000 + (320*(200-64));
         row<64; row++ ) {

        // Draw row
        dosmemput( &(riff[row]), 64, i );
        i += 320;
    }

    // Draw XION Data
    for( row=0, i=0xA0000; row<128; row++ ) {

        // Draw row
        dosmemput( &(xion[row]), 256, i );
        i += 320;
    }

    // Wait for keypress
    getch();

    // Restore old video mode
    SetVideoMode( iMode );
}


