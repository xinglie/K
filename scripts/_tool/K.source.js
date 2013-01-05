/*K project by kooboy_li@163.com*/
T.cache('K',function(e) {
	/*
		shortcut
	*/
	var EMPTY='',
		I50,
		NonAsiic=/[^\x00-\xff]/g,
		safeWrap=T.safeWrap,
		W = this,
		A = 'length',
		B = 'object',
		D = W.document,
		SPACE=' ',
		Fun=Function,
		H = ['mousemove', 'touchmove'],
		I = ['mouseup', 'touchend'],
		J = ['keydown','mousewheel','DOMMouseScroll'],
		K, M = function(s) {
			/// <summary>to lower case</summary>
			/// <param name="s" type="String">source</param>
			/// <returns type="String" />
			return String(s).toLowerCase();
		},
		

		P = 'prototype',
		has = T.has,
		Q = null,
		TRUE = true,
		FALSE = false,
		X = '~~',
		EVT_END='_end',
		MAX=Math.max,
		MIN=Math.min,
		POINTEROUT=/out$/g,
		CSS1Compat='CSS1Compat',
		DOT='.',
		BLUR='blur',
		LOSECAPTURE='losecapture',
		cloneHelper = function(y, z, i) {
			/// <summary>helper for K.clone</summary>
			if (B === typeof z || isFn(z)) {
				for (i = y[A] - 2; i >= 0; i -= 2) {
					if (y[i] === z) return y[i + 1]
				}
				y.push(z, z = K.clone(z, y))
			}
			return z
		},
		$K, $L, $M, $g = /^[\s\xa0\u3000\uFEFF]+|[\s\xa0\u3000\uFEFF]+$/g,
		//$h = /([?|.{}\\()+\-*\/^$\[\]])/g,
		$h=/[\-#$\^*()+\[\]{}|\\,.?\s]/g,
		dragTemp,
		dragMove = function(g, c) {
			/// <summary>helper for K.drag</summary>
			//log('startDrag move');
			g = K.evt(g,dragTemp.w);
			if (g) {
				c = K.evtXY(g,dragTemp.w);
				dragTemp.u && dragTemp.m(dragTemp.o, g, c,dragTemp.x);
				//evtHalt(g)
			}
		},
		dragEvtHalt=function(e){
			evtHalt(e,dragTemp.w)
		},
		dragStop = function(e, f) {
			/// <summary>release drag</summary>
			/// <param name="e" type="Event">event object</param>
			e = K.evt(e,dragTemp.w);
			f = (e && e.touches) || [];
			if (!f[A]) {
				K.un(dragTemp.w, BLUR, dragStop)
				 .un(dragTemp.d, H, dragMove)
				 .un(dragTemp.d, I, dragStop)
				 .un(dragTemp.o, LOSECAPTURE, dragStop)
				 .un(dragTemp.d, J, dragEvtHalt);
				I.f && dragTemp.o.releaseCapture();
				isFn(dragTemp.s) && dragTemp.s(dragTemp.o, e);
				dragTemp=Q;
				I.b=Q;
			}
		},
		dateNow = Date.now||function() {
			/// <summary>get current time</summary>
			return (new Date).valueOf()
		},
	
		isW3C = !! W.getComputedStyle,
		styleFixer={
			'float':(isW3C?'css':'style')+'Float'
		},
		evtHalt = function(e, w) {
			/// <summary>cancel event bubble and default</summary>
			/// <param name="e" type="Event">event object</param>
			/// <param name="w" type="Window">Window object,IE　event object in Window</param>
			K.evtPrevent(e, w);
			K.evtCancel(e, w)
		},
		_d = function(d,w,e,i,sy,vw,vh) {
			d = K.nodeDoc(d || D);
			w = K.nodeWin(d);
			i = w.isNaN(sy=w.pageYOffset);

			e = d.compatMode==CSS1Compat?d.documentElement:d.body;


			vw=e.clientWidth;//:w.innerWidth;
			vh=e.clientHeight;//:w.innerHeight;

			if(!i){//innerWidth包含滚动条，而手机上的safari又不包含，且clientWidth并不是可视区域的，因此需要判断
				vw=MIN(vw,w.innerWidth);
				vh=MIN(vh,w.innerHeight);
			}

			return {
				scrollX:i?e.scrollLeft:w.pageXOffset,
				scrollY:i?e.scrollTop:sy,
				maxWidth:MAX(d.width||0,e.scrollWidth,vw),//document.width可包含fixed的,scrollWidth并不包含
				maxHeight:MAX(d.height||0,e.scrollHeight,vh),
				width:vw,
				height:vh,
				x:e.clientLeft,
				y:e.clientTop
			}
		},
		_e = dateNow(),
		type = function(a, t) {
			/// <summary>enlarge typeof</summary>
			/// <param name="a" type="Object">object</param>
			/// <returns type="String" />
			return (t = typeof(a)) === B ? M(a===Q?Q:Object[P].toString.call(a).slice(8, -1)) : t
		},
		MIX = function(d, s, f, p) {
			/// <summary>extend object</summary>
			/// <param name="d" type="Object">desc object</param>
			/// <param name="s" type="Object">src object</param>
			/// <param name="f" type="Array">ignore list</param>
			/// <returns type="Object" />
			f=f||FALSE;

			if (!d) d = isArr(s) ? [] : {};
			for (p in s) {
				if(has(s,p) && !has(f,p)){
					d[p] = s[p]
				}
			}
			return d
		},
		_l = Fun(),

		_q = Array[P].slice,

		$ = {},
		$c = type(M),
		$d = type(H),
		$f = type(P),
		//_v = type($g),
		isStr=function(a) {
			/// <summary>judge is string</summary>
			/// <param name="a" type="Object">param</param>
			/// <returns type="Boolean" />
			return type(a) === $f
		},
		isFn = function(a) {
			/// <summary>judge is method</summary>
			/// <param name="a" type="Object">param</param>
			/// <returns type="Boolean" />
			return type(a) === $c;
		},
		isArr = function(a) {
			/// <summary>judge is array</summary>
			/// <param name="a" type="Object">param</param>
			/// <returns type="Boolean" />
			return type(a) === $d
		},
		isObj = function(a) {
			/// <summary>judge is object</summary>
			/// <param name="a" type="Object">param</param>
			/// <returns type="Boolean" />
			return type(a) === B;
		},
		likeArr = function(a) {
			/// <summary>like array</summary>
			return a && a[A]>=0 && !isStr(a) && !isFn(a) && !a.nodeType && !a.window && !a.callee;
		},
		noop = function(x){return x},

		ALPHAREG=/alpha\([^)]*\)/i,
		/*只处理最常用的*/
		styleWithoutUnit={
			fontWeight:TRUE,
			lineHeight:TRUE,
			opacity:TRUE,
			zIndex:TRUE,
			orphans:TRUE,
			windows:TRUE
		},
		styleDefaultUnit='px',
		_w='on',
		clazz=function(c, p, s, f, y, z) {
			/// <summary>crete a class</summary>
			/// <param name="c" type="Object|Function">base class or the methods obj</param>
			/// <param name="p" type="Object|Function">obj or callback</param>
			/// <returns type="Function" />
			f = function() {
				var t = this,
					p, b = arguments,
					a = b.callee[P];
				for (p in a){
					if (has(a,p)&&!isFn(a[p])){
						t[p] = K.clone(a[p]);
					}
				}
				return t.ctor.apply(t, b);
			};
			y = isFn(c) ? (MIX(f,c,MIX),z = _l[P] = c[P], new _l) : MIX({}, z = c); //
			if (isFn(p)) p = p(z, y, f, c);
			p && MIX(y,p);
			s && MIX(f,s);
			y.ctor = y.ctor || noop;
			y.constructor = f;
			f[P] = y;
			//MIX(f[P],y);
			return f
		},
		ME={
			fire: function(a, c, b, endToFirst,d, f, g) {
				/// <summary>fire event</summary>
				/// <param name="a" type="String">event name</param>
				/// <param name="c" type="Object">event params</param>
				/// <param name="b" type="Boolean">if true,delete event listen</param>
				/// <returns type="This" />
				d = this;
				a = M(a);
				if (!c) c = {};
				c.sender = d;
				c.type = a;
				if (isArr(f = d[f = X + a])) {
					g=endToFirst?f[A]-1:0;
					for (;f[g];endToFirst?g--:g++) {
						if(f[g][X](c)===FALSE)break;
					}
				}
				isFn(d[f = _w + a]) && safeWrap(d[f],d)(c);
				b && d.off(a)
			},
			on: function(a, c, b, i,l,m) {
				/// <summary>add event listen</summary>
				/// <param name="a" type="String">event name</param>
				/// <param name="c" type="Function">callback</param>
				/// <returns type="This" /> 
				b = this;
				a = isArr(a) ? a : [a];
				m=a[A];
				l=0;
				c[X]=safeWrap(c,b);
				while (l<m) {
					i = M(a[l++]);
					(b[i = X + i] || (b[i] = [])).push(c);
				}
				return b
			},
			un: function(a, c,m,l) {
				/// <summary>remove event listen</summary>
				/// <param name="a" type="String">event name</param>
				/// <param name="c" type="Function">callback</param>
				/// <returns type="This" /> 
				a = isArr(a) ? a : [a];
				m=a[A];
				l=0;
				while (l<m) {
					K.arrRemove(this[X + M(a[l++])], c);
				}
				return this
			},
			off: function(a, t) {
				/// <summary>clear one event listen</summary>
				/// <param name="a" type="String">event name</param>
				/// <returns type="This" /> 
				t = this;
				a = M(a);
				delete t[X + a];
				delete t[_w + a]
			}
		},
		CREATEELEMENT='createElement',
		GETELEMENTBYID='getElementById',
		log = T.log;
	K = function(v, a, s, d) {
		/// <summary>create or get DOM node</summary>
		/// <param name="v" type="String|Object">DOM node or node id or create tag name</param>
		/// <param name="a" type="Object">extend attributes</param>
		/// <param name="s" type="Object">extend styles</param>
		/// <returns type="HTMLElement|Null" />
		if (typeof(v) !== B){
			v = (d||D)[(a||s) ? CREATEELEMENT : GETELEMENTBYID](v);
		}
		a && K.nodeAttr(v, a);
		s && K.nodeStyle(v, s);
		return v
	};
	MIX(K, {
		//e: _w,
		has:has,
		fn: noop,
		type: type,
		mix: MIX,
		stopDrag: dragStop,
		now: dateNow,
		evtHalt: evtHalt,
		isArr: isArr,
		isFn: isFn,
		isStr:isStr,
		body:_d,
		isObj:isObj,
		clazz:clazz,
		ME:ME,
		strTrim: function(s, r) {
			/// <summary>trim or trim by regexp</summary>
			/// <param name="s" type="String">src string</param>
			/// <param name="r" type="String|RegExp">trim str or regexp</param>
			/// <returns type="String" />
			return String(s).replace(r || $g, EMPTY)
		},
		strReg:function(s){
			return String(s).replace($h,'\\$&');
		},
/*strOwn: function (s,p) {
			/// <summary>detect contains the str or regexp</summary>
			/// <param name="s" type="String">src string</param>
			/// <param name="p" type="String|RegExp">string or regexp</param>
			/// <returns type="String" />
			return (K.isReg(p) ? p : new RegExp(K.strSwap(p + EMPTY,$h, '\\$1'))).test(s+EMPTY)
		},*/
		strLen: function(s) {
			/// <summary>byte length</summary>
			/// <param name="s" type="String">src length</param>
			/// <returns type="Integer" />
			return String(s).replace(NonAsiic, X)[A]
		},
		strCode: function(s, f) {
			/// <summary>use encodeURIComponent or decodeURIComponent</summary>
			/// <param name="s" type="String">src string</param>
			/// <param name="f" type="Boolean"></param>
			/// <returns type="String" />
			return W[(f ? 'de' : 'en') + 'codeURIComponent'](s)
		},
/*strSwap: function (s,p,v, b, i, l) {
			/// <summary>enhance replace</summary>
			/// <param name="s" type="String">src string</param>
			/// <param name="p" type="String|RegExp|Array">str,regexp or array</param>
			/// <param name="v" type="Array|String|Function">array,str or callback</param>
			/// <returns type="String" />
			s = s+EMPTY;
			i = -1;
			l = arguments[A] == 2;
			if (isArr(p)) {
				b = isArr(v);
				while (++i < p[A]) s = s.replace(p[i], b && i < v[A] ? v[i] : l ? EMPTY : v)
			} else s = s.replace(p, l ? EMPTY : v);
			return s
		},*/
		/*strFormat: function(s, d, a) {
			/// <summary>format string ,can use {0} or {username}</summary>
			/// <param name="s" type="String">src string</param>
			/// <param name="d" type="Object">when use {username} pass json,d is json object</param>
			/// <returns type="String" />
			s = s + EMPTY;
			if (K.isObj(d)) a = d;
			else a = _q.call(arguments, 1)
			s = s.replace(/{(\w+)}/g, function(b, c) {
				return a[c]
			});
			return s
		},*/
		strHTML: function(s, f, r, p) {
			/// <summary>encode or decode html string</summary>
			/// <param name="s" type="String">src string</param>
			/// <param name="f" type="Boolean">is decode</param>
			/// <returns type="String" />
			r = f ? [/&lt;/g, /&gt;/g, /&quot;/g, /&amp;/g] : [/&/g, /"/g, /</g, />/g];
			p = f ? ['<', '>', '"', '&'] : ['&amp;', '&quot;', '&lt;', '&gt;'];
			s=String(s);
			while (r[A]) {
				s = s.replace(r.shift(), p.shift());
			}
			return s;
		},
		/*logTime: function(a) {
			/// <summary>log time</summary>
			if (has(M, a)) {
				log(a + ':' + (dateNow() - M[a]) + 'ms');
				delete M[a]
			} else {
				M[a] = dateNow()
			}
		},
		isInsof: safeWrap(function(a, b) {
			/// <summary>detect the obj is another type</summary>
			/// <param name="a" type="Object">obj</param>
			/// <param name="b" type="Clazz">clazz</param>
			/// <returns type="Boolean" />
			return a instanceof b
		}),*/
		/*isUndef: function(a) {
			/// <summary>judge is undefined</summary>
			/// <param name="a" type="Object">param</param>
			/// <returns type="Boolean" />
			return a === Z;
		},*/
		/*isRegExp: function(a) {
			/// <summary>judge is regexp</summary>
			/// <param name="a" type="Object">param</param>
			/// <returns type="Boolean" />
			return type(a) === _v
		},*/
		guid: function(p) {
			/// <summary>get a unique id</summary>
			/// <returns type="String" />
			return (p||_w) + (_e++).toString(32);
		},
/*test: function () {
			/// <summary>like prototype.js tryThese,but reurn the method not result</summary>
			/// <returns type="Function" />
			var r = arguments, b = 0, l = r[A];
			for (; b < l; b++) {
				try {
					r[b]();
					return r[b];
				} catch (e) {
					log('K.test', e);
				}
			}
			return noop
		},*/
		clone: function(o, y, c, p) {
			/// <summary>clone a object</summary>
			/// <param name="o" type="Object">src obj</param>
			/// <returns type="Object" />
			y || (y = []);
			//if(isFn(o))c = Function('return ' + o)(); //clone function eval in cur env,Funtion in global
			//if we clone ,many times the fn cannot work, so we shadow clone it
			c = o;
			p = o?o.constructor:Q;
			if(o && typeof o===B && !o.nodeType && isFn(p)){//ignore function and node
				c = new p(o.message||o.valueOf())
				c = isArr(o)||o==c?new p():c;//clone others,recognize the cloned and src is equal then pass or not params,array not pass params
				y.push(o, c);
				for (p in o) if (has(o, p)) c[p] = cloneHelper(y, o[p]); 
			}
			return c
		},
		clear: function(w,t) {
			/// <summary>clear select zone</summary>
			w = w || W;
			if ((t = w.getSelection)) {
				t().removeAllRanges();
			} else if ((t = w.document.selection)) {
				if (t.empty) t.empty();
				else t = Q;
			}
		},
/*equal: function (b, c, f, i, l) {
			/// <summary>judge is equal,detect array own value is equal</summary>
			/// <param name="b" type="Object">first param</param>
			/// <param name="c" type="Object">second param</param>
			/// <param name="f" type="Boolean">use ===</param>
			/// <returns type="Boolean" />
			if (b === c) return TRUE;
			if (isArr(b) && isArr(c) && (l = b[A]) == c[A]) {
				for (i = 0; i < l; i++) if (!K.equal(b[i], c[i], f)) return FALSE;
				return TRUE
			}
			return f ? b == c : b === c
		},*/
		bind: function(f, o, a) {
			/// <summary>bind method to object</summary>
			/// <param name="f" type="Function">method</param>
			/// <param name="o" type="Object">obj</param>
			/// <returns type="Function" />
			a = _q.call(arguments, 2);
			f = isFn(f) ? f : noop;
			return function() {
				return f.apply(o, a.concat(_q.call(arguments)))
			}
		},
		
		entity: function(w,n, b,i,p) {
			/// <summary>create or get object</summary>
			/// <param name="w" type="Object">context</param>
			/// <param name="n" type="String">like 'K.Gameboy.Tetris' string</param>
			/// <param name="b" type="Boolean">if true get then create object</param>
			/// <returns type="Object" />
			if(isStr(w)){
				n=w;
				w=W;
			}
			n = String(n).split(DOT);
			for (i = 0; i < n[A]; i++) {
				p = n[i];
				if (!has(w, p)) {
					if (b) {
						w = Q;
						break
					}
					w[p] = {}
				}
				w = w[p]
			}
			return w
		},
		access:function(o,k,d,r){
			///<summary>access object by key</summary>
			r=K.entity(o,k,TRUE);
			if(arguments[A]===3&&type(r)!==type(d)){
				r=d;
			}
			return r;
		},
		arrFind: function(a, o, i, z) {
			/// <summary>find the first item in array,if not find reuturn -1</summary>
			/// <param name="a" type="Array">the array</param>
			/// <param name="o" type="Object">the item</param>
			/// <returns type="Integer" />
			i = -1;
			if (isArr(a)) {
				for (z = 0; z < a[A]; z++) {
					if (a[z] === o) {
						i = z;
						break;
					}
				}
			}
			return i
		},
		arrRemove: function(a, o, i) {
			/// <summary>remove item from array</summary>
			/// <param name="a" type="Array">the array</param>
			/// <param name="o" type="Object">the item</param>
			/// <returns type="Array" />
			i = K.arrFind(a, o);
			i > -1 && a.splice(i, 1);
			return a;
		},
		arrInsert: function(a, o, i) {
			/// <summary>insert item to array</summary>
			/// <param name="a" type="Array">the array</param>
			/// <param name="o" type="Object">insert item</param>
			/// <param name="i" type="Integer">insert position</param>
			/// <returns type="Array" />
			if (isArr(a)) a.splice(isNaN(i) ? a[A] : i, 0, o);
			return a;
		},
		nodeDoc: function(a,d) {
			/// <summary>get the node document</summary>
			/// <param name="a" type="String|HTMLElement">node or node id</param>
			/// <returns type="HTMLDocumentElement|Null" />
			a = K(a,Q,Q,d);
			if(a&&a.nodeType!=9){
				a=a.ownerDocument||a.document;
			}
			return a
		},
		nodeWin: function(a, d, r) {
			r = Q;
			d = K.nodeDoc(a,d);
			if (d) {
				r = d.defaultView || d.parentWindow
			}
			return r;
		},
		nodeAttr: function(a, v, b, d,k, c) {
			/// <summary>get or set node attributes</summary>
			/// <param name="a" type="String|HTMLElement|Array">node or node ids</param>
			/// <param name="v" type="String|Object">if v is string then get else set the v object attrs</param>
			/// <param name="b" type="Boolean">if true then delete the attr,the v must a string</param>
			/// <returns type="K|String|Null" />
			if (isStr(v)) {
				k = (a = K(a,Q,Q,d)) ? a.getAttribute(v) : Q;
				b && a && a.removeAttribute(v);
				return k
			}
			a = likeArr(a) ? a : [a];
			b = a[A];
			while (b--) {
				c = K(a[b],Q,Q,d);
				if (c) {
					for (k in v){
						has(v,k)&&c.setAttribute(k, v[k]);
					}
				}
			}
			return K
		},
		nodeBound: function(v,d) {
			/// <summary>get node bound</summary>
			/// <param name="v" type="String|HTMLElement">node or node id</param>
			/// <returns type="Object" />
			var l = 0,
				w = 0,
				h = 0,
				t = 0,
				fw=0,
				fh=0,
				sx=0,
				sy=0,
				p = K(v,Q,Q,d),
				o, r,body,dEle;
			if (p) {
				w = p.offsetWidth;
				h = p.offsetHeight;
				fw=p.scrollWidth;
				fh=p.scrollHeight;
				sx=p.scrollLeft;
				sy=p.scrollTop;
				o=K.nodeDoc(p)
				if (p.getBoundingClientRect) {
					r = p.getBoundingClientRect();
					o = _d(o);
					l = r.left + o.scrollX - o.x;
					t = r.top + o.scrollY - o.y;
				} else{
					r=p.parentNode;
					body=o.body;
					dEle=o.documentElement;
					while(r&&r!=body&&r!=dEle){
						l-=r.scrollLeft;
						t-=r.scrollTop;
						r=r.parentNode;
					}
					while(p){
						l += p.offsetLeft || 0;
						t += p.offsetTop || 0;
						p = p.offsetParent
					}
				}
			}
			return {
				x: l,
				y: t,
				width: w,
				height: h,
				scrollX:sx,
				scrollY:sy,
				maxWidth:MAX(w,fw),
				maxHeight:MAX(h,fh)
			}
		},
		nodeStyle: function(v, c, e,d, l,p) {
			/// <summary>get or set node style</summary>
			/// <param name="v" type="String|HTMLElement|Array">node or node ids</param>
			/// <param name="c" type="String|Object"> if !c return style object,if c is string reutrn style[c] else add the styles</param>
			/// <returns type="K|String|Null" />
			if (!c || isStr(c)) {
				v = K(v,Q,Q,e);
				if (v) {
					c = styleFixer[c]||c;
					d = v.style[c];
					if (!d) {
						l=K.nodeWin(v);
						d = isW3C ? (l?l.getComputedStyle(v, Q):Q) : v.currentStyle;
						d = c && d ? d[c] : d;
					}
				}
				return d;
			}
			v = likeArr(v) ? v : [v];
			l = v[A];
			while (l--) {
				d = K(v[l],Q,Q,e);
				if(d){
					d=d.style;
					for(p in c){
						p=styleFixer[p]||p;
						if (p === 'opacity' && !isW3C) {
							d.zoom = 1;
							d.filter = (d.filter || EMPTY).replace(ALPHAREG, EMPTY) + (c[p] === 1 ? EMPTY : 'alpha(opacity=' + c[p] * 100 + ')');
						}
						if(W.isFinite(c[p])&&!has(styleWithoutUnit,p)){
							c[p]+=styleDefaultUnit;
						}
						d[p]=c[p];
					}
				}
			}
			return K;
		},
		nodeClean: function(a, d,v, n, m, i) {
			/// <summary>clear empty node and comment</summary>
			/// <param name="a" type="String|HTMLElement|Array">node or node ids</param>
			/// <returns type="K" />
			a = likeArr(a) ? a : [a];
			i = a[A]
			while (i--) {
				v = K(a[i],Q,Q,d);
				if (v) {
					n = v.firstChild;
					while (n) {
						m = n.nextSibling;
						if (n.nodeType === 8 || (n.nodeType === 3 && /^\s*$/.test(n.nodeValue))) K.nodeDel(n)
						else K.nodeClean(n);
						n = m
					}
				}
			}
			return K
		},
		nodeVal: function(a, b,d, v, i) {
			/// <summary>get or set node value</summary>
			/// <param name="a" type="String|HTMLElement|Array">node or node ids</param>
			/// <param name="b" type="String">if !b get else set</param>
			/// <returns type="String|Null|K" />
			if (!isStr(b)){
				return (a = K(a,Q,Q,d)) ? (M(a.tagName) === 'li' || !('value' in a) ? a.innerHTML : a.value) : EMPTY;
			}
			a = likeArr(a) ? a : [a];
			i = a[A]
			while (i--) {
				v = K(a[i],Q,Q,d);
				if (v) v[M(v.tagName) !== 'li' && 'value' in v ? 'value' : 'innerHTML'] = b
			}
			return K
		},
		nodeDel: function(a, d,v, i) {
			/// <summary>delete node</summary>
			/// <param name="a" type="String|HTMLElement|Array">node or node ids</param>
			/// <returns type="K" />
			a = likeArr(a) ? a : [a];
			i = a[A];
			while (i--) {
				v = K(a[i],Q,Q,d);
				if (v){
					if(v.removeNode)v.removeNode(TRUE);
					else if(v.parentNode)v.parentNode.removeChild(v);
				}
			}
			return K
		},
		nodeClass: function(a, b, c, e,d, v, r, i,cr,m) {
			/// <summary>add or delete node class</summary>
			/// <param name="a" type="String|HTMLElement|Array">node or node ids</param>
			/// <param name="b" type="String">class name</param>
			/// <param name="c" type="Boolean|String">if true delete class,else is string swap the class name</param>
			/// <returns type="K" />
			if(arguments[A]==2){
				c=b;
				b=EMPTY;
			}

			r = RegExp('(?:^|\\s+)' + K.strReg(b) + '(?:\\s+|$)');
			cr= RegExp('(?:^|\\s+)' + K.strReg(c) + '(?:\\s+|$)');

			a = likeArr(a) ? a : [a];
			i = a[A];	
			while (i--) {
				v = K(a[i],Q,Q,e);
				if (v) {
					d = v.className;
					if(r.test(d)){
						d=d.replace(r,SPACE+c+SPACE);
					}
					if(!cr.test(d)){
						d+=SPACE+c;
					}
					v.className = K.strTrim(d);
				}
			}
			return K
		},
		nodeIn: function(a, b,d, r) {
			/// <summary>node a is in node b</summary>
			/// <param name="a" type="String|HTMLElement">node a</param>
			/// <param name="b" type="String|HTMLElement">node b</param>
			/// <returns type="Boolean" />
			a = K(a,Q,Q,d);
			b = K(b,Q,Q,d);
			if (a && b) {
				if (a !== b){
					try {
						r = b.contains ? b.contains(a) : b.compareDocumentPosition(a) & 16
					} catch (e) {
						r = FALSE
					}
				} else{
					r = TRUE;
				} 
			}
			return r
		},
		nodeByXY:function(x,y,d,b){
			d=K.nodeDoc(d||D);
			if(d.elementFromPoint){
				if(!H.x&&isW3C){
					H.x=true;
					H.r=d.elementFromPoint(-1,-1)!==Q;
				}
				if(H.r){
					b=_d(d);
					x+=b.scrollX;
					y+=b.scrollY;
				}
				b=d.elementFromPoint(x,y);
				while(b&&b.nodeType==3)b=b.parentNode;
			}
			return b;
		},
		nodeByTags:function(n, o, f,d, r, a, i, j, l, b, s) {
			/// <summary>get the elements by tag names</summary>
			/// <param name="n" type="String">tag names</param>
			/// <param name="o" type="String|HTMLElement">in what node</param>
			/// <param name="f" type="Function">filter callback</param>
			/// <returns type="HTMLCollection" />
			a = K(o,Q,Q,d) || d || D;
			r = [];
			if (a.getElementsByTagName) {
				n = isArr(n) ? n : [n];
				j = -1;
				b = isFn(f);
				if(b){
					f=safeWrap(f);
				}
				z: while (n[++j]) {
					//T.log(n[j],j);
					i = a.getElementsByTagName(n[j]);
					l = -1;
					while (i[++l]) {
						s=b?f(i[l]):TRUE
						//T.log(s,b,f);
						if (s === FALSE) break z;
						s && r.push(i[l]);
					}
				}
			}
			return r
		},
		pointerInout: function(a, e, w) {
			/// <summary>judge mouse is in or out node a</summary>
			/// <param name="e" type="Event">event object</param>
			/// <param name="w" type="Window">Window object</param>
			/// <returns type="Boolean" />
			e = K.evt(e, w);
			return e ? !K.nodeIn(e.relatedTarget || (POINTEROUT.test(e.type)?e.toElement:e.fromElement), a) : FALSE
		},
		startDrag: function(o, r, h, e,d,w,b) {
			/// <summary>drag element,the element position is absolute</summary>
			/// <param name="o" type="String|HTMLElement">node or node id</param>
			/// <param name="r" type="Function">move callback(o,e,fx,fy,xy)</param>
			/// <param name="h" type="Functio">move end(o,e)</param>
			/// <param name="e" type="Event">event object</param>
			o = K(o,Q,Q,d);
			if(o){
				w=K.nodeWin(o);
				e=K.evt(e,w);
				if(e){
					K.clear(w);
					K.evtPrevent(e,w);
					b=e.touches;
					I.b=b&&b[b[A]-1];
					dragTemp={
						w:w,
						d:K.nodeDoc(o),
						x:K.evtXY(e,w),
						m:r,
						s:h,
						o:o,
						u:isFn(r)
					};
					if (I.f||o.setCapture) { //firefox4 support setCapture
						I.f = TRUE;
						o.setCapture()
					}
					K.on(dragTemp.d, H, dragMove)
					 .on(dragTemp.d, I, dragStop)
					 .on(dragTemp.w, BLUR, dragStop)
					 .on(o, LOSECAPTURE, dragStop)
					 .on(dragTemp.d,J, dragEvtHalt)
				}
			}
		},
		on: function(m, n, f, e, b, v, z, y) {
			/// <summary>add DOM event listen</summary>
			/// <param name="m" type="String|HTMLElement|Array">node or node ids</param>
			/// <param name="n" type="String|Array">event name</param>
			/// <param name="f" type="Function">listen method</param>
			/// <returns type="K" />
			//log(f);
			if (isFn(f)) {
				m = likeArr(m) ? m : [m];
				n = isArr(n) ? n : [n];
				y = m[A];
				e = !! e;
				while (y--) {
					v = K(m[y]);
					//log(v);
					if (v) {
						z = n[A];
						while (z--) {
							//!e && (b ? K.arrRemove : K.arrInsert)(Y, [v, n[z], f]);
							if (isW3C) {
								b ? v.removeEventListener(n[z], f, e) : v.addEventListener(n[z], f, e)
							} else if (v.attachEvent) {
								b ? v.detachEvent(_w + n[z], f) : v.attachEvent(_w + n[z], f)
							}/* else {
								v[_w + n[z]] = b ? Q : f
							}*/
						}
					}
				}
			}
			return K
		},
		un: function(m, n, f, e) {
			/// <summary>remove DOM event listen</summary>
			/// <param name="m" type="String|HTMLElement|Array">node or node ids</param>
			/// <param name="n" type="String">event name</param>
			/// <param name="f" type="Function">listen method</param>
			/// <returns type="K" />
			return K.on(m, n, f, e, TRUE)
		},
		evt: function(e, w, c, i, f) {
			/// <summary>get event object</summary>
			/// <param name="e" type="Event">event object</param>
			/// <param name="w" type="Window">Window object</param>
			w=w||W;
			e = e || w.event;
			if (!e) {
				c = K.evt;
				i = 32;
				try {
					while (i-- && c.caller) c = c.caller;
					if ((f = c.arguments[0]) instanceof w.Event) e = f
				} catch (x) {}
			}
			return e
		},
		evtCancel: function(e, w) {
			/// <summary>cancel bubble</summary>
			/// <param name="e" type="Event">event object</param>
			/// <param name="w" type="Window">Window object</param>
			e = K.evt(e, w);
			if (e){
				if(e.t = e.stopPropagation) e.t();
				e.cancelBubble = TRUE
			}
		},
		evtPrevent: function(e, w) {
			/// <summary>prevent default</summary>
			/// <param name="e" type="Event">event object</param>
			/// <param name="w" type="Window">Window object</param>
			e = K.evt(e, w);
			if (e){
				if(e.t = e.preventDefault) e.t();
				e.returnValue = FALSE
			}
		},
		evtXY: function(e, w, f, p, b,cx,cy) {
			/// <summary>event page xy</summary>
			/// <param name="e" type="Event">event object</param>
			/// <param name="w" type="Window">Window object</param>
			e = K.evt(e, w);
			cx=0;cy=0;
			if (e) {
				p = e.touches;//有移动对象
				if(p && !I.b){
					if (!p[A]) p = e.changedTouches;//如果是touchend取changed
					b = p[p[A] - 1];
				}
				e = I.b || b || e;
				b = W.isNaN(e.pageX);
				if (b) p = _d(w);
				cx=e.clientX;
				cy=e.clientY;
				f = {
					pageX: b ? cx + p.scrollX - p.x : e.pageX,
					pageY: b ? cy + p.scrollY - p.y : e.pageY,
					viewX:cx,
					viewY:cy
				}
			} else {
				f = {
					pageX: 0,
					pagey: 0,
					viewX:cx,
					viewY:cy
				}
			}
			return f
		},
		evtTarget: function(e, w, f) {
			/// <summary>get event target</summary>
			/// <param name="e" type="Event">event object</param>
			/// <param name="w" type="Window">Window object</param>
			e = K.evt(e, w);
			if (e) {
				f = e.target || e.srcElement;
				while (f && f.nodeType === 3) f = f.parentNode;
			}
			return f
		},
		evtHitest: function(e, w) {
			/// <summary></summary>
			/// <param name="" type=""></param>
			/// <param name="" type=""></param>
			e = K.evt(e, w);
			return e ? ((w = e.touches) && w[A])===1 || (e.which|e.button) === 1 : FALSE
		},
		/*invoke: function(f, o, a, r) {
			/// <summary>run method by string</summary>
			a = _q.call(arguments, 1);
			o = K.entity(f, TRUE);
			if (isFn(o)) {
				r = o.apply(K.entity(f.replace(/\.[^\.]*$/), TRUE), a);
			}
			return r
		},*/
		lock: function(a, b) {
			/// <summary>lock</summary> 
			/// <param name="a" type="Function">lock key</param> 
			/// <param name="b" type="Function">method</param> 
			if (!has(M, a)) {
				M[a] = b;
				isFn(b) && b()
			}
		},
		unlock: function(a) {
			/// <summary>unlock</summary> 
			/// <param name="a" type="Function">lock key</param> 
			delete M[a];
		},
		IO: clazz(ME, function(base,proto,clz,list,jsXHR,jsState,nvState,nvXHR,getTrans,_xhr){
			_xhr='return (on=window.XMLHttpRequest)?new on:new ActiveXObject("Microsoft.XMLHTTP")';
			getTrans=safeWrap(function(data,i,o){
				for(i=list[A]-1;i>-1;i--){
					o=list[i];
					if(o.adopt(data)){
						return {k:o.i||(o.i=K.guid()),c:o};
					}
				}
			});
			list=[
				nvXHR=Fun(),
				jsXHR=Fun()
			];
			jsState=/(?:4|d|te)$/;
			jsXHR.adopt=function(d){
				return d.jsonp;
			};
			MIX(jsXHR[P],{
				abort:function(m){//abort
					m=this;
					m.f&&(m.K[m.i]=noop);
					m.l();
				},
				l:function(m,n){
					m=this;
					n=m.n;
					m.f=FALSE;
					I50.un(m._);
					if(n){
						K.nodeDel(n);
						n.onload=n.onerror=noop;
						m.n=Q;
					}
				},
				send:function(r,b,w,m,n,e,g,t,x){
					m=this;
					m.i=K.guid();
					m.K=w.K;
					m.f=TRUE;
					x=w.document;
					e=x.body;
					n=K('script',{
						defer:'defer',
						id:m.i,
						charset:r.charset
					},Q,x);
					m.n=n;
					t={type:clz.JSONP};
					m._=function(){
						if(!g&&jsState.test(n.readyState)){
							t.error='uncalled';
							b(t);
							m.l();
						}
					};
					if(n.readyState){
						I50.on(m._);
					}
					n.onload=n.onerror=m._;
					m.K[m.i]=function(d){
						m.l();
						t.data=d;
						b(t);
						g=TRUE;
						delete m.K[m.i];
					};
					n.src=[r.url,(~r.url.indexOf('?')?'&':'?'),r.jsonp,'=K.',m.i].join(EMPTY);
					e.insertBefore(n,e.firstChild);
				}
			});
			nvState=/^(?:2\d{2}|304|1223|0)$/;
			nvXHR.adopt=function(){
				return TRUE
			};
			MIX(nvXHR[P],{
				abort:function(m){
					m=this;
					m.z&&m.z.abort();
					I50.un(m._);
				},
				send:function(r,b,g,m,p,x){
					m=this;
					if(!g.K[X])g.K[X]=Fun(_w,_xhr);
					if(!m.z)m.z=g.K[X]();
					m.z.open(r.method, r.url, r.async, r.un, r.pw);
					x=r.headers;
					for (p in x){
						if (has(x, p)){
							m.z.setRequestHeader(p, x[p]);
						}
					}
					m.z.send(r.data);
					I50.on(m._=function(s,r){
						if (m.z.readyState === 4 ) {
							s=m.z.status;
							r={
								xhr:m.z,
								type:clz.XHR,
								code:s,
								error:nvState.test(s)?EMPTY:s
							};
							I50.un(m._);
							b(r);
						}
					})
				}
			});
			MIX(clz,{
				END:EVT_END,
				XHR:'xhr',
				JSONP:'jsnp',
				addTrans:function(trans){
					if(!~K.arrFind(list,trans)){
						list.push(trans);
					}
				}
			});
			return {
				send: function(p, b, o, m, t) {
					/// <summary>send request</summary>
					/// <param name="p" type="Object">config object</param>
					/// <param name="b" type="Boolean">is insert to list head</param>
					t = this;
					if(!I50)I50=new K.TM(50);
					o = MIX({
						url: X,
						un: Q,
						pw: Q,
						timeout: 30000,
						start: noop,
						done: noop,
						data: EMPTY,
						global:W,
						method: p && p.data ? 'POST' : 'GET',
						jsonp:EMPTY,
						charset:'utf-8',
						async: TRUE
					}, p);
					o._e=safeWrap(o.done,o);
					o.headers = MIX({
						"Content-Type": "application/x-www-form-urlencoded"
					}, o.headers);
					K.arrInsert(t.q || (t.q = []), o, b ? Q : 0);
					!t._ && t.x()
				},
				x: function(t, r,q,g) {
					/// <summary>request</summary>
					t = this;
					r = t.q.pop();
					if (r) {
						safeWrap(r.start,r)();
						q=getTrans(r);
						if(q){
							t._=q=t[q.k]||(t[q.k]=new q.c());
						}
						t.v=W.setTimeout(function(){
							t.n();
							r._e({error:'timeout'});
							q.abort();//abort
						},r.timeout);
						try{
							g=r.global
							if(!g.K)g.K=Fun();
							q.send(r,function(xhr){
								t.n();
								r._e(xhr);
							},g);
						}catch(e){
							t.n();
							r._e({error:e.message});
						}
					} else {
						t.stop()
					}
				},
				n: function(t) {
					/// <summary>next one</summary>
					t = this;
					t.c();
					t.w = W.setTimeout(K.bind(t.x,t), 50)
				},
				c: function(f, o, t) {
					/// <summary>clear</summary>
					t = this;
					W.clearTimeout(t.v);
					if (f) {
						t._ && t._.abort();
						delete t._;
					}
				},
				stop: function(f, t) {
					/// <summary>stop all request</summary>
					/// <param name="f" type="Boolean">is not fire end event</param>
					t = this;
					W.clearTimeout(t.w);
					t.q = [];
					t.c(TRUE);
					!f && t.fire(EVT_END);
				}
			}
		}),
		TM: clazz({ //time meter 计时器
			ctor: function(p, b) {
				/// <summary>constructor method</summary>
				/// <param name="p" type="Integer">interval milliseconds</param>
				b = this;
				p = parseInt(p, 10) || 13;
				if (!$[p]) {
					b.l = [];
					b.p = p;
					b.c = function(i) {
						for (i = 0; b.l[i]; i++){
							b.l[i][X]();
						}
					}
					$[p] = b;
				}
				return $[p];
			},
			on: function(f, b) {
				/// <summary>add callback</summary>
				/// <param name="f" type="Function">callback</param>
				b = this;
				f[X]=safeWrap(f);
				b.l.push(f);
				if (!b.h) b.h = W.setInterval(b.c, b.p);
			},
			has:function(f){
				return ~K.arrFind(this.l,f)
			},
			un: function(f, b,i) {
				/// <summary>remove callback</summary>
				/// <param name="f" type="Function">callback</param>
				b = this;
				i=K.arrFind(b.l,f);
				//log(i);
				if(i>=0){
					b.l.splice(i,1);
					if (!b.l[A]) {
						W.clearInterval(b.h);
						delete b.h
					}
				}
			}
		}),
		FX: clazz(ME, {
			ctor: function(f, p, t) {
				/// <summary>constructor method</summary>
				/// <param name="f" type="Function">ani ALG method</param>
				t = this;
				if (!t.g || f) {
					f=isFn(f)?f:noop;
					t.g=function(from,to){
						return (from+(to-from)*f(t.t/t.a)).toFixed(3)
					}
				}
				if (!t.z) t.z = new K.TM(p)
			},
			run: function(m, c, p, f, t) {
				/// <summary>add a ani</summary>
				/// <param name="m" type="Integer">keep time</param>
				/// <param name="c" type="Function">callback(fx,param)</param>
				/// <param name="p" type="Object">callback param</param>
				/// <param name="f" type="Function">ALG</param>
				t = this;
				(t.q || (t.q = [])).push([m, c, f, p]);
				!t.m && t.n()
			},
			n: function(t, o) {
				/// <summary>process next</summary>
				t = this;
				t.o = o = t.q && t.q.shift();
				if (o) {
					t.ctor(o[2]);
					t.c = isFn(o[1]) ? o[1] : noop;
					t.a = o[0] || 1000;
					t.d = dateNow();
					!t.m && t.z.on(t.m = function(f) {
						t.t = dateNow() - t.d;
						if (t.t > t.a) f = t.t = t.a;
						try {
							t.c(t.g, t.o[3])
						} catch (e) {
							log(f = e, t.c)
						}
						f && t.n()
					});
				} else {
					t.stop();
				}
			},
			stop: function(f, t) {
				/// <summary>stop ani</summary>
				/// <param name="f" type="Boolean">is not fire end event</param>
				t = this;
				if (t.m && t.z) {
					t.z.un(t.m);
					delete t.m;
				}
				!f && t.fire(EVT_END);
			}
		},{
			END:EVT_END
		}),
		tpFill:function(node,tmplIdOrString,subKey,data,doc){
			K.nodeVal(node,K.tpFilled(tmplIdOrString,subKey,data),doc);
		},
		tpFilled:function(tmplIdOrString,subKey,data,doc,node,uniqueId,uKey,tmpl,tempArr,tempObject){
			/// <summary>get the filled string</summary>
			/// <param name="d" type="Object">src data</param>

			if(!isStr(subKey)){
				data=subKey;
				subKey=EMPTY;
			}
			uniqueId = (node = K(tmplIdOrString)) ? tmplIdOrString : likeArr[tmplIdOrString] || (likeArr[tmplIdOrString] = K.guid()); //if node get node id as key else generate one
			uKey = [uniqueId, subKey].join(X); //generate unique key to cache result


			if (!has(cloneHelper, uKey)) { //not exist
				tmpl = node ? K.nodeVal(tmplIdOrString,Q,doc) : tmplIdOrString; //is node ,get value
				tmpl = tmpl.replace(/\s+/g,SPACE); //trim blank
				if (tmpl && subKey) { //exist templet and sub templet 
					subKey=K.strReg(subKey);
					tmpl = tmpl.match(RegExp('<' + subKey + '>([\\s\\S]*?)</' + subKey + '>')); //get sub templet
					if (!tmpl) T.error('no tpl:' + subKey); //not exist
					tmpl = tmpl[1]; //use sub templet
				}

				tempArr = [];
				$K = $K || /([\s\S]*?)(?:<#(=)?([\s\S]*?)#>|$)/g;
				$L = $L || /\\'/g;
				$M = $M || /@/g;

				tempObject = {
					m:K.guid(),
					d:K.guid()
				};
				tmpl.replace($K, function(m, g1, g2, g3) {
					g1 && tempArr.push(";",tempObject.m,".push('", g1.replace($L, '\\$&'), "');");
					g3 && tempArr.push(g2 ? ';'+tempObject.m+'.push(' : EMPTY, g3.replace($M,tempObject.d+'.'), g2 ? ');' : EMPTY);
				});
				tempArr.push(';return ',tempObject.m,'.join("")');
				tempObject.s=tempArr.join(EMPTY);
				cloneHelper[uKey] = tempObject
			} else {
				tempObject = cloneHelper[uKey]
			}
			try {
				//log(a);
				if (!tempObject.f) tempObject.f = Fun(tempObject.m,tempObject.d,tempObject.s);
				tempObject = tempObject.f([],data||{})
			} catch (e) {
				log(e,tempObject);
				tempObject = ['ex:', e.message, ',src:', K.strHTML(tempObject.s)].join(EMPTY)
			}
			return tempObject;
		}
	});
	W.K = K; //.on(W, 'unload', K.evtClean)//;//.go()
});