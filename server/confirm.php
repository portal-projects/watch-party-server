<?php

if (isset($_POST['password'])) {
    $data = $_POST['password'];
    $video_id = null;
    if ($data === getenv('ADMIN_PASSWORD')) {
        if (isset($_POST['video'])) {
            $video_id = $data = $_POST['video'];
            $fp = fopen('party_info/id.txt', 'w');
            fwrite($fp, $data);
            fclose($fp);
        }
        if (isset($_POST['langth'])) {
            $data = $_POST['langth'];
            $fp = fopen('party_info/video_length.txt', 'w');
            fwrite($fp, $data);
            fclose($fp);
        } else {
            $api_key = getenv('YOUTUBE_API_KEY');
            $url = "https://www.googleapis.com/youtube/v3/videos?id={$video_id}&part=contentDetails&key={$api_key}";

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_HTTPGET, true);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                'Content-Type: application/json',
                'Accept: application/json'
            ));
            $result = curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);

            $response = json_decode($result, true);
            $video_length = $response['items'][0]['contentDetails']['duration'];
            $future = new DateTime();
            $future->add(new DateInterval($video_length));
            $now = new DateTime();
            $fp = fopen('party_info/video_length.txt', 'w');
            fwrite($fp, $future->getTimeStamp() - $now->getTimestamp());
            fclose($fp);
        }
        if (isset($_POST['time'])) {
            $data = $_POST['time'];
            $fp = fopen('party_info/date.txt', 'w');
            fwrite($fp, $data);
            fclose($fp);
        }
        if (!empty($_POST['itime'])) {
            $data = $_POST['itime'];
            $fp = fopen('party_info/intermission_time.txt', 'w');
            fwrite($fp, $data);
            fclose($fp);
        } else {
            $fp = fopen('party_info/intermission_time.txt', 'w');
            fwrite($fp, '0');
            fclose($fp);
        }
        if (!empty($_POST['ilength'])) {
            $data = $_POST['ilength'];
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
