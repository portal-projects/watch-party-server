var video_started;
$.get("party_info/date.txt", function(data){
    video_started = Number(data);
    setInterval(timestamp, 100);
});
var video_length; //Maybe I'll have this stored server-side, where it recieves player.getDuration() as soon as the videoID and time are recieved. Right now, getDuration() cannot be used, because it only loads after the video has played.
$.get("party_info/video_length.txt", function(data){
    video_length = Number(data);
});
var id;
var tag = document.createElement('script');
var firstScriptTag = document.getElementsByTagName('script')[0];
$.get("party_info/id.txt", function(data) {id = data;tag.src = "https://www.youtube.com/iframe_api";firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);}, "text");
var player;
var true_timestamp;
var hours;
var minutes;
var seconds;

function timestamp_calc() {
    var now = new Date();
    true_timestamp = (Number(now.getTime())/1000 - video_started);
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
    if (true_timestamp >= 0 && true_timestamp < video_length){
        document.getElementById("friends").innerHTML = 'The party is at ' + hours + ":" + minutes.toString().padStart(2, "0") + ":" + seconds.toFixed(1).toString().padStart(4, "0") + "!";
        document.getElementById("refresh").style.display = 'block';
        document.getElementById("refresh").onclick = function() {player.playVideo(), player.seekTo(true_timestamp, true)};
    } else if (true_timestamp >= video_length){
        document.getElementById("refresh").style.display = 'none';
        document.getElementById("friends").innerHTML = "There's no party here!<br />Go home, you rascally kids!";
    } else {
        document.getElementById("friends").innerHTML = 'The party starts in ' + hours + ":" + minutes.toString().padStart(2, "0") + ":" + seconds.toFixed(1).toString().padStart(4, "0") + "!";
        document.getElementById("refresh").style.display = 'none';
    }
}
function onYouTubeIframeAPIReady() {
    timestamp_calc();
    if (true_timestamp >= 0 && true_timestamp < video_length && id !== undefined){
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
    } else if (id !== undefined) {
        player = new YT.Player('player', {
            height: '538',
            width: '956',
            videoId: id,
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    } else {
        alert("You aren't supposed to be seeing this. An error has occured. Try again by refreshing with your browser's refresh button.");
    }
}
function onPlayerReady(event) {
    if (true_timestamp >= 0){
        event.target.playVideo();
    }
}
function onPlayerStateChange(event) {
}
