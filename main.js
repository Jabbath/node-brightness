var os = require("os");
var sys = require("sys");
var exec = require("child_process").exec;

function windows(brightness){
var GUID;
var subgroup;

/* powercfg -q gives information about power settings, but can only give accurate brightness info for laptops or other portable windows devices */

exec("powercfg -q", function(error,stdout,stderr){
	if(!error){
	console.log(stdout);
	}
	else{
	throw error;
	}
});

}

function changeBrightness(brightness){

	switch(os.platform()){
	
	case "win32":
	windows(brightness);
	break;
	
	case "linux":
	
	break;
	
	default:
	throw new Error("OS is not recognized or is unsupported");
	break;
	}

}

changeBrightness(20);