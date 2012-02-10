/*
    core local storage
    js local storage control
*/
(function(W,D){
	var E=D.documentElement,
		T=W.T,
		OP=Object.prototype,
		t=OP.toString,
		s=Array.prototype.slice,//mapping
		ia=function(a){return t.call(a)=='[object Array]'},//is array
		im=function(a){return t.call(a)=='[object Function]'},//is method
		has=OP.hasOwnProperty,
		verFile = 'T.FVS',
		selfNode=D.getElementsByTagName('script'),
		log=function(){
			var a=W.console,b=arguments;
			if(a&&a.log){
				a.log.apply?a.log.apply(a,b):a.log(s.call(b))
			}
		},
		getParam=function(key,str,reg,r){//query form string
			reg=new RegExp('(?:^|&)' + key + '=([^&]*)(?:&|$)','i');
			r=str.match(reg);
			return r?r[1]:'';
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
		curScript=selfNode[selfNode.length-1],
		rootPath=curScript.src.replace(/[^\?#&]+$/,'').replace(/[^\/]+$/,''),
		scriptCfg=curScript.getAttribute("data-cfg"),
		coreList=getParam('k',scriptCfg),
		depsReg=/:\[([^\]]+)\]@/,
		verReg=/^[^@]+@/,
		scriptLoadedReg=/(?:4|d|te)$/,
		U=true,
		timer=function(f, t, b, g, a,z){//wrap timer
			a = s.call(arguments, 4);
			f = im(f) ? f : noop;
			t=t||8;
			z=function(){f.apply(g,a)};
			return b ? W.setInterval(z,t) : W.setTimeout(z,t)
		},
		mix=function(a,b,p){
			for(p in b){
				a[p]=b[p]
			}
		},
		ready=function(f){
			im(f)&&tryRun(f);
			return T;
		},
		WT=function(keys,m){m=this;m.k=keys||[];m.z=WT.i++;WT.$[m.z]=m;},
		loader=function(param,uniqueKey,callback,isCode,a,f){
			if (has.call(loader,uniqueKey)) {//if exist in the cache
				if(loader[uniqueKey]===U){//if load succ
					timer(WT.d,50,0,WT);
				}
			} else {
				loader[uniqueKey] = noop;//push current callback to the list
				$JCounter++;
				a = D.createElement('script')
				a.type='text/javascript';
				a.defer='defer';
				a.charset='UTF-8';
				a.id='r_s_k_'+(WT.i++);
				a.async=U;
				f = function () {
					if (scriptLoadedReg.test(a.readyState)) {
						clearInterval(t._);
						a.onerror = a.onload = null;
						E.removeChild(a);
						timer(callback);
					}
				};
				if(a.readyState)t._ = timer(f, 50, U);//opera load not exist file bug , use setInterval fix it 
				a.onerror = a.onload = f;
				if(isCode)a.text='try{('+param+'())}catch(e){}document.getElementById("'+a.id+'").onload()';
				else a.src=param;
				E.insertBefore(a,E.firstChild);
			}
		},
		getFileInfo=function(f,r){
			if(f==verFile)r={h:innerT._F};
			return r||innerT._V&&innerT._V[f]||{h:xver};
		},
		getFilePath=function(f,v){
			v=getFileInfo(f);
			if(innerT._I&&f!=verFile)f=f.replace(/\./g,'/');
			return (v.p||rootPath)+(innerT._M.replace(/#k/g,f).replace(/#v/g,v.h||xver));
		},
		innerT={},
		main=location.hostname,
		nowTime=new Date().getTime(),
		xver=nowTime.toString(32),
		store, engine,engines,cache;//control file versions name,storage prefix;
	if(!T){//if not exist Ctrl
		cache=getParam('che',scriptCfg)=='true';//recognize need cache
		mix(innerT,{
			_M:getParam('fmt',scriptCfg)||'#k.js?v=#v',//load js file format
			_I:getParam('sis',scriptCfg)=='true',//the period is path segmentation
			_F:getParam('cfv',scriptCfg)||xver
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
		for(cache in T){
			if(/^_[MIF]$/.test(cache)){
				innerT[cache]=T[cache];
				delete T[cache];
			}
		}
		cache=T.cache;
	}
	mix(WT,{
		i:0,
		$:{},
		L:{},
		d:function(m,p,k,f){
			m=this;
			for(p in m.$){
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
		n:function(k){
			timer(function(){
				if($R[k]!==U){
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
		l:function(key,values,pu,arr,idx,tKey,tV){
			if(!ia(WT.L[key]))WT.L[key]=[];
			arr=[];
			if(ia(values)){
				if(!pu)WT.L[key]=WT.L[key].concat(values);
				for(idx=0;idx<values.length;idx++){
					tKey=values[idx];
					if(tKey==key){
						arr.push(key);
					}else{
						tV=WT.l(key,WT.L[tKey],U);
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
				if(j){
					for(i=0;i<j;i++){
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
	//set domain ,globalStorage need it, force the domain 
	tryRun(function(){
		D.domain=main;
        D.domain=main.split('.').slice(-2).join('.');
	});
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
		'2': {
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
		},
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
		r=has.call(log,f)&&log[f];
		if(!r){
			v=engine.get(f);
			if(v&&new RegExp('^'+getFileInfo(f).h+':').test(v)){
				z=v.match(depsReg);
				r={c:v.replace(verReg,''),d:z&&z[1].split(',')||[]};
			}
			log[f]=r;
		}
		return r;
	},runOne=function(host,p,fn,temp){//run one file
		//idx=p.lastIndexOf('/');
		p=p.substring(p.lastIndexOf('/')+1);//depart the path and file
		host.a(p);
		temp=getContent(p);
		if(temp){
			fn=function(){loader(temp.c,p,function(){WT.n(p)},U)};
			runFiles(temp.d,fn);
		}else{
			loader(getFilePath(p),p,function(){timer(function(){if(!log[p+'_'])WT.n(p)},50)});
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
		DOMAIN:D.domain,
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
			r=getContent(f);
			if(r){
				if(r.d&&r.d.length){
					for(i=0;i<r.d.length;i++){
						z=T.isCached(r.d[i]);
						if(!z)return z;
					}
				}
				z=U;
			}
			return z;
		},
		cache:function(key,dps,value,fn){
			/// <param name="key" type="String">cache key,same as file name</param>
			/// <param name="value" type="Function">cache content,is a function</param>
			log[key+'_']=U;
			if(!ia(dps))dps=[];
			fn=WT.l(key,dps);
			if(fn)throw new Error(fn+' @ '+key);
			runFiles(dps,function(){
				WT.n(key);
				value(); //exec succ then cache it,avoid cache a error file and read it next time
				cache&&engine.set(key, getFileInfo(key).h + ':['+dps+']@'+ value);
			});
		}
	});
	/*startup*/
	runFiles(verFile,function(){
		innerT._V=T._V;
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