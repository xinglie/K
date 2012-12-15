T.cache('XY.Widget.Base',['K'],function(e){
	if(e.safety){
		T.log(e.name,e);
		var Wgt=K.entity(e.pkg);
		Wgt.Base=K.clazz(K.Evt,{
			ctor:function(){
				T.log('base ctor,ok?');
			},
			show:function(){
				T.log('base show.....,haha，搞定');
			}
		});
		//throw 'abc';
	}
});
