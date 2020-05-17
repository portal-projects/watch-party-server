<?php

$filename = '/app/api/party_info/data.json';
$fp = fopen($filename, 'r');
$data = fread($fp, filesize($filename));
fclose($fp);

header('Content-Type: application/json');
echo $data;