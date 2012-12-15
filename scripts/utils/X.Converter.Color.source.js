T.cache('X.Converter.Color','K,X.Converter.Number',function(e){
	/*
		Color构造类可方便的在16进制和rgba之间进行转换
		静态方法也可以直接使用
	*/
	var C=K.entity(e.pkg),
		N=K.entity(e.dps[1],true),
		rgbaReg=/^rgba?\s*\((\d+),\s*(\d+),\s*(\d+),?\s*(\d*)\)$/,
		hexReg=/^#([\da-f]{1,2})([\da-f]{1,2})([\da-f]{1,2})([\da-f]{1,2})?$/i;
	C.Color=K.clazz({
		getHex:function(){

		},
		getRGBA:function(){

		},
		syncByHex:function(){

		},
		syncByRGB:function(){

		},
		syncByRGBA:function(){

		},
		getRGB:function(){

		}
	});
	K.mix(C.Color,{
		fromHex:function(str){
			if(hexReg.test(str)){
				var temp=hexReg.exec(str),
					r=N.hexToDecimal(temp[1]),
					g=N.hexToDecimal(temp[2]),
					b=N.hexToDecimal(temp[3]),
					a=N.hexToDecimal(temp[4]);
				return{
					R:r,
					G:g,
					B:b,
					A:a
				};
			}else{
				T.error('fromHex unsupport:'+str);
			}
		},
		fromRGBA:function(str){
			if(rgbaReg.test(str)){
				var temp=rgbaReg.exec(str),
					r=1*temp[1],
					g=1*temp[2],
					b=1*temp[3],
					a=1*temp[4];
				return{
					R:r,
					G:g,
					B:b,
					A:a
				};
			}else{
				T.error('fromRGBA->unsupport '+str);
			}
		},
		fromRGB:function(str){
			var temp=C.Color.fromRGBA(str);
			delete temp.A;
			return temp;
		},
		rgbToHex:function(str){
			var temp;
			if(K.isObj(str)){
				temp=str;
			}else{
				temp=C.Color.fromRGB(str);
			}
			var r='00'+N.decimalToHex(temp.R),
				g='00'+N.decimalToHex(temp.G),
				b='00'+N.decimalToHex(temp.B);
			return ['#',r.slice(-2),g.slice(-2),b.slice(-2)].join('');
		},
		rgbaToHex:function(str){
			var temp;
			if(K.isObj(str)){
				temp=str;
			}else{
				temp=C.Color.fromRGB(str);
			}
			var	r='00'+N.decimalToHex(temp.R),
				g='00'+N.decimalToHex(temp.G),
				b='00'+N.decimalToHex(temp.B);
				a='00'+N.decimalToHex(temp.A);
			return ['#',r.slice(-2),g.slice(-2),b.slice(-2),a.slice(-2)].join('');
		},
		hexToRGB:function(str){
			var temp=C.Color.fromHex(str);
			return ['rgb('+temp.R,temp.G,temp.B+')'].join(',');
		},
		hexToRGBA:function(str){
			var temp=C.Color.fromHex(str);
			return ['rgb('+temp.R,temp.G,temp.B,temp.A+')'].join(',');
		}
	});
});