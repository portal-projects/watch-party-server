<?php
if(isset($_POST['password'])) {
    $data=$_POST['password'];
    if (password_verify($data, '$2y$10$wm4gIzt.EyFvSJB85pR3peOFor0hfCq9l1K/R9.4aXpLTuGu5JtFW')) {
        if(isset($_POST['video'])) {
            $data=$_POST['video'];
            $fp = fopen('party_info/id.txt', 'w');
            fwrite($fp, $data);
            fclose($fp);
        }
        if(isset($_POST['langth'])) {
            $data=$_POST['langth'];
            $fp = fopen('party_info/video_length.txt', 'w');
            fwrite($fp, $data);
            fclose($fp);
        }
        if(isset($_POST['time'])) {
            $data=$_POST['time'];
            $fp = fopen('party_info/date.txt', 'w');
            fwrite($fp, $data);
            fclose($fp);
        }
        if(!empty($_POST['itime'])) {
            $data=$_POST['itime'];
            $fp = fopen('party_info/intermission_time.txt', 'w');
            fwrite($fp, $data);
            fclose($fp);
        } else {
            $fp = fopen('party_info/intermission_time.txt', 'w');
            fwrite($fp, '0');
            fclose($fp);
        }
        if(!empty($_POST['ilength'])) {
            $data=$_POST['ilength'];
            $fp = fopen('party_info/intermission_length.txt', 'w');
            fwrite($fp, $data);
            fclose($fp);
        } else {
            $fp = fopen('party_info/intermission_length.txt', 'w');
            fwrite($fp, '0');
            fclose($fp);
        }
        echo '<script type="text/javascript">',
        'alert("success")',
        '</script>';
    } else {
        echo '<script type="text/javascript">',
        'alert("incorrect password")',
        '</script>';
    }
}
?>
