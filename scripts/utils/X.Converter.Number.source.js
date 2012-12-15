T.cache('X.Converter.Number','K',function(e){
	var C=K.entity(e.pkg),
		code='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_@',
		numChars='零一二三四五六七八九',
		units='个十百千',
		mUnits='个万亿',
		EMPTY='',
		placeholder='~',
		groupFour=/(\d{1,4})(?=(?:\d{4})+$)/g,
		tailZero=/0+$/,
		tailZeroFun=function(m){
			return new Array(m.length+1).join(placeholder);
		},
		midZero=/0{2,}/g,
		midZeroFun=function(m){
			return '0'+new Array(m.length).join(placeholder);
		},
		toFour=function(str){
			var r=[];
			str=str.replace(tailZero,tailZeroFun).replace(midZero,midZeroFun);	
			for(var i=0,c,j=str.length-1;i<=j;i++){
				c=str.charAt(i);
				if(c==placeholder)continue;
				if(j==1&&i==0&&c=='1'){
					;
				}else{
					r.push(numChars.charAt(c));
				}
				if(i!=j&&c!='0'){
					r.push(units.charAt(j-i));
				}
			}
			return r.join(EMPTY);
		},
		chineseSplit=/[亿万]/,
		fromFour=function(str){
			var r=0;
			for(var i=0,c,n,x,j=str.length;i<=j;i++){
				c=str.charAt(i);
				n=i<j?str.charAt(i+1):EMPTY;
				x=numChars.indexOf(c);
				if(!~x){//当前是单位
					n=c;//
					x=1;
				}
				//T.log(x,c);
				if(x&&~x){//当前是数字且不为0
					if(n=='千'){
						r+=x*1000;
					}else if(n=='百'){
						r+=x*100;
					}else if(n=='十'){
						r+=x*10;
					}else{
						r+=x;
					}
					i++;
				}
			}
			return r;
		};
	C.Number={
		//任意进制的转换 x 表示str当前进制 y是要转换到的进制
		//先将任意进制的转到10进制  再把10进制转到任意进制
		xToY:function(str,x,y){
			var temp=C.Number.xToDecimal(str,x);
			return C.Number.decimalToY(temp,y);
		},
		binaryToDecimal:function(str){
			return C.Number.xToDecimal(str,2);
		},
		hexToDecimal:function(str){
			str=String(str).toLowerCase();
			return C.Number.xToDecimal(str,16);
		},
		decimalToBinary:function(num){
			return C.Number.decimalToY(num,2);
		},
		decimalToHex:function(num){
			return C.Number.decimalToY(num,16);
		},
		xToDecimal:function(str,x){
			str+='';
			if(x>code.length){
				T.error('unsupport x:'+x);
			}
			var bCode=code.substr(0,x),
				result=0,
				temp=1;
			for(var idx=str.length-1;idx>-1;idx--){
				result+=temp*(bCode.indexOf(str.charAt(idx)));
				temp*=x;
			}
			return result;
		},
		decimalToY:function(num,y){
			if(y>code.length){
				T.error('unsupport y:'+y);
			}
			var bCode=code.substr(0,y),
				result=EMPTY,
				temp;
			while(num){
				temp=num%y;
				result=bCode.charAt(temp)+result;
				num=(num-temp)/y;
			}
			return result;
		},
		toChinese:function(str){
			str=String(str);
			if(str.length>12){
				T.error('unsupport:'+str);
			}else{
				var groups=str.replace(groupFour,'$1,').split(','),
					result=[];
				for(var i=0,j=groups.length-1,temp;i<=j;i++){
					result.push(temp=toFour(groups[i]));
					if(i!=j&&temp)result.push(mUnits.charAt(j-i));
				}
				return result.join(EMPTY);
			}
		},
		fromChinese:function(str){
			str=String(str);
			var groups=str.split(chineseSplit),
				result=0;
			for(var i=0,j=groups.length-1;i<=j;i++){
				result+=fromFour(groups[i])*Math.pow(10000,j-i);
			}
			return result;
		}
	};
});