import * as THREE from '../threejs/three.module.js';

/**
 * Constant to encode 
 */
export const fallback = {
    "default":0,
    "current":1
}

/**
 * Wrapper constant for ThreeJS's tone mapping values.
 */
export const toneMapping = {
	"linear" : THREE.LinearToneMapping,
	"filmic" : THREE.ACESFilmicToneMapping
}

/**
 * Wrapper constant for ThreeJS's encoding values.
 */
export const encoding = {
	"sRGB": THREE.sRGBEncoding,
	"linear": THREE.LinearEncoding
}

/**
 * Translates ThreeJS's names for PBR maps.
 */
export const mapNames = { 
	"color"			: "map",
	"normal"		: "normalMap",
	"roughness"		: "roughnessMap",
	"displacement"	: "displacementMap",
	"metalness"		: "metalnessMap",
	"opacity"		: "alphaMap"
}

/** 
 * Contains information on how the normal map should be interpreted, depending on the convention used.
 * For DirectX, the green channel is inverted.
*/
export const normalMapType = {
	"opengl"	: new THREE.Vector2(1,1),
	"directx"	: new THREE.Vector2(1,-1)
}

// TODO: What do the arrays mean?

/**
 * These are the settings for ThreeJS if a specific map is active.
 * This ensures, for example, that the metalness map never gets multiplied by zero, which would effectively disable it.
 */
export const mapActiveSettings = {
	"color" : ["color",new THREE.Color( 0xffffff )],
	"normal": [null,null],
	"roughness":["roughness",1],
	"displacement":[null,null],
	"metalness":["metalness",1],
	"opacity":["opacity",1]
}

/**
 * These are the settings to use for ThreeJS if a specific map is inactive.
 */
export const mapInactiveSettings = {
	"color" : ["color",new THREE.Color( 0xdddddd )],
	"normal": [null,null],
	"roughness":["roughness",0.5],
	"displacement":[null,null],
	"metalness":["metalness",0],
	"opacity":["opacity",1]
}