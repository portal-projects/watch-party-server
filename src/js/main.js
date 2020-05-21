var l1 = false;
var l2 = false;
var l3 = false;
var tag = document.createElement('script');
var firstScriptTag = document.getElementsByTagName('script')[0];
var player;
var itime;
var ilength;
var video_started;
var video_length;
var isaudio;
var audiosrc;
function getHost() {
    if (location.href.split('http://localhost:8080').length === 2) {
        return ""; // local dev
    }
    if (location.href.split('http://localhost').length === 2) {
        return "http://localhost:8080/"; // local prod testing
    }
    return "https://theportal.herolfg.com/";
}
$.get(getHost() + "api/party_info", function (data) {
    itime = Number(data.intermission_time);
    ilength = Number(data.intermission_length);
    video_started = Number(data.time);
    video_length = Number(data.video_length);
    isaudio = data.type === 'mp3';
    audiosrc = data.mp3_link;
    id = data.video_id;
    l1 = l2 = l3 = true;
    load_player();
});

var true_timestamp;
var hours;
var minutes;
var seconds;
var is_intermission = false;
var intermission_time;

function load_player() {
    if (l1 === true && l2 === true && l3 === true && isaudio === false) {
        vtimestamp();
        tag.src = "https://www.youtube.com/iframe_api";
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
    if (l1 === true && l2 === true && l3 === true && isaudio === true) {
        audioready();
    }
}
function timestamp_calc() {
    var now = new Date();
    if (ilength === 0 || itime > (now.getTime() / 1000) - video_started) {
        true_timestamp = (Number(now.getTime()) / 1000 - video_started);
        is_intermission = false;
    } else if (itime <= (now.getTime() / 1000 - video_started) && itime + ilength > Math.ceil(now.getTime() / 1000 - video_started) + 0.1) {
        true_timestamp = itime;
        intermission_time = (itime + ilength) - (now.getTime() / 1000 - video_started);
        is_intermission = true;
    } else if (itime + ilength <= Math.ceil(now.getTime() / 1000 - video_started) + 0.1) {
        true_timestamp = (Number(now.getTime()) / 1000 - video_started) - ilength;
        is_intermission = false;
    }
    if (itime + ilength == Math.ceil(now.getTime() / 1000 - video_started)) {
        iend();
    }
    var HMSTime = Math.abs(true_timestamp);
    hours = Math.floor(HMSTime / 3600);
    HMSTime %= 3600;
    minutes = Math.floor(HMSTime / 60);
    seconds = HMSTime % 60;
}
function iend() {
    if (isaudio === false) {
        player.playVideo();
        player.seekTo(true_timestamp, true);
    }
    if (isaudio === true) {
        player.play();
        player.currentTime = true_timestamp;
    }
}
//YouTube Player Code Below
function vtimestamp() {
    timestamp_calc();
    if (Math.floor(true_timestamp) == -2) {
        player.playVideo();
    }
    if (is_intermission === true) {
        player.pauseVideo();
    }
    if (true_timestamp >= 0 && true_timestamp < video_length && is_intermission === false) {
        document.getElementById("friends").innerHTML = 'The party is at ' + hours + ":" + minutes.toString().padStart(2, "0") + ":" + seconds.toFixed(1).toString().padStart(4, "0") + "!";
        document.getElementById("refresh").style.display = 'block';
        document.getElementById("refresh").onclick = function () { player.playVideo(), player.seekTo(true_timestamp, true) };
    } else if (true_timestamp >= video_length) {
        document.getElementById("refresh").style.display = 'none';
        document.getElementById("friends").innerHTML = "There's no party here!<br />Go home, you rascally kids!";
    } else if (is_intermission === true) {
        document.getElementById("friends").innerHTML = "It's intermission! We're paused at " + hours + ":" + minutes.toString().padStart(2, "0") + ":" + seconds.toFixed(1).toString().padStart(4, "0") + "!" + "<br />The party resumes in " + Math.floor(intermission_time / 60).toString().padStart(2, "0") + ":" + (intermission_time % 60).toFixed(1).toString().padStart(4, "0"); //Whew! That's an eyeful!
        document.getElementById("refresh").style.display = 'none';
    } else {
        document.getElementById("friends").innerHTML = 'The watch-party starts in ' + hours + ":" + minutes.toString().padStart(2, "0") + ":" + seconds.toFixed(1).toString().padStart(4, "0") + "!";
        document.getElementById("refresh").style.display = 'none';
    }
}
function onYouTubeIframeAPIReady() {
    timestamp_calc();
    if (true_timestamp >= 0 && true_timestamp < video_length && is_intermission === false) {
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
    setInterval(vtimestamp, 100);
    if (true_timestamp >= 0 && is_intermission === false) {
        event.target.playVideo();
    }
}
function onPlayerStateChange(event) {
}
//End of YouTube Player Code
//Audio Player Code Below
function atimestamp() {
    timestamp_calc();
    if (Math.round(true_timestamp) == 0) {
        player.play();
    }
    if (is_intermission === true) {
        player.pause();
    }
    if (true_timestamp >= 0 && true_timestamp < video_length && is_intermission === false) {
        document.getElementById("friends").innerHTML = 'The party is at ' + hours + ":" + minutes.toString().padStart(2, "0") + ":" + seconds.toFixed(1).toString().padStart(4, "0") + "!";
        document.getElementById("refresh").style.display = 'block';
        document.getElementById("refresh").onclick = function () { player.play(), player.currentTime = true_timestamp };
        player.controls = true;
    } else if (true_timestamp >= video_length) {
        document.getElementById("refresh").style.display = 'none';
        document.getElementById("friends").innerHTML = "There's no party here!<br />Go home, you rascally kids!";
    } else if (is_intermission === true) {
        document.getElementById("friends").innerHTML = "It's intermission! We're paused at " + hours + ":" + minutes.toString().padStart(2, "0") + ":" + seconds.toFixed(1).toString().padStart(4, "0") + "!" + "<br />The party resumes in " + Math.floor(intermission_time / 60).toString().padStart(2, "0") + ":" + (intermission_time % 60).toFixed(1).toString().padStart(4, "0"); //Whew! That's an eyeful!
        document.getElementById("refresh").style.display = 'none';
        player.controls = false;
    } else {
        document.getElementById("friends").innerHTML = 'The listen-party starts in ' + hours + ":" + minutes.toString().padStart(2, "0") + ":" + seconds.toFixed(1).toString().padStart(4, "0") + "!";
        document.getElementById("refresh").style.display = 'none';
        player.controls = false;
    }
}
function audioready() {
    timestamp_calc();
    console.log(true_timestamp, video_length, is_intermission);
    if (true_timestamp >= 0 && true_timestamp < video_length && is_intermission === false) {
        player = document.createElement("AUDIO");
        player.src = audiosrc + "#t=" + (true_timestamp + 3);
        player.controls = true;
        document.getElementById("player").appendChild(player);
        player.play();
    } else if (true_timestamp >= video_length) {
        player = null;
    } else {
        player = document.createElement("AUDIO");
        player.src = audiosrc;
        document.getElementById("player").appendChild(player);
    }
    setInterval(atimestamp, 100);
}