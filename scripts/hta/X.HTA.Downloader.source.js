T.cache('X.HTA.Downloader','K,X.HTA.IO',function(e){
	var H=K.entity(e.pkg),
		IO=K.access(e.dps[1]),
		left=/\//,
		leftTail=/\/$/,
		right=/\\/,
		rightTail=/\\$/,
		ContentTypes={
			'image/jpeg':'.jpg',
			'text/html':'.html'
		};
	H.Downloader=K.clazz(K.ME,function(base,proto,clazz){
		return {
			setFolder:function(f){
				var me=this;
				if(!IO.folderExists(f)){
					T.error('unexist:'+f);
				}
				if(left.test(f)&&!leftTail.test(f)){
					f+='/';
				}else if(right.test(f)&&!rightTail.test(f)){
					f+='\\';
				}
				me.$folder=f;
			},
			download:function(url,name){
				var me=this;
				if(!me.$xhr)me.$xhr=new K.IO();
				me.$xhr.send({
					url:url,
					done:function(e){
						if(e.error){
							me.fire(clazz.LOAD_ERROR,{
								error:e.error
							});
						}else{
							if(e.type==K.IO.XHR){
								try{
									alert(e.xhr.getResponseHeader('Content-Type'));
									return;
									IO.writeByStream(me.$folder+name,e.xhr.responseBody);
									me.fire(clazz.LOAD_SUCCESS);
								}catch(e){
									me.fire(clazz.LOAD_ERROR,{
										error:e.message
									});
								}
							}
						}
					}
				})
			}
		}
	},{
		LOAD_ERROR:'_load_error',
		LOAD_SUCCESS:'_load_success'
	});
});