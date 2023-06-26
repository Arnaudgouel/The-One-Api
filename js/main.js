const urlOneApi = "https://the-one-api.dev/v2/";
const booksUrl = urlOneApi + "book";

let pathName, searchTerm = "";

document.addEventListener("DOMContentLoaded", checkUrl);

function checkUrl() {
  pathName = window.location.pathname.replace("/", "");
  searchTerm = window.location.search.replace("?id=", "");
  if ('book.html' == pathName) {
    fetchApi(booksUrl + "/" + searchTerm + "/chapter");
    fetchApi(booksUrl + "/" + searchTerm);
  } else {
    fetchApi(booksUrl);
  }
}

function fetchApi(url) {
    fetch(url, {
        method: "GET",
    })
    .then(response => response.json())
    .then(json => {
        let datas = json.docs;
        let output = "";        
        if (datas.length > 1) {
          datas.forEach((data) => {
            if(pathName == "book.html") {
              output += `
                <li>${data.chapterName}</li>
              `;
            } else {
              output += `
                <li>
                  <a href="book.html?id=${data._id}">${data.name}</a>
                </li>
              `;
            }
          });
          if (pathName == "book.html") {
            document.querySelector("#content").innerHTML = `
              <ol>
                ${output}
              </ol>
            `;    
          } else {
            document.querySelector("#content").innerHTML = `
              <ul class="list">
                ${output}
              </ul>
            `;
          }
        } else {
            document.querySelector("h1").innerHTML = datas[0].name;
        }
    })
}