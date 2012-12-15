T.cache('X.ZoneDragDrop','K',function(e){
	var H=K.entity(e.pkg),
		WIN_SCROLL_OFFSET=15,
		ZONE_SCROLL_OFFSET=20,
		SCROLL_STEP=15,
		SCROLL_INTERVAL=120,
		POINTER_DOWN=['mousedown','touchstart'],
		DDTags={
			'table':'tbody'
		};
	H.ZoneDragDrop=K.clazz(K.ME,function(base,proto,clz,pclz){
		K.mix(clz,{
			LEFT:1,
			TOP:2,
			RIGHT:4,
			BOTTOM:8,
			DRAG_START:'_drag_start',
			DRAG_END:'_drag_end',
			DRAG_MOVE:'_drag_move',
			HOVER_CHILD_CHANGED:'_hover_child_changed',
			HOVER_CHILD_PLACE_CHANGED:'_hover_child_place_changed',
			HOVER_NODE_CHANGED:'_hover_node_changed',
			ZONE_SCROLL:'_zone_scroll',
			WIN_SCROLL:'_win_scroll'
		});
		return {
			addZone:function(id){
				var me=this,node=K(id);
				if(node){
					K.nodeClean(node);
					var tagName=node.tagName.toLowerCase();
					if(DDTags[tagName]==node.firstChild.tagName.toLowerCase()){
						node=node.firstChild;
					}
					if(!me.$list)me.$list=[];
					if(!~K.arrFind(me.$list,node)){
						me.$list.push(node);
						if(!me.$dragStart)me.$dragStart=K.bind(me.dragStart,me);
						K.on(node,POINTER_DOWN,me.$dragStart);
					}
				}
			},
			findHoverZone:function(node){
				var me=this,
					list=me.$list;
				if(K.isArr(list)){
					for(var i=0;i<list.length;i++){
						if(K.nodeIn(node,list[i])){
							return list[i];
						}
					}
				}
				return null;
			},
			findHoverNodePosition:function(nb,evt){
				var position=0,side=0,
					toLeft=-1,toTop=-1,toRight=-1,toBottom=-1,hasNearest=false;
				//T.log([evt.pageY,nb.y,nb.height]);
				if(evt.pageX>=nb.x&&evt.pageX<=nb.x+nb.width){
					position=position|((evt.pageX<=nb.x+nb.width/2)?clz.LEFT:clz.RIGHT);
					//T.log(position);
					toLeft=evt.pageX-nb.x;
					toRight=nb.x+nb.width-evt.pageX;
					hasNearest=true;
				}
				if(evt.pageY>=nb.y&&evt.pageY<=nb.y+nb.height){
					//T.log('x->',position);
					position=position|((evt.pageY<=nb.y+nb.height/2)?clz.TOP:clz.BOTTOM);
					toTop=evt.pageY-nb.y;
					toBottom=nb.y+nb.height-evt.pageY;
					hasNearest=true;
				}
				if(hasNearest){
					var temp=Math.min(toLeft,toTop,toRight,toBottom);
					if(temp>-1){
						if(temp==toLeft){
							side=clz.LEFT;
						}else if(temp==toTop){
							side=clz.TOP;
						}else if(temp==toRight){
							side=clz.RIGHT;
						}else if(temp==toBottom){
							side=clz.BOTTOM;
						}
					}
				}
				return {
					position:position,
					atPlace:hasNearest,
					side:side
				};
			},
			findDirectChild:function(curNode,zone){
				var me=this,result=null,pTag,cTag;
				zone=zone||me.findHoverZone(curNode);
				if(zone){
					while(zone!=curNode){
						if(curNode.parentNode==zone){
							result=curNode;
							break;
						}else{
							curNode=curNode.parentNode;
						}
					}
				}
				return {
					child:result,
					zone:zone
				};
			},
			dragStart:function(e){
				var me=this,args;
				e=K.evt(e);

				me.$hoverInfo={};
				if(K.evtHitest(e)){
					var target=K.evtTarget(e),
						dChild=me.findDirectChild(target);
					if(dChild.child){
						me.$dragStartChild=dChild.child;
						args={
							evtXY:K.evtXY(e),
							dragStartZone:dChild.zone,
							dragChild:dChild.child
						};
						me.fire(clz.DRAG_START,args);
						if(!args.cancel){
							if(!me.$dragMove)me.$dragMove=K.bind(me.dragMove,me);
							if(!me.$dragEnd)me.$dragEnd=K.bind(me.dragEnd,me);
							K.startDrag(dChild.zone,me.$dragMove,me.$dragEnd);
						}
					}
				}
			},
			testHoverChildPlace:function(nb,evtXY,infos){
				var me=this,pos=me.findHoverNodePosition(nb,evtXY);
				//T.log(pos.side);
				/**
					place改变包括接近的边框(side)改变和坐标系统象限(position)改变
				**/
				if(me.$lastHoverChildSide!==pos.side||me.$lastHoverChildPos!==pos.position){
					

					//T.log('side changed:',me.$lastHoverChildSide,pos.side);
					
					//T.log(pos.position,me.$lastHoverChildPos);

					me.fire(clz.HOVER_CHILD_PLACE_CHANGED,K.mix({
						position:pos.position,
						positionChanged:me.$lastHoverChildPos!==pos.position,
						sideChanged:me.$lastHoverChildSide!==pos.side,
						side:pos.side,
						atPlace:pos.atPlace,
						childBound:nb
					},infos));
					//T.log('after fired',me.$lastHoverChildPos,pos.position);
					me.$lastHoverChildSide=pos.side;
					me.$lastHoverChildPos=pos.position;
				}
			},
			dragMove:function(o,e,evtXY,startEvtXY){
				var me=this,
					curHover=K.nodeByXY(evtXY.viewX,evtXY.viewY,K.nodeDoc(o)),
					args;
				//T.log(curHover&&curHover.innerHTML,K.guid());
				//T.log(K.guid());
				me.$hasMove=true;
				me.$evtXY=evtXY;

				me.startZoneScroll();
				me.startWinScroll();

				me.fire(clz.DRAG_MOVE,{evtXY:evtXY});

				if(me.$zoneIsScrolling||me.$winIsScrolling)return;

				
				//T.log(curHover,me.$lastHoverChild);
				if(me.$lastHoverChild!=curHover){
					args={hoverNode:curHover};
					me.fire(clz.HOVER_NODE_CHANGED,args);
					if(args.cancel)return;
					me.$lastHoverChild=curHover;				
					delete me.$lastHoverChildSide;
					var zone=me.findHoverZone(curHover);
					if(zone){
						delete me.$fireNull;
						//T.log(curHover.innerHTML);
						var dChild=me.findDirectChild(curHover,zone),
							args={
								dragStartZone:o,
								currentZone:zone,
								hoverChild:dChild.child,
								dragChild:me.$dragStartChild,
								evtXY:evtXY
							};
						//T.log(args.hoverChild.innerHTML);
						me.$hoverInfo=args;
						me.$hoverChildBound=K.nodeBound(dChild.child);
						me.$hoverZoneBound=K.nodeBound(dChild.zone);

						me.fire(clz.HOVER_CHILD_CHANGED,args);
						//T.log(dChild.child.innerHTML+']]]]'+[me.$hoverChildBound.x,me.$hoverChildBound.y,me.$hoverChildBound.height,evtXY.pageX,evtXY.pageY]);
						me.testHoverChildPlace(me.$hoverChildBound,evtXY,args);

					}else if(!me.$fireNull){
						delete me.$hoverChildBound;
						delete me.$hoverZoneBound;
						me.$fireNull=true;
						var args={
							dragStartZone:o,
							currentZone:zone,
							hoverChild:null,
							dragChild:me.$dragStartChild,
							evtXY:evtXY
						};
						me.$hoverInfo=args;
						me.fire(clz.HOVER_CHILD_CHANGED,args);
						me.fire(clz.HOVER_CHILD_PLACE_CHANGED,K.mix({
							position:0,
							side:0,
							positionChanged:true,
							sideChanged:true,
							atPlace:false,
							childBound:K.nodeBound()
						},args));
						delete me.$lastHoverChildPos;
						delete me.$lastHoverChildSide;
					}
				}else if(me.$hoverChildBound){
					//T.log('same')
					me.testHoverChildPlace(me.$hoverChildBound,evtXY,me.$hoverInfo);
				}
			},
			dragEnd:function(o,e){
				var me=this,
					hasMove=me.$hasMove;
				me.fire(clz.DRAG_END,{
					atPlace:me.$lastHoverChildPos||me.$lastHoverChildSide,
					srcEvent:e,
					dragChild:me.$dragStartChild,
					dropChild:hasMove?me.$hoverInfo.hoverChild:null,
					dropZone:hasMove?me.$hoverInfo.currentZone:null,
					dragStartZone:o,
					position:me.$lastHoverChildPos,
					side:me.$lastHoverChildSide
				});

				delete me.$fireNull;
				delete me.$lastHoverChild;
				delete me.$lastHoverChildSide;
				delete me.$lastHoverChildPos;
				delete me.$hasMove;
				delete me.$evtXY;
				delete me.$hoverChildBound;
				delete me.$hoverInfo;
				delete me.$hoverZoneBound;
				delete me.$dragStartChild;
				delete me.$zoneIsScrolling;
				delete me.$winIsScrolling;

				me.stopZoneScroll();
				me.stopWinScroll();
				//T.log('drag end');
			},
			startZoneScroll:function(){
				var me=this;
				if(!me.$stm)me.$stm=new K.TM(SCROLL_INTERVAL);
				if(!me.$zoneScroll){
					//T.log('start zone scroll',arguments.callee.caller);
					me.$zoneScroll=function(){
						var zoneBound=me.$hoverZoneBound,
							hoverInfo=me.$hoverInfo;
						if(zoneBound&&hoverInfo){
							var tx=0,ty=0,
								evtXY=me.$evtXY,
								zone=hoverInfo.currentZone,
								offset=ZONE_SCROLL_OFFSET;
							//T.log([evtXY.pageX,evtXY.pageY,zoneBound.x,zoneBound.y,zoneBound.height,zoneBound.y+zoneBound.height]);
							if(evtXY.pageX>=zoneBound.x
								&&evtXY.pageX<=zoneBound.x+zoneBound.width
								&&evtXY.pageY>=zoneBound.y
								&&evtXY.pageY<=zoneBound.y+zoneBound.height){
								if(evtXY.pageX-zoneBound.x<offset&&zoneBound.scrollX>0){
									tx=-Math.min(SCROLL_STEP,zoneBound.scrollX);
								}else if(zoneBound.x+zoneBound.width-evtXY.pageX<offset&&zoneBound.scrollX+zoneBound.width<zoneBound.maxWidth){
									tx=Math.min(SCROLL_STEP,zoneBound.maxWidth-zoneBound.scrollX-zoneBound.width);
								}

								if(evtXY.pageY-zoneBound.y<offset&&zoneBound.scrollY>0){
									ty=-Math.min(SCROLL_STEP,zoneBound.scrollY);
								}else if(zoneBound.y+zoneBound.height-evtXY.pageY<offset&&zoneBound.scrollY+zoneBound.height<zoneBound.maxHeight){
									//T.log('to bottom');
									ty=Math.min(SCROLL_STEP,zoneBound.maxHeight-zoneBound.scrollY-zoneBound.height);
								}

							}
							if(tx||ty){
								delete me.$hasMove;
								me.$zoneIsScrolling=true;
								me.$preventWinScroll=true;
								zone.scrollTop+=ty;
								zone.scrollLeft+=tx;
								zoneBound.scrollX+=tx;
								zoneBound.scrollY+=ty;
								me.fire(clz.ZONE_SCROLL);
							}else{
								//T.log('no preventWinScroll');
								delete me.$zoneIsScrolling;
								delete me.$preventWinScroll;
							}
						}
					}
					me.$stm.on(me.$zoneScroll);
				}
			},
			stopZoneScroll:function(){
				var me=this;
				if(me.$stm){
					me.$stm.un(me.$zoneScroll);
				}
				delete me.$zoneScroll;
				delete me.$preventWinScroll;
				//T.log('stop zone scroll');
			},
			startWinScroll:function(){
				var me=this;
				if(!me.$stm)me.$stm=new K.TM(SCROLL_INTERVAL);
				if(!me.$winScroll){
					me.$winScroll=function(){
						if(me.$preventWinScroll)return;
						var evtXY=me.$evtXY,
							nb=K.body(),
							offset=WIN_SCROLL_OFFSET,
							tx=0,ty=0;
						if(evtXY.pageX-nb.scrollX<offset&&nb.scrollX>0){
							tx=-Math.min(SCROLL_STEP,nb.scrollX);
						}else if(nb.scrollX+nb.width-evtXY.pageX<offset&&nb.scrollX+nb.width<nb.maxWidth){
							tx=Math.min(SCROLL_STEP,nb.maxWidth-nb.scrollX-nb.width);
						}
						//K.nodeVal('user',[nb.scrollY,nb.height,evtXY.y,nb.maxHeight,window.innerHeight,document.body.clientHeight]);
						if(evtXY.pageY-nb.scrollY<offset&&nb.scrollY>0){
							ty=-Math.min(SCROLL_STEP,nb.scrollY);
						}else if(nb.scrollY+nb.height-evtXY.pageY<offset&&nb.scrollY+nb.height<nb.maxHeight){
							ty=Math.min(SCROLL_STEP,nb.maxHeight-nb.scrollY-nb.height);
						}
						//T.log(tx,ty,me.$winIsScrolling);
						if(tx||ty){
							delete me.$hasMove;
							me.$winIsScrolling=true;
							
							evtXY.pageX+=tx;
							evtXY.pageY+=ty;
							me.fire(clz.DRAG_MOVE,{evtXY:evtXY});

							window.scrollBy(tx,ty);
							
							me.fire(clz.WIN_SCROLL);
						}else{
							delete me.$winIsScrolling;
						}
					}
					me.$stm.on(me.$winScroll);
				}
			},
			stopWinScroll:function(){
				var me=this;
				if(me.$stm){
					me.$stm.un(me.$winScroll);
					//T.log(me.$winScroll);
					//T.log(me.$stm);
				}
				delete me.$winScroll;
				delete me.$stm;
			},
			removeZone:function(id){
				var node=K(id),
					me=this,
					list=me.$list;
				K.arrRemove(list,node);
				K.un(node,POINTER_DOWN,me.$dragStart);
			},
			dispose:function(){
				var me=this,
					list=me.$list;
				if(K.isArr(list)){
					for(var i=0;i<list.length;i++){
						K.un(list[i],POINTER_DOWN,me.$dragStart);
					}
				}
				me.$list=[];
			}
		}
	});
});