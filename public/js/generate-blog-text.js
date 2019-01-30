$(document).ready(function () {
    $('#generate').on('click', function () {
        $.ajax({
            method: 'GET',
            url: 'https://baconipsum.com/api/?type=all-meat&paras=10&format=text',
            success(data) {
                console.log(data);
                $('#body').text(data);
                $('#image').val('https://source.unsplash.com/random');
                $('#title').val(data.substring(0, 64) + '.');
            },
            error(xhr) {
                $('#body').text(xhr)
            }
        })
    })
});