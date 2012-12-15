T.cache('X.KeyListener','K',function(e){
	var X=K.entity(e.pkg),
		keyupdown=['keyup','keydown'];
	X.KeyListener=K.clazz(K.ME,{
		ctor:function(cfg){
			var me=this,
				df=K.mix({
					zone:''
				},cfg);
			K.mix(me,df);
			var zone=K(me.zone);
			if(zone){
				zone.tabIndex=-1;
				K.on(zone,keyupdown,me.$keyupdown=K.bind(me.keyupdown,me));
			}else{
				T.error('unfound:'+me.zone);
			}
		},
		keyupdown:function(e){
			var me=this,args;
			e=K.evt(e);
			if(e){
				var dir=e.type=='keyup'?X.KeyListener.KEY_UP:X.KeyListener.KEY_DOWN;
				me.fire(dir,args={
					ctrlKey:e.ctrlKey||e.metaKey,
					code:e.keyCode||e.which,
					shiftKey:e.shiftKey,
					altKey:e.altKey
				});
				if(args.prevent){
					K.evtPrevent(e);
				}
				if(args.cancel){
					K.evtCancel(e);
				}
			}
		},
		dispose:function(){
			var me=this,
				zone=K(zone);
			K.un(zone,keyupdown,me.$keyupdown);
		}
	},{
		KEY_DOWN:'_key_down',
		KEY_UP:'_key_up'
	});
});