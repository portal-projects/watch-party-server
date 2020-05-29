<?php

$client = new Predis\Client(['host' => 'redis']);
$data = $client->get('party_info_default');

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
echo $data;
