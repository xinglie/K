T.cache('X.Graphics','K',function(e){
	var X=K.entity(e.pkg);
	X.Graphics={
		Line:K.clazz({
			ctor:function(startPoint,endPoint){
				var me=this;
				me.startPoint=startPoint;
				me.endPoint=endPoint;
			}
		}),
		Rect:K.clazz({
			ctor:function(x,y,width,height){
				var me=this;
				me.x=x;
				me.y=y;
				me.width=width;
				me.height=height;
			}
		}),
		Point:K.clazz({
			ctor:function(x,y){
				var me=this;
				me.x=x;
				me.y=y;
			},
			equal:function(point){
				var me=this;
				return me.x==point.x&&me.y==point.y;
			}
		}),
		Circle:K.clazz({
			ctor:function(centerPoint,raduis){
				var me=this;
				me.center=me.centerPoint;
				me.raduis=raduis;
			}
		})
	};
	var G=X.Graphics;
	K.mix(G.Line,{
		isCross:function(line1,line2){
			var s1=line1.startPoint,
				e1=line1.endPoint,
				s2=line2.startPoint,
				e2=line2.endPoint;
			var d1=((e1.x-s1.x)*(s2.y-s1.y)-(e1.y-s1.y)*(s2.x-s1.x))*((e1.x-s1.x)*(e2.y-s1.y)-(e1.y-s1.y)*(e2.x-s1.x));
			var d2=((e2.x-s2.x)*(s1.y-s2.y)-(e2.y-s2.y)*(s1.x-s2.x))*((e2.x-s2.x)*(e1.y-s2.y)-(e2.y-s2.y)*(e1.x-s2.x));
			return d1<=0&&d2<=0;
		}
	});
	K.mix(G.Circle,{
		isPointIn:function(point,cirecle){
			var me=this,
				info=me.pointPosInfo(point,cirecle);
			return info.inCircle;
		},
		pointPosInfo:function(point,cirecle){
			var center=cirecle.center,
				raduis=cirecle.raduis;
			var dis=Math.sqrt(Math.pow(Math.abs(point.x-center.x),2)+Math.pow(Math.abs(point.y-center.y),2));

			if(dis<=raduis){//在边上也认为在圆内
				return {
					inCircle:true,
					point:point
				};
			}else{
				var cx=raduis/dis*(point.x-center.x)+center.x,
					cy=raduis/dis*(point.y-center.y)+center.y;
				return {
					inCircle:false,
					point:new G.Point(cx,ty)
				};
			}
		}
	});
	K.mix(G.Rect,{
		intersect:function(rect1,rect2){
			var half1Width=rect1.width/2,
				half1Height=rect1.height/2,
				half2Width=rect2.width/2,
				half2Height=rect2.height/2,
				cen1={
					x:rect1.x+half1Width,
					y:rect1.y+half1Height
				},
				cen2={
					x:rect2.x+half2Width,
					y:rect2.y+half2Height
				};

			return Math.abs(cen2.x-cen1.x)<=half1Width+half2Width&&
				   Math.abs(cen2.y-cen1.y)<=half1Height+half2Height;
		}
	});
});