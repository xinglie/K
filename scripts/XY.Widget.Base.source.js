T.cache('XY.Widget.Base',['K'],function(key,root){
	var Wgt=K.entity('XY.Widget');
	Wgt.Base=K.clazz(K.Evt,{
		ctor:function(){
			K.log('base ctor');
		},
		show:function(){
			K.log('base show.....');
		}
	});
});
