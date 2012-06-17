/*
    core local storage
    js local storage control
*/
(function(W,D){
	var E=D.documentElement,
		EMPTY='',
		T=W.T,
		OP=Object.prototype,
		t=OP.toString,
		s=Array.prototype.slice,//mapping
		ia=function(a){return t.call(a)=='[object Array]'},//is array
		im=function(a){return t.call(a)=='[object Function]'},//is method
		has=OP.hasOwnProperty,
		verFile = 'T.FVS',
		//scriptNodes=D.getElementsByTagName('script'),
		log=function(){
			var a=W.console,b=arguments;
			if(a&&a.log){
				a.log.apply?a.log.apply(a,b):a.log(s.call(b))
			}
		},
		paramFrom=function(key,str,reg,r){//query form string
			reg=new RegExp('(?:^|&)' + key + '=([^&]*)(?:&|$)','i');
			r=str.match(reg);
			return r?r[1]:EMPTY;
		},
		noop=function(){
		},
		tryRun=function(f,i){
			if(!ia(f))f=[f];
			for(i=0;i<f.length;i++){
				try{
					f[i]();
				}catch(e){
					log(e,f[i]);
				}
			}
		},
		watchList=[],
		$R={},
		$JCounter=0,
		$RCounter=0,
		runWatch=function(f,i,j,o,y){
			for(i=0;watchList[i];i++){
				j=1;
				o=watchList[i];
				if(!ia(o[0]))o[0]=[o[0]];
				for(y=0;o[0][y];y++){
					if(loader[o[0][y]]===U){
						o[0].splice(y--,1);
					}else{
						j=0;
						break;
					}
				}
				if(j||(f&&!o[2])){
					//log(o);
					tryRun(o[1]);
					watchList.splice(i--,1);
				}
			}
		},
		watch=function(w,f,fw){
			watchList.push([w,f,fw]);
			runWatch(WT._);
			return T
		},
		curScript=D.getElementById('t_js'),//scriptNodes[scriptNodes.length-1],
		rootPath=curScript.src.replace(/[^\/]+$/,EMPTY),
		scriptCfg=curScript.getAttribute("data-cfg"),
		coreList=paramFrom('k',scriptCfg),
		depsReg=/:\[([^\]]+)\]@/,
		verReg=/^[^@]+@/,
		scriptLoadedReg=/(?:4|d|te)$/,
		jsCssReg=/\.(?:js|css)$/i,
		cssReg=/\.css$/i,
		//levelReg=/\.[^\.]*$/,
		U=true,
		timer=function(f, t, b, g, a,z){//wrap timer
			a = s.call(arguments, 4);
			f = im(f) ? f : noop;
			t=t||8;
			z=function(){f.apply(g,a)};
			return b ? W.setInterval(z,t) : W.setTimeout(z,t)
		},
		clsTimer=function(a){
			W.clearInterval(a);
			
			W.clearTimeout(a);
		},
		mix=function(a,b,p){
			for(p in b){
				a[p]=b[p]
			}
			return a;
		},
		ready=function(f){
			im(f)&&tryRun(f);
			return T;
		},
		WT=function(keys,m){m=this;m.k=keys||[];m.z=WT.i++;WT.$[m.z]=m;},
		
		loader=function(param,uniqueKey,callback,isCode,isCss,isOuter,nodeId,tId,callCb,head,em,tmer,cb,ttmer){
			tId=isCode?'K'+(nowTime++):param
			if(!uniqueKey)uniqueKey=tId;
			if(!nodeId)nodeId=tId;

			if (has.call(loader,uniqueKey)) {//if exist in the cache
				if(loader[uniqueKey]===U){//if load succ
					//timer(callback);//
					isOuter?timer(callback):timer(WT.d,50,0,WT);
				}else if(isOuter){
					loader[uniqueKey].push(callback);
				}
			} else {
				loader[uniqueKey]=isOuter?[callback]:noop;//push current callback to the list
				$JCounter++;
				head=D.getElementsByTagName('head');
				head=head?head[0]:E;
				callCb=function(){
					if(isOuter){
						while(loader[uniqueKey].length){
							timer(loader[uniqueKey].shift());
						}
					}else{
						timer(callback);
					}
				};
				if(isCss){
					em=D.getElementById(nodeId);
					em&&head.removeChild(em);
					if(isCode){
						em=D.createElement('style');
						em.type='text/css';
						em.id=nodeId;
						if(em.styleSheet){
							em.styleSheet.cssText=param;
						}else{
							em.innerHTML=param;
						}
						head.insertBefore(em,null);
						log(em);
					}else{
						
						em=D.createElement('link');
						em.type='text/css';
						em.charset='UTF-8';
						em.rel='stylesheet';
						em.id=nodeId;
						em.href=param;
						head.insertBefore(em,null);
						//log(em.sheet);
					}

					cb=function(){
						clsTimer(tmer);
						clsTimer(ttmer);
						callCb();
						loader[uniqueKey]=U;
					};
					tmer=timer(function(){
						//log('try');
						try{
							//log(em.styleSheet,em.sheet.cssRule);
							if(em.styleSheet||em.sheet){
								cb();
							}
						}catch(e){
							//log(e);
							cb();
						}
					},50,1);
					ttmer=timer(cb,3E4,0,cb,U);
					
				}else{
					em = D.createElement('script')
					em.type='text/javascript';
					em.defer='defer';
					em.charset='UTF-8';
					em.id=nodeId;
					em.async=U;
					cb = function (f) {
						if (f===U||scriptLoadedReg.test(em.readyState)) {
							clsTimer(tmer);
							clsTimer(ttmer);
							em.onerror = em.onload = null;
							//log(em,em.href);
							head.removeChild(em);
							callCb();
						}
					};
					ttmer=timer(cb,3E4,0,cb,U);
					if(em.readyState)tmer= timer(cb, 50, U);//opera load not exist file bug , use setInterval fix it 
					em.onerror = em.onload = cb;
					if(isCode)em.text='try{'+param+'}catch(e){T.log(e)}document.getElementById("'+nodeId+'").onload()';
					else em.src=param;
					head.insertBefore(em,null);
				}

				
			}
		},
		getFileInfo=function(f,r,v,s,t){
			s=cssReg.test(f);
			f=f.replace(jsCssReg,'');

			if(f==verFile)r={h:innerT._F,f:f};
			t={f:f};

			v=innerT._V;
			if(v&&v.J&&v.S){
				if(!s&&v.J[f]&&v.S[f]){
					throw 'file:'+f+' discrepancy';
				}
				if(!v.J[f]&&!v.S[f]){
					log('not found:'+f);
					r=t;
				}
				if(!r){
					r=s?v.S[f]:v.J[f]||(s=U,v.S[f]);
					if(s)r.s=s;
					r.f=f;
				}
			}
			return r||t;
		},
		getFilePath=function(i,v,m){			
			v=i||getFileInfo(f);
			if(innerT._I&&f!=verFile)v.f=v.f.replace(/\./g,'/');
			m=v.s?innerT._S:innerT._M;
			return (v.p||rootPath)+(m.replace(/#k/g,v.f).replace(/#v/g,v.h||xver));
		},
		innerT={},
		//main=location.hostname,
		nowTime=new Date().valueOf(),
		xver=nowTime.toString(32),
		store, engine,engines,cache;//control file versions name,storage prefix;
	if(!T){//if not exist Ctrl
		cache=paramFrom('che',scriptCfg)=='true';//recognize need cache
		mix(innerT,{
			_M:paramFrom('js_fmt',scriptCfg)||'#k.js?v=#v.js',//load js file format
			_S:paramFrom('css_fmt',scriptCfg)||'#k.css?v=#v.css',
			_I:paramFrom('sis',scriptCfg)=='true',//the period is path segmentation
			_F:paramFrom('cfv',scriptCfg)||xver
		});
		W.T=T={//
			using:function(p,f){//
				if(!T.$r)T.$r=[];
				T.$r.push([p,f]);
				return T
			},
			coreReady:function(f){//
				if(!T.$c)T.$c=[];
				T.$c.push(f);
				return T
			},
			allReady:function(f){//
				if(!T.$a)T.$a=[];
				T.$a.push(f);
				return T
			},			
			publish:function(o){//
				if(!T._L)T._L={};
				mix(T._L,o);
				return T
			}
		};
	}else{
		if(ia(T.$w)){
			watchList=watchList.concat(T.$w);
			delete T.$w;
		}
		cache=T.cache;
	}
	mix(WT,{
		i:0,
		$:{},
		L:{},
		d:function(m,p,k,f){
			m=this;
			for(p in m.$){//m.$ keep the entities of WT
				//log(p);
				m.$[p].r()
			}
			//log('wt count:',m.c);
			m._=f=$JCounter==$RCounter;
			//log('loader',$JCounter,'$R',$RCounter,f);
			/*for(p in loader){
				if(loader[p]!=U){
					WT._=f=U;
					break;
				}
			}*/
			//log(f);
			runWatch(f);
			if(f){//run allReady methods
				T.allReady=ready;
				if(T.$a){
					tryRun(T.$a);
					delete T.$a;
				}
			}
		},
		n:function(k){//notify one ready
			timer(function(){
				if($R[k]!==U){//$R save how many files loaded
					loader[k]=U;
					$R[k]=U;
					$RCounter++;
					//var a=[];
					//for(var p in $R)a.push(p);
					//log(a);
					if(im(T.onload)){
						tryRun(function(){
							T.onload(k,$R);
						});
					}
				}
				WT.d(k);
			},50);
		},
		l:function(key,values,pu,arr,idx,tKey,tV){//check circle reference
			if(!ia(WT.L[key]))WT.L[key]=[];//save key depend list
			arr=[];
			if(ia(values)){//is array
				if(!pu)WT.L[key]=WT.L[key].concat(values);//save the key depends
				for(idx=0;idx<values.length;idx++){//test depend
					tKey=values[idx];//
					if(tKey==key){//find same
						arr.push(key);//push
					}else{
						tV=WT.l(key,WT.L[tKey],U);//test next key
						if(tV)arr.push(tKey,tV);
					}
				}
			}
			return arr.join('>');
		},
		prototype:{
			r:function(m,i,j){
				m=this;
				j=m.k.length;
				if(j){//if !j the list of current depend is ready
					for(i=0;i<j;i++){
						//log(m.k,loader[m.k[i]]);
						if(loader[m.k[i]]===U){
							j--;
							m.k.splice(i--,1);
						}
					}
				}
				if(!j){
					//log('rm:',m.z,m.f);
					//WT.c--;
					im(m.f)&&m.f();
					delete WT.$[m.z];
				}
			},
			a:function(k){
				this.k.push(k);
			}
		}
	});
	//window.WT=WT;
	//window.loader=loader;
	//set domain ,globalStorage need it, force the domain 
	/*tryRun(function(){
		D.domain=main;
        D.domain=main.split('.').slice(-2).join('.');
	});*/
	engines = {//local storage engine
		'0': {
			_: function () {
				store = W.localStorage;
				return store;
			},
			get: function (key) {
				return store.getItem(key);
			},
			set: function (key, value) {
				store.setItem(key, value);
			},
			del: function (key) {
				store.removeItem(key);
			}
		},
		/*'2': {
			_: function () {
				store = W.globalStorage[D.domain];
				return store;
			},
			get: function (key) {
				return store.getItem(key).value;
			},
			set: function (key, value) {
				store.setItem(key, value);
			},
			del: function (key) {
				store.removeItem(key);
			}
		},*/
		'1': {
			_: function () {
				store = E;
				store.addBehavior('#default#userdata');
				return U
			},
			get: function (key) {
				//try {
					store.load(key);
					return store.getAttribute(key);
				//} catch (ex) {
					//return '';
				//}
			},
			set: function (key, value) {
				store.load(key);
				//alert(key);
				store.setAttribute(key, value);
				//alert('set '+key);
				store.save(key);
			},
			del: function (key) {
				store.load(key);
				//store.removeAttribute();
				store.expires = nowTime.toUTCString();
				store.save(key);
			}
		}
	};
	for (var i = 0,f; i<3; i++) {
		engine = engines[i];
		try{
			f=engine._();
		}catch(e){}
		if (f) {
			delete engine._;
			break;
		} else {
			engine = 0;
		}
	}
	if(!engine){
        engine = {
            get: noop,
            set: noop,
            del: noop
        }
    }
	var vf,getContent=function(f,v,z,r){//get cache content
		r=has.call(paramFrom,f)&&paramFrom[f];
		if(!r){
			v=engine.get(f);
			if(v&&new RegExp('^'+getFileInfo(f).h+':').test(v)){
				z=v.match(depsReg);
				r={c:v.replace(verReg,''),d:z&&z[1].split(',')||[]};
			}
			paramFrom[f]=r;
		}
		return r;
	},runOne=function(host,p,fn,temp,info){//run one file
		//idx=p.lastIndexOf('/');
		//p=p.substring(p.lastIndexOf('/')+1);//depart the path and file
		host.a(p);
		temp=getContent(p);
		info=getFileInfo(p);
		if(temp){
			fn=function(){loader('('+temp.c+'())',p,function(){WT.n(p)},U)};
			runFiles(temp.d,fn);
		}else{
			loader(getFilePath(info),p,function(){timer(function(){if(!mix[p])WT.n(p)},50)},0,info.s);//!mix see cache if not set ,not call cache method
		}
	},runFiles=function(p,f,wt,idx){//run more than one files
		if(!ia(p))p=[p];
		if(p.length){
			wt=new WT();
			wt.f=function(){tryRun(f)};
			for(idx=0;idx<p.length;idx++){
				runOne(wt,p[idx]);
			}
		}else{
			tryRun(f);
		}
	},coreCallback=function(){//core file callback
		T.coreReady=ready;
		if(T.$c){//core file ready,run coreReady methods
			tryRun(T.$c);
			delete T.$c;
		}
	};
	mix(T,{
		Store:engine,
		observe:watch,
		log:log,
		//:D.domain,
		invoke:function(a,i,f,z){
			if(ia(a)){
				for(i=0;i<a.length;i++){
					f=T.invoke(a[i]);
				}
				return f;
			}
			z=T._L;
			f=!U;
			if(z&&im(z[a])){
				f=z[a].apply(z,s.call(arguments,1));
			}
			return f;
		},
		isCached:function(f,r,i,z){
			r=loader[f]||getContent(f);
			if(r){
				if(r.d&&r.d.length){
					for(i=0;i<r.d.length;i++){
						z=T.isCached(r.d[i]);
						if(!z)return z;
					}
				}
				z=U;
			}else{
				z=!U;
			}
			return z;
		},
		cache:function(key,dps,value,fn){
			/// <param name="key" type="String">cache key,same as file name</param>
			/// <param name="value" type="Function">cache content,is a function</param>
			mix[key]=U;
			if(!ia(dps))dps=[];
			fn=WT.l(key,dps);
			if(fn)throw new Error(fn+' @ '+key);
			//log(dps);
			runFiles(dps,function(){
				WT.n(key);
				value(); //exec succ then cache it,avoid cache a error file and read it next time
				cache&&engine.set(key, getFileInfo(key).h + ':['+dps+']@'+ value);
			});
		},
		load:function(ops,df){
			df=mix({
				type:'css',
				url:EMPTY,
				code:EMPTY,
				id:EMPTY,
				done:noop
			},ops);//loader=function(param,uniqueKey,callback,isCode,isCss,isOuter,callCb,head,em,tmer,cb,ttmer){
			loader(df.url||df.code,EMPTY,df.noop,df.code,df.type=='css',U,df.id);
		}
	});
	/*startup*/
	runFiles(verFile,function(c){
		innerT._V=T._V;
		for(c in T){
			if(/^_[MIFVS]$/.test(c)){
				innerT[c]=T[c];
				if(cache)delete T[c];
			}
		}
		//delete T._V; //if hide more info then delete it
		runFiles(coreList&&coreList.split(',')||[],coreCallback);
		T.using=function(p,f){
			runFiles(p,f);
			return T;
		};
		if(T.$r){
			for(var i=0;i<T.$r.length;i++){//core file ready run require file 
				runFiles(T.$r[i][0],T.$r[i][1]);
			}
			delete T.$r;
		}
	});
}(window,document));