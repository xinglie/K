T.cache('X.Page','K',function(e){
	var H=K.entity(e.pkg),
		W=window,
		D=W.document,
		B=D.body,
		attachCache={},
		serNodeTypeReg=/^(?:checkbox|radio)$/i,
		attachEvent=function(key){
			var doc=W.document,
				win=W,
				P=H.Page,
				tKey;
			if(!K.isArr(key))key=[key];
			for(var i=0;i<key.length;i++){
				tKey=key[i];
				if(!T.has(attachCache,tKey)){
					attachCache[tKey]=true;
					switch(tKey){
						case P.WIN_SCROLL:
							K.on(W,'scroll',function(){
								W.clearTimeout(attachEvent.scrollTimer);
								attachEvent.scrollTimer=W.setTimeout(function(){
									P.fire(P.WIN_SCROLL);
								},50);
							});
							break;
						case P.WIN_RESIZE:
							K.on(W,'resize',function(){
								var holder=attachEvent;
								W.clearTimeout(holder.resizeTimer);
								holder.resizeTimer=W.setTimeout(function(){
									P.fire(P.WIN_RESIZE);
								},50);
							})
							break;
						case P.POINTER_DOWN:
							K.on(doc,['mousedown','touchstart'],function(e){
								e=K.evt(e,win);
								P.fire(P.POINTER_DOWN,{srcEvent:e});
							});
							break;
						case P.POINTER_UP:
							K.on(doc,['mouseup','touchend'],function(e){
								e=K.evt(e,win);
								P.fire(P.POINTER_UP,{srcEvent:e});
							});
							break;
						case P.POINTER_CLICK:
							K.on(doc,['click'],function(e){
								e=K.evt(e,win);
								P.fire(P.POINTER_CLICK,{srcEvent:e});
							});
							break;
						case P.PINTER_MOVE:
							K.on(doc,['mousemove','touchmove'],function(e){
								e=K.evt(e,win);
								P.fire(P.PINTER_MOVE,{srcEvent:e});
							});
							break;
						case P.POINTER_WHEEL:
							K.on(doc,['mousewheel','DOMMouseScroll'],function(e){
								e=K.evt(e,win);
								P.fire(P.POINTER_WHEEL,{srcEvent:e});
							});
							break;
						default:
							T.error('unsupport event:'+tKey);
					}
				}
			}
		};
	H.Page=K.mix({
		POINTER_CLICK:'_pointer_click',
		PINTER_MOVE:'_pointer_move',
		POINTER_UP:'_pointer_up',
		POINTER_DOWN:'_pointerdown',
		WIN_RESIZE:'_win_resize',
		WIN_SCROLL:'_win_scroll',
		POINTER_WHEEL:'_pointer_wheel',
		on:function(key,value){
			attachEvent(key);
			K.ME.on.apply(this,arguments);
		},
		scrollToXY:function(x,y,cb){//动画滚动到某处
			var me=this,alg,tw,ea;
			if(!me.$sfx){
				tw='X.ALG.Tween';
				T.use(tw);
				alg=K.access(W,tw,{});
				me.$sfx=new K.FX(alg.easeOutStrong);
				ea=[me.POINTER_DOWN,me.POINTER_WHEEL,me.WIN_RESIZE];
				me.$sfx.pointerDown=function(){
					me.$sfx.stop(true);
					me.un(ea,me.$sfx.pointerDown);
					delete me.$sfx;
				};
				me.on(ea,me.$sfx.pointerDown);
				me.$sfx.on_end=function(){
					me.$sfx.pointerDown();
					K.isFn(cb)&&cb();
				};
			}
			me.$sfx.stop(true);
			var bd=K.body(),
				maxX=Math.abs(bd.scrollX-x),
				maxY=Math.abs(bd.scrollY-y),
				time=Math.min(maxX,maxY,2000);
			me.$sfx.run(time,function(fx){
				window.scrollTo(fx(bd.scrollX,x),fx(bd.scrollY,y));
			});
		},
		scrollToNode:function(node,ops){
			var df=K.mix({
				offsetX:0,
				offsetY:0,//偏移量
				anchorTop:true,//选择以哪停靠
				anchorLeft:true
			},ops);
			node=K(node);
			if(!node)T.error('unfound:'+node);
			var nb=K.nodeBound(node),
				bd=K.body(),
				me=this,
				x,y;
			if(df.anchorLeft){
				x=nb.x+df.offsetX;
			}else{
				x=nb.x-bd.width+nb.width+df.offsetX;
			}
			if(df.anchorTop){
				y=nb.y+df.offsetY;
			}else{
				y=nb.y-bd.height+nb.height+df.offsetY;
			}
			T.log(x,y);
			me.scrollToXY(x,y);
		},
		download:function(url){
			var ifm=K('iframe',{id:K.guid()},{left:-1000,top:-1000,position:'absolute'}),
				ifmLoad=function(){
					setTimeout(function(){
						T.log('loaded');
						K.un(ifm,'load',ifmLoad);
						K.nodeDel(ifm);
						T.log(ifm.parentNode);
						ifm=null;
					},1E3);
				};
			K.on(ifm,'load',ifmLoad);
			ifm.src=url;
			B.insertBefore(ifm,B.firstChild);
		},
		serialize:function(node,cb){
			/// <summary>serialize the textare etc. of the node</summary>                        /// <param name="nd" type="String|HTMLElement">node or node id</param>
			/// <returns type="String" />
			var nd=K(node),
				temp={},
				result=[],
				se,fn=function(e,flag){
					if(e.name){
						if(!temp[e.name])temp[e.name]=[];
						if(flag&&serNodeTypeReg.test(e.type)){
							if(e.checked){
								se={
									node:e,
									value:K.strCode(e.value),
									name:e.name
								};
								K.isFn(cb)&&cb(se);
								if(!se.ignore){
									temp[e.name].push(se.value);
								}
							}
						}else{
							se={
								node:e,
								value:K.strCode(e.value),
								name:e.name
							};
							K.isFn(cb)&&cb(se);
							if(!se.ignore){
								temp[e.name].push(se.value);
							}
						}
					}
				};
			K.nodeByTag(['input','select','textarea'],node,fn);
			for(var p in temp){
				for(var i=0;i<temp[p].length;i++){
					result.push(p+'='+temp[p][i]);
				}
			}
			return result.join('&');
		}
	},K.ME,{
		on:true
	});
});