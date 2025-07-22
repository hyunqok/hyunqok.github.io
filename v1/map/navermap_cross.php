<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en_US" xml:lang="en_US">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
<title>네이버 맵 크로스 도메인</title>
<style>v\:* { behavior: url(#default#VML); }</style>
<!-- 
네이버맵 키값 받기 https://developer.naver.com/openapi/register.nhn
도메인 마다 키값 변경
-->
<!-- prevent IE6 flickering -->
<?php
switch($_SERVER['HTTP_HOST']){
	case('wjdgusrnr123.cafe24.com'):
		$KEY_CODE="831316fa310c5fbb6ad1235cd2963bea";
		break;
	case('www.universalmccann.co.kr'):
		$KEY_CODE="8a8fe46cf61af12e5832d453ea70d0dc";
		break;
	case('universalmccann.co.kr'):
		$KEY_CODE="796be6d8085b296536911a22f0d847d9";
		break;
	case('www.umww.kr');
		$KEY_CODE="4d1042611cd1ddda26a7fac0a33cdb0c";
		break;
	case('umww.kr');
		$KEY_CODE="e188de1859bde198d57ae02f77e18d7d";
		break;
}
?>
<script type="text/javascript">try {document.execCommand('BackgroundImageCache', false, true);} catch(e) {}</script>
<!-- 키값 변수로 받기 -->
<script type="text/javascript" src="http://openapi.map.naver.com/openapi/naverMap.naver?ver=2.0&key=<?=$KEY_CODE?>"></script>
</head>

<body>
<div id = "contactmap" style="width:795px;height:430px;margin:20px;display:block;"></div>
<script type="text/javascript">
	var oPoint = new nhn.api.map.LatLng(37.5025881, 127.0265744);

	nhn.api.map.setDefaultPoint('LatLng');

	oMap = new nhn.api.map.Map('contactmap', {
		point : oPoint,
		zoom : 10, // - 초기 줌 레벨은 10으로 둔다.
		enableWheelZoom : true,
		enableDragPan : true,
		enableDblClickZoom : true,
		mapMode : 0,
		activateTrafficMap : false,
		activateBicycleMap : false,
		minMaxLevel : [ 1, 14 ],
		size : new nhn.api.map.Size(795, 430)
	});

	var mapZoom = new nhn.api.map.ZoomControl(); // - 줌 컨트롤 선언
	mapZoom.setPosition({left:10, bottom:10}); // - 줌 컨트롤 위치 지정
	oMap.addControl(mapZoom); // - 줌 컨트롤 추가.

	var oSize = new nhn.api.map.Size(28, 37);
	var oOffset = new nhn.api.map.Size(14, 37);
	var oIcon = new nhn.api.map.Icon('http://static.naver.com/maps2/icons/pin_spot2.png', oSize, oOffset);

	var oMarker = new nhn.api.map.Marker(oIcon, { title : '월드짐 휘트니스 1F 코코브루니 W주차장' });  //마커를 생성한다 
	oMarker.setPoint(oPoint); //마커의 좌표를 oPoint 에 저장된 좌표로 지정한다
	oMap.addOverlay(oMarker); //마커를 네이버 지도위에 표시한다

	var oLabel = new nhn.api.map.MarkerLabel(); // 마커 라벨를 선언한다. 
	oMap.addOverlay(oLabel); // - 마커의 라벨을 지도에 추가한다. 
	oLabel.setVisible(true, oMarker); // 마커의 라벨을 보이게 설정한다.

</script>
</body>
</html>