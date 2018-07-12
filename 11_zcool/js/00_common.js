/**
 * Created by lenovo1 on 2018/4/26.
 */
//获取元素属性函数
function getAttr(ele,attr){
    if(getComputedStyle){
        return getComputedStyle(ele)[attr];
    }else{
        return ele.currentStyle[attr];
    }
}

function eleMove(ele,json,cb){
    if(ele.moving){
        ele.stop(true);
    }

    ele.timer={};
    ele.moving=true;
    for(var attr in json){
        (function (myAttr) {

            ele.timer[myAttr]=setInterval(function(){
                //1.获取当前值
                if(myAttr=="opacity"){
                    var cur=getAttr(ele,myAttr)*100;
                }else{
                    var cur=parseInt(getAttr(ele,myAttr));
                }
                //2.计算速度
                var speed=(json[myAttr]-cur)/5;
                speed=speed>0?Math.ceil(speed):Math.floor(speed);
                // console.log(json[myAttr],cur,speed)
                //3.判断终止 或  运动
                if(cur==json[myAttr]){
                    clearInterval(ele.timer[myAttr]);
                    delete ele.timer[myAttr];
                    if(Object.keys(ele.timer).length==0){
                        if(cb){
                            cb();
                            ele.moving=false;
                        }
                    }
                }else{
                    if(myAttr=="opacity"){
                        ele.style[myAttr]=(cur+speed)/100;
                    }else{
                        ele.style[myAttr]=cur+speed+"px";
                    }
                }
            },50);
        })(attr);
    }

    ele.stop=function(bool){
        for(var attr in json){
            clearInterval(ele.timer[attr]);
        }
        if(bool){
            for(var attr in json){
                if(attr="opacity"){
                    ele.style[attr]=json[attr]/100;
                }else{
                    ele.style[attr]=json[attr]+"px";
                }
            }
        }
    }
}
