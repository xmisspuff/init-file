/**
 * Created by john on 2014/10/13.
 */
function getStyle(obj,attr) {   //用来取代offsetwidth等 因为如果加了border就会出问题，用于获取元素的属性
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,false)[attr];
    }
}
function startMove(obj,json,fn) {   //obj对象参数，json取代原来的attr和iTarget，attr还是指attr，json[attr]指iTarget，fn是对调函数，等全部执行完再执行fn函数
    var flag = true;//假设所有运动到达目标值
    clearInterval(obj.timer);   //关闭自己的计时器
    obj.timer = setInterval(function () {   //开启计时器
	flag = true;
        for (var attr in json) {    //用for-in循环json，为了能同时发生运动
        //1、取当前的值
        var icur = 0;   //初始化icur
        if (attr == 'opacity') {    //针对透明度这个属性变化的写法不一样还有兼容问题，if判断是不是透明度变化，然后特殊处理
            icur = Math.round(parseFloat(getStyle(obj, attr)) * 100);   //用getStyle获取对象属性，然后用parseFloat取出小数再乘以100，兼容需要，最后四舍五入，没有四舍五入，计算机对小数处理不精准，会出现0.3000214001的情况。
        } else {    //其他情况
            icur = parseInt(getStyle(obj, attr));   //用parseInt取出整数
        }
        //2、算速度
        var speed = (json[attr] - icur) / 8;    //速度是目标值减去当前值 再除8，是为了做缓冲运动
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);   //大于零向上取整，小于零向下取整，如果不这样会到达不了目标值就停下来
        //3、检测停止
        if (icur != json[attr]) {   //针对同时运动，只要有一个属性变化没有达到目标值
            flag = false;   //标记就为false
        }   //下面未达到目标值的继续执行
            if (attr == 'opacity') {    //如果属性为透明度
                obj.style.filter = 'alpha:(opacity:' + icur + speed + ')';  //针对IE
                obj.style.opacity = (icur + speed) / 100;   //针对火狐 谷歌
            } else {    //其他属性变化
                obj.style[attr] = icur + speed + 'px';
            }
        }
        if(flag){   //如果所有属性变化都到达目标值，flag为true，清除定时器，停止运动，然后执行fn函数
            clearInterval(obj.timer);   //清除定时器
            if(fn){ //如果有fn（）就执行
                fn();
            }
    }
    },30)
} //startMove（）结束