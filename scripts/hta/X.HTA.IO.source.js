T.cache('X.HTA.IO','K',function(e){
	var H=K.entity(e.pkg),
		FSO=new ActiveXObject("Scripting.FileSystemObject"),
		leftReg=/^[\s\S]*\//,
		rightReg=/^[\s\S]*\\/,
		dotToEndReg=/\.[\s\S]*$/,
		startToDot=/^[\s\S]*\./,
		firstUpper=/[A-Z]/,
		firstUpperToLower=function(m){
		    return m.toLowerCase();
		},
		FileAttrs={
			Name:String,
			Path:String,
			DateCreated:Date,
			DateLastAccessed:Date,
			DateLastModified:Date,
			Size:Number,
			Type:String,
			ShortPath:String,
			Attributes:Number
		},
		/*
			Attributes->{
	’            Normal            0 普通文件。 没有设置任何属性
	’            ReadOnly      1 只读文件。 可读写
	’            Hidden            2 隐藏文件。 可读写
	’            System            4 系统文件。 可读写
	’            Directory      16 文件夹或目录。 只读
	’            Archive      32 上次备份后已更改的文件。 可读写
	’            Alias            1024 链接或快捷方式。 只读
	’            Compressed      2048 压缩文件。 只读
			}
		*/
		FolderAttrs={
			Drive:String,
			IsRootFolder:Boolean,
			SubFolders:Array,
			Files:Array,
			//DateCreated:Date,
			//DateLastAccessed:Date,
			//DateLastModified:Date,
			ParentFolder:String,
			ShortName:String,
			ShortPath:String,
			Attributes:Number,
			Type:String
		},
		attrsWrap=function(attrs,obj){
			var temp={},ctor,item;
			for(var p in attrs){
				if(T.has(attrs,p)){
					ctor=attrs[p];
					if(ctor===Array){
						var arr=[];
						var ems=new Enumerator(obj[p]);
						for(;!ems.atEnd();ems.moveNext()){
							arr.push(ems.item());
						}
						item=arr;
					}else{
						item=new ctor(obj[p]);
					}
					temp[p.replace(firstUpper,firstUpperToLower)]=item;
				}
			}
			return temp;
		},
		EMPTY='';
	H.IO={
		folderExists:function(f){
			return FSO.FolderExists(f);
		},
		fileExists:function(f){
			return FSO.FileExists(f);
		},
		createFolderByPath:function(path){
			var arr=path.split('\\'),folder='';
			for(var i=0;i<arr.length;i++){
				if(arr[i]){
					folder=folder+arr[i]+"\\";
					if(!FSO.FolderExists(folder)){
						FSO.CreateFolder(folder);
					}
				}
			}
		},
		getFileObject:function(file){
			var me=this;
			if(me.fileExists(file)){
				var f=FSO.GetFile(file);
				var fileObject=attrsWrap(FileAttrs,f);
				return fileObject;
			}
			return null;
		},
		getFolderObject:function(path){
			var me=this;
			if(me.folderExists(path)){
				var d=FSO.GetFolder(path);
				var folderObject=attrsWrap(FolderAttrs,d);
				return folderObject;
			}
			return null;
		},
		getFileFullName:function(file){
			return String(file).replace(leftReg,EMPTY).replace(rightReg,EMPTY);
		},
		getFileExtensionName:function(file){
			var fn=this.getFileFullName(file);
			if(fn){
				fn=fn.replace(startToDot,EMPTY);
			}
			return fn;
		},
		getFileBaseName:function(file){
			var fn=this.getFileFullName(file);
			if(fn){
				fn=fn.replace(dotToEndReg,EMPTY);
			}
			return fn;
		},
		folderDialog:function(ops){
			var df=K.mix({
				Hwnd:0,
				title:'select',
				options:0,
				rootFolder:null
			},ops);
			var shell=new ActiveXObject("Shell.application");
			//更多shell http://baike.baidu.com/view/9416848.htm
			var f=shell.BrowseForFolder(df.Hwnd,df.title,df.options,df.rootFolder);
			if(f&&f.Self){
				return f.Self.Path;
			}
			return '';
		},
		fileDialog:function(ops){
			var ie=new ActiveXObject('InternetExplorer.Application');
			ie.Visible=false;
			ie.Navigate('about:blank');
			ie.Document.write('<input type="file" id="_" />');
			ie.Document.getElementById('_').click();
			var file=ie.Document.getElementById('_').value;
			ie.Quit();
			return file;
		},
		readAsString:function(file){
			var ado=new ActiveXObject("adodb.stream");
			ado.Type=2;
			ado.Mode=3;
			ado.Open();
			ado.LoadFromFile(file);
			var str=ado.ReadText();
			ado.Close();
			return str;
		},
		readAsStream:function(file){
			var ado = new ActiveXObject("adodb.stream"); 
			ado.Type = 1;//1=adTypeBinary                
			ado.Open();
			ado.LoadFromFile(file);
			var stream=ado.Read();
			ado.Close();
			return stream;
		},
		writeByStream:function(file,stream){
			var ado = new ActiveXObject("adodb.stream"); 
			ado.Type = 1;//1=adTypeBinary                
			ado.Open();
			ado.Write(stream); 
			ado.SaveToFile(file,2);
			ado.Close();
		},
		writeByString:function(file,content){
			var ado = new ActiveXObject("adodb.stream"); 
			ado.Type = 2;//1=adTypeBinary                
			ado.Open();
			ado.WriteText(content); 
			ado.SaveToFile(file,2);
			ado.Close();
		},
		writeUTF8ByString:function(file,content){
			var ado = new ActiveXObject("adodb.stream"); 
			ado.Type = 2;//1=adTypeBinary 
			ado.Charset='utf-8';               
			ado.Open();
			ado.WriteText(content); 
			ado.SaveToFile(file,2);
			ado.Close();
		},
		writeUTF8NoBOMByString:function(file,content){
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
		deleteFile:function(file){
			if(this.fileExists(file)){
				FSO.DeleteFile(file);
			}
		},
		deleteFolder:function(folder){
			if(this.folderExists(folder)){
				FSO.DeleteFolder(folder);
			}
		}
	};
});