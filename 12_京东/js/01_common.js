/**
 * Created by lenovo1 on 2018/4/30.
 */
//1.获取元素
function $(selector){
    if(!selector) return
    var ele=document.querySelectorAll(selector);
    if(ele.length==1){
        return ele[0];
    }
    return ele;
}
// console.log($(".wrap")); 已测试

//2.获取属性值
function getAttr(ele,attr){
    if(!ele && !attr) return
    if(getComputedStyle){
        return getComputedStyle(ele)[attr];
    }else{
        ele.currentStyle[attr];
    }
}
// var ele=$("#header");
// console.log(getAttr(ele,"width")); 已测试


//3.封装事件委托函数
function delegation(childs,callback){
    childs=[].slice.call(childs);
    return function (e) {
        var event=e||evetn;
        var target=event.target||event.srcElement;
        if(childs.indexOf(target)!=-1){
            return callback.call(target,event);
        }
    }
}
//已测试
// var fixSearch=document.getElementById("fixSearch");
// var wrap=fixSearch.getElementsByClassName("wrap");
// fixSearch.onclick=delegation(wrap,function (e) {
//     console.log(this.offsetWidth);
// })


// doMove
function doMove(ele,json,callback) {
    if(!ele || !json) return;
    if(ele.moving){
        ele.stop();
    }
    ele.timer=[];
    ele.moving=true;
    for(var attr in json){
        //开启定时器
        (function (myAttr) {
            ele.timer[attr]=setInterval(function(){
                // console.log(attr);
                //1.获取当前值
                if(myAttr=="opacity"){
                    var cur=getAttr(ele,myAttr)*100;
                }else{
                    var cur=parseInt(getAttr(ele,myAttr));
                }
                //2.计算速度
                var speed=(json[myAttr]-cur)/5;
                speed=speed>0?Math.ceil(speed):Math.floor(speed);
                //3.判断终止或运动
                if(cur==json[myAttr]){
                    clearInterval(ele.timer[myAttr]);
                    delete ele.timer[myAttr];
                    if(Object.keys(ele.timer).length==0){
                        if(callback){
                            callback();
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
        })(attr)

    }
    ele.stop=function (bool) {
        for(var attr in json){
            clearInterval(ele.timer[attr]);
        }
        if(bool){
            if(attr=="opacity"){
                ele.style[attr]=json[attr]/100;
            }else{
                ele.style[attr]=json[attr]+"px";
            }
        }
    }
}
// 已测试
// var fixSearch=$("#fixSearch");
// doMove(fixSearch,{top:100},function(){
//     fixSearch.style.background="#000"
// })


function addImgEvent() {
    var imgList=this.doArea.getElementsByTagName("img");
    for(let i=0;i<imgList.length;i++){
        imgList[i].onmouseover=function () {
            doMove(this,{opacity:50});
        }
        imgList[i].onmouseout=function () {
            doMove(this,{opacity:100});
        }
    }
}


