
/*

  mtx.js -- Matrix 4x4 Math

  Dave Wellsted, NCS  
  Last Updated: 2020-MAY-17

  REQUIRES:

    v4/vec.js

  METHODS:
  
    todo, fix, zero, identity, scale, translate,
    rotateX, rotateY, rotateZ, rotate*, rotate1, rotate2,
    quat, lookat, transform, cat, cat1, luindx, ludcmp, lubksb,
    clone, transpose, inverse, inverse1, inverse2, copy,
    det, det2x2, det3x3, det1, gaussian*, cramer*, order, 
    minor, cofactor, transVector, transNormal, 
    composeVector, composeMatrix, composeTranslate, composeScale,
    composeRotateX, composeRotateY, composeRotateZ, composeRotateZ,
    report
  
    * Incomplete or broken

  2020-MAY-17
  Cosmetics

*/

// Global 4x4 Matrix object
const Mtx = {};

// Bummer!
Mtx.todo = function(funcName) {
  throw ('Mtx.'+funcName+'() is incomplete');
}

// Repair matrix
Mtx.fix = function(m) {
  if (Array.isArray(m)) {
    if (m.length===4) {
      let ok=true;
      m.forEach(row=>{
        ok = ok && (row.length!==4);
      });
      if (ok) return;
    }
  }
  return (Mtx.zero());
}

// Return empty matrix
Mtx.zero = function() {
  return [
    [ 0, 0, 0, 0],
    [ 0, 0, 0, 0],
    [ 0, 0, 0, 0],
    [ 0, 0, 0, 0]
  ];
}

// Return identity matrix
Mtx.identity = function() {
  return [
    [ 1, 0, 0, 0],
    [ 0, 1, 0, 0],
    [ 0, 0, 1, 0],
    [ 0, 0, 0, 1]
  ];
}

// Return x,y,z scaling matrix
Mtx.scale = function(sx,sy,sz) {
  return [
    [sx, 0, 0, 0],
    [ 0,sy, 0, 0],
    [ 0, 0,sz, 0],
    [ 0, 0, 0, 1]
  ];
}

// Return x,y,z translate matrix
Mtx.translate = function(tx,ty,tz) {
  return [
    [ 1, 0, 0,tx],
    [ 0, 1, 0,ty],
    [ 0, 0, 1,tz],
    [ 0, 0, 0, 1]
  ];
}

// Return x rotate matrix
Mtx.rotateX = function(angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [
    [ 1, 0, 0, 0],
    [ 0, c,-s, 0],
    [ 0, s, c, 0],
    [ 0, 0, 0, 1]
  ];
}

// Return y rotate matrix
Mtx.rotateY = function(angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [
    [ c, 0, s, 0],
    [ 0, 1, 0, 0],
    [-s, 0, c, 0],
    [ 0, 0, 0, 1]
  ];
}

// Return z rotate matrix
Mtx.rotateZ = function(angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [
    [ c,-s, 0, 0],
    [ s, c, 0, 0],
    [ 0, 0, 1, 0],
    [ 0, 0, 0, 1]
  ];
}

// Return x,y,z rotate matrix
Mtx.rotate = function(ax,ay,az) {
  //
  // TODO: This seems to be flaky...
  //
  const sx = Math.sin(ax);
  const cx = Math.cos(ax);
  const sy = Math.sin(ay);
  const cy = Math.cos(ay);
  const sz = Math.sin(az);
  const cz = Math.cos(az);
  return [
    [
      cy * cz,
      sx * sy * cz - cx * sz,
      cx * sy * cz + sx * sz,
      0
    ],
    [
      cy * sx,
      sx * sy * sz + cx * cz,
      cx * sy * sz - sx * cz,
      0
    ],
    [
      -sy,
      sx * cy,
      cx * cy,
      0
    ],
    [ 0, 0, 0, 1]
  ];
}

// Return x,y,z rotate matrix (alternate #1)
Mtx.rotate1 = function(ax,ay,az) {
  const cat1 = ((m,n)=>{
    return [
      [
        m[0][0]*n[0][0]+m[0][1]*n[1][0]+m[0][2]*n[2][0],
        m[0][0]*n[0][1]+m[0][1]*n[1][1]+m[0][2]*n[2][1],
        m[0][0]*n[0][2]+m[0][1]*n[1][2]+m[0][2]*n[2][2]
      ],
      [
        m[1][0]*n[0][0]+m[1][1]*n[1][0]+m[1][2]*n[2][0],
        m[1][0]*n[0][1]+m[1][1]*n[1][1]+m[1][2]*n[2][1],
        m[1][0]*n[0][2]+m[1][1]*n[1][2]+m[1][2]*n[2][2]
      ],
      [
        m[2][0]*n[0][0]+m[2][1]*n[1][0]+m[2][2]*n[2][0],
        m[2][0]*n[0][1]+m[2][1]*n[1][1]+m[2][2]*n[2][1],
        m[2][0]*n[0][2]+m[2][1]*n[1][2]+m[2][2]*n[2][2]
      ]
    ];
  });
  const cat2 = ((m,n)=>{
    return [
      [
        m[0][0]*n[0][0]+m[0][1]*n[1][0]+m[0][2]*n[2][0],
        m[0][0]*n[0][1]+m[0][1]*n[1][1]+m[0][2]*n[2][1],
        m[0][0]*n[0][2]+m[0][1]*n[1][2]+m[0][2]*n[2][2],
        0
      ],
      [
        m[1][0]*n[0][0]+m[1][1]*n[1][0]+m[1][2]*n[2][0],
        m[1][0]*n[0][1]+m[1][1]*n[1][1]+m[1][2]*n[2][1],
        m[1][0]*n[0][2]+m[1][1]*n[1][2]+m[1][2]*n[2][2],
        0
      ],
      [
        m[2][0]*n[0][0]+m[2][1]*n[1][0]+m[2][2]*n[2][0],
        m[2][0]*n[0][1]+m[2][1]*n[1][1]+m[2][2]*n[2][1],
        m[2][0]*n[0][2]+m[2][1]*n[1][2]+m[2][2]*n[2][2],
        0
      ],
      [ 0, 0, 0, 1]
    ];
  });
  let c = Math.cos(ax);
  let s = Math.sin(ax);
  const mx = [
    [ 1, 0,  0],
    [ 0, c, -s],
    [ 0, s,  c]
  ];
  c = Math.cos(ay);
  s = Math.sin(ay);
  const my = [
    [ c, 0,  s],
    [ 0, 1,  0],
    [-s, 0,  c]
  ];
  c = Math.cos(az);
  s = Math.sin(az);
  const mz = [
    [ c,-s,  0],
    [ s, c,  0],
    [ 0, 0,  1]
  ];
  return cat2(cat1(mx,my),mz);
}

// Return x,y,z rotate matrix (alternate #2)
Mtx.rotate2 = function(ax,ay,az) {
  const mx = Mtx.rotateX(ax);
  const my = Mtx.rotateY(ay);
  const mz = Mtx.rotateZ(az);
  return Mtx.cat(Mtx.cat(mx,my),mz);
}

// Return quaternion matrix
Mtx.quat = function(x,y,z,angle) {
   const c = Math.cos( angle );
   const s = Math.sin( angle );
   const cc = 1 - c;
   const v = [x,y,z];
   Vec.Normalize(v);    // vec.js
   x = v[0];
   y = v[1];
   z = v[2];
   const M = [
     [(cc*x*x)+c,(cc*x*y)+(z*s),(cc*x*z)-(y*s),0],
     [(cc*x*y)-(z*s),(cc*y*y)+c,(cc*z*y)+(x*s),0],
     [(cc*x*z)+(y*s),(cc*y*z)-(x*s),(cc*z*z)+c,0],
     [0,0,0,1]
   ];
   return M;
}

// Return viewpoint matrix
Mtx.lookat = (function() {
  var x, y, z;
  return function lookAt(eye, target, up) {
    if (x===undefined) {
      x = [0,0,0];
      y = [0,0,0];
      z = [0,0,0];
    }
    // Req: vec.js
    Vec.Sub(eye,target,z);
    if (Vec.LenSqr(z)<Vec.TINY) {
      // eye and target are in the same position
      z[2] = 1;
    }
    Vec.Normalize(z);
    Vec.Cross(up,z,x);
    if (Vec.LenSqr(x)<Vec.TINY) {
      // eye and target are in the same vertical
      z[2] += 0.0001;
      Vec.Cross(up,z,x);
    }
    Vec.Normalize(x);
    Vec.Cross(z,x,y);
    const out = [
      [ x[0], x[1], x[2], 0 ],
      [ y[0], y[1], y[2], 0 ],
      [ z[0], z[1], z[2], 0 ],
      [ 0, 0, 0, 1 ]
    ];
    return out;
  };
})();

// Return transformation matrix (alternate)
Mtx.transform = function(ax,ay,az,mx,my,mz,tx,ty,tz) {
  const sx = Math.sin(ax);
  const cx = Math.cos(ax);
  const sy = Math.sin(ay);
  const cy = Math.cos(ay);
  const sz = Math.sin(az);
  const cz = Math.cos(az);
  return [
    [
      mx * (cy * cz),
      my * (sx * sy * cz - cx * sz),
      mz * (cx * sy * cz + sx * sz),
      tx
    ],
    [
      mx * (cy * sz),
      my * (sx * sy * sz + cx * cz),
      mz * (cx * sy * sz - sx * cz),
      ty
    ],
    [
      mx * (-sy),
      my * (sx * cy),
      mz * (cx * cy),
      tz
    ],
    [ 0, 0, 0, 1]
  ];
}

// Concatenate two matrices A x B => C
// NOTE: Uses pre-multiply method
Mtx.cat = function(a,b) {
  return [
      [
        a[0][0]*b[0][0]+a[0][1]*b[1][0]+a[0][2]*b[2][0],
        a[0][0]*b[0][1]+a[0][1]*b[1][1]+a[0][2]*b[2][1],
        a[0][0]*b[0][2]+a[0][1]*b[1][2]+a[0][2]*b[2][2],
        a[0][0]*b[0][3]+a[0][1]*b[1][3]+a[0][2]*b[2][3]+a[0][3]*b[3][3]
      ],
      [
        a[1][0]*b[0][0]+a[1][1]*b[1][0]+a[1][2]*b[2][0],
        a[1][0]*b[0][1]+a[1][1]*b[1][1]+a[1][2]*b[2][1],
        a[1][0]*b[0][2]+a[1][1]*b[1][2]+a[1][2]*b[2][2],
        a[1][0]*b[0][3]+a[1][1]*b[1][3]+a[1][3]*b[2][3]+a[1][3]*b[3][3]
      ],
      [
        a[2][0]*b[0][0]+a[2][1]*b[1][0]+a[2][2]*b[2][0],
        a[2][0]*b[0][1]+a[2][1]*b[1][1]+a[2][2]*b[2][1],
        a[2][0]*b[0][2]+a[2][1]*b[1][2]+a[2][2]*b[2][2],
        a[2][0]*b[0][3]+a[2][1]*b[1][3]+a[2][2]*b[2][3]+a[2][3]*b[3][3]
      ],
      [ 
        0,0,0,
        a[3][0]*b[0][3]+a[3][1]*b[1][3]+a[3][2]*b[2][3]+a[3][3]*b[3][3]
      ]
  ];
}

// Concatenate two matrices A x B => C (alternate #1)
Mtx.cat1 = function(a,b) {
  const m = Mtx.zero();
  var i, j, k;
  for (i=0; i<4; i++) {
    for (j=0; j<4; j++) {
      for (k=0; k<4; k++) {
        m[i][j] += a[i][k] * b[k][j];
      }
    }
  }
  return m;
}

// Creat index buffer for LU operations
Mtx.luindx = function() {
  return (new Int32Array(4));
}

// LU decompostion
Mtx.ludcmp = function(a,indx) {
  const  vv = [0,0,0,0]; // implicit scale for each row
  var     big, dum, sum, tmp;
  var     i, imax, j, k;
  d = 1.0;
  for (i = 0; i < 4; i++) {
    big = 0.0;
    for (j = 0; j < 4; j++) {
      if ((tmp = Math.abs(a[i][j])) > big) {
        big = tmp;
      }
    }
    if (big == 0.0) {
      throw 'Mtx.ludcmp(): singular matrix found';
    }
    vv[i] = 1.0/big;
  }
  for (j = 0; j < 4; j++) {
    for (i = 0; i < j; i++) {
      sum = a[i][j];
      for (k = 0; k < i; k++) {
        sum -= a[i][k] * a[k][j];
      }
      a[i][j] = sum;
    }
    big = 0.0;
    for (i = j; i < 4; i++) {
      sum = a[i][j];
      for (k = 0; k < j; k++) {
        sum -= a[i][k]*a[k][j];
      }
      a[i][j] = sum;
      if ((dum = vv[i] * Math.abs(sum)) >= big) {
        big = dum;
        imax = i;
      }
    }
    if (j != imax) {
      for (k = 0; k < 4; k++) {
        dum = a[imax][k];
        a[imax][k] = a[j][k];
        a[j][k] = dum;
      }
      d = -d;
      vv[imax] = vv[j];
    }
    indx[j] = imax;
    if (a[j][j] == 0.0) {
      // can be 0.0 also
      a[j][j] = 1.0e-20;
    }
    if (j != 3) {
      dum = 1.0/a[j][j];
      for (i = j+1; i < 4; i++) {
        a[i][j] *= dum;
      }
    }
  }
  return d;
}

// LU back substitution
Mtx.lubksb = function(a,indx,b) {
  var i, j, ii=-1, ip;
  var sum;
  for (i = 0; i < 4; i++) {
    ip = indx[i];
    sum = b[ip];
    b[ip] = b[i];
    if (ii>=0) {
      for (j = ii; j <= i-1; j++) {
        sum -= a[i][j] * b[j];
      }
    }
    else if (sum != 0.0) {
      ii = i;
    }
    b[i] = sum;
  }
  for (i = 3;i >= 0;i--) {
    sum = b[i];
    for (j = i+1;j < 4;j++) {
      sum -= a[i][j] * b[j];
    }
    b[i] = sum/a[i][i];
  }
}

// Return cloned matrix
Mtx.clone = function(m) {
  return [
    [m[0][0], m[0][1], m[0][2], m[0][3]],
    [m[1][0], m[1][1], m[1][2], m[1][3]],
    [m[2][0], m[2][1], m[2][2], m[2][3]],
    [m[3][0], m[3][1], m[3][2], m[3][3]]
  ];
}

// Return transpose matrix
Mtx.transpose = function(m) {
  return [
    [m[0][0], m[1][0], m[2][0], m[3][0]],
    [m[0][1], m[1][1], m[2][1], m[3][1]],
    [m[0][2], m[1][2], m[2][2], m[3][2]],
    [m[0][3], m[1][3], m[2][3], m[3][3]]
  ];
}

// Return inverse matrix
Mtx.inverse = function(m) {
  const y = Mtx.zero();
  var i, j;
  const indx = Mtx.luindx();
  var  d;
  let col = [0,0,0,0];
  n = Mtx.clone(m);                   // clone original matrix
  d = Mtx.ludcmp(n, indx);            // matrix lu decomposition
  for (j = 0; j < 4; j++) {          // matrix inversion
    for (i = 0; i < 4; i++) {
      col[i] = 0.0;
    }
    col[j] = 1.0;
    Mtx.lubksb(n, indx, col);
    for (i = 0;i < 4;i++) {
      y[i][j] = col[i];
    }
  }
  return y;
}

// Return inverse matrix (alternate #1)
Mtx.inverse1 = function(m) {
  const m00 = m[0][0], m01 = m[0][1], m02 = m[0][2], m03 = m[0][3];
  const m10 = m[1][0], m11 = m[1][1], m12 = m[1][2], m13 = m[1][3];
  const m20 = m[2][0], m21 = m[2][1], m22 = m[2][2], m23 = m[2][3];
  const m30 = m[3][0], m31 = m[3][1], m32 = m[3][2], m33 = m[3][3];
  const n = [
    [ m12*m23*m31 - m13*m22*m31 + m13*m21*m32 - m11*m23*m32 - m12*m21*m33 + m11*m22*m33,
      m03*m22*m31 - m02*m23*m31 - m03*m21*m32 + m01*m23*m32 + m02*m21*m33 - m01*m22*m33,
      m02*m13*m31 - m03*m12*m31 + m03*m11*m32 - m01*m13*m32 - m02*m11*m33 + m01*m12*m33,
      m03*m12*m21 - m02*m13*m21 - m03*m11*m22 + m01*m13*m22 + m02*m11*m23 - m01*m12*m23 ],
    [ m13*m22*m30 - m12*m23*m30 - m13*m20*m32 + m10*m23*m32 + m12*m20*m33 - m10*m22*m33,
      m02*m23*m30 - m03*m22*m30 + m03*m20*m32 - m00*m23*m32 - m02*m20*m33 + m00*m22*m33,
      m03*m12*m30 - m02*m13*m30 - m03*m10*m32 + m00*m13*m32 + m02*m10*m33 - m00*m12*m33,
      m02*m13*m20 - m03*m12*m20 + m03*m10*m22 - m00*m13*m22 - m02*m10*m23 + m00*m12*m23 ],
    [ m11*m23*m30 - m13*m21*m30 + m13*m20*m31 - m10*m23*m31 - m11*m20*m33 + m10*m21*m33,
      m03*m21*m30 - m01*m23*m30 - m03*m20*m31 + m00*m23*m31 + m01*m20*m33 - m00*m21*m33,
      m01*m13*m30 - m03*m11*m30 + m03*m10*m31 - m00*m13*m31 - m01*m10*m33 + m00*m11*m33,
      m03*m11*m20 - m01*m13*m20 - m03*m10*m21 + m00*m13*m21 + m01*m10*m23 - m00*m11*m23 ],
    [ m12*m21*m30 - m11*m22*m30 - m12*m20*m31 + m10*m22*m31 + m11*m20*m32 - m10*m21*m32,
      m01*m22*m30 - m02*m21*m30 + m02*m20*m31 - m00*m22*m31 - m01*m20*m32 + m00*m21*m32,
      m02*m11*m30 - m01*m12*m30 - m02*m10*m31 + m00*m12*m31 + m01*m10*m32 - m00*m11*m32,
      m01*m12*m20 - m02*m11*m20 + m02*m10*m21 - m00*m12*m21 - m01*m10*m22 + m00*m11*m22 ]
  ]
  const s = 1/Mtx.det(n);
  return (Mtx.cat(n,Mtx.scale(s,s,s)));
}

// Compute inverse matrix, return determinant 
Mtx.inverse2 = function(m,o) {
  const y = Mtx.zero();
  var i, j;
  const indx = Mtx.luindx();
  var  d;
  let col = [0,0,0,0];
  n = Mtx.clone(m);                   // clone original matrix
  d = Mtx.ludcmp(n, indx);            // matrix lu decomposition
  for (j = 0; j < 4; j++) {          // matrix inversion
    for (i = 0; i < 4; i++) {
      col[i] = 0.0;
    }
    col[j] = 1.0;
    Mtx.lubksb(n, indx, col);
    for (i = 0;i < 4;i++) {
      y[i][j] = col[i];
    }
  }
  // Calculate determinant
  for (j = 0; j < 4; j++) {
    d *= y[j][j]
  }
  // Copy inverse to o/p matrix
  Mtx.copy(y,o)
  return d;
}

// Copy one matrix to another
Mtx.copy = function(m,o) {
  for (let j = 0; j < 4; j++) {
    for (let i = 0; i < 4; i++) {
      o[j][i] = m[j][i];
    }
  }
}

// Return 4x4 matrix determinant
Mtx.det = function(m) {
  // http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
  const n11 = m[0][0], n12 = m[0][1], n13 = m[0][2], n14 = m[0][3];
  const n21 = m[1][0], n22 = m[1][1], n23 = m[1][2], n24 = m[1][3];
  const n31 = m[2][0], n32 = m[2][1], n33 = m[2][2], n34 = m[2][3];
  const n41 = m[3][0], n42 = m[3][1], n43 = m[3][2], n44 = m[3][3];
  return (
    n41 * (
      (n14*n23*n32) -
      (n13*n24*n32) -
      (n14*n22*n33) +
      (n12*n24*n33) +
      (n13*n22*n34) -
      (n12*n23*n34)
    ) +
    n42 * (
      (n11*n23*n34) -
      (n11*n24*n33) +
      (n14*n21*n33) -
      (n13*n21*n34) +
      (n13*n24*n31) -
      (n14*n23*n31)
    ) +
    n43 * (
      (n11*n24*n32) -
      (n11*n22*n34) -
      (n14*n21*n32) +
      (n12*n21*n34) +
      (n14*n22*n31) -
      (n12*n24*n31)
    ) +
    n44 * (
      (n12*n23*n31) -
      (n13*n22*n31) -
      (n11*n23*n32) +
      (n11*n22*n33) +
      (n13*n21*n32) -
      (n12*n21*n33)
    )
  );
}

// Return 2x2 matrix determinant
Mtx.det2x2 = function(m) {
  return (
    (m[0][0]*m[1][1]) - 
    (m[1][0]*m[0][1])
  );
}

// Return 3x3 matrix determinant
Mtx.det3x3 = function(m) {
  return (
    (m[0][0]*m[1][1]*m[2][2]) -
    (m[0][0]*m[2][1]*m[1][2]) -
    (m[0][1]*m[1][0]*m[2][2]) +
    (m[0][1]*m[2][0]*m[1][2]) +
    (m[0][2]*m[1][0]*m[2][1]) -
    (m[0][2]*m[2][0]*m[1][1])
  );
}

// Return 4x4 matrix determinant (alternate #1)
Mtx.det1 = function(m) {
  const y = Mtx.zero();
  var i, j;
  const indx = Mtx.luindx();
  var  d;
  let col = [0,0,0,0];
  n = Mtx.clone(m);                   // clone original matrix
  d = Mtx.ludcmp(n, indx);            // matrix lu decomposition
  for (j = 0; j < 4; j++) {          // matrix inversion
    for (i = 0; i < 4; i++) {
      col[i] = 0.0;
    }
    col[j] = 1.0;
    Mtx.lubksb(n, indx, col);
    for (i = 0;i < 4;i++) {
      y[i][j] = col[i];
    }
  }
  // Calculate determinant
  for (j = 0; j < 4; j++) {
    d *= y[j][j]
  }
  return d;
}

// Solve system of linear equations by Gaussian elimination
Mtx.gaussian = function(m) {
  Mtx.todo('cramer');
}

// Solve system of linear equations by Cramer's Method
Mtx.cramer = function(m) {
  Mtx.todo('cramer');
}

// Return matrix order
Mtx.order = function(m) {
  if (!Array.isArray(m)) return 0;
  let o = m.length;
  m.forEach(row=>{
    if (!Array.isArray(row)) o = 0;
    else o = (o>row.length)?row.length:o;
  });
  return o;
}

// Return minor submatrix
Mtx.minor = function(m,i,j) {
  let n = [];
  const order = Mat.order(m)-1;
  if (order < 2) return n;
  if ((i<0)||(j<0)||(i>=order)||(j>=order)) {
    throw 'Index out of range in Mtx.minor()';
  }
  for (let u=0; u<order; u++) {
    if (u===i) continue;
    let r = [];
    for (let v=0; v<order; v++) {
      if (v===j) continue;
      r.push(m[u][v]);
    }
    n.push(r);
  }
  return n;
}

// Return cofactor (-1,+1)
Mtx.cofactor = function(i,j) {
  return (((i+j)&1)?(-1):(1));
}

// Return transformed vector
Mtx.transVector = function(m,v) {
  let u = [
    (
      m[0][0]*v[0] +
      m[0][1]*v[1] +
      m[0][2]*v[2] +
      m[0][3]
    ),
    (
      m[1][0]*v[0] +
      m[1][1]*v[1] +
      m[1][2]*v[2] +
      m[1][3]
    ),
    (
      m[2][0]*v[0] +
      m[2][1]*v[1] +
      m[2][2]*v[2] +
      m[2][3]
    )
  ];
  Vec.S(1/m[3][3],u,u); // vec.js
  return u;
}

// Return transformed normal
Mtx.transNormal = function(m,v) {
  const out = [0, 0, 0];
  let orig  = [0, 0, 0];
  let t1    = [1, 0, 0];
  let t2    = [0, 0, 0];
  Vec.Normalize(v); // vec.js
  // Create a t1 vector not aligned with in
  let dot = Vec.Dot(t1, v);
  if (Vec.ABS(dot) > 0.8) {
    Vec.Make(0.0, 1.0, 0.0, t1);
  }
  Vec.Cross(v, t1, t2);   // Create t2
  Vec.Cross(t2, v, t1);   // Create proper t1
  // Transform tangents
  t1 = Mtx.transVector(m, t1);
  t2 = Mtx.transVector(m, t2);
  orig = Mtx.transVector(m, orig);
  Vec.Sub(t1, orig, t1);
  Vec.Sub(t2, orig, t2);
  Vec.Cross(t1, t2, out);  // Recreate normal
  return out;
}

// Compose vector as text
Mtx.composeVector = function(name,v) {
  name=name?name:'vector';
  v = Vec.fix(v);   // vec.js
  const s = `${name} ${v[0]} ${v[1]} ${v[2]}`;
  return s;
}

// Compose matrix as text
Mtx.composeMatrix = function(name,m) {
  name=name?name:'matrix';
  m = Mtx.fix(m);
  const s = `${name}\n`;
  const x = `${m[0][0]} ${m[0][1]} ${m[0][2]} ${m[0][3]}\n`;
  const y = `${m[1][0]} ${m[1][1]} ${m[1][2]} ${m[1][3]}\n`;
  const z = `${m[2][0]} ${m[2][1]} ${m[2][2]} ${m[2][3]}\n`;
  const w = `${m[3][0]} ${m[3][1]} ${m[3][2]} ${m[3][3]}`;
  return (x+y+z+w);
}

// Compose translation as text
Mtx.composeTranslate = function(tx,ty,tz) {
  return (Mtx.composeVector('translate',[tx,ty,tz]));
}

// Compose scale transform as text
Mtx.composeScale = function(sx,sy,sz) {
  return (Mtx.composeVector('scale',[sx,sy,sz]));
}

// Compose x rotate transform as text
Mtx.composeRotateX = function(angle) {
  return (Mtx.composeVector('rotate',[angle,0,0]));
}

// Compose y rotate transform as text
Mtx.composeRotateY = function(angle) {
  return (Mtx.composeVector('rotate',[0,angle,0]));
}

// Compose z rotate transform as text
Mtx.composeRotateZ = function(angle) {
  return (Mtx.composeVector('rotate',[0,0,angle]));
}

// Compose x,y,z rotate transform as text
Mtx.composeRotate = function(rx,ry,rz) {
  return (Mtx.composeVector('rotate',[rx,ry,rz]));
}

// Report matrix state to callback
Mtx.report = function(name,m,callback) {
  if ('function' === typeof callback) {
    callback(Mtx.composeMatrix(name,m));
  }
  else {
    console.log(Mtx.composeMatrix(name,m));
  }
}

