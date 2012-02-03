T.cache('XY.Widget.Autocomplete',['XY.Widget.Base'],function(){
	var Wgt=K.object('XY.Widget');
	Wgt.Autocomplete=K.clazz(XY.Widget.Base,function(base){
		return {
			ctor:function(){
				K.log('ac ctor');
				base.ctor.call(this);
			},
			show:function(){
				K.log('ac show','more text');
				base.show.call(this);
			}
		}
	});
});
