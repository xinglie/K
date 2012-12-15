/*
    core local storage
    js local storage control
*/
(function(W,D){
	var E=D.documentElement,
		SS=D.styleSheets,
		EMPTY='',
		COMMA=',',
		DOCHEAD,
		T=W.T,
		T50=50,
		OP=Object.prototype,
		t=OP.toString,
		s=Array.prototype.slice,//mapping
		get=function(a){return a&&a.nodeType?a:D.getElementById(a)},
		ia=function(a){return~t.call(a).indexOf('Arr')},//is array
		im=function(a){return~t.call(a).indexOf('Fun')},//is method
		has=function(a,b){
			if(!a)return FALSE;
			return OP.hasOwnProperty.call(a,b);
		},
		//scriptNodes=D.getElementsByTagName('script'),
		log=function(){
			var a=W.console,b=arguments,c;
			if(a&&(c=a.log)){
				c.apply?c.apply(a,b):c(s.call(b))
			}
		},
		paramObj={},
		noop=function(){
		},
		delFromObj=function(o,k){
			delete o[k];
		},
		throwError=function(m){
			throw Error(m);
		},
		safeWrap=function(f,o,dv){
			return function(){
				try{
					return f.apply(o,arguments)
				}catch(e){
					log(e,f);
				}
				return dv;
			}
		},
		safeExec=function(f,a,i,r,e){
			if(!ia(f))f=[f];
			if(!ia(a))a=[a];
			for(i=0;i<f.length;i++){
				try{
					e=f[i];
					r=im(e)&&e.apply(e,a);
				}catch(x){
					log(e,x);
				}
			}
			return r
		},
		watchResList=[],
		curScript=get('t_js'),//scriptNodes[scriptNodes.length-1],
		rootPath=curScript.src.replace(/[^\/]+$/,EMPTY),
		scriptCfg=curScript.getAttribute("data-cfg")+EMPTY,
		//coreList=paramObj('k',scriptCfg),
		depsReg=/<([^>]*)>/,
		verReg=/^[^>]+>/,
		resLoadedReg=/(?:4|d|te)$/,
		jsCssReg=/\.(?:js|css)$/i,
		cssReg=/\.css$/i,
		holderReg=/\.[^\.]*$/,
		pathReg=/\/[^\/]+?\/\.{2}\/|([^:\/])\/\/+/,
		//dotReg=/\./g,
		$kReg=/#k/g,
		$vReg=/#v/g,
		TRUE=!EMPTY,
		FALSE=!TRUE,
		setTimeout=W.setTimeout,
		clearTimeout=W.clearTimeout,
		T50FE=function(isRemove,fn,idx,one){
			for(idx=0;idx<T50F.q.length;idx++){
				one=T50F.q[idx];
				if(isRemove){
					if(one===fn){
						T50F.q.splice(idx,1);
						break;
					}
				}else{
					//alert('xx>'+one);
					one();
				}
			}
		},
		T50F=function(fn,flag,idx){
			if(!T50F.q)T50F.q=[];
			if(!T50F.t)T50F.t=W.setInterval(T50FE,T50);
			if(flag){
				//alert(T50F.q.length);
				T50FE(flag,fn);
				if(!T50F.q.length){
					W.clearInterval(T50F.t);
					delFromObj(T50F,'t');
				}
			}else{
				T50F.q.push(fn);
			}
		},
		mix=function(a,b,p){
			for(p in b){
				if(has(b,p)){
					a[p]=b[p]
				}
			}
			return a;
		},
		WT=function(keys,m){m=this;m.k=keys||[];m.z=WT.i++;WT.$[m.z]=m;WT.c++},
		
		loader=function(param,uniqueKey,callback,isCode,isCss,isOuter,cs,tId,callCb,em,cb,preEm,needLoad,tempFn){
			cs=cs||'UTF-8';
			tId=isCode?'T'+(nowTime++):param
			if(!uniqueKey)uniqueKey=tId;
			//if(isOuter)alert(uniqueKey+','+!uniqueKey+','+tId+','+isCss);
			//if(!uniqueKey)uniqueKey=tId;

			if (has(loader,uniqueKey)&&loader[uniqueKey]!==T50F) {//if exist in the cache
				/*
					if loader[uniqueKey] === noop
						then
							do not load it
							it will be fired in WT.d;
					end if
				*/
				/**
					if(!has&&has===T50F){
	
					}else if(loader[])
				*/
				if(loader[uniqueKey]===TRUE){//if load succ
					//log(uniqueKey,"is ready")
					if(mix[uniqueKey]===TRUE){
						setTimeout(WT.d,T50);
					}else{
						needLoad=TRUE;
					}
				}else if(isOuter){
					loader[uniqueKey].push(callback);
				}
			}else{
				needLoad=TRUE;
			}

			if(needLoad) {
				//log('loader uniqueKey',uniqueKey);
				loader[uniqueKey]=[callback];//push current callback to the list
				//$JCounter++;
				//log(loader[uniqueKey],uniqueKey);
				DOCHEAD||(DOCHEAD=(D.head||D.getElementsByTagName('head')[0]));
				//log('qyu',isOuter,uniqueKey,loader[uniqueKey],isOuter?[callback]:noop);
				callCb=function(){
					if(loader[uniqueKey]!=T50F){//callCb会在文件内的代码执行完后再执行，有可能文件内的代码执行出错
						safeExec(loader[uniqueKey],uniqueKey);
					}
					//if(isOuter)alert(uniqueKey);
					if(isOuter)delFromObj(loader,uniqueKey);
				};
				em=D.createElement(isCss?(isCode?'style':'link'):'script');
				em.charset=cs;

				if(isCss){
					preEm=get(uniqueKey);
					if(preEm){
						preEm.id=EMPTY;
					}
					//T.log('start new em');
					
					em.type='text/css';

					//T.log('em',em,isCode);
					if(isCode){
						//alert(em.styleSheet);
						if(em.styleSheet){
							em.styleSheet.cssText=param;
						}else{
							em.innerHTML=param;
						}
					}else{
						em.rel='stylesheet';
						if(!has(T50FE,'$')){
							T50FE.$=!('onload' in em);
						}
					}
					

					//T.log('enter here');
					cb=function(f){
						//log(arguments.callee.caller);
						//T.log(arguments);
						//if (f===TRUE||resLoadedReg.test(em.readyState)) {
							T50F(tempFn,TRUE);
							//clsTimer(ttmer);

							em.onerror = em.onload = null;
							if(preEm){
								DOCHEAD.removeChild(preEm);
							}
							//preEm&&preEm.parentNode.removeChild(preEm);
							//log(callCb);
							setTimeout(callCb,T50);
							
							if(f!==TRUE&&!isOuter){
								mix[uniqueKey]=TRUE;
								WT.d(uniqueKey,{safety:TRUE,dps:[],name:uniqueKey});
							}
						//}
					};
					tempFn=function(idx,file,node){
						//log(SS.length);
						for(idx=SS.length-1;idx>=0;idx--){
							file=SS[idx];
							node=file.ownerNode||file.owningElement;
							//log(node,SS.length,file);
							if(node&&node.id==uniqueKey){
								//log(node.href);
								try{
									//log();
									cb(file.cssRules);
								}catch(e){
									//log(e);
									if(T50FE.$&&e.code==18)cb();
								}
								break;
							}
						}
						//log('pull',SS.length);
					}
					if(isCode){
						cb();
					}else{

						em.onload=em.onerror=cb;
						//alert('bf>'+tempFn);
						T50F(tempFn);

						em.href=param;

						//log(param);
					}
				}else{

					em.defer='defer';
					//em.async=TRUE;
					cb = function () {
						//log(f,em.readyState,resLoadedReg.test(em.readyState),em.src);
						if (resLoadedReg.test(em.readyState)) {
							T50F(cb,TRUE);
							//clsTimer(ttmer);
							em.onerror = em.onload = null;
							//log(em,em.hef);
							DOCHEAD.removeChild(em);
							setTimeout(callCb,T50);
						}
					};
					if(em.readyState){
						//alert('bf>'+cb);
						T50F(cb);//opera load not exist file bug , use setInterval fix it 
					}
					em.onerror = em.onload = cb;
					//log(cb,param);
					if(isCode){
						em.text='try{'+param+'}catch(e){T.log(e)}T("'+uniqueKey+'").onload()';
					}else{
						em.src=param;
					}
				}
				em.id=uniqueKey;
				DOCHEAD.appendChild(em);
				
			}
		},
		getFileInfo=function(f,r,v,s,t,m){
			if(has(im,f))return im[f];
			//log('getFileInfo',f);
			//W.$$im=im;
			s=cssReg.test(f);
			f=f.replace(jsCssReg,EMPTY);
			//log(innerT._C);
			t=f===innerT._C?{h:innerT._F}:{s:s};
			v=innerT._V;
			if(v&&v.J&&v.S){
				if(!s&&v.J[f]&&v.S[f]){
					throwError('conflict:'+f);
				}
				if(!v.J[f]&&!v.S[f]){
					log('unfound:'+f);
					r=t;
				}
				if(!r){
					r=s?v.S[f]:v.J[f]||(s=TRUE,v.S[f]);
					r.s=s;
				}
			}
			r=r||t;
			m=r.s?innerT._S:innerT._M;
			t=rootPath+(r.p||EMPTY);
			while(pathReg.test(t))t=t.replace(pathReg,'$1/');
			r.u=t;
			r.p=t+m.replace($kReg,f).replace($vReg,r.h||xver);
			//log(r.p,r.u);
			return im[f]=r;
		},
		innerT={},
		//main=location.hostname,
		nowTime=+new Date(),
		xver=nowTime.toString(32),
		store, engine,cache;//control file versions name,storage prefix;
	//W.$mix=mix;
	//W.$loader=loader;
	if(!T){//if not exist Ctrl
		scriptCfg.replace(/([^=&]+)=([^&]*)/g,function(m,a,b){
			paramObj[a]=b;
		});
		//log(paramObj);
		cache=paramObj.c=='1';//recognize need cache
		mix(innerT,{
			_M:paramObj.jf,//load js file format
			_S:paramObj.sf,
			//_I:paramObj.sis=='1',//the period is path segmentation
			_F:paramObj.cfv||xver,
			_C:paramObj.cf
		});
		W.T=T=get;
		mix(T,{//
			use:function(p,f){//
				if(!T.$r)T.$r=[];
				T.$r.push([p,f]);
				return T
			},
			idle:function(f){//
				if(!T.$a)T.$a=[];
				T.$a.push(f)
			},
			publish:function(o){//
				if(!T._L)T._L={};
				mix(T._L,o);
				return T
			}
		});
	}else{
		if(ia(T.$w)){
			watchResList=watchResList.concat(T.$w);
		}
		delFromObj(T,'$w');
		cache=T.cache;
	}
	mix(WT,{
		i:0,
		c:0,
		$:{},
		L:{},
		d:function(k,e,p){
			setTimeout(function(){
				if(k){
					loader[k]=TRUE;
				}
				if(e&&!has(ia,k)){
					ia[k]=TRUE;
					safeExec(watchResList,e);
				}
				for(p in WT.$){//m.$ keep the entities of WT
					has(WT.$,p)&&WT.$[p].r()
				}
				//log(k,e);
				if(e&&!e.safety){
					loader[k]=T50F;
					//delFromObj(loader,k);
				}
			})
		},
		/*
			T.cache('a',['b','c']);

			T.cache('a',['e','f']);

			WT.L['a']=['b','c'];

			T.cache('b',['a']);

			WT.L['b']=
		*/
		l:function(key,values,pu,arr,idx,tKey,tV){//check circle reference
			if(!ia(WT.L[key]))WT.L[key]=[];//save key depend list
			arr=[];
			if(ia(values)){//is array
				if(!pu)WT.L[key]=WT.L[key].concat(values);//save the key depends
				for(idx=0;idx<values.length;idx++){//test depend
					tKey=values[idx];//
					if(tKey===key){//find same
						arr.push(key);//push
					}else{
						tV=WT.l(key,WT.L[tKey],TRUE);//test next key
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
				//if(j){//if !j the list of current depend is ready
				for(i=0;i<j;i++){
					//log(m.k,m.k[i],loader[m.k[i]]);
					if(loader[m.k[i]]===TRUE){
						j--;
						m.k.splice(i--,1);
					}
				}
				//}
				if(!j){
					//log('rm:',m.z,m.f);
					WT.c--;
					im(m.f)&&m.f();
					delFromObj(WT.$,m.z);
				}
				if(!WT.c&&!WT._){
					//runWatch(WT._=TRUE);
					WT._=TRUE;
					T.idle=safeExec;
					if(T.$a){//run cache idle list
						safeExec(T.$a);
						delFromObj(T,'$a');
					}
				}
			},
			a:function(k){
				this.k.push(k);
			}
		}
	});
	store=W.localStorage;
	if(store){
		engine={
			get: function (key) {
				return store.getItem(key);
			},
			set: function (key, value) {
				store.removeItem(key);//iPhone/iPad QUOTA_EXCEEDED_ERR then remove it first
				store.setItem(key, value);
			},
			del: function (key) {
				store.removeItem(key);
			}
		}
	}else{
		try{
			store = E;
			store.addBehavior('#default#userdata');
			engine={
				get:function (key) {
					store.load(key);
					return store.getAttribute(key);
				},
				set:function (key, value) {
					store.load(key);
					store.setAttribute(key, value);
					store.save(key);				
				},
				del:function (key) {
					store.load(key);
					store.expires = nowTime.toUTCString();
					store.save(key);
				}
			}
		}catch(e){
			engine = {
				get: noop,
				set: noop,
				del: noop
			}
		}
	}
	for(var prop in engine){
		engine[prop]=safeWrap(engine[prop],EMPTY,EMPTY);
	}
	//window.T50F=T50F;
	//W.$loader=loader;
	//W.$mix=mix;
	var cacheFn=function(key,dps,value,fn){
		/// <param name="key" type="String">cache key,same as file name</param>
		/// <param name="value" type="Function">cache content,is a function</param>
		mix[key]=noop;//used in fileLoaded ,设置后标识这个文件下载成功，否则认为该文件下载不成功
		if(im(dps)){
			value=dps;
			dps=[];
		}
		fn=WT.l(key,dps);
		if(fn)throwError(fn+' @ '+key);
		//log(dps);
		runFiles(dps,function(e,i){
			//T.log('deps',e,key,dps);
			//log(key,mix[key]);
			i=getFileInfo(key);
			e.name=key;
			e.path=i.u;
			e.pkg=key.replace(holderReg,EMPTY);
			
			//log('after',key,mix[key]);
			if(!e.safety){
				mix[key]={c:value,d:e.dps};//cache the loaded value and deps
			}
			//exec succ then cache it,avoid cache a error file and read it next time
			if(safeWrap(value,W,noop)(e)===noop){
				e.safety=FALSE;
				e.reason='exec';
				//mix[key]=noop;
			}else{
				if(e.safety){
					mix[key]=TRUE;//cache if value exec success
				}
				cache&&engine.set(key, i.h + '<'+e.dps+'>'+ value);
			}
			//alert(e.name+','+e.reason);
			WT.d(key,e);//notify one ready ,maybe not success
		});
	},isCached=function(f,r,i,z,m){
		if(!ia(f))f=[f];
		//log(f);
		for(i=0;i<f.length;i++){
			m=f[i];
			if(m){
				//log(m,loader[m],mix[m]);
				if(has(loader,m)){
					//log(m,mix[m],mix[m]==noop)
					z=mix[m]===TRUE;
				}else if(cache){
					r=getContent(m);
					z=r&&isCached(r.d);
				}
				z=!z;
				//log('isCached',z,m);
				if(z)return!z;
			}
		}
		//log(f);
		return TRUE;
	},getContent=function(f,v,z,r){//get cache content
		r=has(delFromObj,f)&&delFromObj[f];
		if(!r){
			v=engine.get(f);
			if(v&&RegExp('^'+getFileInfo(f).h+'<').test(v)){
				z=v.match(depsReg);
				//log(z);
				r={c:v.replace(verReg,EMPTY),d:z&&z[1].split(COMMA)||[]};
				//log(r.d,r.c,r,f);
				r.o=['T.cache("',f,'","',r.d,'",',r.c,')'].join(EMPTY);
			}
			delFromObj[f]=r;
		}
		return r;
	},fileLoaded=function(fn){
		//log('fileLoaded',fn,has(mix,fn));
		if(!has(mix,fn)){
			//log('yaa~~');
			WT.d(fn,{safety:FALSE,name:fn,reason:'load'})//load failed
		}
	},runFiles=function(p,f,wt,idx,mem,temp,info,file,hasLoad){//run more than one files
		if(!ia(p)){
			p=p?(p+EMPTY).split(COMMA):[];
		}
		//log(p,p.length);
		f=safeWrap(f||noop);
		wt=new WT();
		wt.f=function(x){
			//通过runFiles得到的reason只能是依赖出错，不可能拿到exec出错，因为它可以是多个文件
			f({safety:x=isCached(p),dps:p,reason:x?EMPTY:'dps'})// exec error  dps unready
		};

		for(idx=0;idx<p.length;idx++){
			file=p[idx];
			if(file){
				hasLoad=TRUE;
				//log('start load file',file);
				wt.a(file);
				mem=has(mix,file)&&mix[file];
				//log(mem);
				if(mem&&mem!==noop){//from memory , if we loaded file and deps not ready,avoid load the res again
					//log('from mem',mem);
					mem===TRUE?WT.d(file):cacheFn(file,mem.d,mem.c);
				}else{
					if(cache){
						temp=getContent(file);
					}
					info=getFileInfo(file);
					//log('load1');
					//log(temp,info);
					loader(temp?temp.o:info.p,file,fileLoaded,temp,info.s);
				}
			}
		}
		if(!hasLoad){
			WT.d();
		}
		return T
		//log('hasLoad',hasLoad,p,arguments.callee.caller);
	};
	mix(T,{
		Store:engine,
		log:log,
		isCached:isCached,
		cache:cacheFn,
		error:throwError,
		safeExec:safeExec,
		safeWrap:safeWrap,
		has:has,
		listen:function(f){
			watchResList.push(f)
		},
		//:D.domain,
		invoke:function(a,i,f,z){
			if(ia(a)){
				for(i=0;i<a.length;i++){
					f=T.invoke(a[i]);
				}
				return f;
			}
			z=T._L;
			if(z&&im(f=z[a])){
				f=f.apply(z,s.call(arguments,1));
			}
			return f||FALSE;
		},
		load:function(ops,df,js){
			js='js';
			df=mix({
				type:js,
				url:EMPTY,
				code:EMPTY,
				id:EMPTY,
				done:noop,
				charset:EMPTY
			},ops);//param,uniqueKey,callback,isCode,isCss,isOuter,nodeId,tId,callCb,head,em,tmer,cb,ttmer,preEm
			//log(df.type===js);
			loader(df.code||df.url,df.id,df.done,df.code,df.type!==js,TRUE,df.charset);
		}
	});

	/*startup*/
	runFiles(innerT._C,function(e,c,preg,list,idx){
		//log('after TFV',e);
		preg=/^_[MFCSV]$/;
		for(c in T){
			if(has(T,c)&&preg.test(c)){
				innerT[c]=T[c];
				//log(cache,c);
				if(cache){
					delFromObj(T,c);
				}
				//log(T[c]);
			}
		}
		//log(T._V);
		//delete T._V; //if hide more info then delete it
		//runFiles(coreList&&coreList.split(',')||[],coreCallback);
		T.use=runFiles;
		list=T.$r;
		if(ia(list)){
			for(idx=0;idx<list.length;idx++){//core file ready run require file 
				runFiles(list[idx][0],list[idx][1]);
			}
			delFromObj(T,'$r');
		}

		curScript.parentNode.removeChild(curScript);
	});
}(this,document));