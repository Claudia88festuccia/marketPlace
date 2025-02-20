const baseEndpoint = "https://striveschool-api.herokuapp.com/books";


window.onload = () => {
  getBookFromApi();
  updateCartMessage(); // Controlla subito se il carrello è vuoto
};


//funzione per recuperare i dati api
const getBookFromApi = () => {

    fetch(baseEndpoint)
        .then((response )=> response.json())
        .then((res) => {
            let cont = document.querySelector(".album .row")

            cont.innerHTML = res
                .map((book) => {
                    return ` <div class='col col-3' id='Card'> <div class="card mb-4 shadow-sm  " id='book_${book.asin}'>
            <img src='${book.img}' />

            <div class="card-body">
              <p class='font-weight-bold text-truncate book-title'> ${book.title} </p>
              <div
                class="d-flex justify-content-between align-items-center"
              >
                
                <button class='btn btn-primary' onclick="addToCart('${book.title}', '${book.price}', '${book.asin}')"> EUR ${book.price} </button>
                <button class='btn btn-secondary' id='nascondi' onclick="nascondi()"> Nascondi </button>
                <button class='btn btn-info dettaglio-btn' data-asin="${book.asin}">
    Dettaglio
</button>

              </div>
            </div>
          </div> </div>`
                })
                .join("")

                document.querySelectorAll(".dettaglio-btn").forEach((button) => {
                  button.addEventListener("click", (event) => {
                      let asin = event.target.getAttribute("data-asin"); // Recupera l'ASIN dal dataset
                      window.location.href = `dettaglio.html?asin=${asin}`; // Reindirizza alla pagina dettaglio
                  });
              });
            })
                .catch((error) => console.log(error))
        }

  
        const addToCart = (title, price, asin) => {
          const cart = document.querySelector(".list-group");
      
          const cartItem = document.createElement("li");
          cartItem.className = "list-group-item";
          cartItem.innerHTML = `${title}, EUR ${price} 
              <button class='btn btn-danger' onclick='removeFromCart(event, "${asin}", "${price}")'> X </button>`;
          cart.appendChild(cartItem);
      
          const totale = document.querySelector("h1 span");
          let currentTotal = Number(totale.innerText) || 0;
          totale.innerText = (currentTotal + Number(price)).toFixed(2);
      
          saveCart(); // Salva nel localStorage
          updateCartMessage(); 
      };
      
           
        
          const searchBook = (ev) => {
            let query = ev.target.value.toLowerCase();
            let allTitles = document.querySelectorAll(".book-title");
        
            allTitles.forEach((title) => {
                const currCard = title.closest(".col");
                currCard.style.display = title.innerText.toLowerCase().includes(query) ? "block" : "none";
            });
        };
        
  

// Salva il carrello nel Local Storage
const saveCart = () => {
  const cartItems = [];
  document.querySelectorAll(".list-group-item").forEach(item => {
      if (item.id !== "empty-message") {
          cartItems.push(item.innerHTML);
      }
  });

  localStorage.setItem("cart", JSON.stringify(cartItems));
  localStorage.setItem("cartTotal", document.querySelector("h1 span").innerText);
};


//  Recupera il carrello dal Local Storage all'avvio
const loadCart = () => {
  const cart = document.querySelector(".list-group");
  const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
  const savedTotal = localStorage.getItem("cartTotal") || "0";

  cart.innerHTML = ""; // Pulisce il carrello prima di aggiungere elementi

  if (savedCart.length > 0) {
      savedCart.forEach(itemHTML => {
          const cartItem = document.createElement("li");
          cartItem.className = "list-group-item";
          cartItem.innerHTML = itemHTML;
          cart.appendChild(cartItem);
      });
  }

  document.querySelector("h1 span").innerText = savedTotal;
  updateCartMessage();
};


//  Aggiorna il messaggio del carrello
const updateCartMessage = () => {
  const cart = document.querySelector(".list-group");
  const emptyMessage = document.getElementById("empty-message");

  if (cart.children.length === 0) {
      if (!emptyMessage) { 
          cart.innerHTML = "<li class='list-group-item text-muted' id='empty-message'>Il carrello è vuoto</li>";
      }
  } else {
      if (emptyMessage) {
          emptyMessage.remove(); // Rimuove il messaggio se il carrello ha elementi
      }
  }
};

// Aggiorna le funzioni per salvare il carrello


const removeFromCart = (event, asin, price) => {
  event.target.closest("li").remove();

  const totale = document.querySelector("h1 span");
  totale.innerText = (Number(totale.innerText) - Number(price)).toFixed(2);

  const book = document.querySelector("#book_" + asin);
  if (book) book.style.border = "none";

  saveCart(); // Salva il carrello aggiornato
  updateCartMessage();
};

const emptyCart = () => {
  document.querySelector(".list-group").innerHTML = ""; // Svuota il carrello
  document.querySelectorAll(".card").forEach(card => card.style.border = "none");

  const totale = document.querySelector("h1 span");
  totale.innerText = "0";

  localStorage.removeItem("cart"); // Cancella il carrello dal localStorage
  updateCartMessage();
};

// Carica il carrello quando la pagina si carica
window.onload = () => {
  getBookFromApi();
  loadCart(); // Recupera il carrello dal localStorage
};



          document.querySelector(".album .row").addEventListener("click", (event) => {
            // Verifica se il pulsante cliccato ha l'id "nascondi"
            if (event.target.id === "nascondi") {
                const cardToHide = event.target.closest(".col"); // Trova la card più vicina
                if (cardToHide) {
                    cardToHide.classList.toggle("d-none"); // Nasconde/mostra la card
                }
            }
        });
        

       



      
   