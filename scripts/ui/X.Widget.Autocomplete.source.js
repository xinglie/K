T.cache('X.Widget.Autocomplete','K,X.Widget.Base,X.Page',function(e){
	var W=K.entity(e.pkg),
		Base=K.access(e.dps[1]),
		Page=K.access(e.dps[2]),
		T500=new K.TM(500);
	W.Autocomplete=K.clazz(Base,function(base,proto,clazz){
		return {
			ctor:function(cfg){
				var me=this,
					df=K.mix({
						input:null,
						data:[]
					},cfg);
				base.ctor.call(me,df);
				if(K(me.input)){
					K.on(me.input,['focus','mousedown'],me.$startListen=K.bind(me.startListen,me));
					K.on(me.input,'blur',me.$stopListen=K.bind(me.stopListen,me));
					K.on(document,'mousedown',me.$click=function(e,n){
						n=K.evtTarget(e);
						if(!K.nodeIn(n,me.input)&&!K.nodeIn(n,me.id)){
							me.stopListen();
							me.hide();
						}
					});
					var node=K(me.input);
					node.autocomplete='off';
					node=node.parentNode;
					while(node){
						if(node.tagName&&node.tagName.toLowerCase()=='form'){
							node.autocomplete='off';
						}
						node=node.parentNode;
					}
				}else{
					T.error('unfound:'+me.input);
				}
			},
			searchData:function(text,ref){
				var me=this,
					args={
						data:K.clone(me.data),
						text:text
					};
				me.fire(clazz.DATA_SEARCH,args);
				return me.$usingData=args.data;
			},
			updateDrop:function(list){
				var me=this,
					args={
						list:list
					};
				if(!me.isShown){
					if(!me.isCreated){
						me.create('div',{
							position:'absolute'
						});
						Page.on(Page.WIN_RESIZE,me.$winResize=function(e){
							var nb=K.nodeBound(me.input);
							K.nodeStyle(me.id,{
								width:nb.width,
								left:nb.x,
								top:nb.y+nb.height,
								backgroundColor:'#fff'
							});
						});
					}
				}
				if(list.length){
					me.show();
					me.$winResize();
					me.fire(clazz.LIST_CHANGE,args,false,true);
					if(args.html){
						K.nodeVal(me.id,args.html);
					}
				}else{
					me.hide();
				}
			},
			updateData:function(data){
				var me=this;
				me.data=data;
				if(me.$lastText){
					var list=me.searchData(me.$lastText);
					me.updateDrop(list);
				}
			},
			startListen:function(){
				var me=this;
				if(!me.$listenChange){
					me.$listenChange=function(a){
						var text=K.nodeVal(me.input),
							args;
						if(text!=me.$lastText){
							args={
								from:me.$lastText,
								to:text
							};
							me.fire(clazz.VALUE_CHANGE,args,false,true);
							me.$lastText=text;
							if(!args.prevent){
								var list=me.searchData(text);
								me.updateDrop(list);
							}else{
								T.log('canceled update drop');
							}
						}
					}
				}
				if(!T500.has(me.$listenChange)){
					T500.on(me.$listenChange);
				}
				if(me.$lastText&&K.isArr(me.$usingData)&&me.$usingData.length){
					me.show();
				}
			},
			stopListen:function(){
				T500.un(this.$listenChange);
			},
			dispose:function(){
				var me=this;
				K.un(me.input,['focus','mousedown'],me.$startListen);
				K.un(me.input,'blur',me.$stopListen);
				K.un(document,'mousedown',me.$click);
				Page.un(Page.WIN_RESIZE,me.$winResize);
				base.dispose.call(me,arguments);
			}
		}
	},{
		VALUE_CHANGE:'_value_change',
		LIST_CHANGE:'_list_change',
		DATA_SEARCH:'_data_search'
	});
});