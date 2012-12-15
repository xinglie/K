T.cache('X.DataCache','K',function(e){
	var X=K.entity(e.pkg);
	X.DataCache=K.clazz(K.ME,{
		ctor:function(size){
			var me=this;
			me.$cache={};
			me.$size=window.isFinite(size)?size:X.DataCache.SIZE;
			me.$count=0;
		},
		get:function(key){
			var me=this,
				has=T.has(me.$cache,key),
				data=null;
			if(has){
				data=me.$cache[key];
				data.f++;
				data.t=K.now();
				data=data.d;
			}
			return data;
		},
		_delByFT:function(){
			var me=this,
				p,fre=-1,time=0,data,
				cache=me.$cache,
				lastKey;
			for(p in cache){
				if(T.has(cache,p)){
					data=cache[p];
					if(fre==-1){
						fre=data.f;
						time=K.now()-data.t;
						lastKey=p;
					}else{
						if(data.f<fre){
							lastKey=p;
							fre=data.f;
						}else if(data.f==fre){
							if(K.now()-data.t>time){
								lastKey=p;
								time=K.now()-data.t;
							}
						}
					}
				}
			}
			if(lastKey){
				me.del(lastKey);
			}
		},
		set:function(key,value){
			var me=this,
				data,has=T.has(me.$cache,key);
			if(has){//更新值，更新频率与时间
				data=me.$cache[key];
				data.d=value;
				data.f++;
				data.t=K.now();
				me.fire(X.DataCache.UPDATE,{
					key:key,
					value:value
				});
			}else{
				data={
					d:value,
					f:0,
					t:K.now()
				};
				me.$cache[key]=data;
				me.fire(X.DataCache.ADD,{
					key:key,
					value:value
				});
				if(!has){
					me.$count++;
					if(me.$size>-1&&me.$count>me.$size){
						me._delByFT();
					}
				}
			}
		},
		del:function(key){
			var me=this,
				cache=me.$cache,
				has=T.has(cache,key),
				data=cache[key];
			if(has){
				delete cache[key];
				me.fire(X.DataCache.DELETE,{
					key:key,
					value:data
				});
			}
		},
		has:function(key){
			var me=this,
				cache=me.$cache;
			if(cache&&T.has(cache,key)){
				return true;
			}
			return false;
		}
	},{
		SIZE:20,
		DELETE:'_delte',
		ADD:'_add',
		UPDATE:'_update'
	});
});