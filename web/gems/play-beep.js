/*
    https://developer.mozilla.org/en-US/docs/Web/API/Audio_Output_Devices_API
    https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode/type
*/

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var audioContext;

try {
	audioContext = new (
		   window.AudioContext
		|| window.webkitAudioContext
	)();
} catch ( e ) {
	alert ( e );
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function play_beep(frequency = 2424, duration = 42) {

	if (! audioContext ) { return; }

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = 'sine'; // Simple tone (sine wave)
    oscillator.frequency.value = frequency; // Hz (440 is A4 note)
    gainNode.gain.value = 0.1242; // Volume (0 to 1)

    oscillator.start();
    setTimeout(() => {
        oscillator.stop();
    }, duration);
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


