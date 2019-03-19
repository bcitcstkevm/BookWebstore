new Vue({
    el: '#app',
    data: {
        books: {},
        failure: true,
    },
    // function to run an ajax call to the server to receive information on books to load
    created: function() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                this.books = JSON.parse(xhttp.response);
                
                if (Object.keys(this.books).length > 0) {
                    this.failure = false;
                } else {
                    this.failure = true;
                }
            }
        }
        xhttp.open('POST', '/load_list', true);
        xhttp.setRequestHeader("Content-type", "text");
        xhttp.send("load");
    },
    methods: {
        // view more information on a book
        moreInfo: function(book_name) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    if (xhttp.response == "failure") {
                        alert("Cannot find book information");
                    } else {
                        window.location.href = "/book.html";
                    }
                }
            }
            xhttp.open('POST', '/moreInfo');
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({title: book_name}));
        },
    }
})