

const urlOneApi = "https://the-one-api.dev/v2/";
const booksUrl = urlOneApi + "book";

let pathName = "";
console.log(window.location);

document.addEventListener("DOMContentLoaded", checkUrl);

const fetchTypes = {
  allBooks: "allBooks",
  bookChapters: "bookChapters",
  bookName: "bookName",
}


function checkUrl() {
  pathName = window.location.pathname.replace("/", "");
  if ('book.html' == pathName) {
    getBookChapters();
    getBookName();
  } else {
    getBooks();
  }
}

function getBooks() {
    fetch(booksUrl, {
        method: "GET",
    })
    .then(response => response.json())
    .then(json => {
        let datas = json.docs;
        let output = "";
        datas.forEach((book) => {
            output += `
                <li>
                    <a href="book.html?id=${book._id}">${book.name}</a>
                </li>
            `;
        });
        document.querySelector("#content").innerHTML = `
          <ul class="list">
            ${output}
          </ul>
          `;
    })
    .catch(error => console.log(error));
}

function getBookChapters() {
    const id = window.location.search.replace("?id=", "");
    fetch(booksUrl + "/" + id + "/chapter", {
        method: "GET",
    })
    .then(response => response.json())
    .then(json => {
        let output = "";
        let datas = json.docs;
        datas.forEach((chapter) => {
          output += `
              <li>${chapter.chapterName}</li>
          `;
        });
        document.querySelector("#content").innerHTML = `
          <ol>
            ${output}
          </ol>
        `;
    })
    .catch(error => console.log(error));
}

function getBookName() {
    const id = window.location.search.replace("?id=", "");
    fetch(booksUrl + "/" + id, {
        method: "GET",
    })
    .then(response => response.json())
    .then(json => {
        document.querySelector("h1").innerHTML = json.docs[0].name;
    })
}

function fetchApi(url) {
    fetch(url, {
        method: "GET",
    })
    .then(response => response.json())
    .then(json => {
        let datas = json.docs;
        let output = "";
        if (datas.length > 0) {
            datas.forEach((book) => {
                output += `
                    <li>
                        <a href="book.html?id=${book._id}">${book.name}</a>
                    </li>
                `;
            });
            document.querySelector("#content").innerHTML = `
              <ul class="list">
                ${output}
              </ul>
              `;
        }
        console.log(json);
    })
}