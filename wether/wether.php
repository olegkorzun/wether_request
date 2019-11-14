<?php 
//parse client request
$data_client = json_encode($_POST, JSON_UNESCAPED_UNICODE);
$json_city = preg_replace("/[^a-zA-Z]/", "", $data_client);
$json_city = substr($json_city, 4);

//Read and translate to array coordinates file
$str_cities = file_get_contents('coordinates.json');
$json_cities = json_decode($str_cities, true);

//Send GET wether request 
$info = file_get_contents('https://api.darksky.net/forecast/c491f401656298ffe642aec6bfb2dc15/'.$json_cities[$json_city]);
//Sers wether to client
echo $info;

?>