T.cache('X.JSON','K',function(e){
	var W=window,
		H=K.entity(e.pkg);
	if(W.JSON){
		H.JSON={
			parse:function(str){
				return W.JSON.parse(str);
			},
			stringify:function(o){
				return W.JSON.stringify(o);
			}
		};
		T.log('native JSON');
	}else{
		var metaChars={
				"\b":"\\b",
				"\t":"\\t",
				"\n":"\\n",
				"\f":"\\f",
				"\r":"\\r",
				'"':'\\"',
				"\\":"\\\\"
			},
			formatString=function(str){
				if(/["\\\x00-\x1f]/.test(str)){
					str=str.replace(/["\\\x00-\x1f]/g,function(match){
						var temp=metaChars[match];
						if(temp){
							return temp;
						}
						temp=match.charCodeAt();
						return "\\u00"+Math.floor(temp/16).toString(16)+(temp%16).toString(16)
					});
				}
				return '"'+str+'"';
			},
			serArr=function(arr){
				var result=["["],flag;
				for(var i=0,one;i<arr.length;i++){
					one=arr[i];
					switch(typeof one){
						case "undefined":
						case "function":
						case "unknown":
							break;
						default:
							if(flag)result.push(',');
							result.push(H.JSON.stringify(one));
							flag=1;
					}
				}
				result.push(']');
				return result.join('');
			},
			pad=function(s){
				return s<10?'0'+s:s;
			},
			serDate=function(date){
				return '"'+date.getUTCFullYear()+'-'
						+pad(date.getUTCMonth()+1)+'-'
						+pad(date.getUTCDate())+'T'
						+pad(date.getUTCHours())+':'
						+pad(date.getUTCMinutes())+':'
						+pad(date.getUTCSeconds())+'Z"'
			},
			serObject=function(obj){
				var result=['{'],temp,flag;
				for(var p in obj){
					if(T.has(obj,p)){
						temp=obj[p];
						switch(typeof temp){
						case "undefined":
						case "function":
						case "unknown":
							break;
						default:
							if(flag)result.push(',');
							result.push(H.JSON.stringify(p)+':'+H.JSON.stringify(temp));
							flag=1;
					}
					}
				}
				result.push('}');
				return result.join('');
			};
		H.JSON={
			parse:function(str){
				try{
					return Function('return '+str)();
				}catch(e){
					T.log(e);
					return e.message;
				}
			},
			stringify:function(obj){
				switch(typeof obj){
					case "undefined":
						return "undefined";
					case "number":
						return W.isFinite(obj)?String(obj):"null";
					case "string":
						return formatString(obj);
					case "boolean":
						return String(obj);
					default:
						if(obj==null){
							return 'null';
						}else if(K.isArr(obj)){
							return serArr(obj);
						}else if(K.type(obj)=='date'){
							return serDate(obj);
						}else{
							return serObject(obj);
						}
				}
			}
		}
	}
});