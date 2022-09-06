document.addEventListener('DOMContentLoaded', function(event) {
    event.preventDefault()


function getAllBooks() {
    fetch("http://localhost:3000/books")
        .then(resp => resp.json())
        .then(data => {
            createlist(data);
        })
}
function createlist(data) {
    const list = select('ul#list')
    for (let b of data) {
        const bookList = create("li")
        bookList.innerText = b.title
        bookList.addEventListener('click', () => showBookDetails(b))
        list.appendChild(bookList)
    }
}
function showBookDetails(book) {
    const bookDisplay = select("#show-panel")
    const selectedBook = create('card')
    const title = create("h1")
    title.innerText = book.title
    const subtitle = create('h3')
    subtitle.innerText = book.subtitle
    const thumbnail = create('img')
    thumbnail.src = book.img_url
    const description = create('p')
    description.innerText = book.description
    //Display a LIKE button along with the book details. When the button is clicked, send a PATCH request to http://localhost:3000/books/:id with an array of users who like the book, and add a new user to the list.
    const likeBtn = create('button')
    likeBtn.innerText = "Like this book!"
    const likesList = create('ul')
    likeBtn.addEventListener("click", () => handleLikedBook(book, likesList))
    book.users.forEach(user => {
        const username = create('li')
        username.textContent = `${user.username} liked this!`
        likesList.appendChild(username)
    })
    selectedBook.appendChild(title, subtitle, thumbnail, description, likesList, likeBtn)
    bookDisplay.innerHTML = ""
    bookDisplay.appendChild(selectedBook)
}

function handleLikedBook(book, likesList) {
    fetch(`http://localhost:3000/books/${book.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            "users": [...book.users, { "id": 11, "username": "mark" }]
        })
    })
        .then(resp => resp.json())
        .then(data => updateLikedUsers(data, likesList))
}

function updateLikedUsers(data, likesList){
    likesList.innerHTML = '';
    data.users.forEach(user => {
        const username = create('li')
        username.textContent = `${user.username} liked this!`
        likesList.appendChild(username)
    })
}
function create(el) { return document.createElement(el) }
function select(el) { return document.querySelector(el) }
  
    getAllBooks();
})