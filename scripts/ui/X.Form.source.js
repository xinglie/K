T.cache('X.Form','K,X.Page',function(e){
	var X=K.entity(e.pkg),
		P=K.access(e.dps[1]);
	X.Form={
		serialize:function(form,cb){
			return P.serialize(form,cb);
		},
		submit:function(){
			
		}
	}
});