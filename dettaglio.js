const baseEndpoint = "https://striveschool-api.herokuapp.com/books";

// 1️ Recuperiamo l'ASIN dall'URL
const params = new URLSearchParams(window.location.search);
const asin = params.get("asin");

if (asin) {
    fetch(`${baseEndpoint}`)
        .then((response) => response.json())
        .then((books) => {
            // Troviamo il libro con l'ASIN corrispondente
            const book = books.find(b => b.asin === asin);
            
            if (book) {
                // Inseriamo i dettagli nel div con id "book-detail"
                document.getElementById("book-detail").innerHTML = `
                    <img src="${book.img}" class="img-fluid mb-3" />
                    <h3>${book.title}</h3>
                    <p><strong>Categoria:</strong> ${book.category}</p>
                    <p><strong>Prezzo:</strong> EUR ${book.price}</p>
                    <p><strong>ASIN:</strong> ${book.asin}</p>
                    <button class="btn btn-success" onclick="addToCart('${book.title}', '${book.price}', '${book.asin}')">
                        Aggiungi al Carrello
                    </button>
                `;
            } else {
                document.getElementById("book-detail").innerHTML = `<p>Libro non trovato.</p>`;
            }
        })
        .catch(error => console.error("Errore nel recupero dei dati:", error));
} else {
    document.getElementById("book-detail").innerHTML = `<p>ASIN non fornito.</p>`;
}


const addToCart = (title, price, asin) => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    // Crea la nuova voce da aggiungere al carrello
    const newItem = `${title}, EUR ${price} 
        <button class='btn btn-danger' onclick='removeFromCart(event, "${asin}", "${price}")'> X </button>`;

    cartItems.push(newItem);
    localStorage.setItem("cart", JSON.stringify(cartItems));

    // Aggiorna il totale
    let currentTotal = Number(localStorage.getItem("cartTotal")) || 0;
    localStorage.setItem("cartTotal", (currentTotal + Number(price)).toFixed(2));
};
