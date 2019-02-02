$(document).ready(function() {
    $("#login").click(function(e) {
        e.stopPropagation();
        $("#loginPopup").toggleClass("show");
    })
    $(document).mouseup(function(e) {
        var subject = $(".popup"); 
        if(e.target.id != subject.attr('id') && !subject.has(e.target).length) {
            $("#loginPopup").removeClass("show");
        }
    })
});

$(function() {
    setTimeout(function() {
        $(".flashMessage").each(function (index, element) {
            $(element).hide(1000)
        })
    }, 5000);
});