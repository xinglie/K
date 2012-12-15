T.cache('X.HTA.Iframe','K',function(e){
	var HTA=K.entity(e.pkg),
		Status={
			IDLE:1,
			LOADING:2,
			LOADED:4,
			STOP:8
		},Iframe=K.clazz(K.ME,{
			ctor:function(){
				this.id=K.guid('x_hta_iframe_');
				this.status=Status.IDLE;
			},
			goUrl:function(url){
				var me=this,
					ifm=K(me.id);
				if(!ifm){
					ifm=K('iframe',{id:me.id},{width:600,height:500});
					me.status=Status.LOADING;
					K.on(ifm,'load',me.$load=function(){
						if(me.status==Status.LOADING||me.status==Status.LOADED){
							me.status=Status.LOADED;
							var win=ifm.contentWindow;
							me.fire(HTA.Iframe.LOADED,{
								win:win,
								doc:win.document,
								url:win.document.URL
							});
						}
					});
					ifm.application='yes';
					ifm.src=url;
					document.body.appendChild(ifm);
				}else{
					ifm.src=url;
				}
			},
			dispose:function(){
				var me=this;
				me.status=Status.STOP;
				var ifm=K(me.id);
				if(ifm){
					K.un(ifm,'load',me.$load);
					K.nodeDel(ifm);
					ifm=null;
				}
			}
		});
	HTA.Iframe=K.clazz(K.ME,{
		ctor:function(cfg){
			var me=this,
				df=K.mix({
					width:600,
					height:600
				},cfg);
			me.status=Status.IDLE;
		},
		navigate:function(url){
			var me=this,
				status=me.status;
			me.status=Status.LOADING;
			if(!me.$iframe){
				me.$iframe=new Iframe();
				me.$iframe.on_loaded=function(e){
					me.status=Status.LOADED;
					me.fire(HTA.Iframe.LOADED,e);
				};
			}
			
			me.$iframe.goUrl(url);
		},
		dispose:function(){
			var me=this,
				s=me.status;
			if(s!=Status.IDLE){
				me.status=Status.IDLE;
				if(me.$iframe){
					me.$iframe.dispose();
					delete me.$iframe;
				}
			}
		}
	},{
		LOADED:'_loaded'
	});
});