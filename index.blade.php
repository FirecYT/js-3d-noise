<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
	<style>
		* {
			margin: 0;
			padding: 0;
		}

		html,
		body {
			width: 100vw;
			height: 100vh;
			overflow: hidden;
		}

		#info {
			position: fixed;
			background-color: #2228;
			color: #fff;
			border: 1px solid #222;
			padding: 5px;
			top: 10px;
			left: 10px;
		}

		#player {
			position: fixed;
			background-color: #2228;
			color: #fff;
			border: 1px solid #222;
			padding: 5px;
			top: 10px;
			right: 10px;
		}
	</style>
</head>

<body>
	<div id="info">
		FPS: <span id="fps"></span><br><br>
		MAP_HEIGHT: <span id="MAP_HEIGHT"></span><br>
		MAP_SIZE: <span id="MAP_SIZE"></span><br><br>
		NOISE_COUNT: <span id="NOISE_COUNT"></span><br>
	</div>
	<div id="player">
		<span id="coord"></span><br>
		<span id="nCoord"></span><br>
	</div>
	<canvas id="canvas" width="512" height="512"></canvas>
	<script src="storage/build/index.js"></script>
</body>

</html>
