T.cache('X.OData','K',function(e){
	var X=K.entity(e.pkg);
	X.OData={
		UPDATE:'_update',
		ADD:'_add',
		DELETE:'_delete',
		wrapArray:function(arr){
			if(!K.isArr(arr)){
				T.error('wrapArray args error');
			}
			return new X.RData.Array(arr);
		},
		wrapObject:function(obj){
			if(!K.isObj(obj)){
				T.error('wrapObject args error');
			}
			return new X.RData.Object(obj);
		},
		Array:K.clazz(K.Evt,{
			ctor:function(arr){
				var me=this;
				me.$arr=arr;
			},
			count:function(){
				var me=this;
				return me.$arr.length;
			},
			push:function(item){
				var me=this;
				me.fire(X.RData.ADD,{
					item:item
				});
				me.$arr.push(item);
			},
			shift:function(){
				var me=this,
					item=me.$arr.shift();
				me.fire(X.RData.DELETE,{
					item:item
				});
				return item;
			},
			unshift:function(item){
				var me=this;
				me.fire(X.RData.ADD,{
					item:item
				});
				return me.$arr.unshift(item);
			},
			pop:function(){
				var me=this,
					item=me.$arr.pop();
				me.fire(X.RData.DELETE,{
					item:item
				});
				return item;
			}
		}),
		Object:K.clazz(K.Evt,{
			ctor:function(obj){
				var me=this;
				me.$obj=obj;
			},
			set:function(key,value){
				var me=this,
					has=T.has(me.$obj,key);
				me.fire(has?X.RData.UPDATE:X.RData.ADD,{
					key:key,
					value:value
				});
				me.$obj[key]=value;
			},
			get:function(key){
				var me=this;
				return me.$obj[key];
			},
			del:function(key){
				var me=this;
				me.fire(X.RData.DELETE,{
					key:key
				});
				delete me.$obj[key];
			}
		})
	};
});