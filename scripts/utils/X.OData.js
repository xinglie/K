T.cache("X.OData","K",function(e){var c=K.entity(e.pkg);c.OData={UPDATE:"_update",ADD:"_add",DELETE:"_delete",wrapArray:function(a){K.isArr(a)||T.error("wrapArray args error");return new c.RData.Array(a)},wrapObject:function(a){K.isObj(a)||T.error("wrapObject args error");return new c.RData.Object(a)},Array:K.clazz(K.Evt,{ctor:function(a){var b=this;b.$arr=a},count:function(){var a=this;return a.$arr.length},push:function(a){var b=this;b.fire(c.RData.ADD,{item:a});b.$arr.push(a)},shift:function(){var a=
this,b=a.$arr.shift();a.fire(c.RData.DELETE,{item:b});return b},unshift:function(a){var b=this;b.fire(c.RData.ADD,{item:a});return b.$arr.unshift(a)},pop:function(){var a=this,b=a.$arr.pop();a.fire(c.RData.DELETE,{item:b});return b}}),Object:K.clazz(K.Evt,{ctor:function(a){var b=this;b.$obj=a},set:function(a,b){var d=this,f=T.has(d.$obj,a);d.fire(f?c.RData.UPDATE:c.RData.ADD,{key:a,value:b});d.$obj[a]=b},get:function(a){var b=this;return b.$obj[a]},del:function(a){var b=this;b.fire(c.RData.DELETE,
{key:a});delete b.$obj[a]}})}});
