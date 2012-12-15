T.cache('X.Widget.Base','K',function(e){
	var W=K.entity(e.pkg);
	W.Base=K.clazz(K.ME,function(base,proto,clz,bclz){
		K.mix(clz,{
			CREATED:'_created',
			SHOWN:'_shown',
			HIDDEN:'_hidden',
			DISPOSED:'_disposed'
		});
		return {
			ctor:function(cfg){
				/// <summary>constructor method</summary>
				/// <param name="cfg" type="Object">config object</param>
				var me=this;
				me.id=K.guid('x_wgt_');
				me.zIdx=-1;
				me.opacity=1;
				me.isShown=false;
				me.isDisposed=true;
				me.isCreated=false;
				K.mix(me,cfg);
			},
			create:function(tagName,style,parentNode,nodeId){
				/// <summary>create UI</summary>
				/// <param name="tagName" type="String">the tag name of element</param>
				/// <param name="style" type="Object">the style of the element</param>
				/// <param name="parentNode" type="HTMLElement">append to parnet node</param>
				/// <param name="nodeId" type="String">create element id</param>
				var me=this,cnt=K(nodeId=(nodeId||me.id));
				if(!cnt||!me.isCreated){
					me.isDisposed=false;
					style=K.mix({
						zIndex:me.zIdx,
						opacity:me.opacity
					},style);
					if(style.zIndex==-1)delete style.zIndex;
					else me.zIdx=style.zIndex;
					if(style.opacity==1)delete style.opacity;
					else me.opacity=style.opacity;
					cnt=K(tagName,{id:nodeId},style);
					parentNode=K(parentNode)||document.body;
					parentNode.appendChild(cnt);
					me.isCreated=true;
					me.fire(clz.CREATED);
				}
				return cnt;
			},
			show:function(pos){
				/// <summary>show this</summary>
				/// <param name="pos" type="Object">point</param>
				var me=this;
				if(!me.isShown){
					me.isShown=true;
					if(pos){
						K.nodeStyle(me.id,{left:pos.x,top:pos.y});
					}else{
						K.nodeStyle(me.id,{display:'block'});
					}
					if(K.nodeStyle(me.id,'opacity')!=me.opacity){
						me.updateOpacity(me.opacity);
					}
					me.fire(clz.SHOWN);
				}
			},
			hide:function(pos){
				/// <summary>hide self</summary>
				/// <param name="pos" type="Object">point</param>
				var me=this;
				if(me.isShown){
					me.isShown=false;
					if(pos){
						K.nodeStyle(me.id,{left:pos.x,top:pos.y});
					}else{
						K.nodeStyle(me.id,{display:'none'});
					}
					me.fire(clz.HIDDEN);
				}
			},
			dispose:function(){
				/// <summary>destroy self</summary>
				var me=this;
				if(!me.isDisposed){
					K.nodeDel(this.id);
					me.isShown=false;
					me.isDisposed=true;
					me.isCreated=false;
					me.fire(clz.DISPOSED);
				}
			},
			getCenter:function(needScrollbar){
				/// <summary>get the center point ,minus self width and height</summary>
				/// <param name="needScrollbar" type="Boolean">need calc scroll bar</param>
				/// <returns type="Object" />
				var me=this,
					bd=K.body(),
					selfBound=K.nodeBound(me.id),
					left=(bd.width-selfBound.width)/2,
					top=(bd.height-selfBound.height)/2;
				if(needScrollbar){
					left+=bd.scrollX;
					top+=bd.scrollY;
				}
				return {x:left,y:top};
			},
			updateZIdx:function(zIdx){
				/// <summary>update z index</summary>
				/// <param name="zIdx" type="Integer">integer z index number</param>
				K.nodeStyle(this.id,{zIndex:this.zIdx=zIdx});
			},
			updateSize:function(w,h){
				/// <summary>update size</summary>
				/// <param name="w" type="Integer">width</param>
				/// <param name="h" type="Integer">height</param>
				K.nodeStyle(this.id,{
						width:(w||w===0)?w:'auto',
						height:(h||h===0)?h:'auto'
				});
			},
			updateOpacity:function(opc){
				/// <summary>update opacity</summary>
				/// <param name="opc" type="Float">between 0-1</param>
				K.nodeStyle(this.id,{opacity:this.opacity=opc});
			},
			updatePosition:function(x,y){
				/// <summary>update position</summary>
				/// <param name="x" type="Integer">x</param>
				/// <param name="y" type="Integer">y</param>
				K.nodeStyle(this.id,{left:x,top:y});
			}
		}
	});
});