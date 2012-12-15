T.cache('X.App.Autocomplete','X.Widget.Autocomplete,X.KeyListener,X.KeyCode',function(e){
	var A=K.entity(e.pkg),
		AC=K.access(e.dps[0]),
		KL=K.access(e.dps[1]),
		KC=K.access(e.dps[2]),
		Tmpl='<ul><#for(var i=0;i<@list.length;i++){#><li id="<#=@id#>_item_<#=i#>" data-idx="<#=i#>"><#=@list[i].text#></li><#}#></ul>';
	A.Autocomplete=K.clazz(AC,function(base,proto,clazz){
		return {
			ctor:function(){
				var me=this;
				me.on(clazz.LIST_CHANGE,me.$listChange=K.bind(me._listChange,me));
				me.on(clazz.DATA_SEARCH,me.$dataSearch=K.bind(me._dataSearch,me));
				base.ctor.apply(me,arguments);
				me.$kl=new KL({zone:me.input});
				me.$kl.on(KL.KEY_DOWN,me.$keydown=function(e){
					if(e.code==KC.DOWN){
						var now=K(me.id+'_item_'+(me.$currentIndex+1));
						if(now){
							K.nodeStyle(me.$lastHover,{backgroundColor:"#fff"});
							me.$currentIndex++;
							K.nodeStyle(me.$lastHover=now,{backgroundColor:'#ccc'});
						}
					}else if(e.code==KC.UP){
						var now=K(me.id+'_item_'+(me.$currentIndex-1));
						if(now){
							K.nodeStyle(me.$lastHover,{backgroundColor:"#fff"});
							me.$currentIndex--;
							K.nodeStyle(me.$lastHover=now,{backgroundColor:'#ccc'});
						}
					}else if(e.code==KC.ENTER){
						if(me.$lastHover){
							me.$currentIndex=-1;
							me._fillInput(me.$lastHover);
						}
					}
				});
				me.$currentIndex=-1;
				me.on(clazz.CREATED,me.$created=function(){
					me.off(clazz.CREATED);
					K.on(me.id,'mouseover',me.$mouseover=function(e){
						var target=K.evtTarget(e),
							itemNode=me._findItemNode(target);
						if(itemNode&&K.pointerInout(itemNode)){
							K.nodeStyle(me.$lastHover,{backgroundColor:'#fff'});
							me.$currentIndex=parseInt(K.nodeAttr(itemNode,'data-idx'),10);
							K.nodeStyle(me.$lastHover=itemNode,{backgroundColor:"#ccc"});
						}
					});

					/*K.on(me.id,'mouseout',me.$ouseout=function(e){
						if(K.pointerInout(me.id)){
							me.$currentIndex=-1;
							K.nodeStyle(me.$lastHover,{backgroundColor:'#fff'});
						}
					});*/
					K.on(me.id,'click',me.$click=function(e){
						var target=K.evtTarget(e),
							itemNode=me._findItemNode(target);
						if(itemNode){
							me._fillInput(itemNode);
						}
					});
				});	
			},
			_fillInput:function(item){
				var me=this;
				K.nodeVal(me.input,K.nodeVal(item));
				me.hide();
			},
			_findItemNode:function(target){
				var me=this,
					find=K.nodeIn(target.parentNode.parentNode,me.id);
				while(K.nodeIn(target.parentNode.parentNode,me.id)&&target.parentNode.parentNode.id!=me.id&&target.id!=me.id){
					target=target.parentNode;
				}
				return find?target:null;
			},
			_dataSearch:function(e){
				var me=this,
					data=e.data,
					result=[];
				if(!e.prevent){
					if(e.text){
						for(var i=0;i<data.length;i++){
							if(~data[i].text.indexOf(text)){
								result.push(data[i]);
							}
						}
					}
					e.data=result;
				}
			},
			_listChange:function(e){
				var me=this,
					list=e.list;
				me.$currentIndex=-1;
				e.html=K.tpFilled(Tmpl,{
					list:list,
					id:me.id
				});
			},
			hide:function(){
				var me=this;
				me.$currentIndex=-1;
				K.nodeStyle(me.$lastHover,{backgroundColor:'#fff'});
				base.hide.apply(me,arguments);
			},
			dispose:function(){
				var me=this;
				me.un(clazz.LIST_CHANGE,me.$listChange);
				me.un(clazz.CREATED,me.$created);
				if(me.$kl)me.$kl.dispose();
				K.un(me.id,'mouseover',me.$mouseover);
				//K.un(me.id,'mouseout',me.$mouseout);
				K.un(me.id,'click',me.$click);

				base.dispose.apply(me,arguments);
			}
		}
	},{
		ITEM_HOVER:'_item_hover',
		ITEM_SELECTED:'_item_selected'
	});
});