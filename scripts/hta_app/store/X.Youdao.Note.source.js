T.cache('X.Youdao.Note','K,X.HTA.Iframe,X.JSON,X.DataCache',function(e){
	var Y=K.entity(e.pkg),
		HIframe=K.access(e.dps[1]),
		JSON=K.access(e.dps[2]),
		DataCache=K.access(e.dps[3]),
		dataCacne=new DataCache(-1),
		urls={
			checkNoteLogin:'http://note.youdao.com/auth/urs/login.json?app=web',
			login:'https://reg.163.com/logins.jsp',
			noteType:'http://note.youdao.com/yws/mapi/filemeta?method=get&keyfrom=web&dp=1',
			writeNote:'http://note.youdao.com/yws/mapi/file?method=putfile&keyfrom=web',
			noteIndex:'http://note.youdao.com/web',
			readNote:'http://note.youdao.com/yws/mapi/file?method=get&keyfrom=web&dp=0&p=<#=@notePath#>&v=-1'
		},
		checkLogin=function(cb){
			var noteLogin='noteLogin';
			if(dataCacne.has(noteLogin)){
				cb(dataCacne.get(noteLogin));
			}else{
				var xhr=new K.XHR();
				xhr.send({
					url:urls.checkNoteLogin,
					done:function(x){
						var json=JSON.parse(x.responseText);
						if(json.login){
							dataCacne.set(noteLogin,json.login);
						}
						cb(json.login);
					}
				});
			}
		},
		login=function(cb){
			Y.Note.fire(Y.Note.LOGIN_START);
			var ifm=new HIframe();
			ifm.on(HIframe.LOADED,function(e){
				if(~e.url.indexOf('logins.jsp')){
					e.nodeById('username').value='kooboy_li@163.com';
					e.nodeById('password').value='woaigaoshang';
					e.nodeById('url').value=urls.noteIndex;
					e.nodeById('loginBtn').click();
				}else if(~e.url.indexOf('/web')){
					cb();
					ifm.navigate('about:blank');
				}else if(~e.url.indexOf('about:blank')){
					ifm.dispose();
					ifm=null;
					Y.Note.fire(Y.Note.LOGIN_FINISH);
				}
			});
			ifm.navigate(urls.login);
		},
		safeOperate=function(cb){
			checkLogin(function(isLogin){
				if(isLogin){
					cb();
				}else{
					login(cb);
				}
			});
		};
	Y.Note=K.mix({
		LOGIN_START:'_login_start',
		LOGIN_FINISH:'_login_finish',
		getNoteTypes:function(cb){
			var me=this,
				noteTypes='noteTypes';
			if(!dataCacne.has(noteTypes)){
				safeOperate(function(){
					var xhr=new K.XHR();
					xhr.send({
						url:urls.noteType,
						done:function(x){
							var json=JSON.parse(x.responseText),
								list=[],df;
							for(var i=0,one;i<json.length;i++){
								one=json[i];
								if(one.p!='/'){
									if(!df){
										df={
											typePath:one.p,
											typeName:one.tl
										};
									}
									list.push({
										typePath:one.p,
										typeName:one.tl
									});
								}
							}
							var types={
								list:list,
								prior:df
							};
							dataCacne.set(noteTypes,types);
							K.isFn(cb)&&cb(types);
						}
					})
				});
			}else{
				K.isFn(cb)&&cb(dataCacne.get(noteTypes));
			}
		},
		create:function(ops,cb){
			var me=this;
			me.getNoteTypes(function(data){
				var xhr=new K.XHR(),
					df=K.mix({
						title:K.guid('x_youdao_note_'),
						content:K.now(),
						typePath:data.prior.typePath
					},ops);
				xhr.send({
					url:urls.writeNote,
					data:'au=&bs='+df.content+'&p='+df.typePath+'/'+K.guid()+'&src=&su=&tl='+df.title+'&v=-1',
					done:function(x){
						K.isFn(cb)&&cb(x.responseText);
					}
				});
			});
		},
		update:function(ops,cb){
			var me=this,
				df=K.mix({
					title:K.guid('x_youdao_note_'),
					content:K.now(),
					notePath:''
				},ops);
			if(!df.notePath){
				alert('notePath not set');
			}else{
				safeOperate(function(data){
					var xhr=new K.XHR();
					xhr.send({
						url:urls.writeNote,
						data:'au=&bs='+df.content+'&p='+df.notePath+'&src=&su=&tl='+df.title+'&v=-1',
						done:function(x){
							K.isFn(cb)&&cb(x.responseText);
						}
					});
				});
			}
		},
		get:function(pp,cb){
			safeOperate(function(){
				var xhr=new K.XHR();
				xhr.send({
					url:K.tpFilled(urls.readNote,{notePath:pp}),
					done:function(x){
						K.isFn(cb)&&cb(x.responseText);
					}
				})
			});
		}
	},K.ME);
});