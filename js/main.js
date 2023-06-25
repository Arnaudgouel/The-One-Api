

const urlOneApi = "https://the-one-api.dev/v2/";
const booksUrl = urlOneApi + "book";

getBooks();

function getBooks() {
    fetch(booksUrl, {
        method: "GET",
    })
    .then(response => response.json())
    .then(json => {
        console.log(json);
        let books = json.docs;
        let output = "";
        books.forEach((book, key) => {
            output += `
                <li>
                    <a href="book.html?id=${book._id}">${book.name}</a>
                </li>
            `;
        });
        document.getElementById("content").innerHTML = `
          <ul class="list">
            ${output}
          </ul>
          `;
    })
    .catch(error => console.log(error));
}