T.cache("X.ALG.Reducer.Douglas","K",function(i){i=K.entity(i.pkg);function l(a,c,b){b=Math.abs(0.5*(a.x*c.y+c.x*b.y+b.x*a.y-c.x*a.y-b.x*c.y-a.x*b.y));a=Math.sqrt(Math.pow(a.x-c.x,2)+Math.pow(a.y-c.y,2));return a=b/a*2}function j(a,c,b,e,d){for(var g=0,f=0,h=c,k;h<b;h++){k=l(a[c],a[b],a[h]);if(k>g){g=k;f=h}}if(g>e&&f!=0){d.push(f);j(a,c,f,e,d);j(a,f,b,e,d)}}i.Douglas={reduce:function(a,c){if(!K.isArr(a)||!a.length)return[];if(a.length<3)return a;var b=0,e=a.length-1,d=[];d.push(b);for(d.push(e);a[b]==
a[e];)e--;j(a,b,e,c,d);c=[];d.sort(function(g,f){return g-f});for(b=0;b<d.length;b++)c.push(a[d[b]]);return c}}});
