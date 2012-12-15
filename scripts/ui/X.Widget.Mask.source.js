T.cache('X.Widget.Mask','K,X.Widget.Base,X.Page',function(e){
	var W=K.entity(e.pkg),
		Base=K.access(e.dps[1]),
		Page=K.access(e.dps[2]);
	W.Mask=K.clazz(Base,function(base,proto,clz,pclz){
		K.mix(clz,{
			START_ZINDEX:3e4
		});
		return {
			ctor:function(cfg){
				/// <summary>constructor method</summary>
				/// <param name="cfg" type="Object">config object</param>
				var me=this;
				if(!cfg)cfg={};
				if(!T.has(cfg,'opacity')){
					cfg.opacity=.2;
				}
				if(!T.has(cfg,'color')){
					cfg.color='#000';
				}
				if(!T.has(cfg,'zIdx')){
					cfg.zIdx=clz.START_ZINDEX++;
				}
				base.ctor.call(me,cfg);
			},
			show:function(id){
				/// <summary>show mask</summary>
				/// <param name="id" type="String|HTMLElement">to masked element or element id</param>
				var me=this;
				if(!me.isShown){
					if(!me.isCreated){
						me.create('div',{
							position:'absolute',
							left:'-100000px',
							top:'-100000px',
							opacity:me.opacity,
							backgroundColor:me.color
						});
					}
					if(!me.$resize){
						me.$resize=function(bd){
							if(me.$attachNode){
								bd=K.nodeBound(me.$attachNode);
								me.updateSize(bd.width,bd.height);
								me.updatePosition(bd.x,bd.y);
							}else{
								bd=K.body();
								me.updateSize(bd.maxWidth,bd.maxHeight);
								me.updatePosition(0,0);
							}
						};
						Page.on(Page.WIN_RESIZE,me.$resize);
						me.$attachNode=K(id);
						me.$resize();
					}
					base.show.call(me);
				}
			},
			hide:function(){
				/// <summary>hide mask</summary>
				var me=this;
				if(me.isShown){
					Page.un(Page.PAGE_RESIZE,me.$resize);
					delete me.$resize;
					base.hide.call(me,{x:-1E5,y:-1E5});
				}
			},
			dispose:function(){
				/// <summary>dispose resource</summary>
				var me=this;
				if(!me.isDisposed){
					Page.un(Page.PAGE_RESIZE,me.$resize);
					delete me.$resize;
					delete me.$attachNode;
					base.dispose.call(me);
				}
			}
		}
	});
});