<!doctype html>
<html lang="ko">
<head>
<title> new document </title>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="robots" content="follow">
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=2, user-scalable=no">
<meta name="author" content="제작자정보">
<meta name="copyright" content="저작권정보">
<meta name="keywords" content="키워드1,키워드2,키워드3,키워드4">
<meta name="description" content="페이지요약">

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<style type="text/css">
	input[readonly] {background-color: #eee;}
</style>
</head>

<body>

<div>
	<label for="apiSearch">검색: </label><input type="text" name="apiSearch" id="apiSearch" size="50" placeholder="키워드 입력">
</div>

<script>
$('[name="apiSearch"]').on('keydown', function(e){
	console.log(e.keyCode);
	if(e.keyCode == '13'){
		var keyword = $(this).val();
		callNaverApi("blog", keyword, 10);
	}
});

function callNaverApi(apiCategory, keywordText, count){
	$('#apiSearch').attr('readonly', true);
	$.ajax({
		type: "POST",
		url : "naverNewsApi.php",
		data : {category : apiCategory, keyword : keywordText, displayCount : count},
		dataType : 'json'
	}).done(function( data ) {
		// console.log(data);

		var newsList = "";
		newsList += "<ul>";
		for (var i=0; i<data.items.length; i++) {
			newsList += '<li><a href='+data.items[i].link+' target="_blank">'+data.items[i].title+'</a></li>';
		}
		newsList += "</ul>";
		$('body').append(newsList);

		$('#apiSearch').attr('readonly', false);

	}).fail(function() {
		alert( "error" );
	});
}

</script>
</body>
</html>