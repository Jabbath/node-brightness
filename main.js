var os = require('os');
var sys = require('sys');
var exec = require('child_process').exec;

function windows(brightness){

//These are the identifiers for the current power scheme

	var GUID;
	var subgroup;
	var powerSetting;

	/* powercfg -q gives information about power settings, but can only give accurate brightness info for laptops or other portable windows devices */

	exec('powercfg -q', function(error,stdout,stderr){
		if(!error){	
			var regExp =  /([a-z\-0-9]+)\s\D+$/
			var splitOutput = stdout.split('\r\n');
			GUID = regExp.exec(splitOutput[0])[1];
			
			for(var i = 0;i<splitOutput.length;i++){
				if(splitOutput[i].match(/\(Display\)$/)){
				
					//The subgroup is derived from the output named display
				
					subgroup = regExp.exec(splitOutput[i])[1];
				}
				else if(splitOutput[i].match(/\(Display\sbrightness\)$/)){
				
					//The powerSetting is derived from the output named Display 
				
					powerSetting = regExp.exec(splitOutput[i])[1];
				}
			}

			//console.log(GUID,subgroup,powerSetting);
			
			//Set the the brightness for AC power plan settings
			
			exec('powercfg -SetAcValueIndex' + ' ' + GUID + ' ' + subgroup + ' ' + powerSetting + ' ' + brightness,function(err,out,stderror){
				if(err) throw err;
				
				//Set the brightness when on DC power plan settings

				exec('powercfg -SetDcValueIndex' + ' ' + GUID + ' ' + subgroup + ' ' + powerSetting + ' ' + brightness,function(err,out,stderror){
					if(err) throw err;
					
					//Set the modified power plan as the current system plan
					
					exec('powercfg -S' + ' ' + GUID,function(err,out,stderror){
						if(err) throw err;
						return true;
					});
				});
			});			

		}
		else{
			throw error;
		}
	});
}

function changeBrightness(brightness){

//Brightness is in percent

	switch(os.platform()){
	
	case 'win32':
	windows(brightness);
	break;
	
	case 'linux':
	
	break;
	
	default:
	throw new Error('OS is not recognized or is unsupported');
	break;
	}

}

changeBrightness('100');