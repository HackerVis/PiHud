var bootup = new Audio('bootup.mp3');
var shutdown = new Audio('shutdown.mp3');
var authenticated = false;
var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
booted = false;
recognition.onresult = function(event) { 
	console.log(event);
	recognition.interimResults = true;
	var output = document.getElementById("overlay");
	var video = document.getElementById("v");
	var reactor = document.getElementById("overlayBatteryWrapper");

	output.innerHTML = "";
	for(var i=0; i< event.results.length; i++){
		if(event.results[i][0].transcript.includes("boot heads up display") || event.results[i][0].transcript.includes("engage heads up display") || event.results[i][0].transcript.includes("suit up") && !authenticated){
			reactor.style.display = "none";
			v.style.display = "block";
			authenticated = true;
			output.style.display = "block";
			// bootup.play();
			
		}
		else if(event.results[i][0].transcript.includes("power down") || event.results[i][0].transcript.includes("shut down") || event.results[i][0].transcript.includes("power off")){
			// if(authenticated){
			// 	shutdown.play();
			// }
			authenticated = false;
			booted = false;
			v.style.display = "none";
			output.style.display = "none";
			reactor.style.display = "none";
		}
		else if(event.results[i][0].transcript.includes("instant") || event.results[i][0].transcript.includes("computer assist") && authenticated){
			booted = true;
			output.innerHTML = "booted";
			authenticated = true;
			v.style.display = "block";
			reactor.style.display = "flex";
			output.style.display = "block";
			output.innerHTML = event.results[i][0].transcript;
		}
		else if(authenticated){
			output.innerHTML = event.results[i][0].transcript;
			v.style.display = "block";
			if(booted){
				reactor.style.display = "flex";
				output.style.display = "block";
			}
		}
		else{
			v.style.display = "none";
			reactor.style.display = "none";
			output.style.display = "none";
		}
		
	}
}
recognition.start();

