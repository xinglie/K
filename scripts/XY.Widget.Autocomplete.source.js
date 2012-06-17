T.cache('XY.Widget.Autocomplete',['XY.Widget.Base','edit_area.css'],function(key){
	K.log('from:',arguments);
	var Wgt=K.entity('XY.Widget');
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
