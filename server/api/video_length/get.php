<?php

$client = new Predis\Client(['host' => 'redis']);
$data = [];

if (!empty($_GET['video_id'])) {
    $api_key = getenv('YOUTUBE_API_KEY');
    $id = $_GET['video_id'];
    $data = $client->get("length_{$id}");
    if (empty($data)) {
        $url = "https://www.googleapis.com/youtube/v3/videos?id={$id}&part=contentDetails&key={$api_key}";

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HTTPGET, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
            'Accept: application/json'
        ));
        $data = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        $client->set("length_{$id}", $data);
    }
}

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
echo $data;
