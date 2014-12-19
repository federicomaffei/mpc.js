var context,
    soundSource,
    url = 'http://localhost:3000/assets/audio/';

function init() {
    if (typeof AudioContext !== "undefined") {
        context = new AudioContext();
    } else if (typeof webkitAudioContext !== "undefined") {
        context = new webkitAudioContext();
    } else {
        throw new Error('AudioContext not supported.');
    }
}

function startSound(soundId) {
    // Note: this loads asynchronously
    var request = new XMLHttpRequest();
    request.open("GET", url + String(soundId) + '.wav', true);
    request.responseType = "arraybuffer";
    // Our asynchronous callback
    request.onload = function() {
        var audioData = request.response;
        audiograph(audioData);
    };
    request.send();
}

function playSound() {
    // play the source now
    soundSource.loop = false;
    soundSource.start();
}

function audiograph(audioData) {

    soundSource = context.createBufferSource();
    context.decodeAudioData(audioData, function(buffer) {
        soundSource.buffer = buffer;
        volumeNode = context.createGain();
        //Set the volume
        volumeNode.gain.value = 0.8;
        // Wiring
        soundSource.connect(volumeNode);
        volumeNode.connect(context.destination);
        // Finally
        playSound(soundSource);
    },
    function(e){"Error with decoding audio data" + e.err});
}

init();