T.cache("X.ALG.LZW",function(h){h=K.entity(h.pkg);var k="";function l(b,i){b=String(b);if(!b)return k;var d={},f=[],a=b.charAt(0),g=a,m=g,n=256,e,c,j;function o(){f.push(a.length>1?String.fromCharCode(d[a]):a)}i&&f.push(a);for(e=1;e<b.length;e++){c=b.charAt(e);if(i){j=b.charCodeAt(e);a=j<256?c:d[j]||a+g;f.push(a);g=a.charAt(0);d[n++]=m+g;m=a}else if(T.has(d,a+c))a+=c;else{o();d[a+c]=n++;a=c}}i||o();return f.join(k)}h.LZW={encode:function(b){return l(b)},decode:function(b){return l(b,true)}}});
