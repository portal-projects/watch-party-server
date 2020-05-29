<?php

if (isset($_POST['password'])) {
    $party_info = [
        'type' => null,
        'video_id' => null,
        'mp3_link' => null,
		'info_url' => null,
		'live' => null,
        'length' => 0,
        'time' => 0,
        'intermission_time' => 0,
        'intermission_length' => 0,
        'length' => 0
    ];

    $id = null;
    if ($_POST['password'] === getenv('ADMIN_PASSWORD')) {
        foreach ($party_info as $key => $value) {
            if (isset($_POST[$key])) {
                $party_info[$key] = $_POST[$key];
            }
        }

        if ($party_info['type'] === 'youtube') {
            $api_key = getenv('YOUTUBE_API_KEY');
            $id = $party_info['video_id'];
            $url = "https://www.googleapis.com/youtube/v3/videos?id={$id}&part=contentDetails&key={$api_key}";

	    	$party_info['info_url'] = "https://www.googleapis.com/youtube/v3/videos?id={$id}&part=contentDetails&key={$api_key}"; //This part needs to be private, in a different php file.

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
            $party_info['length'] = $future->getTimeStamp() - $now->getTimestamp();
        }

        $client = new Predis\Client(['host' => 'redis']);
        $client->set('party_info_default', json_encode($party_info));
        header('Access-Control-Allow-Origin: *');
        header('Content-Type: application/json');
        echo json_encode(['status' => 'ok']);
    } else {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'error', 'error' => 'what are trying to do?']);
    }
}
