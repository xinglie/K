T.cache('X.Converter.Date', ['K'], function(e) {
	var D=K.entity(e.pkg),
		table=[
			0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,
			0x055d2,0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,
			0x095b0,0x14977,0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,
			0x09570,0x052f2,0x04970,0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,
			0x186e3,0x092e0,0x1c8d7,0x0c950,0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,
			0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,0x06ca0,0x0b550,0x15355,0x04da0,
			0x0a5d0,0x14573,0x052d0,0x0a9a8,0x0e950,0x06aa0,0x0aea6,0x0ab50,0x04b60,
			0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,0x096d0,0x04dd5,
			0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b5a0,0x195a6,0x095b0,
			0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,
			0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,
			0x092e0,0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,
			0x092d0,0x0cab5,0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,
			0x15176,0x052b0,0x0a930,0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,
			0x0a4e0,0x0d260,0x0ea65,0x0d530,0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,
			0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,0x0b5a0,0x056d0,0x055b2,0x049b0,
			0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0
		],
		prefix=['初','十','廿','卅','□'],
		days=['日','一','二','三','四','五','六','七','八','九','十'],
		months=['正','二','三','四','五','六','七','八','九','十','冬','腊'],
		sky=['庚','辛','壬','癸','甲','乙','丙','丁','戊','己'],
		earth=['申','酉','戌','亥','子','丑','寅','卯','辰','巳','午','未'];
	//K.log(table.length,table);
	D.Date=K.clazz({
		ctor: function() {
			var date=new Date(),
				lunar=D.Date.solarDateToLunar(date.getFullYear(),
					date.getMonth()+1,
					date.getDate());
			K.mix(this,{
				sYear:date.getFullYear(),
				sMonth:date.getMonth()+1,
				sDay:date.getDate(),
				lYear:lunar.year,
				lMonth:lunar.month,
				lDay:lunar.day,
				monthIsLeap:lunar.monthIsLeap
			});
		},
		/*
			按阴历同步阳历
		*/
		syncByLunar:function(){
			var t=this,
				solar=D.Date.lunarDateToSolar(t.lYear,t.lMonth,t.lDay,t.monthIsLeap);
			t.sYear=solar.year;
			t.sMonth=solar.month;
			t.sDay=solar.day;
		},
		/*
			按阳历同步阴历
		*/
		syncBySolar:function(){
			var t=this,lunar=D.Date.solarDateToLunar(t.sYear,t.sMonth,t.sDay);
			t.lYear=lunar.year;
			t.lMonth=lunar.month;
			t.lDay=lunar.day;
			t.monthIsLeap=lunar.monthIsLeap;
		},
		/*
			更新阳历天
			主要是防止更改年 月后天溢出，设置天为这个年月的最大值
		*/
		checkSDay:function(){
			var t=this,d;
			d=D.Date.solarDaysOfMonth(t.sYear,t.sMonth);
			if(d<t.sDay)t.sDay=d;
		},
		/*
			更新阴历天
			理由同阳历
		*/
		checkLDay:function(){
			var t=this,d;
			if(t.monthIsLeap){
				d=D.Date.lunarDaysOfLeapMonth(t.lYear,t.lMonth);
			}else{
				d=D.Date.lunarDaysOfMonth(t.lYear,t.lMonth);
			}
			if(d&&d<t.lDay)t.lDay=d;
		},
		/*
			获取或设置阳历年
		*/
		sgSYear:function(year,flag){
			var t=this;
			if(year){
				t.sYear=year;
				t.checkSDay();
				if(flag)t.syncBySolar();
			}
			return t.sYear;
		},
		/*
			获取或设置阴历年
		*/
		sgLYear:function(year,flag){
			var t=this;
			if(year){
				t.lYear=year;
				t.checkLDay();
				if(flag)t.syncByLunar();
			}
			return t.lYear;
		},
		/*
			设置或获取阳历月
		*/
		sgSMonth:function(month,flag){
			var t=this;
			if(month){
				t.sMonth=month;
				t.checkSDay();
				if(flag)t.syncBySolar();
			}
			return t.sMonth;
		},
		/*
			设置或获取阴历月
		*/
		sgLMonth:function(month,flag){
			var t=this;
			if(month){
				t.lMonth=month;
				t.checkLDay();
				if(flag)t.syncByLunar();
			}
			return t.lMonth;
		},
		/*
			设置或获取阳历天
		*/
		sgSDay:function(day,flag){
			var t=this;
			if(day){
				t.sDay=day;
				t.checkSDay();//更新天，防止天溢出
				if(flag)t.syncBySolar();
			}
			return t.sDay;
		},
		/*
			设置或获取阴历天
		*/
		sgLDay:function(day,flag){
			var t=this;
			if(day){
				t.lDay=day;
				t.checkLDay();//
				if(flag)t.syncByLunar();
			}
			return t.lDay;
		},
		/*
			设置或获取阴历月是否为润月
		*/
		sgLMonthIsLeap:function(flag,flag1){
			var t=this;
			if(flag!==undefined){
				t.monthIsLeap=!!flag;
				t.checkLDay();
				if(flag1)t.syncByLunar();
			}
			return t.monthIsLeap;
		},
		/*
			获取阴历日期 非Date对象
		*/
		getLunarDate:function(){
			var t=this;
			return{
				year:t.lYear,
				yearText:D.Date.lunarYearToText(t.lYear),
				month:t.lMonth,
				monthText:D.Date.lunarMonthToText(t.lMonth,t.monthIsLeap),
				day:t.lDay,
				dayText:D.Date.lunarDayToText(t.lDay),
				monthIsLeap:t.monthIsLeap
			}
		},
		/*
			获取阳历日期
		*/
		getSolarDate:function(){
			var t=this;
			return{
				year:t.sYear,
				month:t.sMonth,
				day:t.sDay
			}
		},
		/*
			获取日期
		*/
		getDate:function(){
			return {
				solar:this.getSolarDate(),
				lunar:this.getLunarDate()
			}
		}
	});
	K.mix(D.Date,{
		/*
			阳历日期转阴历
		*/
		solarDateToLunar:function(year,month,day){
			var t=this,o={},i,leap=0,temp=0,objDate=new Date(year,month-1,day),gzD,gzM;
			var offset=(Date.UTC(objDate.getFullYear(),objDate.getMonth(),objDate.getDate())-Date.UTC(1900,0,31))/86400000;
			gzD=offset+40;
			gzM=14;
			for(i=1900;i<2050&&offset>0;i++){
				temp=t.lunarDaysOfYear(i);
				offset-=temp;
				gzM+=12;
			}
			if(offset<0){
				offset+=temp;
				i--;
				gzM-=12;
			}
			o.year=i;
			leap=t.lunarLeapMonthOfYear(i);
			o.monthIsLeap=false;
			for(i=1;i<13&&offset>0;i++){
				if(leap>0&&i==(leap+1)&&o.monthIsLeap==false){
					--i;
					o.monthIsLeap=true;
					temp=t.lunarDaysOfLeapMonth(o.year);
				}else{
					temp=t.lunarDaysOfMonth(o.year,i);
				}
				if(o.monthIsLeap==true&&i==(leap+1))
					o.monthIsLeap=false;
				offset-=temp;
				if(o.monthIsLeap==false)gzM++;
			}
			if(offset==0&&leap>0&&i==leap+1){
				if(o.monthIsLeap)
					o.monthIsLeap=false;
				else{
					o.monthIsLeap=true;
					--i;
					--gzM;
				}
			}
			if(offset<0){
				offset+=temp;
				--i;
				--gzM;
			}
			o.month=i;
			o.day=offset+1;
			o.yearText=t.lunarYearToText(o.year);
			o.monthText=t.lunarMonthToText(o.month,o.monthIsLeap);
			o.dayText=t.lunarDayToText(o.day);
			return o;
		},
		/*
			阴历日期转阳历
		*/
		lunarDateToSolar:function(year,month,day,isLeepMonth){
			var t=this,lm=t.lunarLeapMonthOfYear(year),days=0;
			for(var i=1900;i<year;i++){
				days+=t.lunarDaysOfYear(i);
			}
			if(month>lm){
				days+=t.lunarDaysOfLeapMonth(year);
			}else if(isLeepMonth&&(month==lm)){
				month++;
			}
			for(i=1;i<month;i++){
				days+=t.lunarDaysOfMonth(year,i);
			}
			days+=(day-1);
			var date=new Date(days*86400000+(+new Date(1900,0,31)));
			return{
				year:date.getFullYear(),
				day:date.getDate(),
				month:date.getMonth()+1
			}
		},
		/*
			阴历一年中有多少天
		*/
		lunarDaysOfYear:function(year){
			var i,day=348
			for(i=0x8000;i>0x8;i>>=1)
			day+=(table[year-1900]&i)?1:0;
			return(day+this.lunarDaysOfLeapMonth(year));
		},
		/*
			获取阴历一年中的闰月
			@year {Integer} 阳历年
		*/
		lunarLeapMonthOfYear:function(year){
			return table[year-1900]&0xf;
		},
		/*
			如果是闰月 闰月的天数
		*/
		lunarDaysOfLeapMonth:function(year){
			if(this.lunarLeapMonthOfYear(year)){
				return(table[year-1900]&0x10000)?30:29;
			}else{
				return 0;
			}
		},
		/*
			阴历月有多少天
		*/
		lunarDaysOfMonth:function(year,month){
			return(table[year-1900]&(0x10000>>month))?30:29;
		},
		/*
			判断阳历年是否是闰年
		*/
		solarYearIsLeap:function(year){
			return(year%4==0&&year%100!=0)||year%400==0;
		},
		/*
			阳历月有多少天
		*/
		solarDaysOfMonth:function(year,month){
			var t=this;
			if(month==2) return t.solarYearIsLeap(year)?29:28;
			if (month <= 7 && month % 2 == 1 || month >= 8 && month % 2 == 0) return 31;
			return 30
		},
		/*
			获取阴历天
		*/
		lunarDayToText:function(day){
			var f=Math.floor(day/10),f1=day%10;
			if(f1)return prefix[f]+days[f1];
			return['','初十','二十','三十'][f];
		},
		/*
			
		*/
		lunarMonthToText:function(m,isLeapMonth){
			return(isLeapMonth?'闰':'')+months[m-1]+'月';
		},
		/*
			
		*/
		lunarYearToText:function(year){
			return sky[(year+'').charAt(3)]+earth[year%12]+'年('+year+')';
		},
		/*
			获取阴历年文字描述
		*/
		lunarYearsToTextList:function(start,end){
			var a=[],b=this;
			start=start||1980;
			end=end||2049;
			for(var i=start;i<=end;i++){
				a.push({
					text:b.lunarYearToText(i),
					value:i
				})
			}
			return a;
		},
		/*
			获取阴历天列表
			@year {Integer} 阴历年
			@month {Integer} 阴历月
			@isLeapMonth {Boolean} 是否闰阴历月
		*/
		lunarDaysToTextList:function(year,month,isLeapMonth){
			var t=this,d=t.lunarDaysOfMonth(year,month),a=[];
			if(isLeapMonth)d=t.lunarDaysOfLeapMonth(year);
			for(var i=1;i<=d;i++){
				a.push({text:t.lunarDayToText(i),value:i});
			}
			return a;
		},
		/*
			@year {Integer} 阴历年
			@startMonth 开始月份
			@endMonth 结束月份
			@

			闰4 - 8
			5 6 7 8 9 10 11 
		*/
		lunarMonthsToTextList:function(year,startMonth,endMonth){
			var t=this,lm=t.lunarLeapMonthOfYear(year),a=[];
			startMonth=startMonth||1;
			endMonth=endMonth||12;
			for(var i=startMonth;i<=endMonth;i++){
				a.push({text:t.lunarMonthToText(i),value:i,isLeap:false});
				if(i==lm)a.push({text:t.lunarMonthToText(i,true),value:i,isLeap:true});
			}
			return a;
		},
		/*
			
		*/
		solarDaysToTextList:function(year,month){
			var t=this,day=t.solarDaysOfMonth(year,month),a=[];
			for(var i=1;i<=day;i++){
				a.push({text:i,value:i});
			}
			return a;
		},
		/*
			
		*/
		solarMonthsToTextList:function(year){
			var a=[];
			for(var i=1;i<=12;i++){
				a.push({text:i,value:i});
			}
			return a;
		}
	})
})