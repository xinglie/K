T.cache("X.Widget.Autocomplete","K,X.Widget.Base,X.Page",function(f){var j=K.entity(f.pkg),k=K.access(f.dps[1]),e=K.access(f.dps[2]),g=new K.TM(500);j.Autocomplete=K.clazz(k,function(i,l,h){return{ctor:function(a){var b=this;a=K.mix({input:null,data:[]},a);i.ctor.call(b,a);if(K(b.input)){K.on(b.input,["focus","mousedown"],b.$startListen=K.bind(b.startListen,b));K.on(b.input,"blur",b.$stopListen=K.bind(b.stopListen,b));K.on(document,"mousedown",b.$click=function(c,d){d=K.evtTarget(c);if(!K.nodeIn(d,
b.input)&&!K.nodeIn(d,b.id)){b.stopListen();b.hide()}});a=K(b.input);a.autocomplete="off";for(a=a.parentNode;a;){if(a.tagName&&a.tagName.toLowerCase()=="form")a.autocomplete="off";a=a.parentNode}}else T.error("unfound:"+b.input)},searchData:function(a){var b=this;a={data:K.clone(b.data),text:a};b.fire(h.DATA_SEARCH,a);return b.$usingData=a.data},updateDrop:function(a){var b=this,c={list:a};if(!b.isShown)if(!b.isCreated){b.create("div",{position:"absolute"});e.on(e.WIN_RESIZE,b.$winResize=function(){var d=
K.nodeBound(b.input);K.nodeStyle(b.id,{width:d.width,left:d.x,top:d.y+d.height,backgroundColor:"#fff"})})}if(a.length){b.show();b.$winResize();b.fire(h.LIST_CHANGE,c);c.html&&K.nodeVal(b.id,c.html)}else b.hide()},updateData:function(a){var b=this;b.data=a;if(b.$lastText){a=b.searchData(b.$lastText);b.updateDrop(a)}},startListen:function(){var a=this;if(!a.$listenChange)a.$listenChange=function(){var b=K.nodeVal(a.input),c;if(b!=a.$lastText){c={from:a.$lastText,to:b};a.fire(h.VALUE_CHANGE,c);a.$lastText=
b;if(c.prevent)T.log("canceled update drop");else{b=a.searchData(b);a.updateDrop(b)}}};g.has(a.$listenChange)||g.on(a.$listenChange);a.$lastText&&K.isArr(a.$usingData)&&a.$usingData.length&&a.show()},stopListen:function(){g.un(this.$listenChange)},dispose:function(){var a=this;K.un(a.input,["focus","mousedown"],a.$startListen);K.un(a.input,"blur",a.$stopListen);K.un(document,"mousedown",a.$click);e.un(e.WIN_RESIZE,a.$winResize);i.dispose.call(a,arguments)}}},{VALUE_CHANGE:"_value_change",LIST_CHANGE:"_list_change",
DATA_SEARCH:"_data_search"})});