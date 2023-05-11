var allAudio = document.getElementById("all-audio");


function audioVolumeIn(q, iVolume) {
    if(q.volume){
        var InT = 0;
        var setVolume = iVolume || 0.6; // Target volume level for new song
        var speed = 0.002; // Rate of increase
        q.volume = InT;
        q.play();
        var eAudio = setInterval(function(){
            InT += speed;
            q.volume = InT.toFixed(1);
            if(InT.toFixed(1) >= setVolume){
                clearInterval(eAudio);
            };
        },50);
    };
};

function audioVolumeOut(q, iVolume) {
    if(q.volume){
        var InT = iVolume || 0.6;
        var setVolume = 0;  // Target volume level for old song 
        var speed = 0.01;  // Rate of volume decrease
        q.volume = InT;
        var fAudio = setInterval(function(){
            InT -= speed;
            q.volume = InT.toFixed(1);
            if(InT.toFixed(1) <= setVolume){
                q.pause();
                q.currentTime = 0;
                clearInterval(fAudio);
            };
        },50);
    };
};
