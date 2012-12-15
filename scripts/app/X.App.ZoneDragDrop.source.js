T.cache('X.App.ZoneDragDrop','K,X.ZoneDragDrop',function(e){
	var H=K.entity(e.pkg),
		ZDD=K.entity(e.dps[1],true),
		D=document,
		B=D.body,
		ENABLE=1,
		DISABLE=2,
		barId=K.guid('x_app_zdd_bar_'),
		pointerId=K.guid('x_app_zdd_pointer_'),
		styleId=K.guid('x_app_zdd_css_'),
		tmpl=['.<#=@styleId#>_pointer{position:absolute;height:14px;overflow:hidden;',
			  'line-height:14px;padding:1px 2px;border:solid 2px #ccc;color:#fff;}',
			  '.<#=@styleId#>_bgred{background-color:red}',
			  '.<#=@styleId#>_bgreen{background-color:green}',
			  '.<#=@styleId#>_ib{position:absolute;overflow:hidden;display:none;border-width:3px;}',
			  '.<#=@styleId#>_ib div{overflow:hidden;background-color:#000;}',
			  '.<#=@styleId#>_ib_h{border-color:transparent #000;border-style:dashed solid;}',
			  '.<#=@styleId#>_ib_h div{height:2px;}',
			  '.<#=@styleId#>_ib_v{border-color:#000 transparent;border-style:solid dashed;}',
			  '.<#=@styleId#>_ib_v div{width:2px;height:100%}'
			  ].join(''),
		renderStyle=function(){
			if(!renderStyle.append){
				renderStyle.append=true;
				T.load({
					type:'css',
					id:styleId,
					code:K.tpFilled(tmpl,{
						styleId:styleId
					})
				});
			}
		},
		stylePointer=styleId+'_pointer',
		stylePointerRed=styleId+'_bgred',
		stylePointerGreen=styleId+'_bgreen',
		styleInserbar=styleId+'_ib',
		styleInserbarH=styleId+'_ib_h',
		styleInserbarV=styleId+'_ib_v';

	H.ZoneDragDrop=K.clazz(ZDD,function(base,proto,klass,baseKlass,HANDV){
		K.mix(klass,{
			ANCHOR_HORIZONTAL:1,
			ANCHOR_VERTICAL:2,
			TEXT_ALLOW:'可放置',
			TEXT_DISALLOW:'不可放置'
		});
		HANDV=klass.ANCHOR_HORIZONTAL|klass.ANCHOR_VERTICAL;

		return {
			ctor:function(cfg){
				renderStyle();

				var me=this,df=K.mix({
					anchorPosition:HANDV,
					textAllow:klass.TEXT_ALLOW,
					textDisallow:klass.TEXT_DISALLOW
				},cfg);
				me.on(ZDD.DRAG_START,me._$dragStart=K.bind(me._dragStart,me));
				me.on(ZDD.DRAG_END,me._$dragEnd=K.bind(me._dragEnd,me));
				me.on(ZDD.HOVER_CHILD_PLACE_CHANGED,me._$hoverChildPlaceChanged=K.bind(me._hoverChildPlaceChanged,me));
				me.on([ZDD.WIN_SCROLL,ZDD.ZONE_SCROLL],me._$zoneScroll=K.bind(me._zoneScroll,me));
				me.on(ZDD.DRAG_MOVE,me._$dragMove=K.bind(me._dragMove,me));
				me.on(ZDD.HOVER_NODE_CHANGED,me._$dragMoveHoverNodeChanged=function(e){
					e.cancel=K.nodeIn(e.hoverNode,barId);
				});

				K.mix(me,df);
			},
			_createBar:function(){
				if(!K(barId)){
					var me=this,
						d=K('div',{id:barId});
					d.className=styleInserbar;

					B.appendChild(d);
					d.appendChild(K('div',true));
				}
			},
			_updateBarPositionUI:function(position,childBound,whichSide){
				//T.log('update',whichSide);
				if(position===klass.ANCHOR_HORIZONTAL){
					K.nodeClass(barId,styleInserbarV,styleInserbarH);

					K.nodeStyle(barId,{
						width:childBound.width-6,
						height:2,
						display:'block'
					});
					if(ZDD.TOP===whichSide){
						K.nodeStyle(barId,{
							left:childBound.x,
							top:childBound.y-2
						});
					}else{
						K.nodeStyle(barId,{
							left:childBound.x,
							top:childBound.y+childBound.height-2
						});
					}
				}else if(position===klass.ANCHOR_VERTICAL){
					K.nodeClass(barId,styleInserbarH,styleInserbarV);

					K.nodeStyle(barId,{
						height:childBound.height-6,
						width:2,
						display:'block'
					});
					if(ZDD.LEFT===whichSide){
						K.nodeStyle(barId,{
							left:childBound.x-2,
							top:childBound.y
						});
					}else{
						K.nodeStyle(barId,{
							left:childBound.x+childBound.width-2,
							top:childBound.y
						});
					}
				}
			},
			_moveBar:function(position,childBound){
				var me=this,
					hasFound=false;

				if(me.anchorPosition&klass.ANCHOR_HORIZONTAL){
					if(position&ZDD.TOP){
						me._updateBarPositionUI(klass.ANCHOR_HORIZONTAL,childBound,ZDD.TOP);
						hasFound=true;
					}else if(position&ZDD.BOTTOM){
						me._updateBarPositionUI(klass.ANCHOR_HORIZONTAL,childBound,ZDD.BOTTOM);
						hasFound=true;
					}else{
						K.nodeStyle(barId,{
							display:'none'
						});
					}
				}
				if(!hasFound&&me.anchorPosition&klass.ANCHOR_VERTICAL){
					//T.log('now position:',position);
					if(position&ZDD.LEFT){
						me._updateBarPositionUI(klass.ANCHOR_VERTICAL,childBound,ZDD.LEFT);
					}else if(position&ZDD.RIGHT){
						me._updateBarPositionUI(klass.ANCHOR_VERTICAL,childBound,ZDD.RIGHT);
					}else{
						K.nodeStyle(barId,{
							display:'none'
						});
					}
				}
				//alert(node);
			},
			_hideBar:function(){
				var me=this;
				K.nodeStyle(barId,{display:'none'});
			},
			_dragStart:function(e){
				var me=this;
				if(e.dragChild){
					K.nodeStyle(e.dragChild,{opacity:.4});
					me._createBar();
				}
			},
			_updatePointer:function(xy){
				var me=this,
					d=K(pointerId),
					bd=K.body(),
					nb;
				if(!d){
					d=K('div',{id:pointerId});
					d.className=stylePointer;
					B.appendChild(d);
				}
				nb=K.nodeBound(d);
				K.nodeStyle(d,{
					left:Math.max(0,Math.min(xy.pageX+10,bd.maxWidth-nb.width)),
					top:Math.max(0,Math.min(xy.pageY+18,bd.maxHeight-nb.height)),
					display:'block'
				});
			},
			_changePointer:function(icon){
				var enable=icon===ENABLE?stylePointerGreen:stylePointerRed,
					disable=icon===DISABLE?stylePointerGreen:stylePointerRed,
					me=this;

				K.nodeClass(pointerId,disable,enable);
				K.nodeVal(pointerId,icon===ENABLE?me.textAllow:me.textDisallow);
			},
			_hidePointer:function(){
				K.nodeStyle(pointerId,{display:'none'});
			},
			_dragMove:function(e){
				//T.log(e);
				var me=this;
				me._updatePointer(e.evtXY);
			},
			_dragEnd:function(e){
				var me=this;
				me._hideBar();
				me._hidePointer();
				if(e.dragChild){
					K.nodeStyle(e.dragChild,{opacity:1});
				}

				if(e.atPlace){
					if(ZDD.TOP&e.side||ZDD.LEFT&e.side){
						e.dropZone.insertBefore(e.dragChild,e.dropChild);
					}else if(ZDD.BOTTOM&e.side||ZDD.RIGHT&e.side){
						var next=e.dropChild.nextSibling;
						while(next&&next.nodeType!=1){
							next=next.nextSibling;
						}
						e.dropZone.insertBefore(e.dragChild,next);
						if(!next){//如果是最后一个，则滚动
							e.dropZone.scrollTop=e.dropZone.scrollHeight;
						}
					}
				}
			},
			_hoverChildPlaceChanged:function(e){
				var me=this;
				if(e.hoverChild!=e.dragChild){
					if(me.anchorPosition === HANDV){
						if(e.sideChanged){
							me._moveBar(e.side,e.childBound);
						}
					}else if(e.positionChanged){
						me._moveBar(e.position,e.childBound);
					}
					if(e.atPlace){
						me._changePointer(ENABLE);
					}else{
						me._changePointer(DISABLE);
					}
				}else{
					me._hideBar();
					me._changePointer(DISABLE);
				}
			},
			_zoneScroll:function(){
				var me=this;
				me._hideBar();
				me._changePointer(DISABLE);
			},
			dispose:function(){
				var me=this;
				me.un(ZDD.DRAG_START,me._$dragStart);
				me.un(ZDD.DRAG_END,me._$dragEnd);
				me.un(ZDD.HOVER_CHILD_PLACE_CHANGED,me._$hoverChildPlaceChanged);
				me.un([ZDD.WIN_SCROLL,ZDD.ZONE_SCROLL],me._$zoneScroll);
				me.un(ZDD.DRAG_MOVE,me._$dragMove);
				me.un(ZDD.HOVER_NODE_CHANGED,me._$dragMoveHoverNodeChanged);

				base.dispose.call(me);

				K.nodeDel(pointerId);
				K.nodeDel(barId);
			}
		}
	});
});