function fullscreenFix(){
    var h = $('body').height();
    $(".content-b").each(function(i){
        if($(this).innerHeight() <= h){
            $(this).closest(".fullscreen").addClass("not-overflow");
        }
    });
}
$(document).ready(fullscreenFix);
$(window).resize(fullscreenFix);

function backgroundResize(){
    var windowH = $(window).height();
    $(".background").each(function(i){
        var path = $(this);
        var contW = path.width();
        var contH = path.height();
        var imgW = path.attr("data-img-width");
        var imgH = path.attr("data-img-height");
        var ratio = imgW / imgH;
        var diff = parseFloat(path.attr("data-diff"));
        diff = diff ? diff : 0;
        var remainingH = 0;
        if(path.hasClass("parallax")){
            var maxH = contH > windowH ? contH : windowH;
            remainingH = windowH - contH;
        }
        imgH = contH + remainingH + diff;
        imgW = imgH * ratio;
        if(contW > imgW){
            imgW = contW;
            imgH = imgW / ratio;
        }
        path.data("resized-imgW", imgW);
        path.data("resized-imgH", imgH);
        path.css("background-size", imgW + "px " + imgH + "px");
    });
}
$(document).ready(backgroundResize);
$(window).resize(backgroundResize);
$(window).focus(backgroundResize);