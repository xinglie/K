try {
	var fso=new ActiveXObject("Scripting.FileSystemObject"),
		args=WScript.Arguments,
		folder=WScript.ScriptFullName,
		selfName=WScript.ScriptName,
		parentFolder,
		folderSeg,
		parentFolderSeg,
		md5=function(){function o(d){return p(d)}function p(d){return q(r(s(d),d.length*m))}function r(d,a){d[a>>5]|=128<<a%32;d[(a+64>>>9<<4)+14]=a;a=1732584193;for(var c=-271733879,b=-1732584194,e=271733878,f=0;f<d.length;f+=16){var k=a,t=c,u=b,v=e;a=g(a,c,b,e,d[f+0],7,-680876936);e=g(e,a,c,b,d[f+1],12,-389564586);b=g(b,e,a,c,d[f+2],17,606105819);c=g(c,b,e,a,d[f+3],22,-1044525330);a=g(a,c,b,e,d[f+4],7,-176418897);e=g(e,a,c,b,d[f+5],12,1200080426);b=g(b,e,a,c,d[f+6],17,-1473231341);c=g(c,b,e,a,d[f+7],22,-45705983);a=g(a,c,b,e,d[f+8],7,1770035416);e=g(e,a,c,b,d[f+9],12,-1958414417);b=g(b,e,a,c,d[f+10],17,-42063);c=g(c,b,e,a,d[f+11],22,-1990404162);a=g(a,c,b,e,d[f+12],7,1804603682);e=g(e,a,c,b,d[f+13],12,-40341101);b=g(b,e,a,c,d[f+14],17,-1502002290);c=g(c,b,e,a,d[f+15],22,1236535329);a=h(a,c,b,e,d[f+1],5,-165796510);e=h(e,a,c,b,d[f+6],9,-1069501632);b=h(b,e,a,c,d[f+11],14,643717713);c=h(c,b,e,a,d[f+0],20,-373897302);a=h(a,c,b,e,d[f+5],5,-701558691);e=h(e,a,c,b,d[f+10],9,38016083);b=h(b,e,a,c,d[f+15],14,-660478335);c=h(c,b,e,a,d[f+4],20,-405537848);a=h(a,c,b,e,d[f+9],5,568446438);e=h(e,a,c,b,d[f+14],9,-1019803690);b=h(b,e,a,c,d[f+3],14,-187363961);c=h(c,b,e,a,d[f+8],20,1163531501);a=h(a,c,b,e,d[f+13],5,-1444681467);e=h(e,a,c,b,d[f+2],9,-51403784);b=h(b,e,a,c,d[f+7],14,1735328473);c=h(c,b,e,a,d[f+12],20,-1926607734);a=i(a,c,b,e,d[f+5],4,-378558);e=i(e,a,c,b,d[f+8],11,-2022574463);b=i(b,e,a,c,d[f+11],16,1839030562);c=i(c,b,e,a,d[f+14],23,-35309556);a=i(a,c,b,e,d[f+1],4,-1530992060);e=i(e,a,c,b,d[f+4],11,1272893353);b=i(b,e,a,c,d[f+7],16,-155497632);c=i(c,b,e,a,d[f+10],23,-1094730640);a=i(a,c,b,e,d[f+13],4,681279174);e=i(e,a,c,b,d[f+0],11,-358537222);b=i(b,e,a,c,d[f+3],16,-722521979);c=i(c,b,e,a,d[f+6],23,76029189);a=i(a,c,b,e,d[f+9],4,-640364487);e=i(e,a,c,b,d[f+12],11,-421815835);b=i(b,e,a,c,d[f+15],16,530742520);c=i(c,b,e,a,d[f+2],23,-995338651);a=j(a,c,b,e,d[f+0],6,-198630844);e=j(e,a,c,b,d[f+7],10,1126891415);b=j(b,e,a,c,d[f+14],15,-1416354905);c=j(c,b,e,a,d[f+5],21,-57434055);a=j(a,c,b,e,d[f+12],6,1700485571);e=j(e,a,c,b,d[f+3],10,-1894986606);b=j(b,e,a,c,d[f+10],15,-1051523);c=j(c,b,e,a,d[f+1],21,-2054922799);a=j(a,c,b,e,d[f+8],6,1873313359);e=j(e,a,c,b,d[f+15],10,-30611744);b=j(b,e,a,c,d[f+6],15,-1560198380);c=j(c,b,e,a,d[f+13],21,1309151649);a=j(a,c,b,e,d[f+4],6,-145523070);e=j(e,a,c,b,d[f+11],10,-1120210379);b=j(b,e,a,c,d[f+2],15,718787259);c=j(c,b,e,a,d[f+9],21,-343485551);a=l(a,k);c=l(c,t);b=l(b,u);e=l(e,v)}return w==16?[c,b]:[a,c,b,e]}function n(d,a,c,b,e,f){return l(x(l(l(a,d),l(b,f)),e),c)}function g(d,a,c,b,e,f,k){return n(a&c|~a&b,d,a,e,f,k)}function h(d,a,c,b,e,f,k){return n(a&b|c&~b,d,a,e,f,k)}function i(d,a,c,b,e,f,k){return n(a^c^b,d,a,e,f,k)}function j(d,a,c,b,e,f,k){return n(c^(a|~b),d,a,e,f,k)}function l(d,a){var c=(d&65535)+(a&65535);d=(d>>16)+(a>>16)+(c>>16);return d<<16|c&65535}function x(d,a){return d<<a|d>>>32-a}function s(d){for(var a=Array(),c=(1<<m)-1,b=0;b<d.length*m;b+=m)a[b>>5]|=(d.charCodeAt(b/m)&c)<<b%32;return a}function q(d){for(var a=y?"0z1y2x3w4v5u6g7k":"0123456789abcdef",c="",b=0;b<d.length*4;b++)c+=a.charAt(d[b>>2]>>b%4*8+4&15)+a.charAt(d[b>>2]>>b%4*8&15);return c}var y=1,m=8,w=16;return o}(),
		cfg={
			cfgFile:'_.cfg',//配置文件
			renderBootstrapPath:'',//输出的启动文件的路径
			hostTemplateFile: 'T.Host.tmpl',//Ctrl公开方法宿主文件模板 分开的用
			//verTemplateFile:'Ctrl.FilesVer.tmpl',//版本文件模板
			//bootTemplateFile:'Ctrl.Bootstrap.tmpl',//页脚启动文件模板
			//bootSingleTemplateFile:'Ctrl.Bootstrap.Single.tmpl',//单个启动文件
			renderHostFile: 'T.Host.inc',//输出的宿主文件
			renderBootFile:'T.inc',//输出的启动包含文件
			renderBootstrapFile:'T.js',//核心启动文件
			renderBootstrapSourceFile:'T.source.js',//未压缩的核心启动文件
			renderSingleBootFile:'T.Single.inc',//输出的单个启动包含文件
			renderVerFile:'T.FVS.js',//输出的文件版本控制文件
			renderVerSourceFile:'T.FVS.source.js',//未压缩的文件版本文件
			suffixReg:{
				js:{
					source:/\.source\.js$/i,
					release:/\.js$/i
				},
				css:{
					source:/\.css$/i,
					release:/\.css$/i
				}
			},
			//packedFolderRoot:'../',//从哪个文件夹下进行打包
			packedFolders:[],//要打包的文件夹  自动添加当前目录下的父目录
			ignoreFolders:[],//只能忽略打包文件夹中的子文件夹 自动添加当前目录 不打包工具目录
			segIsSign:false,//路径分割符是不圆点
			isDev:args.length&&args(0)=='true',//是不是按开发版本输出
			jsFileFormat:'#k.js?v=#v.js',
			cssFileFormat:'#k.css?v=#v.css',
			coreLibFile:'',
			verCtrlFileTmpl:'',
			bootstrapTmpl:'',
			singleBootstrapTmpl:'',
			documentRoot:'',
			watchChanged:['K.js','T.js','K.source.js','T.source.js'],//需要监视有没有改动的文件
			folderInIgnored:function(folder){
				/// <summary>文件是否在忽略列表中</summary>
				/// <param name="folder" type="String">文件夹</param>
				/// <returns type="Boolean" />
				folder+='';
				folder=folder.replace(/\\|\/$/,'').replace(/^[\s\S]+[\/\\]([^\\\/]+)$/,'$1');
				for(var p=0;p<cfg.ignoreFolders.length;p++){
					if(folder==cfg.ignoreFolders[p])return true;
				}
				return false;
			},
			trim:function(str){return str.replace(/^[\s\xa0\u3000\uFEFF]+|[\s\xa0\u3000\uFEFF]+$/g,'')},
			getFileContent:function(file){
				var ts,rs='';
				if(fso.FileExists(file)){
					try{
						ts=fso.OpenTextFile(file,1);
						rs=ts.ReadAll();
						ts.Close();
					}catch(e){
						WScript.Echo("read file error:"+e.message+"@"+file);
						throw new Error('getFileContent:'+e.message);
					}
				}
				return rs;
			},
			getFileMd5:function(file){
				try{
					var ts=fso.OpenTextFile(file,1),str=ts.ReadAll();
					ts.Close();
				}catch(e){
					WScript.Echo('getFileMd5 error :'+e.message);
					str='k';
				}
				return md5(str);
			},
			writeFile:function(file,content){
				var ado=new ActiveXObject("adodb.stream");
				ado.Type=2;
				ado.Charset='utf-8';
				ado.Mode=3;
				ado.Open();
				ado.Position=0;
				ado.WriteText(content.substr(0,1));   // no BOM
				ado.SetEOS();
				ado.Position = 0;  
				ado.Type = 1;        // adTypeBinary  
				ado.Position = 3;    // skip BOM bytes  
				var bs = ado.Read(); // read the byte array of chars  
				ado.Position = 0;  
				ado.Write(bs);       // overwrite the BOM with the byte array of first char  
				ado.SetEOS();  
				ado.Position = 0;  
				ado.Type = 2;        // adTypeText  
				ado.Position = ado.Size;  
				ado.WriteText(content.substr(1));
				ado.Position=0;
				ado.Type=1;
				ado.SaveToFile(file,2);
				ado.Close();
			},
			getFilePathRDR:function(file){
				var dr=cfg.documentRoot+'',
					folder=fso.GetFile(file).ParentFolder;
				if(folder+''==parentFolder)return'';
				return (file+'').replace(new RegExp(dr.replace(/\\/g,'\\\\')),'').replace(/\\/g,'/').replace(file.Name,'');
			},
			walkFolder:function(folder,suffix,refArray,refInfo){//遍历目录下的所有js文件
				//WScript.Echo(folder);
				var files=new Enumerator(fso.GetFolder(folder).Files),
					suffixInfo=cfg.suffixReg[suffix],
					file,
					hash,
					path;
				for(;!files.atEnd();files.moveNext()){
					//WScript.Echo(files.item());
					file=fso.GetFile(files.item());
					if(file.Name
						&& file.Name!=cfg.renderBootstrapFile
						&& file.Name!=cfg.renderBootstrapSourceFile
						&& file.Name!=cfg.renderVerFile
						&& file.Name!=cfg.renderVerSourceFile){
						if(cfg.isDev){
							if(suffixInfo.source.test(file.Name)){
								WScript.Echo('process file:'+file.Name);
								path=cfg.getFilePathRDR(file);
								if(path)path='p:"'+path+'"';
								//hash='-';
								refArray.push('"'+refInfo.folder+file.Name.replace(suffixInfo.source,'')+'":{'+path+'}');
							}
						}else{
							if(suffixInfo.release.test(file.Name)&&!cfg.suffixReg.js.source.test(file.Name)){
								WScript.Echo('process file:'+file.Name);
								//WScript.StdIn.ReadLine();
								hash=cfg.getFileMd5(file);
								path=cfg.getFilePathRDR(file);
								if(path)path=',p:"'+path+'"';
								refArray.push('"'+refInfo.folder+file.Name.replace(suffixInfo.release,'')+'":{h:"' + hash+ '"'+path+'}');
							}
						}
					}
				}
				//WScript.Echo([folder,!cfg.folderInIgnored(folder)]);
				if(cfg.segIsSign&&fso.FolderExists(folder)){
					var folders=new Enumerator(fso.GetFolder(folder).SubFolders),fd,oldFolder=refInfo.folder;
					for(;!folders.atEnd();folders.moveNext()){
						fd=folders.item();
						if(!cfg.folderInIgnored(fd)){
							refInfo.folder=oldFolder;
							//WScript.Echo([refInfo.folder,fd.Name]);
							refInfo.folder=refInfo.folder+fd.Name+".";
							cfg.walkFolder(fd,refArray,refInfo);
						}
					}
				}
			},
			cfgFileMap:{
				segIsSign:function(v){
					if(v){
						cfg.segIsSign=v=='true';
					}
				},
				packedFolders:function(v){
					if(v){
						v=v.split(',');
						for(var i=0;i<v.length;i++){
							cfg.packedFolders.push(v[i]);
						}
					}
				},
				ignoreFolders:function(v){
					if(v){
						v=v.split(',');
						for(var i=0;i<v.length;i++){
							cfg.ignoreFolders.push(v[i]);
						}
					}
				},
				loadJSFileFormat:function(v){
					if(v){
						cfg.jsFileFormat=v.replace(/#filename#/g,'#k').replace(/#filehash#/g,'#v');
					}
				},
				loadCSSFileFormat:function(v){
					if(v){
						cfg.cssFileFormat=v.replace(/#filename#/g,'#k').replace(/#filehash#/g,'#v');
					}
				},
				renderBootstrapPath:function(v){
					if(v){
						cfg.renderBootstrapPath=v.charAt(v.length-1)=='/'?v:v+'/';
					}
				},
				verCtrlFileTmpl:function(v){
					cfg.verCtrlFileTmpl=v;
				},
				bootstrapTmpl:function(v){
					cfg.bootstrapTmpl=v;
				},
				singleBootstrapTmpl:function(v){
					cfg.singleBootstrapTmpl=v;
				},
				documentRoot:function(v){
					cfg.documentRoot=fso.GetFolder(v);
				}
			},
			processCfgFile:function(){//处理配置文件
				var cs=cfg.getFileContent(folderSeg+cfg.cfgFile);
				if(cs){
					cs=cs.split(/\r\n|\r|\n/g);
					for(var i=0,e,ki,key,value;i<cs.length;i++){
						e=cfg.trim(cs[i]);
						if(e.charAt(0)!='#'){
							ki=e.indexOf('=');
							key=e.substr(0,ki);
							value=e.substr(ki+1);
							if(cfg.cfgFileMap[key]){
								cfg.cfgFileMap[key](value);
							}
						}
					}
				}
				if(cfg.isDev)cfg.jsFileFormat=cfg.jsFileFormat.replace(/#k/g,'#k.source');
			},
			processWatch:function(){//处理监视的文件
				for(var i=0;i<cfg.watchChanged.length;i++){
					if(!fso.FileExists(parentFolderSeg+cfg.watchChanged[i])){
						fso.CopyFile(folderSeg+cfg.watchChanged[i],parentFolderSeg+cfg.watchChanged[i]);
					}else{
						var tFile=fso.GetFile(parentFolderSeg+cfg.watchChanged[i]);
						file=fso.GetFile(folderSeg+cfg.watchChanged[i]);
						//WScript.Echo([file.Name,file.DateLastModified!=tFile.DateLastModified]);
						//WScript.Echo(cfg.getFileMd5(file),cfg.getFileMd5(tFile));
						if(cfg.getFileMd5(file)!=cfg.getFileMd5(tFile)){
							fso.CopyFile(folderSeg+cfg.watchChanged[i],parentFolderSeg+cfg.watchChanged[i]);
						}
					}
				}
			},
			processPacked:function(type){//开始打包
				for(var idx=0,arr=[],info={};idx<cfg.packedFolders.length;idx++){
					info.folder='';
					cfg.walkFolder(cfg.packedFolders[idx],type,arr,info);
				}
				return arr;
			}
		};
	/*start*/
	if (folder) {
		//处理目录
		folder = fso.GetFile(folder).ParentFolder;
		parentFolder=fso.GetParentFolderName(folder);

		cfg.packedFolders.unshift(parentFolder);
		cfg.ignoreFolders.unshift(folder);
		folderSeg=folder+'\\';
		parentFolderSeg=parentFolder+'\\';
		WScript.Echo('start process config file');
		cfg.processCfgFile();
		//WScript.Quit();
		//先处理当前目录下被监视的文件是否有改动，如果有改变就拷贝到父目录内
		WScript.Echo('start process watch files');
		cfg.processWatch();
		// start 处理父目录及要打包的目录的js文件
		WScript.Echo('start process packed files');
		var jsArr=cfg.processPacked('js'),
			jsList=jsArr.join(','),
			cssArr=cfg.processPacked('css'),
			cssList=cssArr.join(','),
			verFileHash=md5(jsList+cssList),
			tempHash,tmpl=cfg.getFileContent(folderSeg+ cfg.hostTemplateFile);
		cfg.writeFile(parentFolderSeg + cfg.renderHostFile,tmpl.replace(/<#=cache#>/g,!cfg.isDev)
						  .replace(/<#=sign_is_seg#>/g,cfg.segIsSign)
						  .replace(/<#=js_url_format#>/g,cfg.jsFileFormat)
						  .replace(/<#=css_url_format#>/g,cfg.cssFileFormat)
			              .replace(/<#=file_ver#>/g,verFileHash)
						  .replace(/[\r\n\t]/g,'')
						  .replace(/;}/g,'}'));
		WScript.Echo('generate control file');
		//生成版本控制文件，核心!!
		tmpl=cfg.verCtrlFileTmpl;//cfg.getFileContent(folderSeg+ cfg.verTemplateFile);
		cfg.writeFile(parentFolderSeg+ cfg.renderVerFile,tmpl
						  .replace(/<#=js_vers#>/g,jsList)
						  .replace(/<#=css_vers#>/g,cssList));

		fso.CopyFile(parentFolderSeg+ cfg.renderVerFile,parentFolderSeg+ cfg.renderVerSourceFile);

		//如果有启动文件，则获取md5，要自动升级启动文件!!
		var coreFile=cfg.isDev?cfg.renderBootstrapSourceFile:cfg.renderBootstrapFile;

		if(fso.FileExists(parentFolderSeg+coreFile)){
			file=fso.GetFile(parentFolderSeg+coreFile);
			tempHash=cfg.getFileMd5(file);
		}else{
			WScript.Echo("Cannot find "+coreFile);
			throw coreFile;//没有启动文件什么也干不了，所以退出
		}

		//生成启动文件包含文件，上下分离的页脚启动文件
		tmpl=cfg.bootstrapTmpl;//cfg.getFileContent(folderSeg+ cfg.bootTemplateFile);
		cfg.writeFile(parentFolderSeg+ cfg.renderBootFile,tmpl.replace(/<#=boot_ver#>/g,tempHash)
						  .replace(/<#=boot_strap#>/g,coreFile)
						  .replace(/<#=render_bootstrap_path#>/g,cfg.renderBootstrapPath));
		//生成单个的启动文件包含文件
		tmpl=cfg.singleBootstrapTmpl;//cfg.getFileContent(folderSeg+ cfg.bootSingleTemplateFile);
		cfg.writeFile(parentFolderSeg+ cfg.renderSingleBootFile,tmpl.replace(/<#=cache#>/g,!cfg.isDev)
						  .replace(/<#=sign_is_seg#>/g,cfg.segIsSign)
						  .replace(/<#=render_bootstrap_path#>/g,cfg.renderBootstrapPath)
						  .replace(/<#=js_url_format#>/g,cfg.jsFileFormat)
						  .replace(/<#=css_url_format#>/g,cfg.cssFileFormat)
						  .replace(/<#=boot_ver#>/g,tempHash)
						  .replace(/<#=file_ver#>/g, verFileHash)
						  .replace(/<#=boot_strap#>/g,coreFile));
		WScript.Echo('done!');
		WScript.Sleep(1000);
		WScript.Quit();
	}
} catch (e) {
	WScript.Echo('error:' + e.message);
	WScript.StdIn.ReadLine();
}