<?php

	header("Content-Type: text/html; charset=UTF-8");

	$client_id = "lm2DIu7YoEBlnhAHbMkB";
	$client_secret = "6nliTcTWbm";

	$category = urlencode($_POST['category']);
	$encText = urlencode($_POST['keyword']);
	$displayCount = urlencode($_POST['displayCount']);

	$url = "https://openapi.naver.com/v1/search/".$category.".json?query=".$encText."&display=".$displayCount; // json 결과
//  $url = "https://openapi.naver.com/v1/search/blog.xml?query=".$encText; // xml 결과
	$is_post = false;
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_POST, $is_post);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$headers = array();
	$headers[] = "X-Naver-Client-Id: ".$client_id;
	$headers[] = "X-Naver-Client-Secret: ".$client_secret;
	curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
	$response = curl_exec ($ch);
	$status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
	//echo "status_code:".$status_code."";
	curl_close ($ch);

	/*if($status_code == 200) {
		echo $response;
	} else {
		echo "Error 내용:".$response;
	}*/

	$result = $response;
	echo $result;
?>