window.onload = function(){
	canvas_init();
};
function canvas_init(){
	// shim layer with setTimeout fallback
	window.requestAnimFrame = (function(){
	    return  window.requestAnimationFrame       || 
	        window.webkitRequestAnimationFrame || 
	        window.mozRequestAnimationFrame    || 
	        window.oRequestAnimationFrame      || 
	        window.msRequestAnimationFrame     || 
	        function(/* function */ callback, /* DOMElement */ element){
	            return window.setTimeout(callback, 1000 / 60);
	        };
	})();
	window.cancelRequestAnimFrame = ( function() {
	    return window.cancelAnimationFrame            ||
	        window.webkitCancelRequestAnimationFrame    ||
	        window.mozCancelRequestAnimationFrame         ||
	        window.oCancelRequestAnimationFrame        ||
	        window.msCancelRequestAnimationFrame        ||
	        clearTimeout
	} )();

	// 定义控制器以及初始的资源
	var request;
	var grayFishSouce = new Image();
	var blueFishSouce = new Image();
	grayFishSouce.src = 'assets/images/gray-fish.png';
	blueFishSouce.src = 'assets/images/blue-fish.png';

	// 确定灰色鱼的数量
	var fish = new Array(20);  // 定义随机生成的鱼的数量
	var canvas = document.getElementById('myCanvas');
	// 定义配置文件
	var config = {
		'ctx': canvas.getContext("2d"),
		'canvas_width': canvas.width,
		'canvas_height': canvas.height,
		'speed': 0.8
	};

	// 分别定义蓝色鱼的大小以及灰色鱼的三种大小
	var blueFish = {
		'w': 80,
		'h': 53,
		'x': Math.floor(Math.random()*config.canvas_width+1),
		'y': config.canvas_height - 100
	}

	// 灰色的鱼总共有三种类型L M S 
	var grayFish = {
		'w': [70,50,30],
		'h': [44,30,20],
		'alpha': [1,0.6,0.3],
		'speed': [1.5,1,0.5]
	}

	// 配置好鱼的属性
	for (var i = 0; i < fish.length; i++) {
		fish[i] = {
			speed: Math.floor(Math.random()*3+1), // 速度是 1 到 10 内的随机生成
			size: Math.floor(Math.random()*3),    // 这里是生成 0 到 2 内的随机数，也就是大鱼 中鱼 小鱼
			x: Math.floor(Math.random()*config.canvas_width+1),   // 动态的生成初始化时的坐标
			y: Math.floor(Math.random()*(config.canvas_height/2)+(config.canvas_height/2)),
		};
	};

	(function animloop(){
	    draw(config,blueFish,grayFish,blueFishSouce,grayFishSouce,fish);
	    request = requestAnimFrame(animloop, document.getElementsByTagName('body'));
	})();
}
// 渲染器
function draw(config,blueFish,grayFish,blueFishSouce,grayFishSouce,fish){
	config.ctx.globalCompositeOperation = 'destination-over';
	config.ctx.clearRect(0,0,config.canvas_width,config.canvas_height); // 清除画布
	config.ctx.globalAlpha = 1;
	config.ctx.drawImage(blueFishSouce,blueFish.x,blueFish.y,blueFish.w,blueFish.h);  // 画那条蓝色的鱼
	blueFish.x = blueFish.x - 1.8 * config.speed;  // 定义好方向  - 号为从右向左
	if(blueFish.x < 0 - blueFish.w) {
		blueFish.x = config.canvas_width + 100;  // 如果跑出边界则复位
	}
	
	// 画随机的灰色的鱼
	for (var i = 0; i < fish.length; i++) {
		config.ctx.globalAlpha = grayFish.alpha[fish[i].size];
		config.ctx.drawImage(grayFishSouce, fish[i].x, fish[i].y, grayFish.w[fish[i].size], grayFish.h[fish[i].size]);  
		
		fish[i].x = fish[i].x + grayFish.speed[fish[i].size] * config.speed;  // 定义好方向  - 号为从右向左
		
		if(fish[i].x > config.canvas_width) {
			fish[i].x = 0 - grayFish.w[fish[i].size]; // 如果跑出边界则复位
		}
		// console.log(config.canvas_width);
	};
}


// If you want stop the animation , use this code
// cancelRequestAnimFrame to stop the loop in 1sec
// setTimeout(function(){
//     console.log("1sec expired doing cancelRequestAnimFrame() now")
//     cancelRequestAnimFrame(request);                
// }, 1*1000);
