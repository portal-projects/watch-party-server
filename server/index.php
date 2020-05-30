<?php

require_once('../../../../app/vendor/autoload.php');

$request = $_SERVER['REQUEST_URI'];
$params = explode('/', explode('?', $request)[0]);
$route = $params[2];
$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($route === 'party_info') {
        if ($method === 'GET') {
            require_once('./api/party_info/get.php');
        }
        if ($method === 'POST') {
            require_once('./api/party_info/post.php');
        }
    }
    if ($route === 'video_length') {
        if ($method === 'GET') {
            require_once('./api/video_length/get.php');
        }
    }
} catch (Exception $e) {
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    echo json_encode(['status' => 'error', 'error' => $e->getMessage()]);
}
