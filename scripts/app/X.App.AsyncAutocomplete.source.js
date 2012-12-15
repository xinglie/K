T.cache('X.App.AsyncAutocomplete','X.App.Autocomplete',function(e){
	var A=K.entity(e.pkg),
		AC=K.access(e.dps[0]),
		EMPTYARR=[];
	A.AsyncAutocomplete=K.clazz(AC,function(base,proto,clazz){
		return {
			ctor:function(cfg){
				var me=this,
					df=K.mix({
						xhr:{
							url:'not-setted',
							method:'POST'
						},
						queryKey:'text'
					},cfg);
				me.xhrUrlHasQuery=~df.xhr.url.indexOf('?');
				base.ctor.call(me,df);
				me.on(clazz.VALUE_CHANGE,me.$asyncValueChange=K.bind(me._asyncValueChange,me));
				me.on(clazz.DATA_SEARCH,me.$asyncDataSearch=K.bind(me._asyncDataSearch));
			},
			_asyncDataSearch:function(e){
				if(!e.text){
					e.data=EMPTYARR;
				}
				return false;
			},
			_asyncValueChange:function(e){
				var me=this,
					value=e.to;
				e.prevent=true;
				if(value){
					if(!me.$xhr)me.$xhr=new K.IO();
					me.$xhr.stop();
					var xhr=me.xhr,
						isPost=!!xhr.data,
						params=K.clone(xhr);
						if(isPost){
							if(!params.data)params.data='';
							params.data+='&'+me.queryKey+'='+value;
						}else{
							params.url=params.url+(me.xhrUrlHasQuery?'&':'?')+me.queryKey+'='+K.strCode(value);
						}
					me.$xhr.send(K.mix({
						done:function(x,args){
							args={data:x};
							me.fire(clazz.ASYNC_LOADED,args);
							me.updateData(args.data);
						}
					},params));
				}else{
					me.updateData(EMPTYARR);
				}
			},
			dispose:function(){
				var me=this;
				me.un(clazz.VALUE_CHANGE,me.$asyncValueChange);
				me.un(clazz.DATA_SEARCH,me.$asyncDataSearch);
				base.dispose.apply(me,arguments);
			}
		}
	},{
		ASYNC_LOADED:'_async_loaded'
	});
});