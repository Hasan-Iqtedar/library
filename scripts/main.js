class Book {

    constructor(title, author, pages, hasRead = false) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.hasRead = hasRead;
    }

}

let books = [];
let table = document.querySelector('#table');
let modal = document.querySelector('.modal');

let newButton = document.querySelector('#new-button');
let submitButton = document.querySelector('#submit-button');

let inputTitle = document.querySelector('#title');
let inputAuthor = document.querySelector('#author');
let inputPages = document.querySelector('#pages');
let inputRead = document.querySelector('#read');

window.addEventListener('load', displayData);
window.addEventListener('click', (e) => {

    if (e.target == modal) {
        modal.style.display = 'none';
    }
})

newButton.addEventListener('click', (e) => openForm(e));
submitButton.addEventListener('click', (e) => submitForm(e));

addBookToLibrary(new Book('The Hobbit', 'JRR Tolkien', '295', true));

function addBookToLibrary(book) {
    books.push(book);
}

function appendRowToDisplay(book, index = books.length - 1) {
    let row = document.createElement('tr');
    let removeButton = document.createElement('button');
    let readButton = document.createElement('button');
    let td1 = document.createElement("td");
    let td2 = document.createElement('td');

    row.setAttribute('data-index', index);

    removeButton.setAttribute("id", "remove-button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener('click', (e) => removeBook(e));

    readButton.setAttribute('id', "read-button")
    readButton.addEventListener('click', (e) => toggleReadStatus(e));

    book.hasRead ? readButton.textContent = "Read" : readButton.textContent = "Not Read";
    row.innerHTML = `<td>${book.title}</td><td>${book.author}</td><td>${book.pages}</td>`

    td1.appendChild(removeButton);
    td2.appendChild(readButton);
    row.appendChild(td2);
    row.appendChild(td1);
    table.appendChild(row);
}

function displayData() {
    books.forEach((book, index) => {
        appendRowToDisplay(book, index);
    });
}

function openForm(e) {
    modal.style.display = 'block'
}

function submitForm(e) {
    let modal = document.querySelector('.modal');
    let book = new Book(inputTitle.value, inputAuthor.value, inputPages.value, inputRead.checked);

    if (!(Number(inputPages.value)) || inputPages.value.length === 0) {
        alert("Please add valid data");
    }

    else if (inputTitle.value && inputAuthor.value) {
        addBookToLibrary(book);
        appendRowToDisplay(book);
    }

    inputTitle.value = '';
    inputAuthor.value = '';
    inputPages.value = '';
    inputRead.checked = false;
    modal.style.display = 'none';
}

function removeBook(e) {
    let row = e.target.parentNode.parentNode;
    let index = row.getAttribute("data-index");

    row.parentNode.removeChild(row);
    books.splice(index, 1);
}

function toggleReadStatus(e) {
    let index = e.target.parentNode.parentNode.getAttribute('data-index');

    if (books[index].hasRead) {
        books[index].hasRead = false;
        e.target.textContent = 'Not Read'
    }
    else {
        books[index].hasRead = true;
        e.target.textContent = 'Read'
    }
}