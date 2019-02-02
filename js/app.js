var config = {
    BASE_URL: "http://127.0.0.1:8000/"
};

function getAllBooks(){
    return $.ajax({
        url: config['BASE_URL'] + "book/",
        type: "GET",
        dataType: "json"
        })
}

function getAndShowBooks(){
    getAllBooks().done(function(result) {
        for (var i = 0; i < result.length; i++) {
            var liBookTitle = $("<li data-id='"+result[i]['id']+"'>"+result[i]["title"] + "   <a href=''>Delete</a></li>");
            $("#books")
                .append(liBookTitle)
                .append($('<div>'));
            }
    })
}

getAndShowBooks();
$("#books").on("click", "li", showDescription);
$("#books").on("click", "a", deleteBookOnClick);

function fetchBookDiscription(book_id){
    return $.ajax({
        url: config['BASE_URL'] + "book/" + book_id,
        type: "GET",
        dataType: "json"
        })
}


function showDescription() {
    var li = $(this);
    var book_id = $(this).data('id');
    var div = li.next();
    if (div.is(':empty')){
        div.show();
        fetchBookDiscription(book_id).done(function (result) {
            div.append($("<p>" +
                "Author: " + result['author'] + "<br>" +
                "Publisher: " + result['publisher'] + "<br>" +
                "ISBN: " + result['isbn'] + "<br>" +
                "Genre: " + result['genre'] + "</p>"))
        });
    } else{
        div.toggle()
    }

}

function createBook(payload){
    return $.ajax({
        url: config['BASE_URL'] + "book/",
        type: "POST",
        data: payload,
        dataType: "json"
    })
}


$("#submitBtn").click(function (event) {
    event.preventDefault();
    var payload = {
        title: $('#title').val(),
        author: $('#author').val(),
        isbn: $('#isbn').val(),
        publisher: $('#publisher').val(),
        genre: $('#genre').val()
    };

    createBook(payload).done(function () {
        $('#books').empty();
        getAndShowBooks()
    }).fail(function () {
        console.log("Fail")
        })
});


function deleteBook(book_id){
    return $.ajax({
        url: config['BASE_URL'] + "book/" + book_id,
        type: "DELETE",
        dataType: "json"
    })
}


function deleteBookOnClick(event) {
    event.preventDefault();
    var book_id = $(this).parent().data('id');
    deleteBook(book_id).done(function (result) {
            $('#books').empty();
            getAndShowBooks()
        })
}