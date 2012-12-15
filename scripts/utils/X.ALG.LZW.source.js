T.cache('X.ALG.LZW',function(e){
	var ALG=K.entity(e.pkg),
		EMPTY='',
		lzw=function(s,f){
			s=String(s);
			if(!s){
				return EMPTY;
			}
			var dict = {},
				out = [],
				prefix = s.charAt(0),
				curChar=prefix,
				oldPrefix=curChar,
				idx= 256,
				i,c,d,
				g=function(){
	 				out.push(prefix.length > 1 ? String.fromCharCode(dict[prefix]) : prefix);
				};
   			if(f){
				out.push(prefix);
   			}
   			for (i=1,c,d; i<s.length; i++) {
				c=s.charAt(i);
				if(f){
					d=s.charCodeAt(i);
					prefix=d<256?c:dict[d]||(prefix+curChar);
					out.push(prefix);
					curChar=prefix.charAt(0);
					dict[idx++]=oldPrefix+curChar;
					oldPrefix=prefix;
				}else{   
					if (T.has(dict,prefix + c)) {
						prefix += c;
					}else {
						g();
						dict[prefix + c] = idx++;
						prefix=c;
					}
				}
			}
			if(!f)g();
			return out.join(EMPTY);
		};
	ALG.LZW={
		encode:function(str){
			return lzw(str);
		},
		decode:function(str){
			return lzw(str,true);
		}
	}
});