
/*

    planet-ui.js

    This is the UI, specific to the planet app.
    
    Dave Wellsted, NCS
    2020-APR-05

    2020-APR-02
    Added enableControl() method
    Added enableControls() method

    2020-APR-05
    Cosmetic improvements
    Added functions to write control values

*/

const REALNUM = (n) => Math.round(n) || 0;
const CLAMP = (a,b,c) => Math.min(Math.max(a,b),c);
const DEG2RAD = (n) => Vec.degtorad(n);
const RAD2DEG = (n) => Vec.radtodeg(n);

function getSpinRate() {
    const a = REALNUM(idSpinRate.value);
    const b = REALNUM(idSpinRate.min);
    const c = REALNUM(idSpinRate.max);
    return CLAMP(a, b, c);
}

function getScale() {
    const a = REALNUM(idScale.value);
    const b = REALNUM(idScale.min);
    const c = REALNUM(idScale.max);
    return CLAMP(a, b, c);
}

function getAspect() {
    return idHemi.checked ? 1 : 0.5;
}

function getPitch() {
    const a = REALNUM(idRotateX.value);
    const b = REALNUM(idRotateX.min);
    const c = REALNUM(idRotateX.max);
    return DEG2RAD(CLAMP(a, b, c));
}

function getYaw() {
    const a = REALNUM(idRotateY.value);
    const b = REALNUM(idRotateY.min);
    const c = REALNUM(idRotateY.max);
    return DEG2RAD(CLAMP(a, b, c));
}

function getRoll() {
    const a = REALNUM(idRotateZ.value);
    const b = REALNUM(idRotateZ.min);
    const c = REALNUM(idRotateZ.max);
    return DEG2RAD(CLAMP(a, b, c));
}

function getTransform(planet) {
    planet.xrot = getPitch();
    planet.yrot = getYaw();
    planet.zrot = getRoll();
}

function setTransform(planet) {
    idRotateX.value = REALNUM(RAD2DEG(planet.xrot));
    idRotateY.value = REALNUM(RAD2DEG(planet.yrot));
    idRotateZ.value = REALNUM(RAD2DEG(planet.zrot));
}

function setScale(n) {
    const a = REALNUM(n);
    const b = REALNUM(idScale.min);
    const c = REALNUM(idScale.max);
    idScale.value = CLAMP(a, b, c);
}

function setAspect(n) {
    idHemi.checked = (n === 1);
}

function setControlsFromPlanet(planet) {
    setTransform(planet);
    setScale(planet.scale);
    setAspect(planet.aspect);
}

function enableControl(element, on) {
    if (on) {
        element.removeAttribute('disabled');
    } else {
        element.setAttribute('disabled', 'true');
    }    
}

function enableControls(on) {
    enableControl(idPlanetSection, on);
    enableControl(idTextureSection, on);
    enableControl(idPaletteSection, on);
}

