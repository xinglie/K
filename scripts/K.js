T.cache("K",[],function(){var j="",C,m=window,k="length",L="object",H,R=m.document,ia=RegExp,M="head",u,aa=["mousemove","touchmove"],S=["mouseup","touchend"],e,x;function p(a){return(a+j).toLowerCase()}var U="value",q="prototype",D=Object[q].hasOwnProperty,o=null;function V(a,b,c,d,f,g){f=N.call(arguments,4);a=l(a)?a:r;d=d||e;b=b||8;g=function(){a.apply(d,f)};return c?m.setInterval(g,b):m.setTimeout(g,b)}function W(a){m.clearTimeout(a);m.clearInterval(a)}var n=true,v=false,X="_$_",O;function P(a,
b,c){if(L==typeof b||l(b)){for(c=a[k]-2;c>=0;c-=2)if(a[c]==b)return a[c+1];a.push(b,b=e.clone(b,a))}return b}var ba,ca,Y,ra=/^[\s\xa0\u3000\uFEFF]+|[\s\xa0\u3000\uFEFF]+$/g;function ja(a,b){if(a=e.evt(a)){b=e.evtPageXY(a);ka&&la(I,a,b.x-da.x,b.y-da.y,b)}}function E(a,b){b=(a=e.evt(a))&&a.touches||[];if(!b[k]){e.un(Y,"blur",E).un(y,aa,ja).un(y,S,E).un(I,"losecapture",E).un(y,"keydown",ea);S.f&&I.releaseCapture();l(fa)&&fa(I,a);H=Y=y=I=o}}var J=Date.now||function(){return(new Date).valueOf()};function sa(a,
b,c,d){return c*a/d+b}var da,ka,la,fa,I,ga=!!m.getComputedStyle,y;function ea(a,b){e.evtPrevent(a,b);e.evtCancel(a,b)}function K(a,b,c){a=a||R;b=a.documentElement;c=a.body;x=a.compatMode=="CSS1Compat"?b:c;return{scrollX:b.scrollLeft||c.scrollLeft,scrollY:b.scrollTop||c.scrollTop,left:x.clientLeft,top:x.clientTop}}var ta=J(),ma=(ga?"css":"style")+"Float",na,oa;function A(a,b){return(b=typeof a)==L?a==o&&o+j||p(ua.call(a).slice(8,-1)):b}function s(a,b,c,d,f,g){g=l(c);a||(a=F(b)?[]:{});for(f in b)if(d=
g?c(b[f],f,a):n)a[f]=b[f];return a}function pa(){}var qa=m.XMLHttpRequest,ua=Object[q].toString,N=Array[q].slice;function l(a){return A(a)==va}function F(a){return A(a)==wa}function w(a){return a&&a[k]>=0&&!e.isStr(a)&&!l(a)&&!a.nodeType&&!a.window&&!a.callee}function r(){}var G="on",ha={},va=A(p),wa=A(aa),xa=A(q);function B(){var a=m.console,b=arguments;if(a&&a.log)a.log.apply?a.log.apply(a,b):a.log(N.call(b))}var ya;function Z(a){a=this;a.i=e.guid()}function $(){try{this.z=qa?new qa:new m.ActiveXObject("Microsoft.XMLHTTP")}catch(a){}}
Z.S=/(?:4|d|te)$/;Z[q]={a:function(a){a=this;e.XHR[a.i]=r;a.l()},c:function(a){this.t=a},p:function(){return n},l:function(a){a=this;C.un(a._);e.nodeDel(a.n)},r:function(a,b,c,d,f,g,h,i){c=this;d=e(c.i);f=c.t;g=R.documentElement;if(!d){d=e("script",{type:"text/javascript",defer:"defer",id:c.i,charset:f.charset});d.async=n}c.n=d;i={type:"JSONP"};c._=function(){if(!h&&Z.S.test(d.readyState)){b(v,i,"not call "+f.jsonp);c.l()}};if(d.readyState)C.on(c._);else d.onload=d.onerror=c._;e.XHR[c.i]=function(t){c.l();
i.data=t;b(n,i);h=n;delete e.XHR[c.i]};d.src=[f.url,~f.url.indexOf("?")?"&":"?",f.jsonp,"=K.XHR.",c.i].join(j);g.insertBefore(d,g.firstChild)}};$.S=/^(?:2\d{2}|304|1223|0)$/;$[q]={a:function(a){a=this;a.z&&a.z.abort();C.un(a._)},c:function(a){this.t=a},p:function(){return this.z},r:function(a,b,c,d,f){c=this;f=c.t;c.z.open(f.method,f.url,f.async,f.un,f.pw);for(d in f[M])D.call(f[M],d)&&c.z.setRequestHeader(d,f[M][d]);c.z.send(a);C.on(c._=function(g){if(c.z.readyState==4){g=c.z.status;C.un(c._);b($.S.test(g),
{type:"XHR",text:c.z.responseText},g)}})}};e=function(a,b,c,d){if(typeof a!=L)a=(d||R)[b||c?"createElement":"getElementById"](a);b&&e.nodeAttr(a,b);c&&e.nodeStyle(a,c);return a};s(e,{fn:r,type:A,mix:s,stopDrag:E,now:J,evtHalt:ea,log:B,isArr:F,isFn:l,startTimer:V,stopTimer:W,strTrim:function(a,b){return(a+j).replace(b||ra,j)},strSize:function(a){return(a+j).replace(/[^\x00-\xff]/g,G)[k]},strCode:function(a,b){return m[(b?"de":"en")+"codeURIComponent"](a+j)},strFormat:function(a,b,c){a+=j;c=e.isObj(b)?
b:N.call(arguments,1);return a=a.replace(/{(\w+)}/g,function(d,f){return c[f]})},strHTML:function(a,b,c,d){c=b?[/&lt;/g,/&gt;/g,/&quot;/g,/&amp;/g]:[/&/g,/"/g,/</g,/>/g];d=b?["<",">",'"',"&"]:["&amp;","&quot;","&lt;","&gt;"];for(a+=j;c.length;)a=a.replace(c.shift(),d.shift());return a},logTime:function(a){if(D.call(p,a)){B(a+":"+(J()-p[a])+"ms");delete p[a]}else p[a]=J()},isInsof:function(a,b,c){try{c=a instanceof b}catch(d){}return c},isUndef:function(a){return a===ya},isObj:function(a){return A(a)==
L},isStr:function(a){return A(a)==xa},guid:function(a){return(a||"K")+(ta++).toString(32)},clone:function(a,b,c,d){b||(b=[]);if(!a||!l(a)&&typeof a!=L)return a;else if(a[d="cloneNode"])return a[d](n);else c=l(a)?(new Function("return "+a))():(d=a.constructor,c=new d(a.valueOf()),a==c)?new d:c;b.push(a,c);for(d in a)if(D.call(a,d))c[d]=P(b,a[d]);return c},clear:function(a){a=a||m;if(a=a.getSelection)a().removeAllRanges();else if(a=a.document.selection)a.empty&&a.empty()},bind:function(a,b,c){c=N.call(arguments,
2);a=l(a)?a:r;return function(){return a.apply(b||e,c.concat(N.call(arguments)))}},body:function(a,b){b=K(a);return s({pageWidth:x.scrollWidth,pageHeight:Math.max(x.scrollHeight,x.clientHeight),viewWidth:x.clientWidth,viewHeight:x.clientHeight},b)},clazz:function(a,b,c,d,f){c=function(){var g=this,h,i=arguments,t=i.callee[q];for(h in t)l(t[h])||(g[h]=e.clone(t[h]));return g.ctor.apply(g,i)};d=l(a)?(f=pa[q]=a[q],new pa):s({},f=a);if(l(b))b=b(f,d,c,a);b&&s(d,b);d.ctor=d.ctor||r;d.constructor=c;c[q]=
d;return c},entity:function(a,b,c,d,f){c=c||m;a=(a+j).split(".");for(d=0;d<a[k];d++){f=a[d];if(!D.call(c,f)){if(b){c=o;break}c[f]={}}c=c[f]}return c},tags:function(a,b,c,d,f,g,h,i,t,Q){f=e(b)||R;d=[];if(f.getElementsByTagName){a=F(a)?a:[a];h=-1;t=l(c);a:for(;a[++h];){g=f.getElementsByTagName(a[h]);for(i=-1;g[++i];)try{Q=t?c(g[i]):n;if(Q===v)break a;Q&&d.push(g[i])}catch(za){B(za,c,g[i])}}}return d},Evt:{fire:function(a,b,c,d,f,g){d=this;a=p(a);b||(b={});b.sender=d;b.type=a;if(F(f=d[f=X+a]))for(g=
0;f[g];g++)try{if(f[g](b,d)===v)break}catch(h){B(h,f[g])}try{l(d[f=G+a])&&d[f](b,d)}catch(i){B(i,d[f])}c&&d.off(a)},on:function(a,b,c,d){c=this;for(a=e.isArr(a)?a:[a];a[k];){d=p(a.pop());(c[d=X+d]||(c[d]=[])).push(b)}return c},un:function(a,b){for(a=e.isArr(a)?a:[a];a[k];)e.arrRemove(this[X+p(a.pop())],b);return this},off:function(a,b){b=this;a=p(a);delete b[X+a];delete b[G+a]}}});s(e,{arrFind:function(a,b,c,d){c=-1;if(F(a))for(d=0;d<a[k];d++)if(a[d]===b){c=d;break}return c},arrRemove:function(a,
b,c){c=e.arrFind(a,b);c>-1&&a.splice(c,1);return a},arrInsert:function(a,b,c){if(F(a))a.splice(isNaN(c)?a[k]:c,0,b);return a},nodeAttr:function(a,b,c,d,f){if(e.isStr(b)){d=(a=e(a))?a.getAttribute(b):o;c&&a&&a.removeAttribute(b);return d}a=w(a)?a:[a];for(c=a[k];c--;)if(f=e(a[c]))for(d in b)f.setAttribute(d,b[d]);return e},nodeDoc:function(a){return(a=e(a))&&(a.ownerDocument||a.document)||o},nodeBound:function(a,b){var c=0,d=0,f=0,g=0;if(a=e(a)){b=e(b);d=a.offsetWidth;f=a.offsetHeight;if(a.getBoundingClientRect&&
!(b||e.nodeIn(a,b))){b=a.getBoundingClientRect();g=K(e.nodeDoc(a));c=b.left+g.scrollX-g.left;g=b.top+g.scrollY-g.top}else for(;a&&a!=b;c+=a.offsetLeft||0,g+=a.offsetTop||0,a=a.offsetParent);}return{x:c,y:g,width:d,height:f}},nodeStyle:function(a,b,c,d){if(!b||e.isStr(b)){if(a=e(a)){c=a.style[b];if(!c){c=ga?e.nodeDoc(a).defaultView.getComputedStyle(a,o):a.currentStyle;if(b&&b=="float")b=ma;c=b?c[b]:c}}return c}a=w(a)?a:[a];for(d=a[k];d--;)(c=e(a[d]))&&s(c.style,b,function(f,g,h){if(g=="opacity"&&!ga){h.zoom=
1;h.filter=(h.filter||j).replace(/alpha\([^)]*\)/i,j)+(f==1?j:"alpha(opacity="+f*100+")")}else if(g=="float"){h[ma]=f;return v}return n});return e},nodeClean:function(a,b,c,d,f){a=w(a)?a:[a];for(f=a[k];f--;)if(b=e(a[f]))for(c=b.firstChild;c;){d=c.nextSibling;c.nodeType==8||c.nodeType==3&&/^\s*$/.test(c.nodeValue)?e.nodeDel(c):e.nodeClean(c);c=d}return e},nodeVal:function(a,b,c,d){if(arguments[k]==1)return(a=e(a))?p(a.tagName)=="li"||!(U in a)?a.innerHTML:a[U]:j;a=w(a)?a:[a];for(d=a[k];d--;)if(c=e(a[d]))c[p(c.tagName)!=
"li"&&U in c?U:"innerHTML"]=b+j;return e},nodeDel:function(a,b,c){a=w(a)?a:[a];for(c=a[k];c--;)(b=e(a[c]))&&b.parentNode&&b.parentNode.removeChild(b);return e},nodeClass:function(a,b,c,d,f,g,h,i){g=new ia("(?:^|\\s+)"+b+"(?:\\s+|$)");a=w(a)?a:[a];i=a[k];for(h=e.isStr(c);i--;)if(f=e(a[i])){d=f.className;f.className=e.strTrim(c||h?d.replace(g,h?" "+c+" ":" "):(d+=g.test(d)?j:" "+b))}return e},nodeIn:function(a,b,c){a=e(a);b=e(b);if(a&&b)if(a!=b)try{c=b.contains?b.contains(a):b.compareDocumentPosition(a)&
16}catch(d){c=v}else c=n;return c},nodeWin:function(a,b,c){c=o;if(b=e.nodeDoc(a))c=b.defaultView||b.parentWindow;return c},mouseInout:function(a,b,c){return(b=e.evt(b,c))?!e.nodeIn(b.relatedTarget||b[(/out$/.test(b.type)?"to":"from")+"Element"],a):v},mouseHover:function(a,b,c){a=e.evt(a,b);if((c=e.evtTarget(a))&&c.setCapture)for(c=e.nodeDoc(c).elementFromPoint(a.clientX,a.clientY);c&&c.nodeType==3;)c=c.parentNode;return c},startDrag:function(a,b,c,d){if((a=e(a))&&(d=e.evt(d))){e.clear();e.evtPrevent(d);
H=(H=d.touches)?H[0]:o;da=e.evtPageXY(d);ka=l(b);la=b;fa=c;I=a;y=e.nodeDoc(a);Y=e.nodeWin(a);if(a.setCapture){S.f=n;a.setCapture()}e.on(y,aa,ja).on(y,S,E).on(Y,"blur",E).on(a,"losecapture",E).on(y,"keydown",ea)}},on:function(a,b,c,d,f,g,h,i){if(l(c)){a=w(a)?a:[a];b=F(b)?b:[b];i=a[k];for(d=!!d;i--;)if(g=e(a[i]))for(h=b[k];h--;)if(g.addEventListener)f?g.removeEventListener(b[h],c,d):g.addEventListener(b[h],c,d);else if(g.attachEvent)f?g.detachEvent(G+b[h],c):g.attachEvent(G+b[h],c);else g[G+b[h]]=f?
o:c}return e},un:function(a,b,c,d){return e.on(a,b,c,d,n)},evt:function(a,b,c,d,f){a=a||(b||m).event;if(!a){c=e.evt;d=32;try{for(;d--&&c.caller;)c=c.caller;if(e.isInsof(f=c.arguments[0],Event))a=f}catch(g){}}return a},evtCancel:function(a,b){if(a=e.evt(a,b))(a.t=a.stopPropagation)?a.t():(a.cancelBubble=n)},evtPrevent:function(a,b){if(a=e.evt(a,b))(a.t=a.preventDefault)?a.t():(a.returnValue=v)},evtPageXY:function(a,b,c,d,f){if(a=e.evt(a,b)){d=a.targetTouches;if(!H&&d)f=d[d[k]-1];a=H||f||a;if(f=m.isNaN(a.pageX))d=
K();c={x:f?a.clientX+d.scrollX-d.left:a.pageX,y:f?a.clientY+d.scrollY-d.top:a.pageY}}else c={x:0,y:0};return c},evtTarget:function(a,b,c){if(a=e.evt(a,b))for(c=a.target||a.srcElement;c&&c.nodeType==3;)c=c.parentNode;return c},evtHitest:function(a,b){return(a=e.evt(a,b))?(b=a.touches)&&b[k]==1||a.which==1||!a.which&&a.button==1:v},lock:function(a,b){if(!D.call(K,a)){K[a]=b;l(b)&&b()}},unlock:function(a){delete K[a]},XHR:e.clazz(e.Evt,{send:function(a,b,c,d,f){f=this;C||(C=new e.TM(50));c=s({url:G,
un:o,pw:o,timeout:3E4,start:r,fail:r,succ:r,done:r,data:j,method:a&&a.data?"POST":"GET",jsonp:j,charset:"UTF-8",async:n},a);s(c,{_f:na||(na=function(g){try{this.fail(g)}catch(h){B(h,this.fail)}}),_e:oa||(oa=function(g){try{this.done(f.z)}catch(h){g=h}this._f(g)})});c[M]=s({"Content-Type":"application/x-www-form-urlencoded"},c[M]);e.arrInsert(f.q||(f.q=[]),c,b?o:0);!f._&&f.x()},x:function(a,b,c,d,f,g){a=this;if(b=a.q.pop()){b.start();g=b.jsonp?a.j||(a.j=new Z):a.z||(a.z=new $);a._=g;if(g.p()){a.v=
V(function(){a.n();b._e("timeout");g.a()},b.timeout);g.c(b);g.r(b.data,function(h,i,t){a.n();try{b.done(i);h?b.succ(i):b.fail(t)}catch(Q){b._f(Q)}})}else{a.n();b._e("unsupport")}}else a.stop()},n:function(a){a=this;a.c();a.w=V(a.x,50,v,a)},c:function(a,b,c){c=this;W(c.v);if(a){c._&&c._.a();delete c._}},stop:function(a,b){b=this;W(b.w);b.q=[];b.c(n);!a&&b.fire("end")}}),TM:e.clazz({ctor:function(a,b){b=this;a=parseInt(a,10)||13;if(!ha[a]){b.l=[];b.p=a;b.c=function(c){for(c=0;b.l[c];c++)try{b.l[c]()}catch(d){B(d,
b.l[c])}};ha[a]=b}return ha[a]},on:function(a,b){b=this;b.l.push(a);if(!b.h)b.h=V(b.c,b.p,n)},un:function(a,b){b=this;e.arrRemove(b.l,a);if(!b.l[k]){W(b.h);delete b.h}}}),FX:e.clazz(e.Evt,{ctor:function(a,b,c){c=this;if(!c.g||a){a=l(a)?a:sa;c.g=function(d,f){return a(c.t,d,f-d,c.a)}}if(!c.z)c.z=new e.TM(b)},run:function(a,b,c,d,f){f=this;(f.q||(f.q=[])).push([a,b,d,c]);!f.m&&f.n()},n:function(a,b){a=this;if(a.o=b=a.q&&a.q.shift()){a.ctor(b[2]);a.c=l(b[1])?b[1]:r;a.a=b[0]||1E3;a.d=J();!a.m&&a.z.on(a.m=
function(c){a.t=J()-a.d;if(a.t>a.a)c=a.t=a.a;try{a.c(a.g,a.o[3])}catch(d){B(c=d,a.c)}c&&a.n()})}else a.stop()},stop:function(a,b){b=this;if(b.m&&b.z){b.z.un(b.m);delete b.m}!a&&b.fire("end")}}),TP:{using:function(a,b,c,d){c=(d=e(a))?a:w[a]||(w[a]=e.id());O=[c,b].join("$");if(!D.call(P,O)){u=d?e.nodeVal(a):a;if((u=u.replace(/\s+/g," "))&&b){u=u.match(new ia("<"+b+">([\\s\\S]*?)</"+b+">"));if(!u)throw"no tpl:"+b;u=u[1]}}return this},getFilled:function(a,b,c){a=a||{};c=[];ba=ba||/([\s\S]*?)(?:<#(=)?([\s\S]*?)#>|$)/g;
ca=ca||/([\\'])/g;if(D.call(P,O))b=P[O];else{u.replace(ba,function(f,g,h,i){g&&c.push(";_.push('",g.replace(ca,"\\$1"),"');");i&&c.push(h?";_.push(":j,i,h?");":j)});c.push('return _.join("")');b={s:c.join(j)};P[O]=b}try{if(!b.f)b.f=new Function("_",b.s);b=b.f.call(a,[])}catch(d){b=["ex:",d.message,",src:",e.strHTML(b.s)].join(j)}return b},toFill:function(a,b){e.nodeVal(a,this.getFilled(b))}}});m.K=e});
