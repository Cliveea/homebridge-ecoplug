//var json_raw = '{"accessories": [{"accessory": "EcoPlug","name": "Plug1","host": "192.168.2.51","id": "ECO-7801B128"},{"accessory": "EcoPlug","name": "Plug2","host": "192.168.2.52","id": "ECO-78006F9E"}]}';
/*
node PlugConrol.js -a state -pn "Plug1" -id "ECO-7801B128" -ip "192.168.2.51"
node PlugConrol.js -a state -pn "Plug2" -id "ECO-78006F9E" -ip "192.168.2.52"
*/

/* VARIABLES */
var plugName = "";
var plugID = "";
var plugIP = "";
var action = "";
var debugPrint = false;

/* PROCESS ARGUMENTS */
if(process.argv.indexOf("-pn") != -1){plugName = process.argv[process.argv.indexOf("-pn") + 1];}
if(process.argv.indexOf("-id") != -1){plugID = process.argv[process.argv.indexOf("-id") + 1].toUpperCase();}
if(process.argv.indexOf("-ip") != -1){plugIP = process.argv[process.argv.indexOf("-ip") + 1];}
if(process.argv.indexOf("-a") != -1){action = process.argv[process.argv.indexOf("-a") + 1].toLowerCase();}
if(process.argv.indexOf("-d") != -1){debugPrint=true;}

var json_result = JSON.parse('{"accessories": [{"accessory": "EcoPlug","name": "' + plugName + '","host": "' + plugIP + '","id": "' + plugID + '"}]}');
var errorLog = "";

var EcoPlug = require('./index-alt.js');
PlugControl = new EcoPlug(errorLog, json_result.accessories[0]);

if (action == "state"){
	PlugControl.getStatus(function(error){
		if(!error){
		}else{
			if (debugPrint){
				console.log("There was an error");
				console.log(error.message);
			}
		}
	});
}else if (action == "on"){
	PlugControl.setStatus( true, function(error){
		if(!error){
		}else{
			if (debugPrint){
				console.log("There was an error");
				console.log(error.message);
			}
		}
	});
}else if (action == "off"){
	PlugControl.setStatus( false, function(error){
		if(!error){
		}else{
			if (debugPrint){
				console.log("There was an error");
				console.log(error.message);
			}
		}
	});
}
