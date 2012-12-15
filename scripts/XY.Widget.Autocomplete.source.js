T.cache('XY.Widget.Autocomplete',['XY.Widget.Base','edit_area'],function(e){
	T.log('from:',e,e.reason,K.nodeStyle(document.body,'fontSize'));
	if(e.safety){
		var Wgt=K.entity(e.pkg);
		Wgt.Autocomplete=K.clazz(XY.Widget.Base,function(base){
			return {
				ctor:function(){
					T.log('ac ctor');
					base.ctor.call(this);
				},
				show:function(){
					T.log('ac show','more text');
					base.show.call(this);
				}
			}
		});
	}
	//T.error('aa');
});
