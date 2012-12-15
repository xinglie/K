T.cache('X.HTA.IfmXHR','K',function(e){
	var ifmXHR=K.clazz({
		abort:function(){
			var me=this;
			if(me.$abort)me.$abort();
		},
		support:function(){
			return true;
		},
		send:function(data,callback,global){
			var me=this,
				doc=global.document,
				ifm=K('iframe',{id:K.guid()},{position:'absolute'},doc),
				result={
					type:K.IO.HTAXHR
				};
			delete me.$canceled;
			K.on(ifm,'load',me.$load=function(){
				if(!me.$canceled){
					result.text=ifm.contentWindow.document.documentElement.outerHTML;
					callback(result);
					me.$abort();
				}
			});
			me.$abort=function(){
				if(ifm){
					me.$canceled=true;
					ifm.src='about:blank';
					K.un(ifm,'load',me.$load);
					K.nodeDel(ifm);
					ifm=null;
				}
			};
			ifm.application="yes";
			ifm.src=data.url;
			doc.body.insertBefore(ifm,doc.body.firstChild);
			//alert(document.body.innerHTML);
		}
	});
	ifmXHR.adopt=function(data){
		return data.useIframe
	};
	K.IO.HTAXHR='HTA_XHR';
	K.IO.addTrans(ifmXHR);
});