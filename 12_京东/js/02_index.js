/**
 * Created by lenovo1 on 2018/4/30.
 */
//1.顶部固定条事件
var timer=null
window.onscroll=function(){
    if(!timer){
        timer = setTimeout(function(){
            var scrollTop=document.documentElement.scrollTop||document.body.scrollTop||0;
            if(scrollTop>=800){
                var fixSearch=$("#fixSearch");
                doMove(fixSearch,{top:0});
            }else{
                var fixSearch=$("#fixSearch");
                doMove(fixSearch,{top:-50});
            }
            timer = null;
        },300)
    }

}

//2.面向对象的主banner轮播图
function bannerMove(){
    var banner=$(".bannerSliderArea");
    //banner的发生区域
    this.changeArea=banner;
    //banner的bannerList的li集合
    this.changeList=banner.getElementsByClassName("bannerSlider")[0].getElementsByTagName("li");
    //banner的sliderDots的li集合
    this.changeHandler=banner.getElementsByClassName("sliderDots")[0].getElementsByTagName("li");

    this.timer=null;
    this.now=0;         //当前显示的下标
    this.next=1;        //下一个要显示的下标
    this.addEvent();    //为小点添加事件
    this.startTimer();  //开启自动轮播
}
//2.1banner-添加事件
bannerMove.prototype.addEvent=function() {
    for (var i = 0; i < this.changeHandler.length; i++) {
        (function (index) {
            this.changeHandler[index].onmouseover = function (e) {
                var event = e || event;
                if (index == this.now) return;
                this.next = index;
                this.changeItem();
                this.now = this.next;

            }.bind(this)
        }.bind(this))(i)
    }

    this.changeArea.onmouseover = function () {
        clearInterval(this.timer);
    }.bind(this);
    this.changeArea.onmouseout = function () {
        this.startTimer();
    }.bind(this);
}
//2.2banner-修改下标
bannerMove.prototype.changeItem=function(){
    for(var i=0;i<this.changeList.length;i++){
        this.changeList[i].style.opacity=0;
        this.changeList[i].style.zIndex=0;
        this.changeHandler[i].className="";
    }
    this.changeHandler[this.next].className="active";

    this.changeList[this.now].style.zIndex=2;
    this.changeList[this.next].style.zIndex=1;
    doMove(this.changeList[this.now],{opacity:0});
    doMove(this.changeList[this.next],{opacity:100});
}
//2.3banner-开启定时器
bannerMove.prototype.startTimer=function(){
    this.timer=setInterval(function () {
        if(this.now==this.changeList.length-1){
            this.next=0;
        }else{
            this.next=this.now+1;
        }
        this.changeItem();

        this.now=this.next;
    }.bind(this),2500);

}
//2.4banner-实例化
new bannerMove();


//3.面向对象的倒计时
function countTime(timeObj,timeString){
    if(!timeObj) return;
    if(timeString){
        this.endTime=new Date(timeString)
    }else{
        var endTime=new Date();
        endTime.setHours(endTime.getHours()+13);
        endTime.setMinutes(endTime.getMinutes()+25);
        this.endTime=endTime;
    }
    this.second=timeObj.second;
    this.minute=timeObj.minute;
    this.hour=timeObj.hour;
    this.timer=null;

    this.startCount();
}
//3.2倒计时-开启定时器
countTime.prototype.startCount=function(){
    this.timer=setInterval(function(){
        var nowTime=new Date();
        var reduceTime=parseInt((this.endTime-nowTime)/1000);

        this.hour.innerHTML=parseInt(reduceTime/3600);
        this.minute.innerHTML=parseInt(reduceTime/60%60);
        this.second.innerHTML=parseInt(reduceTime%60);
    }.bind(this),1000)
}
//3.3倒计时-实例化
var countHour=document.getElementsByClassName("msHour")[0];
var countMinute=document.getElementsByClassName("msMinute")[0];
var countSecond=document.getElementsByClassName("msSecond")[0];
new countTime({
        second:countSecond,
        minute:countMinute,
        hour:countHour
    },'2018/5/4 8:25:03');



//4.面向对象的商品轮播
function commoditySlider(doArea,bnts){
    if(!doArea) return ;
    if(bnts){
        this.leftBtn=bnts.left;
        this.rightBtn=bnts.right;
    }
    this.doArea=doArea;
    this.childEle=doArea.getElementsByTagName("li");


    this.nowIndex=1;
    this.nextIndex=2;
    this.showCount=4;
    this.itemWidth=this.childEle[0].offsetWidth;
    this.timer=null;

    this.init();
    this.startInterval();
    this.addEvent();


}
//4.1商品轮播-初始化模块
commoditySlider.prototype.init=function(){
    //将前四个复制  插入到末尾
    var newleftChild=[];
    var newRightChild=[];
    for(var i=0;i<4;i++){
        newRightChild.push(this.childEle[i].cloneNode(true));
        newleftChild.push(this.childEle[this.childEle.length-this.showCount+i].cloneNode(true));
        // console.log(newleftChild[i]);
    }
    for(var i=0;i<newleftChild.length;i++){
        this.doArea.appendChild(newRightChild[i]);
        this.doArea.insertBefore(newleftChild[i],this.childEle[i]);
    }

    this.numberNode=this.childEle.length/this.showCount;

    this.doArea.style.width=this.childEle[0].offsetWidth*this.childEle.length+"px";
    this.doArea.style.left=-this.itemWidth*4+"px";

}
//4.2商品轮播-定时器模块
commoditySlider.prototype.startInterval=function () {
    this.timer=setInterval(function () {
        this.nowIndex=this.nextIndex;
        if(this.nowIndex==this.numberNode){
            this.doArea.style.left=-this.itemWidth*4+"px";
            this.nextIndex=2;
            this.nowIndex=this.nextIndex;
            doMove(this.doArea,{left:-this.nowIndex*this.itemWidth*4});
            this.nextIndex++;
        }else{
            doMove(this.doArea,{left:-this.nowIndex*this.itemWidth*4});
            // alert("加一次"+this.fathEle.offsetLeft+" "+this.nextIndex);
            this.nextIndex++;
        }
    }.bind(this),4000);
}
//4.3商品轮播-添加事件模块
commoditySlider.prototype.addEvent=function(){
    if(this.leftBtn){
        this.leftBtn.onmouseover=this.rightBtn.onmouseover=function () {
            clearInterval(this.timer);
        }.bind(this)
        this.leftBtn.onmouseout=this.rightBtn.onmouseout=function () {
            this.startInterval();
        }.bind(this)
    }
    this.doArea.onmouseover=function () {
        clearInterval(this.timer);
    }.bind(this);
    this.doArea.onmouseout=function () {
        this.startInterval();
    }.bind(this);

    this.leftBtn.onclick=function(){
        this.nextIndex=this.nowIndex-1;
        if(this.nextIndex==-1){
            this.doArea.style.left="-2400px";
            this.nowIndex=2;
            this.nextIndex=this.nowIndex;
            doMove(this.doArea,{left:-this.nextIndex*this.itemWidth*4});
            // this.nowIndex--;
        }else{
            doMove(this.doArea,{left:-this.nextIndex*this.itemWidth*4});
            this.nowIndex--;
        }
        console.log(this.nowIndex);
    }.bind(this)
    this.rightBtn.onclick=function(){
        this.nowIndex=this.nextIndex;
        if(this.nowIndex==this.numberNode){
            this.doArea.style.left=-this.itemWidth*4+"px";
            this.nextIndex=2;
            this.nowIndex=this.nextIndex;
            doMove(this.doArea,{left:-this.nowIndex*this.itemWidth*4});
            this.nextIndex++;
        }else{
            doMove(this.doArea,{left:-this.nowIndex*this.itemWidth*4});
            // alert("加一次"+this.fathEle.offsetLeft+" "+this.nextIndex);
            this.nextIndex++;
        }
    }.bind(this)


    addImgEvent.call(this);



}
//4.4商品轮播-实例化
var midSlider=document.getElementsByClassName("midSlider")[0];
var fathEle=midSlider.getElementsByClassName("sliderList")[0];
var leftBtn=midSlider.getElementsByClassName("leftBtn ")[0];
var rightBtn=midSlider.getElementsByClassName("rightBtn ")[0];
new commoditySlider(fathEle,{left:leftBtn,right:rightBtn});


//5.面向对象的小轮播
function smallSlider(doArea,childEle,dots){
    if(!doArea || !fathEle || !dots) return;
    this.doArea=doArea;
    this.childEle=childEle;
    this.dots=dots;


    this.itemWidth=this.childEle[0].offsetWidth;
    this.nowIndex=0;
    this.nextIndex=1;
    this.timer=null;

    this.startInterval();
    this.addEvent();
}
//5.1右侧小轮播-定时器模块
smallSlider.prototype.startInterval=function () {
    var _this=this;
    this.timer=setInterval(function () {
        //先让下一张要显示的  在右侧等候
        this.childEle[this.nextIndex].style.left=this.itemWidth+"px";
        for(var i=0;i<this.dots.length;i++){
            this.dots[i].className="";
        }
        this.dots[this.nextIndex].className="active";

        doMove(this.childEle[this.nowIndex],{left:-this.itemWidth});
        doMove(this.childEle[this.nextIndex],{left:0},function () {
            _this.nowIndex=_this.nextIndex;
            if(_this.nowIndex==_this.childEle.length-1){
                _this.nextIndex=0;
            }else{
                _this.nextIndex++;
            }

        });
    }.bind(this),3000);
}
//5.2右侧小轮播-添加事件
smallSlider.prototype.addEvent=function () {
    for(let i=0;i<this.dots.length;i++){
        this.dots[i].onmouseover=function () {
            if(this.nowIndex==i) return;
            clearInterval(this.timer);
            this.timer=null;
            this.nextIndex=i;

            this.nowGo();

        }.bind(this);

        this.dots[i].onmouseout=function () {
            // alert(1)
            if(!this.timer){
                if(this.nowIndex==this.childEle.length-1){
                    this.nextIndex=0;
                }else{
                    this.nextIndex=this.nowIndex+1;
                }

                this.startInterval();
            }


        }.bind(this);
    }

    this.doArea.onmouseover=function () {
        clearInterval(this.timer);
        this.timer=null;
    }.bind(this);
    this.doArea.onmouseout=function () {
        if(!this.timer){
            this.startInterval()
        }
    }.bind(this);

    addImgEvent.call(this);
}
//5.3右侧小轮播-按下标运动
smallSlider.prototype.nowGo=function(){
    for(let i=0;i<this.dots.length;i++){
        this.dots[i].className="";
    }
    this.dots[this.nextIndex].className="active";

    if(this.nextIndex<this.nowIndex){
        this.childEle[this.nextIndex].style.left=-this.itemWidth+"px";
        // console.log(this.childEle[this.nextIndex].offsetLeft);
        doMove(this.childEle[this.nowIndex],{left:this.itemWidth});
    }else{
        this.childEle[this.nextIndex].style.left=this.itemWidth+"px";
        doMove(this.childEle[this.nowIndex],{left:-this.itemWidth});
    }
    doMove(this.childEle[this.nextIndex],{left:0});
    this.nowIndex=this.nextIndex;
}
//5.4实例化右侧小轮播
var doArea=document.getElementsByClassName("rightSlider")[0];
var childEle=doArea.getElementsByTagName("li");
var dots=doArea.getElementsByClassName("sliderDots")[0].getElementsByTagName("span");
new smallSlider(doArea,childEle,dots);



//6.排行榜对象
function rankListSlider(){
    smallSlider.apply(this,arguments);  //继承5.面向对象的小轮播
    this.areaList=arguments[0].parentNode.getElementsByClassName("bothContanier");
    this.rankHead=arguments[3];
    this.rankIndex=0;
    this.childEle=this.areaList[0].getElementsByClassName("partBody");

    this.headEvent();
    this.itemEvent();
}
//6.1继承smallSlider对象
rankListSlider.prototype=new smallSlider();
//6.2排行榜定时器模块
rankListSlider.prototype.startInterval=function () {}
//6.3排行榜头部模块
rankListSlider.prototype.headEvent=function () {
    for(let i=0;i<this.rankHead.length;i++){
        this.rankHead[i].onmouseover=function () {
            if(this.rankIndex==i) return;
            for(let j=0;j<this.rankHead.length;j++){
                this.rankHead[j].style.color="#666";
            }
            this.rankHead[i].style.color="#e33333";
            for(let j=0;j<this.areaList.length;j++){
                this.areaList[j].style.display="none";
            }
            this.areaList[i].style.display="block";
            this.childEle=this.areaList[i].getElementsByClassName("partBody");

            this.rankIndex=i;
        }.bind(this);

    }
}
//6.4排行榜item模块
rankListSlider.prototype.itemEvent=function (){
    var itemList=this.areaList[0].parentNode.getElementsByClassName('item');
    // console.log(itemList);
    for(let i=0;i<itemList.length;i++){
        itemList[i].onmouseover=function () {
            var leftImg=itemList[i].getElementsByClassName("leftImg")[0];
            var description=itemList[i].getElementsByClassName("description")[0];

            doMove(leftImg,{opacity:50});
            description.style.color="#e74240";

        }.bind(this)

        itemList[i].onmouseout=function () {
            var leftImg=itemList[i].getElementsByClassName("leftImg")[0];
            var description=itemList[i].getElementsByClassName("description")[0];

            doMove(leftImg,{opacity:100});
            description.style.color="#666";

        }.bind(this)
    }

}



//6.1实例化排行榜
var rankList=document.getElementsByClassName("rankList")[0];
var rankDoArea=rankList.getElementsByClassName("bothContanier")[0];
var rankChildEle=rankDoArea.getElementsByClassName("partBody");
var rankDots=rankList.getElementsByClassName("ranDot")[0].getElementsByTagName("span");
var rankHead=rankList.getElementsByClassName("tabHead")[0].getElementsByClassName("tabHeadItem ");
new rankListSlider(rankDoArea,rankChildEle,rankDots,rankHead);



//7.1面向对象的会买专辑模块
function vipSpecialPart(vipDoArea, vipItem, vipDots,clickChange) {
    smallSlider.apply(this,arguments);
    this.btns=clickChange;

    this.addClickEvent();
}
//7.2继承smallSlider
vipSpecialPart.prototype=new smallSlider();
//7.3会买专辑按钮点击、移入移出模块
vipSpecialPart.prototype.addClickEvent=function () {
    var leftBtn=this.btns[0];
    var rightBtn=this.btns[1];

    //1.左右按钮移入停止定时器
    leftBtn.onmouseover=rightBtn.onmouseover=function () {
        clearInterval(this.timer);
        this.timer=null;
    }.bind(this);

    //2.左右按钮移出重新开始定时器
    leftBtn.onmouseout=rightBtn.onmouseout=function () {
        if(!this.timer){
            if(this.nowIndex==this.childEle.length-1){
                this.nextIndex=0;
            }else{
                this.nextIndex=this.nowIndex+1;
            }
            this.startInterval();
        }
    }.bind(this);

    //3.点击向左按钮
    leftBtn.onclick=function () {
        if(this.nowIndex==0){
            this.nextIndex=this.childEle.length-1;
        }else{
            this.nextIndex=this.nowIndex-1;
        }
        for(let i=0;i<this.dots.length;i++){
            this.dots[i].className="";
        }
        this.dots[this.nextIndex].className="active";

        this.childEle[this.nextIndex].style.left=-this.itemWidth+"px";
        doMove(this.childEle[this.nowIndex],{left:this.itemWidth});
        doMove(this.childEle[this.nextIndex],{left:0});
        this.nowIndex=this.nextIndex;
    }.bind(this);

    //4.点击右按钮
    rightBtn.onclick=function () {
        // console.log(this.nextIndex,this.nowIndex);
        if(this.nowIndex==this.childEle.length-1){
            this.nextIndex=0;
        }else{
            this.nextIndex=this.nowIndex+1;
        }
        for(let i=0;i<this.dots.length;i++){
            this.dots[i].className="";
        }
        this.dots[this.nextIndex].className="active";

        this.childEle[this.nextIndex].style.left=this.itemWidth+"px";
        doMove(this.childEle[this.nowIndex],{left:-this.itemWidth});
        doMove(this.childEle[this.nextIndex],{left:0});
        this.nowIndex=this.nextIndex;
    }.bind(this);
}
//7.4实例化会买专辑模块
var vipSpecial=document.getElementsByClassName("vipSpecial")[0];
var vipDoArea=vipSpecial.getElementsByClassName("contentList")[0];
var vipItem=vipSpecial.getElementsByClassName("item");
var vipDots=vipSpecial.getElementsByClassName("ranDot")[0].getElementsByTagName("span");
var clickChange=vipSpecial.getElementsByClassName("clickChange");
new vipSpecialPart(vipDoArea,vipItem,vipDots,clickChange);




//8.领券中心模块
function ticketPart(ticketArea, ticketItem, vipDots){
    smallSlider.apply(this,arguments);
}
//8.1修改领券模块的原型对象指向（继承）
ticketPart.prototype=new smallSlider();
//8.2去掉领券模块不需要的定时器模块
ticketPart.prototype.startInterval=function(){}
//8.2实例化领券中心模块
var getTicketArea=document.getElementsByClassName("getTicket")[0];
var ticketArea=getTicketArea.getElementsByClassName("contentList")[0];
var ticketItem=ticketArea.getElementsByClassName("item");
var ticketDots=getTicketArea.getElementsByClassName("ranDot")[0].getElementsByTagName("span");
new ticketPart(ticketArea,ticketItem,ticketDots);



//9.觅me模块
function mimePart(mimeArea, mimeItem, mimeDots,mimeClickChange){
    vipSpecialPart.apply(this,arguments);
}
//9.1修改觅me模块的原型指向
mimePart.prototype=vipSpecialPart.prototype;
//9.2实例化觅me
var mime=document.getElementsByClassName("mime")[0];
var mimeArea=mime.getElementsByClassName("contentList")[0];
var mimeItem=mime.getElementsByClassName("item");
var mimeDots=mime.getElementsByClassName("ranDot")[0].getElementsByTagName("span");
var mimeClickChange=mime.getElementsByClassName("clickChange");
new mimePart(mimeArea,mimeItem,mimeDots,mimeClickChange);


//10.发现好货模块
function findGoodPart(doArea) {
    this.doArea=doArea;
    addImgEvent.call(this);
}
var findGood=document.getElementsByClassName("findGood")[0];
new findGoodPart(findGood);


//11.会逛模块
function wanderPart(doArea) {
    this.doArea=doArea;
    addImgEvent.call(this);
}
var wander=document.getElementsByClassName("wander")[0];
new wanderPart(wander);




