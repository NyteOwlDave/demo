
// 101. Damped Concentric Ripple (Droplet effect)
func[ 101 ] = (x, y) => {
    let r = SelfDot( x, y );
    return 160 * sin(3 + r / 4) / (4 + r / 15);
};

// 102. Classic Egg-Crate Surface
func[ 102 ] = (x, y) => 25 * (sin(x / 10) * cos(y / 10));

// 103. Inverted Cone / Funnel
func[ 103 ] = (x, y) => 200 - 50 * sqrt(x*x + y*y);

// 104. Hyperbolic Saddle with Wave Modulation
func[ 104 ] = (x, y) => (x*x - y*y) / 45 + 12 * sin(x / 6);

// 105. Spiral Vortex Wave
func[ 105 ] = (x, y) => 30 * sin(sqrt(x*x + y*y) - x / 3);

// 106. Gaussian-Faded Ripple Dome
func[ 106 ] = (x, y) => 45 * exp(-(x*x + y*y) / 2500) * cos(sqrt(x*x + y*y) / 3);

// 107. Diagonal Interference Grid
func[ 107 ] = (x, y) => 30 * sin((x + y) / 10) * cos((x - y) / 10);

// 108. Pyramid Peaks
func[ 108 ] = (x, y) => 50 - abs(x) - abs(y);

// 109. Crossed Troughs
func[ 109 ] = (x, y) => 35 * (sin(x / 8) / (1 + abs(y) / 25) + cos(y / 8) / (1 + abs(x) / 25));

// 110. Multi-Frequency Harmonic Landscape
func[ 110 ] = (x, y) => (
   30 * sin(x / 3) - 20 * cos(y / 3) + 25 * sin((x + y) / 5) 
);

