T.cache('X.ALG.Reducer.Douglas','K',function(e){
	var R=K.entity(e.pkg),
		perpendicularDistance=function (beginPoint, endPoint, comparePoint) {
			/// <summary>计算给出的comparePoint到beginPoint与endPoint组成的直线的垂直距离</summary>
			/// <param name="beginPoint" type="Object">起始点</param>
			/// <param name="endPoint" type="Object">结束点</param>
			/// <param name="comparePoint" type="Object">比较点</param>
			/// <returns type="Float" />
			//Area = |(1/2)(x1y2 + x2y3 + x3y1 - x2y1 - x3y2 - x1y3)|   *Area of triangle
			//Base = v((x1-x2)2+(y1-y2)2)                               *Base of Triangle*
			//Area = .5*Base*H                                          *Solve for height
			//Height = Area/.5/Base
			var area = Math.abs(0.5 * (beginPoint.x * endPoint.y + endPoint.x * comparePoint.y + comparePoint.x * beginPoint.y -
			 endPoint.x * beginPoint.y - comparePoint.x * endPoint.y - beginPoint.x * comparePoint.y));
			var bottom = Math.sqrt(Math.pow(beginPoint.x - endPoint.x, 2) + Math.pow(beginPoint.y- endPoint.y, 2));
			var height = area / bottom * 2;
			return height;
		},
		reduce=function (points, firstPoint, lastPoint, tolerance, pointIndexsToKeep) {
			/// <summary>抽稀处理</summary>
			/// <param name="points" type="Array">待抽稀的数组</param>
			/// <param name="firstPoint" type="Integer">起点</param>
			/// <param name="lastPoint" type="Integer">终点</param>
			/// <param name="tolerance" type="Float">取样临界值</param>
			/// <param name="pointIndexsToKeep" type="Array">保留点下标的数组</param>
			var maxDis = 0, idxFarthest = 0; //定义最大长度及最远点的下标
			for (var i = firstPoint, dis; i < lastPoint; i++) {
				dis = perpendicularDistance(points[firstPoint], points[lastPoint], points[i]); //获取当前点到起点与
				if (dis > maxDis) {//保存最远距离
					maxDis = dis;
					idxFarthest = i;
				}
			}
			if (maxDis > tolerance && idxFarthest != 0) {//如果最远距离大于临界值
				pointIndexsToKeep.push(idxFarthest);
				reduce(points, firstPoint, idxFarthest, tolerance, pointIndexsToKeep);
				reduce(points, idxFarthest, lastPoint, tolerance, pointIndexsToKeep);
			}
		};
	R.Douglas={
		reduce:function(points,tolerance){
			/// <summary>获取处理后的点</summary>
			/// <param name="points" type="Array">包含点的数组</param>
			/// <param name="tolerance" type="Float">取样临界值</param>
			/// <returns type="Array" />
			if (!K.isArr(points) || !points.length) {//当points不是数组或没有值时，直接返回一个空数组
				return [];
			}
			if (points.length < 3) return points; //小于3个点时不抽稀，因为1个或2个点无法进行抽稀
			var firstPoint = 0, lastPoint = points.length - 1; //取开始点与结束点的下标
			var pointIndexsToKeep = []; //保存需要点下标的数组
			pointIndexsToKeep.push(firstPoint);
			pointIndexsToKeep.push(lastPoint); //开始与结束不进行处理，直接保留
			while (points[firstPoint] == points[lastPoint]) {//处理闭合情况，闭合时，强制断开
				lastPoint--;
			}
			reduce(points, firstPoint, lastPoint, tolerance, pointIndexsToKeep); //抽稀
			var resultPoints = []; //返回的点数组
			//pointIndexsToKeep.sort(function (a, b) {//排序，这个可排可不排
				//return a.x-b.x;
			//});
			for (var i = 0; i < pointIndexsToKeep.length; i++) {
				resultPoints.push(points[pointIndexsToKeep[i]]);
			}
			return resultPoints;
		}
	}
});