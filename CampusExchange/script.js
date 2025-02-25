document.getElementById('search').addEventListener('input', function () {
    console.log("Searching for:", this.value);
});

document.querySelectorAll('.category').forEach(category => {
    category.addEventListener('click', function () {
        alert("Showing results for: " + this.textContent);
    });
});