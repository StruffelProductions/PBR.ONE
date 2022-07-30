// VARIABLES AND CONSTANTS

const PBR1_SCENECONFIG = {
	"default" : {
		"texture_url" : "",
	},
	"current" : {},
	"internal":{
		"aspect": null,
		"background_x":0,
		"background_y":0,
		"background_size":200,
		"mouse_down":false
	}
}

PBR1_ELEMENTS.targetDomElement = document.querySelector('#renderer_target');

// EVENT LISTENERS

window.addEventListener('pageshow',function(){
	updateBackgroundPosition();
	updateBackgroundSize();
});

window.addEventListener('wheel', function(event){
	event.preventDefault();
	var scaling_factor = 1 + event.deltaY/1000;
	PBR1_SCENECONFIG.internal.background_size *= scaling_factor;
	PBR1_SCENECONFIG.internal.background_size = Math.min(Math.max(PBR1_SCENECONFIG.internal.background_size,16),32768);
	PBR1_SCENECONFIG.internal.background_x = mod(PBR1_SCENECONFIG.internal.background_x,PBR1_SCENECONFIG.internal.background_size);
	PBR1_SCENECONFIG.internal.background_y = mod(PBR1_SCENECONFIG.internal.background_y,PBR1_SCENECONFIG.internal.background_size);
	updateBackgroundPosition();
	updateBackgroundSize();
},{passive:false});

window.addEventListener('mousedown', function(){
	PBR1_SCENECONFIG.internal.mouse_down=true;
});

window.addEventListener('mouseup', function(){
	PBR1_SCENECONFIG.internal.mouse_down=false;
});

window.addEventListener('mousemove', function(event){
	if(PBR1_SCENECONFIG.internal.mouse_down){
		PBR1_SCENECONFIG.internal.background_x = mod(PBR1_SCENECONFIG.internal.background_x + event.movementX, PBR1_SCENECONFIG.internal.background_size);
		PBR1_SCENECONFIG.internal.background_y = mod(PBR1_SCENECONFIG.internal.background_y + event.movementY, PBR1_SCENECONFIG.internal.background_size);
		updateBackgroundPosition();
	}
},{passive:false});

// FUNCTIONS
function mod(n, m) {
	return ((n % m) + m) % m;
}

function updateBackgroundSize(){
	PBR1_ELEMENTS.targetDomElement.style.backgroundSize = `${PBR1_SCENECONFIG.internal.background_size}px`;
}
function updateBackgroundPosition(){
	var new_x = PBR1_SCENECONFIG.internal.background_x + window.innerWidth / 2;
	var new_y = PBR1_SCENECONFIG.internal.background_y + window.innerHeight / 2;
	PBR1_ELEMENTS.targetDomElement.style.backgroundPosition = `${new_x}px ${new_y}px`;
}

function updateScene(incomingSceneConfiguration,fallbackType){

	newSceneConfiguration = buildNewSceneConfiguration(incomingSceneConfiguration,fallbackType);

	// CSS Background
	PBR1_ELEMENTS.targetDomElement.style.backgroundImage = `url('${newSceneConfiguration['texture_url']}')`;
	PBR1_ELEMENTS.targetDomElement.style.backgroundSize = `${PBR1_SCENECONFIG.internal.background_size}px`;
	PBR1_SCENECONFIG.current = structuredClone(newSceneConfiguration);
	updateGuiFromCurrentSceneConfiguration();
}

// MAIN

updateScene(parseHashString(),0);