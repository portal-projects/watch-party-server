<?php

if (isset($_POST['password'])) {
    $party_info = [
        'id' => null,
        'video_length' => 0,
        'video_start_time' => 0,
        'intermission_time' => 0,
        'intermission_length' => 0
    ];

    $data = $_POST['password'];
    $id = null;
    if ($data === getenv('ADMIN_PASSWORD')) {
        if (isset($_POST['video'])) {
            $id = $party_info['id'] = $_POST['video'];
        }
        if (isset($_POST['langth'])) {
            $party_info['video_length'] = $_POST['langth'];
        } else {
            $api_key = getenv('YOUTUBE_API_KEY');
            $url = "https://www.googleapis.com/youtube/v3/videos?id={$id}&part=contentDetails&key={$api_key}";

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
            $party_info['video_length'] = $future->getTimeStamp() - $now->getTimestamp();
        }
        if (isset($_POST['time'])) {
            $party_info['video_start_time'] = $_POST['time'];
        }
        if (!empty($_POST['itime'])) {
            $party_info['intermission_time'] = $_POST['itime'];
        }
        if (!empty($_POST['ilength'])) {
            $party_info['intermission_length'] = $_POST['ilength'];
        }
        $fp = fopen('/app/api/party_info/data.json', 'w');
        fwrite($fp, json_encode($party_info));
        fclose($fp);
        header('Access-Control-Allow-Origin: *');
        header('Content-Type: application/json');
        echo json_encode(['status' => 'ok']);
    } else {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'error', 'error' => 'what are trying to do?']);
    }
}
