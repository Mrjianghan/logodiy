/**
 * Created by User on 2019/4/27.
 */
$(function(){
    var change_suffix = function($input) {
        /*内容可自行定义*/
        var suffix_font = Math.round($("#suffix-font").val());
        $(".suffix").css('font-size',suffix_font+'px');
        $("#suffix-show").html(suffix_font);
    };
    var change_prefix = function($input) {
        /*内容可自行定义*/
        var prefix_font = Math.round($("#prefix-font").val());
        $(".prefix").css('font-size',prefix_font+'px');
        $("#prefix-show").html(prefix_font);
    };
    $('#suffix-font').RangeSlider({ min: 30,   max: 100,  step: 0.1,  callback: change_suffix});
    $('#prefix-font').RangeSlider({ min: 30,   max: 100,  step: 0.1,  callback: change_prefix});

});
/*下载logo为图片*/
function download() {
    var align = $('#align').val();
    var id = '';
    if (align == 'h') {
        id = '#capture_h';
    }else{
        id = '#capture_v';
    }
    html2canvas(document.querySelector(id),{backgroundColor:null}).then(function(canvas) {
        $('#preview').empty().append(canvas);
        // 保存图片，下载到本地
        var type = 'png';
        var imgData = $('canvas')[0].toDataURL(type);
        /**
         * 获取mimeType
         * @param  {String} type the old mime-type
         * @return the new mime-type
         */
        var _fixType = function (type) {
            type = type.toLowerCase().replace(/jpg/i, 'jpeg');
            var r = type.match(/png|jpeg|bmp|gif/)[0];
            return 'image/' + r;
        };
        // 加工image data，替换mime type
        imgData = imgData.replace(_fixType(type), 'image/octet-stream');
        /**
         * 在本地进行文件保存
         * @param  {String} data     要保存到本地的图片数据
         * @param  {String} filename 文件名
         */
        var saveFile = function (data, filename) {
            var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
            save_link.href = data;
            save_link.download = filename;

            var event = document.createEvent('MouseEvents');
            // initMouseEvent()方法参数解释在    http://blog.sina.com.cn/s/blog_3e9b01a50100leyj.html
            event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            save_link.dispatchEvent(event);
        };
        // 下载后的文件名
        var filename = 'sherlon' + '.' + type;
        // download
        saveFile(imgData, filename);
    });
}
/*改变文字颜色*/
function changeFontColor(index){
    var clazz = '';
    if (index == 1) {// 前缀
        clazz = 'prefix';
    }else{// 后缀
        clazz = 'suffix';
    }
    var color = $("#"+clazz+"-font-color").val();
    $("."+clazz).css('color',color);
}
function changeBgColor(btn,index){
    var clazz = '';
    switch (index){
        case 1:// 前缀
            clazz = 'prefix';
            break;
        case 2:// 后缀
            clazz = 'suffix';
            break;
    }
    var color = $(btn).val();
    $("."+clazz).css('background-color',color);
}
/*改变背景形状*/
function changeBackgroundShape(btn,index,style){
    var clazz = '';
    if (index == 1) {// 前缀
        clazz = 'prefix';
    }else{// 后缀
        clazz = 'suffix';
    }
    var element = $("."+clazz);
    switch (style){
        case 's':// 方形
            element.css('padding','5px').css('border-radius','10px');
            var color = $("#"+clazz+"-bg-color").val();
            $("."+clazz).css('background-color',color);
            break;
        case 'c':// 圆形
            element.css('padding','18px').css('border-radius','50%');
            var color = $("#"+clazz+"-bg-color").val();
            $("."+clazz).css('background-color',color);
            break;
        case 'n':
            element.css('background-color','rgba(0, 0, 0, 0)');
            break;
        default :// 无
            element.css('background-color','rgba(0, 0, 0, 0)');
//                    element.animate({"opacity":"0"},1500);
            break;

    }
}
/*改变字体样式*/
function changeFontStyle(btn,index,style){
    var clazz = '';
    var css = '';
    var css_value = '';
    if (index == 1) {// 前缀
        clazz = '.prefix';
    }else{// 后缀
        clazz = '.suffix';
    }
    switch (style){
        case 'i':
            css = 'font-style';
            css_value = 'italic';
            break;
        case 'u':
            css = 'text-decoration';
            css_value = 'underline';
            if (!$(btn).attr('flag')) {
                $(btn).siblings("input[class='button d']").attr('flag','').css('background-color','#949494');
            }
            break;
        case 'd':
            css = 'text-decoration';
            css_value = 'line-through';
            if (!$(btn).attr('flag')) {
                $(btn).siblings("input[class='button u']").attr('flag','').css('background-color','#949494');
            }
            break;
        default :
            css = 'font-style';
            css_value = 'italic';
            break;
    }
    if ($(btn).attr('flag') == 'true') {
        $(clazz).css(css,'');
        $(btn).attr('flag','');
        $(btn).css('background-color','#949494');
    }else{
        $(clazz).css(css,css_value);
        $(btn).css('background-color','#3095ff');// 选中
        $(btn).attr('flag','true');
    }
}
/*改变logo方向*/
function changeAlign(btn){
    var capture_h = $("#capture_h");
    var capture_v = $("#capture_v");
    var align = $("#align").val();
    if (align == 'h') {
        var prefix_value = capture_h.find("span[class='prefix']").html();
        capture_v.find("span[class='prefix']").html(prefix_value);
        var suffix_value = capture_h.find("span[class='suffix']").html();
        capture_v.find("span[class='suffix']").html(suffix_value);
        capture_h.css('display','none');
        capture_v.css('display','inline-block');
        $("#align").attr('value','v');
    }else{
        var suffix_value = capture_v.find("span[class='suffix']").html();
        capture_h.find("span[class='suffix']").html(suffix_value);
        var prefix_value = capture_v.find("span[class='prefix']").html();
        capture_h.find("span[class='prefix']").html(prefix_value);
        capture_v.css('display','none');
        capture_h.css('display','inline-block');
        $("#align").attr('value','h');
    }
}