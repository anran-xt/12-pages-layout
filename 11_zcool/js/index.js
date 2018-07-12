/**
 * Created by lenovo1 on 2018/4/3.
 */
var bannerList=document.getElementById("banner").getElementsByClassName("bannerList")[0];
var bannerLis=bannerList.getElementsByTagName("li");
var bannerSpans=bannerList.getElementsByTagName("span");
var liWidth=bannerLis[0].offsetWidth;
var bannerTimer=null;
bannerList.nowIndex=0;
bannerList.hiddenIndex=0;
bannerList.showIndex=1;

//banner运动函数
function bannerMove() {

    bannerList.hiddenIndex=bannerList.nowIndex;
    if(bannerList.hiddenIndex==bannerLis.length-1){
        bannerList.showIndex=0;
        bannerList.nowIndex=0;
    }else{
        bannerList.showIndex=++bannerList.nowIndex;
        // bannerList.nowIndex++;
    }

    for(var i=0;i<bannerSpans.length;i++){
        bannerSpans[i].className="";
        bannerLis[i].style.zIndex=0;
    }
    bannerSpans[bannerList.showIndex].className="active";

    bannerLis[bannerList.hiddenIndex].style.left=0;
    bannerLis[bannerList.hiddenIndex].style.zIndex=1;
    eleMove(bannerLis[bannerList.hiddenIndex],{left:-liWidth})


    bannerLis[bannerList.showIndex].style.left=liWidth+'px';
    bannerLis[bannerList.showIndex].style.zIndex=2;
    eleMove(bannerLis[bannerList.showIndex],{left:0})


    // console.log(bannerList.hiddenIndex,bannerList.showIndex);


}

//banner 定时器自动轮播
bannerTimer=setInterval(bannerMove,2500)

//bannerList 移入移出控制动画停止或运动
bannerList.onmouseover=function () {
    clearInterval(bannerTimer);
}
bannerList.onmouseout=function () {
    bannerTimer=setInterval(bannerMove,2500)
}

//bannerSpans 移入运动切换
bannerSpans=[].slice.call(bannerSpans);
bannerSpans.forEach(function(item,index){
    item.onmouseover=function(){
        if(index==bannerList.nowIndex) return;

        bannerList.hiddenIndex=bannerList.nowIndex;
        bannerList.showIndex=index;
        bannerList.nowIndex=index;
        for(var i=0;i<bannerSpans.length;i++){
            bannerSpans[i].className="";
            bannerLis[i].style.zIndex=0;
        }
        bannerSpans[bannerList.showIndex].className="active";

        bannerLis[bannerList.hiddenIndex].style.left=0;
        bannerLis[bannerList.hiddenIndex].style.zIndex=1;
        bannerLis[bannerList.showIndex].style.zIndex=2;


        if(index>bannerList.nowIndex){
            eleMove(bannerLis[bannerList.hiddenIndex],{left:-liWidth})

            bannerLis[bannerList.showIndex].style.left=liWidth+'px';
            eleMove(bannerLis[bannerList.showIndex],{left:0})
        }else{
            eleMove(bannerLis[bannerList.hiddenIndex],{left:liWidth})

            bannerLis[bannerList.showIndex].style.left=-liWidth+'px';
            eleMove(bannerLis[bannerList.showIndex],{left:0})
        }



    }
})