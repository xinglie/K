T.cache('X.Watcher.CPU','K,X.ALG.Reducer.Douglas',function(e){
	var W=K.entity(e.pkg);
	var Interval=50,I50;
	var Douglas=K.access(e.dps[1]);
	W.CPU=K.clazz(K.ME,function(base,proto,clazz,baseClazz){
		return {
			start:function(){
				var me=this;
				me.$list=[];
				if(!me.$sampleFn)me.$sampleFn=K.bind(me._sample,me);
				if(!I50)I50=new K.TM(Interval);
				I50.on(me.$sampleFn);
				me.$point=K.now();
			},
			_sample:function(){
				var me=this;
				var list=me.$list;
				list.push({x:K.now(),y:K.now()-me.$point});
				me.$point=K.now();
			},
			stop:function(){
				var me=this;
				I50.un(me.$sampleFn);
			},
			getSample:function(tolerance){
				var me=this,
					list=me.$list;
				list=Douglas.reduce(list,tolerance||10);
				list.sort(function(a,b){
					return a.x-b.x;
				});
				return list;
			}
		}
	});
});