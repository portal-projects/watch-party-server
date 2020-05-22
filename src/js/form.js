function isthereani() {
    var isintermission = document.getElementById("intermission");
    var lengthbox = document.getElementById("ilength");
    var lengthlabel = document.getElementById("il1");
    var timebox = document.getElementById("itime");
    var timelabel = document.getElementById("il2");
    if (isintermission.checked === true) {
        lengthbox.type = "text";
        timebox.type = "text";
        lengthlabel.style.display = "block";
        timelabel.style.display = "block";
    } else {
        lengthbox.value = lengthbox.defaultValue;
        timebox.value = timebox.defaultValue;
        lengthbox.type = "hidden";
        timebox.type = "hidden";
        lengthlabel.style.display = "none";
        timelabel.style.display = "none";
    }
}
function audioorvideo() {
    var isyoutube = document.getElementById("youtube");
    var isaudio = document.getElementById("audio");
    var vidID = document.getElementById("video");
    var audiosrc = document.getElementById("afile");
    var idlabel = document.getElementById("idl");
    var alabel = document.getElementById("al");
    if (isyoutube.checked === true) {
        vidID.type = "text";
        audiosrc.type = "hidden";
        idlabel.style.display = "block";
        alabel.style.display = "none";
    }
    if (isaudio.checked === true) {
        vidID.type = "hidden";
        audiosrc.type = "text";
        idlabel.style.display = "none";
        alabel.style.display = "block";
        player = document.getElementById('audio-file-player');
        if (!player) {
            player = document.createElement("audio");
            player.id = 'audio-file-player';
        }
        player.src = audiosrc.value;
        document.body.appendChild(player);
    }
}