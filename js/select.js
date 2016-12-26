$(function () { //xmisspuff 自制
//单选
    radio(".radio");
    checkbox(".checkbox");
})

//单选
function radio(e){
	console.log(e);
	$(e).bind("click", function () {
		console.log(e);
        $(this).siblings(e).removeClass("selected");
        if($(this).hasClass("selected")){
            $(this).removeClass("selected");
        }else{
            $(this).addClass("selected");
        }
//把选中的值赋给隐藏的input方便后台获取
     //必须选一个
        //var radio_value = $(this).text();
        //$(this).parent().find("input").val(radio_value);

     //可以都不选
        $(this).parent().find("input").val(null);
        var checkbox_value = "";
        $(this).parent().find(".selected").each(function () {
            checkbox_value =  checkbox_value + "," + $(this).html();
            $(this).parent().find("input").val(checkbox_value.substr(1));
        })
    })
}

//多选
function checkbox(e){
	$(e).bind("click", function () {
        if($(this).hasClass("selected")){
            $(this).removeClass("selected");
        }else{
            $(this).addClass("selected");
        }
        
//把选中的值赋给隐藏的input方便后台获取
        $(this).parent().find("input").val(null);
        var checkbox_value = "";
        $(this).parent().find(".selected").each(function () {
            checkbox_value =  checkbox_value + "," + $(this).html();
            $(this).parent().find("input").val(checkbox_value.substr(1));
        })
    })
}

//单选  用的html
//<div class="radios">
//    <div class="radio selected">1</div>
//    <div class="radio">2</div>
//    <input type="hidden" name="radio">
//</div>


//多选  用的html
//<div class="checkboxs">
//    <div class="checkbox selected">1</div>
//    <div class="checkbox">2</div>
//    <input type="hidden" name="checkbox">
//</div>
