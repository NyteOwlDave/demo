
/* core-math.js */


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Simple Roots
sqrt=(n)=>Math.sqrt(n);
cbrt=(n)=>Math.cbrt(n)

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Simple Powers
square =( x )=> ( x * x     );
cube   =( x )=> ( x * x * x );

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

mu  = (1+sqrt(5))/2;
eu  = Math.E;
pi  = Math.PI;
phi = pi/2;
tau = pi*2;

pon=[
  NaN
, pi  , pi/2, pi/3, pi/4
, pi/5, pi/6, pi/7, pi/8
];

srn=[
  0
, 1, sqrt(2), sqrt(3)
, 2, sqrt(5), sqrt(6)
,    sqrt(7), sqrt(8)
];

d2r=(n)=>(n/180)*pi;
r2d=(n)=>(n*180)/pi;

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

sgn=(n)=>Math.sign(n);
abs=(n)=>Math.abs(n);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

sin=(n)=>Math.sin(n);
cos=(n)=>Math.cos(n);
tan=(n)=>Math.tan(n);

xmute=(n)=>sqrt(1-n*n);

asin=(n)=>Math.asin(n);
acos=(n)=>Math.acos(n);
atan=(n)=>Math.atan(n);

mod=(y,x)=>Math.hypot(y,x);
arg=(y,x)=>Math.atan2(y,x);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

min=(a,b)=>Math.min(a,b);
max=(a,b)=>Math.max(a,b);
mid=(a,b)=>min(c,max(a,b));

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

rnd=()=>Math.random();
now=()=>Date.now()

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

exp=(x)=>Math.exp(x);
pow=(x,n)=>Math.pow(x,n);

rootn=(x,n)=>pow(x,1/n);

log=(x)=>Math.log(x);
logn=(x,n)=>(log(x)/log(n));
log2=(x)=>Math.log2(x);
log8=(x)=>Math.logn(x,8);
log10=(x)=>Math.log10(x);
log16=(x)=>Math.logn(x,16);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

lerp=(a,b,t)=>((1-t)*a+(t)*b);
proj=(a,b,t)=>(a+(t)*b);
comb=(a,i,b,j)=>(a*i+b*j);
comq=(a,i,b,j)=>(a*j-b*i);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

gamma = function(a,b,c,d) {
   r=(c-b);
   return (b+r*pow((a-b)/r,1/d));
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

fibo = function(n) {
    let a = 0, b = 1, temp;
    if (n === 0) return a;
    for ( let i = 2; i <= n; i++ ) {
        temp = a + b;
        a = b;
        b = temp;
    }
    return b;
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

fact = function(n) {
    if (n < 0) {
        return undefined; 
    } else if (n === 0 || n === 1) {
        return 1;
    }
    let result = 1;
    for ( let i = 2; i <= n; i++ ) {
        result *= i;
    }
    return result;
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

npr=(n,r)=>(fact(n)/fact(n-r));
ncr=(n,r)=>(npr(n,r)/fact(r));

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Sample Sum and Mean Average
sum =( x )=> ( x.reduce( (a,b) => (a+b) ) );
avg =( x )=> ( sum( x ) / x.length );

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// (( IMPROVED! )) Known Good Version
stdev = function( x ) {
    let mu = avg( x );
    let w  = sum( x.map( x => square( x-mu ) ) );
    let n  = x.length;
    return sqrt( w / ( n - 1 ) );
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// (( IMPROVED ! )) Slope Equation 2x2 points
slope2  =(x1,y1,x2,y2)=> ((y2-y1)/(x2-x1));
slope2i =(x1,y1,x2,y2)=> ((x2-x1)/(y2-y1));

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

MathAPI = {
version : 2.1 ,
updated : "2026-SEP-06" ,
pass : {
  provider : "http://dave-omega"
, splitter : "repo/web/gems"
, key      : "core-math.js"
, tikey    : "8bc023cb-f662-4c11-9f66-d81027a77714"
, tidate   : "2026-SEP-06"
, title    : "Core Math"
} ,
eu   , pi   ,
mu   , phi  , pon   , srn ,
rnd  , now  , sgn   , abs ,
r2d  , d2r  , arg   , mod ,
min  , mid  , max   ,
sin  , cos  , tan   ,
asin , acos , atan  ,
log  , log2 , log10 ,
logn , log8 , log16 ,
pow  , exp  , gamma ,
sqrt , cbrt , rootn ,
lerp , proj ,
comb , comq ,
npr  , ncr  ,
fibo , fact ,
xmute   ,
slope2  ,
slope2i ,
stdev   ,
square  ,
sum     ,
avg
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

;
; console.log( `Loaded "core-math.js" Gem Module` )
;

