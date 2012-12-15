<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>测试</title>
</head>
<body style="height:2000px">

    <div style="width:100px;border:1px solid #ccc;padding:10px;margin:100px;">q我我q我我<a href="#" id="t_a_1">@我们一起我们一起</a></div>
    <form action="index.php" method="post">
        <input type="text" name="user" id="user" />
        <input type="text" name="password" id="t_pwd" onclick="alert('aa'+K.nodeVal('user'))" />
        <input type="submit" value="submit" />
    </form>
        <ul id="dragdrop" style="height:200px;overflow:auto;width:400px;">
            <li>aaaaaaaaaaaaaaaaaaaaa</li>
            <li>bbbbbbbbbbbbbbbbbbbbbb</li>
            <li>cccccccccccccccccccccc</li>
            <li>ddddddddddddddddddddddd</li>
            <li>eeeeeeeeeeeeeeeeeeeeeeee</li>
            <li>ffffffffffffffffffffffff</li>
            <li>gggggggggggggggggg</li>
            <li>hhhhhhhhhhhhhhhhhhhhhhhhhhh</li>
            <li>iiiiiiiiiiiiiiiiiiiii</li>
            <li>jjjjjjjjjjjjjjjjjjjjjjj</li>
            <li>kkkkkkkkkkkkkkkkkkkkkkk</li>
            <li>llllllllllllllllllllllllll</li>
            <li>111111111111111111111111</li>
            <li>2222222222222222222222222222222</li>
            <li>3333333333333333333333333333333</li>
            <li>444444444444444444444444444444</li>
            <li>555555555555555555555555555</li>
            <li>6666666666666666666666666666</li>
            <li>777777777777777777777777</li>
            <li>888888888888888888888888</li>
            <li>9999999999999999999999</li>
            <li>0000000000000000000000000</li>
            <li>AAAAAAAAAAAAAAAAAAAAAAAAA</li>
            <li>BBBBBBBBBBBBBBBBBBBBBBBBBB</li>
        </ul>
    <ul id="dragdrop1">
        <li>mmmmmmmmmmmmmmmmmmmmmmmm</li>
        <li>nnnnnnnnnnnnnnnnnnnnnnnn</li>
        <li>ooooooooooooooooooooooo</li>
    </ul>
    <br />
    <br />
    <ul class="fl" id="dragdrop2">
        <li>1111111111111</li>
        <li>2222222222222</li>
        <li>3333333333333</li>
        <li>4444444444444</li>
        <li>5555555555555</li>
    </ul>
    <table>
            <tr><td>1111111111111</td><td>2222222222222222222</td></tr>
             <tr><td>333333333333333</td><td>4444444444444444</td></tr>
              <tr><td>aaaaaaaaaaaaaa</td><td>bbbbbbbbbbbbbbbbb</td></tr>
               <tr><td>cccccccccccccccc</td><td>ddddddddddddddddddd</td></tr>
    </table>
    <div id="drag" style="width:100px;height:100px;position:absolute;left:500px;top:600px;background-color:#999"></div>
    <canvas width="500" height="500" id="t_canvas"></canvas>
</body>
<?php include_once("scripts/T.single.inc") ?>
<script type="text/tmpl" id="T_tester">
<#T.log(arguments)#>
循环表格共<#=@rows.length#>行<br />
<#for(var i=0;i<@rows.length;i++){#>
    <#=@rows[i].name*100#>@rows<br />
<#}#>
</script>
<script type="text/tmpl" id="x_tester">
<x_temp>
<#T.log(arguments)#>
循环表格共<#=@rows.length#>行<br />
<#for(var i=0;i<@rows.length;i++){#>
    <#=@rows[i].name*100#>@rows<br />
<#}#>
</x_temp>
</script>
<script type="text/javascript">
//T.debug('XY.Widget.Base');
var Utils={
    units:'个十百千',
    numChars:'零一二三四五六七八九',
    mUnits:'个万亿',
    midSuccZero:/0{2,}(?=[^0])/g,
    tailZero:/0+$/g,
    groupFour:/(\d{1,4})(?=(?:\d{4})+$)/g,
    chineseSplit:/[亿万]/,
    toFour:function(str){
        var r=[],
            me=this,
            str=str.replace(me.midSuccZero,function(m){
                return '0'+new Array(m.length).join('x');
            }).replace(me.tailZero,function(m){
                return new Array(m.length+1).join('x');
            });
        for(var i=0,c,j=str.length-1;i<=j;i++){
            c=str.charAt(i);
            if(c=='x')continue;
            if(j==1&&i==0&&c=='1'){
                ;
            }else{
                r.push(me.numChars.charAt(c));
            }
            if(i!=j&&c!='0'){
                r.push(me.units.charAt(j-i));
            }
        }
        return r.join('');
    },
    toChinese:function(num){
        var str=String(num),
            me=this;
        if(str.length>12){
            throw new Error('unsupport:'+str);
        }
        var groups=str.replace(me.groupFour,'$1,').split(','),
            result=[];
        for(var i=0,j=groups.length-1,temp;i<=j;i++){
            result.push(temp=me.toFour(groups[i]));
            if(i!=j&&temp)result.push(me.mUnits.charAt(j-i));
        }
        return result.join('');
    },
    fromFour:function(str){
        var r=0,
            me=this;
        for(var i=0,c,n,x,j=str.length;i<=j;i++){
            c=str.charAt(i);
            n=i<j?str.charAt(i+1):'';
            x=me.numChars.indexOf(c);
            if(!~x){//当前是单位
                n=c;//
                x=1;
            }
            //T.log(x,c);
            if(x&&~x){//当前是数字且不为0
                if(n=='千'){
                    r+=x*1000;
                }else if(n=='百'){
                    r+=x*100;
                }else if(n=='十'){
                    r+=x*10;
                }else{
                    r+=x;
                }
                i++;
            }
        }
        return r;
    },
    fromChinese:function(str){
        str=String(str);
        var me=this,
            groups=str.split(me.chineseSplit),
            result=0;
        for(var i=0,j=groups.length-1;i<=j;i++){
            result+=me.fromFour(groups[i])*Math.pow(10000,j-i);
        }
        return result;
    }
};
T.use('X.App.AsyncAutocomplete,X.JSON',function(e){
    var AC=K.access(e.dps[0]);
    var ac=new AC({
        input:'t_pwd',
        xhr:{
            url:'http://suggestion.baidu.com/su?p=3&sid=1263_1468_1417_1484_1282_1475',
            jsonp:'cb'
        },
        queryKey:'wd'
    });
    ac.on(AC.ASYNC_LOADED,function(e){
        e.data=e.data.data.s;
        for(var i=0;i<e.data.length;i++){
            e.data[i]={
                text:e.data[i]
            };
        }
    });
    ac.on(AC.DATA_SEARCH,function(e){
        //var data=K.clone(e.data);
        for(var i=0;i<e.data.length;i++){
            e.data[i].text+='@^_%'
        }
    });
    ac.updateOpacity(.5);
    window.AC=ac;

    var ac1=new X.App.Autocomplete({
        data:[{
            text:'125'
        },{
            text:'162'
        },{
            text:'311'
        },{
            text:'478'
        },
        {
            text:'5ab'
        }],
        input:'user'
    });
    ac1.on(X.App.Autocomplete.DATA_SEARCH,function(e){
        if(!e.text){
            e.data=[];
            return false;
        }
        var value=e.text,
            hasAt=~value.indexOf('@'),
            bfAt=value.split('@')[0],
            afAt=value.split('@')[1],
            r=[];
        for(var i=0;i<e.data.length;i++){
            if(!hasAt){
                e.data[i].text=e.text+'@'+e.data[i].text;
            }else{
                if(~e.data[i].text.indexOf(afAt)){
                    e.data[i].text=bfAt+'@'+e.data[i].text
                    r.push(e.data[i]);
                }
            }
        }
        if(hasAt)e.data=r;
        return false;
    });

});
T.use('X.App.ZoneDragDrop',function(e){
    if(e.safety){
        var DD=K.access(e.dps[0]);
        var dd=new DD();
        dd.addZone('dragdrop');
        dd.addZone('dragdrop1');
        window.dd=dd;
        var d1=new DD({anchorPosition:DD.ANCHOR_VERTICAL,textAllow:'can put'});
        d1.addZone('dragdrop2');
        window.d1=d1;

        var d2=new DD();
        d2.addZone(K.nodeByTags('table')[0]);
    }
})
T.use("K",function(e){
    T.log('K is safe?',e,e.safety);
    if(e.safety){

        var d=K('div',{},{position:'absolute',backgroundColor:'#ccc',opacity:0.3});
        document.body.appendChild(d);
        
        var canvas=K('t_canvas'),
            ctx=canvas.getContext('2d');
        var imgs=['b.jpg','a.png'];
        var loadImg=function(i,x){
            var m=new Image();
            x=x?{
                x:100,
                y:100
            }:{
                x:0,
                y:0
            }
            m.onload=function(){
                ctx.drawImage(m,0,0,m.width,m.height,x.x,x.y,m.width,m.height);
            }
            m.src=i;
        }
        for(var i=0;i<imgs.length;i++){
            loadImg(imgs[i],i);
        }


        var dv=K('div',{});
        document.body.appendChild(dv);

        K.tpFill(dv,'T_tester',{
            rows:[{name:'1'},{name:'2'},{name:3},{name:4}]
        });

        K.tpFill('drag','x_tester','x_temp',{
            rows:[{name:'1'},{name:'2'},{name:3},{name:4}]
        });


        var d=K('div',null,{position:'absolute',width:'300px',height:'10px',backgroundColor:'#000'});
        document.body.appendChild(d);
        K.on('t_a_1','mouseover',function(e){
            e=K.evt(e);
            var xy=K.evtXY(e),
                target=K.evtTarget(e),
                tBound=K.nodeBound('t_a_1');
            T.log(xy,tBound);
            K.nodeStyle(d,{left:tBound.x,top:(tBound.y-10)})
        }).on('t_a_1','mouseout',function(){
            K.nodeStyle(d,{left:'-9999px'});
        });
    }
});
T.listen(function(a){
    //T.log('onlisten',a);
});

T.listen(function(f){
    T.log('loaded:',f.name,f);
    if(f.name=="edit_area"){
        T.use(['XY.Widget.Autocomplete','XY.Widget.Base'],function(e){
            T.log('aaaaaaaaaaaa',e);
            var AC=K.entity(e.dps[0],true);
            var ac=new AC();
            ac.show();
            T.log(ac,K.entity(e.dps[1],true));
        })
    }
});

T.idle(function(){
    T.log('idle',arguments);
    T.publish({
        abc:function(){
            alert('abc');
            //return 'ok';
        }
    })
});
T.use(['XY.Widget.Autocomplete'],function(e){
    T.log('XY.Widget.Autocomplete:,why?',e);
    if(e.safety){
        var ac=new XY.Widget.Autocomplete();
        ac.show();
        T.log(K.nodeStyle(document.body,'backgroundColor'));
    }
});

T.use(['K','X.ALG.Tween'],function(e){
    if(e.safety){


        K.on(document,'click',function(){
            var temp=function(e){
                e=K.evt(e);
                e.a='aaa';
                T.log(e,K.evtXY(e));
            }
            temp();
        });

        window.scrollTo(0,100);

        K.on('drag','mousedown',function(e){
            T.log(e);

            var bound=K.nodeBound('drag'),lastX,fx=new K.FX(X.ALG.Tween.backOut);
            var times=[],xs=[];
            K.startDrag('drag',function(o,e,n,s){

                var nx=bound.x+n.pageX-s.pageX;
                var ny=bound.y+n.pageY-s.pageY;
                times.push(K.now());
                xs.push(n.pageX-s.pageX);
                lastX=nx;
                K.nodeStyle(o,{left:nx,top:ny});
            },function(o,e){
                if(lastX<500){
                    fx.run(500,function(x){
                        K.nodeStyle(o,{left:x(lastX,500)});
                    });
                }else{
                    T.log(times,xs);
                    var lastTime=times.pop(),
                        tailX=xs.pop();
                    for(var i=times.length-1;i>=0;i--){
                        //T.log(times[i],lastTime,times[i]-lastTime)
                        if(lastTime-times[i]>50){
                            break;
                        }
                    }

                    T.log(i,lastTime-times[i],xs[i],xs[i]/(lastTime-times[i]),lastX,lastX+xs[i]/(lastTime-times[i])*10);

                    fx.run(100,function(x){
                        K.nodeStyle(o,{left:x(lastX,lastX+xs[i]/(lastTime-times[i])*10)});
                    });
                }
            });
            //K.evtPrevent(e);
        });
        K.entity('XY');
        XY.Control=K.clazz(K.Evt,function(base,proto,clazz){
            K.mix(clazz,{
                registerControl:function(){
                }
            });
            return {
                hi:function(){
                }
            }
        });
        XY.Alert=K.clazz(XY.Control,{
            hi:function(){
                
            }
        });


        var a=new XY.Alert();
    }else{
        T.log('aaa',e);
    }
});

T.use('X.ALG.MD5',function(e){
    var en=K.entity(e.dps[0],true);
    T.log(en,en.normal('123456'),en.improved('123456'));
});

T.use(['X.Converter.Date','X.Converter.Color','edit_area'],function(e){
    if(e.safety){
        var DC=K.entity(e.dps[0],true);
        T.log(DC.lunarMonthsToTextList(2012,3),DC.solarDateToLunar(2012,6,6));
        var dc=new DC();
        T.log(dc.getLunarDate(),dc.getSolarDate());

        dc.sYear=2000;
        dc.sMonth=3;
        dc.syncBySolar();

        T.log(dc.getDate());

        var C=K.entity(e.dps[1],true);

    }else{
        T.log(e);
    }
});

T.use('X.Converter.Number',function(e){
    var N=K.entity(e.dps[0],true);
    T.log(N.xToDecimal('ff',16),N.decimalToY(255,32),N.xToY('cc',16,10));
});

T.use('X.JSON',function(e){
    var J=K.entity(e.dps[0],true);
    T.log(J.stringify({a:10,b:[1,[2,[3,'我']]],date:new Date()}));
})



T.use('X.Widget.Base',function(e){
    var B=K.access(e.dps[0]);
    var DIV=K.clazz(B,function(base){
        return {
            show:function(){
                var me=this;
                if(!me.isShown){
                    if(!me.isCreated){
                        var d=me.create('div',{
                            position:'fixed',
                            width:'200px',
                            height:'200px',
                            backgroundColor:'#ccc'
                        });
                    }
                    var center=me.getCenter();
                    base.show.call(me,center);
                }
            }
        }
    });
    var d=new DIV();
    d.on(DIV.CREATED,function(e){
        T.log(',,,,,,,,,,,,,,,,,,,,',e);
    });
    d.show();
    setTimeout(function(){
        d.dispose();
    },5E3);
});

T.use('X.ALG.Reducer.Douglas',function(e){
    var D=K.access(e.dps[0]);
    T.log(D);
    var points = [{ x: 10, y: 10 }, { x: 20, y: 30 }, { x: 30, y: 12 }, { x: 35, y: 5 }, { x: 40, y: 22 }, { x: 50, y: 12 }, { x: 80, y: 40}];
    T.log(D.reduce(points,14));
});

T.use('X.Widget.Mask',function(e){
    var M=K.access(e.dps[0]);
    var m=new M();
    //m.show('dragdrop');
    //setTimeout(K.bind(m.dispose,m),5e3);
    //var bd=K.body();
    //alert([bd.maxHeight,bd.maxWidth,bd.height,bd.width,document.width,document.height,window.innerHeight,window.innerWidth])
});

T.use('X.Watcher.CPU',function(e){
    var CPU=K.access(e.dps[0]);
    var c=new CPU();
    c.start();
    
    setTimeout(function(){
        c.stop();
        var sample=c.getSample();

        var first=sample[0];
        var draw=function(p){
            var x=Math.round((p.x-first.x)/100);
            var y=p.y;
            var d=K('div',0,{position:'absolute',width:2,height:2,backgroundColor:'red',left:x,top:y});
            document.body.appendChild(d);
        }
        for(var i=0;i<sample.length;i++){
            draw(sample[i]);
        }
        T.log(sample);
    },5000);
});
</script>
</html>