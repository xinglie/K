T.cache('X.Date',['K'],function(e){
	var X=K.entity(e.pkg),
		dateReg={
			y:{
				reg:/y+/gi,
				fn:function(m,d,utc){
					return String(utc?d.getUTCFullYear():d.getFullYear()).slice(-m.length)
				}
			},
			M:{
				reg:/M+/g,
				fn:function(m,d,utc,t){
					t=(utc?d.getUTCMonth():d.getMonth())+1;
					return m.length===1?t:('0'+t).slice(-2)
				}
			},
			d:{
				reg:/d+/gi,
				fn:function(m,d,utc,t){
					t=utc?d.getUTCDate():d.getDate();
					return m.length==1?t:('0'+t).slice(-2)
				}
			},
			h:{
				reg:/h+/gi,
				fn:function(m,d,utc,t){
					t=utc?d.getUTCHours():d.getHours();
					return m.length==1?t:('0'+t).slice(-2)
				}
			},
			m:{
				reg:/m+/g,
				fn:function(m,d,utc,t){
					t=utc?d.getUTCMinutes():d.getMinutes();
					return m.length==1?t:('0'+t).slice(-2)
				}
			},
			s:{
				reg:/s+/g,
				fn:function(m,d,utc,t){
					t=utc?d.getUTCSeconds():d.getSeconds();
					return m.length==1?t:('0'+t).slice(-2)
				}
			},
			S:{
				reg:/S+/g,
				fn:function(m,d,utc,t){
					t=utc?d.getUTCMilliseconds():d.getMilliseconds();
					return String(t).substring(0,m.length);
				}
			}
		};
	X.Date={
		parse:function(date){
			if(date instanceof Date){
				return date;
			}else{
				date=new Date(Date.parse(String(date).replace(/-/g,'/')));
			}
			if(date instanceof Date && (date != "Invalid Date") && !isNaN(date)){
				return date;
			}
			return null;
		},
		format:function(date,format,utc){
			date=X.Date.parse(date);
			format=format||'YYYY/MM/dd hh:mm:ss';
			for(var p in dateReg){
				format=format.replace(dateReg[p].reg,function(match){
					return dateReg[p].fn(match,date,utc);
				});
			}
			return format;
		},
		parseByFormat:function(date,format){
			var result={
				year:0,
				month:0,
				day:0,
				hour:0,
				minute:0,
				second:0,
				millisecond:0
			};
			format.replace(/y+|Y+|M+|m+|d+|D+|h+|H+|s+|S+/g,function(m,startIndex){
				var num;
				date.substring(startIndex).replace(/\d+/,function(d){
					num=parseInt(d,10)
				});
				if(/y+/i.test(m)&&!result.year){
					result.year=num;
				}else if(/M+/.test(m)&&!result.month){
					result.month=num;
				}else if(/d+/i.test(m)&&!result.day){
					result.day=num;
				}else if(/h+/i.test(m)&&!result.hour){
					result.hour=num;
				}else if(/m+/.test(m)&&!result.minute){
					result.minute=num;
				}else if(/s+/.test(m)&&!result.second){
					result.second=num;
				}else if(/\S+/.test(m)&&!result.millisecond){
					result.millisecond=num;
				}
			});
			return result;
		}
	}
});