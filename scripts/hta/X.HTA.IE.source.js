T.cache('X.HTA.IE','K',function(e){
	var H=K.entity(e.pkg),
		Status={
			IDLE:1,
			LOADING:2,
			LOADED:4,
			STOP:8,
			CLOSED:16
		},
		T100=new K.TM(100),
		DocLoadedReg=/(?:4|d|te)$/;
	H.IE=K.clazz(K.ME,{
		ctor:function(cfg){
			var me=this,
				df=K.mix({
					visible:true
				},cfg);
			K.mix(me,df);
			me.status=Status.IDLE;
		},
		navigate:function(url){
			var me=this;
			if(!me.$ie||me.status==Status.CLOSED){
				me.$ie=new ActiveXObject("Internetexplorer.Application");
				me.$ie.Visible=me.visible;
				//http://msdn.microsoft.com/en-us/library/aa752084(v=vs.85).aspx
			}
			if(!me.$interval){
				me.$interval=function(){
					if(!me.$ie||me.$ie.closed){
						me.fire(H.IE.CLOSED);
						T100.un(me.$interval);
						me.status=Status.CLOSED;
					}else{
						if(me.status!=Status.LOADED&&me.$ie.document&&DocLoadedReg.test(me.$ie.document.readyState)){
							me.status=Status.LOADED;
							var doc=me.$ie.document,
								win=K.nodeWin(doc);
							win.attachEvent('onunload',function(){
								me.status=Status.LOADING;
								T100.on(me.$interval);
							});
							me.fire(H.IE.LOADED,{
								url:doc.URL,
								doc:doc,
								win:win
							});
							T100.un(me.$interval);
						}
					}
				}
			}
			if(!T100.has(me.$interval)){
				T100.on(me.$interval);
			}
			me.status=Status.LOADING;
			me.$ie.Navigate(url);
		},
		dispose:function(){
			var me=this,
				s=me.status;
			if(s!=Status.IDLE){
				T100.un(me.$interval);
				if(me.$ie){
					me.$ie.Quit();
					delete me.$ie;
				}
				me.status=Status.IDLE;
			}
		}
	},{
		LOADED:'_loaded',
		CLOSED:'_closed'
	});
});