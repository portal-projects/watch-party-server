var l1 = false;
var l2 = false;
var l3 = false;
var tag = document.createElement('script');
var firstScriptTag = document.getElementsByTagName('script')[0];
var player;
var itime;
$.get("party_info/intermission_time.txt", function(data){
    itime = Number(data);
});
var ilength;
$.get("party_info/intermission_length.txt", function(data){
    ilength = Number(data);
});
var video_started;
$.get("party_info/date.txt", function(data){
    video_started = Number(data);
    l1 = true;
    load_player();
});
var video_length; //Maybe I'll have this stored server-side, where it recieves player.getDuration() as soon as the videoID and time are recieved. Right now, getDuration() cannot be used, because it only loads after the video has played.
$.get("party_info/video_length.txt", function(data){
    video_length = Number(data);
    l2 = true;
    load_player();
});
var id;
$.get("party_info/id.txt", function(data){
    id = data;
    l3 = true;
    load_player();
}, "text");
var true_timestamp;
var hours;
var minutes;
var seconds;
var is_intermission = false;

function load_player() {
    if (l1 === true && l2 === true && l3 === true) {
        tag.src = "https://www.youtube.com/iframe_api";
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        timestamp();
    }
}
function timestamp_calc() {
    var now = new Date();
    if (ilength === 0 || itime > (now.getTime()/1000) - video_started) {
        true_timestamp = (Number(now.getTime())/1000 - video_started);
        is_intermission = false;
    } else if (itime <= (now.getTime()/1000 - video_started) && itime + ilength > (now.getTime()/1000 - video_started)) {
        true_timestamp = itime;
        is_intermission = true;
    } else if (itime + ilength <= (now.getTime()/1000 - video_started)) {
        true_timestamp = (Number(now.getTime())/1000 - video_started) - ilength;
        is_intermission = false;
    }
    if (itime + ilength == Math.round(now.getTime()/1000 - video_started)) {
        player.playVideo(); //This may be bad practice. I placed this statement in timestamp_calc() because now is defined here, but all my other player controllers are in timestamp().
        player.seekTo(true_timestamp, true);
    }
    var HMSTime = Math.abs(true_timestamp);
    hours = Math.floor(HMSTime / 3600);
    HMSTime %= 3600;
    minutes = Math.floor(HMSTime / 60);
    seconds = HMSTime % 60;
}
function timestamp() {
    timestamp_calc();
    if (Math.round(true_timestamp) == -2) {
        player.playVideo();
    }
    if (is_intermission === true) {
        player.pauseVideo();
    }
    if (true_timestamp >= 0 && true_timestamp < video_length && is_intermission === false){
        document.getElementById("friends").innerHTML = 'The party is at ' + hours + ":" + minutes.toString().padStart(2, "0") + ":" + seconds.toFixed(1).toString().padStart(4, "0") + "!";
        document.getElementById("refresh").style.display = 'block';
        document.getElementById("refresh").onclick = function() {player.playVideo(), player.seekTo(true_timestamp, true)};
    } else if (true_timestamp >= video_length){
        document.getElementById("refresh").style.display = 'none';
        document.getElementById("friends").innerHTML = "There's no party here!<br />Go home, you rascally kids!";
    } else if (is_intermission === true){
        document.getElementById("friends").innerHTML = "It's intermission! We're paused at " + hours + ":" + minutes.toString().padStart(2, "0") + ":" + seconds.toFixed(1).toString().padStart(4, "0") + "!";
        document.getElementById("refresh").style.display = 'none';
    } else {
        document.getElementById("friends").innerHTML = 'The party starts in ' + hours + ":" + minutes.toString().padStart(2, "0") + ":" + seconds.toFixed(1).toString().padStart(4, "0") + "!";
        document.getElementById("refresh").style.display = 'none';
    }
}
function onYouTubeIframeAPIReady() {
    timestamp_calc();
    if (true_timestamp >= 0 && true_timestamp < video_length && is_intermission === false){
        player = new YT.Player('player', {
            height: '538',
            width: '956',
            videoId: id,
            playerVars: { 'start': Math.round(true_timestamp) + 2 },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    } else if (true_timestamp >= video_length) {
        player = null;
    } else {
        player = new YT.Player('player', {
            height: '538',
            width: '956',
            videoId: id,
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }
}
function onPlayerReady(event) {
    setInterval(timestamp, 100);
    if (true_timestamp >= 0 && is_intermission === false){
        event.target.playVideo();
    }
}
function onPlayerStateChange(event) {
}
