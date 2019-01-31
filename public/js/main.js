$(document).ready(function() {
    $("#login").on('click', function(e) {
        e.stopPropagation();
        console.log('clicked');
        $("#loginPopup").toggleClass("show");
    })
    $(document).mouseup(function(e) {
        var subject = $(".popup"); 
        if(e.target.id != subject.attr('id') && !subject.has(e.target).length) {
            $("#loginPopup").removeClass("show");
        }
    })
});