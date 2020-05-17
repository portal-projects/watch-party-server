function isthereani() {
    var isintermission = document.getElementById("intermission");
    var lengthbox = document.getElementById("ilength");
    var lengthlabel = document.getElementById("il1");
    var timebox = document.getElementById("itime");
    var timelabel = document.getElementById("il2");
    if (isintermission.checked === true){
        lengthbox.style.display = "block";
        timebox.style.display = "block";
        lengthlabel.style.display = "block";
        timelabel.style.display = "block";
    } else {
        lengthbox.value = lengthbox.defaultValue;
        timebox.value = timebox.defaultValue;
        lengthbox.style.display = "none";
        timebox.style.display = "none";
        lengthlabel.style.display = "none";
        timelabel.style.display = "none";
    }
}