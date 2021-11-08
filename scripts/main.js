let books = [];
let table = document.querySelector('#table');

window.addEventListener('load', displayData);

function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
}

Book.prototype.info = () => {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}.`;
}

function addBookToLibrary(book) {
    books.push(book);
}

function displayData() {
    books.forEach((book, index) => {
        let row = document.createElement('tr');
        let button = document.createElement('button');
        let td = document.createElement("td");
        
        row.setAttribute('data-index', index);
        button.setAttribute("id", "remove");
        button.textContent = "Remove";
        button.addEventListener('click', (e) => remove(e));

        row.innerHTML = `<td>${book.title}</td><td>${book.author}</td><td>${book.pages}</td><td>${book.hasRead}</td>`
        td.appendChild(button);
        row.appendChild (td);
        table.appendChild(row);
    });
}

addBookToLibrary(new Book('The Hobbit', 'JRR Tolkien', '295', 'read'));
addBookToLibrary(new Book('The Hobbit', 'JRR Tolkien', '296', 'read'));

function remove(e) {
    let row = e.target.parentNode.parentNode;
    let index = row.getAttribute("data-index");

    row.parentNode.removeChild(row);   
    books.splice(index, 1);
}