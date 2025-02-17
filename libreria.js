const baseEndpoint = "https://striveschool-api.herokuapp.com/books";


window.onload = () => {
    getBookFromApi()
}
//funzione per recuperare i dati api
const getBookFromApi = () => {

    fetch(baseEndpoint)
        .then((response )=> response.json())
        .then((res) => {
            let cont = document.querySelector(".album .row")

            cont.innerHTML = res
                .map((book) => {
                    return ` <div class='col col-3'> <div class="card mb-4 shadow-sm  " id='book_${book.asin}'>
            <img src='${book.img}' />

            <div class="card-body">
              <p class='font-weight-bold text-truncate book-title'> ${book.title} </p>
              <div
                class="d-flex justify-content-between align-items-center"
              >
                
                <button class='btn btn-primary' onclick="addToCart('${book.title}', '${book.price}', '${book.asin}')"> EUR ${book.price} </button>
                <button class='btn btn-secondary'> Nascondi </button>
              </div>
            </div>
          </div> </div>`
                })
                .join("")
            })
                .catch((error) => console.log(error))
        }

  
        const addToCart = (title, price, asin) => {
            const book = document.querySelector("#book_" + asin);
            book.style.border = "2px green solid";
        
            const cart = document.querySelector(".list-group");
            const cartItem = document.createElement("li");
            cartItem.className = "list-group-item";
            cartItem.innerHTML = `${title}, EUR ${price} 
                <button class='btn btn-danger' onclick='removeFromCart(event, "${asin}", "${price}")'> X </button>`;
            cart.appendChild(cartItem);
        
            const totale = document.querySelector("h1 span");
            let currentTotal = Number(totale.innerText) || 0;
            totale.innerText = (currentTotal + Number(price)).toFixed(2);
        };
        
        
          
        
          const searchBook = (ev) => {
            let query = ev.target.value.toLowerCase();
            let allTitles = document.querySelectorAll(".book-title");
        
            allTitles.forEach((title) => {
                const currCard = title.closest(".col");
                currCard.style.display = title.innerText.toLowerCase().includes(query) ? "block" : "none";
            });
        };
        
          const removeFromCart = (event, asin, price) => {
            event.target.closest("li").remove()
            const totale = document.querySelector("h1 span")
            totale.innerText = (Number(totale.innerText) - Number(price)).toFixed(2)
            const book = document.querySelector("#book_" + asin)
            book.style.border = "none"
          }
          
          const emptyCart = () => {
              document.querySelector(".list-group").innerHTML = ""
              document.querySelectorAll(".card").forEach(card => card.style.border = "none")
              const totale = document.querySelector("h1 span")
              totale.innerText = "0"
          }



