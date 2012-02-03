T.cache('XY.Widget.Base',['K'],function(){
	var Wgt=K.object('XY.Widget');
	Wgt.Base=K.clazz(K.Evt,{
		ctor:function(){
			K.log('base ctor');
		},
		show:function(){
			K.log('base show.....');
		}
	});
});
