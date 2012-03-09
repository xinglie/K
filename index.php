<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>测试</title>
</head>
<body style="height:2000px">
    <form action="index.php" method="post">
		<input type="text" name="user" />
		<input type="text" name="password" />
		<input type="submit" value="submit" />
	</form>
	<div id="drag" style="width:100px;height:100px;position:absolute;left:500px;top:600px;background-color:#999"></div>
</body>
<?php include_once("scripts/T.single.inc") ?>
<script type="text/javascript">
T.using('XY.Widget.Autocomplete',function(){
	var ac=new XY.Widget.Autocomplete();
	ac.show();
});
T.coreReady(function(){
K.logTime('tmpl');
//K.TP.using('haha->:\'\\\\adfadf\\\'"<#=this.abc#>;{;{;;};;<#=this.abc#>;;adfa<#for(var i=0;i<10;i++){#>a-><#if(i==0){#>aaa<#}#><#=i#>;;<#}#>;;adsfafdasdf</a-><a href="javascript:;" onclick="alert(K.nodeAttr(this,\'data-info\'));return false" data-info="<#=K.strHTML(this.bbb)#>"><#=K.strHTML(this.bbb)#></a>').toFill(document.body,{abc:'123',bbb:'x\'y\'z\\""><'});
K.logTime('tmpl');
K.on('drag','mousedown',function(e){
	var bound=K.nodeBound('drag');
	K.startDrag('drag',function(o,e,fx,fy){
		var nx=bound.x+fx;
		var ny=bound.y+fy;
		K.nodeStyle(o,{left:nx+'px',top:ny+'px'});
	});
	//K.evtPrevent(e);
});
K.object('XY');
XY.Control=K.clazz(K.Evt,function(base,proto,clazz){
	K.mix(clazz,{
		registerControl:function(){
		}
	});
	return {
		hi:function(){
		}
	}
});
XY.Alert=K.clazz(XY.Control,{
});


var a=new XY.Alert();
});
</script>
</html>