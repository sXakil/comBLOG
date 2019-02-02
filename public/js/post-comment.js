$(document).ready(function() {
    var blogId = $('#post-comment').data('blog-id');
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
            url: '/blogs/' + blogId + '/comment',
            success: function(response) {
                $(template).appendTo('#list');
                $('#new .comment-author').html($('#author').val());
                $('#new .comment-body').html($('#text').val());
                $('#text').val('');
                $('#new form').attr('action', '/blogs/' + blogId + '/comment/' + response._id + "?_method=DELETE")
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
var template = 
`<article class="row" id="new">
	<div class="col-md-2 col-sm-2 hidden-xs">
		<div class="thumbnail">
			<img class="img-responsive" src="https://cdn2.iconfinder.com/data/icons/rcons-user/32/male-circle-512.png">
			<figcaption style="text-align: center" class="comment-author"></figcaption>
		</div>
	</div>
	<div class="col-md-10 col-sm-10">
		<div class="panel panel-default arrow left">
			<div class="panel-body">
				<div class="comment-post">
					<p class="comment-body"></p>
				</div>
			</div>
		</div>
		<button class="btn btn-xs btn-success"> <i class="fas fa-edit"></i></button>
        <form action="#" method="POST" style="display: inline">   
        	<button class="btn btn-xs btn-danger"><i class="fas fa-trash-alt"></i></button>
        </form>
	</div>
</article>`;