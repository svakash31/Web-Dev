

// Book Construtor

function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}


// UI Construtor
function UI(){
    
    UI.prototype.addBookToList = function(book){
        console.log(book);
      
        const list = document.querySelector("#book-list");

        // Create a tr element

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td class="d-flex gap-3">
                <span class="btn btn-warning edit">E</span>
                <span class="btn btn-danger delete">D</span>
            </td>
        `;

        list.appendChild(row);

    }

    UI.prototype.clearField = function(){
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#ISBN").value = "";
    }

    UI.prototype.clearTasks = function(){
        document.querySelector("#book-list").innerHTML = '';
    }

    UI.prototype.showAlert = function(message, className="test"){
        alert(message);
    }

}


// Event Listen for submit

document.querySelector("#book-form").addEventListener("submit", function(e){

    e.preventDefault();
 
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#ISBN").value;

    const book = new Book(title, author, isbn);
    const ui = new UI();

    if(title === "" || author === "" || isbn === ""){
        ui.showAlert("Please fill all the fields");
    } else {
       ui.addBookToList(book);
       ui.clearField();
       ui.showAlert("Added sussfully");
    }

})


// Delete task event
document.querySelector("#book-list").addEventListener("click", function(e){

   const ui = new UI();

   console.log(e.target.classList);

   if(e.target.classList.contains("delete")){
     e.target.parentElement.parentElement.remove();
     ui.showAlert("removed sussfully");
   }

});

// Clear Event Lister
document.querySelector("#clear-btn").addEventListener("click", function(e){
    const ui = new UI();

    ui.clearTasks();
    ui.showAlert("cleared sussfully");

})