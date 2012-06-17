var iNavgator = (function() {
	if(navigator.appName.indexOf('Microsoft') != -1)//ie
		return 'IE';
	else if(window.navigator.userAgent.indexOf("Firefox") != -1)//ff
		return 'FireFox';
	else if(window.navigator.userAgent.indexOf("Chrome") != -1)//chrome
		return 'chrome';
	else if(window.navigator.userAgent.indexOf("Safari") != -1)//safari
		return 'safari';
	else if(window.navigator.userAgent.indexOf("Opera") != -1)//opera
		return 'opera';
})(); (function() {
	window.iNavType = iNavgator;
	var wrap = document.getElementById('ign_wrap');
	var list = wrap.children, orginTop = [];
	var page = document.getElementById('ignous'), p_top = 0;
	for(var i = 0; i < list.length; i++) {
		orginTop.push(list[i].offsetTop);
	}

	var fa = false, faIE, faType, faIn;
	if(iNavType == 'IE') {
		faIE = 1;
		faType = 'style.filter:alpha(opacity={value})';
	} else {
		faIE = 0.01;
		faType = 'style.opacity';
	}

	
	var faTime = false;

	var Locker={};
	var getFX=function(key){
		key='_fx'+key;
		if(!Locker[key])Locker[key]=new K.FX();
		return Locker[key];
	};
	var scroll = function() {
		var startTime=new Date().getTime();
		//console.time('scroll');
		if(faTime) {clearTimeout(faTime);
		}
		var _s_top = document.documentElement.scrollTop || document.body.scrollTop, _w_height = document.documentElement.clientHeight || document.body.clientHeight
		for(var i = 2; i < list.length - 1; i++) {
			var _d = list[i].children[0];
			//if(orginTop[i] < _s_top + 80) {
				_d.style.position = 'absolute';
				var dfx=getFX(i);
				var dtop=parseInt(K.nodeStyle(_d,'top'))||0;
				dfx.stop();
				(function(t,i,d){
					console.log(t,(_s_top + 80 - orginTop[i]) / 2 + orginTop[i])
					dfx.run(120,function(e){
						K.nodeStyle(d,{top:e(t,(_s_top + 80 - orginTop[i]) / 2 + orginTop[i])+'px'})
					});
				})(dtop,i,_d);
				//_d.style.top = (_s_top + 80 - orginTop[i]) / 2 + orginTop[i] + 'px';
			//} else {
				//getFX(i).stop();
				//_d.style.position = 'relative';
				//_d.style.top = '0px';
			//}
		}
		var _d0 = list[0].children[0];
		_d0.style.position = 'absolute';
		//_d0.style.top=_s_top/8+'px';
		//return;
		var d0fx=getFX(0),
			d0Top=parseInt(K.nodeStyle(_d0,'top'))||0;
		d0fx.stop();
		d0fx.run(200,function(e){
			K.nodeStyle(_d0,{top:e(d0Top,_s_top / 2 + orginTop[0])+'px'})
		})
		//_d0.style.top = _s_top / 2 + orginTop[0] + 'px';
		//_d0.style.top=_s_top+'px';
		console.log('scroll:'+(new Date().getTime()-startTime));
		//return ;
		var _d1 = list[1].children[0];
		if(_s_top > 300&&!Locker.setTop) {
			delete Locker.setFixedTop;
			console.log('settop');
			_d1.style.position = 'absolute';
			Locker.setTop=true;
			var top=parseInt(K.nodeStyle(_d1,'top'))||0,
				fx=getFX(1);
			fx.stop();
			fx.run(120,function(e){
				K.nodeStyle(_d1,{top:e(top,_s_top/2+186)+'px'});
			})
			//_d1.style.top = (_s_top) / 2 + 186 + 'px';
		} else if(!Locker.setFixedTop&&_s_top<=300){
			console.log('set fixed top')
			delete Locker.setTop;
			Locker.setFixedTop=true;
			_d1.style.position = 'absolute';
			//_d1.style.top = '336px';
			var d1top=parseInt(K.nodeStyle(_d1,'top'))||0,
				d1fx=getFX(1);
			console.log(d1top);
			d1fx.stop();
			d1fx.run(120,function(e){
				K.nodeStyle(_d1,{top:e(d1top,336)+'px'});
			})
		}

	};
	scroll();
	var timer;
	window.onscroll =function(){
		K.stopTimer(timer);
		timer=K.startTimer(scroll,100)
	};
})();
