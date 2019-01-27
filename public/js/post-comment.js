$(document).ready(function() {
    $('#post-comment').click(function() {
        $('#new').removeAttr('id');
        var data = {
            comment: {
                text: $('#text').val(),
                author: $('#author').val()
            }
        }
        $.ajax({
            method: 'POST',
            url: '/blogs/' + $('#post-comment').data('comment-id') + '/comment',
            success: function() {
                $(template).appendTo('#list');
                $('#new .comment-author').html($('#author').val());
                $('#new .comment-body').html($('#text').val());
                $('#text').val('');
                $('html, body').animate({
                    scrollTop: $('#new').offset().top
                  }, 800);
            },
            error: function() {
                console.log('Error!')
            },
            data: data
        })
    })
});
var template = '<article class="row" id="new">' +
    '<div class="col-md-2 col-sm-2 hidden-xs">' +
    '<div class="thumbnail">' +
    '<img class="img-responsive" src="http://www.tangoflooring.ca/wp-content/uploads/2015/07/user-avatar-placeholder.png">' +
    '<figcaption style="text-align: center" class="comment-author"></figcaption>' +
    '</div></div>' +
    '<div class="col-md-10 col-sm-10">' +
    '<div class="panel panel-default arrow left">' +
    '<div class="panel-body">' +
    '<div class="comment-post">' +
    '<p class="comment-body"></p>' +
    '</div></div></div></div></article>';